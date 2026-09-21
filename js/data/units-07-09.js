// Sumber materi: rmd/07 sampai rmd/09.
COURSE.push({
  n: 7, title: 'Transformasi Data', blurb: 'mutate, case_when, konversi tipe, teks, dan tanggal.',
  lessons: [
    { name: 'Kolom baru dan kategori', cards: [
      card('mutate()', '`mutate()` membuat atau mengubah kolom. Kolom turunan seperti selisih nilai sering lebih informatif daripada nilai mentah.', 'data_peserta <- mutate(data_peserta,\n  peningkatan = nilai_posttest - nilai_pretest)'),
      card('case_when()', 'Kategori bertingkat dari beberapa kondisi. Baris terakhir `TRUE ~ ...` adalah kategori default.', 'data_peserta %>% mutate(kategori_nilai = case_when(\n  nilai_posttest >= 85 ~ "Sangat Baik",\n  nilai_posttest >= 70 ~ "Baik",\n  nilai_posttest >= 60 ~ "Cukup",\n  TRUE ~ "Perlu Perbaikan"\n))'),
      card('Konversi tipe', '`as.numeric()`, `as.character()`, `as.factor()`. Hati-hati: teks yang bukan angka murni menjadi NA, bukan error.', 'as.numeric("70 poin")', '[1] NA'),
    ], qs: [
      mc('Fungsi untuk membuat kategori bertingkat di dalam `mutate()`?', ['case_when()', 'select()', 'distinct()', 'rename()'], 0, '`case_when()`.'),
      tf('`as.numeric("70 poin")` berhasil menjadi 70.', false, 'Hasilnya NA karena "70 poin" bukan angka murni.'),
      mc('Nilai posttest 72 dengan aturan case_when di atas menjadi kategori?', ['Sangat Baik', 'Baik', 'Cukup', 'Perlu Perbaikan'], 1, '72 ≥ 70 tetapi belum ≥ 85, sehingga "Baik".'),
      mc('Nilai posttest 58 dengan aturan yang sama menjadi kategori?', ['Cukup', 'Baik', 'Perlu Perbaikan', 'NA'], 2, 'Tidak memenuhi kondisi apa pun, jatuh ke default `TRUE ~ "Perlu Perbaikan"`.'),
      ty('Peserta pertama: pretest 71 dan posttest 77. Berapa nilai `peningkatan` (posttest − pretest)?', ['6'], '77 − 71 = 6.'),
    ] },
    { name: 'Teks dan tanggal', cards: [
      card('Merapikan teks', '`str_trim()` membuang spasi berlebih, `str_to_title()` menyeragamkan kapitalisasi.', 'nama_kotor <- c("  oki santoso", "WAHYU SANTOSO ", "gunawan kusuma")\nstr_to_title(str_trim(nama_kotor))', '[1] "Oki Santoso"    "Wahyu Santoso"  "Gunawan Kusuma"'),
      card('lubridate: tanggal', '`ymd()`, `dmy()`, `mdy()` mengonversi tanggal sesuai urutan komponennya (y = tahun, m = bulan, d = hari). `parse_date_time()` untuk format campuran.', 'dmy("17-02-2025")', '[1] "2025-02-17"'),
      card('Kolom negatif itu informasi', 'Kolom `peningkatan` yang negatif menandakan peserta yang nilainya turun. Informasi penting untuk ditindaklanjuti, bukan sekadar angka.'),
    ], qs: [
      mc('Fungsi lubridate untuk tanggal berformat hari-bulan-tahun?', ['ymd()', 'dmy()', 'mdy()', 'as.factor()'], 1, '`dmy()`: day, month, year.'),
      ty('Apa hasil `str_to_title(str_trim("WAHYU SANTOSO "))`?', ['"Wahyu Santoso"', 'Wahyu Santoso'], 'Spasi di ujung dibuang, huruf awal tiap kata dikapitalkan.'),
      ar('Susun perintah membuat kolom peningkatan:', ['mutate(', 'data_peserta,', 'peningkatan', '=', 'nilai_posttest - nilai_pretest', ')'], '`mutate(data, kolom_baru = ekspresi)`.', ['<-']),
      mc('Tanggal berformat campuran paling tepat dikonversi dengan…', ['parse_date_time()', 'as.numeric()', 'str_trim()', 'summary()'], 0, '`parse_date_time()` menerima beberapa format.'),
    ] },
    { name: 'Kuis unit 7', cards: [
      card('Tiga kesalahan umum', 'Mengonversi teks non-angka ke numeric tanpa memeriksa isinya. Salah urutan huruf pada lubridate (`dmy` vs `mdy`). Lupa baris `TRUE ~ ...` default pada `case_when()`.'),
    ], qs: [
      mc('Pada `case_when()`, apa yang terjadi jika tidak ada baris `TRUE ~ ...`?', ['Baris yang tidak cocok menjadi NA', 'Error langsung', 'Semua jadi 0', 'Data terhapus'], 0, 'Tanpa default, baris yang tidak cocok kondisi mana pun menjadi NA.'),
      tf('Salah memilih antara dmy() dan mdy() bisa menghasilkan tanggal yang keliru.', true, '"03-08-2025" bisa 3 Agustus atau 8 Maret tergantung fungsi yang dipilih.'),
      mc('Mengapa periksa isi kolom sebelum `as.numeric()`?', ['Karena teks non-angka berubah menjadi NA', 'Karena as.numeric() lambat', 'Karena as.numeric() menghapus kolom', 'Tidak perlu'], 0, 'Konversi paksa menghasilkan NA tanpa error.'),
      mc('Fungsi yang membuat status Meningkat/Menurun/Tetap dari selisih nilai?', ['case_when()', 'distinct()', 'pivot_longer()', 'head()'], 0, 'Kondisi ditulis di case_when(), dibungkus mutate().'),
    ] },
  ],
  guide: {
    tujuan: ['Membuat kolom baru dengan `mutate()` dan `case_when()`.', 'Mengonversi tipe data: `as.numeric()`, `as.character()`, `as.factor()`.', 'Memanipulasi teks dengan `stringr`.', 'Mengonversi tanggal dengan `lubridate`: `ymd()`, `dmy()`, `mdy()`.', 'Memahami dampak format tanggal dan teks yang tidak konsisten.'],
    ringkasan: ['mutate() dan case_when() untuk kolom baru dan kategori bertingkat.', 'as.numeric()/as.character()/as.factor() untuk konversi tipe: periksa data dulu.', 'stringr merapikan teks; lubridate menyeragamkan tanggal.'],
    salah: ['Mengonversi teks non-angka murni ke numeric tanpa memeriksa isinya.', 'Salah urutan huruf pada fungsi lubridate (dmy vs mdy).', 'Lupa baris `TRUE ~ ...` default pada `case_when()`.'],
    cek: ['Saya dapat menggunakan mutate()', 'Saya dapat menggunakan case_when()', 'Saya dapat mengonversi tipe data', 'Saya dapat merapikan teks dengan stringr', 'Saya dapat mengonversi tanggal dengan lubridate'],
    tugas: 'Transformasikan data_peserta_pelatihan.csv: rapikan seluruh kolom teks, buat kategori nilai, dan konversi kolom tanggal. Simpan hasilnya sebagai data_peserta_transformasi.csv.',
    data: ['data_peserta_pelatihan.csv'],
  },
});

