// Materi rinci dalam satu halaman: pengantar property -> referensi -> percobaan.
function propertySection(id, title, paragraphs, rows, snippet, exercise, note) {
  return {
    id, title, paragraphs, rows, exercise, note,
    code: {
      html: `<main class="min-h-screen bg-slate-50 p-6 text-slate-900">\n${snippet}\n</main>`,
      css: "/* Bandingkan utility Tailwind dengan CSS custom di sini. */",
      js: "// Styling contoh ini ditangani oleh utility Tailwind."
    }
  };
}

const utilityPropertySections = [
  propertySection("font", "Font: family, ukuran, dan ketebalan", [
    "Font mengatur bentuk dan karakter huruf. Mulai dengan memilih keluarga font, lalu tentukan ukuran dan ketebalan untuk membedakan judul, subjudul, serta isi. Gunakan sedikit variasi agar hirarki mudah diikuti.",
    "Nama utility tidak selalu sama dengan nama property CSS. font-bold mengubah font-weight, sedangkan text-xl mengubah font-size sekaligus line-height bawaan. leading-* dapat digunakan untuk mengatur tinggi baris secara terpisah."
  ], [
    ["font-family", "font-sans · font-serif · font-mono", "Keluarga sans-serif, serif, atau monospace dari tema."],
    ["font-size", "text-sm · text-base · text-xl · text-3xl", "Skala ukuran huruf; text-base = 1rem pada tema bawaan."],
    ["font-weight", "font-normal · font-medium · font-semibold · font-bold", "Ketebalan 400, 500, 600, atau 700."],
    ["font-style", "italic · not-italic", "Huruf miring atau normal."],
    ["line-height", "leading-tight · leading-normal · leading-relaxed", "Jarak antarbaris agar paragraf nyaman dibaca."],
    ["letter-spacing", "tracking-tight · tracking-normal · tracking-wide", "Jarak antarkarakter; cocok untuk judul atau label."]
  ], `<div class="space-y-4">
  <h1 class="font-sans text-3xl font-bold tracking-tight">Judul sans-serif</h1>
  <h2 class="font-serif text-xl font-semibold italic">Subjudul serif</h2>
  <p class="max-w-sm text-base leading-relaxed">Paragraf ini memiliki tinggi baris yang longgar agar beberapa baris teks tetap nyaman dibaca saat ditampilkan di layar praktikum.</p>
  <p class="font-mono text-sm">const materi = "Tailwind CSS";</p>
</div>`, "Ubah judul menjadi font-serif, kecilkan ke text-2xl, lalu bandingkan leading-tight dan leading-relaxed pada paragraf.", "Ukuran rem mengikuti font-size root. Angka piksel pada dokumentasi bawaan memakai asumsi root 16px; tema atau CSS dapat mengubahnya."),

  propertySection("text", "Text: perataan, warna, dan dekorasi", [
    "Setelah memilih font, atur bagaimana teks ditampilkan di dalam elemen. Perataan cocok untuk jenis konten yang berbeda: paragraf umumnya rata kiri, label singkat dapat di tengah, dan angka sering rata kanan.",
    "Utility text-* memiliki beberapa fungsi. text-lg mengatur ukuran, text-center mengatur alignment, dan text-blue-700 mengatur warna. Baca bagian akhir class untuk mengenali property yang sedang diubah."
  ], [
    ["text-align", "text-left · text-center · text-right · text-justify", "Perataan isi teks di dalam elemen."],
    ["color", "text-slate-600 · text-blue-700 · text-emerald-700", "Warna teks; angka menunjukkan shade dalam palet."],
    ["text-decoration-line", "underline · overline · line-through · no-underline", "Garis bawah, atas, coret, atau tanpa dekorasi."],
    ["text-decoration-color / text-underline-offset", "decoration-blue-500 · underline-offset-4", "Warna dekorasi dan jarak garis bawah dari teks."],
    ["text-transform", "uppercase · lowercase · capitalize · normal-case", "Mengubah tampilan kapitalisasi, bukan isi teks sumber."],
    ["text-overflow / white-space / overflow", "truncate", "Memotong teks satu baris dengan elipsis ketika lebar dibatasi."],
    ["overflow-wrap / white-space", "break-words · whitespace-nowrap", "Mengatur pemenggalan kata atau mempertahankan satu baris."]
  ], `<div class="space-y-4 rounded-lg bg-white p-5">
  <p class="text-left text-blue-700">Teks rata kiri berwarna biru.</p>
  <p class="text-center font-bold uppercase tracking-wide">Label rata tengah</p>
  <p class="text-right text-emerald-700">Rp150.000</p>
  <p class="underline decoration-blue-500 underline-offset-4">Garis bawah dengan jarak</p>
  <p class="line-through text-slate-400">Harga sebelum diskon</p>
  <p class="w-48 truncate" title="Kalimat panjang yang dipotong karena ruang terbatas">Kalimat panjang yang dipotong karena ruang terbatas</p>
</div>`, "Ganti perataan paragraf pertama menjadi text-right. Perbesar w-48 pada teks truncate dan amati panjang teks yang terlihat.", "text-center memusatkan isi teks, bukan kotak elemennya. Untuk memusatkan kotak berlebar tertentu, gunakan mx-auto atau layout flex/grid."),

  propertySection("spacing", "Spacing: padding, margin, gap, dan space", [
    "Padding adalah ruang di dalam border, sedangkan margin adalah ruang di luar elemen. Bayangkan sebuah kartu: p-4 menjauhkan tulisan dari tepi kartu, sementara mt-4 menjauhkan kartu dari elemen sebelumnya.",
    "Pada skala spacing bawaan, 1 unit umumnya bernilai 0.25rem: p-2 = 0.5rem, p-4 = 1rem, dan p-8 = 2rem. Suffix x mengatur kiri/kanan, y mengatur atas/bawah, dan t/r/b/l mengatur satu sisi. gap mengatur jarak antar-item flex/grid; space-* memberi margin antar-anak langsung."
  ], [
    ["padding", "p-2 · p-4 · p-8", "Jarak dalam pada semua sisi."],
    ["padding-left / padding-right", "px-4 · px-6", "Padding horizontal."],
    ["padding-top / padding-bottom", "py-2 · pt-4 · pb-6", "Padding vertikal atau sisi tertentu."],
    ["margin", "m-4 · mt-4 · mb-6 · -mt-2", "Jarak luar; varian negatif menarik elemen mendekat."],
    ["margin-left / margin-right", "mx-auto", "Margin otomatis untuk memusatkan kotak yang memiliki batas lebar."],
    ["gap / column-gap / row-gap", "gap-4 · gap-x-6 · gap-y-2", "Jarak antar-item flex atau grid."],
    ["margin antar-anak", "space-y-3 · space-x-4", "Jarak antar-anak langsung dalam aliran vertikal/horizontal."]
  ], `<div class="rounded-lg border-2 border-dashed border-blue-300 p-2">
  <div class="mx-auto max-w-sm rounded bg-blue-100 px-6 py-4">
    <h2 class="font-bold">Padding di dalam kartu</h2>
    <p class="mt-4">mt-4 memberi margin di atas paragraf ini.</p>
  </div>
</div>
<div class="mt-6 grid grid-cols-2 gap-4">
  <div class="rounded bg-emerald-100 p-4">Item A</div>
  <div class="rounded bg-emerald-100 p-4">Item B</div>
</div>`, "Ubah px-6 menjadi px-2, mt-4 menjadi mt-8, dan gap-4 menjadi gap-1. Jelaskan perbedaan ruang yang berubah.", "gap tidak menambah jarak di tepi luar container. Untuk flex yang membungkus banyak baris, gap biasanya lebih mudah digunakan daripada space-x-* atau space-y-*."),

  propertySection("sizing", "Sizing: width, height, dan batas ukuran", [
    "Ukuran dapat berupa nilai skala, persentase dari induk, atau batas maksimum. w-1/2 berarti setengah lebar induk, sedangkan w-full berarti seluruh lebarnya. h-24 memberi tinggi berdasarkan skala tema.",
    "Gabungkan w-full dengan max-w-sm untuk membuat kartu yang memenuhi layar kecil tetapi tidak terlalu lebar di layar besar. min-h-* menjamin ruang minimum tanpa memotong konten yang lebih panjang."
  ], [
    ["width", "w-24 · w-1/2 · w-full · w-auto", "Lebar skala, pecahan, penuh, atau otomatis."],
    ["height", "h-16 · h-24 · h-auto · h-screen", "Tinggi skala, mengikuti konten, atau setinggi viewport."],
    ["min-width / max-width", "min-w-0 · max-w-sm · max-w-xl", "Batas lebar minimum dan maksimum."],
    ["min-height / max-height", "min-h-24 · max-h-48", "Batas tinggi; overflow dapat diperlukan untuk isi panjang."],
    ["aspect-ratio", "aspect-square · aspect-video", "Rasio lebar:tinggi 1:1 atau 16:9."],
    ["width / height", "w-[180px] · h-[90px]", "Nilai arbitrer ketika skala bawaan tidak sesuai."]
  ], `<div class="space-y-4">
  <div class="h-16 w-1/2 rounded bg-blue-200 p-3">Setengah lebar induk</div>
  <div class="min-h-24 w-full max-w-sm rounded bg-emerald-100 p-4">Lebar penuh dengan batas max-w-sm.</div>
  <div class="aspect-video w-48 rounded bg-violet-200 p-4">Rasio video 16:9</div>
  <div class="h-[90px] w-[180px] rounded bg-amber-100 p-3">Ukuran arbitrer</div>
</div>`, "Ganti w-1/2 menjadi w-3/4, max-w-sm menjadi max-w-xs, dan aspect-video menjadi aspect-square.", "h-full mengikuti tinggi induk yang sudah terdefinisi; h-screen mengikuti tinggi viewport. Keduanya tidak selalu menghasilkan tinggi yang sama."),

  propertySection("background", "Warna dan background", [
    "bg-* mengatur warna latar dan text-* mengatur warna tulisan. Palet bawaan memiliki shade seperti 100, 500, dan 900. Pilih kombinasi yang membuat tulisan terbaca, bukan hanya warna yang menarik.",
    "Suffix /50 mengatur transparansi warna latar. Untuk gradasi pada Tailwind 3, gunakan bg-gradient-to-* bersama from-, via-, dan to-. Nilai warna khusus dapat ditulis dengan bracket."
  ], [
    ["background-color", "bg-white · bg-blue-100 · bg-slate-900", "Warna latar dari palet."],
    ["background-color dengan alpha", "bg-blue-500/20 · bg-blue-500/70", "Mengatur transparansi warna tanpa memudarkan anak elemen."],
    ["background-image", "bg-gradient-to-r · bg-gradient-to-br", "Gradasi ke kanan atau kanan bawah pada Tailwind 3."],
    ["gradient color stops", "from-blue-600 · via-violet-500 · to-rose-400", "Warna awal, tengah, dan akhir gradasi."],
    ["background-size / background-position", "bg-cover · bg-contain · bg-center", "Ukuran dan posisi gambar latar."],
    ["background-color arbitrer", "bg-[#0f172a]", "Menggunakan nilai warna khusus."]
  ], `<div class="space-y-4">
  <div class="rounded-lg bg-slate-900 p-4 text-white">Latar gelap, tulisan terang</div>
  <div class="rounded-lg bg-blue-500/20 p-4 text-blue-900">Warna blue dengan alpha 20%</div>
  <div class="rounded-lg bg-gradient-to-r from-blue-600 via-violet-500 to-rose-400 p-6 text-white">Gradasi Tailwind 3</div>
  <div class="rounded-lg bg-[#0f172a] p-4 text-emerald-300">Warna background khusus</div>
</div>`, "Ubah gradasi menjadi emerald ke cyan dan alpha latar kedua dari /20 menjadi /70. Sesuaikan warna tulisan agar terbaca.", "Angka shade menunjukkan varian warna, bukan persentase opacity. Transparansi ditulis dengan slash, misalnya /20."),

  propertySection("border", "Border, radius, divide, dan ring", [
    "Border memisahkan elemen dari sekelilingnya. Atur ketebalan, warna, gaya garis, serta radius sesuai fungsi komponen. rounded-full memberi bentuk pil jika kotak lebih lebar daripada tinggi.",
    "divide-* membuat garis antar-anak langsung, sedangkan ring menambah garis visual di luar elemen menggunakan box-shadow. Ring sering dipakai untuk state fokus tanpa mengubah ukuran kotak."
  ], [
    ["border-width", "border · border-2 · border-l-4", "Garis 1px, 2px, atau hanya sisi kiri 4px."],
    ["border-color", "border-slate-300 · border-blue-500/50", "Warna garis dan alpha."],
    ["border-style", "border-solid · border-dashed · border-dotted", "Garis solid, putus-putus, atau titik."],
    ["border-radius", "rounded-none · rounded-lg · rounded-full", "Bentuk sudut elemen."],
    ["border antar-anak", "divide-y · divide-slate-200", "Garis pemisah vertikal antar-anak."],
    ["box-shadow untuk ring", "ring-2 · ring-blue-500 · ring-offset-2", "Lebar, warna, dan offset ring."]
  ], `<div class="space-y-5">
  <div class="rounded-lg border-2 border-dashed border-blue-400 p-4">Border putus-putus dan sudut lengkung</div>
  <div class="divide-y divide-slate-300 rounded-lg border bg-white">
    <p class="p-3">Baris pertama</p>
    <p class="p-3">Baris kedua</p>
  </div>
  <button class="rounded-full bg-emerald-700 px-5 py-2 text-white ring-2 ring-emerald-500 ring-offset-2">Tombol dengan ring</button>
</div>`, "Ubah border-dashed menjadi border-solid, rounded-full menjadi rounded-lg, dan ring-offset-2 menjadi ring-offset-4.", "Jangan menghilangkan indikator fokus tanpa penggantinya. focus-visible:ring-* dapat digunakan agar interaksi keyboard tetap jelas."),

  propertySection("display", "Display: block, inline, hidden, dan visibility", [
    "Display menentukan cara elemen mengambil ruang dan mengikuti aliran dokumen. block memakai baris sendiri; inline mengikuti aliran teks; inline-block tetap mengalir bersama teks tetapi dapat diberi ukuran kotak.",
    "hidden menghapus elemen dari layout melalui display: none. invisible menyembunyikannya melalui visibility: hidden tetapi mempertahankan ruangnya. Perbedaannya terlihat pada posisi elemen sesudahnya."
  ], [
    ["display", "block · inline · inline-block", "Perilaku dasar elemen dalam aliran dokumen."],
    ["display", "flex · inline-flex · grid", "Mengaktifkan layout flex atau grid."],
    ["display", "hidden", "Menghilangkan elemen dan ruangnya dari layout."],
    ["visibility", "visible · invisible", "Menampilkan/menyembunyikan sambil mempertahankan ruang."],
    ["display responsif", "hidden md:block", "Sembunyi secara default, tampil sebagai block pada md ke atas."]
  ], `<span class="block rounded bg-blue-100 p-3">block mengambil satu baris</span>
<span class="inline bg-emerald-100">inline A</span>
<span class="inline-block h-16 w-32 bg-amber-100 p-2">inline-block B</span>
<div class="mt-4 space-y-2 border p-3">
  <p class="bg-blue-100 p-2">Elemen pertama</p>
  <p class="invisible bg-blue-100 p-2">Elemen kedua</p>
  <p class="bg-blue-100 p-2">Elemen ketiga</p>
</div>`, "Ganti invisible dengan hidden dan bandingkan posisi elemen ketiga. Ubah span pertama menjadi inline-block.", "Lebar dan tinggi tidak bekerja pada inline non-replaced seperti span dengan cara yang sama seperti block atau inline-block."),

  propertySection("flex", "Flexbox dan alignment", [
    "Flexbox menyusun anak dalam satu arah utama. flex-row memakai arah horizontal, sedangkan flex-col vertikal. Gunakan flex-wrap ketika item perlu pindah baris, dan gap untuk memberi jarak antar-item.",
    "justify-* mengatur sumbu utama; items-* mengatur sumbu silang. Ketika direction berubah, sumbunya ikut berubah. grow, shrink-0, dan flex-1 membantu membagi ruang yang tersedia."
  ], [
    ["display / flex-direction", "flex · flex-row · flex-col", "Aktifkan flex dan tentukan arah susunan."],
    ["flex-wrap", "flex-wrap · flex-nowrap", "Izinkan atau cegah item membungkus baris."],
    ["justify-content", "justify-start · justify-center · justify-between", "Pembagian ruang pada sumbu utama."],
    ["align-items / align-self", "items-center · items-start · self-end", "Alignment sumbu silang atau satu item."],
    ["flex / flex-grow / flex-shrink", "flex-1 · grow · shrink-0", "Pembagian ukuran dan perilaku item saat ruang berubah."],
    ["gap", "gap-2 · gap-4", "Jarak antar-item flex."]
  ], `<nav class="flex items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-sm">
  <strong class="shrink-0 text-emerald-700">Codeforge</strong>
  <div class="flex flex-wrap gap-2">
    <a class="rounded bg-slate-100 px-3 py-2" href="#">Materi</a>
    <a class="rounded bg-slate-100 px-3 py-2" href="#">Latihan</a>
  </div>
</nav>
<div class="mt-4 flex gap-3">
  <div class="w-20 shrink-0 rounded bg-blue-100 p-3">Tetap</div>
  <div class="flex-1 rounded bg-emerald-100 p-3">Mengisi ruang yang tersedia</div>
</div>`, "Ubah nav menjadi flex-col lalu bandingkan items-center dengan items-start. Ganti justify-between menjadi justify-center.", "justify-between hanya terlihat membagi ruang jika container memiliki ruang kosong. Jika item sudah memenuhi lebar, perbedaannya dapat sulit terlihat."),

  propertySection("grid", "Grid: kolom, baris, gap, dan span", [
    "Grid cocok saat konten perlu mengikuti hubungan baris dan kolom. grid-cols-3 menghasilkan tiga kolom sama lebar; gap mengatur ruang antar-track. Jumlah kolom dapat berubah menggunakan prefix breakpoint.",
    "col-span-* membuat satu item menempati beberapa kolom. col-start-* dan row-start-* menentukan garis awal penempatan. place-items-* membantu menyelaraskan item di kedua sumbu."
  ], [
    ["display", "grid", "Mengaktifkan grid container."],
    ["grid-template-columns", "grid-cols-1 · grid-cols-2 · grid-cols-3", "Jumlah kolom sama lebar."],
    ["grid-template-rows", "grid-rows-2 · grid-rows-3", "Jumlah track baris yang eksplisit."],
    ["grid-column / grid-row", "col-span-2 · row-span-2", "Jumlah track yang ditempati item."],
    ["grid-column-start / grid-row-start", "col-start-2 · row-start-1", "Garis awal penempatan item."],
    ["gap / align-items / justify-items", "gap-4 · place-items-center", "Jarak track dan alignment item."]
  ], `<div class="grid grid-cols-2 gap-4">
  <div class="col-span-2 rounded-lg bg-blue-700 p-4 font-bold text-white">Header: dua kolom</div>
  <div class="rounded-lg bg-emerald-100 p-4">Kartu A</div>
  <div class="rounded-lg bg-emerald-100 p-4">Kartu B</div>
  <div class="rounded-lg bg-amber-100 p-4">Kartu C</div>
  <div class="rounded-lg bg-amber-100 p-4">Kartu D</div>
</div>`, "Ubah grid-cols-2 menjadi grid-cols-3, lalu col-span-2 pada header menjadi col-span-3.", "Jumlah span sebaiknya sesuai jumlah kolom yang direncanakan. Span yang melebihi grid eksplisit dapat membuat kolom implisit."),

  propertySection("position", "Position dan z-index", [
    "Positioning digunakan saat elemen perlu ditempatkan di luar aliran biasa, misalnya badge di sudut kartu. Beri relative pada induk agar anak absolute mempunyai acuan posisi yang jelas.",
    "top-, right-, bottom-, dan left- mengatur offset. z-* mengatur urutan tumpukan dalam stacking context. Angka z-index besar tidak selalu menembus stacking context lain di luar induknya."
  ], [
    ["position", "static · relative · absolute · fixed · sticky", "Jenis positioning elemen."],
    ["top / right / bottom / left", "top-2 · right-2 · bottom-4 · left-0", "Jarak dari tepi acuan positioning."],
    ["inset", "inset-0 · inset-x-4", "Offset semua sisi atau sisi horizontal."],
    ["z-index", "z-0 · z-10 · z-20 · z-50", "Urutan tumpukan di stacking context."],
    ["position sticky + offset", "sticky top-0", "Menempel saat scroll dalam batas scroll/containing block."]
  ], `<article class="relative min-h-40 rounded-lg border bg-white p-5">
  <span class="absolute right-3 top-3 z-10 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">BARU</span>
  <h2 class="mt-6 text-xl font-bold">Kartu dengan badge</h2>
  <p class="mt-2 text-slate-600">Induk relative menjadi acuan posisi badge.</p>
</article>
<div class="relative mt-4 h-32">
  <div class="absolute left-0 top-0 z-10 h-20 w-32 bg-blue-200 p-3">Lapisan A</div>
  <div class="absolute left-12 top-8 z-20 h-20 w-32 bg-amber-200 p-3">Lapisan B</div>
</div>`, "Pindahkan badge ke kiri bawah. Ubah z-10 pada lapisan A menjadi z-30 untuk menukar urutan tampilan.", "absolute tidak menyediakan ruangnya sendiri di aliran layout. Induk mungkin membutuhkan padding atau minimum height agar kontennya tidak bertumpuk."),

  propertySection("overflow", "Overflow dan konten panjang", [
    "Overflow menentukan apa yang terjadi saat isi melebihi ukuran container. overflow-auto menampilkan scrollbar ketika diperlukan, overflow-hidden memotong isi, dan overflow-visible membiarkan isi melewati batas.",
    "Batasi tinggi atau lebar terlebih dahulu agar perbedaannya dapat diamati. Gunakan overflow-x-auto untuk tabel atau daftar horizontal yang perlu tetap bisa dibaca di layar sempit."
  ], [
    ["overflow", "overflow-auto · overflow-hidden · overflow-visible", "Scroll sesuai kebutuhan, potong isi, atau tampilkan di luar batas."],
    ["overflow-x / overflow-y", "overflow-x-auto · overflow-y-auto", "Kontrol overflow per sumbu."],
    ["max-height", "max-h-32 · max-h-48", "Batas tinggi sebelum konten meluap."],
    ["white-space", "whitespace-nowrap · whitespace-pre-wrap", "Pertahankan satu baris atau pertahankan baris sambil membungkus."],
    ["overflow-wrap", "break-words", "Membungkus kata panjang agar tidak melewati batas."]
  ], `<div class="h-28 overflow-y-auto rounded-lg border bg-white p-4">
  <div class="space-y-3">
    <p>Baris pertama: scrollbar muncul saat isi terlalu tinggi.</p>
    <p>Baris kedua: ukuran container tetap sama.</p>
    <p>Baris ketiga: scroll untuk membaca sisa konten.</p>
    <p>Baris keempat: konten tetap dapat diakses.</p>
  </div>
</div>
<div class="mt-4 overflow-x-auto rounded bg-blue-100 p-3">
  <p class="w-[650px] whitespace-nowrap">Contoh konten horizontal yang lebih lebar daripada preview.</p>
</div>`, "Ganti overflow-y-auto menjadi overflow-hidden, kemudian naikkan h-28 menjadi h-48 dan bandingkan hasilnya.", "Memotong konten penting dengan overflow-hidden dapat membuat informasi tidak dapat dibaca. Pastikan pemotongan memang sesuai tujuan komponen."),

  propertySection("effects", "Effects: shadow, opacity, dan filter", [
    "Shadow membantu menunjukkan kedalaman dan memisahkan permukaan. Opacity mengatur transparansi seluruh elemen, termasuk teks dan anaknya. Filter seperti blur dan grayscale mengubah hasil render visual.",
    "Gunakan efek secukupnya supaya contoh tetap mudah dibaca. Bandingkan opacity-50 dengan bg-blue-500/50: yang pertama memudarkan seluruh kotak, yang kedua hanya memudarkan warna latar."
  ], [
    ["box-shadow", "shadow-sm · shadow-md · shadow-xl · shadow-none", "Kekuatan bayangan elemen."],
    ["opacity", "opacity-100 · opacity-50 · opacity-0", "Transparansi seluruh elemen; opacity-0 tetap menyisakan layout."],
    ["filter: blur", "blur-none · blur-sm", "Mengaburkan hasil render."],
    ["filter: grayscale", "grayscale · grayscale-0", "Menghilangkan atau mengembalikan warna."],
    ["filter: brightness / contrast", "brightness-75 · contrast-125", "Mengubah kecerahan dan kontras."]
  ], `<div class="grid grid-cols-2 gap-5">
  <div class="rounded-lg bg-white p-4 shadow-sm">Shadow kecil</div>
  <div class="rounded-lg bg-white p-4 shadow-xl">Shadow besar</div>
  <div class="rounded-lg bg-blue-600 p-4 text-white opacity-50">Teks ikut pudar</div>
  <div class="rounded-lg bg-blue-600/50 p-4 text-white">Hanya warna latar transparan</div>
  <div class="rounded-lg bg-gradient-to-r from-blue-500 to-rose-400 p-4 grayscale">Grayscale</div>
  <div class="rounded-lg bg-emerald-200 p-4 blur-sm">Blur kecil</div>
</div>`, "Hilangkan opacity-50, ubah shadow-xl menjadi shadow-none, dan hapus grayscale serta blur-sm untuk membandingkan render asli.", "opacity-0 tidak sama dengan hidden: ruang layout tetap ada, dan elemen bisa tetap merespons interaksi jika tidak dinonaktifkan."),

  propertySection("interaction", "Interactivity, transition, dan transform", [
    "Komponen perlu memberikan feedback saat disentuh pointer atau difokuskan dengan keyboard. Utility cursor-* memberi petunjuk interaksi, ring/outline memberi indikator fokus, dan transition membuat perubahan state berlangsung bertahap.",
    "Transform mengubah posisi atau ukuran visual tanpa mengubah ruang asli di layout. hover:scale-105 membesarkan sedikit saat hover; hover:-translate-y-1 menggeser ke atas. Sertakan dukungan motion-reduce untuk pengguna yang mengurangi animasi."
  ], [
    ["cursor", "cursor-pointer · cursor-not-allowed", "Petunjuk pointer untuk aksi aktif atau nonaktif."],
    ["user-select / resize", "select-none · select-text · resize-y", "Seleksi teks dan kemampuan resize textarea."],
    ["transition-property / transition-duration", "transition-colors · transition-transform · duration-300", "Properti yang berubah secara bertahap dan durasinya."],
    ["transition-timing-function", "ease-in · ease-out · ease-in-out", "Kurva perubahan animasi."],
    ["transform", "scale-105 · rotate-6 · -translate-y-1", "Scale, rotasi, dan pergeseran visual melalui utility transform."],
    ["ring/outline pada fokus", "focus-visible:ring-2 · focus-visible:ring-offset-2", "Penanda fokus keyboard."]
  ], `<button class="cursor-pointer rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none">Hover atau fokus dengan Tab</button>
<button class="ml-3 cursor-not-allowed rounded-lg bg-slate-200 px-4 py-3 text-slate-500" disabled>Nonaktif</button>
<label for="notes" class="mt-6 block font-medium">Catatan yang bisa di-resize</label>
<textarea id="notes" class="mt-2 h-24 w-full resize-y rounded-lg border p-3" placeholder="Tarik sudut bawah textarea"></textarea>`, "Ubah hover:-translate-y-1 menjadi hover:scale-105 dan duration-300 menjadi duration-700. Coba tombol dengan fokus keyboard.", "Hover hanya berlaku saat pointer berada pada elemen. Sediakan indikator focus-visible agar interaksi keyboard juga mendapat feedback."),

  propertySection("variants", "Variant responsive, state, dan nilai arbitrer", [
    "Sebuah utility dapat diberi prefix untuk menentukan kapan berlaku. Pada pendekatan mobile-first, class tanpa prefix berlaku pada semua lebar; sm: dan md: menambahkan aturan mulai breakpoint tertentu. md: tidak berarti hanya perangkat tablet.",
    "State seperti hover:, focus:, dan disabled: mengaktifkan utility saat kondisi tersebut terpenuhi. Bracket seperti w-[220px] memberi nilai khusus. Kombinasikan utility berdasarkan property dan kondisi yang jelas; hindari dua utility yang bertentangan pada property dan kondisi yang sama."
  ], [
    ["aturan dasar", "text-base · grid-cols-1", "Berlaku pada semua lebar kecuali ditimpa aturan lain."],
    ["media query minimum width", "sm:text-lg · md:grid-cols-2 · lg:p-8", "Bawaan sm ≥640px, md ≥768px, lg ≥1024px."],
    ["pseudo-class :hover / :focus", "hover:bg-blue-800 · focus:ring-2", "Styling sesuai interaksi pointer atau fokus."],
    ["pseudo-class :disabled", "disabled:opacity-50", "Styling saat elemen benar-benar memiliki status disabled."],
    ["nilai arbitrer", "w-[220px] · text-[22px] · bg-[#0f172a]", "Nilai khusus di luar skala bawaan."],
    ["prefers-reduced-motion", "motion-reduce:transition-none", "Menyesuaikan animasi dengan preferensi pengguna."]
  ], `<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <article class="rounded-lg bg-white p-4 shadow-sm md:p-8">
    <h2 class="text-xl font-bold md:text-2xl">Kartu responsif</h2>
    <p class="mt-3 text-slate-600">Dua kolom mulai lebar 640px.</p>
  </article>
  <article class="rounded-lg bg-[#0f172a] p-4 text-white md:p-8">
    <h2 class="text-[22px] font-semibold">Nilai khusus</h2>
    <button class="mt-4 rounded bg-blue-600 px-4 py-2 transition-colors hover:bg-blue-800 focus-visible:ring-2 focus-visible:ring-blue-300">Coba state</button>
  </article>
</div>`, "Ganti sm:grid-cols-2 menjadi md:grid-cols-2. Resize jendela dan ingat bahwa breakpoint contoh mengikuti lebar iframe, bukan seluruh halaman.", "Urutan class dalam atribut HTML tidak menjamin utility terakhir menang. Hindari kombinasi seperti p-2 p-8 pada kondisi yang sama; pilih satu atau bedakan breakpoint/state.")
];
