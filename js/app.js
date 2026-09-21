// Router hash + tampilan: beranda (jalur belajar), panduan unit, dataset, laporan mentor.
const tabs = () => [['', 'Belajar'], ['data', 'Dataset'], ['mentor', S.role === 'mentor' ? 'Kelas' : 'Mentor']];
let AUTHMODE = 'in', BOOTERR = '';
const route = () => (location.hash.slice(1) || '/').split('/').filter(Boolean);
const pct = (a, b) => (b ? Math.round(a / b * 100) : 0);
const checkedTotal = () => Object.values(S.checks).reduce((n, a) => n + a.length, 0);
const checkTotal = COURSE.reduce((n, u) => n + u.guide.cek.length, 0);
const prog = (label, v, cls) => `<div class="prow"><span class="pname">${label}</span><div class="bar"><i class="${cls}" style="width:${v}%"></i></div><span class="pval">${v}%</span></div>`;

function chrome(a) {
  const on = k => ((a || '') === k ? 'on' : '');
  const brand = `<a class="logo" href="#/"><span class="logo-mark">r</span><span class="logo-word">${esc(CONFIG.brand)}</span></a>`;
  if (!S.user || S.recovery || S.mustChange) { $('#nav').innerHTML = `<div class="nav-in">${brand}</div>`; $('#tabbar').innerHTML = ''; return; }
  $('#nav').innerHTML = `<div class="nav-in">${brand}<span class="divider"></span><span class="nav-label">${S.role === 'mentor' ? 'Mode mentor' : 'Kelas R'}</span>
    <nav class="links">${tabs().map(([k, t]) => `<a class="${on(k)}" href="#/${k}">${t}</a>`).join('')}</nav>
    <div class="stats"><span class="streak" title="Streak harian"><span>🔥</span><b>${streakNow()}</b></span><span class="badge b-gold">⚡ ${S.xp} XP</span><button class="btn btn-ghost btn-sm out" data-act="logout">Keluar</button></div></div>`;
  $('#tabbar').innerHTML = tabs().map(([k, t]) => `<a class="${on(k)}" href="#/${k}">${t}</a>`).join('');
}

function nodeHtml(it, k) {
  const done = isDone(it.id), open = isOpen(it.id), cur = current()?.id === it.id;
  const off = [0, 44, 66, 44][k % 4];
  return `<div class="nwrap ${cur ? 'cur' : ''}" style="transform:translateX(${off}px)">${cur ? '<span class="tip">MULAI</span>' : ''}<button class="node ${done ? 'done' : open ? '' : 'lock'}" data-act="lesson" data-id="${it.id}" ${open ? '' : 'disabled'} aria-label="${esc(it.l.name)}">${done ? '✔' : open ? '★' : '🔒'}</button><span class="nname">${esc(it.l.name)}</span></div>`;
}

function tugasNode(n, k) {
  const done = taskDone(n), open = taskOpen(n);
  return `<div class="nwrap" style="transform:translateX(${[0, 44, 66, 44][k % 4]}px)"><a class="node trophy ${done ? 'done' : open ? '' : 'lock'}" href="#/tugas/${n}" ${open ? '' : 'aria-disabled="true" tabindex="-1"'} aria-label="Tugas unit ${n}">${done ? '✔' : open ? '📝' : '🔒'}</a><span class="nname">Tugas</span></div>`;
}

function unitHtml(u) {
  const nodes = u.lessons.map((_, i) => nodeHtml(ALL.find(x => x.id === u.n + '.' + i), i)).join('') +
    tugasNode(u.n, u.lessons.length);
  return `<div class="u c${(u.n - 1) % 3}"><div class="unit"><div><small>UNIT ${u.n}</small><h3>${esc(u.title)}</h3><p>${esc(u.blurb)}</p></div><a class="btn btn-sm btn-white" href="#/unit/${u.n}">Panduan</a></div><div class="nodes">${nodes}</div></div>`;
}

