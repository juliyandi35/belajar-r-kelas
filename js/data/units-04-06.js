// Sumber materi: rmd/04 sampai rmd/06.
COURSE.push({
  n: 4, title: 'Import dan Inspeksi Data', blurb: 'Baca CSV dan Excel, lalu periksa sebelum dipercaya.',
  lessons: [
    { name: 'Memilih fungsi impor', cards: [
      card('Format file menentukan fungsi', 'Data datang dalam banyak format. `read_csv()` untuk .csv (koma), `read_csv2()` untuk .csv bergaya Eropa (titik koma), `read_delim()` untuk delimiter kustom, `read_tsv()` untuk .tsv, dan `read_excel()` (package `readxl`) untuk .xls/.xlsx.'),
      card('Mengapa readr lebih disarankan', 'Lebih cepat dari `read.csv()` bawaan, menghasilkan **tibble** yang rapi, dan menampilkan spesifikasi tipe kolom yang terdeteksi sehingga kesesuaian tipe bisa dicek sejak awal.'),
      card('Alur data', '**Raw Data** (mentah dari sumber) → **Imported Data** (sudah dibaca ke R) → **Inspected Data** (sudah diperiksa). Data wajib diinspeksi sebelum dipercaya untuk dianalisis.'),
    ], qs: [
      ty('Fungsi apa untuk membaca file CSV dengan readr?', ['read_csv()', 'read_csv'], '`read_csv()` dari package readr.'),
      mc('Fungsi untuk membaca file Excel (.xlsx)?', ['read_csv()', 'read_excel()', 'read_tsv()', 'read.xlsx.csv()'], 1, '`read_excel()` dari package readxl.'),
      mc('File CSV memakai titik koma (;) sebagai pemisah, tetapi semua kolom tergabung jadi satu. Perbaikannya?', ['read_csv2() atau read_delim(delim = ";")', 'head()', 'summary()', 'install.packages()'], 0, 'Delimiter yang salah membuat kolom menyatu.'),
      ar('Susun alur data yang benar:', ['Raw Data', 'Imported Data', 'Inspected Data'], 'Data mentah diimpor, lalu diinspeksi.'),
    ] },
    { name: 'Inspeksi dengan R', cards: [
      card('Membaca CSV', 'Pesan "Column specification" dari `read_csv()` bukan error. Perhatikan jika kolom yang seharusnya angka terbaca sebagai `chr`: itu tanda ada karakter tak terduga.', 'library(readr)\ndata_peserta <- read_csv("data/data_peserta_pelatihan.csv")'),
      card('Fungsi inspeksi', '`head()`/`tail()` cek baris awal/akhir. `dim()` jumlah baris dan kolom. `names()` nama kolom. `str()` struktur lengkap. `glimpse()` mirip `str()` tapi lebih rapi untuk data lebar. `summary()` ringkasan statistik dasar.', 'head(data_peserta, 5)\ndim(data_peserta)\nnames(data_peserta)\nglimpse(data_peserta)\nsummary(data_peserta$nilai_pretest)'),
      card('Membaca hasil dim()', '`dim()` menampilkan jumlah baris lalu jumlah kolom.', 'dim(data_peserta)', '[1] 156  13'),
    ], qs: [
      ty('Fungsi apa untuk menampilkan beberapa baris pertama data?', ['head()', 'head'], '`head(data, 5)` menampilkan 5 baris pertama.'),
      mc('`dim(data)` menghasilkan `[1] 156 13`. Artinya?', ['156 kolom, 13 baris', '156 baris, 13 kolom', '156 data hilang', '13 data unik'], 1, 'dim() = baris dulu, lalu kolom.'),
      ar('Susun perintah mengimpor data peserta:', ['data_peserta', '<-', 'read_csv(', '"data/data_peserta_pelatihan.csv"', ')'], 'Simpan hasil `read_csv()` ke objek.', ['read_excel(']),
      tf('`glimpse()` dan `str()` memberi informasi yang serupa.', true, 'Keduanya menampilkan struktur data; glimpse() lebih rapi untuk data lebar.'),
      mc('Kolom nilai_pretest terbaca sebagai `chr` padahal isinya angka. Apa artinya?', ['Data sempurna', 'Ada karakter tak terduga yang perlu dibersihkan', 'R rusak', 'Kolom otomatis dihapus'], 1, 'Sinyal awal masalah kualitas data, ditangani di Data Cleaning.'),
    ] },
    { name: 'Kuis unit 4', cards: [
      card('Empat kesalahan umum', 'File tidak ditemukan (cek `getwd()` dan `list.files()`). Kolom menyatu (delimiter salah). Package `readxl` belum terpasang. Baris hilang tanpa disadari (bandingkan `dim()` dengan ekspektasi).'),
    ], qs: [
      mc('Muncul error "file tidak ditemukan". Apa yang diperiksa pertama?', ['getwd() dan list.files()', 'summary()', 'library(dplyr)', 'nrow()'], 0, 'Pastikan working directory dan lokasi file sudah benar.'),
      mc('Error karena package readxl belum ada. Solusinya?', ['install.packages("readxl")', 'read_csv()', 'setwd()', 'head()'], 0, 'Pasang dulu package-nya.'),
      ty('`data_unit_kerja.csv` punya 8 baris dan 5 kolom. Fungsi apa yang menampilkan kedua angka itu sekaligus?', ['dim()', 'dim'], '`dim()` menampilkan baris lalu kolom.'),
      mc('Cara paling cepat mendeteksi baris hilang saat impor?', ['Membandingkan dim() dengan jumlah baris yang diharapkan', 'Mengganti nama kolom', 'Memakai pipe', 'Membuat grafik'], 0, 'Jumlah baris yang berbeda dari ekspektasi adalah tanda bahaya.'),
    ] },
  ],
  guide: {
    tujuan: ['Mengimpor data dari CSV, TXT, TSV, dan XLSX.', 'Memahami perbedaan `readr` dan `readxl`.', 'Memakai `head()`, `tail()`, `str()`, `summary()`, `dim()`, `names()`, dan `glimpse()`.', 'Mengenali potensi masalah data sejak proses impor.'],
    ringkasan: ['Format file menentukan fungsi impor.', 'Alur: Raw Data → Imported Data → Inspected Data.', 'head/tail/dim/names/str/glimpse/summary adalah fungsi inspeksi wajib.', 'Tipe kolom yang tak sesuai adalah sinyal awal masalah kualitas data.'],
    salah: ['File tidak ditemukan: periksa `getwd()` dan `list.files()`.', 'Kolom tergabung jadi satu: delimiter salah, pakai `read_csv2()` atau `read_delim(delim = ";")`.', 'Package `readxl` belum terpasang.', 'Baris data hilang tanpa disadari: bandingkan `dim()` dengan ekspektasi.'],
    cek: ['Saya dapat mengimpor file CSV ke R', 'Saya memahami read_csv() dan read_excel()', 'Saya dapat memeriksa struktur dataset', 'Saya dapat menggunakan glimpse() dan summary()', 'Saya dapat menjelaskan perbedaan numeric dan character'],
    tugas: 'Impor data_peserta_pelatihan.csv, data_unit_kerja.csv, dan data_survei_kepuasan.csv. Buat satu tabel ringkas (markdown) berisi jumlah baris, jumlah kolom, dan satu potensi masalah data pada masing-masing dataset.',
    data: ['data_peserta_pelatihan.csv', 'data_unit_kerja.csv', 'data_survei_kepuasan.csv', 'data_kegiatan_bulanan_wide.csv'],
  },
});

