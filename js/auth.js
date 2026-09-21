// Login, sesi, dan akses data lewat Supabase.
// Kunci di config.js adalah kunci publik (aman di browser). Keamanan data dijaga oleh RLS di database.
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
];
const friendly = e => (ERR.find(([re]) => re.test(e.message || '')) || [null, e.message || 'Terjadi kesalahan.'])[1];

const Auth = {
  ready: false,
  queue: [], // hasil pelajaran yang belum terkirim (mis. saat offline)

  async init() {
    const { data, error } = await sb.auth.getSession();
    if (error) throw error;
    if (data.session) await this.load(data.session.user);
    this.ready = true;
  },

  // Muat profil dan progres milik akun yang sedang login.
  async load(user) {
    const uid = user.id;
    const [p, pr, ld, ck] = await Promise.all([
      sb.from('profiles').select('full_name, email, role').eq('id', uid).single(),
      sb.from('progress').select('streak, last_day').eq('user_id', uid).single(),
      sb.from('lessons_done').select('lesson_id, xp, acc').eq('user_id', uid),
      sb.from('checks').select('unit, idx').eq('user_id', uid),
    ]);
    const err = p.error || pr.error || ld.error || ck.error;
    if (err) throw err;
    Object.assign(S, { user, uid, role: p.data.role, name: p.data.full_name, email: p.data.email, streak: pr.data.streak, last: pr.data.last_day || '' });
    S.done = Object.fromEntries(ld.data.map(r => [r.lesson_id, { xp: r.xp, acc: r.acc }]));
    S.xp = ld.data.reduce((n, r) => n + r.xp, 0);
    S.checks = {};
    ck.data.forEach(r => (S.checks[r.unit] ||= []).push(r.idx));
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

  // ---- khusus mentor (RLS menolak untuk siswa) ----
  async roster() {
    const { data, error } = await sb.from('profiles')
      .select('id, full_name, email, created_at, progress(streak, last_day, updated_at), lessons_done(lesson_id, xp, acc), checks(unit, idx)')
      .eq('role', 'student').order('full_name');
    if (error) throw error;
    return data;
  },
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
