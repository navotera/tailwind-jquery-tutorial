// Bagian halaman menggunakan pola yang sama dengan halaman utility:
// narasi -> contoh -> Copy instruktur/Run -> pengamatan -> latihan, beserta bullet sidebar.
const reviewedLessons = lessonCatalog.flatMap((track) => track.groups.flatMap((group) => group.lessons));
function lessonById(id) {
  const lesson = reviewedLessons.find((item) => item.id === id);
  if (!lesson) throw new Error(`Materi tidak ditemukan: ${id}`);
  return lesson;
}
function example(id, sectionId, title, context, explanation, html, exercise, note, js, css) {
  const lesson = lessonById(id);
  (lesson.sections ||= []).push({
    id: sectionId, title, paragraphs: [context, explanation], exercise, note,
    codeFile: id.startsWith("jq-") ? "js" : "html",
    code: {
      html: `<main class="min-h-screen bg-slate-50 p-6 text-slate-900">\n${html}\n</main>`,
      css: css ?? lesson.code.css,
      js: js ?? "// Contoh tampilan ini tidak membutuhkan JavaScript."
    }
  });
}
const box = (text, classes = "") => `<div class="rounded bg-emerald-100 p-3 ${classes}">${text}</div>`;
const cells = ["A", "B", "C", "D"].map((text) => box(text)).join("\n");
const control = (id, text) => `<button id="${id}" class="rounded bg-emerald-700 px-4 py-2 text-white">${text}</button>`;

example("tw-flex-direction", "arah", "Row dan column", "Menu header dan sidebar dapat memakai daftar yang sama dengan arah berbeda.", "Flex-row mendatar dan flex-col menurun. Gap menjaga jarak antar-item tanpa mengubah isi mereka.", `<div class="flex flex-row gap-3">${cells}</div>`, "Ganti flex-row menjadi flex-col, lalu bandingkan bentuk pembungkus.", "Class arah ditempatkan pada induk flex.");
example("tw-flex-direction", "reverse", "Reverse mengubah urutan visual", "Kadang desain meminta urutan tampilan dibalik, sementara HTML tetap pada urutan awal.", "Flex-row-reverse menampilkan D dahulu. Baca HTML untuk memastikan urutan sumber masih A, B, C, D.", `<div class="flex flex-row-reverse gap-3">${cells}</div>`, "Coba flex-col-reverse dan baca urutannya dari atas.", "Reverse tidak mengubah urutan fokus keyboard atau pembacaan dokumen.");
example("tw-flex-wrap", "wrap", "Item boleh pindah baris", "Tiga label lebar tidak muat dalam pembungkus kecil. Kita mengizinkan baris baru.", "Flex-wrap membuat item pindah baris saat diperlukan. Shrink-0 menjaga lebarnya agar perilaku wrap jelas.", `<div class="flex max-w-xs flex-wrap gap-3">${["Satu", "Dua", "Tiga"].map((text) => box(text, "w-32 shrink-0")).join("\n")}</div>`, "Perbesar max-w-xs menjadi max-w-lg dan lihat berapa item yang muat.", "Wrap bergantung ukuran item dan ruang induk, bukan jumlah item tertentu.");
example("tw-flex-wrap", "nowrap", "Mempertahankan satu baris", "Deretan item sengaja tetap satu baris dan dapat digulir mendatar.", "Flex-nowrap bersama shrink-0 mempertahankan ukuran. Overflow-x-auto memberi akses saat item melampaui lebar.", `<div class="flex max-w-xs flex-nowrap gap-3 overflow-x-auto">${["Satu", "Dua", "Tiga"].map((text) => box(text, "w-32 shrink-0")).join("\n")}</div>`, "Hapus shrink-0 dari item dan amati penyusutannya.", "Jika satu baris wajib dipertahankan, sediakan cara mengakses isi yang keluar.");
example("tw-justify", "row", "Sumbu utama pada flex-row", "Dalam header, item dapat tersebar memenuhi ruang mendatar.", "Justify-between membagi ruang di antara item. Justify-evenly juga memberi jarak di kedua ujung.", `<div class="flex justify-between gap-2 border p-3">${cells}</div>`, "Bandingkan justify-center, justify-between, dan justify-evenly.", "Perbedaannya bergantung adanya ruang kosong dalam pembungkus.");
example("tw-justify", "column", "Sumbu utama pada flex-col", "Sekarang item disusun ke bawah, jadi ruang yang dibagi adalah ruang vertikal.", "H-80 menyediakan tinggi induk. Flex-col mengubah sumbu utama; justify-between menaruh item pertama di atas dan terakhir di bawah.", `<div class="flex h-80 flex-col justify-between border p-3">${box("Atas")}${box("Tengah")}${box("Bawah")}</div>`, "Ganti justify-between menjadi justify-center tanpa menghapus h-80.", "Justify mengikuti sumbu utama. Ia tidak selalu mengatur perataan mendatar.");

// Dua dokumen setara: isi, ukuran, warna, hover, dan fokus sama. Dokumen native
// benar-benar tanpa Tailwind; dokumen utility memuat library miliknya sendiri.
const nativeCardDocument = `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Kartu praktikum</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      padding: 24px;
      background: #f8fafc;
      font: 16px/1.5 system-ui, sans-serif;
    }
    .native-card {
      max-width: 384px;
      margin: 0 auto;
      padding: 16px;
      border-radius: 8px;
      background: #dbeafe;
      color: #1e40af;
    }
    .native-card h2 {
      margin: 0;
      font-size: 20px;
      line-height: 28px;
      font-weight: 600;
    }
    .native-card p {
      margin: 8px 0 0;
      line-height: 1.625;
    }
    .native-button {
      margin-top: 16px;
      padding: 8px 16px;
      border: 0;
      border-radius: 4px;
      background: #1d4ed8;
      color: #fff;
      font: inherit;
      cursor: pointer;
    }
    .native-button:hover { background: #1e40af; }
    .native-button:focus-visible {
      outline: 2px solid #1d4ed8;
      outline-offset: 2px;
    }
  </style>
</head>
<body>
  <main class="native-card">
    <h2>Praktikum Web</h2>
    <p>Belajar membuat komponen yang rapi dan mudah dibaca.</p>
    <button class="native-button">Mulai belajar</button>
  </main>
</body>
</html>`;
const tailwindCardDocument = `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Kartu praktikum</title>
  <script src="./vendor/tailwind-3.4.17.js"></script>
</head>
<body class="min-h-screen bg-slate-50 p-6">
  <main class="mx-auto max-w-sm rounded-lg bg-blue-100 p-4 text-blue-800">
    <h2 class="text-xl font-semibold">Praktikum Web</h2>
    <p class="mt-2 leading-relaxed">Belajar membuat komponen yang rapi dan mudah dibaca.</p>
    <button class="mt-4 cursor-pointer rounded bg-blue-700 px-4 py-2 text-white hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700 focus-visible:outline-offset-2">Mulai belajar</button>
  </main>
</body>
</html>`;
const framework = lessonById("tw-framework");
framework.sections = [
  {
    id: "css-biasa", title: "CSS native: tulis aturan sendiri", codeFile: "html", runtime: "none",
    paragraphs: ["Kita membuat kartu berisi judul, deskripsi, dan tombol. Seluruh tampilannya ditulis dengan CSS biasa; tidak ada script, utility, atau reset dari Tailwind pada contoh ini.", "Blok style mengatur halaman, kartu, tulisan, tombol, hover, dan fokus keyboard. Mahasiswa mengetik ulang contoh secara manual sebagai native.html; tombol Copy hanya untuk instruktur yang menyiapkan dokumen."],
    code: { html: nativeCardDocument, css: "/* Semua aturan CSS native sudah berada di <style> dokumen HTML. */", js: "// Kartu ini tidak membutuhkan JavaScript." },
    exercise: "Ganti padding .native-card dari 16px menjadi 32px, lalu amati ruang di dalam kartu.",
    note: "Preview contoh ini tidak memuat Tailwind maupun jQuery. Class native-card dan native-button adalah nama buatan kita, bukan utility."
  },
  {
    id: "utility", title: "Tailwind: gunakan aturan yang tersedia", codeFile: "html", runtime: "document",
    paragraphs: ["Sekarang kita membuat kartu dengan isi dan tampilan setara, termasuk hover serta tanda fokus. Aturan yang tadi ditulis pada style diganti dengan utility di HTML.", "p-4 menggantikan padding: 16px, rounded-lg menggantikan border-radius: 8px, dan font-semibold menggantikan font-weight: 600. Dokumen ini cukup memuat Tailwind lalu menyusun class; tidak ada CSS komponen buatan sendiri."],
    code: { html: tailwindCardDocument, css: "/* Tidak perlu CSS komponen tambahan. Tampilannya memakai utility Tailwind. */", js: "// Kartu ini tidak membutuhkan JavaScript." },
    exercise: "Ganti p-4 menjadi p-8 pada kartu untuk meniru perubahan padding native. Bandingkan hasil keduanya.",
    note: "Script lokal menjaga demo ini tetap bisa dipakai tanpa internet. Untuk file di folder lain, sesuaikan path atau ganti src dengan https://cdn.tailwindcss.com/3.4.17."
  }
];
framework.runtime = "none";
framework.code = { ...framework.sections[0].code };
framework.comparison = { left: "css-biasa", right: "utility" };
framework.assignmentText = "Run kedua versi, bandingkan tampilan, lalu ubah padding native dari 16px ke 32px dan utility Tailwind dari p-4 ke p-8. Periksa apakah hasilnya tetap setara.";
example("tw-install", "cuplikan", "Cuplikan dalam workspace", "Dalam aplikasi ini, Tailwind sudah dimuat. Kita cukup menulis elemen yang ingin dicoba.", "Run heading ini dan periksa apakah warna serta padding muncul. Ini pemeriksaan awal yang mudah sebelum membuat komponen lebih panjang.", '<h1 class="rounded bg-emerald-100 p-4 text-2xl font-bold">Tailwind tersedia</h1>', "Ubah bg-emerald-100 menjadi bg-amber-100.", "Cuplikan bukan dokumen HTML lengkap. Di luar workspace, kita masih perlu menyiapkan library.");
const installation = lessonById("tw-install");
installation.sections.push({
  id: "dokumen", title: "Instalasi lokal: file di folder project", codeFile: "html", runtime: "document",
  paragraphs: ["Jika library sudah disimpan di project, browser memuatnya melalui path lokal. Kita tidak perlu koneksi internet untuk menjalankan contoh ini.", "Untuk latihan, ketik ulang dokumen ini ke latihan.html di folder utama project. Script di head aktif, bukan komentar; path ./vendor/tailwind-3.4.17.js harus mengarah ke file yang benar. Copy disediakan bagi instruktur."],
  code: { html: '<!doctype html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Latihan Tailwind</title>\n  <script src="./vendor/tailwind-3.4.17.js"></script>\n</head>\n<body class="p-6">\n  <h1 class="text-3xl font-bold text-emerald-700">Halo dari file sendiri!</h1>\n</body>\n</html>', css: "/* CSS tambahan opsional. */", js: "// JavaScript tambahan opsional." },
  exercise: "Simpan sebagai latihan.html di folder utama project, buka lewat HTTP lokal, dan ubah warna judul.",
  note: "Run memuat script lokal dari dokumen ini, tanpa menyuntikkan Tailwind kedua kali. Jika file dipindahkan, sesuaikan lokasi vendor."
});
installation.sections.splice(1, 0, {
  id: "cdn", title: "Instalasi online: Play CDN", codeFile: "html", runtime: "document",
  paragraphs: ["Untuk percobaan cepat, kita bisa mengambil Tailwind langsung dari internet. Cukup satu baris script di head; tidak perlu mengunduh library ke folder vendor atau menyiapkan proses build.", "Untuk latihan, ketik ulang dokumen lengkap ini ke file HTML. Saat dibuka, browser mengambil Tailwind dari CDN, lalu memproses class pada body dan heading. Versi 3.4.17 dipilih agar sama dengan materi lainnya. Tombol Copy hanya untuk instruktur."],
  code: { html: '<!doctype html>\n<html lang="id">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Tailwind lewat CDN</title>\n  <script src="https://cdn.tailwindcss.com/3.4.17"></script>\n</head>\n<body class="min-h-screen bg-slate-50 p-6">\n  <h1 class="rounded bg-emerald-100 p-4 text-2xl font-bold text-emerald-800">Tailwind aktif dari internet!</h1>\n  <p class="mt-3 text-slate-600">Tidak ada file vendor lokal pada contoh ini.</p>\n</body>\n</html>', css: "/* Tampilannya berasal dari utility yang diproses Tailwind CDN. */", js: "// Tidak perlu JavaScript tambahan." },
  exercise: "Ketik ulang contoh ke latihan-cdn.html, buka dengan koneksi internet, lalu ganti bg-emerald-100 menjadi bg-amber-100. Jangan copy-paste kode contoh.",
  note: "Run benar-benar memakai CDN, bukan cadangan lokal. Koneksi dibutuhkan; kegagalan memuat resource ditampilkan di pesan preview. Play CDN untuk belajar/prototipe, bukan build produksi."
});
installation.code = { ...installation.sections.find((section) => section.id === "cdn").code };
installation.runtime = "document";
installation.assignmentText = "Bandingkan src CDN dengan src lokal. Simpan dua file HTML, ubah class yang sama, dan jelaskan versi mana yang membutuhkan internet.";
// Persiapan dokumen dahulu; cuplikan workspace hanya sesudah sumber library jelas.
installation.sections = ["cdn", "dokumen", "cuplikan"].map((id) => installation.sections.find((section) => section.id === id));
example("tw-responsive", "dasar", "Aturan dasar untuk layar sempit", "Mulailah dari tampilan yang tetap terbaca ketika ruang sedikit.", "grid-cols-1 menata empat kartu ke bawah. Aturan tanpa prefix berlaku pada semua lebar sampai aturan breakpoint menimpanya.", `<div class="grid grid-cols-1 gap-3">${cells}</div>`, "Ganti menjadi grid-cols-2 tanpa prefix dan lihat bahwa dua kolom langsung berlaku.", "Mobile-first berarti memulai dengan aturan dasar, bukan menulis prefix mobile:.");
example("tw-responsive", "breakpoint", "Menambah kolom saat ruang cukup", "Sekarang kartu boleh berdampingan ketika preview lebih lebar.", "sm: berlaku mulai 640px dan md: mulai 768px. Batas ini memakai lebar iframe, sehingga hasil bergantung ruang preview yang tersedia.", `<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">${cells}</div>`, "Ubah sm:grid-cols-2 menjadi sm:grid-cols-3, kemudian ubah lebar jendela.", "Breakpoint bawaan memakai min-width: aturan tetap berlaku pada layar lebih lebar, kecuali ditimpa aturan berikutnya.");