function home() {
  const cur = current(), started = ALL.some(x => isDone(x.id));
  const nDone = ALL.filter(x => isDone(x.id)).length;
  const unitsDone = COURSE.filter(u => u.lessons.every((_, i) => isDone(u.n + '.' + i))).length;
  const cap = COURSE[COURSE.length - 1];
  const capDone = cap.lessons.filter((_, i) => isDone(cap.n + '.' + i)).length;
  const m = CONFIG.mentor;
  const cta = cur ? `<button class="btn" data-act="lesson" data-id="${cur.id}">${started ? 'Lanjutkan' : 'Mulai belajar'}</button>` : '<a class="btn" href="#/unit/14">Buka tugas capstone</a>';
  const tog = (k, t) => `<label class="toggle"><input type="checkbox" data-set="${k}" ${S.set[k] ? 'checked' : ''}><span class="track"></span>${t}</label>`;

  return `<section class="hero"><h1 class="display">belajar pemrograman r</h1>
    <p>Kursus interaktif 14 unit, dari pengantar R sampai capstone project. Dipandu langsung oleh ${esc(m.name)}, mentor kamu.</p>
    <div class="btns">${cta}<a class="btn btn-secondary" href="#/mentor">${S.role === 'mentor' ? 'Dasbor kelas' : 'Tentang mentor'}</a></div></section>
  <div class="grid home">
    <section class="panel path"><div class="label">Jalur belajar</div>${COURSE.map(unitHtml).join('')}</section>
    <section class="panel side"><div class="label">Progresmu</div>
      <div class="stat-line"><span class="streak"><span>🔥</span><b>${streakNow()}</b></span><span class="badge b-gold">⚡ ${S.xp} XP</span><span class="badge b-green">${nDone}/${ALL.length} pelajaran</span></div>
      ${prog('Pelajaran', pct(nDone, ALL.length), '')}${prog('Unit selesai', pct(unitsDone, COURSE.length), 'blue')}${prog('Checklist', pct(checkedTotal(), checkTotal), 'orange')}${prog('Tugas', pct(Object.keys(S.tasks).length, COURSE.length), 'gold')}
    </section>
    <section class="panel side"><div class="label">Mentor</div>
      <div class="card mentor-card"><div class="body"><span class="tag t-blue">MENTOR</span><h3><span class="avatar">${esc(m.name[0])}</span>${esc(m.name)}</h3><p>${esc(m.bio)}</p></div><div class="foot"><span>${esc(m.role)}</span><a href="#/mentor">${S.role === 'mentor' ? 'Dasbor' : 'Profil'}</a></div></div>
    </section>
    <section class="panel side"><div class="label">Pengaturan</div>${tog('sound', 'Sound effects')}${tog('anim', 'Animations')}${tog('all', 'Buka semua unit')}
      <p class="help">"Buka semua unit" melewati urutan belajar, berguna untuk mentor yang ingin melihat seluruh materi.</p></section>
    <section class="panel side dark"><div class="label">Capstone</div>
      <p class="help">Puncak kursus: laporan analisis end-to-end dengan R Markdown.</p>
      <div class="stat-line"><span class="badge ${capDone === cap.lessons.length ? 'b-green' : capDone ? 'b-blue' : 'b-gold'}">${capDone === cap.lessons.length ? 'Selesai' : capDone ? 'Berjalan' : 'Menunggu'}</span></div>
      ${prog('Unit 14', pct(capDone, cap.lessons.length), 'gold')}${prog('Seluruh kursus', pct(nDone, ALL.length), '')}</section>
  </div>`;
}

