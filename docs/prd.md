# PRD — Aplikasi Tutorial Tailwind CSS dan jQuery

## 1. Ringkasan

Aplikasi ini adalah media tutorial praktikum untuk mendemonstrasikan fitur-fitur esensial Tailwind CSS dan jQuery melalui *hands-on coding*. Peserta dapat membaca materi, melihat contoh kode, menjalankan kode secara langsung di browser, dan mengamati hasilnya.

Aplikasi saat ini digunakan oleh satu orang, yaitu instruktur.
Aplikasi ini tidak perlu menjadi tahapan misalnyanya klo section 1 selesai baru bisa ke section 2. 

bentuknya sebelah kiri menu adalah menu tailwind yang dilengkapi dengan struktur angka materi misalnya : 
> Tailwind 
1. Konsep dasar, instalasi, dan Hello World
    1.1 Apa itu CSS framework 
    1.2 Cara Install Tailwind 
    1.3 Hello World

2. Property 
    2.1 Mengenal property dalam css framwework 
    ...

3. Spacing dan sizing
    3.1 Padding
    3.2 Margin

7. Layout
    7.1 Display
    7.2 Container

8. Flexbox
9. Grid

> Jquery
... 

Ambil konsep dasar seperti konsep layout tampilan seperti https://www.w3schools.com/html/default.asp


## 2. Kondisi dan keputusan awal

- Aplikasi dibuat dari project yang sekarang dan project tersebut masih kosong.
- Aplikasi berjalan sebagai aplikasi web di browser.
- Tombol **Run** menjalankan kode langsung di browser dan menampilkan hasilnya pada area preview.
- Materi tutorial belum disediakan sebagai konten final. Struktur awal materi Tailwind CSS menggunakan referensi berikut:
  - https://www.geeksforgeeks.org/css/tailwind-css/
- Bagian atau informasi tentang oh-my-posh tidak termasuk dalam produk dan diabaikan.

## 3. Tujuan

Membangun aplikasi tutorial interaktif yang membantu instruktur menjelaskan Tailwind CSS dan jQuery melalui contoh yang dapat langsung diedit, dijalankan, dan dipelajari hasilnya.

## 4. Sasaran pengguna

### Pengguna utama

Instruktur yang menggunakan aplikasi untuk menyampaikan materi praktikum kepada mahasiswa.

### Pengguna pembelajaran

Mahasiswa yang mengikuti praktikum dan mempelajari materi melalui demonstrasi instruktur.

## 5. Fitur utama

### 5.1 Navigasi materi

- Materi dibagi menjadi section dan subsection.
- Pengguna dapat berpindah antar-subsection dengan mudah.
- Struktur navigasi harus tetap terlihat atau mudah diakses saat membaca materi.
- Urutan Tailwind mengikuti prasyarat: konsep dasar, instalasi, Hello World, property/utility, spacing/sizing, typography, backgrounds, borders, layout, Flexbox, Grid, alignment, responsive/breakpoint, effects/filters, tables, transitions/animation, transforms, interactivity, form, button, dan komponen esensial. Display mendahului posisi/visibilitas; ukuran Flex mendahului wrap. ID halaman/bagian tetap stabil ketika nomor diurutkan ulang, sehingga materi SQLite dan tautan lama tetap terbaca.

### 5.2 Tampilan contoh kode

- Setiap topik Tailwind menjelaskan cara membaca utility, termasuk arti angka, satuan, pilihan nilai tema bawaan, dan perbedaan nilai khusus. Warna memisahkan keluarga/tonalitas 50–950 dari alpha; ukuran membedakan rem, px, persentase, serta nilai preset.
- Flexbox/Grid diajarkan melalui sumbu dan relasi induk/anak, distribusi basis/grow/shrink, wrap per baris, track baris/kolom, fr/minmax, grid eksplisit/implisit, dan garis/span. Perbandingan lima item memperlihatkan baris terakhir; contoh kombinasi memakai Grid untuk layout luar dan Flexbox untuk isi kartu. Label teks serta border/latar membedakan model layout tanpa bergantung pada warna saja.