example("tw-display", "aliran", "Block, inline, dan inline-block", "Label kecil bisa berada di tengah kalimat, tetapi judul bagian biasanya perlu baris sendiri.", "Bandingkan tiga span di bawah. Inline-block diberi w-40 untuk menunjukkan bahwa ukuran kotaknya bisa diatur.", '<span class="block bg-blue-100 p-2">Block: baris sendiri</span>\n<span class="inline bg-amber-100">Inline: ikut teks</span>\n<span class="inline-block w-40 bg-emerald-100 p-2">Inline-block: kotak</span>', "Ganti inline-block menjadi block dan amati barisnya.", "Inline biasa tidak menerima width seperti kotak block atau inline-block.");
example("tw-display", "hidden", "Menghilangkan elemen dari layout", "Kita dapat menyimpan elemen di HTML tetapi tidak menampilkannya dahulu.", "Kotak B memakai hidden. A dan C terlihat berdampingan karena tempat B tidak dipertahankan.", `<div class="flex gap-3">${box("A")}${box("B", "hidden")}${box("C")}</div>`, "Hapus hidden dari B, lalu bandingkan dengan invisible.", "Hidden dan invisible punya pengaruh berbeda terhadap ruang yang dipakai.");
example("tw-position", "absolute", "Relative sebagai acuan absolute", "Badge stok perlu menempel pada sudut kartu produk.", "Induk relative menjadi acuan. Anak absolute dipindahkan dengan top-2 right-2 tanpa ikut mendorong paragraf.", '<div class="relative h-40 rounded bg-blue-100 p-4 pr-24">Kartu produk\n<span class="absolute right-2 top-2 rounded bg-blue-700 p-2 text-white">Tersedia</span></div>', "Pindahkan badge ke kiri bawah dengan mengganti dua class sisi.", "Isi diberi ruang supaya tidak tertutup badge; absolute tidak menyediakan ruang sendiri.");
example("tw-position", "sticky", "Sticky di area yang digulir", "Judul daftar sebaiknya tetap terlihat ketika kita menggulir item di bawahnya.", "Kotak luar h-48 overflow-auto adalah area scroll. Header sticky top-0 menempel saat mencapai sisi atas area ini.", '<div class="h-48 overflow-auto rounded border"><h3 class="sticky top-0 bg-emerald-700 p-3 text-white">Daftar peserta</h3><div class="space-y-3 p-3">' + Array.from({ length: 8 }, (_, i) => box(`Peserta ${i + 1}`)).join("\n") + '</div></div>', "Gulir daftar, kemudian ganti sticky menjadi static.", "Sticky perlu batas sisi seperti top-0 dan ruang untuk menggulir. Ancestor dengan overflow memengaruhi acuannya.");
example("tw-position", "fixed", "Fixed terhadap viewport preview", "Tombol bantuan kadang ingin tetap berada di sudut layar meskipun isi bergulir.", "Fixed keluar dari aliran normal. Pada aplikasi ini, viewportnya adalah iframe, sehingga tombol menempel pada sudut preview saja.", '<div class="h-[700px]">Gulir preview; tombol tetap di kanan bawah.</div><button class="fixed bottom-4 right-4 rounded-full bg-emerald-700 p-4 text-white">Bantuan</button>', "Ganti right-4 dengan left-4 dan coba gulir preview.", "Sisakan ruang agar fixed tidak menutup konten penting.");
example("tw-overflow", "scroll", "Memberi akses ke isi panjang", "Panel kecil bisa tetap memuat banyak informasi jika isinya dapat digulir.", "Induk h-28 lebih pendek daripada isi h-64. Overflow-auto menyediakan scroll saat isi melebihi batas.", '<div class="h-28 overflow-auto border p-3"><div class="h-64 bg-emerald-100 p-3">Atas<div class="pt-48">Bagian bawah</div></div></div>', "Ganti overflow-auto menjadi overflow-scroll dan amati scrollbar.", "Scroll terjadi di kotak ini, bukan pada seluruh halaman.");
example("tw-overflow", "potong", "Memotong atau membiarkan isi keluar", "Untuk area dekoratif, kelebihan isi kadang sengaja dipotong. Untuk informasi penting, keputusan ini perlu hati-hati.", "Overflow-hidden menyembunyikan bagian di luar ukuran kotak. Ganti ke visible untuk melihat perbedaannya.", '<div class="h-28 overflow-hidden border p-3"><div class="h-48 bg-blue-100 p-3">Konten lebih tinggi daripada kotak luar.</div></div>', "Bandingkan hidden dengan visible tanpa mengganti tinggi.", "Jangan memotong isi penting tanpa menyediakan cara lain untuk membacanya.");
example("tw-flex-sizing", "grow", "Grow mengambil ruang tersisa", "Label kecil ingin tetap ringkas, sedangkan area isi boleh membesar.", "Kotak Isi mendapat grow. Lebar yang tidak dipakai label dibagikan kepada item yang boleh tumbuh.", `<div class="flex gap-3">${box("Label", "w-24 shrink-0")}${box("Isi", "grow")}</div>`, "Hapus grow lalu tambahkan lagi. Coba beri grow pada kedua item.", "Jika dua item punya grow yang sama, ruang tambahan dibagi rata; ukuran akhir belum tentu sama.");
example("tw-flex-sizing", "shrink", "Shrink ketika ruang tidak cukup", "Dua kotak lebar dimasukkan ke pembungkus kecil. Browser harus mengecilkan sesuatu atau membiarkannya keluar.", "Pembungkus w-64 lebih kecil daripada total dua w-48. Kotak pertama shrink-0 menjaga lebarnya, sementara kotak kedua boleh mengecil.", `<div class="flex w-64 max-w-full gap-3 border p-2">${box("Tetap", "w-48 shrink-0")}${box("Mengecil", "w-48 shrink min-w-0")}</div>`, "Hapus shrink-0 pada kotak pertama dan bandingkan pembagian penyusutan.", "Min-width isi dapat menghalangi penyusutan; min-w-0 membantu ketika konten perlu mengalah pada ruang.");
example("tw-grid-template", "kolom", "Menentukan jumlah kolom", "Empat kartu dapat ditata dalam dua atau empat kolom tanpa mengubah isinya.", "Grid-cols-2 mengatur pembagian mendatar pada pembungkus. Tinggi tiap baris mengikuti isi jika tidak ditentukan.", `<div class="grid grid-cols-2 gap-3">${cells}</div>`, "Coba grid-cols-4 dan grid-cols-1.", "Jangan menyisakan dua class jumlah kolom tanpa prefix pada elemen yang sama.");
example("tw-grid-template", "baris", "Membagi tinggi menjadi baris", "Dashboard kadang butuh dua baris dengan tinggi seimbang.", "h-64 memberi tinggi pembungkus, lalu grid-rows-2 membaginya menjadi dua baris. Empat item dan dua kolom memenuhi kerangkanya.", `<div class="grid h-64 grid-cols-2 grid-rows-2 gap-3">${cells}</div>`, "Ganti grid-rows-2 dengan grid-rows-[1fr_2fr] dan lihat baris bawah lebih tinggi.", "Ukuran baris lebih mudah dibandingkan ketika tinggi pembungkus sudah ditentukan.");
example("tw-grid-span", "span", "Satu item memakai beberapa petak", "Kartu utama perlu dua kali ruang mendatar kartu biasa.", "Col-span-2 memakai dua kolom. Item berikutnya mengisi petak yang tersisa secara otomatis.", `<div class="grid grid-cols-3 gap-3">${box("Kartu utama", "col-span-2")}${box("Kartu kecil")}${box("Baris berikutnya")}</div>`, "Ganti col-span-2 menjadi col-span-3.", "Span menghitung jumlah petak yang dipakai, bukan garis awal.");
example("tw-grid-span", "garis", "Menentukan garis awal dan akhir", "Sekarang kita memilih tempat item, bukan hanya lebarnya.", "Grid tiga kolom punya empat garis pembatas. Col-start-2 col-end-4 menempatkan item dari garis kedua sampai keempat.", `<div class="grid grid-cols-3 grid-rows-2 gap-3">${box("Dua baris", "col-start-1 row-start-1 row-span-2")}${box("Garis 2 hingga 4", "col-start-2 col-end-4")}${box("Petak bawah", "col-start-2 row-start-2")}</div>`, "Ubah col-end-4 menjadi col-end-3 dan lihat lebarnya.", "End adalah batas akhir eksklusif. Garis kedua sampai keempat mencakup dua kolom.");
example("tw-align", "kelompok", "Items untuk semua anak", "Dua kotak dengan tinggi berbeda ingin kita sejajarkan pada satu baris.", "Items-center berlaku pada semua anak flex di sumbu silang. Tinggi induk menyediakan ruang untuk memilih posisi.", `<div class="flex h-48 items-center gap-3 border p-3">${box("Pendek")}${box("Lebih tinggi", "h-24")}</div>`, "Bandingkan items-start, items-center, dan items-end.", "Pada flex-row, sumbu silang vertikal. Pada flex-col arahnya berubah.");
example("tw-align", "satu-item", "Self untuk pengecualian satu anak", "Seluruh kelompok berada di tengah, tetapi satu tombol perlu menempel di bawah.", "Self-end pada anak kedua menimpa items-center untuk anak tersebut saja.", `<div class="flex h-48 items-center gap-3 border p-3">${box("Ikut induk")}${box("Pengecualian", "self-end")}</div>`, "Ubah self-end menjadi self-start tanpa mengganti items-center.", "Self mengatur item itu sendiri, bukan saudara-saudaranya.");
example("tw-place", "items", "Place-items memusatkan isi petak", "Satu pesan ingin berada di tengah area gridnya.", "Place-items-center menata item di kedua sumbu. Kotak kecil masih punya ruang kosong di sekelilingnya.", `<div class="grid h-48 place-items-center border">${box("Pesan di tengah")}</div>`, "Ubah menjadi place-items-end.", "Place-items memengaruhi posisi item dalam petak, bukan posisi seluruh kumpulan track.");
example("tw-place", "content", "Place-content memindahkan kumpulan track", "Grid kecil dapat ditempatkan di tengah pembungkus yang lebih besar.", "Dua kolom w-20 dan baris h-12 lebih kecil daripada induk h-64. Place-content-center memusatkan kumpulan track tersebut.", `<div class="grid h-64 grid-cols-[5rem_5rem] auto-rows-[3rem] place-content-center gap-2 border">${cells}</div>`, "Bandingkan place-content-center dengan place-content-start.", "Harus ada ruang tersisa agar perubahan content terlihat.");
example("tw-place", "self", "Place-self untuk satu item", "Dalam grid yang sama, satu item boleh memiliki posisi berbeda.", "Induk memakai place-items-start, tetapi anak kedua memakai place-self-end sehingga berpindah ke ujung petaknya.", `<div class="grid h-48 grid-cols-2 place-items-start border">${box("Aturan induk")}${box("Aturan sendiri", "place-self-end")}</div>`, "Ganti place-self-end menjadi place-self-center.", "Place-self menggabungkan align-self dan justify-self untuk item yang dipilih.");
example("tw-minmax", "lebar", "Lebar responsif dengan batas maksimum", "Paragraf perlu lebar yang nyaman, bukan memenuhi layar besar.", "W-full mengisi ruang yang tersedia, tetapi max-w-sm membatasinya. Pada ruang lebih sempit, kartu tetap dapat mengecil.", '<div class="w-full max-w-sm rounded bg-blue-100 p-4">Kartu ini tidak terus melebar mengikuti layar.</div>', "Ganti max-w-sm menjadi max-w-lg.", "Max-width adalah batas atas, bukan jaminan lebar tetap.");
example("tw-minmax", "tinggi", "Batas tinggi dan isi panjang", "Panel kecil tetap perlu menampilkan data yang bisa bertambah.", "Min-h-24 menyediakan tinggi minimum. Max-h-40 membatasi pembesaran, lalu overflow-auto memberi akses ke sisa isi.", '<div class="min-h-24 max-h-40 overflow-auto rounded border p-3"><div class="h-64 bg-emerald-100 p-3">Isi panjang<div class="pt-48">Akhir isi</div></div></div>', "Ubah max-h-40 menjadi max-h-24.", "Batas tinggi tanpa overflow yang sesuai dapat membuat isi keluar atau tidak terjangkau.");