function guide(n) {
  const u = COURSE.find(x => x.n === n);
  if (!u) return '<section class="panel"><p>Unit tidak ditemukan. <a href="#/" class="b-blue badge">Kembali</a></p></section>';
  const g = u.guide, chk = S.checks[n] || [];
  const first = ALL.find(x => x.u.n === n && !isDone(x.id) && isOpen(x.id)) || ALL.find(x => x.u.n === n);
  const dark = [['b-green', 'Selesai'], ['b-blue', 'Terbuka'], ['b-gold', 'Terkunci']];
  const lessons = u.lessons.map((l, i) => { const id = n + '.' + i, [c, t] = isDone(id) ? dark[0] : isOpen(id) ? dark[1] : dark[2]; return `<div class="prow"><span class="pname" style="width:auto;flex:1">${esc(l.name)}</span><span class="badge ${c}">${t}</span></div>`; }).join('');
  return `<a class="btn btn-ghost btn-sm crumb" href="#/">← Jalur belajar</a>
  <section class="hero"><h1 class="display">unit ${n}: ${esc(u.title)}</h1><p>${esc(u.blurb)}</p>
    <div class="btns"><button class="btn" data-act="lesson" data-id="${first.id}">${isDone(first.id) ? 'Ulangi pelajaran' : 'Mulai pelajaran'}</button></div></section>
  <div class="grid">
    <section class="panel"><div class="label">Tujuan pembelajaran</div><ul class="list">${g.tujuan.map(t => `<li>${rich(t)}</li>`).join('')}</ul></section>
    <section class="panel"><div class="label">Ringkasan</div><ul class="list">${g.ringkasan.map(t => `<li>${rich(t)}</li>`).join('')}</ul></section>
    <section class="panel"><div class="label">Kesalahan umum</div><p class="help"><span class="badge b-red">Awas</span></p><ul class="list">${g.salah.map(t => `<li>${rich(t)}</li>`).join('')}</ul></section>
    <section class="panel"><div class="label">Checklist kompetensi</div>
      ${g.cek.map((t, i) => `<div class="ck ${chk.includes(i) ? 'on' : ''}" data-act="ck" data-n="${n}" data-i="${i}" role="checkbox" aria-checked="${chk.includes(i)}" tabindex="0"><span class="box">${chk.includes(i) ? '✔' : ''}</span><span>${esc(t)}</span></div>`).join('')}
      <div style="margin-top:16px">${prog('Tercentang', pct(chk.length, g.cek.length), 'orange')}</div></section>
    <section class="panel"><div class="label">Tugas</div><div class="task">${esc(g.tugas)}</div><p><a class="btn btn-sm" href="#/tugas/${n}">${taskDone(n) ? 'Lihat pengumpulan' : 'Buka halaman tugas'}</a></p>
      ${g.data.length ? `<p class="help">Berkas untuk tugas ini:</p><div class="files">${g.data.map(f => `<a class="btn btn-sm btn-secondary" href="datasets/${f}" download>${esc(f)}</a>`).join('')}</div>` : '<p class="help">Tugas ini tidak butuh berkas data. Cukup RStudio.</p>'}</section>
    <section class="panel dark"><div class="label">Pelajaran unit ini</div>${lessons}
      ${g.rubrik ? `<div class="label" style="margin-top:32px">Rubrik penilaian</div>${g.rubrik.map(([t, v]) => `<div class="prow"><span class="pname">${esc(t)}</span><div class="bar"><i class="${v >= 15 ? 'gold' : ''}" style="width:${v * 6}%"></i></div><span class="pval">${v}%</span></div>`).join('')}` : ''}</section>
  </div>`;
}

function tugasView(n) {
  const u = COURSE.find(x => x.n === n);
  if (!u) return '<section class="panel"><p>Unit tidak ditemukan. <a href="#/" class="b-blue badge">Kembali</a></p></section>';
  const g = u.guide, t = S.tasks[n], open = taskOpen(n);
  const status = t
    ? `<span class="badge b-green">Sudah dikumpulkan</span><p class="help" style="margin-top:12px"><b>${esc(t.file_name)}</b> (${(t.size_bytes / 1024).toFixed(1)} KB)<br>Dikumpulkan ${esc(new Date(t.submitted_at).toLocaleString('id-ID'))}</p>`
    : '<span class="badge b-gold">Belum dikumpulkan</span>';
  return `<a class="btn btn-ghost btn-sm crumb" href="#/">← Jalur belajar</a>
  <section class="hero"><h1 class="display">tugas unit ${n}</h1><p>${esc(u.title)}</p></section>
  <div class="grid">
    <section class="panel"><div class="label">Instruksi tugas</div><div class="task">${esc(g.tugas)}</div>
      <p class="help"><b>Cara mengumpulkan:</b> tulis semuanya dalam satu berkas R Markdown (.Rmd). Kode ditulis di R chunk, penjelasan dan jawaban sebagai teks. Bila tugas menyebut skrip .R atau berkas hasil (misalnya CSV), tulis kodenya di R chunk dan sebutkan hasilnya di narasi.</p>
      ${g.data.length ? `<p class="help">Berkas untuk tugas ini:</p><div class="files">${g.data.map(f => `<a class="btn btn-sm btn-secondary" href="datasets/${f}" download>${esc(f)}</a>`).join('')}</div>` : ''}</section>
    <section class="panel"><div class="label">Kumpulkan tugas</div>${status}
      ${open ? `<div class="upload"><input class="in" id="rmdfile" type="file" accept=".Rmd,.rmd"><button class="btn" data-act="upload" data-n="${n}">${t ? 'Unggah ulang' : 'Unggah tugas'}</button></div>
        <p class="help">Hanya berkas R Markdown (.Rmd), maksimal 2 MB. Unggah ulang akan menggantikan berkas sebelumnya. Kumpulkan file sumber .Rmd, bukan hasil knit (.html atau .pdf).</p><p class="amsg" id="tmsg" role="alert"></p>`
        : '<p class="help" style="margin-top:12px">Tugas terbuka setelah kamu menyelesaikan Kuis unit ini.</p>'}</section>
  </div>`;
}

