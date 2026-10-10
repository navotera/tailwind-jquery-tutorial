// Latihan integrasi diletakkan di akhir setiap kelompok, setelah semua contoh
// terfokus dan tabel tersedia. Copy HTML untuk instruktur menghasilkan dokumen lengkap.
const guidedButton = 'rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50';
const guidedInput = 'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500';
const guidedCard = (title, text, classes = '') => `<article class="rounded-xl ${/\bbg-\S+/.test(classes) ? '' : 'bg-white'} p-5 ${classes}"><h2 class="text-xl font-semibold">${title}</h2><p class="mt-2 text-slate-600">${text}</p></article>`;
const guidedRow = (property, utility, explanation) => [property, utility, explanation];
const guidedCommonRows = [
  guidedRow('padding', 'p-5 · px-4 · py-6', 'Ruang isi kartu dan pembungkus halaman agar tulisan tidak menempel ke tepi.'),
  guidedRow('font-size / font-weight', 'text-3xl · font-bold', 'Judul utama lebih menonjol daripada isi; keputusan ini sudah dikenal di pengantar.'),
  guidedRow('background-color / color', 'bg-slate-50 · text-slate-900', 'Latar halaman yang lembut dan tulisan gelap sebagai dasar tampilan.')
];

const guidedTailwindProjects = [
  {
    title: 'Halaman pengantar kelas',
    scenario: 'Instruktur membutuhkan satu halaman sederhana untuk memperkenalkan kelas sebelum praktikum dimulai.',
    prior: ['tw-install', 'tw-hello'], focus: 'warna, ukuran huruf, padding, dan bentuk kotak',
    locate: 'Bandingkan class pada judul dengan class pada kotak tujuan. Masing-masing menjawab keputusan tampilan yang berbeda.',
    experiment: 'Ganti p-5 menjadi p-8 pada kotak tujuan saja; prediksi bagian halaman yang akan melebar sebelum Run.',
    exercise: 'Tambahkan kotak persiapan dengan palet warna berbeda dan jelaskan tiga utility yang dipakai.',
    body: '<section id="materi" class="rounded-xl bg-emerald-100 p-5"><h2 class="text-xl font-semibold">Tujuan hari ini</h2><p class="mt-2 text-emerald-900">Membaca class sebagai keputusan tampilan, lalu mencoba satu perubahan.</p></section>',
    rows: [guidedRow('border-radius', 'rounded-xl', 'Sudut kotak lebih lembut tanpa menulis selector komponen sendiri.'), guidedRow('background-color', 'bg-emerald-100', 'Kotak tujuan menjadi penekanan pertama di halaman.')]
  },
  {
    title: 'Halaman pengumuman praktikum', prior: [], focus: 'setup dokumen, heading, dan paragraf dengan utility sederhana',
    scenario: 'Sekarang halaman pengantar perlu judul, informasi waktu, dan instruksi yang mudah dibaca mahasiswa.',
    locate: 'Mulai dari h1, kemudian baca judul informasi dan paragrafnya. Perbedaan ukuran memberi urutan membaca.',
    experiment: 'Ubah text-3xl pada h1 menjadi text-4xl, lalu ubah mt-2 menjadi mt-6 pada paragraf isi.',
    exercise: 'Tambahkan pengumuman kedua, gunakan judul dan deskripsi dengan tingkat penekanan berbeda.',
    body: '<section id="materi" class="rounded-xl bg-white p-5"><h2 class="text-xl font-bold text-emerald-700">Pertemuan pertama</h2><p class="mt-2 text-slate-600">Selasa, pukul 09.00. Siapkan editor dan browser.</p><p class="mt-4">Hari ini kita mulai dari satu heading, satu paragraf, dan perubahan utility.</p></section>',
    rows: [guidedRow('color', 'text-emerald-700 · text-slate-600', 'Bedakan informasi utama dari penjelasan pendamping.'), guidedRow('margin-top', 'mt-2 · mt-4', 'Berikan jeda antara kalimat, bukan ruang di dalam teks.')]
  },
  {
    title: 'Halaman materi responsif', prior: ['tw-install', 'tw-grid-template', 'tw-grid-gap', 'tw-align'], focus: 'mobile-first dan breakpoint pada layout yang sudah dipelajari',
    scenario: 'Daftar materi perlu nyaman dibaca di ponsel maupun laptop, sekaligus bisa disimpan sebagai file HTML sendiri.',
    locate: 'Periksa script Tailwind di head. Pada daftar materi, grid-cols-1 adalah dasar dan sm:grid-cols-2 berlaku saat ruang cukup.',
    experiment: 'Ubah sm:grid-cols-2 menjadi sm:grid-cols-3 dan perkecil viewport preview. Class dasar tetap menentukan layar sempit.',
    exercise: 'Tambah satu materi, lalu ubah breakpoint menjadi md: dan bandingkan kapan susunannya berubah.',
    body: `<section id="materi" class="grid grid-cols-1 gap-4 sm:grid-cols-2">${guidedCard('Konsep dasar', 'Baca class dan ubah satu keputusan.')}${guidedCard('Praktikum', 'Bandingkan hasil pada ukuran layar berbeda.')}</section>`,
    rows: [guidedRow('grid-template-columns', 'grid-cols-1 · sm:grid-cols-2', 'Satu kolom dahulu, dua mulai 640px pada tema bawaan.'), guidedRow('gap', 'gap-4', 'Jarak antar-kartu 1rem tanpa menambah ruang di tepi luar.')]
  },
  {
    title: 'Halaman dashboard dengan layout', prior: ['tw-minmax', 'tw-padding', 'tw-utility'], focus: 'container, display, position, overflow, visibility, dan z-index',
    scenario: 'Kita membuat dashboard kelas: judul tetap terbaca, kartu punya badge di sudut, dan agenda panjang tidak memenuhi seluruh layar.',
    locate: 'Cari container mx-auto, header sticky z-20, lalu kartu relative dengan badge absolute. Panel agenda dibatasi max-h-40 dan memakai overflow-auto.',
    experiment: 'Ganti overflow-auto menjadi overflow-hidden, kemudian invisible menjadi hidden pada penanda cadangan. Bandingkan akses isi dan ruang yang tersisa.',
    exercise: 'Pindahkan badge ke kiri atas dan tambahkan agenda sampai panel perlu digulir; jangan menutup judul kartu.',
    headerClass: 'sticky top-0 z-20', mainClass: 'container mx-auto',
    body: `<section id="materi" class="relative rounded-xl bg-white p-5"><span class="absolute right-3 top-3 z-10 inline-block rounded bg-emerald-100 px-2 py-1 text-sm">Aktif</span><h2 class="pr-20 text-xl font-semibold">Agenda kelas</h2><p class="mt-2 text-slate-600">Panel berikut punya batas tinggi.</p><ul class="mt-4 max-h-40 overflow-auto rounded bg-slate-50 p-3">${['Pembukaan', 'Review HTML', 'Mengenal utility', 'Latihan layout', 'Diskusi', 'Presentasi hasil', 'Refleksi', 'Penutup'].map((item) => `<li class="block py-2">${item}</li>`).join('')}</ul><p class="mt-3">Penanda cadangan: <span class="invisible inline-block bg-amber-100 p-2">Belum tersedia</span> ruang tetap ada.</p></section>`,
    rows: [guidedRow('max-width / margin', 'container · mx-auto', 'Batasi lebar isi dan pusatkan pembungkus.'), guidedRow('position / z-index', 'sticky · top-0 · z-20', 'Header tetap di tepi atas saat halaman digulir, di depan isi.'), guidedRow('position', 'relative · absolute · right-3 · top-3', 'Badge mengacu ke kartu tanpa mendorong judul.'), guidedRow('overflow', 'max-h-40 · overflow-auto', 'Agenda dibatasi 10rem dan tetap bisa digulir.'), guidedRow('display / visibility', 'block · inline-block · invisible', 'Atur tempat elemen; invisible tetap menyisakan ruang.')]
  },
  {
    title: 'Halaman daftar kelas dengan Flexbox', prior: ['tw-container', 'tw-display', 'tw-size'], focus: 'direction, wrap, grow/shrink, dan order',
    scenario: 'Daftar kelas perlu kartu yang berpindah baris, sementara baris ringkasan punya label tetap dan deskripsi yang mengisi sisa ruang.',
    locate: 'Daftar memakai flex-col sebagai dasar dan sm:flex-row sm:flex-wrap saat lebar cukup. Di ringkasan, label shrink-0 tidak mengecil dan deskripsi grow mengambil sisa ruang.',
    experiment: 'Ganti sm:flex-wrap dengan sm:flex-nowrap. Lalu hapus grow pada ringkasan dan bandingkan pembagian ruang.',
    exercise: 'Tambah kelas keempat dan ubah urutan kartu noninteraktif dengan order. Ceritakan mengapa urutan HTML masih penting.',
    body: `<section id="materi"><div class="mb-4 flex gap-3 rounded-xl bg-emerald-100 p-5"><span class="w-20 shrink-0 font-bold">3 kelas</span><p class="grow">Pilih materi sesuai kebutuhan praktikum.</p></div><div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap">${guidedCard('HTML', 'Struktur sebelum tampilan.', 'order-1 min-w-0 flex-1 sm:basis-56')}${guidedCard('Tailwind', 'Utility untuk menyusun tampilan.', 'order-3 min-w-0 flex-1 sm:basis-56')}${guidedCard('jQuery', 'Interaksi setelah halaman siap.', 'order-2 min-w-0 flex-1 sm:basis-56')}</div></section>`,
    rows: [guidedRow('flex-direction', 'flex-col · sm:flex-row', 'Vertikal dahulu, mendatar saat ruang cukup.'), guidedRow('flex-wrap', 'sm:flex-wrap', 'Kartu boleh pindah baris mulai breakpoint sm.'), guidedRow('flex-grow / flex-shrink', 'grow · shrink-0 · flex-1', 'Label tetap utuh, deskripsi/kartu membagi ruang.'), guidedRow('order', 'order-1 · order-2 · order-3', 'Urutan visual kartu berbeda dari HTML; contoh tidak berisi kontrol fokus.')]
  },
  {
    title: 'Halaman katalog dengan Grid', prior: ['tw-flex-direction', 'tw-flex-wrap', 'tw-container'], focus: 'template, span, auto flow, dan gap',
    scenario: 'Katalog punya satu materi unggulan dan beberapa kartu biasa. Grid membantu memberi area lebih besar tanpa menghitung posisi manual.',
    locate: 'Daftar memakai grid-flow-row dan sm:grid-cols-3. Kartu unggulan memakai sm:col-span-2 sm:row-span-2; toolbar kembali memakai flex dari poin sebelumnya.',
    experiment: 'Ubah sm:col-span-2 menjadi sm:col-span-1, lalu bandingkan gap-x-6 dan gap-y-3.',
    exercise: 'Tambah dua kartu dan amati auto placement. Tentukan kartu yang layak mendapat span lebih besar.',
    body: `<section id="materi"><div class="mb-4 flex flex-wrap gap-3"><span class="rounded bg-emerald-100 px-3 py-2">Semua materi</span><span class="rounded bg-white px-3 py-2">Katalog kelas</span></div><div class="grid grid-flow-row grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-3">${guidedCard('Proyek unggulan', 'Menggabungkan layout, flex, dan grid.', 'sm:col-span-2 sm:row-span-2 bg-emerald-100')}${guidedCard('Materi A', 'Satu area grid.')}${guidedCard('Materi B', 'Berikutnya diisi per baris.')}${guidedCard('Materi C', 'Ukuran mengikuti track.')}</div></section>`,
    rows: [guidedRow('grid-template-columns', 'grid-cols-1 · sm:grid-cols-3', 'Mulai satu kolom dan bertambah saat lebar cukup.'), guidedRow('grid-column / grid-row', 'sm:col-span-2 · sm:row-span-2', 'Materi unggulan menempati dua kolom dan dua baris.'), guidedRow('grid-auto-flow', 'grid-flow-row', 'Kartu berikutnya ditempatkan per baris.'), guidedRow('column-gap / row-gap', 'gap-x-6 · gap-y-3', 'Jarak mendatar 1.5rem dan vertikal 0.75rem.')]
  },
  {
    title: 'Halaman ringkasan yang sejajar', prior: ['tw-grid-template', 'tw-flex-direction'], focus: 'justify, align, place, dan self',
    scenario: 'Ringkasan kelas perlu angka sejajar, header dengan informasi di kedua sisi, dan pesan kosong tepat di tengah panel.',
    locate: 'Baris statistik memakai justify-between items-center. Pesan kosong memakai grid place-items-center, dan satu catatan memakai self-end.',
    experiment: 'Ubah items-center menjadi items-start, kemudian place-items-center menjadi place-items-start pada panel kosong.',
    exercise: 'Tambah statistik ketiga dengan tinggi isi berbeda dan jelaskan sumbu yang diatur justify dibanding items.',
    body: '<section id="materi" class="grid gap-4 sm:grid-cols-2"><article class="rounded-xl bg-white p-5"><h2 class="text-xl font-semibold">Ringkasan</h2><div class="mt-4 flex min-h-24 items-center justify-between gap-3"><p class="text-3xl font-bold">24 <span class="block text-sm font-normal">peserta</span></p><p class="self-end text-sm text-slate-600">3 kelompok</p></div></article><article class="grid min-h-48 place-items-center rounded-xl bg-emerald-100 p-5"><p class="text-center">Belum ada tugas.<br>Diskusi dimulai sebentar lagi.</p></article></section>',
    rows: [guidedRow('justify-content', 'justify-between', 'Dua item didorong ke ujung sumbu utama flex.'), guidedRow('align-items / align-self', 'items-center · self-end', 'Semua anak di tengah, satu catatan di ujung sumbu silang.'), guidedRow('align-items / justify-items', 'place-items-center', 'Pesan dipusatkan di dua sumbu area grid.')]
  },
  {
    title: 'Halaman profil dengan ruang yang nyaman', prior: ['tw-hello', 'tw-utility'], focus: 'padding, margin, space, width/height, dan min/max',
    scenario: 'Halaman profil perlu kartu yang tidak terlalu lebar, jarak isi yang nyaman, serta catatan panjang yang tetap bisa dibaca.',
    locate: 'Pembungkus memakai w-full max-w-2xl mx-auto. Padding ada di dalam kartu, mt-6 di luar kartu, space-y-3 antaranak daftar, dan max-h-32 membatasi catatan.',
    experiment: 'Naikkan p-5 menjadi p-8 tanpa mengubah mt-6, lalu bandingkan max-w-2xl dengan max-w-lg.',
    exercise: 'Tambah satu panel kontak dan atur jarak luarnya tanpa mengubah ruang di dalam panel.',
    mainClass: 'w-full max-w-2xl mx-auto',
    body: '<section id="materi"><article class="min-h-32 rounded-xl bg-white p-5"><h2 class="text-xl font-semibold">Profil peserta</h2><ul class="mt-4 space-y-3"><li>Nama: Ayu</li><li>Kelas: Praktikum Web</li><li>Minat: antarmuka yang mudah dipakai</li></ul></article><article class="mt-6 rounded-xl bg-white p-5"><h2 class="text-xl font-semibold">Catatan kelas</h2><div class="mt-3 max-h-32 overflow-auto"><p class="h-48">Kita belajar membedakan ruang di dalam, di luar, dan antara elemen. Scroll panel ini untuk melihat batas tinggi.</p></div></article></section>',
    rows: [guidedRow('width / max-width', 'w-full · max-w-2xl', 'Isi memenuhi ruang hingga batas 42rem.'), guidedRow('margin-top', 'mt-6', 'Jarak 1.5rem di luar panel kedua.'), guidedRow('margin antar-anak', 'space-y-3', 'Jarak seragam antara item daftar.'), guidedRow('min-height / max-height', 'min-h-32 · max-h-32', 'Tinggi minimum kartu berbeda dari batas tinggi panel.')]
  },
  {
    title: 'Halaman artikel yang mudah dibaca', prior: ['tw-minmax', 'tw-padding'], focus: 'font, line height, perataan, warna, dan dekorasi teks',
    scenario: 'Materi panjang membutuhkan hierarki judul, paragraf yang lega, dan contoh kode dengan keluarga font berbeda.',
    locate: 'Artikel memakai font-serif leading-relaxed, label uppercase tracking-wide, dan potongan kode font-mono. Lebar baca tetap memakai max-w-2xl.',
    experiment: 'Ganti leading-relaxed menjadi leading-tight pada paragraf beberapa baris, lalu bandingkan font-serif dengan font-sans.',
    exercise: 'Tulis dua paragraf penjelasan sendiri, beri satu subjudul, dan pertahankan perbedaan teks utama dengan catatan.',
    mainClass: 'max-w-2xl mx-auto',
    body: '<article id="materi" class="rounded-xl bg-white p-5"><p class="text-sm uppercase tracking-wide text-emerald-700">Catatan praktikum</p><h2 class="mt-2 text-center text-2xl font-semibold">Mengapa utility mudah dicoba?</h2><p class="mt-4 font-serif leading-relaxed">Kita tidak perlu mengubah banyak aturan sekaligus. Pilih satu class, ubah nilainya, lalu lihat bagian halaman yang berubah. Lebar baca dan jarak antarbaris membantu kita mengikuti penjelasan ini tanpa kehilangan baris berikutnya.</p><p class="mt-4 font-mono text-sm">padding: 1rem → p-4</p><a href="#ringkasan" class="mt-4 inline-block text-emerald-700 underline">Baca ringkasan</a><p id="ringkasan" class="mt-4 text-sm italic text-slate-600">Baca, prediksi, ubah, bandingkan.</p></article>',
    rows: [guidedRow('font-family / line-height', 'font-serif · font-mono · leading-relaxed', 'Pisahkan teks bacaan dari kode dan beri jarak baris lega.'), guidedRow('text-transform / letter-spacing', 'uppercase · tracking-wide', 'Label kecil menjadi penanda, bukan judul utama.'), guidedRow('text-align / text-decoration', 'text-center · underline', 'Judul di tengah; link tetap dikenali sebagai navigasi.')]
  },
  {
    title: 'Halaman promosi kelas dengan background', prior: ['tw-font', 'tw-text', 'tw-size'], focus: 'warna, gradient, gambar latar, posisi, pengulangan, dan ukuran',
    scenario: 'Banner kelas harus menarik, tetapi informasi waktu dan judul tetap harus terbaca di atas latar dekoratif.',
    locate: 'Banner memakai gradient from/via/to. Panel jadwal memakai CSS pola lokal, bg-repeat dan ukuran ubin, sedangkan panel kedua memakai bg-cover bg-center bg-no-repeat.',
    experiment: 'Ganti bg-gradient-to-r menjadi bg-gradient-to-b, lalu ubah ukuran pola dari 24px ke 48px.',
    exercise: 'Buat palet baru dengan teks tetap kontras dan jelaskan kapan background dekoratif berbeda dari gambar bermakna.',
    body: '<section id="materi"><article class="rounded-xl bg-gradient-to-r from-emerald-800 via-teal-700 to-blue-800 p-6 text-white"><h2 class="text-2xl font-bold">Belajar lewat praktik</h2><p class="mt-2 leading-relaxed">Satu halaman, banyak keputusan kecil.</p></article><div class="mt-4 grid gap-4 sm:grid-cols-2"><article class="guided-pattern rounded-xl bg-white bg-[length:24px_24px] bg-repeat p-5"><h2 class="bg-white p-2 font-semibold">Jadwal: Selasa, 09.00</h2></article><article class="guided-pattern rounded-xl bg-cover bg-center bg-no-repeat p-5"><h2 class="bg-white p-2 font-semibold">Pola yang diperbesar</h2></article></div></section>',
    css: '.guided-pattern { background-image: radial-gradient(circle, #a7f3d0 3px, transparent 4px); }',
    rows: [guidedRow('background-image / gradient stops', 'bg-gradient-to-r · from-emerald-800 · via-teal-700 · to-blue-800', 'Gradasi mendatar dengan tiga warna.'), guidedRow('background-repeat / background-size', 'bg-repeat · bg-[length:24px_24px]', 'Pola dekoratif berulang dengan ukuran ubin yang jelas.'), guidedRow('background-position / background-size', 'bg-center · bg-cover · bg-no-repeat', 'Panel pembanding memakai posisi tengah tanpa pengulangan.')]
  },
  {
    title: 'Halaman paket kelas dengan border', prior: ['tw-gradient', 'tw-font', 'tw-padding'], focus: 'radius, garis, divide, dan ring',
    scenario: 'Dua paket kelas perlu batas visual, dan paket rekomendasi perlu ditandai tanpa membuat semua kartu sama kuat.',
    locate: 'Kartu biasa memakai border-dashed, rekomendasi border-emerald-600 ring-2. Divide-y memberi pemisah antarfasilitas dalam kartu.',
    experiment: 'Ubah border-dashed menjadi border-solid, lalu hapus ring-2 pada kartu rekomendasi dan bandingkan penekanannya.',
    exercise: 'Tambah paket ketiga dan pilih tepat satu paket rekomendasi agar hierarki tetap jelas.',
    body: '<section id="materi" class="grid gap-5 sm:grid-cols-2"><article class="rounded-xl border-2 border-dashed border-slate-300 bg-white p-5"><h2 class="text-xl font-semibold">Mandiri</h2><ul class="mt-4 divide-y divide-slate-200"><li class="py-3">Materi dasar</li><li class="py-3">Latihan sendiri</li></ul></article><article class="rounded-xl border-2 border-emerald-600 bg-white p-5 ring-2 ring-emerald-200 ring-offset-2"><h2 class="text-xl font-semibold">Dengan pendamping</h2><p class="mt-2 text-emerald-700">Rekomendasi</p><ul class="mt-4 divide-y divide-slate-200"><li class="py-3">Materi dan diskusi</li><li class="py-3">Review hasil latihan</li></ul></article></section>',
    rows: [guidedRow('border-width / border-style', 'border-2 · border-dashed', 'Batas 2px dengan garis putus-putus.'), guidedRow('border-color / border-radius', 'border-emerald-600 · rounded-xl', 'Batas paket rekomendasi dan sudut kartu.'), guidedRow('border antar-anak', 'divide-y · divide-slate-200', 'Pemisah hanya di antara item fasilitas.'), guidedRow('box-shadow (ring)', 'ring-2 · ring-emerald-200 · ring-offset-2', 'Penekanan tambahan di luar border tanpa mengubah ruang isi.')]
  },
  {
    title: 'Halaman galeri dengan efek visual', prior: ['tw-radius', 'tw-grid-template', 'tw-gradient'], focus: 'shadow, opacity, dan filter',
    scenario: 'Galeri materi memperlihatkan pilihan normal, pratinjau redup, dan dekorasi yang diberi filter. Filter tidak boleh membuat tulisan ikut sulit dibaca.',
    locate: 'Shadow ada pada kartu. Grayscale/brightness hanya pada dekorasi berwarna, bukan seluruh artikel; opacity-60 menandai kartu pratinjau dengan tulisan jelas.',
    experiment: 'Ganti grayscale menjadi saturate-150 pada dekorasi dan shadow-md menjadi shadow-xl pada kartu pertama.',
    exercise: 'Tambah kartu dengan hue-rotate-90 hanya pada dekorasi; jelaskan mengapa paragraf tidak diberi blur.',
    body: '<section id="materi" class="grid gap-5 sm:grid-cols-2"><article class="rounded-xl bg-white p-5 shadow-md"><div aria-hidden="true" class="h-24 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 grayscale brightness-110"></div><h2 class="mt-4 text-xl font-semibold">Materi tersedia</h2><p class="mt-2 text-slate-600">Filter hanya pada dekorasi.</p></article><article class="rounded-xl bg-white p-5 opacity-60 shadow-sm"><div aria-hidden="true" class="h-24 rounded-lg bg-gradient-to-r from-violet-500 to-amber-400 contrast-125"></div><h2 class="mt-4 text-xl font-semibold">Pratinjau berikutnya</h2><p class="mt-2">Status disebutkan lewat teks, tidak hanya transparansi.</p></article></section>',
    rows: [guidedRow('box-shadow', 'shadow-md · shadow-sm', 'Kartu mendapat kedalaman yang berbeda.'), guidedRow('opacity', 'opacity-60', 'Seluruh kartu pratinjau termasuk tulisannya diredupkan.'), guidedRow('filter', 'grayscale · brightness-110 · contrast-125', 'Ubah dekorasi saja, bukan teks informasi.')]
  },
  {
    title: 'Halaman jadwal dengan tabel', prior: ['tw-grid-template', 'tw-padding', 'tw-divide-ring'], focus: 'table layout, border collapse, dan scroll',
    scenario: 'Jadwal membutuhkan hubungan baris dan kolom yang jelas, bukan kartu terpisah. Pada layar kecil, tabel tetap harus bisa dibaca.',
    locate: 'Pembungkus overflow-auto menjaga akses ke kolom. Tabel memakai table-fixed border-collapse, caption, th scope, dan lebar minimum.',
    experiment: 'Ubah table-fixed menjadi table-auto dan perpanjang nama materi. Amati pembagian lebar kolom.',
    exercise: 'Tambahkan baris jadwal dan satu kolom ruangan dengan header scope=col, lalu uji layar sempit.',
    body: '<section id="materi" class="rounded-xl bg-white p-5"><h2 class="text-xl font-semibold">Jadwal minggu ini</h2><div class="mt-4 overflow-auto"><table class="w-full min-w-[480px] table-fixed border-collapse text-left"><caption class="mb-3 text-left text-slate-600">Pertemuan praktikum web</caption><thead><tr><th scope="col" class="border border-slate-300 p-3">Hari</th><th scope="col" class="border border-slate-300 p-3">Materi</th><th scope="col" class="border border-slate-300 p-3">Waktu</th></tr></thead><tbody><tr><th scope="row" class="border border-slate-300 p-3 font-normal">Selasa</th><td class="border border-slate-300 p-3">Layout</td><td class="border border-slate-300 p-3">09.00</td></tr><tr class="bg-emerald-50"><th scope="row" class="border border-slate-300 p-3 font-normal">Kamis</th><td class="border border-slate-300 p-3">Interaksi</td><td class="border border-slate-300 p-3">10.00</td></tr></tbody></table></div></section>',
    rows: [guidedRow('table-layout', 'table-fixed', 'Pembagian kolom mengikuti layout tetap; bandingkan dengan table-auto.'), guidedRow('border-collapse', 'border-collapse', 'Border sel bertemu sebagai garis tunggal.'), guidedRow('overflow / min-width', 'overflow-auto · min-w-[480px]', 'Tabel tetap mempunyai ruang dan bisa digulir pada layar sempit.')]
  },
  {
    title: 'Halaman pilihan materi dengan transisi', prior: ['tw-shadow', 'tw-grid-template', 'tw-utility'], focus: 'transition, duration, easing, dan animation',
    scenario: 'Kartu dan tombol perlu umpan balik halus ketika diarahkan pointer atau mendapat fokus, tanpa membuat pengguna menunggu animasi panjang.',
    locate: 'Kartu memakai transition-shadow duration-300 ease-out, link memakai transition-colors. Penanda demo animate-pulse hanya dekoratif dan dihentikan untuk reduced motion.',
    experiment: 'Ganti duration-300 menjadi duration-1000 dan bandingkan rasa respons; gunakan Tab untuk melihat fokus link.',
    exercise: 'Tambahkan kartu kedua dengan transisi warna saja dan pertahankan motion-reduce pada efek yang bergerak.',
    body: '<section id="materi" class="grid gap-4 sm:grid-cols-2"><article class="rounded-xl bg-white p-5 shadow-sm transition-shadow duration-300 ease-out hover:shadow-xl motion-reduce:transition-none"><h2 class="text-xl font-semibold">Latihan interaktif</h2><p class="mt-2 text-slate-600">Arahkan pointer untuk melihat perubahan bayangan.</p><a href="#petunjuk" class="mt-4 inline-block rounded bg-emerald-700 px-4 py-2 text-white transition-colors duration-200 hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none">Baca petunjuk</a></article><article id="petunjuk" class="rounded-xl bg-emerald-100 p-5"><span aria-hidden="true" class="inline-block h-3 w-3 animate-pulse rounded-full bg-emerald-700 motion-reduce:animate-none"></span><h2 class="mt-2 text-xl font-semibold">Penanda animasi demo</h2><p class="mt-2">Tidak ada proses sungguhan yang sedang dimuat.</p></article></section>',
    rows: [guidedRow('transition-property / duration / timing', 'transition-shadow · duration-300 · ease-out', 'Bayangan berubah selama 300ms, bukan seluruh property.'), guidedRow('transition-property', 'transition-colors', 'Link hanya menganimasikan perubahan warna.'), guidedRow('animation', 'animate-pulse · motion-reduce:animate-none', 'Penanda demo berdenyut kecuali pengguna meminta pengurangan gerak.')]
  },
  {
    title: 'Halaman poster dengan transform', prior: ['tw-transitions', 'tw-gradient', 'tw-grid-template'], focus: 'scale, rotate, translate, dan origin',
    scenario: 'Poster kelas perlu sedikit penekanan ketika diarahkan pointer, tetapi posisi elemen lain tidak boleh ikut bergeser.',
    locate: 'Poster memakai origin-bottom-left, hover:rotate-2, hover:scale-105, dan hover:-translate-y-1. Ruang p-8 disediakan agar hasil transform tidak menabrak tepi.',
    experiment: 'Ganti origin-bottom-left menjadi origin-top-right dan bandingkan titik putarnya, lalu matikan scale.',
    exercise: 'Tambah poster pembanding dengan poros berbeda; uji tanpa gerak melalui motion-reduce:transform-none.',
    body: '<section id="materi" class="grid gap-6 p-8 sm:grid-cols-2"><article class="origin-bottom-left rounded-xl bg-gradient-to-br from-emerald-700 to-blue-800 p-5 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:rotate-2 hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"><h2 class="text-2xl font-bold">Workshop Web</h2><p class="mt-3">Arahkan pointer untuk melihat transform.</p></article><article class="rounded-xl bg-white p-5"><h2 class="text-xl font-semibold">Catatan</h2><p class="mt-2 leading-relaxed">Transform mengubah tampilan poster tanpa mengubah ruang asalnya dalam layout.</p></article></section>',
    rows: [guidedRow('transform-origin', 'origin-bottom-left', 'Poros poster berada di kiri bawah.'), guidedRow('transform pada :hover', 'hover:rotate-2 · hover:scale-105 · hover:-translate-y-1', 'Putar, perbesar, dan naikkan poster; ruang layout asal tetap.'), guidedRow('transform pada reduced motion', 'motion-reduce:transform-none', 'Hilangkan transform ketika pengguna meminta pengurangan gerak.')]
  },
  {
    title: 'Halaman catatan dengan interaksi dasar', prior: ['tw-transitions', 'tw-padding', 'tw-container'], focus: 'cursor, outline, pointer events, resize, dan select',
    scenario: 'Peserta membutuhkan area catatan yang bisa diperbesar dan tombol yang tetap menerima klik meski ada lapisan dekoratif di atasnya.',
    locate: 'Textarea memakai resize-y select-text. Lapisan dekoratif pointer-events-none tidak menangkap klik, tombol memakai cursor-pointer dan focus-visible:outline.',
    experiment: 'Ganti pointer-events-none dengan pointer-events-auto dan klik tombol melalui lapisan. Lalu bandingkan resize-y dengan resize-none.',
    exercise: 'Perbesar outline fokus dan ubah tinggi awal textarea tanpa membatasi seleksi catatan pengguna.',
    body: `<section id="materi" class="max-w-xl rounded-xl bg-white p-5"><label for="classNote" class="block font-semibold">Catatan praktikum</label><textarea id="classNote" rows="4" class="${guidedInput} resize-y select-text" placeholder="Tulis bagian yang ingin ditanyakan"></textarea><div class="relative mt-4 inline-block"><button id="noteAction" type="button" class="${guidedButton} cursor-pointer select-none">Tandai sudah dibaca</button><span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-lg bg-white/10"></span></div><p id="noteStatus" class="mt-3 text-slate-600" role="status">Belum ditandai.</p></section>`,
    js: 'document.querySelector("#noteAction").addEventListener("click", function () {\n  document.querySelector("#noteStatus").textContent = "Catatan ditandai sudah dibaca; tidak disimpan ke server.";\n});',
    rows: [guidedRow('resize / user-select', 'resize-y · select-text · select-none', 'Catatan bisa diperpanjang dan diseleksi; hanya label tombol yang tidak terseleksi.'), guidedRow('pointer-events', 'pointer-events-none', 'Lapisan dekoratif tidak mengambil target klik dari tombol.'), guidedRow('cursor / outline', 'cursor-pointer · focus-visible:outline-2', 'Pointer dan penanda fokus membantu menemukan kontrol.')]
  },
  {
    title: 'Halaman pendaftaran peserta', prior: ['tw-grid-template', 'tw-text', 'tw-outline'], focus: 'label, input, textarea, pilihan, dan validasi form',
    scenario: 'Form pendaftaran menyatukan kolom nama, email, kelas, pilihan sesi, dan persetujuan dengan pesan yang dapat diperbaiki.',
    locate: 'Label cocok dengan id. Radio berbagi name, checkbox required menandakan persetujuan. Handler menahan submit dan memanggil reportValidity sebelum menulis ringkasan.',
    experiment: 'Kirim form kosong, isi nama/email, lalu coba tanpa persetujuan. Perhatikan kontrol yang perlu diperbaiki sebelum ringkasan muncul.',
    exercise: 'Tambahkan kolom nomor peserta readonly dan jelaskan bedanya dengan disabled; demo tetap tidak mengirim data.',
    body: `<section id="materi" class="rounded-xl bg-white p-5"><form id="registration" class="grid gap-4 sm:grid-cols-2"><div><label for="fullName" class="block font-semibold">Nama</label><input id="fullName" name="name" autocomplete="name" required class="${guidedInput}"></div><div><label for="regEmail" class="block font-semibold">Email</label><input id="regEmail" name="email" type="email" autocomplete="email" required class="${guidedInput}"></div><div><label for="regClass" class="block font-semibold">Kelas</label><select id="regClass" name="class" class="${guidedInput}"><option>Web A</option><option>Web B</option></select></div><fieldset><legend class="font-semibold">Sesi</legend><label class="mt-2 block"><input type="radio" name="session" value="pagi" checked class="accent-emerald-600"> Pagi</label><label class="mt-2 block"><input type="radio" name="session" value="siang" class="accent-emerald-600"> Siang</label></fieldset><div class="sm:col-span-2"><label for="regNote" class="block font-semibold">Pertanyaan (opsional)</label><textarea id="regNote" name="note" rows="3" class="${guidedInput} resize-y"></textarea></div><label class="sm:col-span-2"><input id="consent" name="consent" type="checkbox" required class="accent-emerald-600"> Saya siap mengikuti praktikum</label><button type="submit" class="${guidedButton} sm:col-span-2">Periksa pendaftaran</button></form><p id="registrationStatus" class="mt-4" role="status">Data hanya diperiksa di browser.</p></section>`,
    js: 'document.querySelector("#registration").addEventListener("submit", function (event) {\n  event.preventDefault();\n  if (!this.reportValidity()) return;\n  const name = document.querySelector("#fullName").value.trim();\n  document.querySelector("#registrationStatus").textContent = "Terima kasih, " + name + ". Form valid; data tidak dikirim.";\n});',
    rows: [guidedRow('grid-template-columns / grid-column', 'sm:grid-cols-2 · sm:col-span-2', 'Kolom singkat berdampingan; pertanyaan dan tombol memenuhi baris.'), guidedRow('border / focus ring', 'border-slate-300 · focus:ring-2', 'Kolom dan fokus mudah ditemukan.'), guidedRow('accent-color', 'accent-emerald-600', 'Kontrol pilihan native tetap dikenali saat dipilih.')]
  },
  {
    title: 'Halaman pengaturan dengan button state', prior: ['tw-form-input', 'tw-form-state', 'tw-transitions'], focus: 'varian tombol, toggle, disabled, dan loading',
    scenario: 'Pengaturan kelas punya pilihan pengingat dan tombol simpan. Pengguna perlu melihat pilihan aktif serta alasan tombol tidak bisa diklik selama simulasi.',
    locate: 'Toggle mengubah aria-pressed. Simpan mengubah disabled dan aria-busy sebelum timer mengaktifkannya kembali; tombol Batal hanya navigasi ke ringkasan.',
    experiment: 'Klik toggle dua kali, lalu tekan Simpan beberapa kali saat loading. Perhatikan label dan keadaan tombol.',
    exercise: 'Tambahkan tombol secondary yang mengembalikan toggle ke false dan perbarui pesan statusnya.',
    body: `<section id="materi" class="max-w-xl rounded-xl bg-white p-5"><h2 class="text-xl font-semibold">Pengaturan kelas</h2><label for="settingName" class="mt-4 block font-semibold">Nama tampilan</label><input id="settingName" value="Praktikum Web" class="${guidedInput}"><button id="reminder" type="button" aria-pressed="false" class="mt-4 rounded-lg border border-emerald-700 px-4 py-2 aria-pressed:bg-emerald-700 aria-pressed:text-white focus-visible:outline focus-visible:outline-2">Pengingat nonaktif</button><div class="mt-5 flex flex-wrap gap-3"><button id="saveSettings" type="button" class="${guidedButton} disabled:cursor-not-allowed">Simpan (simulasi)</button><a href="#settingsStatus" class="rounded-lg border border-slate-300 px-4 py-2 focus-visible:outline focus-visible:outline-2">Baca status</a></div><p id="settingsStatus" class="mt-4" role="status">Belum ada proses; tidak ada data tersimpan.</p></section>`,
    js: 'const reminder = document.querySelector("#reminder");\nreminder.addEventListener("click", function () {\n  const pressed = this.getAttribute("aria-pressed") !== "true";\n  this.setAttribute("aria-pressed", String(pressed));\n  this.textContent = pressed ? "Pengingat aktif" : "Pengingat nonaktif";\n});\nconst save = document.querySelector("#saveSettings");\nsave.addEventListener("click", function () {\n  this.disabled = true;\n  this.setAttribute("aria-busy", "true");\n  this.textContent = "Memproses…";\n  document.querySelector("#settingsStatus").textContent = "Simulasi sedang berjalan.";\n  setTimeout(function () {\n    save.disabled = false;\n    save.setAttribute("aria-busy", "false");\n    save.textContent = "Simpan (simulasi)";\n    document.querySelector("#settingsStatus").textContent = "Simulasi selesai; data tidak disimpan.";\n  }, 800);\n});',
    rows: [guidedRow('color / background saat toggle', 'aria-pressed:bg-emerald-700 · aria-pressed:text-white', 'Tampilan mengikuti aria-pressed yang diubah handler.'), guidedRow('opacity / cursor saat disabled', 'disabled:opacity-50 · disabled:cursor-not-allowed', 'Tampilan loading mengikuti keadaan disabled sebenarnya.'), guidedRow('border', 'border-slate-300 · border-emerald-700', 'Varian secondary/toggle dibedakan dari aksi utama.')]
  },
  {
    title: 'Halaman portal kelas lengkap', prior: ['tw-form-input', 'tw-button-state', 'tw-grid-template', 'tw-tables'], focus: 'card, navbar, breadcrumb, alert, badge, daftar, dan accordion',
    scenario: 'Portal kelas menyatukan navigasi, status kelas, kartu ringkasan, serta FAQ. Komponen terpisah sekarang punya konteks dalam satu halaman.',
    locate: 'Navbar punya menu mobile dengan aria-expanded. Alert bisa ditutup dan mengembalikan fokus ke tombol buka; FAQ memakai details/summary tanpa handler.',
    experiment: 'Buka menu pada layar kecil, tutup lalu buka alert, dan buka dua FAQ. Cocokkan perubahan tampilan dengan atribut statusnya.',
    exercise: 'Tambah kartu jadwal berisi tabel dari poin 13 dan satu FAQ baru, tanpa mengubah perilaku menu dan fokus alert.',
    body: `<section id="materi"><nav aria-label="Menu portal" class="rounded-xl bg-white p-4"><button id="portalMenu" type="button" aria-expanded="false" aria-controls="portalLinks" class="${guidedButton} sm:hidden">Menu kelas</button><div id="portalLinks" class="hidden gap-4 sm:flex"><a href="#portalCards" class="block py-2 underline">Ringkasan</a><a href="#portalFaq" class="block py-2 underline">FAQ</a></div></nav><nav aria-label="Breadcrumb" class="mt-4 text-sm"><a href="#materi" class="underline">Portal</a> / <span aria-current="page">Ringkasan kelas</span></nav><button id="portalShow" type="button" class="mt-4 underline focus-visible:outline focus-visible:outline-2">Tampilkan pengumuman</button><div id="portalAlert" class="mt-3 flex items-start justify-between gap-3 rounded-lg bg-emerald-100 p-4"><p id="portalMessage" role="status">Diskusi dimulai pukul 09.00.</p><button id="portalClose" type="button" aria-label="Tutup pengumuman" class="font-semibold focus-visible:outline focus-visible:outline-2">×</button></div><div id="portalCards" class="mt-5 grid gap-4 sm:grid-cols-2">${guidedCard('Praktikum Web', '<span class="rounded-full bg-emerald-100 px-2 py-1 text-sm text-emerald-800">Aktif</span><span class="mt-3 block">24 peserta, tiga kelompok diskusi.</span>', 'border border-slate-200 shadow-sm')}${guidedCard('Persiapan', 'Editor, browser, dan catatan sudah siap.', 'border border-slate-200 shadow-sm')}</div><section id="portalFaq" class="mt-5 rounded-xl bg-white p-5"><h2 class="text-xl font-semibold">Pertanyaan umum</h2><details class="mt-4 rounded-lg border open:bg-emerald-50"><summary class="cursor-pointer p-3 font-semibold">Bagaimana memulai latihan?</summary><p class="px-3 pb-3">Baca materi, Run contoh, lalu ubah satu hal.</p></details><details class="mt-3 rounded-lg border open:bg-emerald-50"><summary class="cursor-pointer p-3 font-semibold">Apa yang perlu disiapkan?</summary><ul class="list-disc space-y-2 px-8 pb-3"><li>Editor kode</li><li>Browser</li><li>Catatan pertanyaan</li></ul></details></section></section>`,
    js: 'const portalLinks = document.querySelector("#portalLinks");\ndocument.querySelector("#portalMenu").addEventListener("click", function () {\n  const open = this.getAttribute("aria-expanded") !== "true";\n  this.setAttribute("aria-expanded", String(open));\n  portalLinks.classList.toggle("hidden", !open);\n});\ndocument.querySelector("#portalClose").addEventListener("click", function () {\n  document.querySelector("#portalAlert").hidden = true;\n  document.querySelector("#portalShow").focus();\n});\ndocument.querySelector("#portalShow").addEventListener("click", function () {\n  document.querySelector("#portalAlert").hidden = false;\n  document.querySelector("#portalMessage").textContent = "Pengumuman dibuka kembali: diskusi pukul 09.00.";\n});',
    rows: [guidedRow('display pada breakpoint', 'hidden · sm:flex · sm:hidden', 'Menu mobile dan link desktop membagi peran.'), guidedRow('border / box-shadow', 'border-slate-200 · shadow-sm', 'Card ringkasan terpisah dari latar halaman.'), guidedRow('border-radius / background-color', 'rounded-full · bg-emerald-100', 'Badge dan alert punya konteks status yang juga disebutkan lewat teks.'), guidedRow('background saat details terbuka', 'open:bg-emerald-50', 'FAQ mengikuti atribut open native.')]
  }
];

