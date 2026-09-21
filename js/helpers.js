// Registry kursus + pembuat soal/kartu yang dipakai file js/data/units-*.js
window.COURSE = [];

const card = (h, p, code, out) => ({ h, p, code, out });
const mc = (q, opts, a, why) => ({ t: 'mc', q, opts, a, why });
const tf = (q, a, why) => ({ t: 'tf', q, a, why });
const ty = (q, ok, why) => ({ t: 'type', q, ok, why });
const ar = (q, ans, why, extra = []) => ({ t: 'arrange', q, ans, extra, why });

const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// **tebal** dan `kode` di dalam teks materi
const rich = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`(.+?)`/g, '<code>$1</code>');
