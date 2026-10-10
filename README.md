# Codeforge Lab — Tailwind CSS, JavaScript & jQuery

Aplikasi tutorial praktikum untuk instruktur, mengikuti [docs/prd.md](docs/prd.md). Materi dapat dipilih dalam urutan apa pun dan setiap subsection memiliki penjelasan, tujuan, latihan, serta contoh HTML/CSS/JavaScript yang bisa diedit dan dijalankan.

Alur mahasiswa di seluruh materi mengharuskan kode contoh diketik ulang secara manual baris demi baris. Contoh adalah acuan untuk dipelajari, bukan bahan copy-paste; tombol Copy ditujukan kepada instruktur.

## Menjalankan aplikasi

Project ini memakai frontend dengan aset lokal siap pakai dan API PHP untuk penyimpanan materi SQLite. Tidak perlu build untuk menjalankan aplikasi. Jalankan melalui server PHP (Laragon atau PHP built-in), dengan extension `pdo_sqlite`, `dom`, `mbstring`, dan `fileinfo` aktif.

### Dengan Laragon

Pastikan Apache Laragon berjalan, lalu buka:

```text
http://localhost/tailwind-jquery-tutorial/
```

### Dengan PHP built-in server

Dari folder project:

```powershell
php -S localhost:8000
```

Lalu buka `http://localhost:8000`.

## Setup Node.js dan `node_modules`

Untuk menjalankan aplikasi utama, **tidak perlu `npm install`**. Frontend memakai library lokal di `vendor/`, dan server PHP menangani API serta database SQLite. Jadi setelah clone, cukup siapkan PHP seperti di atas; folder `node_modules` tidak diperlukan untuk penggunaan sehari-hari.

Node.js dan npm diperlukan hanya bila mengubah source editor dan membangun ulang bundle browser. Toolchain build sudah disediakan mandiri di repo ini:

```powershell
cd C:\laragon\www\tailwind-jquery-tutorial\tools\material-editor
npm ci
npm run build
cd ..\..
node tests/verify-material-editor.mjs
```

Perintah tersebut memasang dependency dari `tools/material-editor/package-lock.json` dan membangun `vendor/material-rich-editor.min.js`. Pengguna aplikasi tidak perlu menjalankan langkah ini; bundle hasil build sudah disertakan.
- Folder `contoh_script` memiliki `package.json` sendiri untuk eksperimen Tailwind 4/Vite. Jika mengerjakan contoh tersebut, pasang dependency di folder itu saja:

  ```powershell
  cd C:\laragon\www\tailwind-jquery-tutorial\contoh_script
  npm ci
  ```

Jangan menyalin folder `node_modules` ke Git; `.gitignore` sudah mengecualikannya. File `package-lock.json` tetap disimpan agar instalasi dapat direproduksi.

## Fitur yang tersedia

- Tombol **Edit materi** berada di kanan judul section. **Add new** di kanan judul daftar isi membuka section tambahan dengan judul dan editor materi yang sama; klik **Simpan materi** agar tampil kembali setelah reload. Section baru ditambahkan di akhir halaman serta masuk daftar isi/sidebar, mendukung tautan langsung, dan bisa diedit kembali termasuk judulnya. **Batal** membuang section baru yang belum disimpan.
- Setiap bagian materi mempunyai tombol **Edit materi**, dengan engine Tiptap/ProseMirror, Markdown, dan Lowlight. Toolbar menyediakan heading, undo/redo, bold/italic/underline/coret, hapus format, daftar bertingkat/nomor/checklist, kutipan, garis horizontal, tautan, tabel, blok kode, warna, dan gambar. Tombol **Markdown** membuka sumber `.md`; tombol **Visual** mengembalikan WYSIWYG. **Pratinjau**, **Simpan materi**, `Ctrl+S`, dan **Batal** tetap tersedia.
- Paste dari editor lain atau AI menerima Markdown maupun HTML berformat. Markdown diprioritaskan jika clipboard memuat kedua format. Fenced code mempertahankan bahasa; kode tanpa fence dikenali otomatis bila polanya jelas. Setiap blok kode mempunyai pilihan bahasa manual, highlighting, tombol salin, indentasi Tab, dan paragraf setelahnya. Highlighting mendukung HTML/XML, CSS, JavaScript, TypeScript, JSON, PHP, SQL, Bash, Python, Go, Java, dan C#. Kode pada mode baca ditampilkan sebagai teks.
- Gambar PNG/JPG/WebP/GIF dapat ditambahkan lewat **Tambah gambar**, paste, atau drag-and-drop, maksimal 5 MB per file dan 40 megapixel. Untuk file besar, sesuaikan PHP `upload_max_filesize` dan `post_max_size`. Gambar upload disimpan dalam SQLite. **Gambar URL** dan Markdown `![alt](https://...)` menerima URL http/https; gambar eksternal bergantung pada server URL tersebut, dengan alt maksimal 255 karakter. Data URI/base64 tidak diterima.
- Materi tersimpan dimuat kembali saat membuka halaman atau reload. Draft belum disimpan dipertahankan selama perpindahan materi dalam tab yang sama; reload memberikan peringatan bila ada draft. Penyimpanan mendeteksi perubahan dari tab lain agar tidak menimpanya.