// === Latihan variasi tata letak (layout) Flexbox dan Grid ===
// Tiap variasi memakai kotak berwarna kalem dengan label teks sehingga mahasiswa
// dapat membaca kerangka susunannya. Tombol Copy (untuk instruktur), Run, dan
// preview tersedia otomatis seperti contoh lain. rows diisi langsung agar
// tailwind-reference.js tidak perlu memetakan baris tabel untuk id baru ini.
function layout(lessonId, sectionId, title, context, explanation, html, exercise, note, rows) {
  const lesson = lessonById(lessonId);
  (lesson.sections ||= []).push({
    id: sectionId, title, paragraphs: [context, explanation], exercise, note, rows, codeFile: "html",
    code: {
      html: `<main class="min-h-screen bg-slate-50 p-6 text-slate-900">\n${html}\n</main>`,
      css: lesson.code.css,
      js: "// Contoh tata letak ini tidak membutuhkan JavaScript."
    }
  });
}
// Kotak kalem: latar lembut, border senada, teks terbaca. tone memakai palet bawaan.
const cell = (text, tone = "slate", extra = "") => `<div class="rounded border border-${tone}-300 bg-${tone}-100 p-4 text-${tone}-700 ${extra}">${text}</div>`;

// Section pendahuluan "Konsep dasar": diletakkan paling awal (unshift) agar menjadi
// bagian pertama yang dibaca sebelum variasi. explanation boleh berupa satu string
// atau array paragraf (untuk penjelasan bertahap). Penjelasan rinci/teori dipindahkan
// ke contoh berikutnya oleh tailwind-details.js agar intro tetap ringkas dan fokus.
function intro(lessonId, sectionId, title, context, explanation, html, exercise, note, rows) {
  const lesson = lessonById(lessonId);
  (lesson.sections ||= []).unshift({
    id: sectionId, title, paragraphs: [context, ...(Array.isArray(explanation) ? explanation : [explanation])], exercise, note, rows, codeFile: "html",
    code: {
      html: `<main class="min-h-screen bg-slate-50 p-6 text-slate-900">\n${html}\n</main>`,
      css: lesson.code.css,
      js: "// Contoh konsep dasar ini tidak membutuhkan JavaScript."
    }
  });
}
intro("tw-flex-direction", "konsep-dasar", "Konsep dasar: apa itu Flexbox",
  "Paling gampang, bayangkan menata barang berjajar dalam satu baris (atau satu tumpukan ke bawah): Flexbox membuat satu wadah induk mengatur anak-anaknya di sepanjang SATU arah saja. Pas untuk navbar, deretan tombol, atau menu.",
  [
    "Beberapa class bekerja sama membentuk layout flex, dan paling enak dipelajari berurutan satu per satu.",
    "(1) flex menyalakan mode flex pada wadah induk — tanpa ini, class flex lain tidak berpengaruh. (2) flex-row menata anak mendatar (default) dan flex-col menata menurun; inilah arah sumbu utama. (3) justify-* membagi ruang di sepanjang sumbu utama — misalnya justify-between menjauhkan anak ke tepi, justify-center memusatkannya.",
    "(4) items-* mengatur perataan di sumbu silang (tegak lurus sumbu utama), misalnya items-center membuat anak sejajar tengah. (5) gap-3 mengatur jarak antar-anak agar tidak menempel. Jadi alur berpikirnya: nyalakan flex → pilih arah → bagi ruang dengan justify → ratakan dengan items → rapikan jaraknya dengan gap. Contoh di bawah memakai flex dan gap-3; coba tambahkan justify-* dan items-* sendiri."
  ],
  `<p class="mb-2 font-semibold">Induk flex dengan tiga anak</p>\n<div class="flex gap-3 rounded border border-slate-300 bg-slate-100 p-3">\n  ${cell("Anak 1", "sky")}\n  ${cell("Anak 2", "sky")}\n  ${cell("Anak 3", "sky")}\n</div>\n<p class="mt-4 text-slate-600">Ganti flex menjadi flex flex-col untuk arah menurun; atau tambahkan justify-between dan items-center untuk mencoba kedua sumbu.</p>`,
  "Ketik induk flex berisi tiga anak. Lalu coba flex-col, justify-center, dan items-center satu per satu sambil mengamati perubahannya.",
  "Class flex selalu diletakkan pada induk; arah dan perataan diatur dari induk, bukan dari tiap anak.",
  [["display: flex", "flex", "Menyalakan mode flex pada wadah induk; tanpa ini class flex lain tidak berpengaruh."], ["flex-direction", "flex-row · flex-col", "Pilih arah sumbu utama: mendatar (default) atau menurun."], ["justify-content", "justify-start · justify-center · justify-between", "Bagi ruang anak di sepanjang sumbu utama."], ["align-items", "items-start · items-center · items-end", "Ratakan anak pada sumbu silang (tegak lurus sumbu utama)."], ["gap", "gap-3", "Jarak antar-anak tanpa margin manual."]]);
intro("tw-grid-template", "konsep-dasar", "Konsep dasar: apa itu Grid",
  "Paling gampang, bayangkan buku tulis kotak-kotak atau rak bersekat: Grid mengubah satu wadah menjadi kotak-kotak rapi, lalu kamu tinggal memasukkan isi ke dalam kotaknya. Pas dipakai saat ingin menata banyak kartu supaya sejajar dan tidak berantakan.",
  [
    "Beberapa class bekerja sama membentuk layout grid, dan paling enak dipelajari berurutan satu per satu.",
    "(1) grid menyalakan mode grid pada wadah induk — tanpa ini, class grid lain tidak berpengaruh. (2) grid-cols-3 menentukan jumlah KOLOM, yaitu kerangka mendatarnya; anak mengisi kolom berurutan dari kiri ke kanan. (3) grid-rows-2 menentukan jumlah BARIS bila ingin membagi tinggi — opsional, karena baris juga muncul otomatis mengikuti jumlah isi.",
    "(4) col-span-2 atau row-span-2 membuat SATU kotak melebar menempati beberapa kolom atau baris, misalnya header atau panel utama. (5) gap-3 mengatur jarak antar-kotak agar tidak saling menempel. Jadi alur berpikirnya: nyalakan grid → tentukan kolom (dan baris bila perlu) → lebarkan item tertentu dengan span → rapikan jaraknya dengan gap. Contoh di bawah memakai grid, grid-cols-3, gap-3, dan satu header col-span-3 sekaligus."
  ],
  `<p class="mb-2 font-semibold">Grid 3 kolom dengan satu header yang melebar</p>\n<div class="grid grid-cols-3 gap-3 rounded border border-slate-300 bg-slate-100 p-3">\n  ${cell("Header — col-span-3 (melebar 3 kolom)", "sky", "col-span-3")}\n  ${["Kotak 1", "Kotak 2", "Kotak 3", "Kotak 4", "Kotak 5", "Kotak 6"].map((t) => cell(t, "emerald")).join("\n  ")}\n</div>\n<p class="mt-4 text-slate-600">Header memakai col-span-3 sehingga melebar penuh; enam kotak di bawahnya mengisi tiga kolom menjadi dua baris.</p>`,
  "Ganti grid-cols-3 menjadi grid-cols-2 lalu grid-cols-6 (angka = kotak per baris). Lalu ubah header dari col-span-3 menjadi col-span-2 dan amati ruang yang tersisa di barisnya.",
  "grid dan grid-cols-* dipasang di WADAH induk, bukan di tiap anak. Kamu cukup menentukan jumlah kolom; jumlah baris muncul sendiri mengikuti banyaknya isi.",
  [["display: grid", "grid", "Menyalakan mode grid pada wadah induk; tanpa ini class grid lain tidak berpengaruh."], ["grid-template-columns", "grid-cols-3", "Menentukan jumlah KOLOM; anak mengisi kolom berurutan dari kiri ke kanan."], ["grid-template-rows", "grid-rows-2", "Menentukan jumlah BARIS bila ingin membagi tinggi; opsional, baris bisa muncul otomatis."], ["grid-column / grid-row: span", "col-span-2 · row-span-2", "Membuat satu kotak melebar menempati beberapa kolom atau baris (mis. header atau panel utama)."], ["gap", "gap-3", "Jarak antar-kotak di dalam grid tanpa menambah ruang di tepi luar."]]);

