// Susun tiap unit: 4 materi (konsep, dua materi inti, praktik) lalu 1 kuis. Tugas ditangani terpisah (lihat app.js).
COURSE.forEach(u => {
  const x = EXTRA[u.n];
  const [inti1, inti2, kuis] = u.lessons;
  u.lessons = [x.konsep, inti1, inti2, x.praktik, kuis];
});
