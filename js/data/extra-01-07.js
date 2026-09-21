// Materi tambahan unit 1-7 (materi "Konsep dan istilah" dan "Praktik dan studi kasus"), dari rmd yang sama.
// assemble.js menyusun tiap unit menjadi: konsep, materi lama 1, materi lama 2, praktik, kuis.
EXTRA[1] = {
  konsep: lesson('Konsep dan istilah', [
    card('R untuk pekerjaan berbasis data', 'R lahir dari kebutuhan statistisi untuk mengolah data secara efisien dan **reproducible**. Dalam pekerjaan administratif seperti data pelatihan bela negara, data unit kerja, atau data survei, R mampu menangani data dalam jumlah besar dari berbagai sumber secara konsisten dan terdokumentasi.'),
    card('Istilah penting', '**R**: bahasa open-source untuk komputasi statistik dan analisis data. **RStudio**: IDE yang mempermudah menulis dan menjalankan kode R. **Package**: paket fungsi siap pakai yang memperluas kemampuan R. **Tidyverse**: kumpulan package yang dirancang bekerja sama secara konsisten. **Reproducibility**: analisis bisa diulang dan hasilnya sama.'),
  ], [
    mc('Apa arti reproducibility?', ['Analisis bisa diulang dan menghasilkan hasil yang sama', 'Analisis selalu menghasilkan hasil berbeda', 'Analisis hanya bisa dilakukan satu kali', 'Analisis tanpa kode'], 0, 'Satu skrip R bisa dijalankan berkali-kali dengan hasil identik.'),
    mc('Package adalah…', ['Paket fungsi siap pakai yang memperluas kemampuan R', 'Nama lain dari RStudio', 'File data berformat CSV', 'Jenis grafik'], 0, 'Package memperluas kemampuan dasar R.'),
    mc('Data pelatihan, unit kerja, dan survei cocok diolah dengan R karena R…', ['Mampu menangani data besar dari berbagai sumber secara konsisten', 'Hanya bisa membaca satu file', 'Tidak membutuhkan kode', 'Otomatis menulis kesimpulan'], 0, 'Konsisten dan terdokumentasi, itu kekuatan R.'),
    mc('Kumpulan package yang dirancang bekerja sama secara konsisten disebut…', ['Tidyverse', 'Console', 'Script', 'Environment'], 0, 'Tidyverse.'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Menghitung rata-rata skor', 'Simpan dua nilai ke objek, lalu hitung rata-ratanya.', 'nilai_pretest <- 65\nnilai_posttest <- 88\nrata_rata <- (nilai_pretest + nilai_posttest) / 2\nrata_rata', '[1] 76.5'),
    card('Membaca output dengan teliti', 'Pada `[1] 76.5`, angka **76.5** adalah hasilnya, sedangkan `[1]` hanyalah penanda indeks. Kebiasaan baik: setelah menjalankan kode, periksa apakah hasilnya masuk akal secara konteks. Rata-rata nilai, misalnya, wajar berada di antara 0 dan 100.'),
    card('Studi kasus: skor akhir peserta', 'Balai diklat bela negara ingin menghitung skor akhir dengan bobot posttest lebih besar. Hitung `skor_akhir` = 30% pretest + 70% posttest, tampilkan, lalu ubah `nilai_posttest` menjadi 95 dan amati bahwa `skor_akhir` tidak berubah sebelum dihitung ulang.', 'nilai_pretest <- 60\nnilai_posttest <- 90\n# hitung skor_akhir = 30% pretest + 70% posttest'),
  ], [
    mc('Console menampilkan `[1] 76.5`. Bagian mana yang merupakan hasil perhitungan?', ['76.5', '[1]', 'Keduanya sama penting', 'Tidak ada'], 0, '`[1]` hanya penanda indeks.'),
    ty('Pretest 70 dan posttest 100. Berapa skor akhir dengan bobot 30% pretest + 70% posttest?', ['91'], '0.3 × 70 + 0.7 × 100 = 21 + 70 = 91.'),
    ar('Susun perintah menghitung skor akhir:', ['skor_akhir', '<-', '0.3 * nilai_pretest + 0.7 * nilai_posttest'], 'Simpan hasil ekspresi ke objek `skor_akhir`.', ['==']),
    tf('Setelah nilai_posttest diubah menjadi 95, skor_akhir otomatis ikut berubah.', false, 'skor_akhir baru berubah setelah baris perhitungannya dijalankan ulang.'),
  ]),
};

EXTRA[2] = {
  konsep: lesson('Konsep dan istilah', [
    card('Kode seperti resep masakan', 'Menulis kode R seperti menyusun resep: setiap baris adalah satu langkah, bahannya adalah **objek** atau data, dan alat masaknya adalah **fungsi**. Tiga elemen dasar yang terus muncul: objek, fungsi, dan **operator** (simbol untuk operasi seperti penjumlahan atau perbandingan).'),
    card('Istilah penting', '**Objek**: nama yang menyimpan nilai di memori R. **Fungsi**: blok perintah siap pakai, `nama_fungsi(argumen)`. **Argumen**: nilai yang diberikan ke fungsi. **Operator**: simbol operasi aritmetika, perbandingan, atau logika. **Working directory**: folder aktif tempat R mencari dan menyimpan berkas. **Komentar**: baris berawalan `#` yang diabaikan R.'),
  ], [
    mc('Nama yang menyimpan nilai di memori R disebut…', ['Objek', 'Operator', 'Komentar', 'Argumen'], 0, 'Objek.'),
    mc('Baris yang diawali tanda `#` di R disebut…', ['Komentar yang diabaikan saat dijalankan', 'Perintah yang dieksekusi dua kali', 'Nama objek', 'Argumen fungsi'], 0, 'Komentar dipakai untuk mendokumentasikan kode.'),
    mc('Working directory adalah…', ['Folder aktif tempat R mencari dan menyimpan berkas', 'Daftar objek di memori', 'Nama package', 'Panel grafik'], 0, 'Diatur dengan setwd(), dicek dengan getwd().'),
    tf('Argumen adalah nilai yang diberikan ke dalam sebuah fungsi.', true, 'Contoh: 3.14159 dan digits = 2 pada round().'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('TRUE dan FALSE adalah data', 'Nilai TRUE dan FALSE (boolean) bukan sekadar teks. R memperlakukannya sebagai data yang bisa dihitung (TRUE = 1, FALSE = 0), sangat berguna untuk menyaring baris data nanti.'),
    card('Studi kasus: aturan kelulusan', 'Aturan: lulus jika nilai akhir ≥ 75 **atau** (nilai akhir ≥ 65 **dan** kehadiran 100%). Tulis ekspresi logikanya dan simpan ke `status_lulus`.', 'nilai_akhir <- 70\nkehadiran_persen <- 100\n# tulis ekspresi logika, simpan ke status_lulus'),
    card('Latihan bertahap', 'Dasar: baca dokumentasi `?sum`, hitung `12 %% 5` dan jelaskan artinya. Menengah: buat `skor <- 68` dan tulis ekspresi yang TRUE jika skor berada di rentang 60–75. Tantangan: periksa tiga syarat sekaligus (usia, nilai, kehadiran).'),
  ], [
    mc('Jika `skor <- 68`, hasil ekspresi `skor >= 60 & skor <= 75` adalah…', ['TRUE', 'FALSE', 'NA', '68'], 0, '68 memenuhi kedua syarat.'),
    ar('Susun ekspresi rentang 60 sampai 75:', ['skor >= 60', '&', 'skor <= 75'], '`&` mengharuskan kedua syarat terpenuhi.', ['|']),
    mc('Operator apa yang dipakai untuk memeriksa tiga syarat sekaligus (semuanya harus terpenuhi)?', ['& (dan)', '| (atau)', '== (sama dengan)', '<- (assignment)'], 0, 'Gabungkan dengan `&`.'),
    tf('Di R, TRUE bernilai 1 dan FALSE bernilai 0 saat dihitung.', true, 'Karena itu sum() pada hasil perbandingan menghitung jumlah TRUE.'),
  ]),
};

EXTRA[3] = {
  konsep: lesson('Konsep dan istilah', [
    card('Jenis barang vs jenis wadah', 'Jika tipe data adalah "jenis barang", struktur data adalah "jenis wadah": satu baris rak (**vector**), rak berbentuk tabel (**matrix**), kotak campur aduk (**list**), atau lembar spreadsheet lengkap (**data frame**). Data frame paling sering dipakai karena paling mirip tabel data sungguhan.'),
    card('Istilah penting', '**Numeric**: angka desimal. **Character**: teks. **Logical**: TRUE/FALSE. **Vector**: 1 dimensi, tipe seragam. **Matrix**: 2 dimensi, tipe seragam. **List**: fleksibel, tipe campuran. **Data Frame**: tabel dengan kolom bertipe campuran. **Factor**: kategori. **NA**: nilai hilang.'),
  ], [
    mc('Struktur data 2 dimensi dengan tipe seragam adalah…', ['Matrix', 'List', 'Data frame', 'Factor'], 0, 'Matrix.'),
    mc('Struktur fleksibel yang boleh menampung tipe dan struktur campuran dalam satu objek?', ['List', 'Vector', 'Matrix', 'Numeric'], 0, 'List.'),
    mc('Struktur yang paling mirip lembar spreadsheet lengkap?', ['Data frame', 'Vector', 'Matrix', 'Logical'], 0, 'Data frame.'),
    mc('Tipe data yang dipakai untuk TRUE dan FALSE?', ['logical', 'numeric', 'character', 'factor'], 0, 'logical.'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Membaca hasil str()', 'Saat membaca `str()`, perhatikan tiga hal: jumlah observasi dan variabel, tipe data tiap kolom (apakah sesuai harapan), dan cuplikan nilai untuk mendeteksi kejanggalan sejak dini.', 'df_peserta <- data.frame(\n  nama = c("Ani", "Budi", "Citra"),\n  usia = c(25, 30, 28),\n  lulus = c(TRUE, FALSE, TRUE)\n)\nstr(df_peserta)', "'data.frame':\t3 obs. of  3 variables:\n $ nama : chr  \"Ani\" \"Budi\" \"Citra\"\n $ usia : num  25 30 28\n $ lulus: logi  TRUE FALSE TRUE"),
    card('Studi kasus: ringkasan unit kerja', 'Gabungkan tiga vector menjadi data frame `unit_ringkas`, periksa dengan `str()`, lalu hitung total `jumlah_pegawai` dengan `sum()`.', 'kode <- c("UK01", "UK02", "UK04")\nkategori <- c("Pusat", "Regional", "Regional")\njumlah_pegawai <- c(56, 34, 98)'),
    card('Latihan bertahap', 'Dasar: buat vector `kota` berisi lima nama kota dan tampilkan elemen ke-3. Menengah: buat data frame `diklat` dengan tiga kolom bertipe berbeda (character, numeric, logical). Tantangan: buat list `ringkasan_diklat` berisi angka, teks, dan data frame kecil sekaligus.'),
  ], [
    mc('`str()` menampilkan `num` untuk kolom usia. Artinya kolom itu bertipe…', ['numeric', 'character', 'logical', 'factor'], 0, '`num` = numeric.'),
    ar('Susun perintah membuat data frame unit_ringkas:', ['unit_ringkas', '<-', 'data.frame(', 'kode,', 'kategori,', 'jumlah_pegawai)'], 'Kolom diberikan sebagai argumen.', ['matrix(']),
    mc('Pada `kode <- c("UK01", "UK02", "UK04")`, tipe vector `kode` adalah…', ['character', 'numeric', 'logical', 'integer'], 0, 'Teks di dalam tanda kutip adalah character.'),
    ty('Fungsi apa untuk menghitung jumlah kolom sebuah data frame?', ['ncol()', 'ncol'], '`ncol()` menghitung kolom, `nrow()` menghitung baris.'),
  ]),
};

EXTRA[4] = {
  konsep: lesson('Konsep dan istilah', [
    card('Data datang dalam banyak format', 'Data di dunia nyata datang sebagai CSV, Excel, TSV, dan lain-lain. R menyediakan fungsi khusus untuk tiap format, sebagian besar dari package `readr` dan `readxl`. Setelah diimpor, data wajib **diinspeksi** sebelum dipercaya: berapa baris dan kolom, apa tipe tiap kolom, adakah kejanggalan.'),
    card('Istilah penting', '**CSV**: format teks dengan kolom dipisah koma. **Delimiter**: karakter pemisah antar kolom. **readr**: package untuk membaca file teks terstruktur. **readxl**: package untuk membaca file Excel. **Tibble**: versi modern data frame ala Tidyverse. **Raw Data**: data mentah apa adanya dari sumber.'),
  ], [
    mc('Delimiter adalah…', ['Karakter pemisah antar kolom', 'Nama file data', 'Jenis grafik', 'Fungsi statistik'], 0, 'Pada CSV, delimiternya koma.'),
    mc('Package untuk membaca file Excel?', ['readxl', 'readr', 'dplyr', 'ggplot2'], 0, 'readxl.'),
    mc('Tibble adalah…', ['Versi modern data frame ala Tidyverse', 'Jenis file Excel', 'Nama fungsi impor', 'Tipe data teks'], 0, 'Tibble.'),
    tf('Data yang baru diimpor boleh langsung dianalisis tanpa diinspeksi.', false, 'Data wajib diinspeksi sebelum dipercaya.'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Peringatan awal dari read_csv()', 'Pesan "Column specification" dari `read_csv()` bukan error. Perhatikan jika kolom yang seharusnya angka terbaca sebagai `chr`: itu tanda awal ada karakter tak terduga yang perlu ditangani di Data Cleaning.'),
    card('Studi kasus: inspeksi data peserta', 'Impor `data_peserta_pelatihan.csv`, tampilkan 6 baris pertama, gunakan `glimpse()`, identifikasi kolom yang tipenya tampak tidak sesuai, lalu periksa `summary()` nilai pretest dan posttest.', 'peserta <- read_csv("../data/data_peserta_pelatihan.csv")\nhead(peserta)\nglimpse(peserta)\nsummary(peserta$nilai_pretest)'),
    card('Latihan bertahap', 'Dasar: impor `data_unit_kerja.csv`, tampilkan `dim()` dan `names()`. Menengah: impor `data_survei_kepuasan.csv`, pakai `glimpse()` dan `summary()` pada kolom skor. Tantangan: impor `data_kegiatan_bulanan_wide.csv` dan bandingkan `str()` dengan `glimpse()`.'),
  ], [
    ty('Fungsi apa yang menampilkan ringkasan statistik dasar sebuah kolom?', ['summary()', 'summary'], '`summary()` menampilkan min, kuartil, median, rata-rata, dan maks.'),
    ar('Susun perintah mengecek struktur data peserta:', ['glimpse(', 'peserta', ')'], '`glimpse()` menampilkan struktur ringkas.', ['dim(']),
    mc('Kolom tanggal_lahir terbaca sebagai `chr`, bukan tanggal. Apa yang perlu dilakukan?', ['Menandainya sebagai masalah data untuk ditangani saat cleaning dan transformasi', 'Mengabaikannya', 'Menghapus seluruh data', 'Mengganti R'], 0, 'Tipe kolom yang tak sesuai adalah sinyal awal masalah kualitas data.'),
    mc('`names(data_unit)` menampilkan…', ['Nama kolom', 'Jumlah baris', 'Rata-rata nilai', 'Tipe file'], 0, 'names() mengembalikan nama kolom.'),
  ]),
};

EXTRA[5] = {
  konsep: lesson('Konsep dan istilah', [
    card('Garbage in, garbage out', 'Data mentah hampir tidak pernah sempurna: ada duplikasi, format tidak konsisten, nilai hilang, atau *human error*. Data cleaning mendeteksi dan memperbaiki masalah itu sebelum analisis. Data kotor menghasilkan analisis yang menyesatkan, secanggih apa pun metodenya.'),
    card('Istilah penting', '**Missing Value**: nilai hilang, ditulis NA. **Duplikasi**: baris tercatat lebih dari sekali. **Imputasi**: mengisi nilai hilang dengan nilai pengganti. **Standardisasi Teks**: menyeragamkan format teks.'),
  ], [
    mc('Imputasi adalah…', ['Mengisi nilai hilang dengan nilai pengganti', 'Menghapus kolom', 'Mengurutkan data', 'Membaca file'], 0, 'Imputasi.'),
    mc('Standardisasi teks berarti…', ['Menyeragamkan format teks, misalnya kapitalisasi', 'Menerjemahkan teks', 'Menghapus semua teks', 'Mengubah teks jadi angka'], 0, 'Agar "hadir" dan "Hadir" dianggap sama.'),
    tf('Metode analisis yang canggih bisa menutupi data yang kotor.', false, 'Garbage in, garbage out.'),
    mc('Nilai hilang direpresentasikan di R sebagai…', ['NA', 'NULL', '0', 'kosong ""'], 0, 'NA.'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Bandingkan sebelum dan sesudah', 'Setelah membersihkan, bandingkan jumlah baris dan kategori sebelum dan sesudah untuk memastikan tidak ada data penting yang hilang secara tidak sengaja.', 'table(data_bersih$status_kehadiran)'),
    card('Studi kasus: langkah pembersihan', 'Langkah yang aman: (1) hitung missing values `status_kehadiran`, (2) hapus duplikat berdasarkan `id_peserta`, (3) standardisasi teks, (4) isi NA dengan "Tidak Diketahui", (5) bandingkan jumlah baris sebelum dan sesudah.'),
    card('Menyimpan hasil', 'Tugas unit ini menyimpan data bersih ke berkas CSV dengan `write_csv()`.', 'write_csv(data_bersih, "data_peserta_bersih.csv")'),
  ], [
    ar('Urutkan langkah pembersihan yang aman:', ['Hitung missing values', 'Hapus duplikat', 'Standardisasi teks', 'Isi NA', 'Bandingkan sebelum dan sesudah'], 'Periksa masalahnya, perbaiki, lalu bandingkan hasilnya.'),
    ty('Fungsi readr untuk menyimpan data frame ke berkas CSV?', ['write_csv()', 'write_csv'], '`write_csv(data, "nama.csv")`.'),
    mc('`replace_na(list(status_kehadiran = "Tidak Diketahui"))` mengisi…', ['NA di kolom status_kehadiran', 'Seluruh kolom menjadi teks', 'Baris duplikat', 'Nama kolom'], 0, 'NA diganti nilai pengganti.'),
    mc('Mengapa membandingkan jumlah baris sebelum dan sesudah cleaning?', ['Memastikan tidak ada data penting yang hilang tanpa sengaja', 'Agar tabel lebih berwarna', 'Karena R mewajibkannya', 'Agar file lebih kecil'], 0, 'Itu langkah verifikasi.'),
  ]),
};

EXTRA[6] = {
  konsep: lesson('Konsep dan istilah', [
    card('Menyeleksi, menyaring, menyusun ulang', 'Data wrangling adalah proses menyeleksi, menyaring, dan menyusun ulang data mentah agar siap dianalisis. Package `dplyr` menyediakan "kata kerja" intuitif: `select()`, `filter()`, `arrange()`, `rename()`, dirangkai dengan pipe agar kode terbaca seperti kalimat instruksi berurutan.'),
    card('Istilah penting', '**dplyr**: package manipulasi data tabel. **Pipe operator**: `%>%` atau `|>`, menghubungkan langkah berurutan. **Key column**: kolom acuan identitas unik sebuah observasi.'),
  ], [
    mc('dplyr adalah…', ['Package manipulasi data tabel', 'Package grafik', 'Package tanggal', 'Nama RStudio'], 0, 'dplyr.'),
    mc('Key column adalah…', ['Kolom acuan identitas unik suatu observasi', 'Kolom terakhir', 'Kolom bertipe teks', 'Kolom hasil perhitungan'], 0, 'Contoh: id_peserta.'),
    tf('Pipe hanya bisa ditulis dengan `%>%`, tidak bisa dengan `|>`.', false, 'Keduanya berfungsi.'),
    mc('Kode dengan pipe terbaca seperti…', ['Kalimat instruksi berurutan', 'Rumus matematika', 'Tabel', 'Grafik'], 0, 'Langkah demi langkah.'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Selalu periksa hasil dengan nrow()', 'Periksa jumlah baris hasil filter atau arrange. Jumlah yang jauh berbeda dari perkiraan bisa menandakan kondisi logika keliru, misalnya tertukar `&` dengan `|`.'),
    card('Studi kasus: peserta hadir dengan nilai tinggi', 'Saring peserta berstatus "Hadir" dan `nilai_posttest > 80`, pilih kolom nama, unit_kerja, dan nilai_posttest, urutkan dari tertinggi. Rangkai jadi satu pipe.', 'data_peserta %>%\n  filter(status_kehadiran == "Hadir" & nilai_posttest > 80) %>%\n  select(nama, unit_kerja, nilai_posttest) %>%\n  arrange(desc(nilai_posttest))'),
    card('Latihan bertahap', 'Dasar: pilih kolom nama dan kode_unit; saring peserta jenis_kelamin "L". Menengah: rangkai select, filter, dan arrange untuk peserta lulus (nilai ≥ 70). Tantangan: `rename()` nilai_posttest menjadi nilai_akhir dan kode_unit menjadi unit, lalu ambil top-5 dari unit "UK01".'),
  ], [
    ar('Susun: ganti nama kolom lalu saring unit UK01.', ['data_peserta', '%>%', 'rename(nilai_akhir = nilai_posttest, unit = kode_unit)', '%>%', 'filter(unit == "UK01")'], 'Setelah rename, kolom dipanggil dengan nama barunya.', ['select(unit)']),
    mc('Cara benar menyaring peserta yang hadir DAN bernilai posttest di atas 80?', ['filter(status_kehadiran == "Hadir" & nilai_posttest > 80)', 'filter(status_kehadiran = "Hadir" | nilai_posttest > 80)', 'select(status_kehadiran == "Hadir")', 'arrange(nilai_posttest > 80)'], 0, 'Pakai `==` dan `&`.'),
    ty('Fungsi yang dipakai di dalam arrange() agar urutan menurun?', ['desc()', 'desc'], '`arrange(desc(nilai))`.'),
    mc('Hasil filter jauh lebih sedikit dari perkiraan. Apa yang diperiksa dulu?', ['Apakah & tertukar dengan | pada kondisi', 'Warna tabel', 'Versi Windows', 'Nama file'], 0, 'Periksa dengan nrow().'),
  ]),
};

EXTRA[7] = {
  konsep: lesson('Konsep dan istilah', [
    card('Mengubah data menjadi lebih berguna', 'Transformasi data mengubah data menjadi bentuk yang lebih berguna: membuat kolom turunan, mengubah tipe data yang salah, merapikan teks, dan menyeragamkan format tanggal.'),
    card('Istilah penting', '**mutate()**: membuat atau mengubah kolom. **case_when()**: kategori bertingkat berdasarkan beberapa kondisi. **Type casting**: mengubah tipe data suatu nilai. **stringr**: package manipulasi teks. **lubridate**: package tanggal dan waktu.'),
  ], [
    mc('mutate() dipakai untuk…', ['Membuat atau mengubah kolom', 'Menghapus baris', 'Membaca file', 'Membuat grafik'], 0, 'mutate().'),
    mc('Package untuk tanggal dan waktu?', ['lubridate', 'stringr', 'readr', 'tidyr'], 0, 'lubridate.'),
    mc('Type casting berarti…', ['Mengubah tipe data suatu nilai', 'Menghapus tipe', 'Mengurutkan data', 'Menyimpan file'], 0, 'Misalnya as.numeric().'),
    mc('Package untuk memanipulasi teks?', ['stringr', 'lubridate', 'ggplot2', 'knitr'], 0, 'stringr.'),
  ]),
  praktik: lesson('Praktik dan studi kasus', [
    card('Praktik: rapikan nama dan hitung peningkatan', 'Gabungkan dua transformasi dalam satu `mutate()`.', 'data_transformasi <- data_peserta %>%\n  mutate(\n    nama = str_to_title(str_trim(nama)),\n    peningkatan = nilai_posttest - nilai_pretest\n  )'),
    card('Studi kasus: transformasi menyeluruh', 'Rapikan nama, buat `kategori_nilai`, konversi `tanggal_lahir` (format campuran) dengan `parse_date_time()`, lalu hitung `usia_saat_diklat`.'),
    card('Latihan bertahap', 'Dasar: rapikan 3 nama dengan `str_trim()` dan `str_to_title()`, buat kolom selisih_nilai. Menengah: buat `status_peningkatan` (Meningkat/Menurun/Tetap) dengan `case_when()`. Tantangan: konversi `tanggal_daftar` format campuran, buat kolom `bulan_daftar` dengan `month()`.'),
  ], [
    ar('Susun kategori tiga tingkat dengan case_when():', ['nilai >= 85 ~ "Baik"', 'nilai >= 70 ~ "Cukup"', 'TRUE ~ "Kurang"'], 'Kondisi paling ketat di atas, default `TRUE ~` di bawah.', ['FALSE ~ "Lain"']),
    mc('Fungsi lubridate untuk mengambil bulan dari sebuah tanggal?', ['month()', 'ymd()', 'as.numeric()', 'str_trim()'], 0, '`month()`.'),
    mc('Nilai `peningkatan` negatif berarti…', ['Nilai peserta turun dan perlu ditindaklanjuti', 'Data error', 'Peserta pasti lulus', 'Kolom harus dihapus'], 0, 'Itu informasi penting, bukan sekadar angka.'),
    ty('Peserta pretest 55 dan posttest 70. Berapa `peningkatan`?', ['15'], '70 − 55 = 15.'),
  ]),
};
