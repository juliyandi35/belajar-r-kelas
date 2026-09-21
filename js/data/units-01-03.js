// Sumber materi: rmd/01 sampai rmd/03 (buku ajar Pemrograman R).
COURSE.push({
  n: 1, title: 'Pengantar R dan Ekosistemnya', blurb: 'Kenalan dengan R, RStudio, dan Tidyverse.',
  lessons: [
    { name: 'Kenalan dengan R', cards: [
      card('Apa itu R?', '**R** adalah bahasa pemrograman untuk statistik, analisis data, dan visualisasi data. Kekuatan utamanya adalah **reproducible**: satu skrip bisa dijalankan berkali-kali dan hasilnya selalu identik.'),
      card('R dan RStudio', 'R adalah **mesin** yang menjalankan perintah. RStudio adalah **ruang kerja** (IDE) yang membuat mesin itu nyaman dipakai: tempat menulis skrip (Source), melihat hasil (Console), melihat objek (Environment), dan melihat grafik atau berkas (Plots/Files).'),
      card('Ekosistem package: Tidyverse', 'R punya ribuan **package**. Yang terpenting untuk pemula adalah **Tidyverse**: `readr` (impor data), `dplyr` (manipulasi data), `tidyr` (merapikan struktur data), `ggplot2` (visualisasi), serta `stringr` dan `lubridate` (teks dan tanggal).'),
    ], qs: [
      mc('R terutama dirancang untuk kebutuhan apa?', ['Membangun aplikasi mobile', 'Statistik, analisis data, dan visualisasi data', 'Desain grafis', 'Pengembangan game'], 1, 'R lahir dari kebutuhan statistik, bukan pengembangan aplikasi umum.'),
      tf('RStudio dan R adalah hal yang sama persis.', false, 'R adalah bahasa (mesinnya). RStudio adalah IDE yang mempermudah penggunaannya.'),
      mc('Package Tidyverse mana yang dipakai untuk manipulasi data?', ['readr', 'dplyr', 'ggplot2', 'lubridate'], 1, '`dplyr` menyediakan kata kerja seperti select() dan filter().'),
      mc('Mengapa R lebih cocok daripada Excel untuk laporan yang diulang rutin?', ['Karena R punya banyak warna', 'Setiap langkah tersimpan sebagai kode dan bisa dijalankan ulang', 'Karena R tidak butuh data', 'Karena R otomatis benar'], 1, 'Langkah yang tersimpan sebagai kode bisa diperiksa ulang dan dijalankan ulang kapan saja.'),
      ar('Susun alur kerja analisis data yang benar:', ['Import', 'Inspeksi', 'Cleaning', 'Wrangling', 'Transformasi', 'Analisis', 'Visualisasi', 'Laporan'], 'Alur: import → inspeksi → cleaning → wrangling → transformasi → analisis → visualisasi → laporan.'),
    ] },
    { name: 'Perintah pertamamu', cards: [
      card('Console dan print()', '`print()` menampilkan nilai ke Console.', 'print("Selamat belajar R!")', '[1] "Selamat belajar R!"'),
      card('R sebagai kalkulator', 'R langsung menghitung dan menampilkan hasil. Tanda `[1]` menunjukkan elemen pertama dari hasil.', '5 + 3\n10 / 2\n2 ^ 3', '[1] 8\n[1] 5\n[1] 8'),
      card('Menyimpan nilai ke objek', 'Operator `<-` menyimpan nilai di sisi kanan ke objek di sisi kiri.', 'nama_peserta <- "Ahmad Saputra"\nusia <- 28\nnama_peserta\nusia', '[1] "Ahmad Saputra"\n[1] 28'),
      card('install.packages() vs library()', '`install.packages()` mengunduh package (sekali saja per komputer). `library()` mengaktifkannya di sesi R yang berjalan (setiap membuka sesi baru).', 'install.packages("tidyverse")\nlibrary(tidyverse)'),
    ], qs: [
      ty('Fungsi apa yang memuat (mengaktifkan) package yang sudah terpasang?', ['library()', 'library'], '`library()` mengaktifkan package pada sesi yang sedang berjalan.'),
      ar('Susun perintah untuk menyimpan angka 10 ke objek x:', ['x', '<-', '10'], 'Bentuk yang paling direkomendasikan adalah `x <- 10`.', ['==']),
      mc('Kamu menjalankan `x <- 5`, lalu `x` di baris berikutnya. Apa yang muncul di Console?', ['Tidak ada apa-apa', '[1] 5', 'Error: object not found', '"x"'], 1, 'Memanggil nama objek menampilkan isinya.'),
      ty('Hitung `(65 + 88) / 2`. Berapa hasilnya?', ['76.5'], 'Rata-rata dua nilai: (65 + 88) / 2 = 76.5.'),
      mc('Kapan `install.packages()` perlu dijalankan?', ['Setiap membuka sesi R', 'Cukup sekali per komputer', 'Setelah setiap fungsi', 'Setelah library()'], 1, 'Package cukup dipasang sekali; library() yang dijalankan tiap sesi.'),
    ] },
    { name: 'Kuis unit 1', cards: [
      card('Tiga error klasik', 'Lupa `library(tidyverse)` → `could not find function`. Salah huruf besar-kecil pada nama objek (R **case-sensitive**). Package belum terpasang → `there is no package called`.'),
    ], qs: [
      mc('Manakah bentuk yang valid untuk menyimpan angka 10 ke objek x?', ['Hanya x = 10', 'Hanya x <- 10', 'Hanya 10 -> x', 'Ketiganya valid'], 3, 'Ketiganya valid, tetapi `<-` adalah konvensi yang paling direkomendasikan.'),
      mc('Kamu menjalankan `filter(data, nilai > 70)` dan muncul `could not find function "filter"`. Penyebab paling umum?', ['Kolom nilai tidak ada', 'library(tidyverse) belum dijalankan', 'R belum terpasang', 'Angka 70 tidak valid'], 1, 'filter() berasal dari dplyr (bagian Tidyverse) yang belum dimuat.'),
      tf('`Nilai` dan `nilai` dianggap objek yang sama oleh R.', false, 'R case-sensitive. Pakai huruf kecil dan snake_case secara konsisten.'),
      mc('Error `there is no package called "tidyverse"` berarti…', ['Package belum terpasang', 'Package sudah usang', 'Data kosong', 'Console penuh'], 0, 'Jalankan install.packages("tidyverse") dulu (butuh internet).'),
      ty('Skor akhir = 30% pretest + 70% posttest. Jika pretest 60 dan posttest 90, berapa skor akhir?', ['81'], '0.3 × 60 + 0.7 × 90 = 18 + 63 = 81.'),
      tf('Jika nilai_posttest diubah, skor_akhir otomatis ikut berubah tanpa menjalankan ulang barisnya.', false, 'skor_akhir baru berubah setelah baris perhitungannya dijalankan ulang.'),
    ] },
  ],
  guide: {
    tujuan: ['Menjelaskan apa itu R dan mengapa dipakai untuk pekerjaan data.', 'Memahami perbedaan R (bahasa) dan RStudio (IDE).', 'Mengenal ekosistem package, khususnya Tidyverse.', 'Memahami gambaran besar alur kerja analisis data.', 'Menjalankan perintah R pertama di Console.'],
    ringkasan: ['R adalah bahasa untuk statistik dan analisis data; RStudio adalah IDE-nya.', 'Tidyverse adalah kumpulan package penting untuk alur kerja data yang konsisten.', '`<-` menyimpan nilai ke objek.', 'Alur kerja: import → inspeksi → cleaning → wrangling → transformasi → analisis → visualisasi → laporan.'],
    salah: ['Lupa `library(tidyverse)` sebelum memakai fungsi Tidyverse.', 'Salah menulis nama objek (R case-sensitive).', 'Package belum terpasang sehingga `library()` gagal.'],
    cek: ['Saya dapat menjelaskan perbedaan R dan RStudio', 'Saya memahami apa itu package dan Tidyverse', 'Saya dapat menjalankan operasi aritmetika dasar di R', 'Saya dapat menyimpan nilai ke objek menggunakan <-', 'Saya dapat menjalankan library(tidyverse) tanpa error'],
    tugas: 'Instal R dan RStudio (jika belum), jalankan install.packages("tidyverse"), lalu buat skrip latihan_modul1.R berisi minimal 5 baris kode yang mendemonstrasikan operasi aritmetika dan penyimpanan objek.',
    data: [],
  },
});

