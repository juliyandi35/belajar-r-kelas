// Sumber materi: rmd/10 sampai rmd/12.
COURSE.push({
  n: 10, title: 'Visualisasi Data', blurb: 'Base R, ggplot2, dan Grammar of Graphics.',
  lessons: [
    { name: 'Grammar of Graphics', cards: [
      card('Base R vs ggplot2', '`plot()`, `hist()`, `barplot()` cepat untuk eksplorasi. `ggplot2` lebih fleksibel dan estetis untuk presentasi, berbasis **Grammar of Graphics**: data + pemetaan aesthetic (`aes`) + bentuk geometris (`geom`).'),
      card('Tiga jenis grafik utama', 'Bar chart (`geom_bar()` / `geom_col()`) untuk kategori. Line chart (`geom_line()`) untuk tren waktu. Scatter plot (`geom_point()`) untuk hubungan dua variabel numerik.'),
      card('Interpretasi yang bertanggung jawab', 'Grafik menunjukkan pola, bukan sebab-akibat. Sumbu-y bar chart yang tidak mulai dari 0 bisa melebih-lebihkan perbedaan secara visual.'),
    ], qs: [
      mc('Fungsi ggplot2 untuk memetakan variabel ke sumbu atau warna?', ['aes()', 'geom_point()', 'labs()', 'theme_minimal()'], 0, '`aes()` = aesthetic mapping.'),
      mc('Geom yang tepat untuk scatter plot?', ['geom_bar()', 'geom_line()', 'geom_point()', 'geom_col()'], 2, '`geom_point()`.'),
      mc('Grafik yang paling cocok untuk tren waktu?', ['Line chart', 'Scatter plot', 'Histogram', 'Pie'], 0, '`geom_line()` untuk tren.'),
      ar('Susun tiga bahan Grammar of Graphics:', ['data', 'aes', 'geom'], 'Data + aes + geom.', ['tabel']),
    ] },
    { name: 'Membuat grafik', cards: [
      card('Bar chart', 'Untuk data yang sudah diringkas, pakai `geom_col()` (bukan `geom_bar()`).', 'ringkasan_unit <- data_peserta %>%\n  group_by(kode_unit) %>%\n  summarise(rata2 = mean(nilai_posttest, na.rm = TRUE))\n\nggplot(ringkasan_unit, aes(x = kode_unit, y = rata2)) +\n  geom_col(fill = "steelblue") +\n  labs(title = "Rata-rata Nilai Posttest per Unit Kerja",\n       x = "Unit Kerja", y = "Rata-rata Nilai") +\n  theme_minimal()'),
      card('Scatter plot + garis tren', 'Arah garis menunjukkan arah hubungan; kerapatan titik menunjukkan kekuatan hubungan.', 'ggplot(data_peserta, aes(x = nilai_pretest, y = nilai_posttest)) +\n  geom_point(alpha = 0.6, color = "darkblue") +\n  geom_smooth(method = "lm", se = FALSE, color = "red")'),
      card('Interaktif dengan plotly', '`ggplotly(p)` mengubah grafik ggplot2 menjadi interaktif (hover dan zoom).'),
    ], qs: [
      mc('Data sudah diringkas (satu baris per unit). Geom yang tepat untuk bar chart?', ['geom_col()', 'geom_bar()', 'geom_point()', 'geom_smooth()'], 0, '`geom_bar()` menghitung sendiri; untuk nilai yang sudah ada pakai `geom_col()`.'),
      ty('Fungsi apa yang mengubah grafik ggplot2 menjadi interaktif?', ['ggplotly()', 'ggplotly'], '`ggplotly(p)` dari package plotly.'),
      ar('Susun kode dasar scatter plot:', ['ggplot(data_peserta,', 'aes(x = nilai_pretest, y = nilai_posttest))', '+', 'geom_point()'], 'Lapisan grafik ditambahkan dengan `+`.', ['%>%']),
      mc('Fungsi `labs()` dipakai untuk…', ['Judul dan label sumbu', 'Menyaring data', 'Mengurutkan data', 'Menghapus NA'], 0, 'labs(title, x, y).'),
    ] },
    { name: 'Kuis unit 10', cards: [
      card('Tiga kesalahan umum', 'Memakai `geom_bar()` pada data yang sudah diringkas (seharusnya `geom_col()`). Lupa `library(ggplot2)` atau `library(tidyverse)`. Sumbu-y bar chart tidak dimulai dari 0.'),
    ], qs: [
      tf('`geom_bar()` dan `geom_col()` selalu bisa saling menggantikan.', false, '`geom_bar()` menghitung frekuensi, `geom_col()` memakai nilai yang sudah ada.'),
      mc('Sumbu-y bar chart tidak dimulai dari 0. Dampaknya?', ['Perbedaan tampak lebih besar dari sebenarnya', 'Tidak ada dampak', 'Grafik error', 'Warna berubah'], 0, 'Bisa menyesatkan pembaca.'),
      mc('Ada titik jauh dari pola pada scatter plot. Tindakan yang tepat?', ['Periksa dulu, jangan langsung dihapus', 'Hapus otomatis', 'Abaikan grafik', 'Ganti dengan bar chart'], 0, 'Outlier layak diperiksa lebih lanjut.'),
      mc('Muncul error `could not find function "ggplot"`. Penyebabnya?', ['ggplot2/tidyverse belum dimuat', 'Data kosong', 'Salah warna', 'File hilang'], 0, 'Jalankan library(ggplot2) atau library(tidyverse).'),
    ] },
  ],
  guide: {
    tujuan: ['Membuat grafik dasar dengan base R: `plot()`, `hist()`, `barplot()`.', 'Membuat grafik dengan `ggplot2` dan konsep Grammar of Graphics.', 'Membuat bar chart, line chart, dan scatter plot.', 'Menginterpretasi visualisasi secara tepat dan hati-hati.', 'Membuat visualisasi interaktif sederhana dengan `plotly`.'],
    ringkasan: ['Base R cepat untuk eksplorasi; ggplot2 fleksibel untuk presentasi.', 'Grammar of Graphics: data + aes + geom.', 'geom_bar/col (kategori), geom_line (tren), geom_point (hubungan).', 'Visualisasi adalah alat analisis yang perlu diinterpretasikan hati-hati.'],
    salah: ['Memakai `geom_bar()` pada data yang sudah diringkas (seharusnya `geom_col()`).', 'Lupa `library(ggplot2)` atau `library(tidyverse)`.', 'Sumbu-y bar chart tidak dimulai dari 0.'],
    cek: ['Saya dapat membuat grafik dasar base R', 'Saya memahami Grammar of Graphics', 'Saya dapat membuat bar, line, dan scatter dengan ggplot2', 'Saya dapat menginterpretasikan visualisasi secara tepat', 'Saya dapat membuat visualisasi interaktif dengan plotly'],
    tugas: 'Buat tiga visualisasi (histogram, bar chart, scatter plot) dari data_peserta_pelatihan.csv, masing-masing disertai satu kalimat interpretasi dan satu kalimat batasan kesimpulan.',
    data: ['data_peserta_pelatihan.csv', 'data_kegiatan_bulanan_wide.csv'],
  },
});

