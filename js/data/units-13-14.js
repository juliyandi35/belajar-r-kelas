// Sumber materi: rmd/13 dan rmd/14.
COURSE.push({
  n: 13, title: 'Keamanan dan Literasi Data Digital', blurb: 'Siklus arsip digital, kerahasiaan, dan etika data.',
  lessons: [
    { name: 'Siklus hidup arsip digital', cards: [
      card('Tujuh komponen', '1. **Penciptaan**: data mulai dibuat. 2. **Klasifikasi**: dikelompokkan menurut jenis, tahun, unit kerja, tingkat kerahasiaan. 3. **Penyimpanan**: di lokasi terstruktur. 4. **Pengamanan**: akses dibatasi. 5. **Backup**: salinan berkala. 6. **Retensi**: berapa lama disimpan. 7. **Pemusnahan**: dihapus secara aman dan terdokumentasi.'),
      card('Kerahasiaan dan minimalisasi', 'Bagikan hanya data yang benar-benar diperlukan. Data pribadi mentah (nama, kontak) jangan disertakan dalam dokumen yang dipublikasikan luas; gunakan versi agregat atau anonim.'),
    ], qs: [
      ar('Susun urutan siklus hidup arsip digital:', ['Penciptaan', 'Klasifikasi', 'Penyimpanan', 'Pengamanan', 'Backup', 'Retensi', 'Pemusnahan'], 'Penciptaan → klasifikasi → penyimpanan → pengamanan → backup → retensi → pemusnahan.'),
      mc('Tujuan tahap "Retensi"?', ['Menentukan berapa lama data disimpan sebelum dimusnahkan', 'Membuat salinan cadangan', 'Membuat data baru', 'Membatasi akses'], 0, 'Retensi = masa simpan.'),
      mc('Tahap yang mengelompokkan data menurut jenis dan tingkat kerahasiaan?', ['Klasifikasi', 'Backup', 'Pemusnahan', 'Penciptaan'], 0, 'Klasifikasi menentukan hak akses.'),
      tf('Data yang masa retensinya berakhir sebaiknya dihapus secara aman dan terdokumentasi.', true, 'Itu tahap pemusnahan.'),
    ] },
    { name: 'Praktik aman di R', cards: [
      card('Anonimisasi', 'Buang kolom yang mengidentifikasi individu sebelum data dibagikan.', 'data_publik <- data_peserta %>%\n  select(-nama, -no_hp, -email, -tanggal_lahir)'),
      card('Agregasi untuk publikasi', 'Ringkas per unit kerja agar tidak memuat individu.', 'data_publikasi <- data_peserta %>%\n  group_by(kode_unit) %>%\n  summarise(jumlah_peserta = n(),\n            rata2_nilai = mean(nilai_posttest, na.rm = TRUE))'),
      card('Jangan tulis password di skrip', 'Simpan kredensial di `.Renviron` (tidak diunggah) dan akses dengan `Sys.getenv()`.', '# JANGAN: password <- "rahasia123"\nSys.getenv("DB_PASSWORD")'),
    ], qs: [
      mc('Untuk apa `select(data, -nama, -no_hp)` dipakai dalam konteks ini?', ['Menghilangkan identitas pribadi sebelum data dibagikan', 'Mengurutkan data', 'Mengisi NA', 'Menggabungkan tabel'], 0, 'Anonimisasi.'),
      tf('Menulis password langsung di skrip yang diunggah publik adalah praktik aman.', false, 'Sangat berisiko. Pakai environment variable.'),
      ty('Fungsi untuk mengambil nilai environment variable?', ['Sys.getenv()', 'Sys.getenv'], '`Sys.getenv("NAMA_VARIABEL")`.'),
      mc('Sebelum membagikan output, pertanyaan yang perlu diajukan?', ['Bisakah seseorang mengidentifikasi individu tertentu dari tabel atau grafik ini?', 'Apakah warnanya bagus?', 'Apakah file-nya kecil?', 'Apakah R terbaru?'], 0, 'Grup terlalu kecil (1–2 orang) tetap berisiko mengungkap identitas.'),
    ] },
    { name: 'Kuis unit 13', cards: [
      card('Tiga kesalahan umum', 'Mengunggah skrip berisi password ke repositori publik (misalnya GitHub). Membagikan data mentah padahal kebutuhan sebenarnya hanya data agregat. Tidak punya kebijakan retensi dan pemusnahan yang jelas.'),
    ], qs: [
      mc('Kebutuhan bagi manajemen hanya rata-rata nilai per unit. Sebaiknya kamu bagikan…', ['Data mentah peserta lengkap', 'Data agregat per unit', 'Semua file skrip', 'Screenshot Console'], 1, 'Prinsip minimalisasi data.'),
      mc('Grup data hanya 1–2 orang meski sudah diagregasi. Risikonya?', ['Identitas individu bisa terungkap', 'Tidak ada', 'Grafik error', 'Data dobel'], 0, 'Grup kecil rentan re-identifikasi.'),
      tf('Klasifikasi data menentukan tingkat kerahasiaan dan hak akses.', true, 'Biasa, terbatas, atau rahasia.'),
      mc('Dokumentasi di awal skrip (nama dataset, klasifikasi, retensi, pengelola) berguna untuk…', ['Tata kelola dan penelusuran data', 'Mempercepat R', 'Mengganti YAML', 'Menghapus NA'], 0, 'Menjelaskan status dan tanggung jawab data.'),
    ] },
  ],
  guide: {
    tujuan: ['Memahami tujuh komponen siklus hidup arsip digital.', 'Memahami prinsip kerahasiaan data dan klasifikasinya.', 'Menerapkan praktik dasar keamanan data saat bekerja dengan R.', 'Memahami etika digital dalam pengelolaan dan pelaporan data yang melibatkan individu.'],
    ringkasan: ['Siklus arsip digital: penciptaan, klasifikasi, penyimpanan, pengamanan, backup, retensi, pemusnahan.', 'Klasifikasi menentukan tingkat kerahasiaan dan hak akses.', 'Jangan simpan kredensial di skrip publik.', 'Prinsip minimalisasi data: bagikan hanya yang benar-benar diperlukan.'],
    salah: ['Mengunggah skrip berisi password ke repositori publik.', 'Membagikan data mentah padahal kebutuhannya hanya data agregat.', 'Tidak memiliki kebijakan retensi dan pemusnahan yang jelas.'],
    cek: ['Saya memahami tujuh komponen siklus arsip digital', 'Saya memahami klasifikasi dan kerahasiaan data', 'Saya dapat membuat versi data yang aman dibagikan', 'Saya memahami praktik keamanan data di R', 'Saya memahami etika digital dalam pengelolaan data'],
    tugas: 'Susun panduan singkat (1 halaman) kebijakan pengelolaan data peserta pelatihan bela negara mengikuti tujuh komponen siklus arsip digital.',
    data: ['data_peserta_pelatihan.csv'],
  },
});