- Sidebar tetap terlihat di desktop dan dapat dibuka di layar kecil, dengan penomoran section/subsection (1, 1.1, 1.2, dst.)
- 19 section Tailwind CSS, 1 section JavaScript dasar sebelum jQuery, dan 8 section jQuery; bagian SVG diganti dengan Form, Button, dan Komponen esensial
- Seluruh 75 halaman memiliki narasi situasi sehari-hari, penjelasan alur contoh, dua langkah pengamatan/percobaan, dan catatan kesalahan umum
- 195 bagian contoh pada 73 halaman dengan section, termasuk dasar JavaScript, debugging browser, font, text, positioning, flex/grid, filter, tabel, event, DOM, traversing, form, dan AJAX; contoh kecil yang terfokus tetap dipertahankan
- 28 section Guided learning di akhir setiap kelompok bernomor (19 Tailwind + 1 JavaScript + 8 jQuery): halaman utuh, 13 tahap coding manual, tautan konsep, Copy untuk instruktur/Run, dan latihan integrasi. Proyek JavaScript memakai HTML/CSS native tanpa library.
- 8 tantangan mandiri per Guided Learning (224 total), masing-masing dengan sasaran kode, instruksi, kriteria berhasil, dan petunjuk opsional; tombol Buka source code di editor mempertahankan draft tanpa menjalankan kode otomatis
- 10 halaman baru mencakup input/textarea, select/checkbox/radio, validasi dan keadaan form, varian/ukuran button, toggle/loading, card, navbar/breadcrumb, alert, badge/daftar, dan accordion native
- Pengenalan CSS framework membandingkan dua dokumen dengan isi serta tampilan setara: CSS native tanpa library dan Tailwind tanpa CSS komponen tambahan. Ringkasan jumlah baris/karakter mengikuti draft HTML yang diedit
- Instalasi menyediakan cuplikan workspace, dokumen CDN online aktif, dan dokumen lokal aktif. Mahasiswa mengetik ulang contoh instalasi ke file sendiri; tombol Copy menghasilkan dokumen HTML mandiri untuk instruktur, tanpa perlu mengaktifkan script yang dikomentari
- Halaman aktif ditandai warna kontras, latar lembut, garis kiri, dan `aria-current`; menu lain abu-abu. Bagian aktif juga memiliki penanda sendiri
- Kelompok utama Tailwind CSS, JavaScript dasar, dan jQuery dapat dilipat melalui judulnya, termasuk dengan keyboard. Pencarian membuka kelompok sementara dan memulihkan keadaan sebelumnya setelah pencarian dihapus
- Pencarian materi dan tautan langsung menggunakan hash URL; tombol Back/Forward browser dapat digunakan
- Halaman Mengenal property dan utility class memiliki 14 bagian property ditambah Guided learning, dengan daftar isi, tabel property CSS/utility, contoh ber-highlight, Copy untuk instruktur, Run, dan latihan manual per bagian
- Seluruh 61 halaman Tailwind memiliki penjelasan rinci konsep, nilai, satuan, dan kesalahan umum. Seluruh 143 bagian Tailwind memiliki tabel property; contoh terfokus juga menampilkan pembacaan utility yang dipakai dalam kodenya.
- Materi warna menjelaskan keluarga, tonalitas `50`, `100`–`900`, `950`, serta alpha `/40`. Buka `#tw-border-width/warna` untuk perbandingan 11 warna border dengan ketebalan sama. Materi lain membedakan skala rem, px, persentase, fr, derajat, milidetik, serta kondisi responsive/state.
- Flexbox membahas induk/anak, sumbu, basis/grow/shrink, dan wrap per baris. Grid membahas track bersama, fr/minmax, baris implisit, garis, serta span. `#tw-flex-direction/sumbu`, `#tw-grid-template/pilih-layout`, dan `#tw-grid-template/gabungan` menyediakan contoh berlabel: Flexbox biru dan Grid amber, termasuk baris terakhir serta layout bertingkat.
- Bagian halaman tampil sebagai sub-menu bertanda bullet di bawah nomor materi pada sidebar; klik langsung menuju bagian terkait. Link seperti `#tw-utility/font` mendukung reload serta Back/Forward dan ikut tercakup dalam pencarian sidebar
- Syntax highlighting untuk HTML, CSS, dan JavaScript
- Editor kode yang bisa diedit langsung
- `code-editor.js` menjadi modul bersama untuk highlighting, nomor baris, scroll, dan word wrap pada editor utama serta seluruh source code per bagian. Kode dan nomor baris tampil sejak halaman dibuka, tanpa Run; edit/reset pada workspace memperbarui source bagian yang sama.
- Mode layar penuh untuk panel editor (HTML/CSS/JavaScript) dan hasil preview, melalui tombol di masing-masing toolbar; Escape untuk keluar
- Tombol Layar penuh kode + preview membuka workspace gabungan dengan kode di kiri dan preview di kanan. Pembatas vertikal dapat digeser dengan mouse, sentuhan, atau tombol panah; lebar minimum menjaga kedua panel tetap dapat digunakan. Preview tersembunyi dibuka kembali, sementara tab file, Run, dan kontrol editor tetap tersedia.
- Tombol × di kanan atas preview menyembunyikan preview dan memperluas editor; tombol Tampilkan preview membuka hasil terakhir, dan Run otomatis menampilkan preview kembali
- Kontrol A−/A+ mengatur ukuran font kode 12–32px untuk demonstrasi proyektor; ↺ mengembalikan ke 14px. Ukuran berlaku pada editor, nomor baris, dan blok contoh; preferensi disimpan jika storage tersedia
- Tombol Word wrap membungkus baris panjang di editor dan blok contoh tanpa mengubah kode sumber; nomor baris mengikuti tinggi baris yang membungkus. Preferensi disimpan jika storage tersedia
- Run example ke iframe browser sandbox
- Copy contoh kode untuk instruktur dan reset contoh kode
- Pesan error JavaScript, promise rejection, dan resource gagal dimuat; error tidak ditimpa status siap
- Kode edit tetap tersedia selama sesi halaman, termasuk saat berpindah materi; Reset mengembalikan semua file materi aktif
- Tema terang/gelap; preferensi tema disimpan jika local storage tersedia
- Responsive layout untuk layar kecil