COURSE.push({
  n: 8, title: 'Reshaping dan Joining Data', blurb: 'Wide vs long, pivot, dan menggabungkan tabel.',
  lessons: [
    { name: 'Wide dan long', cards: [
      card('Wide vs long', '**Wide**: satu periode tersebar ke beberapa kolom (Jan, Feb, Mar). **Long**: nama bulan disimpan dalam satu kolom dan nilainya di kolom lain. Format long lebih mudah untuk agregasi dan visualisasi.'),
      card('pivot_longer()', '`cols` = kolom yang diubah, `names_to` = nama kolom baru untuk nama lama, `values_to` = nama kolom baru untuk nilainya.', 'data_long <- data_kegiatan %>%\n  pivot_longer(\n    cols = all_of(kolom_bulan),\n    names_to = "bulan",\n    values_to = "jumlah_kegiatan"\n  )'),
      card('pivot_wider()', 'Kebalikannya: long menjadi wide.', 'data_long %>%\n  pivot_wider(\n    names_from = bulan,\n    values_from = jumlah_kegiatan\n  )'),
      card('Awas: nama kolom bulan', 'Di dataset kegiatan, kolom bulannya berbahasa Indonesia (`Mei`, `Agu`). Kode Modul 8 mencocokkan dengan nama bulan Inggris lewat `intersect()`, sehingga kolom `Mei` dan `Agu` **tidak ikut** terdeteksi. Selalu cek `names()` sebelum berasumsi.'),
    ], qs: [
      mc('Fungsi untuk mengubah data wide menjadi long?', ['pivot_wider()', 'pivot_longer()', 'left_join()', 'group_by()'], 1, '`pivot_longer()`.'),
      mc('Pada `pivot_longer()`, argumen `names_to` berisi…', ['Nama kolom baru untuk menyimpan nama kolom lama', 'Nilai yang akan diisi', 'Nama file', 'Kolom yang dihapus'], 0, 'names_to menampung nama kolom lama (mis. "Jan", "Feb").'),
      mc('Format mana yang biasanya lebih mudah untuk agregasi dan visualisasi?', ['Wide', 'Long', 'Keduanya sama', 'Tidak ada'], 1, 'Long menyimpan kategori dan nilai di kolom terpisah.'),
      mc('Dataset punya kolom Jan, Feb, Mar, Apr, Mei, Jun, Jul, Agu, Sep. `intersect()` dengan nama bulan Inggris melewatkan kolom apa?', ['Jan dan Feb', 'Mei dan Agu', 'Sep', 'Tidak ada'], 1, 'Mei (May) dan Agu (Aug) berbeda ejaan dengan nama bulan Inggris.'),
    ] },
    { name: 'Join tabel', cards: [
      card('Key column', 'Kolom penghubung antar dataset, misalnya `kode_unit` pada data peserta dan data unit kerja.', 'data_gabungan <- data_peserta %>%\n  left_join(data_unit, by = "kode_unit",\n            suffix = c("_peserta", "_unit"))'),
      card('Jenis join', '`left_join()` mempertahankan seluruh baris tabel kiri. `inner_join()` hanya baris yang punya pasangan. `full_join()` mempertahankan semua baris kedua tabel. `anti_join()` menampilkan baris kiri tanpa pasangan.'),
      card('left vs inner', 'Peserta P01 (UK01) punya pasangan; P02 (UK99) tidak.', 'contoh_peserta <- data.frame(\n  id = c("P01", "P02"),\n  kode_unit = c("UK01", "UK99"))\nnrow(left_join(contoh_peserta, data_unit, by = "kode_unit"))\nnrow(inner_join(contoh_peserta, data_unit, by = "kode_unit"))', '[1] 2\n[1] 1'),
    ], qs: [
      mc('Pada `left_join(a, b, by = "kode")`, dataset mana yang seluruh barisnya dipertahankan?', ['a', 'b', 'Keduanya', 'Tidak ada'], 0, 'Tabel kiri (a) dipertahankan seluruhnya.'),
      tf('`inner_join()` mempertahankan seluruh baris tabel kiri meskipun tidak punya pasangan.', false, '`inner_join()` hanya mempertahankan baris yang punya pasangan di kedua tabel.'),
      mc('Fungsi untuk menemukan baris tabel kiri yang tidak punya pasangan di tabel kanan?', ['anti_join()', 'full_join()', 'pivot_longer()', 'filter_join()'], 0, '`anti_join()`.'),
      ty('Pada contoh P01 (UK01) dan P02 (UK99), berapa `nrow()` hasil inner_join()?', ['1'], 'Hanya UK01 yang punya pasangan di data_unit.'),
    ] },
    { name: 'Kuis unit 8', cards: [
      card('Mengapa NA muncul setelah join?', 'Key tidak punya pasangan, informasi referensi memang kosong, format key berbeda, spasi tambahan, huruf besar-kecil berbeda, atau tipe key berbeda. Key yang tidak unik di tabel referensi menyebabkan **fan-out**: hasil join lebih banyak baris dari data awal.'),
    ], qs: [
      mc('Apa istilah untuk kolom yang menghubungkan dua tabel?', ['Value column', 'Index', 'Key column', 'Measure column'], 2, 'Key column.'),
      mc('Nama key berbeda: kode_unit di data_a dan unit_code di data_b. Cara join yang benar?', ['by = c("kode_unit" = "unit_code")', 'by = "kode_unit, unit_code"', 'by = NULL', 'Tidak bisa di-join'], 0, 'Pakai pasangan bernama di `by`.'),
      mc('Setelah join, jumlah baris melonjak melebihi data awal. Dugaan utama?', ['Key tidak unik di tabel referensi (fan-out)', 'R salah hitung', 'Data hilang', 'Pipe rusak'], 0, 'Periksa dengan `count(data_unit, kode_unit)`.'),
      mc('Kolom opsional yang mungkin tidak ada sebaiknya dipilih dengan…', ['select(any_of(c("nama", "kota")))', 'select(nama, kota)', 'filter()', 'rename()'], 0, '`any_of()` tidak membuat proses berhenti bila kolom tidak ada.'),
    ] },
  ],
  guide: {
    tujuan: ['Memahami perbedaan format data wide dan long.', 'Mengubah wide menjadi long dengan `pivot_longer()` dan sebaliknya dengan `pivot_wider()`.', 'Menggabungkan dataset dengan `left_join()` dan memahami `inner_join()` serta `full_join()`.', 'Memahami key column dan memeriksa struktur sebelum dan sesudah join.', 'Mengenali penyebab NA setelah join.'],
    ringkasan: ['Wide menyimpan kategori di beberapa kolom; long menyimpan kategori di satu kolom dan nilai di kolom lain.', '`left_join()` mempertahankan tabel kiri; `inner_join()` hanya yang berpasangan; `full_join()` semuanya; `anti_join()` yang tak berpasangan.', 'Key column harus konsisten format dan tipenya.', 'Jangan mengasumsikan kolom tersedia sebelum memeriksa dengan `names()` atau `glimpse()`.'],
    salah: ['Nama key berbeda antar tabel (gunakan `by = c("a" = "b")`).', 'Format key tidak konsisten: UK01, uk01, spasi di depan.', 'Memilih kolom yang tidak tersedia (gunakan `any_of()`).', 'Duplikasi setelah join karena key tidak unik.'],
    cek: ['Saya dapat menjelaskan perbedaan wide dan long data', 'Saya dapat menggunakan pivot_longer()', 'Saya dapat menggunakan pivot_wider()', 'Saya dapat menggunakan left_join()', 'Saya memahami perbedaan left_join(), inner_join(), dan full_join()', 'Saya dapat menggunakan anti_join() untuk mencari data tanpa pasangan', 'Saya memahami risiko key yang tidak unik'],
    tugas: 'Buat laporan ringkas total kegiatan operasional berdasarkan kategori unit kerja dan bulan, memakai data_kegiatan_bulanan_wide.csv dan data_unit_kerja.csv: import, periksa struktur, identifikasi key dan kolom bulan, pivot_longer, left_join, periksa key tanpa pasangan, group_by + summarise, lalu tulis interpretasi singkat.',
    data: ['data_kegiatan_bulanan_wide.csv', 'data_unit_kerja.csv', 'data_peserta_pelatihan.csv'],
  },
});

