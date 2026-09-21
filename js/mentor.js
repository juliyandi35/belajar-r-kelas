// Tab "Mentor" untuk siswa (profil mentor + akun) dan tab "Kelas" untuk mentor (dasbor pemantauan).
let ROSTER = null, CODE = null, RERR = '', RBUSY = false, RAT = null, OPEN = null;

async function refreshRoster() {
  if (RBUSY) return;
  RBUSY = true;
  try {
    [ROSTER, CODE] = await Promise.all([Auth.roster(), Auth.classCode()]);
    RERR = ''; RAT = new Date();
  } catch (e) {
    RERR = e.message || 'Gagal memuat data kelas.';
    ROSTER ||= [];
  }
  RBUSY = false;
  if (route()[0] === 'mentor') render(true);
}

const days = d => Math.round((new Date(today()) - new Date(d)) / 864e5);
const ago = d => { if (!d) return 'belum pernah'; const n = days(d); return n <= 0 ? 'hari ini' : n === 1 ? 'kemarin' : n + ' hari lalu'; };

function summarize(s) {
  const pr = (Array.isArray(s.progress) ? s.progress[0] : s.progress) || {};
  const done = s.lessons_done || [];
  const gap = pr.last_day ? days(pr.last_day) : days(s.created_at.slice(0, 10));
  return { pr, done, n: done.length, xp: done.reduce((n, r) => n + r.xp, 0), chk: (s.checks || []).length, idle: done.length < ALL.length && gap > 7 };
}

function detailHtml(s) {
  const got = Object.fromEntries(s.lessons_done.map(r => [r.lesson_id, r]));
  const chk = {};
  s.checks.forEach(c => (chk[c.unit] = (chk[c.unit] || 0) + 1));
  return `<div class="detail">${COURSE.map(u => `<div class="dr"><b>Unit ${u.n}</b><span class="dt">${esc(u.title)}</span>${u.lessons.map((l, i) => {
    const r = got[u.n + '.' + i];
    return r ? `<span class="badge ${r.acc >= 80 ? 'b-green' : r.acc >= 50 ? 'b-blue' : 'b-gold'}" title="${esc(l.name)}: akurasi terbaik">${r.acc}%</span>` : `<span class="badge dim" title="${esc(l.name)}: belum dikerjakan">—</span>`;
  }).join('')}<span class="dc">Checklist ${chk[u.n] || 0}/${u.guide.cek.length}</span></div>`).join('')}</div>`;
}

function accountPanel() {
  return `<div class="label">Akunmu</div><p class="help"><b>${esc(S.name)}</b><br>${esc(S.email)}<br>Peran: ${S.role === 'mentor' ? 'Mentor' : 'Siswa'}</p><button class="btn btn-secondary btn-sm" data-act="logout">Keluar</button>`;
}

function dash() {
  if (ROSTER === null) return '<section class="hero"><h1 class="display">kelas r</h1><p>Memuat data siswa…</p></section>';
  const rows = ROSTER.map(s => ({ s, ...summarize(s) }));
  const active = rows.filter(r => r.n > 0).length, finished = rows.filter(r => r.n >= ALL.length).length;
  const table = rows.length ? `<div class="tscroll"><table><thead><tr><th>Siswa</th><th>XP</th><th>Streak</th><th>Pelajaran</th><th>Checklist</th><th>Aktif</th><th>Status</th></tr></thead><tbody>${rows.map(r => {
    const [c, t] = r.n >= ALL.length ? ['b-green', 'Selesai'] : r.idle ? ['b-red', 'Tidak aktif'] : r.n ? ['b-blue', 'Berjalan'] : ['b-gold', 'Belum mulai'];
    const pct = Math.round(r.n / ALL.length * 100);
    return `<tr class="rowb" data-act="detail" data-id="${esc(r.s.id)}" tabindex="0"><td><b>${esc(r.s.full_name)}</b><br><small>${esc(r.s.email)}</small></td><td>${r.xp}</td><td>🔥 ${r.pr.streak || 0}</td><td><div class="prow" style="margin:0"><div class="bar"><i class="gold" style="width:${pct}%"></i></div><span class="pval">${r.n}/${ALL.length}</span></div></td><td>${r.chk}/${checkTotal}</td><td>${ago(r.pr.last_day)}</td><td><span class="badge ${c}">${t}</span></td></tr>${OPEN === r.s.id ? `<tr><td colspan="7">${detailHtml(r.s)}</td></tr>` : ''}`;
  }).join('')}</tbody></table></div>` : '<p class="help">Belum ada siswa. Bagikan link kursus dan kode kelas di atas.</p>';

  return `<section class="hero"><h1 class="display">kelas r</h1><p>${rows.length} siswa terdaftar, ${active} sudah mulai belajar, ${finished} selesai.</p></section>
  <div class="grid">
    <section class="panel"><div class="label">Kode kelas</div>
      <div class="codebox">${esc(CODE || '')}</div>
      <p class="help">Bagikan kode ini bersama link kursus. Siswa memakainya saat mendaftar. Mengganti kode tidak memengaruhi akun yang sudah ada.</p>
      <div class="row"><input class="in" id="newcode" placeholder="Kode baru (minimal 6 karakter)" maxlength="20" autocomplete="off"><button class="btn" data-act="setcode">Ganti kode</button></div>
      <p class="amsg" id="cmsg" role="alert"></p></section>
    <section class="panel">${accountPanel()}</section>
    <section class="panel dark" style="grid-column:1/-1;border-right:none"><div class="label">Progres siswa</div>
      <div class="row" style="align-items:center;margin-bottom:20px"><button class="btn btn-white btn-sm" data-act="refresh" ${RBUSY ? 'disabled' : ''}>${RBUSY ? 'Memuat…' : 'Segarkan'}</button><span class="help" style="margin:0">${RAT ? 'Diperbarui ' + RAT.toLocaleTimeString('id-ID') + '. Klik nama siswa untuk melihat akurasi per pelajaran.' : ''}</span></div>
      ${RERR ? `<p class="help"><span class="badge b-red">${esc(RERR)}</span></p>` : ''}${table}</section>
  </div>`;
}

function mentorCard() {
  const m = CONFIG.mentor;
  return `<section class="hero"><h1 class="display">mentor kamu</h1><p>Progres belajarmu tersimpan di akunmu dan otomatis terlihat oleh ${esc(m.name)}.</p></section>
  <div class="grid">
    <section class="panel"><div class="label">Mentor</div><div class="card mentor-card"><div class="body"><span class="tag t-blue">MENTOR</span><h3><span class="avatar">${esc(m.name[0])}</span>${esc(m.name)}</h3><p>${esc(m.bio)}</p></div><div class="foot"><span>${esc(m.role)}</span></div></div></section>
    <section class="panel">${accountPanel()}</section>
  </div>`;
}

const mentorPage = () => (S.role === 'mentor' ? dash() : mentorCard());
