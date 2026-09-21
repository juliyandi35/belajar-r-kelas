// Pemutar pelajaran: kartu materi, lalu soal (pilihan, benar/salah, ketik, susun) dengan hati dan umpan balik.
let L = null;
let ac;

const beep = ok => {
  if (!S.set.sound) return;
  try {
    ac ||= new AudioContext();
    const o = ac.createOscillator(), g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.frequency.value = ok ? 660 : 220; g.gain.value = 0.06;
    o.start(); o.stop(ac.currentTime + 0.12);
  } catch { /* audio tidak tersedia */ }
};
const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const norm = s => s.toLowerCase().replace(/\s+/g, '').replace(/'/g, '"');

function startLesson(id) {
  const it = ALL.find(x => x.id === id);
  const steps = [...it.l.cards.map(c => ({ k: 'card', c })), ...it.l.qs.map(q => ({ k: 'q', q, tries: 0 }))];
  L = { it, id, steps, i: 0, hearts: 5, total: steps.length, done: 0, first: 0, quit: false, end: null };
  $('#lesson').hidden = false;
  document.body.classList.add('noscroll');
  prep(); draw();
}

// Siapkan state untuk langkah yang sedang tampil (opsi diacak, bank kata diacak).
function prep() {
  const s = L.steps[L.i];
  L.fb = null; L.sel = null; L.txt = ''; L.pick = [];
  if (!s || s.k !== 'q') return;
  const q = s.q;
  if (q.t === 'tf') { L.opts = ['Benar', 'Salah']; L.right = q.a ? 0 : 1; }
  if (q.t === 'mc') { const idx = shuffle(q.opts.map((_, i) => i)); L.opts = idx.map(i => q.opts[i]); L.right = idx.indexOf(q.a); }
  if (q.t === 'arrange') L.bank = shuffle([...q.ans, ...q.extra]);
}

const footBar = (cls, msg, label, act, off) =>
  `<div class="l-foot ${cls}"><div class="l-foot-in"><div class="fb">${msg}</div><button class="btn" data-l="${act}" ${off ? 'disabled' : ''}>${label}</button></div></div>`;

function draw() {
  const el = $('#lesson');
  if (L.end) { el.innerHTML = endHtml(); return; }
  const s = L.steps[L.i];
  const top = `<div class="l-top"><button class="l-x" data-l="quit" aria-label="Keluar">✕</button><div class="bar"><i style="width:${Math.round(L.done / L.total * 100)}%"></i></div><span class="hearts">❤️ ${L.hearts}</span></div>`;
  let body, foot;

  if (s.k === 'card') {
    const c = s.c;
    body = `<div class="kicker">${esc(L.it.u.title)}</div><h2>${rich(c.h)}</h2><p>${rich(c.p)}</p>` +
      (c.code ? `<pre class="code">${esc(c.code)}</pre>` : '') + (c.out ? `<pre class="code out">${esc(c.out)}</pre>` : '');
    foot = footBar('', '', 'LANJUT', 'next', false);
  } else {
    const q = s.q, lock = L.fb ? 'disabled' : '';
    body = `<div class="kicker">Pertanyaan</div><h2>${rich(q.q)}</h2>`;
    if (q.t === 'mc' || q.t === 'tf') {
      const cls = i => L.fb ? (i === L.right ? 'right' : i === L.sel ? 'wrong' : '') : (i === L.sel ? 'sel' : '');
      body += `<div class="opts">${L.opts.map((o, i) => `<button class="opt ${cls(i)}" data-l="pick" data-i="${i}" ${lock}>${esc(o)}</button>`).join('')}</div>`;
    } else if (q.t === 'type') {
      body += `<input class="in" id="txt" style="width:100%;margin-top:20px;font-family:ui-monospace,Consolas,monospace" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ketik jawabanmu" value="${esc(L.txt)}" ${lock}>`;
    } else {
      body += `<div class="answer">${L.pick.map((bi, n) => `<button class="chip" data-l="unpick" data-n="${n}" ${lock}>${esc(L.bank[bi])}</button>`).join('')}</div>` +
        `<div class="bank">${L.bank.map((w, i) => `<button class="chip ${L.pick.includes(i) ? 'used' : ''}" data-l="add" data-i="${i}" ${lock}>${esc(w)}</button>`).join('')}</div>`;
    }
    if (!L.fb) {
      const ready = q.t === 'type' ? L.txt.trim() !== '' : q.t === 'arrange' ? L.pick.length > 0 : L.sel !== null;
      foot = footBar('', '', 'PERIKSA', 'check', !ready);
    } else {
      const ans = q.t === 'type' ? q.ok[0] : q.t === 'arrange' ? q.ans.join(' ') : L.opts[L.right];
      const msg = L.fb.ok ? `<b>Benar!</b>${rich(q.why)}` : `<b>Belum tepat</b>Jawaban: ${esc(ans)}<br>${rich(q.why)}`;
      foot = footBar(L.fb.ok ? 'ok' : 'no', msg, 'LANJUT', 'next', false);
    }
  }

  if (L.quit) {
    foot = `<div class="l-foot no"><div class="l-foot-in"><div class="fb"><b>Yakin keluar?</b>Kemajuan pelajaran ini akan hilang.</div><div class="row"><button class="btn btn-secondary btn-sm" data-l="stay">Lanjut belajar</button><button class="btn btn-danger btn-sm" data-l="close">Keluar</button></div></div></div>`;
  }
  el.innerHTML = `${top}<div class="l-body"><div class="l-in">${body}</div></div>${foot}`;
  const t = $('#txt', el);
  if (t && !L.fb) { t.focus(); t.setSelectionRange(t.value.length, t.value.length); }
}

function check() {
  const s = L.steps[L.i], q = s.q;
  let ok;
  if (q.t === 'mc' || q.t === 'tf') ok = L.sel === L.right;
  else if (q.t === 'type') ok = q.ok.some(a => norm(a) === norm(L.txt));
  else ok = L.pick.map(i => L.bank[i]).join('\u0001') === q.ans.join('\u0001');
  L.fb = { ok };
  beep(ok);
  if (ok) { L.done++; if (!s.tries) L.first++; }
  else {
    L.hearts--;
    if (!s.tries) { L.steps.push({ ...s, tries: 1 }); L.total++; } // soal yang salah diulang sekali di akhir
  }
  draw();
}

function next() {
  if (L.steps[L.i].k === 'card') L.done++;
  if (L.hearts <= 0) { L.end = 'fail'; draw(); return; }
  L.i++;
  if (L.i >= L.steps.length) {
    const nq = L.it.l.qs.length;
    L.xp = L.first * 10;
    L.acc = Math.round(L.first / nq * 100);
    finishLesson(L.id, L.xp, L.acc);
    L.end = 'win';
  } else prep();
  draw();
}

function endHtml() {
  if (L.end === 'fail') {
    return `<div class="l-body"><div class="l-in res"><div class="display" style="color:var(--red)">hati habis</div><p>Tenang, materinya masih di sini. Ulangi pelajaran ini dan coba lagi.</p><div class="sts"><button class="btn" data-l="retry">Coba lagi</button><button class="btn btn-secondary" data-l="close">Keluar</button></div></div></div>`;
  }
  const box = (c, t, v, col) => `<div class="sbox" style="border-color:${c}"><div style="background:${c}">${t}</div><b style="color:${col}">${v}</b></div>`;
  return `<div class="l-body"><div class="l-in res"><div class="display">pelajaran selesai!</div><div class="sts">${box('var(--golden)', 'XP', '+' + L.xp, '#b8920f')}${box('var(--green)', 'AKURASI', L.acc + '%', 'var(--green-hover)')}${box('var(--red)', 'HATI', '❤️ ' + L.hearts, 'var(--red)')}</div><button class="btn" data-l="close">Lanjutkan</button></div></div>`;
}

function closeLesson() {
  $('#lesson').hidden = true;
  document.body.classList.remove('noscroll');
  L = null;
  render(true);
}

$('#lesson').addEventListener('click', e => {
  const b = e.target.closest('[data-l]');
  if (!b || !L) return;
  const a = b.dataset.l;
  if (a === 'pick') L.sel = +b.dataset.i;
  else if (a === 'add') L.pick.push(+b.dataset.i);
  else if (a === 'unpick') L.pick.splice(+b.dataset.n, 1);
  else if (a === 'check') return check();
  else if (a === 'next') return next();
  else if (a === 'quit') L.quit = true;
  else if (a === 'stay') L.quit = false;
  else if (a === 'close') return closeLesson();
  else if (a === 'retry') return startLesson(L.id);
  draw();
});
$('#lesson').addEventListener('input', e => {
  if (e.target.id !== 'txt') return;
  L.txt = e.target.value;
  $('[data-l=check]').disabled = !L.txt.trim();
});
document.addEventListener('keydown', e => {
  if (!L || e.key !== 'Enter' || e.target.tagName === 'BUTTON') return;
  $('#lesson [data-l=check]:not(:disabled), #lesson [data-l=next]')?.click();
});