### Penyimpanan materi

`api/materials.php` otomatis membuat database di folder `data` di luar `www` Laragon, dengan nama `codeforge-<identitas-folder-project>.sqlite`. Path dapat diatur melalui environment variable `CODEFORGE_DB_PATH`; gunakan lokasi di luar document root yang dapat ditulis PHP. Backup file SQLite tersebut untuk menyimpan materi dan gambar. Record baru menyimpan Markdown portabel dan HTML baca yang disanitasi; kolom Markdown ditambahkan otomatis pada database lama, tanpa menulis ulang konten HTML lama. Membuka editor atau berpindah mode saja tidak menyimpan ulang record. Materi dibatasi pada 1.000.000 karakter; setelah 50.000 kata ada peringatan performa. Draft disinkronkan dengan debounce, sedangkan simpan membaca isi terbaru langsung dari editor. Aplikasi tetap dipakai lokal oleh satu instruktur tanpa login.

Pemeriksaan editor dan SQLite: `node tests/verify-material-editor.mjs` (memerlukan PHP pada PATH). Pemeriksaan memakai database sementara, tanpa mengubah materi pengguna.

Judul dan urutan section tambahan disimpan pada tabel `material_sections`, bersama konten pada tabel `materials` dan gambar pada `material_images`. Tabel baru dibuat otomatis; materi bawaan tetap berasal dari source aplikasi. Draft section baru belum masuk database sampai **Simpan materi** ditekan, dan hanya bertahan dalam tab yang sama.

### Urutan belajar Tailwind