COURSE.push({
  n: 11, title: 'Tabel Profesional dan Reporting', blurb: 'kable, gt, dan DT untuk laporan.',
  lessons: [
    { name: 'Statis vs interaktif', cards: [
      card('Dua jenis tabel', 'Tabel **statis** (cocok untuk cetak dan PDF) dibuat dengan `kable()` atau `gt`. Tabel **interaktif** (bisa dicari dan diurutkan) dibuat dengan `DT`. Pilih sesuai media output laporan.'),
      card('kable() dan gt', '`kable(data, col.names = ..., digits = ...)` sederhana dan cepat. `gt(data) %>% tab_header() %>% fmt_number()` lebih kaya: judul, format angka, warna.'),
      card('DT::datatable()', 'Menghasilkan tabel HTML dengan pencarian, pengurutan, dan pagination. Hanya berfungsi pada output HTML, bukan PDF.', 'library(DT)\ndatatable(data_peserta, options = list(pageLength = 10))'),
    ], qs: [
      mc('Package untuk tabel HTML interaktif?', ['DT', 'knitr', 'readr', 'stringr'], 0, '`DT::datatable()`.'),
      tf('Tabel DT berfungsi normal di dokumen PDF.', false, 'Fitur interaktif tidak berfungsi di cetak/PDF.'),
      ty('Fungsi knitr yang paling umum untuk tabel statis?', ['kable()', 'kable'], '`knitr::kable()`.'),
      mc('Laporan untuk arsip PDF sebaiknya memakai tabel…', ['Statis (kable/gt)', 'Interaktif (DT)', 'Tidak ada tabel', 'Screenshot'], 0, 'Tabel statis cocok untuk cetak/PDF.'),
    ] },
    { name: 'Tabel rapi', cards: [
      card('Ringkasan dengan kable()', 'Ganti nama kolom dengan `col.names` dan bulatkan angka dengan `digits`.', 'ringkasan_unit <- data_peserta %>%\n  group_by(kode_unit) %>%\n  summarise(rata2_nilai = mean(nilai_posttest, na.rm = TRUE), jumlah = n())\n\nkable(ringkasan_unit,\n      col.names = c("Kode Unit", "Rata-rata Nilai", "Jumlah Peserta"),\n      digits = 1)'),
      card('Tabel yang baik berbicara sendiri', 'Nama kolom jelas, angka dibulatkan secukupnya (1–2 desimal), dan diurutkan bermakna (misalnya dari performa terbaik).'),
      card('Versi gt', 'Judul, subjudul, dan format angka.', 'library(gt)\ngt(ringkasan_unit) %>%\n  tab_header(title = "Ringkasan Nilai Peserta", subtitle = "Per Unit Kerja") %>%\n  fmt_number(columns = rata2_nilai, decimals = 1)'),
    ], qs: [
      mc('Argumen `kable()` untuk mengganti nama kolom?', ['col.names', 'digits', 'caption', 'align'], 0, '`col.names`.'),
      mc('Argumen `kable()` untuk membulatkan angka?', ['digits', 'col.names', 'options', 'title'], 0, '`digits = 1` membulatkan ke 1 desimal.'),
      ar('Susun tabel gt dengan judul:', ['gt(ringkasan_unit)', '%>%', 'tab_header(title = "Ringkasan Nilai Peserta")'], 'gt() lalu tab_header().', ['kable(']),
      mc('Angka 82.142857143 di tabel laporan sebaiknya…', ['Dibulatkan dengan digits', 'Dibiarkan', 'Dihapus', 'Dijadikan teks'], 0, 'Desimal berlebihan mengganggu pembaca.'),
    ] },
    { name: 'Kuis unit 11', cards: [
      card('Tiga kesalahan umum', 'Angka desimal berlebihan. Memakai DT pada dokumen PDF. Lupa memuat `library(knitr)`, `library(gt)`, atau `library(DT)`.'),
    ], qs: [
      mc('Tabel `datatable()` kamu tidak muncul interaktif di PDF. Penyebabnya?', ['DT hanya untuk output HTML', 'Data salah', 'R lambat', 'Warna gelap'], 0, 'Gunakan kable() untuk PDF.'),
      tf('Sebelum memakai `gt()` perlu `library(gt)`.', true, 'Package harus dimuat dulu.'),
      mc('Tabel untuk halaman web internal yang perlu pencarian sebaiknya memakai…', ['DT::datatable()', 'kable()', 'print()', 'str()'], 0, 'Interaktif untuk web.'),
      mc('Tabel ringkasan diurutkan dari performa terbaik. Fungsi yang dipakai sebelum kable()?', ['arrange(desc(...))', 'select()', 'rename()', 'distinct()'], 0, 'Urutan bermakna membuat tabel lebih informatif.'),
    ] },
  ],
  guide: {
    tujuan: ['Membuat tabel statis dengan `knitr::kable()` dan package `gt`.', 'Membuat tabel interaktif dengan package `DT`.', 'Memahami kapan memakai tabel statis vs interaktif.', 'Menyusun tabel ringkasan hasil `group_by()`/`summarise()`.', 'Memformat tabel: nama kolom, pembulatan angka, highlight nilai penting.'],
    ringkasan: ['kable()/gt untuk tabel statis; DT::datatable() untuk tabel interaktif HTML.', 'Pilih sesuai media output: cetak/PDF (statis) atau web (interaktif).', 'Selalu bulatkan angka dan beri nama kolom deskriptif.'],
    salah: ['Angka desimal berlebihan, misalnya 82.142857143 (gunakan `digits`).', 'Memakai DT pada dokumen PDF.', 'Lupa memuat library(knitr), library(gt), atau library(DT).'],
    cek: ['Saya dapat membuat tabel statis dengan kable()', 'Saya dapat membuat tabel dengan gt', 'Saya dapat membuat tabel interaktif dengan DT', 'Saya memahami kapan memakai tabel statis vs interaktif', 'Saya dapat memformat tabel agar mudah dibaca'],
    tugas: 'Susun tabel laporan akhir evaluasi (jumlah peserta, rata-rata nilai, kategori terbanyak per unit) dalam dua versi: kable() untuk arsip PDF dan DT::datatable() untuk halaman web internal.',
    data: ['data_peserta_pelatihan.csv', 'data_unit_kerja.csv'],
  },
});