COURSE.push({
  n: 2, title: 'R Environment dan Sintaks Dasar', blurb: 'Panel RStudio, fungsi, operator, dan logika TRUE/FALSE.',
  lessons: [
    { name: 'Kenali RStudio dan fungsi', cards: [
      card('Empat panel RStudio', '**Source** (kiri atas): menulis skrip .R. **Console** (kiri bawah): tempat perintah dijalankan. **Environment** (kanan atas): daftar objek tersimpan. **Files/Plots/Packages/Help** (kanan bawah): berkas, grafik, dan dokumentasi. Kebiasaan baik: tulis kode di Script, bukan langsung di Console.'),
      card('Anatomi fungsi', '`round` adalah nama fungsi, `3.14159` argumen pertama, `digits = 2` argumen bernama. Hampir semua pekerjaan di R dilakukan lewat pemanggilan fungsi.', 'round(3.14159, digits = 2)', '[1] 3.14'),
      card('Operator', 'Aritmetika: `+ - * / ^ %%`. Perbandingan: `== != > < >= <=` (hasilnya TRUE/FALSE). Logika: `& | !`.'),
      card('Working directory dan bantuan', '`getwd()` menampilkan folder aktif, `setwd()` mengubahnya. `help(mean)` atau `?mean` membuka dokumentasi fungsi.', 'getwd()\nsetwd("D:/Materi_R/data")\n?mean'),
    ], qs: [
      mc('Panel mana yang menampilkan objek yang sedang tersimpan di memori?', ['Console', 'Environment', 'Source', 'Plots'], 1, 'Environment menampilkan daftar objek.'),
      mc('Pada `round(3.456, digits = 2)`, mana nama fungsinya?', ['3.456', 'digits', 'round', '2'], 2, '`round` adalah nama fungsi; sisanya argumen.'),
      tf('`==` digunakan untuk assignment (menyimpan nilai).', false, '`==` untuk perbandingan, `<-` untuk assignment.'),
      ty('Berapa hasil `10 %% 3`?', ['1'], '`%%` menghasilkan sisa pembagian: 10 dibagi 3 bersisa 1.'),
      mc('Apa fungsi `?mean`?', ['Menghitung rata-rata', 'Membuka dokumentasi fungsi mean', 'Menghapus objek mean', 'Memuat package mean'], 1, '`?` atau help() membuka dokumentasi.'),
    ] },
    { name: 'Logika kelulusan', cards: [
      card('Membulatkan dan membandingkan', 'Operator perbandingan menghasilkan TRUE atau FALSE, konsep penting untuk menyaring data nanti.', 'round(76.5678, digits = 1)\nnilai <- 82\nnilai >= 75', '[1] 76.6\n[1] TRUE'),
      card('Menggabungkan syarat', 'Operator `&` mengharuskan **kedua** syarat terpenuhi agar hasilnya TRUE.', 'nilai_akhir <- 78\nkehadiran_persen <- 90\nlulus <- nilai_akhir >= 70 & kehadiran_persen >= 80\nlulus', '[1] TRUE'),
      card('TRUE dan FALSE bisa dihitung', 'R memperlakukan TRUE = 1 dan FALSE = 0, sehingga sangat berguna untuk menyaring baris data nanti.'),
    ], qs: [
      ty('Berapa hasil `round(76.5678, digits = 1)`?', ['76.6'], 'Dibulatkan ke satu desimal menjadi 76.6.'),
      mc('Jika `nilai <- 82`, apa hasil `nilai >= 75`?', ['TRUE', 'FALSE', '82', 'Error'], 0, '82 memang lebih besar atau sama dengan 75.'),
      ar('Susun ekspresi kelulusan (nilai ≥ 70 DAN kehadiran ≥ 80):', ['lulus', '<-', 'nilai_akhir >= 70', '&', 'kehadiran_persen >= 80'], '`&` mengharuskan keduanya TRUE.', ['|']),
      mc('Nilai akhir 78 dan kehadiran 90. Hasil `nilai_akhir >= 70 & kehadiran_persen >= 80`?', ['TRUE', 'FALSE', 'NA', '78'], 0, 'Kedua syarat terpenuhi, jadi TRUE.'),
      mc('Berapa hasil `12 %% 5`?', ['0', '2', '2.4', '7'], 1, '12 dibagi 5 bersisa 2.'),
    ] },
    { name: 'Kuis unit 2', cards: [
      card('Tiga kesalahan umum', 'Memakai `=` alih-alih `==` untuk perbandingan. Lupa tanda kutip pada teks. Tanda kurung tidak seimbang membuat Console "menggantung" (tekan Esc untuk keluar).'),
    ], qs: [
      mc('Kode `status <- Lulus` menghasilkan error object not found. Perbaikannya?', ['Ganti <- dengan ==', 'Beri tanda kutip: "Lulus"', 'Hapus status', 'Jalankan library()'], 1, 'Teks harus diberi tanda kutip, kalau tidak R mencari objek bernama Lulus.'),
      tf('Console yang "menggantung" karena kurung tidak seimbang bisa dikeluarkan dengan menekan Esc.', true, 'Tekan Esc, lalu periksa kembali kurungnya.'),
      mc('Aturan: lulus jika nilai ≥ 75 ATAU (nilai ≥ 65 DAN kehadiran 100%). Nilai 70, kehadiran 100. Hasilnya?', ['TRUE', 'FALSE', 'NA', 'Error'], 0, 'Syarat kedua terpenuhi: 70 ≥ 65 dan kehadiran 100.'),
      ar('Susun ekspresi untuk aturan di atas:', ['nilai_akhir >= 75', '|', '(', 'nilai_akhir >= 65', '&', 'kehadiran_persen == 100', ')'], '`|` berarti ATAU, `&` berarti DAN, dan kurung menjaga urutan.', ['=']),
    ] },
  ],
  guide: {
    tujuan: ['Mengenal komponen utama RStudio (Console, Script, Environment, Plots/Files).', 'Memahami objek, fungsi, argumen, dan operator.', 'Menulis dan menjalankan skrip R (.R) secara terstruktur.', 'Menggunakan komentar dan memahami working directory.', 'Menggunakan sistem bantuan help().'],
    ringkasan: ['RStudio: Script, Console, Environment, Files/Plots/Help.', 'Fungsi ditulis `nama_fungsi(argumen)`.', 'Operator perbandingan menghasilkan TRUE/FALSE.', '`getwd()` dan `setwd()` mengatur working directory.', '`help()` atau `?` membuka dokumentasi fungsi.'],
    salah: ['Memakai `=` tunggal untuk perbandingan alih-alih `==`.', 'Lupa tanda kutip pada teks: `status <- Lulus`.', 'Tanda kurung tidak seimbang sehingga Console menggantung.'],
    cek: ['Saya mengenal fungsi tiap panel RStudio', 'Saya memahami anatomi fungsi (nama, argumen)', 'Saya dapat menggunakan operator aritmetika, perbandingan, dan logika', 'Saya memahami working directory', 'Saya dapat menggunakan help() atau ? untuk dokumentasi'],
    tugas: 'Buat skrip latihan_modul2.R yang mendemonstrasikan minimal tiga jenis operator (aritmetika, perbandingan, logika) pada skenario penilaian peserta pelatihan buatanmu sendiri.',
    data: [],
  },
});