const guidedJqueryProjects = [
  {
    title: 'Halaman sambutan interaktif', prior: ['tw-hello'], focus: 'setup, DOM ready, selector ID, event, dan text',
    scenario: 'Halaman sambutan yang sudah ditata Tailwind sekarang perlu merespons tombol tanpa berpindah halaman.',
    locate: 'JQuery dimuat sebelum script kita. Callback DOM ready memasang handler klik; text mengganti pesan pada elemen yang dipilih lewat ID.',
    experiment: 'Ubah pesan pada text, Run, lalu klik tombol. Pesan tidak berubah hanya karena handler dipasang.',
    exercise: 'Tambah tombol kedua dengan ID berbeda yang mengembalikan salam ke keadaan awal.',
    body: `<section id="materi" class="rounded-xl bg-white p-5"><h2 class="text-xl font-semibold">Selamat datang</h2><button id="greet" type="button" class="mt-4 ${guidedButton}">Mulai praktikum</button><p id="greeting" class="mt-4" role="status">Tekan tombol untuk memulai.</p></section>`,
    js: '$(function () {\n  $("#greet").on("click", function () {\n    $("#greeting").text("Halo! Sekarang kita belajar halaman yang merespons pengguna.");\n  });\n});'
  },
  {
    title: 'Halaman pemilih kelas', prior: ['jq-intro', 'jq-setup'], focus: 'selector ID/class, click, input, dan this',
    scenario: 'Peserta mengetik nama dan memilih kelas. Satu pesan ringkasan berubah mengikuti tindakan mereka.',
    locate: 'Input nama memakai selector ID. Tombol kelas berbagi class .class-choice dan handler membaca teks tombol melalui this.',
    experiment: 'Ketik perlahan, lalu pilih dua kelas bergantian. Amati event input berbeda dari click.',
    exercise: 'Tambah kelas ketiga dengan class yang sama tanpa menulis handler baru.',
    body: `<section id="materi" class="rounded-xl bg-white p-5"><label for="participant" class="block font-semibold">Nama peserta</label><input id="participant" class="${guidedInput}"><p id="nameSummary" class="mt-3" role="status">Nama belum diisi.</p><div class="mt-4 flex flex-wrap gap-3"><button type="button" class="class-choice ${guidedButton}">Web A</button><button type="button" class="class-choice ${guidedButton}">Web B</button></div><p id="classSummary" class="mt-3" role="status">Kelas belum dipilih.</p></section>`,
    js: '$(function () {\n  $("#participant").on("input", function () {\n    $("#nameSummary").text("Nama: " + $(this).val());\n  });\n  $(".class-choice").on("click", function () {\n    $("#classSummary").text("Pilihan kelas: " + $(this).text());\n  });\n});'
  },
  {
    title: 'Halaman daftar tugas dinamis', prior: ['jq-selectors', 'jq-events'], focus: 'append, prepend, remove, dan delegasi event',
    scenario: 'Instruktur menambah tugas dan menghapus tugas selesai. Item baru harus langsung bekerja tanpa memasang handler satu per satu.',
    locate: 'Submit menahan perpindahan halaman. Elemen dibuat lalu diberi text, append/prepend menentukan posisi, dan klik tombol Hapus ditangani pembungkus daftar.',
    experiment: 'Tambahkan tugas normal lalu prioritas. Hapus item yang baru dibuat dan lihat bahwa delegasi tetap bekerja.',
    exercise: 'Tambahkan pesan jumlah tugas setelah penambahan dan penghapusan; jangan memasukkan input pengguna lewat html.',
    body: `<section id="materi" class="rounded-xl bg-white p-5"><form id="taskForm"><label for="taskText" class="block font-semibold">Tugas baru</label><input id="taskText" required class="${guidedInput}"><label class="mt-3 block"><input id="priority" type="checkbox" class="accent-emerald-600"> Tambah di awal sebagai prioritas</label><button type="submit" class="mt-3 ${guidedButton}">Tambah tugas</button></form><ul id="tasks" class="mt-5 space-y-3"></ul><p id="taskMessage" class="mt-3" role="status">Belum ada tugas.</p></section>`,
    js: '$(function () {\n  $("#taskForm").on("submit", function (event) {\n    event.preventDefault();\n    const value = $("#taskText").val().trim();\n    if (!value) return;\n    const item = $("<li>").addClass("flex items-center gap-3 rounded bg-slate-100 p-3");\n    item.append($("<span>").addClass("grow").text(value));\n    item.append($("<button>").attr({ type: "button", "aria-label": "Hapus tugas: " + value }).addClass("remove-task underline").text("Hapus"));\n    if ($("#priority").prop("checked")) $("#tasks").prepend(item);\n    else $("#tasks").append(item);\n    $("#taskText").val("").focus();\n    $("#taskMessage").text("Tugas ditambahkan; tidak tersimpan setelah reload.");\n  });\n  $("#tasks").on("click", ".remove-task", function () {\n    $(this).parent().remove();\n    $("#taskText").focus();\n    $("#taskMessage").text("Tugas dihapus dari daftar demo.");\n  });\n});'
  },
  {
    title: 'Halaman pengaturan peserta', prior: ['jq-events', 'jq-dom'], focus: 'class, atribut/property, val, text, dan html statis',
    scenario: 'Pilihan pengingat punya warna aktif, tombol simpan mengikuti persetujuan, dan ringkasan menampilkan nama sebagai teks biasa.',
    locate: 'Toggle mengubah class dan aria-pressed. Prop membaca checked/disabled, attr memberi tooltip, val membaca nama, dan text menampilkan isi pengguna. Html hanya dipakai untuk markup tetap.',
    experiment: 'Ketik <b>Ayu</b> sebagai nama. Saat disimpan, tanda kurung tetap tulisan biasa, bukan elemen HTML.',
    exercise: 'Tambah pesan ketika persetujuan dibatalkan dan pastikan tombol kembali disabled.',
    body: `<section id="materi" class="rounded-xl bg-white p-5"><label for="profileName" class="block font-semibold">Nama tampilan</label><input id="profileName" class="${guidedInput}"><button id="profileToggle" type="button" aria-pressed="false" class="mt-4 rounded-lg border px-4 py-2 focus-visible:outline focus-visible:outline-2">Pengingat</button><label class="mt-4 block"><input id="profileConsent" type="checkbox" class="accent-emerald-600"> Saya setuju memakai nama ini</label><button id="profileSave" type="button" disabled title="Centang persetujuan dahulu" class="mt-4 ${guidedButton}">Tampilkan ringkasan</button><p id="profileResult" class="mt-4" role="status">Belum ada ringkasan.</p><div id="profileHelp" class="mt-3 text-sm text-slate-600"></div></section>`,
    js: '$(function () {\n  $("#profileHelp").html("<strong>Demo:</strong> data tidak disimpan.");\n  $("#profileToggle").on("click", function () {\n    const active = $(this).attr("aria-pressed") !== "true";\n    $(this).attr("aria-pressed", String(active)).toggleClass("bg-emerald-700 text-white", active);\n  });\n  $("#profileConsent").on("change", function () {\n    const allowed = $(this).prop("checked");\n    $("#profileSave").prop("disabled", !allowed).attr("title", allowed ? "Siap menampilkan ringkasan" : "Centang persetujuan dahulu");\n  });\n  $("#profileSave").on("click", function () {\n    $("#profileResult").text("Nama tampilan: " + $("#profileName").val());\n  });\n});'
  },
  {
    title: 'Halaman kartu peserta dengan traversing', prior: ['jq-events', 'jq-classes', 'jq-content'], focus: 'parent, closest, children, find, dan siblings',
    scenario: 'Ada beberapa kartu peserta, tetapi tombol harus menandai hanya kartu yang diklik, bukan seluruh halaman.',
    locate: 'Mulai dari this, closest menemukan kartu, parent menemukan baris tombol, children memilih judul langsung, find memilih status yang lebih dalam, dan siblings membersihkan kartu lain.',
    experiment: 'Klik kartu Ayu lalu Bima. Perhatikan kartu aktif berpindah dan tulisan peserta lain tetap benar.',
    exercise: 'Tambah peserta ketiga dengan struktur dan class sama tanpa menggandakan handler.',
    body: `<section id="materi" class="grid gap-4 sm:grid-cols-2">${['Ayu', 'Bima'].map((name) => `<article class="participant-card rounded-xl border bg-white p-5"><h2 class="text-xl font-semibold">${name}</h2><div class="mt-3"><button type="button" class="choose-participant ${guidedButton}">Pilih ${name}</button><p class="participant-status mt-3" role="status">Belum dipilih.</p></div></article>`).join('')}</section>`,
    js: '$(function () {\n  $(".choose-participant").on("click", function () {\n    const card = $(this).closest(".participant-card");\n    const others = card.siblings(".participant-card");\n    others.removeClass("ring-2 ring-emerald-500").find(".participant-status").text("Belum dipilih.");\n    $(".choose-participant").parent().removeClass("bg-emerald-50");\n    card.addClass("ring-2 ring-emerald-500");\n    const name = card.children("h2").text();\n    $(this).parent().addClass("bg-emerald-50");\n    card.find(".participant-status").text(name + " dipilih untuk presentasi.");\n  });\n});'
  },
  {
    title: 'Halaman bantuan buka-tutup', prior: ['jq-events', 'jq-attributes', 'jq-traversing'], focus: 'show/hide/toggle, efek, dan antrean animasi',
    scenario: 'Panel bantuan dapat dibuka tanpa mengganggu isi halaman. Klik cepat tidak boleh menumpuk animasi, dan status tombol harus cocok dengan hasil akhirnya.',
    locate: 'Aria-expanded diperbarui saat tombol ditekan. Stop membuang antrean; slideDown/slideUp mengikuti status yang dituju, sedangkan show/hide dipakai ketika reduced motion aktif.',
    experiment: 'Klik cepat beberapa kali. Pastikan panel berakhir sesuai aria-expanded, lalu gunakan Tab untuk mencapai link bantuan.',
    exercise: 'Ganti slideDown/slideUp dengan fadeIn/fadeOut dan bandingkan efeknya tanpa menghapus stop.',
    body: `<section id="materi" class="rounded-xl bg-white p-5"><h2 class="text-xl font-semibold">Bantuan praktikum</h2><button id="helpToggle" type="button" aria-expanded="false" aria-controls="helpPanel" class="mt-4 ${guidedButton}">Buka bantuan</button><div id="helpPanel" style="display:none" class="mt-4 rounded-lg bg-emerald-50 p-4"><p>Baca materi, Run, lalu ubah satu keputusan.</p><a href="#helpNote" class="mt-3 inline-block underline">Baca catatan</a></div><p id="helpNote" class="mt-4 text-slate-600">Animasi membantu mengikuti perubahan, bukan syarat mengakses informasi.</p></section>`,
    js: '$(function () {\n  $("#helpToggle").on("click", function () {\n    const open = $(this).attr("aria-expanded") !== "true";\n    $(this).attr("aria-expanded", String(open)).text(open ? "Tutup bantuan" : "Buka bantuan");\n    const panel = $("#helpPanel").stop(true, true);\n    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {\n      if (open) panel.show(); else panel.hide();\n    } else {\n      if (open) panel.slideDown(200); else panel.slideUp(200);\n    }\n  });\n});'
  },
  {
    title: 'Halaman pendaftaran dengan jQuery', prior: ['jq-events', 'jq-content', 'jq-attributes', 'tw-form-input'], focus: 'submit, preventDefault, val, trim, dan validasi',
    scenario: 'Pendaftaran perlu menahan perpindahan halaman, membaca isi form, menandai kolom salah, dan menampilkan ringkasan yang aman.',
    locate: 'Novalidate memberi kesempatan handler menjelaskan kesalahan. CheckValidity masih memeriksa email; aria-invalid mengikuti hasil. Nama pengguna selalu ditampilkan dengan text.',
    experiment: 'Kirim nama pendek dan email salah, kemudian perbaiki satu per satu. Uji dengan Enter, bukan hanya klik tombol.',
    exercise: 'Tambah kolom kelas wajib dan pesan spesifik jika belum dipilih, tanpa mengganti text dengan html.',
    body: `<section id="materi" class="max-w-xl rounded-xl bg-white p-5"><form id="guidedSignup" novalidate><label for="signupName" class="block font-semibold">Nama (minimal 3 karakter)</label><input id="signupName" name="name" autocomplete="name" aria-describedby="signupMessage" class="${guidedInput} aria-[invalid=true]:border-red-500"><label for="signupEmail" class="mt-4 block font-semibold">Email</label><input id="signupEmail" name="email" type="email" autocomplete="email" required aria-describedby="signupMessage" class="${guidedInput} aria-[invalid=true]:border-red-500"><button type="submit" class="mt-4 ${guidedButton}">Periksa</button></form><p id="signupMessage" class="mt-4" role="status">Demo ini tidak mengirim data.</p></section>`,
    js: '$(function () {\n  $("#guidedSignup").on("submit", function (event) {\n    event.preventDefault();\n    const name = $("#signupName").val().trim();\n    const nameValid = name.length >= 3;\n    const emailValid = $("#signupEmail")[0].checkValidity();\n    $("#signupName").attr("aria-invalid", String(!nameValid));\n    $("#signupEmail").attr("aria-invalid", String(!emailValid));\n    if (!nameValid || !emailValid) {\n      $("#signupMessage").text(!nameValid ? "Nama perlu minimal 3 karakter." : "Periksa format email.");\n      if (!nameValid) $("#signupName").focus(); else $("#signupEmail").focus();\n      return;\n    }\n    $("#signupMessage").text("Halo " + name + ", format data valid. Data tidak dikirim atau disimpan.");\n  });\n});'
  },
  {
    title: 'Halaman direktori dengan AJAX', prior: ['jq-events', 'jq-dom', 'jq-content', 'jq-attributes'], focus: 'request, done, fail, always, dan render data',
    scenario: 'Direktori mengambil daftar peserta saat tombol ditekan. Halaman perlu menunjukkan loading, hasil, dan kegagalan sambil menjaga tombol tetap dapat dipakai lagi.',
    locate: 'Data URL JSON lokal membuat demo tidak butuh backend. Done merender elemen dengan text, fail memberi pesan, always memulihkan disabled/aria-busy.',
    experiment: 'Centang JSON rusak lalu Muat data untuk menguji fail. Hilangkan centang dan coba lagi agar tombol serta hasil pulih.',
    exercise: 'Tambahkan field kelas pada JSON dan render sebagai teks; jangan memasukkan token API ke source code.',
    body: `<section id="materi" class="rounded-xl bg-white p-5"><h2 class="text-xl font-semibold">Direktori peserta</h2><label class="mt-4 block"><input id="brokenData" type="checkbox" class="accent-emerald-600"> Simulasikan JSON rusak</label><button id="loadDirectory" type="button" class="mt-4 ${guidedButton}">Muat data</button><p id="directoryStatus" class="mt-4" role="status">Belum ada request.</p><ul id="directory" class="mt-4 space-y-3"></ul></section>`,
    js: '$(function () {\n  $("#loadDirectory").on("click", function () {\n    const button = $(this).prop("disabled", true).attr("aria-busy", "true");\n    $("#directoryStatus").text("Memuat data…");\n    $("#directory").empty();\n    const data = $("#brokenData").prop("checked") ? "JSON rusak" : JSON.stringify([{ name: "Ayu" }, { name: "Bima" }]);\n    $.ajax({ url: "data:application/json," + encodeURIComponent(data), dataType: "json" })\n      .done(function (people) {\n        people.forEach(function (person) {\n          $("#directory").append($("<li>").addClass("rounded bg-emerald-50 p-3").text(person.name));\n        });\n        $("#directoryStatus").text("Data demo berhasil dimuat.");\n      })\n      .fail(function () { $("#directoryStatus").text("Data gagal dibaca. Hilangkan centang lalu coba lagi."); })\n      .always(function () { button.prop("disabled", false).attr("aria-busy", "false"); });\n  });\n});'
  }
];