// --- Variasi Flexbox (satu dimensi: susun pada satu sumbu) ---
layout("tw-flex-direction", "tata-navbar", "Tata letak: navbar brand dan menu",
  "Header situs biasanya menaruh brand di kiri dan menu di kanan pada satu baris.",
  "justify-between mendorong dua kelompok ke tepi berlawanan; items-center menyejajarkannya vertikal. Grup menu memakai flex gap sendiri agar jaraknya rata.",
  `<nav class="flex items-center justify-between rounded border border-slate-300 bg-white p-3">\n  ${cell("Brand", "sky")}\n  <div class="flex gap-2">${cell("Menu 1", "slate")}${cell("Menu 2", "slate")}${cell("Menu 3", "slate")}</div>\n</nav>`,
  "Ganti justify-between menjadi justify-center lalu amati posisi brand dan menu.",
  "flex diletakkan pada induk nav; brand dan grup menu adalah dua anak langsung.",
  [["justify-content: space-between", "justify-between", "Anak pertama ke kiri, terakhir ke kanan, sisa ruang di tengah."], ["align-items: center", "items-center", "Sejajarkan anak pada sumbu silang (vertikal pada baris)."]]);
layout("tw-flex-direction", "tata-tengah", "Tata letak: konten di tengah layar",
  "Kotak login atau pesan kosong sering diletakkan tepat di tengah sebuah area.",
  "items-center memusatkan vertikal dan justify-center memusatkan horizontal. Tinggi h-64 menyediakan ruang agar pemusatan terlihat.",
  `<div class="flex h-64 items-center justify-center rounded border border-slate-300 bg-slate-100">\n  ${cell("Konten di tengah dua sumbu", "emerald")}\n</div>`,
  "Hapus h-64 dan amati mengapa pemusatan vertikal tidak lagi tampak.",
  "Pemusatan sumbu silang butuh tinggi induk; tanpa ruang kosong tidak ada yang bisa dipusatkan.",
  [["display: flex", "flex", "Aktifkan konteks flex pada induk."], ["justify-content / align-items: center", "justify-center · items-center", "Pusatkan anak pada kedua sumbu sekaligus."]]);
layout("tw-flex-direction", "tata-sidebar", "Tata letak: sidebar dan konten",
  "Dashboard sering memakai sidebar berlebar tetap dan konten yang mengisi sisanya.",
  "Sidebar w-48 shrink-0 menjaga lebarnya; konten grow mengambil seluruh ruang tersisa pada baris.",
  `<div class="flex gap-4">\n  ${cell("Sidebar", "sky", "w-48 shrink-0")}\n  ${cell("Konten utama mengisi sisa lebar", "slate", "grow")}\n</div>`,
  "Ganti w-48 menjadi w-64 dan amati lebar konten menyesuaikan.",
  "shrink-0 mencegah sidebar ikut mengecil ketika ruang menyempit.",
  [["lebar tetap (tidak menyusut)", "w-48 shrink-0", "Sidebar mempertahankan lebar awalnya."], ["flex-grow: 1", "grow", "Konten mengambil ruang kosong yang tersisa."]]);
layout("tw-flex-direction", "tata-kartu-sama", "Tata letak: tiga kartu sama lebar",
  "Tiga kartu fitur sebaiknya memiliki lebar yang sama rata.",
  "flex-1 pada setiap kartu membagi ruang dari basis nol sehingga ketiganya sama lebar.",
  `<div class="flex gap-4">\n  ${cell("Kartu 1", "violet", "flex-1")}\n  ${cell("Kartu 2", "violet", "flex-1")}\n  ${cell("Kartu 3", "violet", "flex-1")}\n</div>`,
  "Tambah satu kartu lagi dengan flex-1 dan amati lebar menyesuaikan otomatis.",
  "flex-1 menyamakan pembagian ruang, bukan menyamakan isi tiap kartu.",
  [["flex: 1 1 0%", "flex-1", "Bagi ruang rata dari basis nol untuk tiap kartu."]]);
layout("tw-flex-direction", "tata-media", "Tata letak: avatar dan teks (media object)",
  "Komentar atau profil menampilkan avatar di kiri dan teks keterangan di kanan.",
  "items-start menjajarkan keduanya dari atas; avatar shrink-0 berukuran tetap sedangkan blok teks grow mengisi sisa.",
  `<div class="flex items-start gap-4 rounded border border-slate-300 bg-white p-4">\n  ${cell("Avatar", "amber", "w-16 shrink-0 text-center")}\n  <div class="grow">\n    <p class="font-semibold">Nama pengguna</p>\n    <p class="text-slate-600">Teks keterangan berada di sebelah kanan avatar.</p>\n  </div>\n</div>`,
  "Ganti items-start menjadi items-center dan amati posisi avatar terhadap teks.",
  "Pola media object: gambar berukuran tetap, teks fleksibel mengisi sisa.",
  [["align-items: flex-start", "items-start", "Sejajarkan anak dari sisi atas baris."], ["flex-grow: 1", "grow", "Blok teks mengisi sisa lebar."]]);
layout("tw-flex-direction", "tata-footer-nempel", "Tata letak: footer menempel di bawah",
  "Kartu panel kadang perlu footer yang selalu di bawah meski kontennya pendek.",
  "flex-col menyusun anak vertikal; konten grow mengambil sisa tinggi sehingga footer terdorong ke dasar.",
  `<div class="flex h-64 flex-col rounded border border-slate-300 bg-white">\n  ${cell("Header", "sky", "m-3")}\n  <div class="grow p-3">Konten tumbuh mengisi bagian tengah.</div>\n  ${cell("Footer", "slate", "m-3")}\n</div>`,
  "Hapus grow pada konten dan amati footer naik mengikuti isi.",
  "Pada flex-col, grow membagi ruang vertikal, bukan horizontal.",
  [["flex-direction: column", "flex-col", "Susun anak dari atas ke bawah."], ["flex-grow: 1", "grow", "Konten mengisi sisa tinggi; footer terdorong ke bawah."]]);
layout("tw-flex-direction", "tata-chip", "Tata letak: deretan chip yang membungkus",
  "Daftar tag atau kategori perlu pindah baris sendiri saat tidak muat satu baris.",
  "flex-wrap mengizinkan chip turun ke baris berikutnya; gap menjaga jarak antarbaris dan antarchip.",
  `<div class="flex flex-wrap gap-2 rounded border border-slate-300 bg-slate-100 p-3">\n  ${["HTML", "CSS", "JavaScript", "Tailwind", "Flexbox", "Grid", "jQuery"].map((t) => cell(t, "emerald")).join("\n  ")}\n</div>`,
  "Ganti flex-wrap menjadi flex-nowrap dan perhatikan chip meluber keluar.",
  "Wrap bergantung pada lebar induk dan ukuran chip, bukan jumlah tertentu.",
  [["flex-wrap: wrap", "flex-wrap", "Izinkan anak pindah baris saat ruang habis."], ["gap", "gap-2", "Jarak seragam antarchip di semua baris."]]);
layout("tw-flex-direction", "tata-split", "Tata letak: dua panel setara",
  "Tampilan editor dan preview sering membagi layar menjadi dua panel setara.",
  "Dua anak flex-1 membagi lebar 50/50; h-48 memberi tinggi yang sama.",
  `<div class="flex h-48 gap-4">\n  ${cell("Panel kiri", "sky", "flex-1")}\n  ${cell("Panel kanan", "violet", "flex-1")}\n</div>`,
  "Ubah salah satu flex-1 menjadi flex-[2] agar satu panel dua kali lebih lebar.",
  "Rasio diatur lewat nilai flex, bukan lebar tetap.",
  [["flex: 1 1 0%", "flex-1", "Bagi lebar rata antara kedua panel."]]);
layout("tw-flex-direction", "tata-toolbar", "Tata letak: toolbar alat dan aksi",
  "Toolbar mengelompokkan alat di kiri dan tombol aksi utama di kanan.",
  "justify-between memisahkan grup alat dan tombol aksi; tiap grup memakai flex gap sendiri (flex bersarang).",
  `<div class="flex items-center justify-between rounded border border-slate-300 bg-white p-2">\n  <div class="flex gap-2">${cell("Bold", "slate")}${cell("Italic", "slate")}${cell("List", "slate")}</div>\n  ${cell("Simpan", "emerald")}\n</div>`,
  "Tambahkan satu tombol alat baru di grup kiri dan amati posisinya.",
  "Flex dapat bersarang: induk mengatur dua kelompok, kelompok mengatur isinya.",
  [["justify-content: space-between", "justify-between", "Pisahkan grup alat dan tombol aksi ke dua sisi."], ["display: flex", "flex gap-2", "Susun tombol dalam satu grup dengan jarak rata."]]);
layout("tw-flex-direction", "tata-menu-vertikal", "Tata letak: menu samping vertikal",
  "Menu samping menyusun tautan dari atas ke bawah dalam satu kolom.",
  "flex-col menata anak vertikal; gap menjaga jarak antarmenu tanpa margin manual.",
  `<nav class="flex w-48 flex-col gap-2 rounded border border-slate-300 bg-white p-3">\n  ${["Dashboard", "Materi", "Latihan", "Nilai"].map((t) => cell(t, "sky")).join("\n  ")}\n</nav>`,
  "Ganti flex-col menjadi flex-row dan amati menu berubah mendatar.",
  "Satu class arah menentukan sumbu utama seluruh menu.",
  [["flex-direction: column", "flex-col", "Tata tautan dari atas ke bawah."], ["gap", "gap-2", "Jarak seragam antartautan."]]);

// --- Variasi Grid (dua dimensi: track baris dan kolom bersama) ---
layout("tw-grid-template", "kisi-3kolom", "Tata letak: tiga kolom sejajar",
  "Tiga kolom sejajar adalah kerangka paling dasar sebuah grid.",
  "grid-cols-3 membuat tiga track sama lebar; gap memberi sela tanpa menambah ruang di tepi luar.",
  `<div class="grid grid-cols-3 gap-4">\n  ${["Kolom 1", "Kolom 2", "Kolom 3"].map((t) => cell(t, "slate")).join("\n  ")}\n</div>`,
  "Ganti grid-cols-3 menjadi grid-cols-4 lalu grid-cols-2.",
  "Jumlah kolom ditentukan induk; item mengisi kolom secara berurutan.",
  [["grid-template-columns: repeat(3, 1fr)", "grid-cols-3", "Tiga kolom sama lebar pada induk."], ["gap", "gap-4", "Sela antar-track tanpa ruang di tepi luar."]]);
layout("tw-grid-template", "kisi-responsif", "Tata letak: kartu responsif menambah kolom",
  "Katalog produk menambah kolom seiring layar melebar.",
  "grid-cols-1 berlaku di lebar kecil; sm:grid-cols-2 dan lg:grid-cols-3 menambah kolom pada breakpoint. Breakpoint mengikuti lebar preview.",
  `<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">\n  ${["Kartu 1", "Kartu 2", "Kartu 3", "Kartu 4", "Kartu 5", "Kartu 6"].map((t) => cell(t, "violet")).join("\n  ")}\n</div>`,
  "Perbesar dan perkecil jendela preview, lalu hitung jumlah kolom di tiap ukuran.",
  "Prefix breakpoint hanya menambahkan aturan pada lebar tertentu; dasar tetap satu kolom.",
  [["grid-template-columns (mobile-first)", "grid-cols-1", "Satu kolom sebagai dasar di layar kecil."], ["@media (min-width)", "sm:grid-cols-2 · lg:grid-cols-3", "Tambah kolom saat lebar mencapai breakpoint."]]);