Kelompok 1 berisi **CSS framework → instalasi → Hello World**; kelompok 2 berisi **property dan utility class**. Lanjutkan ke **spacing/sizing → typography → backgrounds → borders → layout → Flexbox → Grid → alignment → responsive/breakpoint → effects/filters → tables → transitions/animation → transforms → interactivity → form → button → komponen esensial**. Pada instalasi, dokumen CDN dan lokal dikenalkan sebelum cuplikan workspace. Proyek awal memakai aliran block; Flex/Grid mulai dipakai setelah kelompoknya dikenalkan. Kelompok property merupakan peta utility; pembahasan tiap kelompok memperdalam peta tersebut.

Nomor materi mengikuti urutan ini; ID halaman/bagian tetap sama, termasuk route Guided Learning dan identitas materi SQLite. Prasyarat serta label tautan konsep mengikuti urutan baru. Pemeriksaan terarah: `node tests/verify-tailwind-order.mjs`.

Source engine editor ada di `material-rich-editor.mjs`; dependency build terkunci di `tools/material-editor/package-lock.json`. Jalankan `npm ci` lalu `npm run build` dari `tools/material-editor` untuk membangun ulang bundle lokal. Bundle browser `vendor/material-rich-editor.min.js` sudah tersedia dan tidak memerlukan package Node saat runtime. Pengujian browser opsional dapat diaktifkan dengan environment variable `BROWSER_MODULE_PATH` yang menunjuk entry `.mjs` Playwright terpasang.

Tidak ada login, penyimpanan progres mahasiswa, atau penguncian urutan materi. Kerangka dan contoh pengantar tersedia di `lessons.js`. Narasi hasil review untuk semua halaman ada di `lesson-guides.js`, sedangkan contoh terpisah dan penyesuaian contoh ada di `lesson-examples.js`. Isi rinci halaman property tersedia di `utility-properties.js`. Pemetaan property/utility per halaman dan pilihan baris tabel per bagian tersedia di `tailwind-reference.js`, dimuat setelah contoh dan sebelum aplikasi.

Materi Form, Button, dan Komponen esensial didefinisikan di `essential-lessons.js`, dimuat setelah kerangka `lessons.js` dan sebelum narasi. Setiap definisi menyertakan narasi, tabel, contoh, serta latihan; penomoran dilanjutkan menjadi 17–19. Tiga halaman SVG dan route-nya tidak tersedia lagi. Gambar latar data lokal pada materi background tetap dipertahankan sebagai aset, bukan tutorial SVG.

Materi JavaScript dasar didefinisikan di `javascript-lessons.js` dan dimuat setelah pengayaan Guided Learning, sebelum editor/aplikasi. Kelompoknya disisipkan sebelum jQuery tanpa mengubah nomor atau route materi lama. Halaman `#js-basic` mempunyai sembilan bagian dasar bahasa/DOM/event, tiga bagian pemasangan script, tiga bagian debugging, dan proyek daftar peserta. Contoh memakai runtime native tanpa injeksi Tailwind/jQuery, serta renderer kode dan workspace bersama. Proyek memadukan array/object, fungsi, kondisi, perulangan, validasi form, dan render DOM.

Seluruh 16 bagian JavaScript menjelaskan istilah sebelum latihan, bentuk penulisan, tabel perbandingan, pembacaan kode, hasil awal, dan kriteria pemahaman. Tiga bagian pemasangan script membahas script inline, file `.js`, serta `src`/`defer`. Bagian variabel membedakan deklarasi, inisialisasi, penugasan ulang, tipe nilai, serta scope `var`/`let`/`const`; `const` tidak dijelaskan sebagai pembekuan object. Cuplikan penjelas memakai renderer `CodeEditor` yang sama, sementara editor utama tetap dipakai untuk mengetik dan Run. Tabel materi memiliki judul serta kolom sesuai topik, bukan header property/utility Tailwind.

Pemeriksaan terarah materi JavaScript: `node tests/verify-javascript.mjs`. Pemeriksaan ini mencakup 16 bagian, struktur tabel, syntax cuplikan, hasil contoh, deklarasi/scope, validasi/event, bug debugging, proyek daftar peserta, dan renderer bersama. Fixture memeriksa instruksi serta handler; tidak membuktikan layout, pemuatan script melalui browser, atau operasi DevTools.