- Setiap contoh menampilkan kode dengan syntax highlighting.
- Kode dapat dibaca dengan jelas pada layar instruktur.
- Contoh dapat dipisahkan berdasarkan HTML, CSS/Tailwind, dan JavaScript/jQuery jika diperlukan.
- Pada semua halaman dan subsection, mahasiswa memakai contoh sebagai acuan lalu mengetik ulang kode sendiri secara manual. Instruksi latihan tidak meminta mahasiswa copy-paste kode; tombol Copy tersedia untuk instruktur.

### 5.3 Menjalankan kode

- Setiap contoh memiliki tombol **Run**.
- Saat tombol ditekan, kode dijalankan langsung di browser.
- Hasil eksekusi ditampilkan pada area preview.
- Error eksekusi perlu ditampilkan secara informatif agar dapat digunakan untuk pembelajaran.
- Eksekusi contoh harus terisolasi dari halaman utama sejauh memungkinkan, misalnya menggunakan iframe atau sandbox browser.
- Eksekusi harus cepat karena ini hanya bersifat browser based Execution

### 5.4 Menyalin kode

- Setiap blok kode memiliki tombol **Copy** untuk kebutuhan instruktur.
- Kode yang disalin sama dengan kode yang sedang ditampilkan atau diedit.
- Pengguna mendapat umpan balik setelah kode berhasil disalin.
- Tombol Copy bukan bagian dari alur praktikum mahasiswa; mahasiswa mengetik contoh manual ke editor atau file latihan.

### 5.5 Guided learning sebagai penutup kelompok

- Setiap kelompok bernomor pada Tailwind dan jQuery memiliki contoh halaman utuh sebagai section terakhir pada halaman terakhir kelompok.
- Contoh menggabungkan konsep kelompok aktif dengan konsep dari kelompok sebelumnya; kelompok pertama memperkenalkan kerangka dasarnya.
- Header, navigasi, main, dan footer menjadi konteks nyata penerapan konsep, bukan kumpulan kotak contoh terpisah.
- Panduan menyediakan urutan membaca kode, pengamatan hasil, perubahan terarah, latihan mandiri, dan tautan ke materi yang digabungkan.
- Setiap Guided Learning diperluas menjadi 13 tahap coding manual: mulai dari kerangka kosong, ketik komponen sedikit demi sedikit, lakukan eksperimen, dan uji hasil; source menyediakan brief, bagian tambahan sesuai topik, serta jurnal perubahan sebagai acuan.
- Setelah source code tersedia delapan tantangan mandiri per kelompok, dengan sasaran edit, instruksi, kriteria berhasil, dan petunjuk opsional. Peserta mengedit dokumen yang sama, bukan sekadar membaca jawaban.
- Tantangan mencakup property/utility, penambahan komponen, interaksi/validasi sesuai topik, serta refleksi hasil. Penilaian otomatis tidak termasuk; kriteria membantu pemeriksaan mandiri.
- Tombol buka editor mempertahankan draft tanpa auto-Run. Peserta mengetik dan mengembangkan source sendiri, lalu menyiapkan HTML/jurnal serta screenshot atau catatan uji sebelum Reset; Copy tetap menjadi alat instruktur.
- Tombol Copy dapat menghasilkan dokumen HTML lengkap beserta kode pendukung untuk instruktur, dan Run menjalankan dokumen yang sama. Library lokal harus tersedia pada path yang dicantumkan.
- Contoh terfokus tetap dipertahankan dan navigasi bebas tidak berubah.

## 6. Struktur awal materi

Struktur berikut diadaptasi sebagai kerangka topik dari referensi Tailwind CSS. Isi materi, penjelasan, dan contoh kode akan ditulis sesuai kebutuhan praktikum dan tidak harus menyalin isi sumber secara langsung.

### 6.1 Tailwind CSS

1. Pengenalan Tailwind CSS
2. Hello World dengan Tailwind CSS
3. Instalasi dan cara menambahkan Tailwind CSS ke HTML
4. Layout
   - Container
   - Display
   - Position
   - Overflow
   - Visibility
   - Z-index
5. Flexbox
   - Direction
   - Wrap
   - Grow dan Shrink
   - Order
6. Grid
   - Template columns dan rows
   - Column/row start dan end
   - Auto flow
   - Gap
7. Alignment
   - Justify
   - Align
   - Place
8. Spacing dan sizing
   - Padding
   - Margin
   - Space between
   - Width dan height
   - Min/max width dan height