function guidedMarkup(source) {
  // Pisahkan tag untuk dibaca/diketik ulang. Textarea kosong harus tetap kosong;
  // newline di dalam textarea akan menjadi nilai awal, bukan sekadar indentasi.
  return source.replace(/>(?=<)/g, '>\n    ').replace(/(<textarea\b[^>]*>)\s*(<\/textarea>)/g, '$1$2');
}

function guidedLayoutForStage(source, project) {
  // Proyek dasar menggunakan aliran block. Jangan meminta Grid/Flexbox
  // pada proyek spacing, typography, background, atau border sebelum materinya.
  return source.replace(/class="([^"]*)"/g, (_match, classes) => {
    let stacked = false;
    const kept = classes.split(/\s+/).filter((utility) => {
      const base = utility.split(':').at(-1);
      const flex = /^(?:inline-flex|flex(?:-|$)|basis-|grow(?:-|$)|shrink(?:-|$))/.test(base);
      const grid = /^(?:inline-grid|grid(?:-|$)|col-|row-)/.test(base);
      if ((flex && !project.hasFlex) || (grid && !project.hasGrid)) {
        if (/^(?:inline-flex|flex|inline-grid|grid)$/.test(base)) stacked = true;
        return false;
      }
      return project.hasFlex || project.hasGrid || !/^(?:gap-|items-|justify-|self-|place-|order-)/.test(base);
    });
    if (stacked && !kept.some((utility) => /^space-y-/.test(utility))) kept.push('space-y-4');
    return `class="${kept.join(' ')}"`;
  });
}