Debugging tersedia pada `#js-basic/debug-console`, `#js-basic/debug-error`, dan `#js-basic/debug-browser`; versi jQuery berada di `#jq-events/debug-console`, `#jq-events/debug-event`, dan `#jq-events/debug-browser`. Materi membahas Console, typeof, selector kosong/null, event, breakpoint, Scope, Watch, Call Stack, serta pengecekan library di Network. Pilih konteks iframe preview di Console agar `document` mengacu ke hasil contoh. Source tab JavaScript muncul sebagai `contoh-script.js` setelah Run; edit DevTools perlu diketik kembali pada editor. Panduan browser menyertakan tautan ke [dokumentasi DevTools](https://developer.chrome.com/docs/devtools/javascript/) dan [pernyataan debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger).

`guided-practice.js` dimuat setelah tabel, kemudian `guided-learning.js`, lalu aplikasi. Rencana praktik menyediakan komponen tambahan dan tantangan berbeda untuk semua kelompok. Setiap kelompok mempunyai satu proyek gabungan di section terakhir pada halaman terakhirnya. Jika halaman tersebut sebelumnya tidak memiliki section, contoh kecilnya tetap disediakan sebagai Contoh dasar. Nomor halaman mengikuti urutan belajar; ID halaman dan tautan lama tetap tersedia. Guided learning menggunakan HTML lengkap dengan header, navigasi, brief proyek, main, komponen tambahan, jurnal perubahan, footer, library lokal, serta CSS/JavaScript inline jika dibutuhkan. Dokumen lengkap dapat disalin instruktur melalui Copy; mahasiswa mengetik source secara manual dan tab CSS/JavaScript menjelaskan bahwa kode pendukung sudah ada di HTML. Run memakai runtime dokumen, bukan menyuntikkan library lagi.

Contoh jalur belajar: buka Layout → Z-index → Guided learning (`#tw-zindex/guided-learning`) untuk dashboard dengan container, sticky header, badge absolute, dan agenda scroll; kemudian Flexbox → Order → Guided learning (`#tw-flex-order/guided-learning`) untuk daftar kelas dengan direction, wrap, grow/shrink, dan order. Masing-masing mempunyai 13 tahap: catat tampilan awal, ketik kerangka/header/main dari kosong, bangun komponen sesuai topik, tambahkan bagian/jurnal, tulis interaksi atau audit utility, lakukan eksperimen, uji regresi, dan lanjutkan tantangan. Mahasiswa mengetik source sendiri tanpa copy-paste; instruktur dapat menyimpan salinan referensi. Estimasi 60–90 menit dapat disesuaikan oleh instruktur. Daftar Konsep yang digabungkan menghubungkan halaman ini dengan materi sebelumnya tanpa mengunci urutan belajar.

Tantangan muncul setelah Guided Learning Source Code, bukan sebagai halaman baru. Peserta mengetik dan mengembangkan kode sendiri pada dokumen yang sama, lalu menguji satu perubahan setiap Run. Dua pemanasan mengubah spacing dan identitas header, lima tugas khusus membahas konsep kelompok, lalu satu refleksi meminta jurnal dan hasil akhir. Contoh tugas khusus: memindahkan badge tanpa menutup teks, mengubah breakpoint, menambah kolom tabel, memulihkan status tombol, memperluas validasi, dan menangani array AJAX kosong. Hint disimpan dalam details agar dapat dibuka saat buntu. Tidak ada penilaian otomatis: kriteria dipakai untuk pengecekan mandiri/diskusi. Tombol Copy untuk instruktur; Reset mengembalikan contoh awal, sehingga mahasiswa menyimpan hasil kerja sebelum Reset.

Form memakai kontrol HTML native tanpa plugin forms. Label, name, type, disabled/readonly, required, dan checked mengatur semantik; utility Tailwind mengatur tampilannya. Validasi menahan submit dan tidak mengirim data. Toggle memperbarui aria-pressed, loading menyimulasikan proses tanpa penyimpanan, menu mobile memperbarui aria-expanded, dan alert mengembalikan fokus ketika ditutup. Accordion memakai details/summary tanpa JavaScript tambahan.

Tabel dibaca dari kiri ke kanan: sasaran CSS, pilihan class, lalu pengaruh praktisnya. Keterangan menyebut nilai pada tema bawaan dan perbedaan yang sering tertukar, misalnya padding/margin, invisible/hidden, grow/shrink, atau background alpha/opacity. Aturan breakpoint dan state ditandai sebagai kondisi; ring, gradient, filter, dan transform dijelaskan sebagai aturan tersusun, bukan selalu satu deklarasi CSS sederhana. Bagian font family hanya menampilkan keluarga huruf, sementara bagian line height hanya menampilkan jarak baris. Tabel Tailwind tidak ditampilkan pada materi jQuery.

Pada halaman yang memiliki bagian, Run memuat dan menjalankan contoh tersebut di workspace yang sama. Draft HTML/CSS/JavaScript disimpan terpisah untuk setiap contoh selama sesi halaman, sehingga perpindahan tidak menghapus hasil edit. Copy pada bagian menyalin file yang ditampilkan (HTML untuk contoh Tailwind, JavaScript untuk contoh jQuery), termasuk hasil edit; Copy ditujukan untuk kebutuhan instruktur. Mahasiswa mengetik contoh secara manual. Run pada bagian jQuery langsung membuka tab JavaScript, sementara HTML pendukung tetap tersedia. Copy di workspace menyalin file aktif untuk instruktur. Reset hanya mengembalikan contoh aktif; tombol kembali ke pengantar membuka contoh awal.

Untuk cepat beralih ke jQuery, klik judul Tailwind CSS agar tertutup, lalu buka kelompok jQuery. Melipat menu tidak mengganti materi di kanan. Memilih materi melalui navigasi atau tautan langsung membuka kelompok materi tersebut; memperbarui penanda bagian tidak membatalkan collapse manual.

## Library dan eksekusi

Penjelasan rinci ditambahkan lewat `tailwind-details.js` setelah katalog dan proyek selesai dibentuk. Route lama serta ID section tetap tersedia; section konseptual ditambahkan pada halaman yang sebelumnya belum memiliki bagian terfokus. Nilai mengikuti tema bawaan [Tailwind 3.4: palet warna](https://v3.tailwindcss.com/docs/customizing-colors), [skala jarak](https://v3.tailwindcss.com/docs/customizing-spacing), [Flex](https://v3.tailwindcss.com/docs/flex), dan [Grid](https://v3.tailwindcss.com/docs/grid-template-columns). Perbandingan model layout mengikuti [panduan hubungan Grid dan Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Relationship_with_other_layout_methods).

Tailwind Play runtime **3.4.17**, jQuery **3.7.1**, dan Prism **1.29.0** disertakan di `vendor/`. Aplikasi dan mayoritas contoh dapat dipakai tanpa internet setelah server lokal berjalan. Contoh instalasi online (termasuk pengantarnya), referensi eksternal, dan API eksternal membutuhkan internet.

Contoh sengaja memakai sintaks Tailwind 3 (misalnya `bg-gradient-to-r`). Play runtime dipakai untuk praktikum browser tanpa build, bukan sebagai proses build CSS produksi. Contoh workspace biasa memakai runtime lokal yang dimuat sekali dan dipakai ulang. Dokumen mandiri (`runtime: "document"`) memuat script dari HTML-nya sendiri tanpa injeksi tambahan; contoh native (`runtime: "none"`) tidak memuat Tailwind maupun jQuery. Kode dieksekusi di iframe `sandbox="allow-scripts allow-forms"` tanpa akses DOM halaman utama.

Untuk latihan instalasi online, buka `#tw-install/cdn` dan ketik ulang HTML ke file di folder mana pun. Script `https://cdn.tailwindcss.com/3.4.17` aktif di head dan Run benar-benar memakai CDN, tanpa fallback lokal. Jika koneksi gagal, pesan resource ditampilkan; style mungkin tidak terpasang. Untuk versi offline, buka `#tw-install/dokumen`, ketik HTML di folder utama project, dan pastikan path `./vendor/tailwind-3.4.17.js` benar. Instruktur dapat memakai tombol Copy untuk menyiapkan file contoh.

Untuk perbandingan framework, buka `#tw-framework/css-biasa` dan `#tw-framework/utility`, lalu Run masing-masing. Versi native menyertakan seluruh CSS di style; versi Tailwind menyertakan script lokal dan class utility. Isi kartu, ukuran, warna, hover, serta fokus dibuat setara. Mahasiswa mengetik ulang kedua versi; instruktur dapat memakai Copy untuk menyiapkan file contoh. Versi native dapat dibuka tanpa library; versi Tailwind perlu berada dekat folder vendor atau src diganti dengan CDN. Jumlah kode menghitung HTML lengkap (termasuk style/script), bukan ukuran library yang diunduh. Keuntungan yang ditunjukkan adalah berkurangnya CSS manual pada contoh ini, bukan klaim bahwa framework selalu menghasilkan kode paling pendek.

Demo AJAX memakai URL data JSON agar tidak membutuhkan backend. Saat mengganti dengan endpoint HTTP, pastikan endpoint mengizinkan CORS untuk request dari sandbox.

Buka melalui HTTP lokal, bukan langsung `file://`, karena pemuatan runtime menggunakan `fetch`. Iframe mengisolasi DOM, tetapi loop JavaScript yang tidak berhenti masih dapat membuat tab browser macet.

## Verifikasi

```powershell
node tests/verify.mjs
```

Pemeriksaan ini mencakup kelengkapan narasi seluruh halaman, tabel tiga kolom pada seluruh halaman/bagian Tailwind, pemisahan tabel sesuai fokus contoh, pembersihan tabel saat pindah jQuery, struktur materi, syntax semua contoh/library, kecocokan selector ID contoh jQuery, highlighting lokal, Copy/Run setiap bagian, isolasi pesan preview, persistensi error, draft/reset, deep link, penanda aktif, serta pemulihan collapse setelah pencarian. Pengujian juga memastikan native tidak memakai Tailwind, dokumen CDN/lokal memiliki script aktif tanpa injeksi ganda, metrik kode mengikuti edit/reset, dan error CDN tidak ditimpa status siap. Pengujian memakai fixture DOM, bukan browser nyata; tidak membuktikan CDN berhasil dieksekusi lewat jaringan.

Pemeriksaan komponen baru mencakup penghapusan route SVG, seluruh section baru, submit form yang dicegah, pesan validasi dan aria-invalid, status toggle, pemulihan button setelah loading, menu mobile, serta penutupan/pembukaan alert dan pengembalian fokus. Constraint validation native disimulasikan dengan hasil valid/tidak valid pada fixture; perilaku browser perlu diperiksa langsung.

Pengujian guided learning memastikan contoh gabungan berada terakhir dalam seluruh 27 kelompok, setiap halaman utuh berbeda dan diperpanjang, 13 tahap coding dan 216 tantangan lengkap tersedia, tugas khusus berbeda per topik, materi sebelumnya dirujuk dengan link valid, seluruh target label/link/selector tersedia, ID unik, script inline memiliki syntax benar, textarea tetap kosong setelah formatting, dan dokumen tidak mendapat library ganda. Tantangan dirender setelah source code dan tombol edit mempertahankan draft tanpa auto-Run. Logika inline pada guided Tailwind juga dijalankan dengan fixture (form, catatan, toggle/loading, navbar, dan alert). Ini tidak menggantikan pemeriksaan layout, kontrol native, breakpoint, animasi, dan AJAX di browser nyata.

Untuk pemeriksaan visual, buka aplikasi pada desktop dan layar kecil, lipat Tailwind lalu pindah jQuery, cari bagian saat kelompok tertutup, buka `#jq-events/input` langsung, dan periksa menu aktif. Ubah tab editor, tekan Run pada beberapa bagian, coba interaksi jQuery, aktifkan word wrap, perbesar font, sembunyikan preview, dan pastikan error muncul saat JavaScript sengaja dibuat salah.

Detail teknis materi dirujuk ke dokumentasi resmi [Tailwind 3 responsive design](https://v3.tailwindcss.com/docs/responsive-design), [jQuery property](https://api.jquery.com/prop/), dan [jQuery AJAX](https://api.jquery.com/jQuery.ajax/). Implementasi tetap memakai versi library lokal di atas.

Untuk komponen baru, periksa `#tw-form-input/textarea`, `#tw-form-state/validasi`, `#tw-button-state/loading`, `#tw-navigation/navbar`, dan `#tw-accordion/faq` pada browser. Acuan semantiknya adalah [HTML button](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button), [constraint validation](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Constraint_validation), dan [state Tailwind 3](https://v3.tailwindcss.com/docs/hover-focus-and-other-states).

Pemetaan tabel juga mengikuti dokumentasi Tailwind 3 untuk [space between](https://v3.tailwindcss.com/docs/space), [container](https://v3.tailwindcss.com/docs/container), [transform origin](https://v3.tailwindcss.com/docs/transform-origin), dan [transition property](https://v3.tailwindcss.com/docs/transition-property).

Contoh online mengikuti alur [Play CDN Tailwind 3](https://v3.tailwindcss.com/docs/installation/play-cdn), dengan versi 3.4.17 agar konsisten dengan materi lokal.