const FILES = [
  ['data_peserta_pelatihan.csv', 'UTAMA', 't-green', 'Data peserta pelatihan: nama, unit, tanggal, kehadiran, nilai pretest dan posttest. Belum rapi, cocok untuk latihan cleaning.', '156 BARIS'],
  ['data_unit_kerja.csv', 'LOOKUP', 't-blue', 'Kode, nama, kota, kategori, dan jumlah pegawai tiap unit kerja. Dipakai untuk latihan join lewat kode_unit.', '8 BARIS'],
  ['data_survei_kepuasan.csv', 'LONG', 't-orange', 'Skor kepuasan peserta per aspek dalam format long: id_survei, id_peserta, aspek, skor, komentar.', '551 BARIS'],
  ['data_kegiatan_bulanan_wide.csv', 'WIDE', 't-gold', 'Jumlah kegiatan tiap unit per bulan dalam format wide. Bahan latihan pivot_longer().', '8 BARIS'],
  ['analysis_template.Rmd', 'TEMPLATE', 't-red', 'Kerangka awal Final Capstone Project. Salin, lalu ganti namanya menjadi analysis.Rmd.', 'UNIT 14'],
];
function datasets() {
  return `<section class="hero"><h1 class="display">dataset latihan</h1><p>Unduh berkas ini, simpan di folder data proyek R-mu, lalu ikuti tugas tiap unit.</p></section>
  <div class="grid"><section class="panel" style="grid-column:1/-1;border-right:none"><div class="label">Berkas</div><div class="cards">${FILES.map(([f, tag, c, d, meta]) => `<div class="card"><div class="body"><span class="tag ${c}">${tag}</span><h3>${f}</h3><p>${d}</p></div><div class="foot"><span>${meta}</span><a href="datasets/${f}" download>Unduh</a></div></div>`).join('')}</div></section></div>`;
}

function authView() {
  const up = AUTHMODE === 'up', fg = AUTHMODE === 'forgot';
  const sub = fg ? 'Masukkan emailmu, kami kirim link untuk membuat password baru.' : up ? 'Buat akun siswa dengan kode kelas dari mentor.' : 'Masuk untuk melanjutkan progres belajarmu dari perangkat mana pun.';
  const tabs = fg ? '' : `<div class="tabs2"><button class="${up ? '' : 'on'}" data-act="authmode" data-mode="in">Masuk</button><button class="${up ? 'on' : ''}" data-act="authmode" data-mode="up">Daftar</button></div>`;
  return `<section class="hero"><h1 class="display">${fg ? 'lupa password' : 'belajar pemrograman r'}</h1><p>${sub}</p></section>
  <div class="authbox">${tabs}
    <form id="authform" novalidate>
      ${up ? '<input class="in" name="name" placeholder="Nama lengkap" autocomplete="name" maxlength="80">' : ''}
      <input class="in" name="email" type="email" placeholder="Email" autocomplete="email">
      ${fg ? '' : `<input class="in" name="password" type="password" placeholder="Password (minimal 6 karakter)" autocomplete="${up ? 'new-password' : 'current-password'}">`}
      ${up ? '<input class="in" name="code" placeholder="Kode kelas" autocomplete="off" autocapitalize="characters"><p class="help">Kode kelas diberikan oleh mentor.</p>' : ''}
      <p class="amsg" id="amsg" role="alert"></p>
      <button class="btn btn-block" type="submit">${fg ? 'Kirim link reset' : up ? 'Buat akun' : 'Masuk'}</button>
      ${AUTHMODE === 'in' ? '<button type="button" class="btn btn-ghost btn-sm" data-act="authmode" data-mode="forgot">Lupa password?</button>' : ''}
      ${fg ? '<button type="button" class="btn btn-ghost btn-sm" data-act="authmode" data-mode="in">← Kembali masuk</button><p class="help">Email tidak datang? Minta mentor mereset passwordmu ke password default.</p>' : ''}
    </form></div>`;
}

