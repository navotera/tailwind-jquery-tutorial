# Instruksi kerja repo

## Saat memulai sesi

- Gunakan instruksi ini sebagai aturan kerja awal untuk semua tugas di repo ini.
- Periksa status Git sebelum mengubah file agar perubahan pengguna yang sudah ada tetap aman.
- Jangan membaca seluruh repo atau semua dokumentasi di awal. Cari file yang relevan dengan `rg`/`rg --files`, lalu baca konteks yang diperlukan saja.
- Baca `README.md` atau `docs/prd.md` hanya jika tugas menyentuh perilaku atau materi yang dijelaskan di sana.

## Alur kerja cepat

- Kerjakan hasil yang diminta langsung dengan asumsi wajar; hindari rencana panjang dan pertanyaan yang tidak diperlukan.
- Batasi perubahan pada penyebab dan file yang relevan. Hindari dependency, refactor, dan langkah setup yang tidak membantu menyelesaikan permintaan.
- Jangan menjalankan build atau seluruh test suite secara otomatis. Untuk perubahan teks, dokumentasi, atau konten tanpa dampak perilaku, lakukan pemeriksaan terarah dan lewati build/test.
- Untuk perubahan kode yang memengaruhi perilaku, pilih pemeriksaan terkecil yang memberi bukti memadai, misalnya syntax check, test terkait, atau build bila proses build memang bagian dari jalur yang berubah. Jalankan build penuh hanya bila diperlukan oleh perubahan atau diminta pengguna.
- Jika pemeriksaan dilewati, sebutkan dengan jelas. Jangan menyatakan build atau test lulus bila tidak dijalankan.
- Jangan membuat test baru untuk perubahan teks atau visual sederhana. Tambahkan atau jalankan test bila pengguna memintanya atau perubahan perilaku perlu diverifikasi.
- Jangan commit, push, deploy, atau mengirim pesan eksternal tanpa instruksi eksplisit.
- Jika instruktur secara eksplisit meminta server dijalankan, jalankan `powershell -ExecutionPolicy Bypass -File .\scripts\start-server.ps1` dari root repo; skrip menyalakan PHP built-in server di background pada port 8000. Jangan jalankan server tanpa permintaan tersebut.
- Sampaikan hasil dengan ringkas: perubahan utama, pemeriksaan yang dijalankan, dan keterbatasan yang relevan.

## Percepat revisi → deploy

- Deploy repo ini berarti commit lalu push ke server. Commit dan push tetap dikerjakan manual oleh instruktur; jangan commit, push, atau deploy tanpa instruksi eksplisit. Setelah revisi, cukup laporkan file yang berubah dan cek yang dijalankan agar siap di-push.
- Perubahan frontend (`*.js` data materi, `app.js`, `code-editor.js`, `material-editor.js`, `styles.css`, `index.html`) langsung disajikan Apache tanpa build. Lewati `npm ci`, `npm run build`, dan restart server untuk perubahan semacam ini; cukup refresh browser untuk mengujinya.
- Jalankan `npm ci` lalu `npm run build` dari `tools/material-editor` HANYA bila `material-rich-editor.mjs` atau `material-editor-icons.mjs` diubah, lalu verifikasi round-trip editor. Revisi lain tidak perlu menyentuh `vendor/` atau toolchain Node.
- Untuk revisi teks, konten, atau visual tanpa dampak perilaku: lewati build dan test, cukup pemeriksaan terarah (baca ulang diff, cek sintaks bila relevan).
- Jalankan hanya test terarah yang menyentuh area yang diubah, bukan seluruh suite:
  - urutan atau ID materi Tailwind → `node tests/verify-tailwind-order.mjs`
  - materi JavaScript dasar → `node tests/verify-javascript.mjs`
  - editor materi atau penyimpanan SQLite → `node tests/verify-material-editor.mjs` (butuh PHP pada PATH)
- Pertahankan ID halaman dan section saat merevisi agar route dan record SQLite tetap terbaca; ini mencegah kerja ulang setelah push.
- Sebut dengan jelas cek yang dilewati; jangan menyatakan build atau test lulus bila tidak dijalankan.

## Requirement editor materi