9. Typography
   - Font family, size, weight, dan line height
   - Text alignment, color, decoration, dan transform
10. Backgrounds
    - Color
    - Image
    - Position, repeat, size
    - Gradient
11. Borders
    - Radius
    - Width
    - Color, opacity, dan style
    - Divide dan ring
12. Effects dan filters
    - Shadow
    - Opacity
    - Blur, brightness, contrast, grayscale, dan filter lain
13. Tables
14. Transitions dan animation
15. Transforms
    - Scale
    - Rotate
    - Translate
    - Transform origin
16. Interactivity
    - Cursor
    - Outline
    - Pointer events
    - Resize dan select
17. Form
    - Label, input, textarea, dan layout responsif
    - Select, checkbox, dan radio
    - Fokus, disabled, readonly, dan pesan validasi
18. Button
    - Varian primary, secondary, danger, dan ukuran
    - Hover, fokus keyboard, toggle, disabled, dan loading
19. Komponen esensial
    - Card dan kumpulan card responsif
    - Navbar mobile dan breadcrumb
    - Alert dan pesan status yang bisa ditutup
    - Badge dan daftar informasi
    - Accordion dengan details dan summary

Bagian SVG dihapus dari kurikulum atas revisi pengguna. Materi pengganti mengikuti pola narasi praktis, tabel Property CSS / Utility Tailwind / Keterangan, section contoh, Copy untuk instruktur, Run, dan latihan ketik manual. Validasi/loading pada contoh merupakan demonstrasi browser, bukan pengiriman atau penyimpanan data sungguhan.

### 6.2 jQuery

Bagian jQuery mengikuti pola pembelajaran yang sama: penjelasan singkat, contoh kode sebagai acuan ketik manual mahasiswa, tombol **Run**, preview, dan tombol **Copy** untuk instruktur. Topik awal yang perlu disiapkan:

1. Pengenalan dan setup jQuery
2. Selector dan event dasar
3. Manipulasi DOM
4. Manipulasi class, atribut, dan konten
5. Traversing elemen
6. Show, hide, toggle, dan efek animasi
7. Form dan validasi interaksi dasar
8. AJAX dasar jika dibutuhkan dalam praktikum

## 7. Alur penggunaan utama

1. Instruktur membuka aplikasi.
2. Instruktur memilih section dan subsection dari navigasi.
3. Aplikasi menampilkan tujuan pembelajaran, penjelasan, contoh kode, dan preview.
4. Mahasiswa mengetik contoh secara manual, mengubah satu bagian, dan tidak menggunakan copy-paste. Instruktur dapat memakai tombol **Copy** untuk persiapan demonstrasi.
5. Pengguna menekan **Run**.
6. Aplikasi menjalankan kode di browser dan memperbarui preview.
7. Jika terjadi error, aplikasi menampilkan pesan error yang membantu proses debugging.

## 8. Batasan versi awal

- Tidak membutuhkan login atau manajemen banyak pengguna.
- Tidak membutuhkan penyimpanan progres mahasiswa.
- Tidak membutuhkan backend untuk menjalankan contoh kode.
- Eksekusi kode difokuskan pada contoh pembelajaran yang berjalan di browser.
- Materi awal diprioritaskan pada topik fundamental dan contoh praktikum yang singkat.

## 9. Kriteria penerimaan

- Project dapat dibuka dan digunakan di browser dari project yang saat ini kosong.
- Pengguna dapat melihat daftar section dan subsection.
- Pengguna dapat membuka materi dan contoh kode.
- Syntax highlighting tampil pada blok kode.
- Tombol **Copy** menyalin kode yang benar untuk instruktur dan memberi umpan balik.
- Setiap halaman dan subsection mengarahkan mahasiswa mengetik kode contoh secara manual, tanpa copy-paste.
- Tombol **Run** menjalankan contoh langsung di browser.
- Preview menampilkan hasil eksekusi tanpa harus memuat ulang seluruh halaman.
- Error pada contoh dapat diketahui pengguna.
- Struktur materi Tailwind CSS mengikuti kerangka topik yang telah ditetapkan di PRD ini.

## 10. Referensi

- GeeksforGeeks — [Tailwind CSS Tutorial](https://www.geeksforgeeks.org/css/tailwind-css/)