function pwView() {
  const forced = S.mustChange || S.recovery;
  const why = S.recovery ? 'Buat password baru untuk akunmu.' : S.mustChange ? 'Kamu masih memakai password default. Ganti sekarang supaya akunmu aman.' : 'Pilih password baru, minimal 6 karakter.';
  return `<section class="hero"><h1 class="display">ganti password</h1><p>${why}</p></section>
  <div class="authbox"><form id="pwform" novalidate>
    <input class="in" name="pw" type="password" placeholder="Password baru (minimal 6 karakter)" autocomplete="new-password">
    <input class="in" name="pw2" type="password" placeholder="Ulangi password baru" autocomplete="new-password">
    <p class="amsg" id="amsg" role="alert"></p>
    <button class="btn btn-block" type="submit">Simpan password</button>
    ${forced ? '<button type="button" class="btn btn-ghost btn-sm" data-act="logout">Keluar</button>' : '<a class="btn btn-ghost btn-sm" href="#/mentor">Batal</a>'}
  </form></div>`;
}

function render(keep) {
  const y = scrollY, [a, b] = route();
  chrome(a);
  let html;
  if (BOOTERR) html = `<section class="hero"><h1 class="display">gagal terhubung</h1><p>${esc(BOOTERR)}</p><div class="btns"><button class="btn" onclick="location.reload()">Coba lagi</button></div></section>`;
  else if (!Auth.ready) html = '<section class="hero"><h1 class="display">memuat…</h1></section>';
  else if (!S.user) html = authView();
  else if (S.recovery || S.mustChange || a === 'password') html = pwView();
  else html = a === 'unit' ? guide(+b) : a === 'tugas' ? tugasView(+b) : a === 'data' ? datasets() : a === 'mentor' ? mentorPage() : home();
  $('#view').innerHTML = html;
  scrollTo({ top: keep ? y : 0, behavior: 'instant' });
  if (S.role === 'mentor' && a === 'mentor' && ROSTER === null) refreshRoster();
}