COURSE.push({
  n: 14, title: 'Final Capstone Project', blurb: 'Analisis end-to-end dari data mentah sampai laporan.',
  lessons: [
    { name: 'Alur capstone', cards: [
      card('Sebelas tahapan', '1. Import dataset. 2. Inspeksi. 3. Identifikasi masalah kualitas data. 4. Cleaning. 5. Transformasi. 6. Analisis. 7. Tabel. 8. Visualisasi (minimal 2 grafik berbeda jenis). 9. Interpretasi beserta batasannya. 10. Susun laporan R Markdown. 11. Render HTML/PDF.'),
      card('Mulai dari pertanyaan', 'Tentukan 1–2 pertanyaan analisis **sebelum** mulai coding. Contoh: "Apakah pelatihan bela negara efektif meningkatkan nilai peserta?" atau "Unit kerja mana yang perlu perhatian khusus berdasarkan kepuasan peserta?"'),
      card('Deliverable', 'Dua berkas: `analysis.Rmd` (dokumen sumber lengkap) dan hasil renderingnya, `analysis.html` atau `analysis.pdf`. Gunakan `analysis_template.Rmd` sebagai kerangka awal.'),
    ], qs: [
      mc('Dua berkas deliverable capstone?', ['analysis.Rmd dan analysis.html/.pdf', 'data.csv dan plot.png', 'README dan LICENSE', 'script.R dan notes.txt'], 0, 'Sumber dan hasil render.'),
      ar('Susun ringkas alur capstone:', ['Import', 'Inspeksi', 'Cleaning', 'Transformasi', 'Analisis', 'Visualisasi', 'Laporan'], 'Dari data mentah sampai laporan.'),
      mc('Kapan pertanyaan analisis sebaiknya dirumuskan?', ['Sebelum mulai coding', 'Setelah grafik jadi', 'Saat menulis kesimpulan', 'Tidak perlu'], 0, 'Pertanyaan mengarahkan seluruh analisis.'),
      mc('Jumlah minimal grafik yang berbeda jenis dalam capstone?', ['1', '2', '5', '10'], 1, 'Minimal 2 grafik berbeda jenis.'),
    ] },
    { name: 'Kualitas laporan', cards: [
      card('Interpretasi dan batasan', 'Penilaian tidak hanya melihat kode berjalan tanpa error, tetapi juga apakah interpretasi dan kesimpulan masuk akal dan didukung data. Sebutkan keterbatasan secara jujur.', '## Kesimpulan\n\nBerdasarkan analisis, ditemukan bahwa:\n1. Rata-rata peningkatan nilai peserta adalah 15.4 poin.\n2. Unit kategori Pusat menunjukkan rata-rata lebih tinggi (80.1) dibanding Regional (75.8).\n\n**Keterbatasan:** analisis bersifat deskriptif, belum menguji signifikansi statistik formal.'),
      card('Contoh alur ringkas', 'Gabungkan, hapus duplikat, lalu ringkas per kategori.', 'data_final <- data_peserta %>% left_join(data_unit, by = "kode_unit")\ndata_final <- data_final %>% distinct(id_peserta, .keep_all = TRUE)\n\nringkasan <- data_final %>%\n  group_by(kategori) %>%\n  summarise(rata2 = mean(nilai_posttest, na.rm = TRUE))'),
    ], qs: [
      mc('Apa yang harus ada di setiap tabel atau grafik pada laporan?', ['Narasi interpretasi', 'Warna cerah', 'Nama file', 'Tanggal cetak'], 0, 'Laporan bukan hanya kode dan output.'),
      tf('Sebaiknya langsung fokus ke visualisasi tanpa cleaning demi efisiensi waktu.', false, 'Melompat ke visualisasi tanpa inspeksi dan cleaning adalah kesalahan umum.'),
      mc('Dokumen gagal Knit menjelang deadline. Kesalahan umum yang mungkin terjadi?', ['Tidak pernah dicoba Knit penuh sebelumnya', 'Terlalu banyak grafik', 'Judul terlalu panjang', 'Font salah'], 0, 'Coba Knit penuh sejak dini.'),
      mc('Kesimpulan yang baik…', ['Didukung data konkret dan jujur menyebut keterbatasan', 'Sepanjang mungkin', 'Tanpa angka', 'Selalu memuji hasil'], 0, 'Data konkret dan keterbatasan.'),
    ] },
    { name: 'Kuis unit 14', cards: [
      card('Rubrik penilaian', 'Data Import & Inspection 10%, Data Cleaning 15%, Data Transformation 15%, Analysis 15%, Visualization 15%, Interpretation 15%, R Markdown Structure 10%, Code Quality 5%.'),
    ], qs: [
      mc('Komponen dengan bobot terkecil pada rubrik capstone?', ['Code Quality (5%)', 'Data Cleaning (15%)', 'Analysis (15%)', 'Interpretation (15%)'], 0, 'Code Quality bernilai 5%.'),
      mc('Komponen mana yang bobotnya 10%?', ['R Markdown Structure', 'Data Cleaning', 'Analysis', 'Visualization'], 0, 'Data Import & Inspection dan R Markdown Structure masing-masing 10%.'),
      tf('Capstone hanya menilai apakah kode berjalan tanpa error.', false, 'Interpretasi dan kesimpulan juga dinilai.'),
      mc('Berkas kerangka awal yang disediakan untuk capstone?', ['analysis_template.Rmd', 'template.csv', 'final.R', 'notes.md'], 0, 'Salin dan ganti namanya menjadi analysis.Rmd.'),
    ] },
  ],
  guide: {
    tujuan: ['Menjalankan alur kerja analisis data end-to-end secara mandiri.', 'Mengintegrasikan seluruh keterampilan Modul 1–13 dalam satu proyek nyata.', 'Menyusun laporan R Markdown yang profesional dan reproducible.', 'Mempresentasikan hasil analisis beserta interpretasinya secara bertanggung jawab.', 'Mengevaluasi kualitas pekerjaan sendiri dengan rubrik.'],
    ringkasan: ['Capstone mengintegrasikan seluruh keterampilan Modul 1–13 dalam satu alur end-to-end.', 'Deliverable: analysis.Rmd (sumber) dan analysis.html/pdf (hasil render).', 'Kesimpulan yang baik didukung data konkret dan jujur menyebutkan keterbatasan.'],
    salah: ['Melompat ke visualisasi tanpa cleaning dan inspeksi terlebih dahulu.', 'Laporan hanya kode dan output tanpa narasi interpretasi.', 'Dokumen gagal Knit karena tidak pernah dicoba Knit penuh sebelum deadline.'],
    cek: ['Saya telah merumuskan pertanyaan analisis yang jelas', 'Saya telah menjalankan seluruh tahapan end-to-end', 'Saya telah menyusun laporan dalam satu dokumen analysis.Rmd', 'Saya telah berhasil me-render laporan ke HTML/PDF', 'Saya telah melakukan evaluasi diri dengan rubrik'],
    tugas: 'Selesaikan analysis.Rmd, render menjadi analysis.html dan/atau analysis.pdf, lalu serahkan KEDUA berkas sebagai bukti penyelesaian Final Capstone Project. Gunakan analysis_template.Rmd sebagai kerangka awal.',
    data: ['data_peserta_pelatihan.csv', 'data_unit_kerja.csv', 'data_survei_kepuasan.csv', 'data_kegiatan_bulanan_wide.csv', 'analysis_template.Rmd'],
    rubrik: [['Data Import & Inspection', 10], ['Data Cleaning', 15], ['Data Transformation', 15], ['Analysis', 15], ['Visualization', 15], ['Interpretation', 15], ['R Markdown Structure', 10], ['Code Quality', 5]],
  },
});
