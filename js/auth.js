// Login, sesi, dan akses data lewat Supabase.
// Kunci di config.js adalah kunci publik (aman di browser). Keamanan data dijaga oleh RLS di database.
const TASK_MAX = 2 * 1024 * 1024; // sama dengan batas bucket "tugas"
const IS_RECOVERY = /type=recovery/.test(location.hash); // dibaca sebelum supabase-js membersihkan URL
const sb = window.supabase.createClient(CONFIG.supabase.url, CONFIG.supabase.key);

const toast = msg => {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove('show'), 4500);
};

const ERR = [
  [/Database error saving new user/i, 'Kode kelas salah, atau email ini bukan email mentor.'],
  [/Invalid login credentials/i, 'Email atau password salah.'],
  [/already registered/i, 'Email sudah terdaftar. Silakan masuk.'],
  [/at least \d+ characters/i, 'Password minimal 6 karakter.'],
  [/not confirmed/i, 'Email belum dikonfirmasi. Cek kotak masuk emailmu.'],
  [/rate limit/i, 'Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.'],
  [/valid email|invalid format/i, 'Format email tidak valid.'],
  [/different from the old/i, 'Password baru harus berbeda dari password lama.'],
  [/session missing|not authenticated/i, 'Sesi habis. Masuk lagi, lalu coba ganti password.'],
];
const friendly = e => (ERR.find(([re]) => re.test(e.message || '')) || [null, e.message || 'Terjadi kesalahan.'])[1];