layout("tw-grid-template", "kisi-sidebar", "Tata letak: kolom tetap dan kolom fleksibel",
  "Grid bisa mencampur lebar tetap dan lebar fleksibel dalam satu baris.",
  "grid-cols-[12rem_1fr] membuat kolom kiri selebar 12rem dan kolom kanan mengambil sisa ruang (1fr).",
  `<div class="grid grid-cols-[12rem_1fr] gap-4">\n  ${cell("Sidebar", "sky")}\n  ${cell("Konten utama", "slate")}\n</div>`,
  "Ubah 12rem menjadi 16rem dan amati konten menyesuaikan.",
  "Nilai dalam kurung siku memakai satuan literal; underscore mewakili spasi antar-track.",
  [["grid-template-columns: 12rem 1fr", "grid-cols-[12rem_1fr]", "Kolom tetap 12rem di kiri, sisa ruang (1fr) di kanan."]]);
layout("tw-grid-template", "kisi-halaman", "Tata letak: header, sidebar, konten, footer",
  "Tata letak halaman klasik: header dan footer penuh, sidebar sempit, konten lebar.",
  "Induk empat kolom. Header dan footer col-span-4 memenuhi baris; sidebar col-span-1 dan konten col-span-3 berbagi baris tengah.",
  `<div class="grid grid-cols-4 gap-3">\n  ${cell("Header", "sky", "col-span-4")}\n  ${cell("Sidebar", "emerald", "col-span-1")}\n  ${cell("Konten utama", "slate", "col-span-3")}\n  ${cell("Footer", "sky", "col-span-4")}\n</div>`,
  "Ubah konten menjadi col-span-2 dan sidebar col-span-2; amati keseimbangannya.",
  "Jumlah span sidebar dan konten harus total empat agar baris tengah penuh.",
  [["grid-column: span 4", "col-span-4", "Elemen memenuhi keempat kolom (header/footer)."], ["grid-column: span 1 / span 3", "col-span-1 · col-span-3", "Sidebar dan konten berbagi baris tengah."]]);
layout("tw-grid-template", "kisi-dashboard", "Tata letak: panel besar dan kartu kecil",
  "Dashboard sering punya satu panel besar dan beberapa kartu kecil di sampingnya.",
  "Panel utama col-span-2 row-span-2 mengisi blok 2x2; dua kartu kecil mengisi kolom ketiga.",
  `<div class="grid h-64 grid-cols-3 grid-rows-2 gap-3">\n  ${cell("Panel utama", "violet", "col-span-2 row-span-2")}\n  ${cell("Kartu A", "slate")}\n  ${cell("Kartu B", "slate")}\n</div>`,
  "Ganti row-span-2 menjadi row-span-1 dan amati petak yang tersisa.",
  "Span menghitung jumlah track; pastikan induk punya cukup kolom dan baris.",
  [["grid-column/row: span 2", "col-span-2 · row-span-2", "Panel memakai dua kolom dan dua baris."], ["grid-template-rows: repeat(2, 1fr)", "grid-rows-2", "Dua baris sebagai kerangka tinggi."]]);
layout("tw-grid-template", "kisi-galeri", "Tata letak: galeri rapat",
  "Galeri menata banyak gambar dalam kisi yang rapat.",
  "grid-cols-4 membuat empat kolom; delapan item otomatis mengisi dua baris lewat auto-placement.",
  `<div class="grid grid-cols-4 gap-2">\n  ${Array.from({ length: 8 }, (_, i) => cell(`Foto ${i + 1}`, "amber")).join("\n  ")}\n</div>`,
  "Ubah grid-cols-4 menjadi grid-cols-2 dan hitung jumlah baris.",
  "Item yang lebih banyak dari kolom akan membuat baris implisit otomatis.",
  [["grid-template-columns: repeat(4, 1fr)", "grid-cols-4", "Empat kolom sama lebar."], ["grid-auto-flow (otomatis)", "auto-placement", "Item berikutnya mengisi baris baru tanpa grid-rows."]]);
layout("tw-grid-template", "kisi-2baris", "Tata letak: dua baris tinggi berbeda",
  "Dua baris dengan tinggi berbeda, misalnya ringkasan kecil di atas dan detail besar di bawah.",
  "grid-rows-[1fr_2fr] membagi tinggi dengan rasio 1:2 setelah gap diperhitungkan; h-64 menyediakan tingginya.",
  `<div class="grid h-64 grid-rows-[1fr_2fr] gap-3">\n  ${cell("Baris 1 (1 bagian)", "sky")}\n  ${cell("Baris 2 (2 bagian)", "violet")}\n</div>`,
  "Balik menjadi grid-rows-[2fr_1fr] dan amati baris mana yang lebih tinggi.",
  "fr membagi sisa ruang secara proporsional, bukan piksel tetap.",
  [["grid-template-rows: 1fr 2fr", "grid-rows-[1fr_2fr]", "Baris kedua dua kali tinggi baris pertama."]]);
layout("tw-grid-template", "kisi-kartu-unggulan", "Tata letak: satu kartu lebih lebar",
  "Satu kartu unggulan ingin lebih lebar daripada kartu lain dalam kisi yang sama.",
  "col-span-2 membuat kartu unggulan memakai dua kolom; kartu lain mengisi sisa petak secara berurutan.",
  `<div class="grid grid-cols-3 gap-4">\n  ${cell("Unggulan", "emerald", "col-span-2")}\n  ${cell("Biasa 1", "slate")}\n  ${cell("Biasa 2", "slate")}\n  ${cell("Biasa 3", "slate")}\n</div>`,
  "Ganti col-span-2 menjadi col-span-3 lalu amati kartu lain turun baris.",
  "Span mengubah lebar satu item, bukan template seluruh induk.",
  [["grid-column: span 2", "col-span-2", "Kartu unggulan memakai dua kolom."]]);
layout("tw-grid-template", "kisi-form", "Tata letak: form dua kolom",
  "Form dua kolom menata field berpasangan dengan garis yang rapi.",
  "grid-cols-2 menata dua field per baris; field panjang memakai col-span-2 agar memenuhi lebar.",
  `<div class="grid grid-cols-2 gap-4 rounded border border-slate-300 bg-white p-4">\n  ${cell("Nama depan", "slate")}\n  ${cell("Nama belakang", "slate")}\n  ${cell("Email", "slate", "col-span-2")}\n  ${cell("Alamat", "slate", "col-span-2")}\n</div>`,
  "Buat field Email kembali satu kolom dengan menghapus col-span-2.",
  "Grid menjaga garis kolom tetap sejajar antarbaris form.",
  [["grid-template-columns: repeat(2, 1fr)", "grid-cols-2", "Dua field sejajar per baris."], ["grid-column: span 2", "col-span-2", "Field panjang memenuhi kedua kolom."]]);
layout("tw-grid-template", "kisi-flex-kartu", "Tata letak: grid di luar, flex di dalam kartu",
  "Grid menata kumpulan kartu, sedangkan isi tiap kartu memakai flex.",
  "Induk grid-cols-2 membuat dua kolom kartu. Di dalam kartu, flex justify-between memisahkan judul dan tombol.",
  `<div class="grid grid-cols-2 gap-4">\n  ${["Kelas HTML", "Kelas CSS"].map((t) => `<article class="rounded border border-amber-300 bg-white p-3">\n    <div class="flex items-center justify-between gap-2">\n      <h3 class="font-semibold">${t}</h3>\n      ${cell("Lihat", "sky")}\n    </div>\n  </article>`).join("\n  ")}\n</div>`,
  "Ubah grid-cols-2 menjadi grid-cols-1; perhatikan baris judul-tombol tetap flex.",
  "Model layout berlaku per induk: grid di luar, flex di dalam kartu.",
  [["display: grid (luar)", "grid-cols-2", "Dua kolom kartu pada induk."], ["display: flex (dalam)", "flex justify-between", "Judul dan tombol dipisah di dalam kartu."]]);
layout("tw-grid-template", "kisi-sel-flex", "Tata letak: tiap sel memusatkan isinya",
  "Setiap sel grid bisa memusatkan isinya sendiri dengan flex.",
  "grid-cols-3 membagi tiga sel sama lebar; tiap sel memakai flex items-center justify-center untuk memusatkan label.",
  `<div class="grid grid-cols-3 gap-3">\n  ${["Beranda", "Materi", "Kontak"].map((t) => `<div class="flex items-center justify-center rounded border border-sky-300 bg-sky-100 p-4 text-sky-700">${t}</div>`).join("\n  ")}\n</div>`,
  "Tambah satu sel keempat dan amati grid membuat baris baru.",
  "Grid mengatur kerangka sel; flex mengatur isi di dalam sel.",
  [["grid-template-columns: repeat(3, 1fr)", "grid-cols-3", "Tiga sel sama lebar."], ["justify/align center (dalam sel)", "flex items-center justify-center", "Pusatkan label di tiap sel."]]);
layout("tw-grid-template", "kisi-footer", "Tata letak: footer multi-kolom",
  "Footer situs menata beberapa kolom tautan yang rapi.",
  "grid-cols-3 membuat tiga kolom kategori; tiap kolom memakai flex-col agar judul dan tautannya menurun.",
  `<footer class="grid grid-cols-3 gap-6 rounded border border-slate-300 bg-white p-4">\n  ${["Produk", "Perusahaan", "Bantuan"].map((judul) => `<div class="flex flex-col gap-1">\n    <p class="font-semibold">${judul}</p>\n    <span class="text-slate-600">Tautan 1</span>\n    <span class="text-slate-600">Tautan 2</span>\n  </div>`).join("\n  ")}\n</footer>`,
  "Ubah grid-cols-3 menjadi grid-cols-2 dan amati kolom ketiga turun.",
  "Grid membagi kolom luar; flex-col menyusun isi tiap kolom.",
  [["grid-template-columns: repeat(3, 1fr)", "grid-cols-3", "Tiga kolom kategori footer."], ["flex-direction: column (dalam)", "flex flex-col", "Judul dan tautan menurun di tiap kolom."]]);