COURSE.push({
  n: 5, title: 'Data Cleaning', blurb: 'Missing value, duplikasi, dan teks yang tidak konsisten.',
  lessons: [
    { name: 'Masalah kualitas data', cards: [
      card('Garbage in, garbage out', 'Data mentah hampir tidak pernah sempurna. Data kotor menghasilkan analisis yang menyesatkan, secanggih apa pun metodenya.'),
      card('Empat jenis masalah', '**Missing values**, **duplikasi**, **teks tidak konsisten** ("hadir" vs "Hadir" vs "HADIR"), dan **format tidak valid** (tanggal atau nomor telepon bervariasi).'),
      card('Menangani missing values', '`is.na(x)` mendeteksi NA. `drop_na(data)` menghapus baris ber-NA. `replace_na(data, list(kolom = nilai))` mengisi NA dengan nilai pengganti.'),
      card('Duplikasi dan teks', '`distinct(data, id, .keep_all = TRUE)` menghapus baris duplikat berdasarkan kolom kunci dan mempertahankan kolom lain. `str_trim()` menghapus spasi berlebih; `str_to_title()`, `str_to_lower()`, `str_to_upper()` menyeragamkan kapitalisasi.'),
    ], qs: [
      ty('Fungsi apa untuk menghapus baris yang mengandung NA?', ['drop_na()', 'drop_na'], '`drop_na()` dari package tidyr.'),
      tf('R otomatis menganggap "Hadir" dan "hadir" sama.', false, 'R case-sensitive, jadi teks perlu distandardisasi.'),
      mc('Apa fungsi `.keep_all = TRUE` pada `distinct()`?', ['Menghapus semua kolom', 'Mempertahankan seluruh kolom lain', 'Menghapus NA', 'Mengurutkan data'], 1, 'Baris duplikat dihapus, kolom lain tetap dipertahankan.'),
      mc('Fungsi dplyr untuk menghapus duplikasi?', ['distinct()', 'filter()', 'select()', 'drop_na()'], 0, '`distinct()`.'),
    ] },
    { name: 'Pipeline pembersihan', cards: [
      card('Mendeteksi NA', 'Hitung jumlah NA pada kolom, lalu bandingkan sebelum dan sesudah pembersihan.', 'sum(is.na(data_peserta$tanggal_lahir))\ncolSums(is.na(data_peserta[c("tanggal_lahir", "no_hp", "nilai_posttest")]))'),
      card('Hapus duplikat', 'Tentukan kolom kunci yang tepat, misalnya `id_peserta`.', 'data_unik <- distinct(data_peserta, id_peserta, .keep_all = TRUE)\nnrow(data_peserta); nrow(data_unik)'),
      card('Satu pipeline lengkap', 'Hapus duplikat, rapikan teks status kehadiran, lalu isi NA.', 'data_bersih <- data_peserta %>%\n  distinct(id_peserta, .keep_all = TRUE) %>%\n  mutate(status_kehadiran = str_to_title(str_trim(status_kehadiran))) %>%\n  replace_na(list(status_kehadiran = "Tidak Diketahui"))'),
    ], qs: [
      ty('Apa hasil `str_to_title(str_trim("  oki santoso"))`?', ['"Oki Santoso"', 'Oki Santoso'], 'str_trim() membuang spasi, str_to_title() menjadikan huruf awal kapital.'),
      ar('Susun langkah menghapus duplikat berdasarkan id_peserta:', ['data_unik', '<-', 'distinct(', 'data_peserta,', 'id_peserta,', '.keep_all = TRUE)'], 'Kolom kunci ditulis setelah nama data.', ['drop_na(']),
      mc('Fungsi mana yang mengisi NA dengan nilai pengganti?', ['replace_na()', 'drop_na()', 'distinct()', 'str_trim()'], 0, '`replace_na(data, list(kolom = nilai))`.'),
      mc('Apa fungsi `sum(is.na(x))`?', ['Menjumlahkan nilai x', 'Menghitung banyaknya NA di x', 'Menghapus NA', 'Mengubah NA jadi 0'], 1, 'is.na() menghasilkan TRUE/FALSE; sum() menghitung TRUE.'),
    ] },
    { name: 'Kuis unit 5', cards: [
      card('Tiga kesalahan umum', 'Menghapus seluruh baris ber-NA tanpa mempertimbangkan dampaknya. Menganggap "Hadir" dan "hadir" sama. Menghapus duplikat tanpa menentukan kolom kunci yang tepat.'),
    ], qs: [
      mc('Mengisi nilai_posttest yang kosong dengan 0 berisiko karena…', ['R melarangnya', 'Rata-rata jadi seolah-olah peserta benar-benar bernilai 0', 'Kolom hilang', 'Tidak ada risikonya'], 1, 'Nilai 0 palsu menurunkan rata-rata dan menyesatkan analisis.'),
      tf('Menghapus semua baris ber-NA selalu aman.', false, 'Baris yang hanya NA di kolom tidak krusial ikut terbuang.'),
      mc('Setelah pembersihan, apa yang sebaiknya dibandingkan?', ['Warna tabel', 'Jumlah baris dan kategori sebelum dan sesudah', 'Nama file', 'Versi R'], 1, 'Pastikan tidak ada data penting yang hilang tanpa sengaja.'),
      mc('Kamu memakai `distinct(data_peserta)` tanpa kolom kunci. Risikonya?', ['Tidak ada', 'Hanya baris yang identik di semua kolom yang dianggap duplikat', 'Data terhapus semua', 'Error selalu muncul'], 1, 'Tentukan kolom kunci seperti id_peserta agar duplikat terdeteksi tepat.'),
    ] },
  ],
  guide: {
    tujuan: ['Mengidentifikasi masalah kualitas data: missing values, duplikasi, teks tidak konsisten, format tidak valid.', 'Menangani missing values dengan `is.na()`, `drop_na()`, `replace_na()`.', 'Menghapus duplikasi dengan `distinct()`.', 'Menstandardisasi teks dengan `stringr`.', 'Memahami dampak data kotor pada keputusan.'],
    ringkasan: ['Data cleaning menangani missing values, duplikasi, teks tidak konsisten, dan format tidak valid.', 'is.na()/drop_na()/replace_na() untuk missing values; distinct() untuk duplikasi.', 'Standardisasi teks penting sebelum pengelompokan atau analisis kategorikal.'],
    salah: ['Menghapus seluruh baris ber-NA tanpa mempertimbangkan dampaknya.', 'Menganggap "Hadir" dan "hadir" sama secara otomatis.', 'Menghapus duplikat tanpa menentukan kolom kunci yang tepat.'],
    cek: ['Saya dapat mendeteksi missing values dengan is.na()', 'Saya dapat menangani missing values dengan drop_na() dan replace_na()', 'Saya dapat menghapus duplikat dengan distinct()', 'Saya dapat menstandardisasi teks', 'Saya memahami dampak data kotor'],
    tugas: 'Bersihkan data_peserta_pelatihan.csv secara menyeluruh (duplikasi, missing values, teks) dan simpan hasilnya sebagai data_peserta_bersih.csv menggunakan write_csv().',
    data: ['data_peserta_pelatihan.csv'],
  },
});