COURSE.push({
  n: 9, title: 'Analisis Statistik Dasar', blurb: 'Mean, median, sd, ringkasan per kelompok, korelasi, dan uji.',
  lessons: [
    { name: 'Ukuran statistik', cards: [
      card('Pemusatan dan sebaran', 'Mean, median, dan modus meringkas pemusatan; variansi dan standar deviasi meringkas sebaran. Tambahkan `na.rm = TRUE` jika data mengandung NA.', 'mean(data_peserta$nilai_posttest, na.rm = TRUE)\nmedian(data_peserta$nilai_posttest, na.rm = TRUE)\nsd(data_peserta$nilai_posttest, na.rm = TRUE)'),
      card('group_by() + summarise()', 'Ringkasan per kelompok.', 'data_peserta %>%\n  group_by(kode_unit) %>%\n  summarise(rata_rata_nilai = mean(nilai_posttest, na.rm = TRUE),\n            n = n())'),
      card('Median tahan outlier', 'Median adalah nilai tengah dan tidak terpengaruh nilai ekstrem seperti mean.'),
    ], qs: [
      mc('Ukuran statistik yang paling tahan terhadap outlier?', ['Mean', 'Median', 'Variansi', 'Total'], 1, 'Median.'),
      ty('Berapa hasil `mean(c(70, 80, 90))`?', ['80'], '(70 + 80 + 90) / 3 = 80.'),
      mc('Lupa `na.rm = TRUE` pada data ber-NA menghasilkan…', ['NA', '0', 'Error merah', 'Rata-rata yang benar'], 0, 'Fungsi statistik mengembalikan NA bila ada NA dan na.rm tidak diatur.'),
      ar('Susun ringkasan rata-rata per unit:', ['data_peserta', '%>%', 'group_by(kode_unit)', '%>%', 'summarise(rata2 = mean(nilai_posttest, na.rm = TRUE))'], 'group_by() lalu summarise().', ['filter(kode_unit)']),
    ] },
    { name: 'Hubungan dan uji', cards: [
      card('Korelasi dan regresi', '`cor(x, y)` mengukur hubungan linear (−1 sampai 1). `lm()` untuk regresi. **Korelasi tidak membuktikan sebab-akibat.**', 'cor(data_peserta$nilai_pretest, data_peserta$nilai_posttest,\n    use = "complete.obs")'),
      card('Memilih uji', '`t.test()` untuk membandingkan rata-rata **2 kelompok**, `aov()` (ANOVA) untuk **lebih dari 2 kelompok**, `chisq.test()` untuk hubungan dua variabel **kategorikal**.', 't.test(nilai_posttest ~ kategori, data = data_gabungan)'),
      card('Membaca p-value', 'p-value mengukur seberapa mungkin hasil teramati hanya karena kebetulan. Ambang umum: p < 0.05 dianggap signifikan secara statistik. Bukan jaminan kebenaran.'),
    ], qs: [
      tf('Korelasi yang tinggi membuktikan sebab-akibat.', false, 'Korelasi hanya menunjukkan hubungan, bukan sebab-akibat.'),
      mc('Membandingkan rata-rata nilai antara 3 unit kerja. Uji yang tepat?', ['t.test()', 'aov() (ANOVA)', 'chisq.test()', 'cor()'], 1, 'ANOVA untuk lebih dari 2 kelompok.'),
      mc('Menguji hubungan antara dua variabel kategorikal. Uji yang tepat?', ['t.test()', 'aov()', 'chisq.test()', 'mean()'], 2, 'Chi-square untuk data kategorikal.'),
      mc('p-value = 0.6 dengan ambang 0.05. Kesimpulan?', ['Perbedaan sangat signifikan', 'Belum cukup bukti adanya perbedaan signifikan', 'Data salah', 'Uji harus diulang'], 1, '0.6 jauh di atas 0.05.'),
    ] },
    { name: 'Kuis unit 9', cards: [
      card('Tiga kesalahan umum', 'Lupa `na.rm = TRUE`. Menyimpulkan sebab-akibat dari korelasi. Membandingkan rata-rata antar kelompok dengan n sangat kecil dan tidak seimbang.'),
    ], qs: [
      mc('Fungsi untuk rata-rata per kelompok?', ['group_by() + summarise()', 'mutate()', 'pivot_longer()', 'select()'], 0, 'Kelompokkan, lalu ringkas.'),
      mc('Ukuran apa yang menggambarkan sebaran data?', ['Standar deviasi', 'Median', 'Modus', 'Total'], 0, 'sd() dan var() mengukur sebaran.'),
      tf('p-value adalah jaminan bahwa hasil analisis benar.', false, 'p-value hanya mengukur kemungkinan hasil karena kebetulan.'),
      mc('Membandingkan rata-rata dua kelompok dengan n sangat kecil dan tidak seimbang berisiko karena…', ['Kesimpulan bisa tidak stabil', 'R menolak menghitung', 'Data otomatis dihapus', 'Tidak ada risiko'], 0, 'Kelompok kecil membuat hasil kurang dapat diandalkan.'),
    ] },
  ],
  guide: {
    tujuan: ['Menghitung dan menginterpretasi mean, median, modus.', 'Menghitung dan menginterpretasi variansi dan standar deviasi.', 'Meringkas data dengan `group_by()`, `summarise()`, `count()`.', 'Memahami korelasi dan regresi sederhana secara konseptual.', 'Memahami kapan memakai uji-t, ANOVA, dan chi-square.'],
    ringkasan: ['Mean/median/modus = pemusatan; variansi/sd = sebaran.', 'group_by() + summarise() untuk ringkasan berkelompok.', 'Korelasi bukan sebab-akibat.', 'Uji-t (2 kelompok), ANOVA (lebih dari 2 kelompok), chi-square (kategorikal).'],
    salah: ['Lupa `na.rm = TRUE` sehingga hasil NA.', 'Menyimpulkan sebab-akibat hanya dari korelasi.', 'Membandingkan rata-rata dengan n sangat kecil dan tidak seimbang.'],
    cek: ['Saya dapat menghitung mean, median, dan sd', 'Saya dapat menggunakan group_by() + summarise()', 'Saya dapat menghitung dan menginterpretasi korelasi', 'Saya memahami kapan memakai uji-t, ANOVA, dan chi-square', 'Saya dapat menginterpretasikan p-value'],
    tugas: 'Buat ringkasan statistik lengkap (mean, median, sd, n) nilai pretest dan posttest per kategori unit kerja, lalu tulis satu paragraf kesimpulan naratif berdasarkan hasilnya.',
    data: ['data_peserta_pelatihan.csv', 'data_unit_kerja.csv'],
  },
});