example("tw-font", "keluarga", "Font family: memilih karakter huruf", "Isi artikel dan contoh kode punya kebutuhan berbeda. Kita memilih keluarga huruf sebelum membahas besar-kecilnya.", "Tiga paragraf memakai ukuran yang sama, tetapi font-sans, font-serif, dan font-mono berbeda. Bandingkan bentuk huruf serta lebar karakter.", '<div class="space-y-4 text-xl"><p class="font-sans">Huruf sans untuk antarmuka.</p><p class="font-serif">Huruf serif untuk nuansa artikel.</p><p class="font-mono">const nama = "Ayu";</p></div>', "Tukar font-serif menjadi font-sans tanpa mengganti ukuran.", "Font yang tersedia pada perangkat dapat memengaruhi tampilan akhir keluarga font.");
example("tw-font", "ukuran", "Font size: membangun hierarki", "Judul perlu terlihat lebih penting daripada keterangan kecil.", "Text-3xl, text-base, dan text-sm membedakan tingkat informasi. Semuanya memakai keluarga huruf yang sama agar pengaruh ukuran jelas.", '<h3 class="text-3xl">Judul artikel</h3><p class="mt-3 text-base">Isi artikel yang kita baca.</p><p class="mt-3 text-sm">Keterangan tambahan.</p>', "Ubah judul menjadi text-5xl dan bandingkan kenyamanan baca.", "Ukuran teks Tailwind biasanya juga memiliki line-height bawaan.");
example("tw-font", "ketebalan", "Font weight: memberi penekanan", "Informasi penting dapat ditekankan tanpa memperbesar seluruh tulisan.", "Bandingkan font-normal, font-semibold, dan font-bold dengan ukuran sama. Ketebalan punya tugas berbeda dari ukuran.", '<div class="space-y-3 text-xl"><p class="font-normal">Informasi biasa</p><p class="font-semibold">Subjudul</p><p class="font-bold">Pesan penting</p></div>', "Ganti font-bold menjadi font-light.", "Jangan menebalkan semua isi sekaligus; penekanan kehilangan arti jika semua sama kuat.");
example("tw-font", "baris", "Line height: ruang untuk membaca", "Paragraf beberapa baris terasa sesak jika jarak baris terlalu rapat.", "Dua paragraf memiliki teks dan ukuran sama. Yang berbeda hanya leading-tight serta leading-loose, sehingga ruang antarbaris bisa dibandingkan.", '<div class="max-w-xs space-y-5"><p class="leading-tight">Mahasiswa membaca paragraf ini untuk melihat pengaruh jarak antarbaris. Teks sengaja cukup panjang supaya menjadi beberapa baris.</p><p class="leading-loose">Mahasiswa membaca paragraf ini untuk melihat pengaruh jarak antarbaris. Teks sengaja cukup panjang supaya menjadi beberapa baris.</p></div>', "Ganti leading-loose menjadi leading-relaxed.", "Leading mengatur jarak baris dalam teks, bukan jarak antarparagraf.");
example("tw-text", "perataan", "Text alignment: kiri, tengah, kanan", "Judul poster mungkin di tengah, tetapi paragraf panjang lebih nyaman rata kiri.", "Ketiga paragraf memakai pembungkus yang sama. Text-left, text-center, dan text-right memindahkan posisi teks di dalamnya.", '<div class="space-y-3 rounded border p-4"><p class="text-left">Tulisan di kiri</p><p class="text-center">Tulisan di tengah</p><p class="text-right">Tulisan di kanan</p></div>', "Ubah text-right menjadi text-center.", "Perataan teks tidak memusatkan kotak itu sendiri. Untuk posisi kotak, gunakan pengaturan layout.");
example("tw-text", "warna-dekorasi", "Warna dan dekorasi", "Tautan atau pesan penting dapat diberi warna dan garis agar mudah dikenali.", "Text-blue-700 memberi warna, underline menambah garis bawah, dan line-through mencoret. Kita bisa mengubah satu tanpa mengubah yang lain.", '<p class="text-blue-700 underline decoration-2">Contoh tautan</p><p class="mt-3 text-slate-500 line-through">Harga sebelumnya</p>', "Ganti underline menjadi overline dan ubah warna teks.", "Jangan mengandalkan warna saja untuk menyampaikan status penting.");
example("tw-text", "transform", "Text transform tanpa mengubah isi", "Label kadang perlu huruf besar walaupun data aslinya tidak ditulis begitu.", "Uppercase, lowercase, dan capitalize mengubah tampilan tulisan. Jika membaca HTML, isi kata tetap sesuai yang kita tulis.", '<p class="uppercase">Belajar Tailwind</p><p class="mt-3 lowercase">BELAJAR TAILWIND</p><p class="mt-3 capitalize">belajar tailwind bersama</p>', "Ganti uppercase menjadi normal-case.", "Capitalize mengubah awal kata secara visual, bukan memperbaiki aturan penulisan bahasa.");
example("tw-bg-position", "repeat", "Mengulang pola kecil", "Wallpaper dibuat dari gambar kecil yang diulang, bukan gambar besar yang diunduh.", "Pattern mengambil SVG dari CSS bawaan. Bg-repeat dan ukuran 40px membuat ubin yang teratur.", '<div class="pattern h-48 bg-repeat bg-[length:40px_40px]"></div>', "Ganti ukuran menjadi bg-[length:80px_80px].", "Ukuran ubin dan pengulangan adalah dua pengaturan terpisah.");
example("tw-bg-position", "size", "Cover dan contain", "Gambar berbeda rasio dengan kotaknya. Kita memilih antara menutup seluruh kotak atau menjaga seluruh gambar terlihat.", "Gambar yang sama dipakai pada dua kotak memanjang. Cover memenuhi area dengan kemungkinan terpotong; contain menyisakan ruang jika rasio tidak cocok.", '<div class="pattern h-28 bg-cover bg-center bg-no-repeat"></div><div class="pattern mt-4 h-28 bg-contain bg-center bg-no-repeat"></div>', "Tukar cover dan contain, lalu ubah h-28 menjadi h-48.", "Bg-no-repeat membuat ruang kosong contain lebih mudah terlihat.");
example("tw-bg-position", "position", "Memilih posisi gambar", "Gambar kecil tampil sekali, tetapi kita ingin memilih apakah berada di kiri, tengah, atau kanan.", "Bg-no-repeat mencegah pengulangan. Ukuran dibuat tetap supaya bg-left, bg-center, dan bg-right benar-benar memindahkan gambar.", '<div class="pattern h-48 border bg-left bg-no-repeat bg-[length:80px_80px]"></div>', "Bandingkan bg-left, bg-center, dan bg-right.", "Jika gambar sudah menutup seluruh area, perubahan posisi bisa lebih sulit dilihat.");
example("tw-divide-ring", "divide", "Divide untuk pemisah daftar", "Daftar menu perlu garis di antaraitem, bukan border pada setiap sisi tiap item.", "Divide-y ditulis pada pembungkus dan bekerja pada anak langsung. Padding pada setiap item memberi ruang dari garis.", '<div class="divide-y divide-slate-300 rounded border"><p class="p-3">Profil</p><p class="p-3">Pengaturan</p><p class="p-3">Bantuan</p></div>', "Ubah divide-y menjadi divide-y-4 dan warna ke divide-blue-300.", "Anak yang dibungkus elemen tambahan dapat mengubah letak pemisah.");
example("tw-divide-ring", "ring", "Ring sebagai penanda fokus", "Ketika tombol mendapat fokus keyboard, kita ingin penanda yang jelas tanpa menggeser layout.", "Focus-visible:ring-2 menambahkan garis luar pada fokus yang perlu terlihat. Ring-offset-2 memberi celah dari tombol.", '<button class="rounded bg-emerald-700 p-3 text-white focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">Fokus dengan Tab</button>', "Gunakan Tab lalu ubah ring-2 menjadi ring-4.", "Jangan menghilangkan outline bawaan tanpa memastikan penggantinya terlihat.");
const filterTile = '<div class="h-32 rounded bg-gradient-to-r from-blue-500 to-rose-400 p-5 text-xl font-bold text-white FILTER">Objek berwarna</div>';
example("tw-filters", "blur", "Blur: mengaburkan tampilan", "Kita membandingkan ketajaman tanpa mengubah isi objek.", "Blur-sm mengaburkan seluruh kotak beserta teksnya. Ganti blur-none untuk kembali tajam.", filterTile.replace("FILTER", "blur-sm"), "Bandingkan blur-sm, blur-md, dan blur-none.", "Blur tidak menyembunyikan data dari pembaca kode atau alat aksesibilitas.");
example("tw-filters", "brightness-contrast", "Brightness dan contrast", "Warna yang sama bisa tampak lebih terang atau memiliki perbedaan terang-gelap lebih kuat.", "Kotak pertama brightness-75, kotak kedua contrast-150. Efek dipisahkan supaya mudah mengenali tugas masing-masing.", filterTile.replace("FILTER", "brightness-75") + '<div class="h-4"></div>' + filterTile.replace("FILTER", "contrast-150"), "Ganti brightness-75 menjadi brightness-125, lalu contrast-150 menjadi contrast-100.", "Nilai 100 adalah keadaan normal untuk brightness dan contrast.");
example("tw-filters", "grayscale", "Grayscale: mengurangi warna", "Ilustrasi berwarna dapat dibuat hitam-putih tanpa file baru.", "Grayscale mengurangi warna sampai tampak abu-abu. Grayscale-0 mengembalikan tampilan berwarna.", filterTile.replace("FILTER", "grayscale"), "Ganti grayscale menjadi grayscale-0.", "Efek visual tidak mengubah isi sumber atau file gambar.");
example("tw-filters", "warna", "Sepia, saturate, dan hue rotate", "Filter lain dapat mengubah nuansa serta intensitas warna tanpa mengganti palet asal.", "Sepia memberi nuansa kecokelatan, saturate-200 memperkuat kejenuhan, dan hue-rotate-90 menggeser hue. Setiap kotak memakai satu efek agar perbedaannya jelas.", filterTile.replace("FILTER", "sepia") + '<div class="h-4"></div>' + filterTile.replace("FILTER", "saturate-200") + '<div class="h-4"></div>' + filterTile.replace("FILTER", "hue-rotate-90"), "Coba saturate-0 dan hue-rotate-180 pada kotak masing-masing.", "Saturate mengubah kejenuhan, bukan tingkat terang yang diatur brightness.");
const tableDemo = (classes) => `<table class="w-full ${classes}"><thead><tr><th class="border p-2 text-left">Nama</th><th class="border p-2 text-left">Catatan</th></tr></thead><tbody><tr><td class="border p-2">Ayu</td><td class="border p-2 break-words">Membawa banyak contoh untuk presentasi praktikum hari ini.</td></tr><tr><td class="border p-2">Budi</td><td class="border p-2">Siap</td></tr></tbody></table>`;
example("tw-tables", "layout", "Table auto dan fixed", "Satu kolom pendek dan satu panjang membantu kita melihat cara browser membagi lebar.", "Table-auto mempertimbangkan isi. Ganti dengan table-fixed sambil mempertahankan w-full untuk pembagian yang lebih tetap.", tableDemo("table-auto border-collapse"), "Bandingkan auto dan fixed, lalu tambahkan teks panjang pada nama.", "Pada fixed, isi panjang mungkin perlu dibungkus agar tidak melampaui sel.");
example("tw-tables", "border", "Garis sel: collapse dan separate", "Garis antarsel bisa bertemu menjadi satu atau punya jarak terpisah.", "Border-separate dan border-spacing-2 memberi ruang antarsel. Border-collapse menyatukan garis dan mengabaikan spacing tersebut.", tableDemo("table-fixed border-separate border-spacing-2"), "Ganti border-separate menjadi border-collapse.", "Border-spacing bekerja pada tabel dengan model garis terpisah.");
example("tw-transitions", "duration", "Duration: berapa lama berubah?", "Perubahan warna sebaiknya cukup terlihat, tetapi tidak membuat pengguna menunggu terlalu lama.", "Hover dan fokus mengubah latar. Transition-colors memilih perubahan warna, duration-1000 memberi waktu satu detik.", '<button class="rounded bg-blue-700 p-4 text-white transition-colors duration-1000 hover:bg-rose-600 focus:bg-rose-600 motion-reduce:transition-none">Hover atau fokus</button>', "Bandingkan duration-150 dengan duration-1000.", "Transisi membutuhkan keadaan awal dan akhir yang berbeda.");
example("tw-transitions", "easing", "Easing dan delay", "Dua gerakan berdurasi sama dapat terasa berbeda karena cara mempercepatnya.", "Transition-transform menargetkan transform. Ease-in-out mengubah percepatan dan delay-150 menunda awal perubahan.", '<button class="m-6 rounded bg-emerald-700 p-4 text-white transition-transform duration-700 ease-in-out delay-150 hover:translate-x-8 focus:translate-x-8 motion-reduce:transition-none">Hover untuk bergeser</button>', "Coba ease-linear tanpa delay, lalu kembalikan delay-150.", "Bedakan delay sebelum mulai dengan duration selama perubahan.");
example("tw-resize-select", "resize", "Resize pada textarea", "Pengguna bisa diberi kebebasan memperpanjang kotak catatan tanpa mengubah lebarnya.", "Resize-y hanya mengizinkan perubahan vertikal. Overflow-auto menjaga isi tetap dapat digulir.", '<label for="note">Catatan</label><textarea id="note" class="mt-2 h-24 w-full resize-y overflow-auto rounded border p-3">Tarik pegangan sudut kotak.</textarea>', "Bandingkan resize-y, resize, dan resize-none.", "Pegangan bisa berbeda menurut browser dan tidak selalu tersedia pada perangkat sentuh.");
example("tw-resize-select", "select", "Select pada teks", "Label dekoratif mungkin tidak perlu terseleksi, tetapi pesan dan kode sebaiknya bisa disalin.", "Bandingkan select-none, select-text, dan select-all dengan menyeret pointer atau mengeklik tulisan.", '<p class="select-none">Label: tidak diseleksi.</p><p class="mt-4 select-text">Materi: boleh dipilih sebagian.</p><p class="mt-4 select-all">Kode contoh: pilih seluruh teks.</p>', "Ganti select-none menjadi select-text.", "Hindari select-none pada isi pembelajaran yang ingin dicatat mahasiswa.");

