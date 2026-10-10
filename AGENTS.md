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
- Sampaikan hasil dengan ringkas: perubahan utama, pemeriksaan yang dijalankan, dan keterbatasan yang relevan.

## Requirement editor materi

- Tombol **Edit materi** berada di kanan judul setiap section. Tombol **Add new** di daftar isi membuat section tambahan di halaman aktif, dengan judul dan editor materi yang sama. Simpan judul, urutan, Markdown, HTML, dan gambar ke SQLite; tampilkan kembali di daftar isi/sidebar dan dukung tautan langsung setelah reload. Section baru yang dibatalkan tidak boleh meninggalkan record atau item navigasi; draft judul dan konten tetap bertahan saat berpindah halaman dalam tab yang sama.
- Editor setiap bagian materi menggunakan engine Tiptap/ProseMirror, Markdown, dan Lowlight yang sama dengan editor Knowledge Palemo. Referensi: `../Palemo/web/src/KnowledgeRichEditor.tsx` dan `../Palemo/specs/modules/knowledge-management.md` (dirujuk oleh `../Palemo/AGENTS.md`). Adaptasikan fitur ke frontend JavaScript dan SQLite aplikasi ini.
- Paste Markdown (`.md`) harus langsung menjadi materi berformat, termasuk heading, paragraf, bold/italic/underline/strikethrough, inline code, daftar bertingkat/bernomor/checklist, kutipan, garis horizontal, tautan, tabel, dan fenced code. Saat clipboard menyediakan teks Markdown sekaligus HTML, prioritaskan Markdown bila marker terdeteksi. Paste HTML berformat tetap didukung.
- Blok kode menggunakan deteksi bahasa berbasis pola yang dibatasi, pilihan bahasa manual, syntax highlighting, tombol salin, indentasi Tab, dan paragraf setelah blok agar cursor dapat keluar. Kode pada mode baca ditampilkan sebagai teks dan tidak dieksekusi.
- Toolbar menyediakan heading, undo/redo, bold, italic, underline, strikethrough, hapus format, daftar bullet/nomor/checklist, kutipan, garis horizontal, tautan, tabel, blok kode, warna teks, serta gambar file/clipboard/URL. Mode Visual dan Markdown harus dapat saling beralih tanpa menghilangkan struktur yang didukung.
- Toolbar dan isi editor harus menyatu dalam satu bingkai seperti Palemo. Gunakan ikon Lucide yang sama, tooltip dan nama aksesibel, penanda format aktif, serta undo/redo sesuai ketersediaan riwayat. Gulir isi di area tersendiri agar toolbar tetap terlihat; pertahankan kenyamanan desktop/mobile dan tema terang/gelap.
- Simpan Markdown portabel beserta HTML baca yang telah disanitasi ke SQLite, termasuk bahasa fenced code. Tetap baca record HTML lama tanpa migrasi paksa; membuka editor atau berpindah mode saja tidak boleh menulis ulang record yang belum diubah.
- Gambar URL hanya menerima `http`/`https` valid (maksimal 2.048 karakter), alt maksimal 255 karakter, lazy loading, dan tanpa data URI/base64. Upload/paste file maksimal 5 MB dengan validasi MIME serta dimensi di backend; pertahankan format gambar yang sudah didukung aplikasi.
- Batasi materi pada 1.000.000 karakter dan beri peringatan setelah 50.000 kata. Sinkronisasi draft editor menggunakan debounce; simpan manual membaca konten terbaru langsung dari instance editor. Draft tiap section tetap terpisah, konflik versi ditolak, dan perubahan belum disimpan dilindungi saat reload.
- Sanitasi konten dilakukan di frontend dan backend. Hanya atribut editor yang diperlukan (bahasa kode, checklist, ukuran tabel, dan warna tervalidasi) yang boleh dipertahankan. Gunakan database sementara untuk test paste, round-trip Visual/Markdown, save/reload, kode, gambar, dan kompatibilitas record lama.
- Distribusikan bundle editor lokal agar runtime tidak bergantung pada CDN atau folder Palemo. Jangan menerapkan aturan tenant, login, audit bisnis, atau autosave Palemo ke aplikasi satu instruktur ini tanpa kebutuhan produk yang eksplisit.
- Jika `material-rich-editor.mjs` atau `material-editor-icons.mjs` berubah, bangun ulang `vendor/material-rich-editor.min.js` melalui `scripts/build-material-editor.cjs` menggunakan toolchain Tiptap yang tersedia. Simpan bundle dan pemberitahuan lisensi bersama source; verifikasi round-trip editor setelahnya.

## Urutan materi Tailwind

- Persiapan mengikuti konsep CSS framework → instalasi → Hello World → property/utility. Ajarkan spacing/sizing, typography, background, dan border sebelum layout; Flexbox/Grid serta alignment mendahului responsive berbasis layout.
- Di dalam kelompok, Display mendahului Position/Visibility, Position mendahului Z-index, grow/shrink mendahului Flex Wrap, serta lebar/style border mendahului radius.
- Proyek Guided Learning harus dipetakan berdasarkan identitas halaman, bukan nomor kelompok tampilan. Semua prasyarat berasal dari kelompok yang sudah dikenalkan; proyek awal tidak menuntut Flex/Grid sebelum materinya.
- Pertahankan ID halaman dan bagian saat mengubah urutan supaya route dan konten SQLite tetap terbaca. Nomor navigasi serta label tautan konsep mengikuti urutan terbaru. Verifikasi dengan `node tests/verify-tailwind-order.mjs`.