COURSE.push({
  n: 6, title: 'Data Wrangling', blurb: 'select, filter, arrange, rename, dan pipe.',
  lessons: [
    { name: 'Kata kerja dplyr', cards: [
      card('Empat kata kerja', '`select(data, kol1, kol2)` memilih kolom (`-kolom` mengecualikan). `filter(data, kondisi)` menyaring baris. `arrange(data, kolom)` mengurutkan (`desc()` untuk menurun). `rename(data, baru = lama)` mengganti nama kolom.'),
      card('Pipe: merangkai langkah', 'Operator pipe `%>%` atau `|>` menghubungkan langkah berurutan, sehingga kode terbaca seperti kalimat instruksi.', 'data %>%\n  select(nama, nilai) %>%\n  filter(nilai >= 75) %>%\n  arrange(desc(nilai))'),
    ], qs: [
      ty('Fungsi dplyr apa untuk menyaring baris?', ['filter()', 'filter'], '`filter()` menyaring baris berdasarkan kondisi.'),
      tf('`arrange(data, desc(nilai))` mengurutkan dari terkecil ke terbesar.', false, '`desc()` berarti menurun (terbesar ke terkecil).'),
      mc('Apa hasil `select(data, -no_hp)`?', ['Hanya kolom no_hp', 'Seluruh kolom kecuali no_hp', 'Baris tanpa no_hp', 'Error'], 1, 'Tanda minus mengecualikan kolom.'),
      mc('Operator pipe yang umum dipakai di Tidyverse?', ['%>% atau |>', '+ atau -', '<- atau ->', '== atau !='], 0, 'Keduanya menghubungkan langkah berurutan.'),
    ] },
    { name: 'Merangkai pipeline', cards: [
      card('select dan filter', 'Pilih kolom lalu saring baris. Periksa hasil dengan `nrow()`.', 'data_ringkas <- select(data_peserta, id_peserta, nama, kode_unit, nilai_posttest)\nlulus <- filter(data_peserta, nilai_posttest >= 75)\nnrow(lulus)'),
      card('Kondisi ganda', 'Gunakan `&` (dan) atau `|` (atau) di dalam `filter()`.', 'filter(data_peserta, kode_unit == "UK01" & nilai_posttest >= 80) %>% nrow()'),
      card('Top 10 peserta', 'Buang NA, pilih kolom, urutkan menurun, ambil 10 teratas.', 'top_10 <- data_peserta %>%\n  filter(!is.na(nilai_posttest)) %>%\n  select(nama, unit_kerja, nilai_posttest) %>%\n  arrange(desc(nilai_posttest)) %>%\n  head(10)'),
    ], qs: [
      ar('Susun pipeline: pilih nama dan nilai, saring nilai ≥ 75, urutkan menurun.', ['data', '%>%', 'select(nama, nilai)', '%>%', 'filter(nilai >= 75)', '%>%', 'arrange(desc(nilai))'], 'Urutan langkah mengikuti kalimat instruksi.', ['%%']),
      mc('Kondisi untuk peserta unit UK01 dengan nilai_posttest ≥ 80?', ['kode_unit = "UK01" & nilai_posttest >= 80', 'kode_unit == "UK01" & nilai_posttest >= 80', 'kode_unit == "UK01" | nilai_posttest >= 80', 'kode_unit <- "UK01"'], 1, 'Pakai `==` untuk perbandingan dan `&` untuk kedua syarat.'),
      mc('Untuk apa `filter(!is.na(nilai_posttest))`?', ['Membuang baris yang nilai_posttest-nya NA', 'Mengisi NA dengan 0', 'Menghapus kolom', 'Mengurutkan data'], 0, '`!` membalik: hanya baris yang TIDAK NA yang dipertahankan.'),
      ty('Fungsi apa untuk mengganti nama kolom?', ['rename()', 'rename'], '`rename(data, baru = lama)`.'),
    ] },
    { name: 'Kuis unit 6', cards: [
      card('Tiga kesalahan umum', 'Memakai `=` tunggal alih-alih `==` pada `filter()`. Nama kolom salah ketik. Tertukar `&` (dan) dengan `|` (atau) pada kondisi ganda.'),
    ], qs: [
      mc('`filter(data, nilai = 75)` menghasilkan error. Perbaikannya?', ['filter(data, nilai == 75)', 'filter(data, nilai <- 75)', 'select(data, nilai)', 'arrange(data, 75)'], 0, 'Pakai `==` untuk perbandingan.'),
      mc('Hasil filter jauh lebih sedikit dari perkiraan. Dugaan pertama?', ['`&` tertukar dengan `|` pada kondisi', 'R rusak', 'Data hilang dari komputer', 'Pipe tidak bekerja'], 0, 'Periksa jumlah baris dengan nrow() dan logika kondisinya.'),
      tf('Nama kolom salah ketik menghasilkan error object not found.', true, 'Periksa nama kolom dengan names().'),
      ty('Lengkapi `rename(data, nilai_akhir = ___)` agar kolom nilai_posttest berganti nama menjadi nilai_akhir. Apa isi ___ ?', ['nilai_posttest'], 'Bentuknya `rename(data, baru = lama)`: nama baru di kiri, kolom lama di kanan.'),
    ] },
  ],
  guide: {
    tujuan: ['Memilih kolom dengan `select()`.', 'Menyaring baris dengan `filter()`.', 'Mengurutkan data dengan `arrange()`.', 'Mengganti nama kolom dengan `rename()`.', 'Merangkai operasi dplyr dengan pipe (`%>%` atau `|>`).'],
    ringkasan: ['select() memilih kolom, filter() menyaring baris, arrange() mengurutkan, rename() mengganti nama.', 'Pipe merangkai beberapa langkah dplyr menjadi alur yang mudah dibaca.'],
    salah: ['Memakai `=` tunggal alih-alih `==` pada `filter()`.', 'Nama kolom salah ketik sehingga error object not found.', 'Tertukar `&` (dan) dan `|` (atau) pada kondisi ganda.'],
    cek: ['Saya dapat menggunakan select()', 'Saya dapat menggunakan filter()', 'Saya dapat menggunakan arrange()', 'Saya dapat menggunakan rename()', 'Saya dapat merangkai fungsi dplyr dengan pipe'],
    tugas: 'Buat satu alur pipe yang menghasilkan daftar 15 peserta dengan peningkatan nilai (posttest − pretest) tertinggi, lengkap dengan nama, unit kerja, dan besaran peningkatannya.',
    data: ['data_peserta_pelatihan.csv'],
  },
});