COURSE.push({
  n: 12, title: 'R Markdown dan Reproducible Reporting', blurb: 'Narasi + kode + output dalam satu dokumen.',
  lessons: [
    { name: 'Anatomi R Markdown', cards: [
      card('Narasi + Kode R + Output', '**R Markdown** menggabungkan narasi, kode R, dan output dalam satu file `.Rmd`. Saat di-**Knit**, kode dijalankan ulang sehingga laporan selalu sesuai data dan kode terbaru.'),
      card('Tiga komponen', '**YAML header** (metadata dan format output, diapit `---`), **teks Markdown** (struktur teks), dan **R chunk** (blok kode). Gunakan spasi, bukan tab, pada indentasi YAML.', '---\ntitle: "Laporan Evaluasi Pelatihan"\nauthor: "Tim Evaluasi"\noutput:\n  html_document:\n    toc: true\n---'),
      card('Opsi chunk', '`echo=FALSE` menyembunyikan kode tetapi tetap menjalankannya. `eval=FALSE` menampilkan kode tanpa menjalankannya. `include=FALSE` menjalankan kode tetapi menyembunyikan kode dan hasil. `message=FALSE` dan `warning=FALSE` menyembunyikan pesan.'),
    ], qs: [
      mc('Tiga elemen utama yang digabungkan dalam R Markdown?', ['Data, Excel, PowerPoint', 'Narasi, kode R, output', 'HTML, CSS, JavaScript', 'R, Python, SQL'], 1, 'Satu dokumen memuat ketiganya.'),
      mc('Bagian mana yang mengatur judul dan format output?', ['Console', 'R chunk', 'YAML header', 'Environment'], 2, 'YAML header.'),
      mc('Fungsi `echo=FALSE`?', ['Tidak menjalankan kode', 'Menyembunyikan kode tetapi tetap menjalankannya', 'Menghapus output', 'Menghentikan proses Knit'], 1, 'Hasil tetap tampil.'),
      mc('Fungsi `eval=FALSE`?', ['Menampilkan dan menjalankan kode', 'Menyembunyikan kode', 'Menampilkan kode tetapi tidak menjalankannya', 'Menghapus chunk'], 2, 'Berguna untuk contoh sintaks di bahan ajar.'),
    ] },
    { name: 'Knit dan reproducible', cards: [
      card('Proses Knit', 'File .Rmd → jalankan R chunk → gabungkan narasi dan output → Pandoc → HTML atau PDF. Karena Knit membangun laporan dari awal, buat atau impor setiap objek penting **di dalam dokumen**.'),
      card('Inline R code', 'Hasil perhitungan bisa langsung masuk ke kalimat. Saat di-Knit, sintaks ini diganti hasilnya.', 'Rata-rata mpg adalah `r round(mean(data_contoh$mpg), 2)`.'),
      card('Cek sebelum memakai kolom', 'Periksa nama kolom sebelum menulis sintaks yang memakainya.', 'names(data_peserta)\nfile.exists("../data/data_peserta_pelatihan.csv")'),
    ], qs: [
      tf('Dokumen R Markdown sebaiknya bisa jadi laporan tanpa bergantung pada objek buatan manual di Global Environment.', true, 'Itu inti reproducibility.'),
      mc('Kode jalan di Console tetapi gagal saat Knit. Dugaan utama?', ['Bergantung pada objek di Global Environment', 'R rusak', 'Markdown salah', 'YAML terlalu panjang'], 0, 'Impor atau buat objek di dalam dokumen.'),
      mc('Jika data berubah lalu dokumen di-Knit ulang, apa yang ikut diperbarui?', ['Tabel, grafik, dan angka di narasi', 'Hanya judul', 'Tidak ada', 'Hanya YAML'], 0, 'Itulah reproducible reporting.'),
      ar('Susun alur Knit:', ['File .Rmd', 'Jalankan R chunk', 'Gabungkan narasi + output', 'Pandoc', 'HTML / PDF'], 'Kode dijalankan ulang setiap Knit.'),
    ] },
    { name: 'Kuis unit 12', cards: [
      card('Enam kesalahan umum', 'Memakai objek yang tak pernah dibuat. Bergantung pada Global Environment. Nama chunk duplikat. Indentasi YAML salah (pakai spasi, bukan tab). Memakai nama kolom yang tidak ada. File data tidak ditemukan (cek `getwd()`).'),
    ], qs: [
      mc('Mengapa `data$nilai` bisa menghasilkan error "closure is not subsettable"?', ['`$` tidak ada di R', '`data` bisa merujuk ke fungsi bawaan R jika belum didefinisikan sebagai data frame', 'summary() hanya menerima angka tunggal', 'Markdown tidak mendukung data frame'], 1, 'Beri nama objek data yang eksplisit, mis. data_contoh.'),
      tf('Dua chunk boleh memakai nama yang sama.', false, 'Setiap chunk sebaiknya bernama unik.'),
      mc('Indentasi YAML yang benar memakai…', ['Spasi', 'Tab', 'Titik', 'Koma'], 0, 'Gunakan spasi, bukan tab.'),
      ty('Fungsi untuk memeriksa nama kolom sebuah data frame?', ['names()', 'names'], 'Selalu periksa nama kolom sebelum dipakai.'),
    ] },
  ],
  guide: {
    tujuan: ['Memahami hubungan narasi, kode R, dan output dalam laporan reproducible.', 'Memahami struktur dokumen R Markdown: YAML header, teks Markdown, R chunk.', 'Memakai opsi chunk `echo`, `message`, `warning`, `eval`.', 'Melakukan Knit ke HTML dan PDF.', 'Menyusun laporan yang menggabungkan narasi, tabel, dan grafik.'],
    ringkasan: ['R Markdown menggabungkan narasi, kode R, dan output.', 'YAML mengatur metadata dan format output; Markdown menyusun teks; R chunk menjalankan kode.', '`echo=FALSE` menyembunyikan kode tetapi menjalankannya; `eval=FALSE` menampilkan kode tanpa menjalankannya.', 'Objek laporan harus dibuat atau diimpor di dalam workflow.', 'Jangan memakai `data$kolom` sebelum memastikan `data` adalah data frame.'],
    salah: ['Menggunakan objek yang tidak pernah dibuat.', 'Bergantung pada Global Environment.', 'Nama chunk duplikat.', 'Kesalahan indentasi YAML (pakai spasi, bukan tab).', 'Memakai nama kolom yang tidak ada.', 'File data tidak ditemukan (periksa `getwd()`).'],
    cek: ['Saya memahami hubungan narasi, kode, dan output', 'Saya memahami struktur YAML, Markdown, dan R chunk', 'Saya memahami fungsi echo=FALSE dan eval=FALSE', 'Saya dapat membuat tabel dan grafik dalam R Markdown', 'Saya dapat menggunakan inline R code', 'Saya dapat Knit ke HTML dan PDF'],
    tugas: 'Buat laporan_evaluasi.Rmd berdasarkan data_peserta_pelatihan.csv dengan: YAML header, pendahuluan, deskripsi dataset, pemeriksaan struktur, analisis deskriptif, minimal satu tabel, minimal satu grafik, interpretasi, dan kesimpulan. Pastikan laporan bisa di-Knit dari awal tanpa mengandalkan objek di Global Environment.',
    data: ['data_peserta_pelatihan.csv'],
  },
});