function guidedDocument(project, isJquery, plan, capstone) {
  const interactions = [project.js, capstone.script].filter(Boolean).join('\n\n');
  const script = interactions ? `\n  <!-- 7. Interaksi dijalankan setelah elemen halaman tersedia. -->\n  <script>\n${interactions}\n  </script>` : '';
  const source = `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${project.title}</title>
  <!-- 1. Setup: simpan file di folder utama project, dekat vendor/. -->
  <script src="./vendor/tailwind-3.4.17.js"></script>${isJquery ? '\n  <script src="./vendor/jquery-3.7.1.min.js"></script>' : ''}
  <!-- Atribut hidden harus tetap menyembunyikan komponen, termasuk yang memakai flex. -->
  <style>[hidden] { display: none !important; }${project.css || ''}${capstone.css}</style>
</head>
<body class="min-h-screen bg-slate-50 text-slate-900">
  <!-- 2. Kerangka halaman mengulang heading, warna, dan spacing. -->
  <header class="${project.headerClass || ''} bg-emerald-800 px-4 py-6 text-white">
    <div class="mx-auto max-w-5xl">
      <p class="text-sm">Codeforge · Praktikum Web</p>
      <h1 class="mt-2 text-3xl font-bold">${project.title}</h1>
      <nav aria-label="Navigasi halaman" class="mt-4">
        <a href="#materi" class="mr-4 underline focus-visible:outline focus-visible:outline-2">Isi halaman</a>
        <a href="#penutup" class="underline focus-visible:outline focus-visible:outline-2">Catatan</a>
        <a href="#studio-extension" class="ml-4 underline focus-visible:outline focus-visible:outline-2">Bagian tambahan</a>
        <a href="#studio-journal" class="ml-4 underline focus-visible:outline focus-visible:outline-2">Jurnal hasil</a>
        <a href="#capstone-project" class="ml-4 underline focus-visible:outline focus-visible:outline-2">Proyek lengkap</a>
      </nav>
    </div>
  </header>
  <!-- 3. Fokus praktikum: ${project.focus}. -->
  <main class="${project.mainClass || 'mx-auto max-w-5xl'} px-4 py-6">
    <section id="studio-brief" class="mb-6 rounded-xl bg-emerald-50 p-5" aria-labelledby="studio-brief-title">
      <p class="text-sm font-semibold uppercase tracking-wide text-emerald-800">Brief proyek</p>
      <h2 id="studio-brief-title" class="mt-2 text-xl font-semibold">Kebutuhan halaman</h2>
      <p class="mt-3 leading-relaxed">${project.scenario}</p>
      <h3 class="mt-4 font-semibold">Ruang lingkup versi pertama</h3>
      <ul class="mt-3 list-disc space-y-2 pl-6">
        <li>Fokus teknis: ${project.focus}.</li>
        <li>Isi utama mempunyai struktur dan penekanan yang mudah dikenali.</li>
        <li>Bagian tambahan memakai pola yang konsisten dengan komponen utama.</li>
        <li>Hasil perubahan dicatat dan diuji sebelum halaman dikumpulkan.</li>
      </ul>
      <h3 class="mt-4 font-semibold">Cara mengembangkan</h3>
      <p class="mt-2">Bangun dari kerangka kosong, tambahkan satu komponen, lalu Run. Setelah versi pertama bekerja, lanjutkan variasi dan tantangan mandiri.</p>
    </section>
    ${guidedMarkup(project.body)}
    <!-- 4. Ketik bagian tambahan ini setelah komponen utama bekerja. -->
    ${guidedMarkup(plan.extension)}
    <!-- 5. Kembangkan modul proyek dengan pola komponen yang sudah dipelajari. -->
${capstone.html}
    <!-- 6. Ganti jurnal contoh dengan catatan dari perubahan kodemu sendiri. -->
    <section id="studio-journal" class="mt-6 rounded-xl border border-slate-200 bg-white p-5" aria-labelledby="studio-journal-title">
      <h2 id="studio-journal-title" class="text-xl font-semibold">Jurnal perubahan peserta</h2>
      <p class="mt-3 text-slate-600">Ganti isi contoh berikut setelah mengerjakan tantangan. Catatan ini ditulis dalam HTML hasil editmu.</p>
      <article class="mt-4 rounded-lg bg-slate-50 p-4">
        <h3 class="font-semibold">Dugaan sebelum Run</h3>
        <p class="mt-2">Contoh: perubahan padding main akan memengaruhi ruang halaman, bukan padding semua kartu.</p>
      </article>
      <article class="mt-4 rounded-lg bg-emerald-50 p-4">
        <h3 class="font-semibold">Hasil sesudah Run</h3>
        <p class="mt-2">Tulis elemen yang berubah, utility/API yang kamu pakai, dan apakah hasilnya sesuai dugaan.</p>
      </article>
      <article class="mt-4 rounded-lg bg-blue-50 p-4">
        <h3 class="font-semibold">Masalah dan perbaikan</h3>
        <p class="mt-2">Catat satu kesalahan, cara menemukannya, dan perubahan yang memperbaikinya.</p>
      </article>
      <ul class="mt-4 list-disc space-y-2 pl-6">
        <li>Utility/API pertama → property atau perilaku yang berubah.</li>
        <li>Utility/API kedua → property atau perilaku yang berubah.</li>
        <li>Utility/API ketiga → property atau perilaku yang berubah.</li>
      </ul>
    </section>
  </main>
  <footer id="penutup" class="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600">
    Contoh pembelajaran: baca kode, prediksi hasil, ubah satu hal, lalu Run. Data tidak disimpan.
  </footer>${script}
</body>
</html>`;
  return isJquery ? source : guidedLayoutForStage(source, project);
}

