// Materi tambahan unit 8-14 (materi "Konsep dan istilah" dan "Praktik dan studi kasus"), dari rmd yang sama.
EXTRA[8] = {
  konsep: lesson('Konsep dan istilah', [
    card('Wide dan long', 'Pada format **wide**, satu periode tersebar ke beberapa kolom: kode_unit, Jan, Feb, Mar. Pada format **long**, nama bulan disimpan dalam satu kolom (`bulan`) dan nilainya di kolom lain (`jumlah`). Format long sering lebih mudah untuk analisis, agregasi, dan visualisasi.'),
    card('Istilah penting', '**Wide data**: satu periode tersebar ke beberapa kolom. **Long data**: kategori dan nilai di kolom terpisah. **pivot_longer()**: wide menjadi long. **pivot_wider()**: long menjadi wide. **Join**: menggabungkan dua dataset. **Key column**: kolom penghubung antar dataset. **left_join()**: mempertahankan seluruh baris tabel kiri. **inner_join()**: hanya yang punya pasangan. **full_join()**: seluruh baris kedua tabel.'),
  ], [
    mc('Pada format wide, data bulan disimpan…', ['Tersebar di beberapa kolom (Jan, Feb, Mar)', 'Dalam satu kolom bernama bulan', 'Dalam satu baris saja', 'Tidak disimpan'], 0, 'Itulah ciri wide.'),
    mc('Fungsi untuk mengubah long menjadi wide?', ['pivot_wider()', 'pivot_longer()', 'left_join()', 'anti_join()'], 0, 'pivot_wider().'),
    mc('`full_join()` mempertahankan…', ['Seluruh baris dari kedua tabel', 'Hanya baris yang berpasangan', 'Hanya tabel kiri', 'Hanya tabel kanan'], 0, 'Yang tidak berpasangan menghasilkan NA.'),
    tf('Format long lebih mudah untuk agregasi dan visualisasi.', true, 'Kategori dan nilainya di kolom terpisah.'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Agregasi setelah join', 'Setelah data long digabung dengan info unit, ringkas total kegiatan per kategori unit dan bulan.', 'ringkasan_kegiatan <- data_kegiatan_unit %>%\n  group_by(kategori, bulan) %>%\n  summarise(total_kegiatan = sum(jumlah_kegiatan, na.rm = TRUE),\n            .groups = "drop")'),
    card('Studi kasus: alur analisis', 'Tujuan: jumlah kegiatan tiap kategori unit pada setiap bulan. Alur: Data Kegiatan Wide → `pivot_longer()` → Data Kegiatan Long → `left_join()` → data + informasi unit → `group_by()` → `summarise()` → ringkasan kegiatan.'),
    card('Cek keunikan key', 'Jika satu key muncul beberapa kali di tabel referensi, hasil join bisa lebih banyak dari data awal (**fan-out**). Periksa dengan `count(data_unit, kode_unit)`.'),
  ], [
    ar('Susun alur analisis kegiatan:', ['pivot_longer()', 'left_join()', 'group_by()', 'summarise()'], 'Ubah ke long, gabung, kelompokkan, lalu ringkas.', ['pivot_wider()']),
    mc('Untuk total per kategori dan per bulan, `group_by()` diisi…', ['kategori, bulan', 'kode_unit saja', 'jumlah_kegiatan', 'tidak perlu diisi'], 0, 'Kelompokkan berdasarkan kedua variabel.'),
    mc('Mengapa `count(data_unit, kode_unit)` dijalankan sebelum join?', ['Memastikan key unik sehingga tidak terjadi fan-out', 'Mengurutkan data', 'Menghapus NA', 'Mengubah tipe kolom'], 0, 'Key yang muncul lebih dari sekali melipatgandakan baris.'),
    ty('Argumen `summarise()` yang mengabaikan NA saat menjumlah adalah `na.rm = …`', ['TRUE'], '`sum(x, na.rm = TRUE)`.'),
  ]),
};

EXTRA[9] = {
  konsep: lesson('Konsep dan istilah', [
    card('Statistik deskriptif', 'Statistik deskriptif meringkas data dalam jumlah besar menjadi beberapa angka yang mudah dipahami: ukuran pemusatan (mean, median, modus) dan ukuran sebaran (variansi, standar deviasi).'),
    card('Istilah penting', '**Mean**: rata-rata. **Median**: nilai tengah, tahan outlier. **Standar deviasi**: ukuran sebaran data. **Korelasi**: kekuatan hubungan linear dua variabel (−1 sampai 1). **Regresi**: memodelkan hubungan antar variabel. **Uji-t**: membandingkan rata-rata 2 kelompok. **ANOVA**: membandingkan rata-rata lebih dari 2 kelompok. **Chi-square**: menguji hubungan dua variabel kategorikal.'),
  ], [
    mc('Rentang nilai korelasi adalah…', ['−1 sampai 1', '0 sampai 100', '0 sampai 1 saja', 'Tak terbatas'], 0, 'Korelasi bernilai −1 sampai 1.'),
    mc('Uji yang membandingkan rata-rata 2 kelompok?', ['Uji-t', 'ANOVA', 'Chi-square', 'Korelasi'], 0, 'Uji-t.'),
    mc('Standar deviasi mengukur…', ['Sebaran data', 'Nilai tengah', 'Jumlah data', 'Nilai terbesar'], 0, 'Sebaran.'),
    mc('Regresi dipakai untuk…', ['Memodelkan hubungan antar variabel', 'Menghapus NA', 'Mengurutkan data', 'Membaca file'], 0, 'lm().'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Praktik: uji-t antar kategori', 'Bandingkan rata-rata nilai posttest antar dua kategori unit.', 'hasil_uji <- t.test(nilai_posttest ~ kategori, data = data_gabungan)\nhasil_uji'),
    card('Membaca p-value', 'p-value bukan jaminan kebenaran: ia mengukur seberapa mungkin hasil teramati hanya karena kebetulan. Ambang umum: p < 0.05 dianggap signifikan secara statistik.'),
    card('Studi kasus: peningkatan nilai', 'Hitung mean, median, dan sd peningkatan nilai; bandingkan rata-rata peningkatan antar kategori unit; hitung korelasi pretest-posttest.'),
  ], [
    mc('Pada `t.test(nilai_posttest ~ kategori, data = data_gabungan)`, bagian `~ kategori` berarti…', ['Membandingkan nilai_posttest antar kelompok kategori', 'Mengurutkan berdasarkan kategori', 'Menghapus kategori', 'Menghitung korelasi'], 0, 'Rumus: nilai dibandingkan antar kelompok.'),
    mc('Korelasi pretest-posttest r = 0.61 dapat dibaca sebagai…', ['Korelasi positif sedang', 'Tidak ada hubungan', 'Korelasi negatif kuat', 'Sebab-akibat pasti'], 0, 'Positif dan sedang; bukan bukti sebab-akibat.'),
    ty('Argumen `cor()` agar baris ber-NA diabaikan: `use = "…"`', ['complete.obs'], '`cor(x, y, use = "complete.obs")`.'),
    tf('p-value < 0.05 menjamin hasilnya pasti benar.', false, 'p-value bukan jaminan kebenaran.'),
  ]),
};

EXTRA[10] = {
  konsep: lesson('Konsep dan istilah', [
    card('Visualisasi sebagai alat analisis', 'Visualisasi mengubah angka menjadi gambar yang mudah dipahami. Ia adalah alat analisis, bukan hiasan. R menyediakan base R (cepat dan sederhana) dan `ggplot2` (fleksibel, berbasis **Grammar of Graphics**: data + aesthetic mapping + bentuk geometris).'),
    card('Istilah penting', '**Grammar of Graphics**: grafik dibangun dari data, aes, dan geom. **aes()**: pemetaan variabel ke elemen visual. **geom**: bentuk visual seperti bar, line, point. **Visualisasi interaktif**: grafik yang bisa di-hover dan di-zoom.'),
  ], [
    mc('geom adalah…', ['Bentuk visual grafik (bar, line, point)', 'Pemetaan variabel', 'Nama package', 'Tipe data'], 0, 'geom = bentuk geometris.'),
    mc('Visualisasi interaktif memungkinkan…', ['Grafik di-hover dan di-zoom', 'Data dihapus otomatis', 'Kode ditulis ulang', 'Tabel diurutkan'], 0, 'Contoh: plotly.'),
    mc('Grammar of Graphics membangun grafik dari…', ['data, aes, dan geom', 'warna, font, ukuran', 'tabel dan teks', 'file dan folder'], 0, 'Data + aes + geom.'),
    tf('Visualisasi hanyalah hiasan, bukan alat analisis.', false, 'Visualisasi adalah alat analisis.'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Histogram dengan base R', 'Cepat untuk mengeksplorasi distribusi.', 'hist(data_peserta$nilai_posttest,\n     main = "Distribusi Nilai Posttest",\n     xlab = "Nilai Posttest", col = "lightblue")'),
    card('Membaca scatter plot', 'Arah garis tren menunjukkan arah hubungan; kerapatan titik di sekitar garis menunjukkan kekuatan hubungan. Titik jauh dari pola (outlier) layak diperiksa lebih lanjut, bukan langsung dihapus.'),
    card('Studi kasus: tiga grafik', 'Buat histogram `nilai_posttest`, bar chart rata-rata per unit, dan scatter plot pretest vs posttest dengan `geom_smooth()`. Tantangan: line chart tren kegiatan bulanan per unit (data long), lalu jadikan interaktif dengan `ggplotly()`.'),
  ], [
    ar('Susun garis tren linear pada scatter plot:', ['geom_smooth(', 'method = "lm",', 'se = FALSE)'], '`method = "lm"` menggambar garis regresi linear.', ['geom_bar(']),
    mc('Fungsi base R untuk histogram?', ['hist()', 'barplot()', 'geom_point()', 'plot_ly()'], 0, '`hist()`.'),
    mc('Garis tren miring ke atas dan titik rapat di sekitarnya menunjukkan…', ['Hubungan positif yang kuat', 'Tidak ada hubungan', 'Data salah', 'Sebab-akibat pasti'], 0, 'Arah dan kerapatan menunjukkan sifat hubungan, bukan sebab-akibat.'),
    mc('Line chart tren kegiatan per bulan lebih mudah dibuat dari data…', ['Long', 'Wide', 'Mentah tanpa header', 'Bertipe teks'], 0, 'Format long cocok untuk visualisasi.'),
  ]),
};

EXTRA[11] = {
  konsep: lesson('Konsep dan istilah', [
    card('Tabel statis dan interaktif', 'Tabel **statis** (tidak bisa diklik, cocok untuk cetak dan PDF) dibuat dengan `kable()` atau `gt`. Tabel **interaktif** (bisa dicari dan diurutkan) dibuat dengan `DT`. Pilihannya bergantung pada media output laporan.'),
    card('Istilah penting', '**kable()**: tabel statis sederhana dari package knitr. **gt**: tabel statis dengan format lebih kaya. **DT**: tabel HTML interaktif (DataTables).'),
  ], [
    mc('Package untuk tabel statis dengan judul dan format angka yang kaya?', ['gt', 'DT', 'readr', 'stringr'], 0, 'gt.'),
    mc('Tabel interaktif yang bisa dicari dan diurutkan dibuat dengan…', ['DT', 'kable()', 'print()', 'cat()'], 0, 'DT::datatable().'),
    tf('Tabel statis cocok untuk dokumen yang akan dicetak atau PDF.', true, 'Ya.'),
    mc('kable() berasal dari package…', ['knitr', 'gt', 'DT', 'dplyr'], 0, 'knitr.'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Praktik: laporan ringkas per unit', 'Ringkas per unit dengan peningkatan nilai, urutkan dari terbaik, lalu tampilkan dengan `kable()`.', 'laporan_ringkas <- data_peserta %>%\n  group_by(kode_unit) %>%\n  summarise(\n    jumlah_peserta = n(),\n    rata2_pretest  = mean(nilai_pretest, na.rm = TRUE),\n    rata2_posttest = mean(nilai_posttest, na.rm = TRUE),\n    peningkatan    = rata2_posttest - rata2_pretest\n  ) %>%\n  arrange(desc(peningkatan))\n\nkable(laporan_ringkas, digits = 1)'),
    card('Tabel yang berbicara sendiri', 'Nama kolom jelas, angka dibulatkan secukupnya (1–2 desimal), dan diurutkan bermakna, misalnya dari performa terbaik.'),
    card('Studi kasus: dua versi tabel', 'Buat tabel ringkasan per unit dengan `kable()` untuk PDF dan tabel data mentah interaktif dengan `DT` untuk web, lalu jelaskan alasan pemilihan masing-masing.'),
  ], [
    ar('Susun tabel interaktif 5 baris per halaman:', ['datatable(', 'data_unit,', 'options = list(pageLength = 5))'], '`pageLength` mengatur jumlah baris per halaman.', ['kable(']),
    mc('Kolom peningkatan dihitung dari…', ['rata2_posttest - rata2_pretest', 'rata2_pretest - rata2_posttest', 'jumlah_peserta * 2', 'n() / 2'], 0, 'Posttest dikurangi pretest.'),
    mc('Tabel ringkasan untuk arsip PDF sebaiknya memakai…', ['kable() atau gt', 'DT', 'Tangkapan layar', 'Tidak ada tabel'], 0, 'Statis untuk PDF.'),
    ty('Fungsi gt untuk memberi judul tabel?', ['tab_header()', 'tab_header'], '`gt(data) %>% tab_header(title = "...")`.'),
  ]),
};

EXTRA[12] = {
  konsep: lesson('Konsep dan istilah', [
    card('Narasi + kode + output', '**R Markdown** menggabungkan narasi, kode R, dan output dalam satu file `.Rmd`. Saat di-Knit, kode dijalankan ulang sehingga laporan selalu sesuai dengan data dan kode terbaru. Ini mengurangi risiko laporan memakai tabel atau grafik lama.'),
    card('Istilah penting', '**.Rmd**: ekstensi file R Markdown. **YAML**: metadata di awal dokumen. **Markdown**: sintaks sederhana untuk memformat teks. **R chunk**: blok kode R yang dapat dijalankan. **Knit**: menjalankan kode dan membuat dokumen akhir. **Render**: istilah umum untuk menghasilkan dokumen. **Chunk option**: pengaturan perilaku sebuah chunk.'),
  ], [
    mc('Ekstensi file R Markdown?', ['.Rmd', '.csv', '.html', '.docx'], 0, '.Rmd.'),
    mc('YAML berada di…', ['Bagian paling atas dokumen, diapit tiga tanda minus', 'Di akhir dokumen', 'Di dalam chunk', 'Di Console'], 0, 'Header metadata.'),
    mc('Knit berarti…', ['Menjalankan kode dan membuat dokumen akhir', 'Menulis YAML', 'Menghapus chunk', 'Membaca data'], 0, 'Kode dijalankan ulang tiap Knit.'),
    tf('Chunk option mengatur perilaku sebuah R chunk.', true, 'Misalnya echo dan eval.'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Praktik: kode yang aman', 'Periksa dulu apakah data dan kolom yang dibutuhkan tersedia sebelum menganalisis, supaya dokumen tetap aman saat di-Knit.', 'kolom_dibutuhkan <- c("kode_unit", "nilai_pretest", "nilai_posttest")\n\nif (data_peserta_tersedia &&\n    all(kolom_dibutuhkan %in% names(data_peserta))) {\n  # analisis di sini\n}'),
    card('Studi kasus: struktur laporan', 'Susun dokumen `.Rmd` dengan bagian: Pendahuluan, Data dan Metodologi, Hasil Analisis, Tabel, Grafik, Interpretasi, Kesimpulan. Minimal satu tabel, satu grafik, satu statistik deskriptif, dan satu inline R expression. Knit ke HTML dulu; setelah berhasil, coba PDF.'),
    card('Latihan bertahap', 'Dasar: dokumen baru berisi `summary()` sebuah vector, Knit ke HTML. Menengah: dataset `mtcars` dengan lima baris pertama, ringkasan mpg, rata-rata hp, dan tabel `kable()`. Tantangan: laporan kecil lengkap dari judul sampai kesimpulan, Knit ke HTML dan PDF.'),
  ], [
    ar('Susun bagian laporan dari awal:', ['Pendahuluan', 'Data dan Metodologi', 'Hasil Analisis', 'Interpretasi', 'Kesimpulan'], 'Urutan naratif laporan analisis.'),
    mc('Operator `%in%` pada `all(kolom %in% names(data))` memeriksa…', ['Apakah semua kolom yang dibutuhkan ada di data', 'Apakah data kosong', 'Jumlah baris', 'Tipe kolom'], 0, 'Mengecek keanggotaan.'),
    mc('Format apa yang sebaiknya di-Knit terlebih dahulu?', ['HTML', 'PDF', 'Word', 'Tidak perlu di-Knit'], 0, 'HTML dulu, lalu PDF setelah berhasil.'),
    mc('Sintaks inline R code untuk menampilkan hasil round(mean(x), 2) di dalam kalimat narasi?', ['`r round(mean(x), 2)`', '{r round(mean(x), 2)}', '$r round(mean(x), 2)$', '<r round(mean(x), 2)>'], 0, 'Inline R code ditulis di antara tanda backtick, diawali huruf r.'),
  ]),
};

EXTRA[13] = {
  konsep: lesson('Konsep dan istilah', [
    card('Tanggung jawab atas data', 'Kemampuan mengolah data dengan R harus diimbangi tanggung jawab mengelola data secara aman dan etis, terutama saat menangani data yang melibatkan individu seperti data peserta pelatihan.'),
    card('Istilah penting', '**Penciptaan**: membuat dokumen atau data baru. **Klasifikasi**: mengelompokkan data menurut jenis dan kerahasiaan. **Penyimpanan**: menyimpan di lokasi terstruktur. **Pengamanan**: perlindungan dari akses tak berwenang. **Backup**: salinan cadangan. **Retensi**: lama penyimpanan sebelum dimusnahkan. **Pemusnahan**: penghapusan data yang masa simpannya berakhir. **Anonimisasi**: menghilangkan identitas individu dari dataset.'),
  ], [
    mc('Anonimisasi adalah…', ['Menghilangkan identitas individu dari dataset', 'Mengenkripsi file', 'Membuat salinan data', 'Menghapus seluruh data'], 0, 'Anonimisasi.'),
    mc('Retensi adalah…', ['Lama penyimpanan sebelum data dimusnahkan', 'Salinan cadangan', 'Pengelompokan data', 'Pembatasan akses'], 0, 'Masa simpan.'),
    mc('Backup adalah…', ['Salinan cadangan data', 'Penghapusan data', 'Klasifikasi data', 'Pembuatan data'], 0, 'Backup.'),
    tf('Data yang melibatkan individu tidak perlu perlakuan khusus.', false, 'Perlu tanggung jawab dan etika.'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Dokumentasikan dataset di awal skrip', 'Catat nama dataset, klasifikasi, retensi, dan pengelola.', '# ==========================================\n# Nama Dataset : data_peserta_pelatihan.csv\n# Klasifikasi  : Terbatas (memuat data pribadi)\n# Retensi      : 5 tahun sejak tanggal pelatihan\n# Pengelola    : Sekretariat Diklat\n# =========================================='),
    card('Studi kasus: kebijakan data peserta', 'Klasifikasikan `data_peserta_pelatihan.csv` (biasa, terbatas, atau rahasia) beserta alasannya; buat versi `data_publikasi` hasil agregasi; usulkan kebijakan retensi sederhana.'),
    card('Latihan bertahap', 'Dasar: sebutkan ketujuh komponen siklus hidup arsip digital. Menengah: buat ringkasan per `kode_unit` sebagai versi aman dipublikasikan. Tantangan: rancang skema klasifikasi kerahasiaan untuk tiga dataset beserta alasannya.'),
  ], [
    mc('Data peserta memuat nama, kontak, dan tanggal lahir. Klasifikasi yang sesuai?', ['Terbatas (memuat data pribadi)', 'Biasa, boleh dipublikasikan bebas', 'Tidak perlu diklasifikasikan', 'Selalu dimusnahkan'], 0, 'Karena memuat data pribadi.'),
    mc('Retensi "5 tahun sejak tanggal pelatihan" artinya…', ['Data disimpan 5 tahun, setelah itu dimusnahkan sesuai kebijakan', 'Data dihapus hari ini', 'Data disimpan selamanya', 'Data tidak boleh dibuka'], 0, 'Menentukan lama penyimpanan.'),
    mc('Versi data yang aman dipublikasikan sebaiknya…', ['Berupa ringkasan agregat tanpa identitas', 'Memuat nama lengkap', 'Memuat nomor telepon', 'Memuat email peserta'], 0, 'Prinsip minimalisasi data.'),
    ar('Urutkan lima komponen awal siklus arsip digital:', ['Penciptaan', 'Klasifikasi', 'Penyimpanan', 'Pengamanan', 'Backup'], 'Lima komponen pertama dari tujuh.'),
  ]),
};

EXTRA[14] = {
  konsep: lesson('Konsep dan istilah', [
    card('Puncak perjalanan belajar', 'Final Capstone Project adalah puncak perjalanan belajarmu. Alur yang dijalankan: Import → Inspeksi → Data Quality → Cleaning → Transformasi → Analisis → Tabel → Visualisasi → Interpretasi → Laporan R Markdown → Render HTML/PDF. Pilih dataset dari folder data atau gabungkan lewat join.'),
    card('Istilah penting', '**End-to-end workflow**: alur analisis lengkap dari data mentah sampai laporan final. **Rubrik penilaian**: kriteria dan bobot penilaian kualitas pekerjaan. **Deliverable**: hasil akhir yang harus diserahkan.'),
  ], [
    mc('End-to-end workflow berarti…', ['Alur lengkap dari data mentah sampai laporan final', 'Hanya tahap visualisasi', 'Hanya tahap import', 'Alur tanpa laporan'], 0, 'Dari awal sampai akhir.'),
    mc('Rubrik penilaian adalah…', ['Kriteria dan bobot penilaian kualitas pekerjaan', 'Daftar dataset', 'Template YAML', 'Jenis grafik'], 0, 'Rubrik.'),
    mc('Deliverable adalah…', ['Hasil akhir yang harus diserahkan', 'Nama package', 'Jenis data', 'Judul laporan'], 0, 'Yang dikumpulkan.'),
    tf('Laporan capstone boleh berisi kode dan output saja tanpa narasi interpretasi.', false, 'Interpretasi dan kesimpulan ikut dinilai.'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Rumuskan pertanyaan analisis', 'Tentukan 1–2 pertanyaan analisis **sebelum** mulai coding. Contoh: "Apakah pelatihan bela negara efektif meningkatkan nilai peserta?" atau "Unit kerja mana yang perlu perhatian khusus berdasarkan kepuasan peserta?"'),
    card('Contoh alur ringkas', 'Gabungkan data, hapus duplikat, lalu ringkas per kategori.', 'data_final <- data_peserta %>% left_join(data_unit, by = "kode_unit")\ndata_final <- data_final %>% distinct(id_peserta, .keep_all = TRUE)\n\nringkasan <- data_final %>%\n  group_by(kategori) %>%\n  summarise(rata2 = mean(nilai_posttest, na.rm = TRUE))'),
    card('Latihan bertahap', 'Dasar: tulis 1–2 pertanyaan analisis dan buat kerangka `analysis.Rmd` dengan judul bagian utama. Menengah: kerjakan Import, Inspeksi, dan Cleaning pada dataset pilihan dengan narasi tiap bagian. Tantangan: selesaikan seluruh `analysis.Rmd`, render ke HTML, dan lakukan self-assessment dengan rubrik.'),
  ], [
    mc('Kapan pertanyaan analisis sebaiknya dirumuskan?', ['Sebelum mulai coding', 'Setelah semua grafik jadi', 'Saat menulis kesimpulan', 'Tidak perlu'], 0, 'Pertanyaan mengarahkan analisis.'),
    ar('Susun alur ringkas contoh capstone:', ['left_join()', 'distinct()', 'group_by()', 'summarise()'], 'Gabung, hapus duplikat, kelompokkan, ringkas.', ['pivot_longer()']),
    mc('Pada contoh, `distinct(id_peserta, .keep_all = TRUE)` berguna untuk…', ['Menghapus baris duplikat berdasarkan id_peserta', 'Mengurutkan peserta', 'Menghapus kolom', 'Menggabungkan tabel'], 0, 'Kunci duplikat adalah id_peserta.'),
    mc('Dua berkas yang diserahkan untuk capstone?', ['analysis.Rmd dan analysis.html atau analysis.pdf', 'data.csv dan foto', 'README dan LICENSE', 'script.R saja'], 0, 'Sumber dan hasil render.'),
  ]),
};
