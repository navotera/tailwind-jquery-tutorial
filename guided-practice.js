// Rencana praktikum panjang: komponen tambahan, tahapan coding, dan tantangan
// berbeda untuk setiap kelompok. Hint membantu mencari lokasi, bukan solusi jadi.
function studioTask(title, target, instruction, expected, hint) {
  return { title, target, instruction, expected, hint };
}
function studioPlan(extension, milestones, challenges) {
  return { extension, milestones, challenges };
}
const guidedPracticePlans = {
  tailwind: [
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Persiapan sebelum kelas</h2>
  <p class="mt-3 text-slate-600">Bawa catatan dan siapkan satu pertanyaan tentang tampilan web.</p>
  <ul class="mt-4 space-y-3">
    <li class="rounded-lg bg-emerald-50 p-4">Editor: tempat menulis kode.</li>
    <li class="rounded-lg bg-blue-50 p-4">Browser: tempat mengamati hasil.</li>
    <li class="rounded-lg bg-amber-50 p-4">Catatan: tempat mencatat dugaan dan hasil.</li>
  </ul>
</section>`, [
      'Ketik ulang kotak Tujuan hari ini dengan h2 dan paragraf. Terapkan rounded-xl, bg-emerald-100, dan p-5 satu per satu; Run setelah setiap class agar pengaruhnya terlihat.',
      'Bangun bagian Persiapan sebelum kelas dari daftar kosong. Tambahkan tiga li dan beri setiap item warna lembut berbeda, tanpa mengubah isi kotak tujuan.',
      'Ubah judul kelas dan teks persiapan menjadi konteks kelasmu. Bedakan heading utama, subjudul, dan isi lewat ukuran serta ketebalan, bukan menambah h1 kedua.'
    ], [
      studioTask('Sudut dua komponen', '#materi dan #studio-extension', 'Ganti rounded-xl pada kotak tujuan menjadi rounded-none, tetapi pertahankan sudut bagian persiapan.', 'Kotak tujuan bersudut tajam dan bagian persiapan tetap melengkung.', 'Cari class pada dua section, jangan mengganti semua rounded lewat pencarian global.'),
      studioTask('Palet informasi', '#materi', 'Ubah latar kotak tujuan menjadi biru lembut dan sesuaikan warna tulisannya.', 'Tulisan tetap terbaca dan hanya kotak tujuan yang berubah palet.', 'Background dan color adalah dua keputusan terpisah.'),
      studioTask('Ruang isi daftar', '#studio-extension li', 'Perbesar padding item kedua saja dan bandingkan ukurannya dengan dua tetangga.', 'Item kedua lebih lapang tanpa mengubah jarak luar seluruh section.', 'Ubah p-4 pada satu li, bukan p-5 pembungkus.'),
      studioTask('Satu kebutuhan baru', '#studio-extension ul', 'Ketik satu elemen li baru untuk item Koneksi internet dengan gaya yang konsisten dan isi yang menjelaskan kapan dibutuhkan.', 'Ada empat item dengan label jelas; daftar tetap nyaman dibaca.', 'Tulis struktur li sendiri, lalu ubah teks dan paletnya.'),
      studioTask('Bandingkan penekanan', '#studio-extension h2', 'Buat subjudul kurang dominan daripada judul utama tetapi lebih kuat daripada paragraf.', 'Pembaca masih mengenali urutan judul utama → subjudul → isi.', 'Ubah text-xl atau font-semibold, lalu bandingkan dengan h1.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-bold text-emerald-700">Sebelum pertemuan berikutnya</h2>
  <p class="mt-3 text-slate-600">Ulangi contoh heading dan paragraf tanpa menyalin semuanya sekaligus.</p>
  <article class="mt-4 rounded-lg bg-slate-100 p-4">
    <h3 class="font-semibold">Pengumuman tambahan</h3>
    <p class="mt-2">Simpan hasil latihan dengan nama file yang mudah dikenali.</p>
    <p class="mt-3 text-sm text-slate-600">Tenggat: sebelum diskusi kelas berikutnya.</p>
  </article>
</section>`, [
      'Bangun pengumuman Pertemuan pertama dengan judul, jadwal, dan instruksi. Run sebelum styling agar struktur HTML dasarnya bisa dibandingkan.',
      'Ketik bagian Sebelum pertemuan berikutnya dan article Pengumuman tambahan. Atur jarak judul ke paragraf memakai mt-, bukan baris kosong pada file.',
      'Buat tiga tingkat informasi: judul halaman, judul pengumuman, dan tenggat. Tulis alasan pemilihan ukuran/warna masing-masing sebelum mengubah utility.'
    ], [
      studioTask('Judul pembanding', '#materi h2', 'Naikkan ukuran judul pengumuman satu tingkat tanpa memperbesar paragrafnya.', 'Judul lebih kuat, isi tetap memiliki ukuran semula.', 'Ukuran tulisan memakai text-, bukan h-.'),
      studioTask('Pengumuman kedua', '#studio-extension article', 'Tambahkan article pengumuman kedua dengan jadwal berbeda dan format yang konsisten.', 'Dua pengumuman tampil terpisah dengan judul, isi, dan tenggat.', 'Gunakan article yang sudah ada sebagai pola, bukan h1 baru.'),
      studioTask('Warna tenggat', '#studio-extension article p terakhir', 'Beri tenggat warna amber yang gelap tanpa mengubah background kartu.', 'Tenggat menonjol lewat warna tetapi tetap terbaca.', 'Pilih utility text-amber-700 atau warna gelap lain.'),
      studioTask('Jeda membaca', '#materi p', 'Perbesar jarak sebelum instruksi terakhir tanpa mengubah padding section.', 'Hanya jeda luar paragraf tersebut yang bertambah.', 'Bandingkan mt-4 dan p-4.'),
      studioTask('Penekanan seperlunya', '#studio-extension h3', 'Ubah ketebalan subjudul lalu jelaskan mana yang terlalu kuat dibanding h2.', 'Hirarki tulisan tetap jelas setelah perubahan.', 'Bandingkan font-normal, font-medium, dan font-bold satu per satu.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6">
  <h2 class="text-xl font-semibold">Rencana belajar mingguan</h2>
  <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
    <article class="rounded-xl bg-white p-5"><h3 class="font-semibold">Hari 1</h3><p class="mt-2">Baca konsep dan jalankan contoh.</p></article>
    <article class="rounded-xl bg-white p-5"><h3 class="font-semibold">Hari 2</h3><p class="mt-2">Ubah satu utility dan catat hasil.</p></article>
    <article class="rounded-xl bg-white p-5"><h3 class="font-semibold">Hari 3</h3><p class="mt-2">Gabungkan materi dalam halaman kecil.</p></article>
  </div>
</section>`, [
      'Ketik doctype, html, head, meta viewport, dan script Tailwind terlebih dahulu. Simpan file hasil ketikan di folder project dan pastikan sumber vendor bisa dimuat.',
      'Bangun kartu materi dengan grid-cols-1, lalu tambahkan sm:grid-cols-2. Periksa pada iframe sempit dan lebar; breakpoint mengikuti lebar preview.',
      'Tambahkan rencana mingguan dengan tiga kartu. Terapkan aturan dasar, sm:, dan md: secara bertahap, lalu tulis jumlah kolom yang diharapkan di setiap ukuran.'
    ], [
      studioTask('Breakpoint baru', '#studio-extension > div', 'Ganti md:grid-cols-3 dengan lg:grid-cols-3 tanpa mengubah aturan sm.', 'Perubahan menjadi tiga kolom menunggu viewport yang lebih lebar.', 'Uji pada jendela yang cukup lebar; ukuran aplikasi bukan ukuran iframe.'),
      studioTask('Kartu hari keempat', '#studio-extension > div', 'Ketik markup article baru untuk kartu Hari 4, lalu periksa aliran kartu saat satu, dua, dan tiga kolom.', 'Semua kartu tetap terlihat dan tidak ditumpuk manual.', 'Tambahkan satu article dengan struktur serupa; jangan copy-paste seluruh grid.'),
      studioTask('Jarak kartu', '#materi', 'Ubah gap-4 menjadi gap-6 hanya pada daftar materi.', 'Jarak antarkartu materi berubah, rencana mingguan tetap sama.', 'Pilih pembungkus grid yang tepat.'),
      studioTask('Mode online', 'head script Tailwind', 'Ketik file HTML baru dan ganti sumber Tailwind lokal dengan CDN dari materi instalasi.', 'Versi online memakai satu sumber Tailwind dan membutuhkan internet.', 'Jangan menambah script kedua; simpan versi offline sebelum mencoba.'),
      studioTask('Dasar mobile', '#studio-extension > div', 'Coba dua kolom pada aturan dasar lalu kembalikan satu kolom. Jelaskan pilihan yang lebih nyaman untuk ponsel.', 'Versi akhir mudah dibaca di layar sempit.', 'Class tanpa prefix berlaku sebelum breakpoint lain.')
    ]),
    studioPlan(`<section id="studio-extension" class="relative mt-6 rounded-xl bg-white p-5">
  <h2 class="pr-24 text-xl font-semibold">Panel sumber belajar</h2>
  <span class="absolute right-3 top-3 z-10 rounded bg-blue-100 px-2 py-1 text-sm">3 sumber</span>
  <div class="mt-4 max-h-32 overflow-auto rounded bg-slate-100 p-4">
    <p class="py-2">Dokumentasi: baca definisi utility.</p><p class="py-2">Contoh kelas: jalankan sebelum diedit.</p>
    <p class="py-2">Catatan sendiri: tulis alasan perubahan.</p><p class="py-2">Diskusi: bandingkan hasil dengan teman.</p>
    <p class="py-2">Review: jelaskan perbedaan visible, invisible, dan hidden.</p>
  </div>
</section>`, [
      'Bangun header dan container terlebih dahulu. Tambahkan sticky top-0 z-20 setelah halaman memiliki cukup isi untuk digulir; cek lapisan header saat scroll.',
      'Ketik kartu Agenda kelas dengan relative, lalu pasang badge absolute. Sediakan ruang judul dengan pr-20 agar badge tidak menutup tulisan.',
      'Bangun panel sumber belajar kedua dengan batas tinggi dan overflow-auto. Tambah isi sampai scroll muncul, lalu bandingkan perilaku hidden dan invisible pada penanda cadangan.'
    ], [
      studioTask('Pindahkan badge', '#studio-extension > span', 'Pindahkan badge ke kiri bawah dengan mengganti pasangan sisi lama dan menambah ruang untuknya.', 'Badge berpindah tanpa menutup informasi panel.', 'Hapus right/top lama; periksa relative pada induknya.'),
      studioTask('Batas panel', '#studio-extension > div', 'Naikkan batas tinggi panel dan tambahkan dua sumber belajar.', 'Panel menampilkan lebih banyak isi, sisanya tetap bisa digulir.', 'Ubah max-h-, bukan tinggi masing-masing paragraf.'),
      studioTask('Ruang hilang atau tetap', '#materi span.invisible', 'Bandingkan invisible dan hidden, lalu tulis apa yang terjadi pada teks setelah penanda.', 'Catatan menyebut ruang yang tetap ada dibanding ruang yang dihilangkan.', 'Run setiap varian sebelum mengembalikan pilihan akhir.'),
      studioTask('Header biasa', 'header', 'Lepaskan sticky sementara dan bandingkan posisi header ketika halaman digulir.', 'Header biasa ikut keluar viewport; versi sticky menetap pada batas atas.', 'Positioning dan z-index adalah dua keputusan berbeda.'),
      studioTask('Pembungkus lebih sempit', 'main', 'Tambahkan batas lebar yang lebih kecil tanpa menghilangkan pemusatan dan ruang di tepi.', 'Isi tetap di tengah dan nyaman di layar sempit.', 'Periksa container, mx-auto, dan max-w-.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Pendamping dan jadwal konsultasi</h2>
  <div class="mt-4 flex flex-col gap-4 sm:flex-row">
    <aside class="w-40 shrink-0 rounded-lg bg-emerald-100 p-4"><h3 class="font-semibold">Pendamping</h3><p class="mt-2">Bu Rina</p></aside>
    <div class="grow rounded-lg bg-slate-100 p-4"><h3 class="font-semibold">Topik konsultasi</h3><p class="mt-2">Struktur, tampilan, dan alasan memilih utility.</p></div>
  </div>
  <ul class="mt-4 flex flex-wrap gap-3"><li class="rounded bg-blue-100 p-3">09.00</li><li class="rounded bg-blue-100 p-3">10.00</li><li class="rounded bg-blue-100 p-3">11.00</li></ul>
</section>`, [
      'Bangun ringkasan jumlah kelas dengan label w-20 shrink-0 dan deskripsi grow. Perpanjang deskripsi untuk melihat bagaimana ruang dibagi.',
      'Ketik tiga kartu kelas dalam flex-col, lalu tambahkan sm:flex-row dan sm:flex-wrap. Uji basis kartu pada beberapa lebar tanpa memaksa semua kartu berada dalam satu baris.',
      'Bangun panel konsultasi dengan aside tetap dan isi grow, lalu susun slot waktu memakai flex-wrap. Jelaskan perbedaan wrap di daftar kartu dan grow di satu baris.'
    ], [
      studioTask('Arah panel', '#studio-extension > div', 'Ubah susunan konsultasi menjadi vertikal juga di desktop.', 'Aside dan isi tersusun atas-bawah pada semua ukuran.', 'Cari sm:flex-row; aturan responsif dapat menimpa aturan dasar.'),
      studioTask('Kartu keempat', '#materi daftar kartu', 'Ketik article baru untuk kartu CSS dan perbarui jumlah kelas pada ringkasan.', 'Ada empat kartu dan angka ringkasan tidak tertinggal.', 'Tulis struktur article sendiri, lalu periksa basis dan order-nya.'),
      studioTask('Ukuran tetap', '#studio-extension aside', 'Perbesar lebar aside lalu bandingkan dengan melepas shrink-0 saat ruang sempit.', 'Kamu bisa menjelaskan kapan aside mengecil dan kapan isi sisa ruang berubah.', 'Grow pada saudara tidak sama dengan shrink pada aside.'),
      studioTask('Urutan visual', '#materi article', 'Susun kartu menjadi Tailwind, HTML, jQuery, CSS memakai order saja.', 'Urutan visual berubah; HTML tetap memiliki urutan asal.', 'Jangan gunakan pola ini untuk membingungkan urutan fokus kontrol.'),
      studioTask('Slot yang membungkus', '#studio-extension ul', 'Tambahkan enam slot waktu dan bandingkan flex-wrap dengan flex-nowrap.', 'Versi akhir tidak kehilangan slot pada layar sempit.', 'Ukuran item dan ruang induk menentukan kapan wrap terlihat.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6">
  <h2 class="text-xl font-semibold">Peta tugas kelompok</h2>
  <div class="mt-4 grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-3">
    <article class="rounded-xl bg-emerald-100 p-5 sm:col-span-2"><h3 class="font-semibold">Tugas utama</h3><p class="mt-2">Rancang katalog yang membedakan materi unggulan dan materi biasa.</p></article>
    <article class="rounded-xl bg-white p-5"><h3 class="font-semibold">Review</h3><p class="mt-2">Periksa gap dan span.</p></article>
    <article class="rounded-xl bg-white p-5"><h3 class="font-semibold">Diskusi</h3><p class="mt-2">Jelaskan auto placement.</p></article>
    <article class="rounded-xl bg-white p-5"><h3 class="font-semibold">Presentasi</h3><p class="mt-2">Tunjukkan versi mobile.</p></article>
  </div>
</section>`, [
      'Bangun toolbar memakai flex dari materi sebelumnya, kemudian bangun grid satu kolom dan tambahkan aturan tiga kolom pada sm.',
      'Tambahkan kartu unggulan dengan dua kolom dan dua baris. Ketik kartu lain satu per satu sambil mengamati area mana yang ditempati otomatis.',
      'Bangun peta tugas dengan grid terpisah. Bedakan gap mendatar dan vertikal, lalu beri tugas utama span tanpa memasang position absolute.'
    ], [
      studioTask('Span berbeda', '#studio-extension article pertama', 'Buat tugas utama memenuhi tiga kolom hanya pada desktop.', 'Tugas utama memenuhi satu baris grid desktop dan tetap satu kolom pada mobile.', 'Gunakan prefix yang sama dengan aturan jumlah kolom.'),
      studioTask('Track tambahan', '#materi grid', 'Ubah desktop menjadi empat kolom dan sesuaikan span unggulan agar tampak seimbang.', 'Semua kartu masih terlihat dan unggulan tidak memaksa kolom tak sengaja.', 'Periksa jumlah kolom sebelum mengatur col-span.'),
      studioTask('Jarak dua arah', '#studio-extension > div', 'Gunakan gap-x yang lebih besar daripada gap-y.', 'Jarak mendatar dan vertikal terlihat berbeda.', 'Hapus gap lama jika membuat tujuan perubahan sulit dibaca.'),
      studioTask('Kartu baru', '#studio-extension > div', 'Tambah dua tugas dan prediksi area penempatannya sebelum Run.', 'Prediksi dibandingkan dengan auto placement yang benar-benar terjadi.', 'Grid-flow-row mengisi per baris.'),
      studioTask('Posisi eksplisit', '#studio-extension kartu Review', 'Tempatkan Review pada kolom ketiga desktop tanpa mengubah urutan HTML.', 'Review berada di area yang dituju; mobile tidak mendapat kolom tambahan.', 'Gunakan sm:col-start-, lalu periksa celah yang tersisa.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Ringkasan kelompok diskusi</h2>
  <div class="mt-4 flex min-h-32 items-center justify-between gap-4">
    <p class="text-3xl font-bold">3 <span class="block text-sm font-normal">kelompok</span></p>
    <p class="text-sm text-slate-600">8 peserta<br>per kelompok</p>
    <p class="self-end rounded bg-emerald-100 p-2 text-sm">Siap diskusi</p>
  </div>
  <div class="mt-4 grid min-h-32 place-items-center rounded-lg bg-slate-100 p-4"><p>Presentasi akan muncul di sini.</p></div>
</section>`, [
      'Ketik statistik dengan isi berbeda tinggi, lalu terapkan justify-between dan items-center. Tunjuk sumbu utama dan silang sebelum mengubah class.',
      'Bangun panel pesan kosong dengan tinggi minimum, grid, dan place-items-center. Bandingkan pemusatan teks dengan text-center saja.',
      'Bangun ringkasan kelompok, lalu letakkan status dengan self-end. Uji aturan induk dan aturan satu anak secara terpisah.'
    ], [
      studioTask('Distribusi ruang', '#studio-extension baris statistik', 'Bandingkan justify-between, justify-center, dan justify-evenly dengan isi yang sama.', 'Catatan menyebut perubahan ruang, bukan hanya nama utility.', 'Pertahankan lebar induk selama membandingkan.'),
      studioTask('Satu item menyimpang', '#studio-extension p status', 'Pindahkan status ke awal sumbu silang tanpa mengubah dua statistik lain.', 'Hanya status yang bergeser secara vertikal pada flex-row.', 'Cari self-end pada anak.'),
      studioTask('Dua sumbu pesan', '#studio-extension panel presentasi', 'Pindahkan pesan kosong ke kiri atas lalu kembalikan ke tengah.', 'Posisi berubah di dua arah, bukan sekadar perataan teks.', 'Place-items mengatur item grid; text-left mengatur isi teks.'),
      studioTask('Arah baru', '#studio-extension baris statistik', 'Coba flex-col dan sesuaikan tinggi agar efek justify tetap terlihat.', 'Kamu menjelaskan perubahan arah sumbu utama dan silang.', 'Jangan mengartikan justify selalu horizontal.'),
      studioTask('Statistik keempat', '#studio-extension baris statistik', 'Tambahkan angka jumlah pertemuan dengan label dua baris.', 'Statistik tetap sejajar tanpa tinggi tetap pada setiap p.', 'Gunakan perataan induk, bukan margin acak pada setiap anak.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Kontak dan waktu belajar</h2>
  <ul class="mt-4 space-y-3"><li class="rounded bg-slate-100 px-4 py-3">Email: ayu@example.com</li><li class="rounded bg-slate-100 px-4 py-3">Waktu belajar: 30 menit setiap sore</li></ul>
  <div class="mt-5 w-full max-w-sm rounded-lg bg-emerald-100 px-6 py-4"><h3 class="font-semibold">Target pekan ini</h3><p class="mt-2">Satu halaman selesai dan dapat dijelaskan.</p></div>
</section>`, [
      'Bangun profil tanpa spacing dahulu, kemudian tambahkan p-5 pada kartu dan mt-6 pada panel kedua. Bandingkan ruang dalam dengan ruang luar.',
      'Susun daftar profil memakai space-y-3, lalu bangun catatan panjang dengan max-h-32 dan overflow-auto. Tambah isi untuk memastikan batas benar-benar diuji.',
      'Tambahkan kontak dan target pekan dengan max-w-sm. Ubah padding mendatar dan vertikal secara terpisah, lalu cek lebar pada layar sempit.'
    ], [
      studioTask('Ruang dua arah', '#studio-extension div target', 'Buat padding mendatar lebih besar daripada vertikal.', 'Kotak terasa lebar tanpa menambah jarak luar section.', 'Ubah px-6 dan py-4 secara terpisah.'),
      studioTask('Jeda panel', '#materi article kedua', 'Perbesar margin atas panel catatan tanpa mengubah paddingnya.', 'Jarak antar-panel bertambah; teks tetap berjarak sama dari border.', 'Cari mt-6 pada article, bukan p-5.'),
      studioTask('Batas lebar', 'main', 'Bandingkan max-w-2xl dengan max-w-lg sambil mempertahankan w-full dan mx-auto.', 'Isi tetap responsif dan terpusat, batas desktop berubah.', 'Max-width bukan lebar tetap pada semua layar.'),
      studioTask('Item kontak ketiga', '#studio-extension ul', 'Tambahkan kontak lain dan atur jarak daftar dari pembungkus.', 'Jarak semua item konsisten tanpa margin individual.', 'Utility space-y diterapkan pada induk.'),
      studioTask('Batas tinggi', '#materi panel catatan', 'Tambah paragraf panjang dan naikkan max-height, lalu uji scroll.', 'Semua isi tetap dapat dijangkau tanpa membesarkan halaman tanpa batas.', 'H-48 pada isi bukan batas tinggi panel.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="font-serif text-2xl font-semibold">Catatan editor</h2>
  <blockquote class="mt-4 border-l-4 border-emerald-600 pl-4 italic leading-relaxed">Tulisan yang nyaman dibaca membuat peserta fokus pada ide, bukan mencari baris berikutnya.</blockquote>
  <h3 class="mt-5 text-sm font-bold uppercase tracking-wide">Istilah yang perlu diingat</h3>
  <ul class="mt-3 space-y-2"><li><code class="font-mono text-sm">leading</code>: jarak baris.</li><li><code class="font-mono text-sm">tracking</code>: jarak huruf.</li><li><code class="font-mono text-sm">font-weight</code>: ketebalan.</li></ul>
</section>`, [
      'Tulis artikel minimal dua paragraf. Terapkan batas lebar dari spacing/sizing sebelum memilih font agar kenyamanan baca punya konteks.',
      'Bedakan label, judul, bacaan, kode, dan catatan memakai ukuran, weight, family, dan warna. Ubah satu kategori pada setiap Run.',
      'Ketik blockquote dan glosarium. Bandingkan leading pada kutipan beberapa baris dengan tracking pada label pendek; keduanya bukan ruang yang sama.'
    ], [
      studioTask('Keluarga bacaan', '#materi paragraf font-serif', 'Bandingkan font-serif dan font-sans tanpa mengubah ukuran atau leading.', 'Perubahan bentuk huruf dapat dijelaskan tanpa tercampur perubahan ukuran.', 'Ubah satu font-family saja.'),
      studioTask('Jarak baris', '#studio-extension blockquote', 'Perpanjang kutipan menjadi beberapa baris lalu bandingkan leading-tight dan leading-relaxed.', 'Catatan menyebut pilihan yang lebih nyaman untuk teks panjang.', 'Efek leading kecil pada satu baris saja.'),
      studioTask('Dekorasi link', '#materi a', 'Ubah gaya garis bawah dan warnanya tanpa menghilangkan tanda bahwa ini link.', 'Link tetap mudah dikenali dan menuju ringkasan.', 'Pertahankan href dan coba decoration- atau underline-offset-.'),
      studioTask('Istilah baru', '#studio-extension ul', 'Tambahkan istilah text-align dengan format kode dan penjelasan singkat.', 'Glosarium punya empat istilah dengan pola konsisten.', 'Gunakan code untuk istilah, bukan font-mono pada seluruh paragraf.'),
      studioTask('Label tidak berteriak', '#studio-extension h3', 'Bandingkan uppercase dengan normal-case serta dua nilai tracking.', 'Kamu memilih versi label yang tetap jelas tanpa mendominasi judul.', 'Text-transform tidak mengubah kata asli di HTML.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-gradient-to-br from-blue-800 to-violet-800 p-6 text-white">
  <h2 class="text-2xl font-bold">Sesi pendampingan</h2>
  <p class="mt-3 max-w-lg leading-relaxed">Bawa hasil perubahanmu dan jelaskan alasan warna, arah gradasi, serta ukuran pola.</p>
  <div class="mt-4 rounded-lg bg-white/20 p-4"><h3 class="font-semibold">Agenda</h3><ul class="mt-3 space-y-2"><li>Review banner</li><li>Periksa kontras</li><li>Bandingkan pola berulang dan cover</li></ul></div>
</section>`, [
      'Bangun banner dengan warna polos dahulu. Tambahkan arah gradient, warna awal/akhir, lalu warna tengah; uji keterbacaan judul di semua sisi.',
      'Ketik pola radial-gradient dalam style dan terapkan pada dua panel. Uji repeat, ukuran ubin, posisi, dan cover satu per satu.',
      'Bangun banner pendampingan dengan panel bg-white/20. Bandingkan alpha background dengan opacity pada seluruh elemen sambil melihat tulisan di dalamnya.'
    ], [
      studioTask('Arah gradasi', '#studio-extension', 'Ubah gradasi diagonal menjadi vertikal dengan warna tetap.', 'Arah perpindahan berubah tanpa berganti palet.', 'Ubah bg-gradient-to-br saja.'),
      studioTask('Warna tengah', '#studio-extension', 'Tambahkan warna tengah yang menyambungkan dua warna ujung.', 'Gradasi memiliki tiga stop dan judul tetap terbaca.', 'Cari prefix via-.'),
      studioTask('Ubin lebih besar', '#materi panel pola repeat', 'Gandakan ukuran ubin dan jelaskan perubahan frekuensi pola.', 'Pola tetap berulang tetapi jumlah ubin yang terlihat berkurang.', 'Ukuran ubin ada pada bg-[length:24px_24px].'),
      studioTask('Alpha bukan opacity', '#studio-extension div agenda', 'Buat panel uji dengan mengetik ulang struktur panel, lalu bandingkan bg-white/20 dengan opacity-20.', 'Kamu menjelaskan apakah seluruh anak ikut transparan.', 'Jangan menumpuk kedua aturan dalam perbandingan.'),
      studioTask('Contain dan cover', '#materi panel pola kedua', 'Bandingkan bg-contain dan bg-cover dengan bg-no-repeat dipertahankan.', 'Catatan menyebut ruang kosong atau pemotongan yang terjadi.', 'Background dekoratif ini bukan pengganti img bermakna.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl border-2 border-slate-300 bg-white p-5">
  <h2 class="text-xl font-semibold">Apa yang termasuk dalam kelas?</h2>
  <ul class="mt-4 divide-y divide-dashed divide-slate-300"><li class="py-3">Contoh yang bisa diedit</li><li class="py-3">Diskusi hasil percobaan</li><li class="py-3">Review alasan pemilihan utility</li></ul>
  <p class="mt-4 rounded-lg border-l-4 border-emerald-600 bg-emerald-50 p-4">Pilih paket berdasarkan kebutuhan, bukan hanya warna kartu.</p>
</section>`, [
      'Bangun dua paket dengan isi fasilitas yang berbeda. Terapkan border width, style, color, dan radius bertahap untuk memisahkan peran setiap aturan.',
      'Tandai tepat satu paket rekomendasi memakai ring dan ring-offset. Periksa apakah ring menambah ruang isi atau hanya penekanan luar.',
      'Ketik daftar fasilitas tambahan memakai divide-y dan divide-dashed. Tambahkan catatan dengan border kiri agar tampak berbeda dari pemisah daftar.'
    ], [
      studioTask('Ketebalan terpilih', '#materi kartu rekomendasi', 'Naikkan ketebalan border hanya pada paket rekomendasi.', 'Satu paket lebih kuat tanpa mengubah border seluruh halaman.', 'Border dan ring adalah dua lapisan berbeda.'),
      studioTask('Bentuk paket', '#materi article', 'Bandingkan rounded-none dan rounded-2xl pada dua paket.', 'Perbedaan sudut tampak tanpa mengubah ukuran fasilitas.', 'Jangan mengubah padding bersamaan.'),
      studioTask('Divide baru', '#studio-extension ul', 'Ubah pemisah menjadi dotted dengan warna lebih lembut.', 'Pemisah antaranak berubah, border luar section tetap sama.', 'Utility divide mengatur anak, bukan garis luar induk.'),
      studioTask('Jarak ring', '#materi kartu rekomendasi', 'Ubah ring-offset dari 2 menjadi 4 dan jelaskan celah di luar border.', 'Ring bergeser keluar tanpa mengubah padding kartu.', 'Cari ring-offset-, bukan outline-offset-.'),
      studioTask('Fasilitas keempat', '#studio-extension ul', 'Tambahkan fasilitas baru dan pertahankan pola pemisah.', 'Daftar punya empat fasilitas dan tidak ada divide sebelum item pertama.', 'Tidak perlu memasang border per li.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 grid gap-5 sm:grid-cols-2">
  <article class="rounded-xl bg-white p-5 shadow-lg"><div aria-hidden="true" class="h-24 rounded-lg bg-gradient-to-r from-amber-400 to-rose-500 saturate-150"></div><h2 class="mt-4 font-semibold">Warna lebih kuat</h2><p class="mt-2">Filter hanya pada dekorasi, bukan pada teks.</p></article>
  <article class="rounded-xl bg-white p-5 shadow-inner"><div aria-hidden="true" class="h-24 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 hue-rotate-90"></div><h2 class="mt-4 font-semibold">Palet bergeser</h2><p class="mt-2">Bandingkan hue dengan perubahan brightness.</p></article>
</section>`, [
      'Bangun galeri dengan dekorasi dan informasi dalam elemen terpisah. Pastikan tulisan tetap jelas sebelum menambahkan efek.',
      'Terapkan shadow pada kartu, opacity pada pratinjau, dan grayscale/brightness pada dekorasi. Jelaskan sasaran efek sebelum Run.',
      'Ketik kartu pembanding saturate dan hue-rotate. Uji masing-masing dengan baseline yang sama agar perubahan filter tidak tercampur warna baru.'
    ], [
      studioTask('Bayangan sesuai fungsi', '#studio-extension article', 'Tukar shadow-lg dan shadow-inner pada dua kartu.', 'Satu terasa terangkat, satu terasa cekung; isi tidak berpindah.', 'Box-shadow tidak mengubah aliran dokumen.'),
      studioTask('Saturasi netral', '#studio-extension dekorasi pertama', 'Bandingkan saturate-150 dengan saturate-0 lalu pilih nilai yang membantu konteks.', 'Tulisan tetap normal, hanya dekorasi yang berubah.', 'Sasaran filter adalah div aria-hidden.'),
      studioTask('Hue pembanding', '#studio-extension dekorasi kedua', 'Bandingkan dua nilai hue-rotate dengan warna awal yang sama.', 'Perubahan palet dijelaskan tanpa mengubah from/to.', 'Ubah hue-rotate-, bukan background gradient.'),
      studioTask('Status pratinjau', '#materi article kedua', 'Naikkan opacity pratinjau dan perjelas tulisan status tanpa menjadikannya tombol aktif.', 'Status masih disebutkan lewat teks dan seluruh kartu tidak terlalu redup.', 'Opacity memengaruhi semua anak.'),
      studioTask('Kartu ketiga', '#studio-extension', 'Tambahkan kartu dengan blur hanya pada dekorasi kecil.', 'Informasi tetap terbaca dan blur tidak mengenai seluruh article.', 'Pisahkan lapisan dekorasi dari h2/p.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Pembagian kelompok</h2>
  <div class="mt-4 overflow-auto"><table class="w-full min-w-[480px] table-auto border-separate border-spacing-2 text-left">
    <caption class="mb-3 text-left text-slate-600">Kelompok dan tugas presentasi</caption>
    <thead><tr><th scope="col" class="bg-slate-100 p-3">Kelompok</th><th scope="col" class="bg-slate-100 p-3">Tugas</th></tr></thead>
    <tbody><tr><th scope="row" class="bg-emerald-50 p-3 font-normal">A</th><td class="bg-emerald-50 p-3">Review struktur</td></tr><tr><th scope="row" class="bg-blue-50 p-3 font-normal">B</th><td class="bg-blue-50 p-3">Review tampilan</td></tr></tbody>
  </table></div>
</section>`, [
      'Ketik tabel jadwal dengan caption, thead, tbody, dan th scope sebelum utility. Periksa hubungan header dengan data, bukan hanya bentuk garis.',
      'Tambahkan table-fixed, border-collapse, dan overflow pada pembungkus. Isi satu sel dengan teks panjang untuk membandingkan layout.',
      'Bangun tabel kelompok kedua memakai table-auto border-separate border-spacing-2. Jelaskan perbedaan garis bertemu dengan jarak antarsel.'
    ], [
      studioTask('Kolom ruangan', '#materi table', 'Tambahkan kolom Ruangan beserta header dan nilai di semua baris.', 'Jumlah sel konsisten dan header baru punya scope=col.', 'Ubah thead dan tbody, bukan satu baris saja.'),
      studioTask('Baris ketiga', '#studio-extension tbody', 'Tambahkan kelompok C dengan tugas Audit aksesibilitas.', 'Ada tiga baris dan header baris memakai scope=row.', 'Gunakan th untuk nama kelompok.'),
      studioTask('Jarak antarsel', '#studio-extension table', 'Bandingkan border-spacing-2 dan border-spacing-4.', 'Jarak antarsel berubah pada tabel border-separate.', 'Border-spacing tidak sama dengan padding sel.'),
      studioTask('Layout otomatis', '#materi table', 'Bandingkan table-fixed dan table-auto memakai isi panjang yang sama.', 'Kamu menjelaskan bagaimana lebar kolom dibagi.', 'Jangan mengganti isi di tengah perbandingan.'),
      studioTask('Layar sempit', 'pembungkus kedua tabel', 'Uji viewport sempit dan pastikan kolom bisa digulir tanpa hilang.', 'Sel terakhir tetap dapat dijangkau; halaman tidak meluber tak terkendali.', 'Overflow perlu pembungkus dan lebar minimum tabel.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Pilihan sesi pendampingan</h2>
  <div class="mt-4 flex flex-wrap gap-3">
    <a href="#penutup" class="rounded-lg border border-emerald-700 px-4 py-3 transition-colors duration-200 ease-out hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 motion-reduce:transition-none">Sesi pagi</a>
    <a href="#penutup" class="rounded-lg border border-blue-700 px-4 py-3 transition-colors duration-500 ease-in-out hover:bg-blue-100 focus-visible:outline focus-visible:outline-2 motion-reduce:transition-none">Sesi siang</a>
  </div>
  <p class="mt-4 text-sm text-slate-600">Dua durasi untuk dibandingkan; link hanya menuju catatan demo.</p>
</section>`, [
      'Bangun kartu dengan shadow-sm dan keadaan hover:shadow-xl tanpa transisi. Run untuk melihat perubahan instan sebagai baseline.',
      'Tambahkan transition-shadow, duration, dan easing satu per satu. Uji mouse dan keyboard pada link; tidak semua hover punya padanan fokus otomatis.',
      'Ketik dua pilihan sesi dengan durasi berbeda. Terapkan motion-reduce agar transisi dan animasi dekoratif dapat dihentikan saat pengguna meminta gerak dikurangi.'
    ], [
      studioTask('Durasi ringkas', '#studio-extension link kedua', 'Buat durasi link siang sama cepat dengan link pagi.', 'Perubahan warna kedua link terasa sebanding.', 'Duration menggunakan milidetik pada skala utility.'),
      studioTask('Efek fokus', '#studio-extension a', 'Tambahkan perubahan background saat focus-visible tanpa menghapus outline.', 'Tab memberi umpan balik warna dan penanda fokus yang jelas.', 'State fokus berbeda dari hover.'),
      studioTask('Easing pembanding', '#materi article pertama', 'Bandingkan ease-linear dengan ease-out pada durasi yang sama.', 'Kamu bisa menjelaskan ritme perubahan bayangan.', 'Pertahankan property dan durasi saat membandingkan.'),
      studioTask('Gerak dikurangi', 'elemen animate-pulse', 'Pastikan animasi berhenti ketika reduced motion aktif dan status demo tetap terbaca.', 'Informasi tidak bergantung pada gerak.', 'Pertahankan motion-reduce:animate-none dan tulisan penjelasan.'),
      studioTask('Sesi ketiga', '#studio-extension > div', 'Tambah sesi sore dengan transisi warna saja dan durasi yang masuk akal.', 'Link baru menuju catatan dan punya fokus serta reduced motion.', 'Gunakan salah satu link sebagai pola, bukan transition-all tanpa alasan.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 grid gap-6 p-8 sm:grid-cols-2">
  <article class="origin-top-right rounded-xl bg-amber-100 p-5 shadow-md transition-transform duration-300 hover:-rotate-3 hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"><h2 class="font-semibold">Poster sesi pagi</h2><p class="mt-3">Poros kanan atas.</p></article>
  <article class="origin-center rounded-xl bg-blue-100 p-5 shadow-md transition-transform duration-300 hover:translate-x-2 hover:rotate-3 motion-reduce:transform-none motion-reduce:transition-none"><h2 class="font-semibold">Poster sesi siang</h2><p class="mt-3">Poros tengah dan pergeseran.</p></article>
</section>`, [
      'Bangun poster dalam grid dengan ruang luar yang cukup. Terapkan transform hover satu jenis dahulu agar efek scale, rotate, dan translate dapat dipisahkan.',
      'Ubah origin tanpa mengubah sudut rotate. Catat sudut poster yang menjadi acuan; periksa apakah kartu sebelah ikut bergeser dalam layout.',
      'Ketik dua poster pembanding dengan poros berbeda dan aturan reduced motion. Uji pada layar sempit agar poster yang membesar tidak menutup informasi lain.'
    ], [
      studioTask('Poros baru', '#studio-extension article pertama', 'Ganti origin-top-right dengan origin-bottom-left tanpa mengubah sudut.', 'Putaran berubah acuan, bukan besar sudut.', 'Origin memengaruhi rotasi yang sudah diterapkan.'),
      studioTask('Skala aman', '#materi poster utama', 'Kurangi pembesaran hover dan periksa jaraknya terhadap kartu tetangga.', 'Poster menonjol tanpa menutupi informasi.', 'Ruang p-8 membantu tetapi tidak mengganti pengujian.'),
      studioTask('Arah pergeseran', '#studio-extension article kedua', 'Ganti gerak mendatar dengan gerak vertikal ke atas.', 'Poster naik tanpa memindahkan ruang asal di grid.', 'Hapus translate-x sebelum memasang translate-y.'),
      studioTask('Tanpa gerak', '#studio-extension article', 'Uji reduced motion dan pastikan dua poster tetap mempunyai penekanan warna/teks.', 'Efek transform dimatikan, isi masih jelas.', 'Motion-reduce:transform-none berbeda dari menghapus artikel.'),
      studioTask('Poster ketiga', '#studio-extension', 'Tambahkan poster dengan rotate negatif dan poros tengah.', 'Tiga poster tetap responsif dan tidak saling menutup.', 'Gunakan prefix hover agar transform tidak aktif terus tanpa alasan.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Petunjuk interaksi</h2>
  <ul class="mt-4 space-y-3"><li class="cursor-help rounded bg-emerald-50 p-4">Gunakan Tab untuk mencari kontrol.</li><li class="rounded bg-slate-100 p-4 select-text">Catatan belajar boleh diseleksi dan disalin.</li></ul>
  <label for="reviewNote" class="mt-4 block font-semibold">Catatan review</label>
  <textarea id="reviewNote" rows="3" class="mt-2 w-full resize-y rounded-lg border p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700" placeholder="Apa yang berubah ketika pointer melewati overlay?"></textarea>
</section>`, [
      'Bangun textarea dengan label yang cocok. Uji fokus dan resize sebelum menambahkan efek dekoratif.',
      'Ketik tombol dan overlay relative/absolute. Terapkan pointer-events-none pada overlay, lalu pasang handler pada tombol dan cek pesan saat diklik.',
      'Bangun catatan review kedua. Uji Tab, seleksi teks, dan resize-y; bedakan petunjuk cursor dari keadaan disabled yang benar-benar menolak aksi.'
    ], [
      studioTask('Fokus terlihat', '#studio-extension textarea', 'Perbesar outline dan offset tanpa menghapus akses keyboard.', 'Textarea mudah ditemukan saat Tab; layout tidak bergeser karena outline.', 'Gunakan outline-width dan outline-offset.'),
      studioTask('Resize pembanding', '#reviewNote', 'Bandingkan resize-y dan resize-none dengan tulisan panjang.', 'Kamu menjelaskan apakah pengguna masih dapat memperpanjang kotak.', 'Rows mengatur tinggi awal, resize mengatur izin perubahan ukuran.'),
      studioTask('Overlay penangkap', '#materi overlay', 'Coba pointer-events-auto, amati klik, lalu kembalikan agar tombol bekerja.', 'Versi akhir masih menampilkan pesan setelah klik.', 'Ubah lapisan dekoratif, bukan handler tombol.'),
      studioTask('Teks bisa disalin', '#studio-extension li kedua', 'Uji select-none lalu kembalikan select-text untuk catatan belajar.', 'Isi belajar tetap bisa dipilih dan disalin.', 'Pembatasan seleksi tidak tepat untuk materi yang perlu dicatat.'),
      studioTask('Pesan aksi baru', 'script handler #noteAction', 'Ubah pesan hasil klik menjadi penjelasan tindakan tanpa mengklaim data tersimpan.', 'Klik menampilkan pesan baru dan tetap tidak mengirim data.', 'Handler inline ada di bawah footer HTML.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Informasi pendaftaran</h2>
  <div class="mt-4 grid gap-4 sm:grid-cols-2"><article class="rounded-lg bg-emerald-50 p-4"><h3 class="font-semibold">Sebelum mengisi</h3><ul class="mt-3 space-y-2"><li>Siapkan nama dan email.</li><li>Pilih kelas dan sesi.</li><li>Baca persetujuan.</li></ul></article><article class="rounded-lg bg-blue-50 p-4"><h3 class="font-semibold">Setelah diperiksa</h3><p class="mt-3">Ringkasan hanya muncul di browser. Tidak ada pengiriman atau penyimpanan data.</p></article></div>
  <p class="mt-4 text-sm text-slate-600">Latihan: perluas form yang sama, bukan membuat form baru yang terpisah.</p>
</section>`, [
      'Ketik form nama/email dengan label, name, type, dan autocomplete. Terapkan tampilan field setelah hubungan label diuji dengan klik.',
      'Tambahkan select, radio satu name, textarea, persetujuan, dan submit. Uji pilihan dengan mouse dan keyboard sebelum menulis handler.',
      'Ketik handler submit yang menahan pengiriman, memeriksa validitas, dan menulis ringkasan memakai textContent. Uji kosong, salah format, dan valid sambil membandingkan dengan panel informasi.'
    ], [
      studioTask('Nomor peserta readonly', '#registration', 'Tambahkan input nomor peserta readonly dengan label yang cocok dan nama field.', 'Nomor dapat dibaca/fokus tetapi tidak diedit.', 'Readonly berbeda dari disabled; jangan hanya memberi background abu-abu.'),
      studioTask('Kelas wajib', '#regClass', 'Tambah opsi awal Pilih kelas bernilai kosong dan jadikan select wajib.', 'Form menolak opsi kosong sebelum menampilkan ringkasan valid.', 'Required pada select bergantung nilai opsi terpilih.'),
      studioTask('Sesi ketiga', 'fieldset dalam #registration', 'Tambahkan sesi sore yang berbagi name dengan dua radio lama.', 'Hanya satu dari tiga sesi dapat dipilih.', 'Name sama mengikat kelompok, id unik membantu label.'),
      studioTask('Pesan lebih informatif', 'script #registrationStatus', 'Tambahkan nama kelas pilihan ke ringkasan valid.', 'Nama dan kelas ditampilkan sebagai teks, bukan markup dari input.', 'Baca nilai select dan gunakan textContent.'),
      studioTask('Tata letak form', '#registration', 'Buat area pertanyaan dan tombol tetap satu baris penuh sambil mengubah susunan field lain.', 'Mobile tetap satu kolom; kontrol panjang tidak menyempit.', 'Periksa sm:col-span-2 terhadap jumlah kolom induk.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Panduan status tombol</h2>
  <ul class="mt-4 divide-y divide-slate-200"><li class="py-3">Toggle: menyatakan pilihan aktif atau nonaktif.</li><li class="py-3">Loading: proses simulasi sedang berjalan.</li><li class="py-3">Disabled: aksi sementara tidak bisa dijalankan.</li></ul>
  <p class="mt-4 rounded-lg bg-amber-50 p-4">Uji label dan atribut status, bukan hanya warna tombol.</p>
</section>`, [
      'Bangun field nama tampilan dan tiga varian aksi: toggle, simpan, dan link status. Tetapkan type=button untuk aksi yang tidak mengirim form.',
      'Ketik handler toggle dan ubah aria-pressed bersama teksnya. Klik berulang lalu cek apakah tulisan serta warna mengikuti keadaan yang sama.',
      'Ketik simulasi loading: disabled dan aria-busy aktif dahulu, kemudian label/pesan dipulihkan setelah timer. Uji klik cepat dan pastikan tidak ada penyimpanan sungguhan.'
    ], [
      studioTask('Palet pilihan aktif', '#reminder', 'Ubah palet state aktif tanpa membuat semua keadaan tombol berwarna sama.', 'Aria-pressed=true terlihat berbeda dari false.', 'Ubah varian aria-pressed:, bukan hanya class dasar.'),
      studioTask('Durasi simulasi', 'script setTimeout', 'Ubah durasi menjadi 1500ms dan perjelas label saat menunggu.', 'Tombol terkunci lebih lama, kemudian kembali aktif.', 'Disabled dan aria-busy harus dipulihkan bersama.'),
      studioTask('Aksi kembalikan pilihan', '#materi dan script', 'Tambahkan button secondary yang mengembalikan pengingat ke false.', 'Reset memperbarui atribut, label, dan tampilan toggle.', 'Gunakan ID baru dan handler baru; jangan hanya mengganti warna.'),
      studioTask('Ukuran tombol', '#saveSettings', 'Perbesar padding tombol simpan tanpa mengubah tombol pengingat.', 'Aksi utama punya area klik lebih luas; toggle tetap semula.', 'Ubah px-/py- pada satu elemen.'),
      studioTask('Ringkasan nama', '#settingsStatus dan script', 'Saat simulasi selesai, tampilkan nama tampilan yang sedang diisi dan tegaskan bahwa data tidak disimpan.', 'Pesan memuat input sebagai teks biasa setelah proses pulih.', 'Gunakan value dan textContent, bukan innerHTML.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6">
  <h2 class="text-xl font-semibold">Sumber belajar dan tugas minggu ini</h2>
  <div class="mt-4 grid gap-4 sm:grid-cols-2"><article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><h3 class="font-semibold">Tugas individu</h3><span class="mt-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm">Belum dikumpulkan</span><ul class="mt-4 space-y-2"><li>Ubah satu komponen portal.</li><li>Catat tiga keputusan utility.</li><li>Jelaskan hasil dengan screenshot.</li></ul></article><article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><h3 class="font-semibold">Sumber belajar</h3><p class="mt-3">Kembali ke materi konsep sebelum menambah variasi baru.</p><a href="#portalFaq" class="mt-4 inline-block text-emerald-700 underline">Buka FAQ portal</a></article></div>
</section>`, [
      'Bangun navbar/breadcrumb dahulu dan pastikan anchor menuju elemen yang benar. Ketik handler mobile yang menyelaraskan aria-expanded dan hidden.',
      'Bangun alert, dua card, badge, dan daftar. Ketik alur tutup/buka alert sambil mengembalikan fokus ke kontrol yang tetap terlihat.',
      'Tambahkan FAQ details/summary dan panel tugas mingguan. Uji kombinasi halaman lengkap: menu kecil, alert tertutup, FAQ terbuka, serta kartu pada dua ukuran.'
    ], [
      studioTask('Card jadwal', '#portalCards', 'Tambahkan kartu ketiga berisi tabel jadwal kecil dengan header sel yang benar.', 'Portal punya tiga kartu responsif dan jadwal dapat dibaca.', 'Gabungkan pola card dengan materi Tables.'),
      studioTask('FAQ tambahan', '#portalFaq', 'Tambahkan FAQ pengumpulan tugas dengan details/summary.', 'FAQ baru bekerja lewat keyboard tanpa handler tambahan.', 'Pertahankan summary sebagai pemicu native.'),
      studioTask('Menu sumber belajar', '#portalLinks', 'Tambahkan link yang menuju #studio-extension dan periksa dari menu mobile.', 'Anchor membawa pengguna ke bagian sumber belajar.', 'Tautan harus punya target ID yang benar-benar ada.'),
      studioTask('Badge status tugas', '#studio-extension span', 'Ganti status menjadi Sedang dikerjakan dan gunakan palet biru yang terbaca.', 'Warna dan tulisan menyatakan status yang sama.', 'Status tidak boleh hanya bergantung warna.'),
      studioTask('Pesan alert baru', '#portalMessage dan script', 'Ubah isi awal dan pesan ketika alert dibuka kembali agar membahas tenggat tugas.', 'Tutup/buka tetap bekerja dan fokus tidak hilang.', 'Ubah pesan awal serta textContent pada handler buka.')
    ])
  ],
  jquery: [
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Alur sambutan</h2>
  <ol class="mt-4 list-decimal space-y-3 pl-6"><li>Halaman selesai dibuat.</li><li>Handler menunggu klik peserta.</li><li>Pesan sambutan berubah tanpa reload.</li></ol>
  <p class="mt-4 rounded-lg bg-emerald-50 p-4">Catat perbedaan memasang handler dan menjalankan isinya.</p>
</section>`, [
      'Bangun HTML dengan button dan p status ber-ID unik. Muat jQuery setelah Tailwind tetapi sebelum script yang memakai $.',
      'Ketik callback DOM ready, selector tombol, dan on click dari awal. Jalankan sebelum klik untuk membuktikan handler belum mengubah pesan.',
      'Ketik perubahan text di dalam handler. Uji dua kali dan bandingkan dengan jika perubahan ditempatkan di luar handler; kembalikan versi berbasis event.'
    ], [
      studioTask('Salam pribadi', 'script #greeting', 'Ubah kalimat sambutan menjadi instruksi kelasmu tanpa mengganti selector.', 'Pesan baru muncul hanya setelah klik.', 'Callback click menentukan kapan text dijalankan.'),
      studioTask('Tombol ulang', '#materi dan script', 'Tambahkan tombol yang mengembalikan pesan awal.', 'Dua tombol menangani keadaan pesan yang berbeda.', 'ID tombol baru harus unik dan cocok dengan selector.'),
      studioTask('Nama ID baru', '#greet dan script', 'Ganti ID tombol secara konsisten di HTML dan handler.', 'Tombol tetap merespons dan tidak ada selector lama yang tertinggal.', 'Pencarian ID perlu mencakup HTML dan script.'),
      studioTask('Pesan sesudah siap', 'callback DOM ready', 'Tambahkan pesan awal yang menyatakan library sudah siap sebelum pengguna klik.', 'Pesan awal berubah sekali saat halaman siap, lalu click memberi salam.', 'Bedakan kode di callback ready dengan kode di callback click.'),
      studioTask('Catatan alur', '#studio-extension ol', 'Perluas daftar alur menjadi lima tahap sesuai kode yang kamu buat.', 'Setiap tahap menyebut selector/event/tindakan yang benar.', 'Tulis alur nyata, bukan definisi library semata.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Skenario pengujian pilihan</h2>
  <ul class="mt-4 space-y-3"><li class="rounded bg-emerald-50 p-4">Ketik nama perlahan: event input berjalan setiap perubahan.</li><li class="rounded bg-blue-50 p-4">Pilih kelas: event click membaca tombol yang diklik.</li><li class="rounded bg-amber-50 p-4">Kosongkan nama: tentukan pesan yang membantu.</li></ul>
</section>`, [
      'Ketik field nama dan ringkasan dengan ID, lalu tombol kelas dengan satu class bersama. Cocokkan target sebelum memasang event.',
      'Ketik handler input yang membaca val. Uji nama kosong, nama ber-spasi, dan ketikan perlahan untuk mengenali frekuensi event.',
      'Ketik handler click pada class pilihan dan baca $(this).text(). Tambahkan kelas baru untuk membuktikan satu selector dapat menangani beberapa tombol.'
    ], [
      studioTask('Kelas ketiga', '#materi tombol kelas', 'Tambahkan tombol Web C dengan class yang sama.', 'Web C langsung mengubah ringkasan tanpa handler khusus.', 'Selector class memilih semua tombol yang sudah ada saat handler dipasang.'),
      studioTask('Nama kosong', 'handler #participant', 'Tampilkan Nama belum diisi ketika input kosong atau hanya spasi.', 'Ringkasan tidak hanya menampilkan Nama: tanpa penjelasan.', 'Gunakan trim sebelum memilih pesan.'),
      studioTask('Penanda pilihan', 'handler .class-choice', 'Tandai tepat satu tombol terpilih dan bersihkan penanda tombol lain.', 'Pilihan terakhir terlihat jelas; ringkasan tetap benar.', 'Gunakan class state atau aria-pressed dan perbarui semua tombol.'),
      studioTask('Ringkasan gabungan', '#classSummary dan script', 'Gabungkan nama terkini dan kelas yang dipilih dalam satu pesan.', 'Nama pengguna tetap tampil sebagai teks biasa.', 'Simpan pilihan jika ingin pesan ikut berubah setelah mengetik.'),
      studioTask('Event pembanding', 'handler nama', 'Bandingkan input dengan change lalu kembalikan input untuk umpan balik langsung.', 'Catatan menyebut kapan masing-masing event terlihat berjalan.', 'Uji mengetik dan memindahkan fokus, bukan klik tombol saja.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Aturan daftar tugas</h2>
  <ol class="mt-4 list-decimal space-y-3 pl-6"><li>Nama tugas tidak boleh kosong.</li><li>Prioritas ditempatkan sebelum tugas biasa.</li><li>Item baru mempunyai tombol hapus sendiri.</li><li>Data hanya hidup selama halaman demo terbuka.</li></ol>
</section>`, [
      'Bangun form dan ul kosong, lalu ketik handler submit yang menahan perpindahan. Baca val dan trim sebelum membuat elemen.',
      'Buat li, span, dan button lewat jQuery, kemudian isi nama tugas dengan text. Coba input berisi tag untuk membuktikan markup pengguna tidak dijalankan.',
      'Pasang delegasi click pada daftar sebelum menambah item. Uji append/prepend, hapus item baru, dan pengembalian fokus ke input.'
    ], [
      studioTask('Jumlah tugas', '#taskMessage dan handler tambah/hapus', 'Tampilkan jumlah tugas setelah setiap perubahan daftar.', 'Angka bertambah dan berkurang dengan benar.', 'Baca children li setelah operasi selesai.'),
      studioTask('Pesan kosong', 'handler #taskForm', 'Beri pesan ketika input hanya spasi dan pindahkan fokus kembali.', 'Tidak ada item kosong dan peserta tahu apa yang perlu diisi.', 'Jangan return tanpa penjelasan pada keadaan ini.'),
      studioTask('Tandai selesai', 'li dinamis dan delegasi', 'Tambahkan tombol Selesai yang menandai satu tugas tanpa menghapusnya.', 'Item baru juga bisa ditandai; tugas lain tidak berubah.', 'Gunakan delegasi dan closest/parent pada tombol yang diklik.'),
      studioTask('Label prioritas', 'pembuatan li', 'Tambahkan tulisan Prioritas pada item yang diprepend.', 'Urutan dan label sama-sama mengomunikasikan prioritas.', 'Baca checked lewat prop, jangan memakai attr sebagai keadaan terkini.'),
      studioTask('Daftar kosong lagi', 'handler hapus', 'Saat tugas terakhir dihapus, tampilkan pesan Belum ada tugas.', 'Pesan kosong pulih dan fokus tetap terlihat.', 'Periksa jumlah anak setelah remove.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Checklist perilaku pengaturan</h2>
  <ul class="mt-4 space-y-3"><li class="rounded bg-slate-100 p-4">Pilihan pengingat: atribut dan warna harus cocok.</li><li class="rounded bg-slate-100 p-4">Persetujuan: tombol mengikuti checked saat ini.</li><li class="rounded bg-slate-100 p-4">Nama pengguna: tag tetap tampil sebagai tulisan.</li></ul>
</section>`, [
      'Bangun field, toggle, persetujuan, tombol disabled, dan panel ringkasan. Bedakan atribut awal HTML dari keadaan kontrol setelah pengguna bertindak.',
      'Ketik handler toggle yang memperbarui class serta aria-pressed. Ketik handler change yang membaca prop checked dan mengubah disabled serta tooltip.',
      'Ketik alur val → text untuk nama, lalu gunakan html hanya pada markup bantuan yang tetap. Uji nama berisi <b> agar perbedaannya nyata.'
    ], [
      studioTask('Persetujuan dibatalkan', 'handler #profileConsent', 'Perbarui pesan status ketika centang dicabut dan tombol terkunci kembali.', 'Pesan menjelaskan alasan tombol tidak aktif.', 'Prop membaca keadaan terkini, bukan atribut awal.'),
      studioTask('Reset pengaturan', '#materi dan script', 'Tambahkan tombol reset nama, checkbox, toggle, tooltip, dan ringkasan.', 'Semua keadaan kembali konsisten, bukan hanya warna toggle.', 'Daftar lima sasaran sebelum menulis handler.'),
      studioTask('Palet aktif', 'handler #profileToggle', 'Ubah warna class aktif lalu uji klik dua kali.', 'Class baru muncul/hilang sesuai aria-pressed.', 'Ubah add/remove atau toggleClass sebagai pasangan yang konsisten.'),
      studioTask('Nama kosong', 'handler #profileSave', 'Tolak nama kosong atau hanya spasi dengan pesan yang membantu.', 'Ringkasan valid tidak dibuat ketika nama kosong.', 'Val perlu trim sebelum pemeriksaan.'),
      studioTask('Markup aman', '#profileHelp dan #profileResult', 'Tambah bantuan statis berformat daftar, tetapi pertahankan nama pengguna sebagai text.', 'Bantuan memiliki markup; input <b> tetap teks biasa.', 'Jangan mengirim input pengguna ke html.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Peta hubungan elemen</h2>
  <ol class="mt-4 list-decimal space-y-3 pl-6"><li>Button berada di dalam div tindakan.</li><li>Div tindakan berada di dalam article kartu peserta.</li><li>H2 adalah anak langsung kartu.</li><li>Kartu lain adalah saudara dalam grid yang sama.</li></ol>
</section>`, [
      'Ketik dua kartu dengan struktur yang sama dan tandai induk setiap button. Jangan memakai ID yang sama untuk seluruh kartu.',
      'Ketik handler mulai dari this → closest kartu. Baca nama lewat children h2 dan cari status lewat find untuk menunjukkan tingkat yang berbeda.',
      'Bersihkan siblings dan parent tindakan sebelum menandai pilihan baru. Uji berpindah kartu sambil memastikan judul/data peserta tidak tertukar.'
    ], [
      studioTask('Peserta ketiga', '#materi grid', 'Tambahkan kartu Citra dengan pola class yang sama.', 'Citra langsung ikut dipilih tanpa handler baru.', 'Handler class dipasang setelah seluruh HTML ini tersedia.'),
      studioTask('Status lebih dalam', 'struktur .participant-status', 'Bungkus status dengan div tambahan dan pertahankan find yang benar.', 'Status tetap berubah meskipun bukan anak langsung kartu.', 'Bandingkan find dengan children pada sasaran ini.'),
      studioTask('Hanya saudara kartu', 'handler siblings', 'Tambahkan elemen nonkartu di grid dan pastikan tidak ikut dibersihkan.', 'Selector siblings hanya menarget .participant-card.', 'Jangan menghapus filter selector tanpa memeriksa semua saudara.'),
      studioTask('Penanda judul', 'handler children h2', 'Beri judul kartu aktif penekanan dan pulihkan judul kartu lain.', 'Tepat satu judul diberi penanda, nama tetap benar.', 'Atur children pada kartu serta pada saudara dengan konsisten.'),
      studioTask('Tombol batalkan pilihan', '#materi dan script', 'Tambahkan kontrol yang membersihkan semua penanda/status pilihan.', 'Tidak ada kartu aktif setelah pembatalan.', 'Reset kartu dan div tindakan, bukan satu class saja.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Uji panel bantuan</h2>
  <ul class="mt-4 space-y-3"><li class="rounded bg-emerald-50 p-4">Klik sekali: panel terbuka.</li><li class="rounded bg-blue-50 p-4">Klik cepat: keadaan akhir tetap sesuai tombol.</li><li class="rounded bg-amber-50 p-4">Reduced motion: informasi tetap muncul tanpa animasi.</li></ul>
</section>`, [
      'Bangun tombol dengan aria-controls dan panel display:none. Periksa anchor bantuan sebelum memberi animasi.',
      'Ketik handler yang membaca aria-expanded lalu menentukan keadaan tujuan. Gunakan show/hide dahulu untuk melihat alur tanpa efek.',
      'Tambahkan stop dan slideDown/slideUp untuk mode biasa, tetapi pertahankan show/hide saat reduced motion. Uji klik cepat dan perubahan label.'
    ], [
      studioTask('Efek fade', 'handler #helpToggle', 'Ganti slideDown/slideUp dengan fadeIn/fadeOut sambil mempertahankan stop dan reduced motion.', 'Panel memudar, tidak menyusut; keadaan akhirnya tetap benar.', 'Pasangkan efek buka dan tutup.'),
      studioTask('Durasi pendek', 'handler efek', 'Bandingkan 200ms dan 600ms lalu pilih durasi yang nyaman.', 'Tombol tidak terasa tertunda setelah klik berulang.', 'Stop mencegah antrean, bukan alasan memilih durasi terlalu panjang.'),
      studioTask('Isi panel panjang', '#helpPanel', 'Tambahkan daftar langkah bantuan dan uji efek ketika tinggi panel berubah.', 'Semua informasi terlihat setelah panel selesai dibuka.', 'Jangan memberi tinggi tetap yang memotong isi.'),
      studioTask('Keadaan awal terbuka', '#helpToggle dan #helpPanel', 'Ubah keadaan awal agar panel terbuka dan samakan aria-expanded serta label.', 'Klik pertama menutup panel, bukan membuka panel yang sudah terbuka.', 'HTML awal, display, dan atribut perlu cocok.'),
      studioTask('Tombol tutup di panel', '#helpPanel dan script', 'Tambah button Tutup bantuan yang memulihkan status tombol utama dan fokus.', 'Panel tertutup, aria-expanded=false, fokus kembali ke pemicu.', 'Jangan menyembunyikan elemen yang sedang fokus tanpa tujuan fokus baru.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Matriks uji pendaftaran</h2>
  <ul class="mt-4 space-y-3"><li class="rounded bg-red-50 p-4">Nama pendek + email salah: tampilkan kesalahan pertama.</li><li class="rounded bg-amber-50 p-4">Nama valid + email salah: fokus ke email.</li><li class="rounded bg-emerald-50 p-4">Keduanya valid: ringkasan muncul tanpa mengirim data.</li></ul>
</section>`, [
      'Bangun label, input, name, type, required, aria-describedby, dan pesan status. Gunakan novalidate agar handler dapat menjelaskan hasil sendiri.',
      'Ketik submit dan preventDefault, lalu baca nama dengan val/trim serta email dengan checkValidity. Tulis pesan berbeda untuk dua kegagalan.',
      'Perbarui aria-invalid dan fokus kolom yang salah. Uji nama pendek, email salah, keduanya valid, serta submit lewat Enter; isi matriks uji dengan hasilmu.'
    ], [
      studioTask('Nama minimal lima', 'handler #guidedSignup', 'Ubah syarat nama menjadi minimal lima karakter dan sesuaikan label serta pesan.', 'Aturan, label, dan feedback tidak saling bertentangan.', 'Cari angka batas dan semua kalimat yang menyebut minimal.'),
      studioTask('Kelas wajib', '#guidedSignup dan handler', 'Tambahkan select kelas dengan opsi kosong dan pemeriksaan wajib.', 'Pesan menunjuk kelas ketika nama/email sudah valid tetapi kelas belum dipilih.', 'Tambahkan label, name, ID, dan aria-invalid yang konsisten.'),
      studioTask('Spasi tepi', '#signupName dan handler', 'Pastikan nama ber-spasi tepi ditampilkan bersih tanpa menghapus spasi di tengah.', 'Ringkasan nama memakai hasil trim, bukan mengubah semua spasi.', 'Uji nama dua kata.'),
      studioTask('Pesan sukses berbeda', '#signupMessage', 'Beri pesan valid gaya sukses dan hapus gaya error setelah data diperbaiki.', 'Style pulih ketika keadaan berubah; warna bukan satu-satunya informasi.', 'Class state perlu dipasang dan dibersihkan sebagai pasangan.'),
      studioTask('Kasus tag sebagai nama', 'alur val → text', 'Uji input <b>Ayu</b> dan pertahankan penampilannya sebagai teks biasa.', 'Tag tidak berubah menjadi markup aktif.', 'Jangan mengganti text dengan html untuk ringkasan pengguna.')
    ]),
    studioPlan(`<section id="studio-extension" class="mt-6 rounded-xl bg-white p-5">
  <h2 class="text-xl font-semibold">Skenario request direktori</h2>
  <ol class="mt-4 list-decimal space-y-3 pl-6"><li>Loading: tombol dikunci dan status diperbarui.</li><li>Sukses: data dibaca dan item dirender sebagai teks.</li><li>Gagal: alasan disampaikan tanpa menyisakan hasil lama.</li><li>Selesai: tombol selalu dapat dicoba kembali.</li></ol>
  <p class="mt-4 text-sm text-slate-600">Data URL dipakai untuk latihan tanpa backend; bukan API produksi.</p>
</section>`, [
      'Bangun kontrol simulasi, tombol, panel status, dan daftar kosong. Ketik data JSON lokal sebelum menulis alur request.',
      'Ketik ajax dan callback done/fail/always. Kunci tombol dahulu, kosongkan daftar lama, dan render nama lewat elemen baru dengan text.',
      'Uji sukses → gagal → sukses pada dokumen yang sama. Pastikan hasil lama bersih, pesan sesuai callback, dan disabled/aria-busy dipulihkan di semua jalur.'
    ], [
      studioTask('Field kelas', 'data JSON dan callback done', 'Tambahkan field className pada setiap peserta dan tampilkan bersama nama.', 'Semua item menampilkan dua field sebagai teks biasa.', 'Perubahan bentuk data perlu diikuti perubahan render.'),
      studioTask('Jumlah hasil', '#directoryStatus dan done', 'Cantumkan jumlah peserta yang berhasil dimuat.', 'Angka sesuai panjang array, bukan angka tetap.', 'Gunakan people.length setelah data berhasil dibaca.'),
      studioTask('Hasil kosong', 'data JSON dan done', 'Coba array kosong dan tampilkan Belum ada peserta tanpa menganggapnya error.', 'Keadaan kosong berbeda dari request gagal; tombol tetap pulih.', 'JSON valid boleh berisi array kosong.'),
      studioTask('Gaya gagal pulih', '#directoryStatus dan callback', 'Beri gagal gaya error dan bersihkan pada loading/sukses berikutnya.', 'Status tidak tetap merah setelah retry berhasil.', 'Uji urutan gagal lalu sukses, bukan keadaan terpisah saja.'),
      studioTask('Empat peserta', 'data JSON dan #directory', 'Tambahkan dua peserta dan pastikan klik ulang tidak menggandakan hasil.', 'Setiap request sukses menghasilkan empat item saja.', 'Empty sebelum request menjaga hasil lama tidak ikut menumpuk.')
    ])
  ]
};

function guidedStudioSteps(project, plan, capstone) {
  return [
    'Mulai dengan Run sekali dan catat tampilan awal sebagai pembanding melalui jurnal atau screenshot. Mahasiswa tidak memakai Copy untuk menyiapkan kode; instruktur dapat menyimpan source sebagai referensi-awal.html bila perlu.',
    'Buat file latihan terpisah atau gunakan editor aplikasi dengan cadangan sudah tersimpan. Ketik ulang doctype, html lang, head, meta charset/viewport, dan body dari kerangka kosong. Tambahkan sumber library yang sama; jalankan kerangka sebelum isi dibuat.',
    `Bangun header: nama kelas, h1, dan dua link navigasi. Ganti identitas dengan kelasmu, pertahankan target #materi serta #penutup, lalu cek warna dan ukuran teks. Tujuan halaman: ${project.scenario}`,
    `Bangun pembungkus main dengan utility lebar dan spacing yang ada pada source. Ketik komponen utama sedikit demi sedikit, bukan menyalin seluruh body sekaligus. Fokus tahap ini adalah ${project.focus}.`,
    ...plan.milestones,
    `Bangun #studio-extension lalu lanjutkan #capstone-project satu modul per percobaan. Proyek lengkap berisi ${capstone.config.modules.map((module) => module.title).join(', ')}. Ketik tiga entri per modul, periksa data dan susunannya, lalu bandingkan satu pola komponen yang sama pada bagian berbeda.`,
    'Tambahkan footer dan bagian #studio-journal untuk mencatat hasil. Pastikan setiap link/label punya target yang benar dan tidak ada ID duplikat pada komponen tambahan yang kamu ketik.',
    (project.js || capstone.script) ? 'Ketik ulang script interaksi di bagian bawah HTML, satu handler pada setiap percobaan. Uji contoh awal dan #capstone-tools secara terpisah agar selector tidak tertukar. Run lalu uji tindakan pengguna; catat perbedaan saat handler dipasang dan saat callback dijalankan.' : 'Audit utility komponen dari luar ke dalam: pembungkus, layout, jarak, tulisan, lalu state. Bandingkan tiga kartu #capstone-project dan tulis property CSS serta pengaruhnya pada #studio-journal.',
    `${project.locate} Sesudah mengenali lokasi, lakukan percobaan berikut pada kode yang kamu ketik: ${project.experiment}`,
    'Uji halaman pada viewport sempit/lebar dan navigasi keyboard. Untuk kontrol interaktif, coba keadaan awal, perubahan berulang, dan kembali ke keadaan awal; perbaiki masalah sebelum menambah fitur.',
    'Selesaikan versi tahap terpandu dengan mengetik kode sendiri, lalu lanjutkan delapan tantangan di bawah source code. Jika bekerja di file terpisah, ketik perubahanmu di editor aplikasi juga; jangan menempelkan source code. Kerjakan pada dokumen yang sama, Run setiap perubahan, dan catat dugaan serta hasilnya pada jurnal.'
  ];
}
function guidedStudioChallenges(plan) {
  return [
    studioTask('Pemanasan: ruang halaman', 'main, class px-4 py-6', 'Perbesar ruang vertikal isi halaman tanpa mengubah jarak mendatar. Bandingkan dengan memperbesar padding satu kartu.', 'Ruang atas/bawah main berubah; tepi kiri/kanan tetap dan kartu tidak ikut berubah padding dalamnya.', 'Cari py-6 pada main. Pilih nilainya sendiri dan ubah satu elemen dulu.'),
    studioTask('Identitas kelas sendiri', 'header h1 dan paragraf identitas', 'Ganti judul/nama kelas, ubah ukuran judul, dan pilih warna header baru dengan teks tetap kontras.', 'Header mempunyai identitasmu, hirarki tulisan jelas, link navigasi masih bekerja.', 'Ubah teks, text-3xl, dan bg-emerald-800 di lokasi yang sesuai; jangan mengganti seluruh palet secara global.'),
    ...plan.challenges,
    studioTask('Refleksi dan hasil akhir', '#capstone-project, #studio-journal, dan footer', 'Ubah minimal dua komponen proyek lengkap. Tulis tiga pasangan utility/API → property/perilaku, dua hasil sebelum/sesudah, dan satu masalah yang kamu perbaiki. Simpan HTML hasil edit.', 'Jurnal menyebut perubahan nyata pada contoh awal dan proyek lengkap, semua link/kontrol tetap bekerja, dan file yang dikumpulkan memuat kode versimu sendiri.', 'Ganti isi jurnal contoh. Sertakan bukti screenshot atau catatan pengujian; jangan mengklaim data tersimpan di server.')
  ];
}