- Tombol **Edit materi** berada di kanan judul setiap section. Tombol **Add new** di daftar isi membuat section tambahan di halaman aktif, dengan judul dan editor materi yang sama. Simpan judul, urutan, Markdown, HTML, dan gambar ke SQLite; tampilkan kembali di daftar isi/sidebar dan dukung tautan langsung setelah reload. Section baru yang dibatalkan tidak boleh meninggalkan record atau item navigasi; draft judul dan konten tetap bertahan saat berpindah halaman dalam tab yang sama.
- Editor materi berdiri sendiri di repo ini, menggunakan Tiptap/ProseMirror, Markdown, dan Lowlight tanpa runtime atau dependency dari project lain.
- Paste Markdown (`.md`) harus langsung menjadi materi berformat, termasuk heading, paragraf, bold/italic/underline/strikethrough, inline code, daftar bertingkat/bernomor/checklist, kutipan, garis horizontal, tautan, tabel, dan fenced code. Saat clipboard menyediakan teks Markdown sekaligus HTML, prioritaskan Markdown bila marker terdeteksi. Paste HTML berformat tetap didukung.
- Blok kode menggunakan deteksi bahasa berbasis pola yang dibatasi, pilihan bahasa manual, syntax highlighting, tombol salin, indentasi Tab, dan paragraf setelah blok agar cursor dapat keluar. Kode pada mode baca ditampilkan sebagai teks dan tidak dieksekusi.
- Toolbar menyediakan heading, undo/redo, bold, italic, underline, strikethrough, hapus format, daftar bullet/nomor/checklist, kutipan, garis horizontal, tautan, tabel, blok kode, warna teks, serta gambar file/clipboard/URL. Mode Visual dan Markdown harus dapat saling beralih tanpa menghilangkan struktur yang didukung.
- Toolbar dan isi editor harus menyatu dalam satu bingkai. Gunakan ikon Lucide, tooltip dan nama aksesibel, penanda format aktif, serta undo/redo sesuai ketersediaan riwayat. Gulir isi di area tersendiri agar toolbar tetap terlihat; pertahankan kenyamanan desktop/mobile dan tema terang/gelap.
- Simpan Markdown portabel beserta HTML baca yang telah disanitasi ke SQLite, termasuk bahasa fenced code. Tetap baca record HTML lama tanpa migrasi paksa; membuka editor atau berpindah mode saja tidak boleh menulis ulang record yang belum diubah.
- Gambar URL hanya menerima `http`/`https` valid (maksimal 2.048 karakter), alt maksimal 255 karakter, lazy loading, dan tanpa data URI/base64. Upload/paste file maksimal 5 MB dengan validasi MIME serta dimensi di backend; pertahankan format gambar yang sudah didukung aplikasi.
- Batasi materi pada 1.000.000 karakter dan beri peringatan setelah 50.000 kata. Sinkronisasi draft editor menggunakan debounce; simpan manual membaca konten terbaru langsung dari instance editor. Draft tiap section tetap terpisah, konflik versi ditolak, dan perubahan belum disimpan dilindungi saat reload.
- Sanitasi konten dilakukan di frontend dan backend. Hanya atribut editor yang diperlukan (bahasa kode, checklist, ukuran tabel, dan warna tervalidasi) yang boleh dipertahankan. Gunakan database sementara untuk test paste, round-trip Visual/Markdown, save/reload, kode, gambar, dan kompatibilitas record lama.
- Distribusikan bundle editor lokal agar runtime tidak bergantung pada CDN atau project lain. Jangan menerapkan aturan tenant, login, audit bisnis, atau autosave ke aplikasi satu instruktur ini tanpa kebutuhan produk yang eksplisit.
- Jika `material-rich-editor.mjs` atau `material-editor-icons.mjs` berubah, jalankan `npm ci` dan `npm run build` dari `tools/material-editor`. Simpan bundle dan pemberitahuan lisensi bersama source; verifikasi round-trip editor setelahnya.

## Urutan materi Tailwind

- Penjelasan utility harus menguraikan prefix, nilai, satuan, pilihan bawaan, dan sasaran induk/anak bila relevan. Bedakan tonalitas warna 50–950, ukuran spacing berbasis rem, ketebalan garis px, persen, fr, derajat, dan milidetik. Jangan menganggap semua angka berarti piksel; nyatakan asumsi root 16px saat mengonversi rem.
- Materi Flexbox/Grid menjelaskan sumbu, basis/grow/shrink, wrap per baris, track bersama, fr/minmax, grid eksplisit/implisit, span dan nomor garis. Sertakan perbandingan kebutuhan penggunaan, contoh lima item/baris terakhir, dan Grid luar dengan Flexbox dalam. Gunakan label teks beserta latar/border berbeda agar makna tidak bergantung pada warna saja.

- Persiapan mengikuti konsep CSS framework → instalasi → Hello World → property/utility. Ajarkan spacing/sizing, typography, background, dan border sebelum layout; Flexbox/Grid serta alignment mendahului responsive berbasis layout.
- Di dalam kelompok, Display mendahului Position/Visibility, Position mendahului Z-index, grow/shrink mendahului Flex Wrap, serta lebar/style border mendahului radius.
- Proyek Guided Learning harus dipetakan berdasarkan identitas halaman, bukan nomor kelompok tampilan. Semua prasyarat berasal dari kelompok yang sudah dikenalkan; proyek awal tidak menuntut Flex/Grid sebelum materinya.
- Pertahankan ID halaman dan bagian saat mengubah urutan supaya route dan konten SQLite tetap terbaca. Nomor navigasi serta label tautan konsep mengikuti urutan terbaru. Verifikasi dengan `node tests/verify-tailwind-order.mjs`.