// Contoh jQuery menampilkan JavaScript sebagai blok utama. HTML tetap tersedia
// di workspace agar selector dan struktur DOM mudah dibandingkan.
const selectorHtml = '<h3 id="title" class="text-xl">Daftar peserta</h3><ul class="mt-3 space-y-2"><li class="item">Ayu</li><li class="item">Budi</li><li>Citra (tanpa class item)</li></ul>';
example("jq-selectors", "id", "Selector ID: satu sasaran", "Hanya judul yang ingin kita ubah, bukan seluruh daftar.", "#title cocok dengan id pada heading. Text mengganti judul tanpa menyentuh item lain.", selectorHtml, "Ganti isi judul pada text(...).", "ID harus unik agar sasarannya tidak membingungkan.", '$("#title").text("Peserta praktikum");');
example("jq-selectors", "class", "Selector class: beberapa sasaran", "Ayu dan Budi punya penanda yang sama, sedangkan Citra tidak.", "Titik pada .item memilih kedua li yang memiliki class itu. AddClass memberi tanda pada hasil pilihan.", selectorHtml, "Tambahkan class item pada Citra dan jalankan ulang.", "Satu selector class dapat menghasilkan beberapa elemen.", '$(".item").addClass("rounded bg-emerald-100 p-3");');
example("jq-selectors", "tag", "Selector tag: semua jenis elemen", "Sekarang seluruh item daftar perlu tampilan yang sama, termasuk yang tanpa class.", "Selector li memilih berdasarkan tag, bukan ID atau class. Semua li pada contoh ikut berubah.", selectorHtml, "Ganti li dengan h3 dan prediksi sasaran baru.", "Pada halaman besar, persempit selector agar tidak mengubah daftar yang tidak dimaksud.", '$("li").addClass("rounded bg-blue-100 p-3");');
example("jq-events", "click", "Click: menunggu tombol", "Jumlah klik baru bertambah ketika pengguna menekan tombol.", "Handler disiapkan saat kode dimuat, tetapi count berubah saat click terjadi. Text menampilkan nilai terbaru.", buttonHtml, "Tambahkan handler dblclick untuk mengembalikan count ke nol.", "Run ulang memulai ulang contoh, termasuk nilai count.", 'let count = 0;\n$("#action").on("click", function () {\n  count += 1;\n  $("#result").text("Jumlah klik: " + count);\n});');
example("jq-events", "input", "Input: mengikuti ketikan", "Sapaan dapat diperbarui ketika pengguna mengetik, tanpa menunggu tombol.", "Event input membaca nilai terbaru lewat val. Function biasa membuat this menunjuk input yang menerima event.", '<label for="name">Nama</label><input id="name" class="block rounded border p-2"><p id="result" class="mt-3" role="status">Silakan ketik nama.</p>', "Tampilkan pesan khusus jika nama kosong.", "Input merespons perubahan nilai, termasuk banyak tindakan selain tombol keyboard.", '$("#name").on("input", function () {\n  $("#result").text("Halo, " + $(this).val());\n});');
const listHtml = control("add", "Tambah di akhir") + ' ' + control("prepend", "Tambah di awal") + '<ul id="list" class="mt-3 space-y-2"><li class="rounded bg-blue-100 p-3">Item awal</li></ul>';
example("jq-dom", "tambah", "Append dan prepend", "Item baru boleh masuk ke akhir daftar atau menjadi yang pertama.", "Elemen li dibuat dahulu, lalu isinya diisi dengan text. Append dan prepend berbeda pada tempat memasukkannya.", listHtml, "Klik kedua tombol dan jelaskan urutan item.", "Text menjaga isi sebagai tulisan biasa, bukan markup pengguna.", 'let count = 1;\nfunction item() {\n  return $("<li>").addClass("rounded bg-blue-100 p-3").text("Item " + count++);\n}\n$("#add").on("click", () => $("#list").append(item()));\n$("#prepend").on("click", () => $("#list").prepend(item()));');
example("jq-dom", "hapus", "Remove dan delegasi event", "Kita tidak tahu berapa item yang akan ditambahkan. Handler tetap harus menangani item baru.", "Pendengar ditempatkan pada #list dengan selector li. Klik dari item merambat ke pembungkus, lalu this menunjuk item yang cocok.", control("add", "Tambah item") + '<p class="mt-3">Klik item untuk menghapusnya.</p><ul id="list" class="mt-3 space-y-2"><li class="rounded bg-blue-100 p-3">Item awal</li></ul>', "Tambah tiga item, lalu hapus item tengah.", "Handler langsung pada li saat awal tidak otomatis terpasang pada li yang dibuat kemudian.", 'let count = 1;\n$("#add").on("click", function () {\n  $("#list").append($("<li>").addClass("rounded bg-blue-100 p-3").text("Item " + count++));\n});\n$("#list").on("click", "li", function () {\n  $(this).remove();\n});');
const classHtml = control("add", "Pilih") + ' ' + control("remove", "Batalkan") + '<p id="result" class="mt-4 rounded p-4">Status pilihan</p>';
example("jq-classes", "add-remove", "Menambah dan menghapus class", "Dua tombol dapat memberi tindakan yang tegas: pilih atau batalkan.", "AddClass menambahkan tampilan pilihan, removeClass menghapusnya. Mengklik Pilih dua kali tidak membuat class ganda.", classHtml, "Tambahkan text-emerald-900 pada kedua daftar class.", "Hapus class yang sama dengan yang ditambahkan agar tampilan kembali konsisten.", 'const selected = "bg-emerald-200 font-bold";\n$("#add").on("click", () => $("#result").addClass(selected));\n$("#remove").on("click", () => $("#result").removeClass(selected));');
example("jq-classes", "toggle", "Toggle dan membaca status", "Satu tombol dapat membalik pilihan sekaligus memberi pesan status.", "Setelah toggleClass, hasClass membaca hasil akhirnya. Aria-pressed ikut berubah agar status bukan hanya informasi warna.", control("action", "Ubah pilihan") + '<p id="result" class="mt-4 rounded p-4">Belum dipilih.</p>', "Ubah teks status untuk dua keadaan.", "Status aksesibilitas harus mengikuti keadaan tampilan, bukan nilai sebelum toggle.", '$("#action").attr("aria-pressed", "false").on("click", function () {\n  const panel = $("#result").toggleClass("bg-emerald-200 font-bold");\n  const active = panel.hasClass("bg-emerald-200");\n  $(this).attr("aria-pressed", String(active));\n  panel.text(active ? "Sudah dipilih." : "Belum dipilih.");\n});');
example("jq-attributes", "attr", "Attr untuk atribut HTML", "Tooltip membantu menjelaskan tombol tanpa menambah paragraf panjang.", "Attr mengisi title pada tombol. Pesan di bawahnya juga ditampilkan agar perubahan dapat dibaca pada perangkat tanpa hover.", buttonHtml, "Ganti isi title dan pesan hasilnya.", "Title adalah contoh atribut, bukan pengganti label atau instruksi yang wajib terlihat.", '$("#action").on("click", function () {\n  $(this).attr("title", "Tombol sudah diklik");\n  $("#result").text("Title: " + $(this).attr("title"));\n});');
example("jq-attributes", "prop", "Prop untuk checked dan disabled", "Tombol harus mengikuti keadaan persetujuan saat ini, bukan atribut awal HTML.", "Change berjalan ketika checkbox berubah. Prop membaca checked dan mengatur disabled pada tombol sesuai hasilnya.", '<label><input id="agree" type="checkbox"> Saya setuju</label><button id="submit" class="mt-3 block rounded bg-blue-700 p-3 text-white disabled:opacity-40" disabled>Kirim</button><p id="result" class="mt-3" role="status">checked: false</p>', "Centang dan hapus centang, lalu baca status serta tombolnya.", "Prop('checked') membaca keadaan terkini; attr('checked') bukan pilihan untuk itu.", '$("#agree").on("change", function () {\n  const checked = $(this).prop("checked");\n  $("#submit").prop("disabled", !checked);\n  $("#result").text("checked: " + checked);\n});');
example("jq-content", "text", "Text: menampilkan apa adanya", "Pengguna mungkin mengetik tulisan yang menyerupai tag. Kita ingin menampilkan pesannya, bukan mengeksekusi markup.", "Val membaca input. Text menulisnya secara literal, sehingga <b> tidak menjadi format tebal.", '<label for="input">Pesan</label><input id="input" class="block rounded border p-2" value="&lt;b&gt;Halo&lt;/b&gt;">' + control("action", "Tampilkan") + '<p id="result" class="mt-3"></p>', "Masukkan teks lain yang memakai tanda < dan >.", "Text sesuai untuk pesan dari pengguna.", '$("#action").on("click", function () {\n  $("#result").text($("#input").val());\n});');
example("jq-content", "html", "HTML: markup yang kita kendalikan", "Untuk template kecil yang ditulis sendiri, kita bisa menyisipkan elemen tebal secara sengaja.", "Html menafsirkan strong sebagai elemen. Tidak ada input pengguna yang masuk ke method ini.", control("action", "Tampilkan template") + '<div id="result" class="mt-3"></div>', "Ganti strong dengan em pada markup tetap.", "Jangan menghubungkan input pengguna ke html(...).",
  '$("#action").on("click", function () {\n  $("#result").html("<strong>Halo dari template yang kita tulis sendiri.</strong>");\n});');