COURSE.push({
  n: 3, title: 'Tipe dan Struktur Data', blurb: 'Vector, matrix, list, data frame, dan factor.',
  lessons: [
    { name: 'Tipe dan struktur', cards: [
      card('Lima tipe data dasar', '`76.5` → numeric. `5L` → integer. `"Jakarta"` → character. `TRUE` → logical. Kategori tetap → factor. Periksa dengan `class()`.'),
      card('Lima struktur data', 'Jika tipe data adalah jenis barang, struktur data adalah jenis wadah: **vector** (1 dimensi, tipe seragam), **matrix** (2 dimensi, tipe seragam), **list** (fleksibel, tipe campuran), **data frame** (tabel, kolom bertipe campuran), dan **factor** (kategori).'),
      card('Data frame: jantung analisis', 'Baris adalah observasi, kolom adalah variabel, dan setiap kolom boleh bertipe berbeda. Hampir seluruh modul berikutnya bekerja di atas data frame (atau tibble).'),
      card('Coercion pada vector', 'Vector dibuat dengan `c()`. Seluruh elemen harus bertipe sama; jika dicampur, R otomatis mengubah semuanya menjadi character.'),
    ], qs: [
      mc('Struktur data mana yang cocok untuk tabel dengan kolom bertipe campuran?', ['Vector', 'Matrix', 'Data frame', 'Factor'], 2, 'Data frame: setiap kolom boleh bertipe berbeda.'),
      tf('Vector boleh berisi campuran numeric dan character tanpa masalah.', false, 'Akan terjadi coercion: semua elemen berubah menjadi character.'),
      mc('Tipe data apa untuk nilai `"Jakarta"`?', ['numeric', 'logical', 'character', 'factor'], 2, 'Teks di dalam tanda kutip bertipe character.'),
      mc('Tipe data mana yang dipakai untuk kategori tetap, misalnya kategori unit kerja?', ['factor', 'integer', 'matrix', 'NA'], 0, 'Factor dipakai untuk data berkategori tetap.'),
    ] },
    { name: 'Membuat dan memeriksa data', cards: [
      card('Vector dan indeks', '`c()` menggabungkan nilai. Kurung siku mengambil elemen berdasarkan urutan.', 'nilai <- c(88, 76, 92, 65)\nclass(nilai)\nnilai[2]', '[1] "numeric"\n[1] 76'),
      card('Data frame dan str()', '`str()` adalah pemeriksaan pertama yang wajib: lihat jumlah observasi dan variabel, tipe tiap kolom, dan cuplikan nilai.', 'df_peserta <- data.frame(\n  nama = c("Ani", "Budi", "Citra"),\n  usia = c(25, 30, 28),\n  lulus = c(TRUE, FALSE, TRUE)\n)\nstr(df_peserta)', '\'data.frame\': 3 obs. of  3 variables:\n $ nama : chr  "Ani" "Budi" "Citra"\n $ usia : num  25 30 28\n $ lulus: logi  TRUE FALSE TRUE'),
      card('nrow() dan ncol()', 'Hitung jumlah baris dan kolom sebuah data frame.', 'peserta <- data.frame(\n  id = c("P001", "P002", "P003"),\n  unit_kerja = c("UK01", "UK03", "UK01"),\n  nilai_akhir = c(85, 72, 90)\n)\nnrow(peserta)\nncol(peserta)', '[1] 3\n[1] 3'),
    ], qs: [
      ty('Fungsi apa untuk menggabungkan nilai menjadi vector?', ['c()', 'c'], '`c()` (combine) membuat vector.'),
      mc('Jika `nilai <- c(88, 76, 92, 65)`, apa hasil `nilai[2]`?', ['88', '76', '92', '65'], 1, 'Indeks 2 adalah elemen kedua, yaitu 76.'),
      ar('Susun perintah membuat vector usia:', ['usia', '<-', 'c(25, 30, 28, 22)'], 'Vector dibuat dengan `c()`.', ['data.frame(25, 30)']),
      mc('Fungsi mana yang menampilkan struktur lengkap sebuah data?', ['str()', 'nrow()', 'c()', 'print()'], 0, '`str()` menampilkan jumlah observasi, variabel, dan tipe kolom.'),
      ty('Sebuah data frame punya 3 baris dan 3 kolom. Berapa hasil `nrow(peserta)`?', ['3'], '`nrow()` menghitung jumlah baris.'),
    ] },
    { name: 'Kuis unit 3', cards: [
      card('Tiga kesalahan umum', 'Mencampur tipe dalam satu vector tanpa sadar. Indeks di luar jangkauan menghasilkan NA, bukan error. Matrix mewajibkan tipe seragam, sehingga tidak bisa dipakai bergantian dengan data frame.'),
    ], qs: [
      mc('Simbol apa untuk nilai hilang di R?', ['NULL', 'NA', '0', '""'], 1, 'Nilai hilang ditulis NA.'),
      tf('Mengakses indeks di luar jangkauan pada vector menghasilkan error.', false, 'Hasilnya NA, bukan error.'),
      mc('Kamu menulis `c(1, "a", TRUE)`. Tipe seluruh elemennya menjadi?', ['numeric', 'logical', 'character', 'factor'], 2, 'Coercion mengubah semuanya menjadi character.'),
      tf('Matrix dan data frame bisa dipakai bergantian karena sama-sama tabel.', false, 'Matrix mengharuskan tipe seragam; data frame tidak.'),
      ty('Jumlah pegawai tiga unit adalah 56, 34, dan 98. Berapa hasil `sum(c(56, 34, 98))`?', ['188'], '56 + 34 + 98 = 188.'),
    ] },
  ],
  guide: {
    tujuan: ['Membedakan tipe data dasar: numeric, integer, character, logical, factor.', 'Memahami lima struktur data utama: vector, matrix, list, data frame, factor.', 'Membuat dan mengakses elemen pada vector dan data frame.', 'Memahami mengapa data frame adalah struktur terpenting untuk analisis.', 'Memakai `class()`, `str()`, dan `length()` untuk memeriksa struktur.'],
    ringkasan: ['Lima tipe dasar: numeric, integer, character, logical, factor.', 'Lima struktur: vector, matrix, list, data frame, factor.', 'Data frame adalah struktur terpenting untuk analisis data.', '`str()` adalah pemeriksaan pertama yang wajib dilakukan.'],
    salah: ['Mencampur tipe dalam satu vector sehingga semua berubah menjadi character.', 'Indeks vector di luar jangkauan menghasilkan NA, bukan error.', 'Menganggap data frame dan matrix bisa dipakai bergantian.'],
    cek: ['Saya dapat membedakan lima tipe data dasar', 'Saya memahami perbedaan vector, matrix, list, dan data frame', 'Saya dapat membuat vector dan data frame secara manual', 'Saya dapat menggunakan str()', 'Saya memahami apa itu factor'],
    tugas: 'Buat data frame berisi minimal 5 baris data fiktif peserta pelatihan (nama, unit kerja, nilai), periksa strukturnya dengan str(), dan jelaskan (sebagai komentar) tipe data setiap kolom.',
    data: [],
  },
});