document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]');
  if (!b) return;
  const a = b.dataset.act;
  if (a === 'lesson') startLesson(b.dataset.id);
  else if (a === 'ck') { Auth.toggleCheck(+b.dataset.n, +b.dataset.i); render(true); }
  else if (a === 'authmode') { AUTHMODE = b.dataset.mode; render(); }
  else if (a === 'resetpw') {
    if (ARM !== b.dataset.id) { ARM = b.dataset.id; render(true); return; }
    const who = ROSTER.find(s => s.id === ARM)?.full_name || 'siswa';
    Auth.resetStudent(ARM).then(() => toast(`Password ${who} direset ke 123456. Siswa wajib menggantinya saat masuk.`)).catch(err => toast(err.message)).finally(() => { ARM = null; render(true); });
  }
  else if (a === 'addmentor') {
    const email = $('#mentoremail').value.trim(), name = $('#mentorname').value.trim(), m = $('#mmsg');
    if (!email) { m.className = 'amsg'; m.textContent = 'Isi email mentor.'; return; }
    b.disabled = true;
    Auth.addMentor(email, name)
      .then(() => { toast(`Mentor ${email} ditambahkan. Password awal: 123456.`); ROSTER = null; render(true); })
      .catch(err => { m.className = 'amsg'; m.textContent = err.message; b.disabled = false; });
  }
  else if (a === 'logout') Auth.signOut().then(() => { location.hash = '#/'; render(); });
  else if (a === 'upload') {
    const n = +b.dataset.n, f = $('#rmdfile').files[0], m = $('#tmsg');
    m.className = 'amsg';
    if (!f) { m.textContent = 'Pilih berkas .Rmd terlebih dahulu.'; return; }
    b.disabled = true; m.className = 'amsg ok'; m.textContent = 'Mengunggah…';
    Auth.submitTask(n, f).then(() => { toast('Tugas berhasil dikumpulkan.'); render(true); }).catch(err => { m.className = 'amsg'; m.textContent = err.message; b.disabled = false; });
  }
  else if (a === 'dl') {
    Auth.taskUrl(b.dataset.uid, +b.dataset.n)
      .then(async url => {
        const blob = await (await fetch(url)).blob();
        const link = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: b.dataset.name });
        document.body.appendChild(link); link.click(); link.remove();
        setTimeout(() => URL.revokeObjectURL(link.href), 2000);
      })
      .catch(err => toast(err.message));
  }
  else if (a === 'detail') { OPEN = OPEN === b.dataset.id ? null : b.dataset.id; render(true); }
  else if (a === 'refresh') { refreshRoster(); render(true); }
  else if (a === 'setcode') {
    const v = $('#newcode').value.trim().toUpperCase(), m = $('#cmsg');
    Auth.setClassCode(v).then(() => { CODE = v; render(true); }).catch(err => { m.textContent = err.message; });
  }
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && ['ck', 'detail'].includes(e.target.dataset?.act)) { e.preventDefault(); e.target.click(); }
});
document.addEventListener('submit', async e => {
  const isPw = e.target.id === 'pwform';
  if (e.target.id !== 'authform' && !isPw) return;
  e.preventDefault();
  const f = new FormData(e.target), msg = $('#amsg'), btn = $('button[type=submit]', e.target);
  msg.className = 'amsg';

  if (isPw) {
    const pw = f.get('pw');
    const bad = pw.length < 6 ? 'Password minimal 6 karakter.' : pw !== f.get('pw2') ? 'Kedua password tidak sama.' : pw === '123456' ? 'Pilih password selain password default.' : '';
    if (bad) { msg.textContent = bad; return; }
    btn.disabled = true;
    try { await Auth.changePassword(pw); toast('Password berhasil diganti.'); location.hash = '#/'; render(); }
    catch (err) { msg.textContent = err.message; btn.disabled = false; }
    return;
  }

  const up = AUTHMODE === 'up', fg = AUTHMODE === 'forgot';
  const email = f.get('email').trim(), pw = f.get('password') || '', name = (f.get('name') || '').trim();
  const bad = !email ? 'Isi email.' : fg ? '' : !pw ? 'Isi password.' : up && !name ? 'Isi nama lengkap.' : up && pw.length < 6 ? 'Password minimal 6 karakter.' : '';
  if (bad) { msg.textContent = bad; return; }
  btn.disabled = true; msg.textContent = '';
  try {
    if (fg) {
      await Auth.forgot(email);
      msg.className = 'amsg ok'; msg.textContent = 'Jika email terdaftar, link reset sudah dikirim. Cek kotak masuk dan folder spam.'; btn.disabled = false; return;
    }
    if (up && (await Auth.signUp(email, pw, name, (f.get('code') || '').trim())) === 'confirm') {
      msg.className = 'amsg ok'; msg.textContent = 'Akun dibuat. Cek emailmu untuk konfirmasi, lalu masuk.'; btn.disabled = false; return;
    }
    if (!up) await Auth.signIn(email, pw);
    location.hash = '#/'; render();
  } catch (err) { msg.textContent = err.message; btn.disabled = false; }
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset.set) {
    S.set[t.dataset.set] = t.checked; save();
    document.body.classList.toggle('no-anim', !S.set.anim);
    render(true);
  }
});
window.addEventListener('hashchange', () => render());
setInterval(() => { if (S.role === 'mentor' && route()[0] === 'mentor' && ROSTER) refreshRoster(); }, 30000);
document.body.classList.toggle('no-anim', !S.set.anim);
render();
Auth.init().catch(e => { BOOTERR = e.message || 'Tidak bisa menghubungi server. Periksa koneksi internetmu.'; }).finally(() => { Auth.ready = true; render(); });