// Identitas proyek mengikuti halaman penutupnya, bukan nomor urut tampilan.
// Array template dan capstone lama tetap menunjuk fokus yang sama saat katalog diurutkan ulang.
const guidedTailwindProjectLessons = [
  'tw-utility', 'tw-hello', 'tw-responsive', 'tw-zindex', 'tw-flex-order',
  'tw-grid-gap', 'tw-place', 'tw-minmax', 'tw-text', 'tw-gradient',
  'tw-divide-ring', 'tw-filters', 'tw-tables', 'tw-animation', 'tw-origin',
  'tw-resize-select', 'tw-form-state', 'tw-button-state', 'tw-accordion'
];
lessonCatalog.forEach((track) => {
  const projects = track.sectionId === 'tailwind' ? guidedTailwindProjects : guidedJqueryProjects;
  const plans = guidedPracticePlans[track.sectionId];
  if (projects.length !== track.groups.length) throw new Error(`Guided learning tidak lengkap: ${track.sectionId}`);
  if (plans?.length !== projects.length) throw new Error(`Praktikum panjang tidak lengkap: ${track.sectionId}`);
  track.groups.forEach((group, index) => {
    const lesson = group.lessons[group.lessons.length - 1];
    const projectIndex = track.sectionId === 'tailwind' ? guidedTailwindProjectLessons.indexOf(lesson.id) : index;
    if (projectIndex < 0) throw new Error(`Proyek kelompok belum dipetakan: ${lesson.id}`);
    const learned = track.groups.filter((item) => item.number <= group.number).flatMap((item) => item.lessons);
    const project = { ...projects[projectIndex], hasFlex: learned.some((item) => item.id === 'tw-flex-direction'), hasGrid: learned.some((item) => item.id === 'tw-grid-template') };
    const plan = plans[projectIndex];
    const capstone = buildGuidedCapstone(project, track.sectionId, projectIndex + 1);
    // Halaman satu contoh tetap menyediakan contoh dasarnya, bukan diganti.
    if (!lesson.sections?.length) lesson.sections = [{
      id: 'contoh-dasar', title: `Contoh dasar: ${lesson.title}`,
      paragraphs: [lesson.description, lesson.lead], rows: lesson.propertyRows,
      codeFile: track.sectionId === 'jquery' ? 'js' : 'html', code: { ...lesson.code },
      note: lesson.note, exercise: lesson.assignmentText
    }];
    const priorLessons = project.prior.map((id) => {
      const prior = lessonCatalog.flatMap((item) => item.groups.flatMap((part) => part.lessons)).find((item) => item.id === id);
      if (!prior || (prior.sectionId === track.sectionId && prior.groupNumber >= group.number)) throw new Error(`Prasyarat tidak valid: ${lesson.id}/${id}`);
      return prior;
    });
    lesson.sections.push({
      id: 'guided-learning', title: `Guided learning: ${project.title}`,
      guided: true, runtime: 'document', codeFile: 'html',
      paragraphs: [project.scenario, `Kita menggabungkan ${project.focus} dengan kerangka header, navigasi, isi, bagian tambahan, jurnal hasil, dan footer. Source sekarang mencakup proyek lengkap dengan ${capstone.moduleCount} modul, ${capstone.itemCount} entri, dan ${capstone.script ? 'kontrol interaktif tambahan' : 'komponen peninjauan hasil'}. Contoh ini adalah acuan untuk diketik dan dikembangkan, bukan cukup dijalankan sekali.`, 'Ikuti 13 tahap coding di bawah, kemudian kerjakan 8 tantangan setelah source code pada dokumen yang sama. Kerjakan modul proyek satu per satu, buat dugaan sebelum Run, dan catat hasil sesudahnya. Praktik dapat dibagi beberapa sesi; contoh kecil sebelumnya tetap tersedia untuk menguji konsep terfokus.'],
      duration: 'Praktik proyek bertahap; dapat dibagi menjadi beberapa sesi sesuai ritme kelas.',
      steps: guidedStudioSteps(project, plan, capstone),
      challenges: guidedStudioChallenges(plan),
      moduleCount: capstone.moduleCount,
      itemCount: capstone.itemCount,
      completion: ['HTML hasil edit memiliki identitas kelas sendiri, komponen tambahan, dan jurnal perubahan yang bukan teks contoh.', 'Catat hasil delapan tantangan, termasuk perbedaan sebelum/sesudah dan alasan memilih utility/API; sertakan screenshot atau catatan uji.', 'Navigasi, label/fokus, tampilan sempit/lebar, serta interaksi dasar yang semula bekerja tetap diuji setelah pengembangan.'],
      connections: [...priorLessons, ...group.lessons].map((item) => ({ id: item.id, label: `${item.number} ${item.title}` })),
      rows: track.sectionId === 'tailwind' ? [...guidedCommonRows, ...project.rows] : undefined,
      note: 'Tombol Copy menyediakan dokumen lengkap untuk instruktur. Mahasiswa mengetik ulang kode secara manual; untuk file offline, simpan hasil ketikan di folder utama project agar path ./vendor benar. Untuk online, gunakan sumber CDN dari halaman Menambahkan Tailwind CSS ke HTML (#tw-install/cdn); jQuery juga perlu tetap dimuat sebelum kode interaksinya. Run tidak mengirim atau menyimpan data ke server.',
      exercise: `${project.exercise} Terapkan minimal dua perubahan tambahan pada #capstone-project. Lanjutkan 8 tantangan di akhir Guided Learning pada source code yang sama, lalu isi jurnal dan simpan HTML hasil edit.`,
      code: { html: guidedDocument(project, track.sectionId === 'jquery', plan, capstone), css: '/* CSS yang diperlukan sudah berada di dokumen HTML. */', js: '// Interaksi yang diperlukan sudah berada di dokumen HTML.' }
    });
  });
});
