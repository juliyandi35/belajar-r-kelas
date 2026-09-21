// State sesi. Progres tiap akun disimpan di database (lihat auth.js); hanya pengaturan tampilan disimpan lokal.
const SET_KEY = 'belajar_r_set_v1';
const SET_DEF = { sound: true, anim: true, all: false };
let SET = { ...SET_DEF };
try { SET = { ...SET_DEF, ...JSON.parse(localStorage.getItem(SET_KEY) || '{}') }; } catch { /* storage diblokir: pakai default */ }

const EMPTY = () => ({ user: null, uid: null, role: null, name: '', email: '', mustChange: false, recovery: false, xp: 0, streak: 0, last: '', done: {}, checks: {}, tasks: {} });
const S = { ...EMPTY(), set: SET };
const resetState = () => Object.assign(S, EMPTY());
const save = () => { try { localStorage.setItem(SET_KEY, JSON.stringify(S.set)); } catch { /* abaikan */ } };

// Hari dihitung dengan zona WIB, sama dengan perhitungan streak di server.
const today = (back = 0) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Jakarta' }).format(new Date(Date.now() - back * 864e5));
const streakNow = () => (S.last === today() || S.last === today(1) ? S.streak : 0);

const ALL = COURSE.flatMap(u => u.lessons.map((l, i) => ({ u, l, i, id: u.n + '.' + i })));
const isDone = id => !!S.done[id];
const current = () => ALL.find(x => !isDone(x.id));
const isOpen = id => S.set.all || S.role === 'mentor' || !current() || ALL.findIndex(x => x.id === id) <= ALL.indexOf(current());

// Tugas (stage terakhir tiap unit): terbuka setelah kuis unit selesai. Tidak menahan unit berikutnya.
const quizId = n => n + '.' + (COURSE[n - 1].lessons.length - 1);
const taskDone = n => !!S.tasks[n];
const taskOpen = n => S.set.all || S.role === 'mentor' || isDone(quizId(n));

function finishLesson(id, xp, acc) {
  const prev = S.done[id];
  S.done[id] = { xp: Math.max(xp, prev?.xp || 0), acc: Math.max(acc, prev?.acc || 0) };
  S.xp = Object.values(S.done).reduce((n, d) => n + d.xp, 0);
  if (S.last !== today()) { S.streak = S.last === today(1) ? S.streak + 1 : 1; S.last = today(); }
  Auth.saveLesson(id, xp, acc);
}