example("jq-content", "val", "Val: membaca dan mengisi input", "Form bisa diberi nilai awal dari kode, kemudian pengguna boleh mengubahnya.", "Val dengan argumen mengisi input, sedangkan val tanpa argumen membacanya. Text menampilkan hasil pembacaan.", '<label for="input">Nama</label><input id="input" class="block rounded border p-2">' + control("action", "Baca nilai") + '<p id="result" class="mt-3"></p>', "Ganti nilai awal Ayu dan ketik nilai baru sebelum klik.", "Mengatur val lewat kode tidak otomatis memicu semua event change/input.", '$("#input").val("Ayu");\n$("#action").on("click", function () {\n  $("#result").text("Nilai sekarang: " + $("#input").val());\n});');
const traversingHtml = '<section class="card rounded border p-4"><h3 class="font-bold">Kartu peserta</h3><div class="mt-3 p-2">' + control("action", "Telusuri") + '<span class="ml-2">Saudara tombol</span></div><p class="description mt-3">Deskripsi peserta</p></section>';
example("jq-traversing", "parent-closest", "Parent dan closest", "Tombol ada dalam div, dan div ada dalam kartu. Kita ingin menandai kedua pembungkus itu dengan cara berbeda.", "Parent naik satu tingkat. Closest('.card') mencari ancestor terdekat yang cocok, sehingga dapat melewati div.", traversingHtml, "Ganti selector closest menjadi div dan lihat sasaran baru.", "Closest juga memeriksa elemen awal sendiri jika cocok dengan selector.", '$("#action").on("click", function () {\n  $(this).parent().addClass("bg-blue-100");\n  $(this).closest(".card").addClass("ring-2 ring-emerald-500");\n});');
example("jq-traversing", "children-find", "Children dan find", "Kartu punya anak langsung dan keturunan yang berada lebih dalam. Kita perlu tahu seberapa jauh pencarian dilakukan.", "Children('h3') hanya memilih heading langsung. Find('button') dapat menemukan tombol di dalam div.", traversingHtml, "Ganti find('button') menjadi children('button') dan lihat mengapa tombol tidak ditemukan.", "Anak langsung berbeda dari seluruh keturunan.", '$("#action").on("click", function () {\n  const card = $(this).closest(".card");\n  card.children("h3").addClass("text-emerald-700");\n  card.find("button").text("Ditemukan di dalam div");\n});');
example("jq-traversing", "siblings", "Siblings: saudara satu induk", "Label di samping tombol perlu ditandai, tetapi deskripsi di luar div tidak.", "Siblings memilih elemen dengan induk yang sama. Span adalah saudara tombol; paragraf deskripsi bukan.", traversingHtml, "Tambah span lain di div dan periksa apakah keduanya berubah.", "Siblings tidak memilih elemen awal itu sendiri.", '$("#action").on("click", function () {\n  $(this).siblings("span").addClass("font-bold text-blue-700");\n});');
const effectsHtml = control("action", "Buka/tutup panel") + '<div id="panel" class="mt-4 rounded bg-blue-100 p-5">Informasi tambahan untuk peserta.</div>';
example("jq-effects", "fade", "Fade: muncul dengan opacity", "Panel memudar tanpa efek menggulung tinggi secara bertahap.", "FadeToggle bergantian memunculkan dan menyembunyikan dengan perubahan opacity selama 400 milidetik.", effectsHtml, "Ubah 400 menjadi 1000 dan amati waktu perubahan.", "Pada akhir hide, elemen tidak lagi memakai ruang layout.", '$("#action").on("click", function () {\n  $("#panel").stop(true, true).fadeToggle(400);\n});');
example("jq-effects", "slide", "Slide: membuka dengan perubahan tinggi", "Panel dapat dibuka seperti gulungan agar perubahan tinggi terlihat.", "SlideToggle mengubah ukuran vertikal selama animasi, lalu menetapkan keadaan terlihat atau tersembunyi.", effectsHtml, "Bandingkan slideToggle(400) dengan fadeToggle(400).","Gunakan durasi sama ketika membandingkan dua jenis efek.", '$("#action").on("click", function () {\n  $("#panel").stop(true, true).slideToggle(400);\n});');
example("jq-effects", "antrean", "Mengendalikan klik cepat", "Jika setiap klik menambah animasi, panel dapat terus bergerak setelah pengguna berhenti mengeklik.", "Stop(true, true) membersihkan antrean dan menyelesaikan animasi aktif sebelum mulai yang baru. Kita sengaja memakai durasi panjang untuk percobaan ini.", effectsHtml, "Klik cepat, lalu hapus .stop(true, true) dan bandingkan.", "Argumen pertama membersihkan antrean, argumen kedua melompat ke akhir animasi aktif.", '$("#action").on("click", function () {\n  $("#panel").stop(true, true).slideToggle(1000);\n});');
const formHtml = lessonById("jq-form").code.html.replace(/^<main[^>]*>\n|\n<\/main>$/g, "");
example("jq-form", "wajib", "Memeriksa nama wajib", "Mulai dari satu aturan sederhana agar alur submit mudah dipahami.", "PreventDefault menahan navigasi. Setelah trim, nama kosong diberi pesan, sedangkan nama terisi mendapat sapaan.", formHtml, "Tambahkan pemeriksaan nama minimal tiga karakter.", "Pada bagian ini email belum diperiksa; fokus percobaan hanya pada nama.", '$("#signup").on("submit", function (event) {\n  event.preventDefault();\n  const name = $("#name").val().trim();\n  $("#message").text(name ? "Halo, " + name + "!" : "Isi nama terlebih dahulu.");\n});');
example("jq-form", "email", "Memeriksa format email", "Setelah nama, kita membantu pengguna menemukan kesalahan pada alamat email.", "Validitas input type=email diperiksa melalui checkValidity. Pesan dibedakan untuk nama kosong, email kosong, format salah, dan kondisi berhasil.", formHtml, "Uji email kosong, tanpa @, lalu alamat yang valid.", "Format yang benar tidak membuktikan alamat email benar-benar dimiliki pengguna. Validasi penting tetap perlu server.", '$("#signup").on("submit", function (event) {\n  event.preventDefault();\n  const name = $("#name").val().trim();\n  const email = $("#email");\n  const message = $("#message");\n  if (!name) { message.text("Isi nama terlebih dahulu."); return; }\n  if (!email.val().trim()) { message.text("Isi alamat email."); return; }\n  if (!email[0].checkValidity()) { message.text("Periksa format email, misalnya nama@example.com."); return; }\n  message.text("Halo, " + name + "! Form sudah valid.");\n});');
const ajaxHtml = control("action", "Muat data") + '<pre id="result" class="mt-3 whitespace-pre-wrap rounded bg-blue-100 p-3" role="status">Belum ada request.</pre>';
example("jq-ajax", "success", "Done: hasil berhasil dibaca", "Request contoh memakai data lokal supaya kita bisa mempelajari callback tanpa server API.", "DataType json meminta jQuery membaca JSON. Done menerima objek hasilnya; always mengaktifkan tombol lagi setelah request berakhir.", ajaxHtml, "Tambah nama peserta dalam JSON dan lihat hasil baru.", "Data URL hanya alat demonstrasi. Endpoint HTTP sungguhan dapat gagal karena jaringan atau CORS.", 'const url = "data:application/json," + encodeURIComponent(JSON.stringify({ peserta: ["Ayu", "Budi"] }));\n$("#action").on("click", function () {\n  const button = $(this).prop("disabled", true);\n  $("#result").text("Memuat...");\n  $.ajax({ url, dataType: "json", timeout: 5000 })\n    .done(data => $("#result").text(JSON.stringify(data, null, 2)))\n    .fail((xhr, status) => $("#result").text("Gagal: " + status))\n    .always(() => button.prop("disabled", false));\n});');
example("jq-ajax", "failure", "Fail: respons tidak sesuai", "Request bisa selesai diterima tetapi datanya tidak bisa dibaca sesuai format yang diharapkan.", "Contoh mengirim teks bukan-JSON dengan dataType json. Parsing gagal dan fail menerima status parsererror. Ini jalur gagal yang bisa dicoba tanpa backend.", ajaxHtml, "Ubah isi data URL menjadi JSON valid dan tambahkan callback done.", "Parsererror berbeda dari kegagalan koneksi. Saat debugging, baca status sebelum menyimpulkan server tidak dapat dijangkau.", 'const url = "data:application/json," + encodeURIComponent("Ini bukan JSON");\n$("#action").on("click", function () {\n  const button = $(this).prop("disabled", true);\n  $("#result").text("Memuat...");\n  $.ajax({ url, dataType: "json", timeout: 5000 })\n    .done(() => $("#result").text("JSON berhasil dibaca."))\n    .fail((xhr, status) => $("#result").text("Tidak bisa membaca respons: " + status))\n    .always(() => button.prop("disabled", false));\n});');

// Sesuaikan contoh pengantar yang tadinya tidak sejalan dengan narasi interaksi.
Object.assign(lessonById("jq-intro"), {
  concept: "$(), on(), dan text()",
  code: { html: `<main class="min-h-screen bg-slate-50 p-6 text-slate-900">${buttonHtml}</main>`, css: "/* Tampilan menggunakan class Tailwind. */", js: '$("#action").on("click", function () {\n  $("#result").text("Halo! Tombol berhasil menerima klik.");\n});' },
  assignmentText: "Ganti isi pesan setelah klik dan ubah class tombol. Jelaskan perbedaan perubahan tampilan dan interaksi."
});
lessonById("tw-outline").code.html = lessonById("tw-outline").code.html.replaceAll("focus:", "focus-visible:");
lessonById("jq-intro").outcomes[0][1] = "Temukan $(), on(), dan text() pada contoh.";
lessonById("tw-origin").walkthrough[0] = "Run lalu arahkan pointer ke kotak. Perhatikan sisi kiri yang menjadi poros ketika kotak berputar.";
// Narasi pembuka tiap kelompok utility, dengan tabel dan contoh sebelumnya tetap dipakai.
const utilityContexts = {
  font: "Judul perlu tampak penting, isi perlu nyaman dibaca, dan kode perlu huruf yang mudah dibedakan. Kita memilih keluarga, ukuran, ketebalan, dan jarak baris untuk kebutuhan itu.",
  text: "Tulisan yang sama bisa menjadi judul, tautan, atau keterangan. Perataan, warna, dan dekorasi membantu pembaca mengenali perannya.",
  spacing: "Kalau tampilan terasa sesak, jangan langsung memperbesar semuanya. Periksa apakah yang kurang adalah ruang di dalam kotak atau jarak di antara kotak.",
  sizing: "Kartu perlu cukup lebar untuk isinya, tetapi tetap muat di layar kecil. Kita bisa memakai ukuran tetap, pecahan, atau batas minimum dan maksimum.",
  background: "Latar membantu membedakan kartu, banner, dan pesan. Mulai dari warna, kemudian tambahkan gambar atau gradasi hanya jika memang membantu isi.",
  border: "Garis dan sudut membantu pembaca melihat batas komponen. Pemisah daftar dan tanda fokus punya kebutuhan berbeda dari border kartu.",
  display: "Sebelum mengatur posisi rumit, tentukan cara elemen mengambil tempat: satu baris sendiri, ikut aliran teks, atau tidak tampil dahulu.",
  flex: "Baris tombol atau kolom menu biasanya cukup diatur pada satu arah. Flex membantu menyusun, membagi ruang, dan mengizinkan item pindah baris.",
  grid: "Untuk katalog dan dashboard, kita perlu hubungan baris sekaligus kolom. Grid menyediakan kerangka petak yang bisa diisi dan digabung.",
  position: "Badge di sudut kartu memerlukan acuan yang jelas. Sebelum memilih absolute, tanyakan: posisi ini dihitung terhadap kartu atau terhadap layar?",
  overflow: "Saat isi terlalu panjang, kita harus memilih cara membacanya. Scroll, pemotongan, dan penyembunyian tidak punya dampak yang sama.",
  effects: "Bayangan memberi kedalaman dan filter mengubah tampilan, tetapi isi tetap harus terbaca. Kita mencoba efek kecil sebelum menumpuk banyak perubahan.",
  interaction: "Pointer dan tanda fokus memberi petunjuk kepada pengguna. Petunjuk visual perlu cocok dengan perilaku nyata tombol atau input.",
  variants: "Tombol perlu berubah saat disentuh pointer, mendapat fokus, atau tampil di layar lebar. Prefix memberi tahu kapan aturan tambahan mulai berlaku."
};
lessonById("tw-utility").sections.forEach((section) => {
  section.paragraphs = [utilityContexts[section.id], ...section.paragraphs];
});