const Auth = {
  ready: false,
  queue: [], // hasil pelajaran yang belum terkirim (mis. saat offline)

  async init() {
    const { data, error } = await sb.auth.getSession();
    if (error) throw error;
    if (data.session) { await this.load(data.session.user); S.recovery = IS_RECOVERY; }
    this.ready = true;
  },

  // Muat profil dan progres milik akun yang sedang login.
  async load(user) {
    const uid = user.id;
    const [p, pr, ld, ck, sm] = await Promise.all([
      sb.from('profiles').select('full_name, email, role, must_change_password').eq('id', uid).single(),
      sb.from('progress').select('streak, last_day').eq('user_id', uid).single(),
      sb.from('lessons_done').select('lesson_id, xp, acc').eq('user_id', uid),
      sb.from('checks').select('unit, idx').eq('user_id', uid),
      sb.from('submissions').select('unit, file_name, size_bytes, submitted_at').eq('user_id', uid),
    ]);
    const err = p.error || pr.error || ld.error || ck.error || sm.error;
    if (err) throw err;
    Object.assign(S, { user, uid, role: p.data.role, name: p.data.full_name, email: p.data.email, mustChange: p.data.must_change_password, streak: pr.data.streak, last: pr.data.last_day || '' });
    S.done = Object.fromEntries(ld.data.map(r => [r.lesson_id, { xp: r.xp, acc: r.acc }]));
    S.xp = ld.data.reduce((n, r) => n + r.xp, 0);
    S.checks = {};
    ck.data.forEach(r => (S.checks[r.unit] ||= []).push(r.idx));
    S.tasks = Object.fromEntries(sm.data.map(r => [r.unit, r]));
  },

  async signIn(email, password) {
    const { data, error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw new Error(friendly(error));
    await this.load(data.user);
  },

  // Mengembalikan 'ok' atau 'confirm' (bila konfirmasi email aktif di Supabase).
  async signUp(email, password, name, code) {
    const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name: name, class_code: code } } });
    if (error) throw new Error(friendly(error));
    if (!data.session) return 'confirm';
    await this.load(data.user);
    return 'ok';
  },

  // Kirim email reset. Respons sama baik email terdaftar maupun tidak (Supabase tidak membocorkannya).
  async forgot(email) {
    const redirectTo = location.href.split('#')[0].replace(/index\.html$/, '');
    const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw new Error(friendly(error));
  },

  async changePassword(password) {
    const { error } = await sb.auth.updateUser({ password });
    if (error) throw new Error(friendly(error));
    await sb.rpc('password_changed'); // hapus penanda "wajib ganti password"
    S.mustChange = false;
    S.recovery = false;
  },

  async signOut() {
    await sb.auth.signOut();
    resetState();
    ROSTER = null; CODE = null;
  },

  async saveLesson(id, xp, acc) {
    this.queue.push({ id, xp, acc });
    await this.flush();
  },

  async flush() {
    while (this.queue.length) {
      const { id, xp, acc } = this.queue[0];
      const { error } = await sb.rpc('complete_lesson', { p_id: id, p_xp: xp, p_acc: acc });
      if (error && !error.code) { toast('Progres belum tersimpan. Akan dicoba lagi saat koneksi kembali.'); return; }
      if (error) toast('Progres gagal disimpan: ' + error.message);
      this.queue.shift();
    }
  },

  async toggleCheck(n, i) {
    const a = S.checks[n] || (S.checks[n] = []);
    const on = a.indexOf(i) < 0;
    on ? a.push(i) : a.splice(a.indexOf(i), 1); // optimistis, dibatalkan bila gagal
    const q = on ? sb.from('checks').insert({ user_id: S.uid, unit: n, idx: i })
      : sb.from('checks').delete().eq('user_id', S.uid).eq('unit', n).eq('idx', i);
    const { error } = await q;
    if (error) {
      on ? a.splice(a.indexOf(i), 1) : a.push(i);
      toast('Checklist gagal disimpan.');
      render(true);
    }
  },

  // Pengumpulan tugas: berkas .Rmd disimpan di Storage (bucket privat "tugas"), metadata lewat RPC.
  // Mengembalikan pesan galat bila berkas ditolak.
  async checkRmd(file) {
    if (!/\.rmd$/i.test(file.name)) return 'Hanya berkas .Rmd yang diterima.';
    if (file.size === 0) return 'Berkas kosong.';
    if (file.size > TASK_MAX) return 'Ukuran berkas maksimal 2 MB.';
    const head = new Uint8Array(await file.slice(0, 4096).arrayBuffer());
    if (head.includes(0)) return 'Berkas ini bukan teks. Unggah file .Rmd yang asli, bukan hasil knit atau berkas biner.';
    return '';
  },
  async submitTask(n, file) {
    const bad = await this.checkRmd(file);
    if (bad) throw new Error(bad);
    const path = `${S.uid}/unit-${n}.Rmd`;
    const up = await sb.storage.from('tugas').upload(path, file, { upsert: true, contentType: 'text/plain', cacheControl: '0' });
    if (up.error) throw new Error('Gagal mengunggah: ' + up.error.message);
    const { error } = await sb.rpc('submit_task', { p_unit: n, p_file_name: file.name, p_size: file.size });
    if (error) throw new Error('Gagal mencatat tugas: ' + error.message);
    S.tasks[n] = { unit: n, file_name: file.name, size_bytes: file.size, submitted_at: new Date().toISOString() };
  },
  // Tautan unduh sementara (60 detik), dipakai mentor untuk membuka tugas siswa.
  async taskUrl(uid, n) {
    const { data, error } = await sb.storage.from('tugas').createSignedUrl(`${uid}/unit-${n}.Rmd`, 60);
    if (error) throw new Error('Gagal membuat tautan unduh: ' + error.message);
    return data.signedUrl;
  },

  // ---- khusus mentor (RLS menolak untuk siswa) ----
  async roster() {
    const { data, error } = await sb.from('profiles')
      .select('id, full_name, email, created_at, progress(streak, last_day, updated_at), lessons_done(lesson_id, xp, acc), checks(unit, idx), submissions(unit, file_name, size_bytes, submitted_at)')
      .eq('role', 'student').order('full_name');
    if (error) throw error;
    return data;
  },
  async mentors() {
    const { data, error } = await sb.from('profiles').select('full_name, email, created_at').eq('role', 'mentor').order('created_at');
    if (error) throw error;
    return data;
  },
  // Aksi admin (tambah mentor, reset password siswa) berjalan di Edge Function yang memeriksa peran mentor.
  async admin(body) {
    const { data, error } = await sb.functions.invoke('admin-users', { body });
    if (error) {
      let msg = error.message;
      try { msg = (await error.context.json()).error || msg; } catch { /* pakai pesan bawaan */ }
      throw new Error(msg);
    }
    return data;
  },
  addMentor(email, name) { return this.admin({ action: 'add_mentor', email, name }); },
  resetStudent(id) { return this.admin({ action: 'reset_password', user_id: id }); },
  async classCode() {
    const { data, error } = await sb.from('settings').select('value').eq('key', 'class_code').single();
    if (error) throw error;
    return data.value;
  },
  async setClassCode(v) {
    const { error } = await sb.from('settings').update({ value: v }).eq('key', 'class_code');
    if (error) throw new Error(error.code === '23514' ? 'Kode kelas minimal 6 karakter.' : error.message);
  },
};
window.addEventListener('online', () => Auth.flush());
