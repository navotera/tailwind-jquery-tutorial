// Komponen praktis setelah materi utility. Dimuat setelah lessons.js dan sebelum
// lesson-guides.js; setiap definisi menyatukan narasi, tabel, dan contoh runnable.
const essentialGuides = {};
const essentialTailwindReferences = {};
const essentialField = "mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200";
const essentialButton = "rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

function componentExample(id, title, context, explanation, html, exercise, note, rowIndexes, js = "") {
  return { id, title, paragraphs: [context, explanation], html, exercise, note, rowIndexes, js };
}
function componentLesson(id, title, concept, narrative, rows, examples) {
  essentialGuides[id] = narrative;
  essentialTailwindReferences[id] = rows;
  const first = examples[0];
  const lesson = topic(id, title, narrative[1], concept, first.html, first.exercise, first.js);
  lesson.sections = examples.map((example) => ({
    id: example.id, title: example.title, paragraphs: example.paragraphs,
    note: example.note, exercise: example.exercise, codeFile: "html",
    rows: example.rowIndexes.map((index) => {
      if (!rows[index]) throw new Error(`Referensi tidak ditemukan: ${id}/${example.id}/${index}`);
      return rows[index];
    }),
    code: {
      html: `<main class="min-h-screen bg-slate-50 p-6 text-slate-900">\n${example.html}\n</main>`,
      css: "/* Komponen memakai utility bawaan Tailwind 3.4, tanpa plugin forms. */",
      js: example.js || "// Interaksi dasar contoh ini disediakan HTML; tidak perlu JavaScript tambahan."
    }
  }));
  lesson.code = { ...lesson.sections[0].code };
  return lesson;
}

const essentialFormGroups = [
  { title: "Form", lessons: [
    componentLesson("tw-form-input", "Label, input, dan textarea", "block, w-full, border, padding, dan focus:ring-2", [
      "Form yang nyaman bukan hanya input dengan garis yang bagus. Peserta perlu tahu apa yang diisi, contoh formatnya, dan posisi fokus saat mengetik.",
      "Label memberi nama yang tetap terlihat, sedangkan placeholder hanya petunjuk sementara. Utility mengatur ukuran, ruang, dan tanda fokus; atribut HTML menentukan jenis input serta hubungan labelnya. Kita memisahkan input satu baris, textarea, dan susunan form responsif.",
      "Run, klik label Nama, lalu gunakan Tab menuju kolom berikutnya. Perhatikan input yang mendapat fokus serta petunjuk di bawahnya.",
      "Ubah px-3 py-2 untuk membandingkan ukuran kolom. Pada contoh layout, ubah jumlah kolom tanpa menghapus label.",
      "Tailwind hanya mengatur tampilan. Label for harus cocok dengan id input, dan placeholder bukan pengganti label. Tidak ada data yang dikirim ke server pada demo ini."
    ], [
      ["display dan width", "block · w-full", "Label/input memakai baris sendiri dan input mengisi lebar pembungkus."],
      ["padding", "px-3 · py-2", "Ruang mendatar 0.75rem dan vertikal 0.5rem agar ketikan tidak menempel pada garis."],
      ["border dan border-radius", "border · border-slate-300 · rounded-lg", "Garis 1px dengan sudut 0.5rem. Tidak mengubah perilaku input."],
      ["border-color / box-shadow pada :focus", "focus:border-emerald-600 · focus:ring-2", "Ganti warna batas dan tambahkan ring ketika kolom sedang dipakai."],
      ["grid-template-columns", "grid-cols-1 · sm:grid-cols-2", "Satu kolom dahulu, lalu dua kolom mulai 640px lebar preview."],
      ["resize: vertical", "resize-y", "Textarea boleh ditambah tingginya tanpa mengubah lebar."]
    ], [
      componentExample("input", "Input dengan label dan petunjuk", "Nama dan email perlu label yang tidak hilang ketika kita mulai mengetik.", "Klik label untuk memindahkan fokus ke input. Type=email memberi perilaku HTML untuk alamat email; class Tailwind memberi tampilannya.", `<div class="max-w-md space-y-4">
  <div><label for="studentName" class="block font-medium">Nama peserta</label><input id="studentName" name="name" autocomplete="name" class="${essentialField}" placeholder="Contoh: Ayu"></div>
  <div><label for="studentEmail" class="block font-medium">Email</label><input id="studentEmail" name="email" type="email" autocomplete="email" aria-describedby="emailHint" class="${essentialField}" placeholder="nama@example.com"><p id="emailHint" class="mt-1 text-sm text-slate-600">Gunakan alamat email yang bisa dihubungi.</p></div>
</div>`, "Perbesar padding input, lalu ubah warna ring fokus.", "For pada label dan id input harus sama agar klik label bekerja.", [0, 1, 2, 3]),
      componentExample("textarea", "Textarea untuk jawaban panjang", "Pesan yang panjang sebaiknya tidak dipaksakan ke input satu baris.", "Textarea menampilkan beberapa baris dan resize-y memberi pegangan untuk memperpanjangnya. Petunjuk tetap terlihat di bawah kotak.", `<div class="max-w-md"><label for="studentNote" class="block font-medium">Pertanyaan untuk instruktur</label><textarea id="studentNote" name="note" rows="4" aria-describedby="noteHint" class="${essentialField} resize-y" placeholder="Tulis bagian yang belum dipahami"></textarea><p id="noteHint" class="mt-1 text-sm text-slate-600">Jelaskan satu pertanyaan dengan singkat.</p></div>`, "Ubah rows menjadi 6 lalu bandingkan resize-y dengan resize-none.", "Rows adalah atribut HTML; resize hanya mengatur izin perubahan ukuran visual.", [0, 1, 2, 3, 5]),
      componentExample("layout", "Form satu kolom dan dua kolom", "Nama depan dan belakang boleh berdampingan jika layar cukup lebar.", "Grid memakai satu kolom sebagai dasar. Sm:grid-cols-2 mengubahnya menjadi dua tanpa mengubah hubungan label dan input.", `<div class="grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-2"><div><label for="firstName" class="block font-medium">Nama depan</label><input id="firstName" autocomplete="given-name" class="${essentialField}"></div><div><label for="lastName" class="block font-medium">Nama belakang</label><input id="lastName" autocomplete="family-name" class="${essentialField}"></div></div>`, "Ubah lebar jendela untuk melihat breakpoint, lalu coba gap-6.", "Breakpoint mengikuti lebar iframe. Jangan mengecilkan input sampai label sulit dibaca.", [0, 1, 4])
    ]),
    componentLesson("tw-form-choice", "Select, checkbox, dan radio", "accent-emerald-600, space-y-3, dan border", [
      "Tidak semua pertanyaan perlu diketik. Pilihan kelas cukup lewat select, persetujuan lewat checkbox, dan satu pilihan jadwal lewat radio.",
      "Jenis kontrol ditentukan HTML. Tailwind membantu jarak, garis, dan warna aksen tanpa mengganti cara kerjanya. Radio dengan name yang sama hanya memilih satu opsi, sementara checkbox dapat dipakai untuk pilihan yang berdiri sendiri.",
      "Run lalu coba select, centang checkbox, dan pindah pilihan radio. Gunakan keyboard untuk membandingkan perilakunya.",
      "Tambah satu opsi pada select atau satu radio dengan name yang sama. Ubah accent-emerald-600 menjadi accent-blue-600.",
      "Checkbox dan radio tetap kontrol native browser. Tidak membutuhkan plugin forms; jangan mengganti semantik kontrol hanya untuk mengejar tampilan."
    ], [
      ["width dan padding", "w-full · px-3 · py-2", "Select memenuhi pembungkus dan menyediakan ruang untuk teks opsi."],
      ["border dan border-radius", "border · rounded-lg", "Batas serta sudut kontrol, bukan aturan cara memilih opsi."],
      ["accent-color", "accent-emerald-600 · accent-blue-600", "Warna aksen kontrol native ketika dipilih. Bentuk detailnya bergantung browser."],
      ["margin antar-anak", "space-y-3", "Jarak 0.75rem antarpilihan agar label mudah diklik."],
      ["display dan gap", "flex · items-center · gap-2", "Sejajarkan kontrol dengan label dan beri ruang 0.5rem di antaranya."]
    ], [
      componentExample("select", "Select untuk daftar pilihan", "Peserta memilih kelas dari beberapa opsi yang sudah disediakan.", "Label menunjuk select. Opsi pertama adalah petunjuk dengan value kosong; opsi lain berisi nilai yang dapat dibaca saat form diproses.", `<div class="max-w-md"><label for="course" class="block font-medium">Kelas praktikum</label><select id="course" name="course" class="${essentialField}"><option value="">Pilih kelas</option><option value="a">Kelas A</option><option value="b">Kelas B</option></select></div>`, "Tambah opsi Kelas C dengan value berbeda.", "Utility tidak menentukan nilai opsi. Gunakan value yang jelas untuk data form.", [0, 1]),
      componentExample("checkbox", "Checkbox untuk pilihan mandiri", "Peserta boleh memilih beberapa pemberitahuan sekaligus.", "Setiap checkbox dapat dicentang tanpa mematikan checkbox lain. Label membungkus input supaya tulisan juga bisa diklik.", '<fieldset class="space-y-3"><legend class="mb-3 font-semibold">Pemberitahuan</legend><label class="flex items-center gap-2"><input type="checkbox" name="notice" value="email" class="h-4 w-4 accent-emerald-600"> Email tugas</label><label class="flex items-center gap-2"><input type="checkbox" name="notice" value="schedule" class="h-4 w-4 accent-emerald-600"> Perubahan jadwal</label></fieldset>', "Centang keduanya, lalu ubah warna aksen.", "Checked menentukan keadaan awal; pengguna tetap bisa mengubahnya.", [2, 3, 4]),
      componentExample("radio", "Radio untuk satu pilihan", "Peserta hanya boleh memilih satu jadwal.", "Name=schedule yang sama membuat dua radio menjadi satu kelompok. Fieldset dan legend menjelaskan pertanyaan kelompok tersebut.", '<fieldset class="space-y-3"><legend class="mb-3 font-semibold">Jadwal praktikum</legend><label class="flex items-center gap-2"><input type="radio" name="schedule" value="morning" class="h-4 w-4 accent-emerald-600" checked> Pagi</label><label class="flex items-center gap-2"><input type="radio" name="schedule" value="afternoon" class="h-4 w-4 accent-emerald-600"> Sore</label></fieldset>', "Tambah jadwal Malam dengan name yang sama dan value baru.", "Jika name berbeda, radio tidak lagi membatasi pilihan sebagai satu kelompok.", [2, 3, 4])
    ]),
    componentLesson("tw-form-state", "Fokus, disabled, dan pesan validasi", "focus:ring-2, disabled:, dan aria-[invalid=true]:", [
      "Form perlu membantu peserta memperbaiki kesalahan, bukan hanya mengubah kolom menjadi merah. Kita menampilkan pesan yang menjelaskan langkah berikutnya.",
      "Contoh memakai validasi HTML untuk email, lalu JavaScript menahan submit dan memperbarui aria-invalid serta pesan. Tailwind menangani tanda fokus dan warna keadaan. Contoh berikutnya membedakan disabled yang tidak dapat dipakai dengan readonly yang tetap bisa dibaca.",
      "Run dan kirim email kosong atau salah. Setelah memperbaikinya, kirim lagi dan perhatikan pesan serta warna batas input.",
      "Ganti warna penanda error, kemudian coba Tab pada kontrol disabled dan readonly di bagian berikutnya.",
      "Validasi ini demonstrasi browser, tidak mengirim atau menyimpan data. Aplikasi nyata tetap memeriksa data di server; warna bukan satu-satunya penjelasan kesalahan."
    ], [
      ["box-shadow pada :focus", "focus:ring-2 · focus:ring-emerald-200", "Penanda kolom aktif. Focus:outline-none dipakai bersama ring yang tetap terlihat."],
      ["border-color dan warna ring pada aria-invalid", "aria-[invalid=true]:border-red-500 · aria-[invalid=true]:ring-red-200", "Garis serta ring merah mengikuti atribut aria-invalid=true yang diperbarui kode, bukan validasi oleh CSS."],
      ["background-color pada :disabled", "disabled:bg-slate-100", "Penampilan kontrol nonaktif. Keadaan sebenarnya ditentukan atribut disabled."],
      ["cursor pada :disabled", "disabled:cursor-not-allowed", "Petunjuk pointer pada kontrol yang tidak bisa dipakai."],
      ["background-color pada :read-only", "read-only:bg-slate-100", "Latar berbeda untuk input readonly yang masih dapat dibaca dan difokuskan."],
      ["color", "text-red-700 · text-emerald-700", "Warna pesan error atau sukses, disertai tulisan yang menjelaskan hasil."]
    ], [
      componentExample("validasi", "Pesan error yang bisa diperbaiki", "Email kosong dan format salah perlu petunjuk, bukan hanya garis merah.", "Novalidate menahan validasi otomatis browser; handler tetap memanggil checkValidity. Submit dicegah agar demo tidak berpindah halaman.", `<form id="emailForm" class="max-w-md" novalidate><label for="contactEmail" class="block font-medium">Email peserta</label><input id="contactEmail" name="email" type="email" required aria-describedby="formMessage" aria-invalid="false" class="${essentialField} aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-200"><p id="formMessage" class="mt-2 text-sm" role="status">Isi email, lalu tekan Periksa.</p><button type="submit" class="mt-4 ${essentialButton}">Periksa</button></form>`, "Uji kosong, tanpa @, lalu nama@example.com. Tulis pesan error yang lebih spesifik.", "Format valid tidak membuktikan alamat email dimiliki peserta.", [0, 1, 5], 'document.querySelector("#emailForm").addEventListener("submit", function (event) {\n  event.preventDefault();\n  const field = document.querySelector("#contactEmail");\n  const message = document.querySelector("#formMessage");\n  const valid = field.checkValidity();\n  field.setAttribute("aria-invalid", String(!valid));\n  message.textContent = valid ? "Format email sudah valid. Data tidak dikirim." : "Isi email dengan format seperti nama@example.com.";\n  message.classList.toggle("text-red-700", !valid);\n  message.classList.toggle("text-emerald-700", valid);\n  if (!valid) field.focus();\n});'),
      componentExample("nonaktif", "Disabled berbeda dari readonly", "Nomor peserta mungkin tetap terbaca, sementara kolom yang belum tersedia tidak boleh digunakan.", "Readonly masih bisa mendapat fokus dan nilainya termasuk data form. Disabled tidak dapat diedit, biasanya dilewati Tab, dan tidak termasuk pengiriman form.", `<div class="max-w-md space-y-4"><div><label for="participantCode" class="block font-medium">Nomor peserta (readonly)</label><input id="participantCode" name="code" value="P-001" readonly class="${essentialField} read-only:bg-slate-100"></div><div><label for="lockedField" class="block font-medium">Fitur belum tersedia (disabled)</label><input id="lockedField" name="locked" value="Tidak bisa dipakai" disabled class="${essentialField} disabled:bg-slate-100 disabled:cursor-not-allowed"></div></div>`, "Hapus disabled pada input kedua dan bandingkan fokus serta editnya.", "CSS hanya memberi penampilan; atribut HTML menetapkan keadaan kontrol.", [0, 2, 3, 4])
    ])
  ] },
  { title: "Button", lessons: [
    componentLesson("tw-buttons", "Varian dan ukuran button", "bg-, border, px-/py-, font-semibold, dan focus-visible:", [
      "Satu halaman bisa punya tombol Simpan, Batal, dan Hapus. Penampilannya perlu membedakan aksi utama, pendamping, dan tindakan yang perlu hati-hati.",
      "Tombol primary memakai latar kuat, secondary memakai garis, dan danger memakai warna dengan label jelas. Ukuran diatur padding serta font. Tailwind tidak memasang aksi otomatis: contoh pertama hanya mengajarkan penampilan dan semantik button.",
      "Run, arahkan pointer, lalu pindahkan fokus dengan Tab. Bandingkan penekanan tiga tombol.",
      "Coba ukuran kecil dan besar, lalu ganti palet primary tanpa mengubah label tindakannya.",
      "Gunakan button untuk aksi dan link untuk navigasi. Type=button mencegah tombol demo tanpa sengaja mengirim form; jangan menjelaskan bahaya hanya lewat warna."
    ], [
      ["background-color dan color", "bg-emerald-700 · bg-red-700 · text-white", "Aksi utama atau berisiko diberi penekanan. Label tetap menjelaskan tindakan."],
      ["border dan background-color", "border · border-slate-300 · bg-white", "Varian secondary yang lebih ringan daripada tombol utama."],
      ["padding", "px-3 · py-1 · px-6 · py-3", "Ukuran kecil atau lebih besar tanpa menetapkan lebar tombol secara kaku."],
      ["font-size dan font-weight", "text-sm · text-base · font-semibold", "Ukuran serta ketebalan label. Tetap jaga keterbacaan."],
      ["outline pada :focus-visible", "focus-visible:outline-2 · focus-visible:outline-offset-2", "Penanda fokus keyboard yang tidak menggeser ukuran layout."]
    ], [
      componentExample("varian", "Primary, secondary, dan danger", "Pengguna perlu tahu mana aksi utama dan mana yang membatalkan atau menghapus.", "Warna serta border membedakan penekanan; tulisan Simpan, Batal, dan Hapus menjelaskan maknanya. Tombol ini tidak melakukan penghapusan nyata.", `<div class="flex flex-wrap gap-3"><button type="button" class="${essentialButton}">Simpan</button><button type="button" class="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Batal</button><button type="button" class="rounded-lg bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-700 focus-visible:outline-offset-2">Hapus</button></div>`, "Ubah warna Simpan menjadi blue dan bandingkan penekanannya dengan Batal.", "Warna danger bukan pengganti konfirmasi untuk tindakan destruktif pada aplikasi nyata.", [0, 1, 4]),
      componentExample("ukuran", "Ukuran melalui padding", "Tombol dalam toolbar bisa ringkas, sedangkan aksi utama perlu area klik yang lebih nyaman.", "Dua tombol memakai warna sama supaya perbedaan padding dan font terlihat. Tidak ada width tetap, sehingga label tetap menentukan kebutuhan ruang.", '<div class="flex flex-wrap items-center gap-3"><button type="button" class="rounded-lg bg-emerald-700 px-3 py-1 text-sm font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Ringkas</button><button type="button" class="rounded-lg bg-emerald-700 px-6 py-3 text-base font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Aksi utama</button></div>', "Perbesar py pada tombol ringkas tanpa mengubah font.", "Jangan membuat target klik terlalu kecil hanya agar muat banyak tombol.", [2, 3, 4])
    ]),
    componentLesson("tw-button-state", "Hover, toggle, disabled, dan loading", "hover:, aria-pressed:, disabled:, dan aria-busy", [
      "Tombol harus memberi tahu apakah sedang dipilih, masih memproses, atau belum boleh ditekan. Kita perlu mengubah perilaku dan tampilannya bersama-sama.",
      "Contoh toggle memperbarui aria-pressed agar utility dapat mengikuti status pilihan. Contoh loading memberi disabled selama simulasi, mengubah tulisan, lalu mengaktifkan tombol kembali. Tidak ada request atau penyimpanan sungguhan.",
      "Run dan klik toggle dua kali. Pada loading, perhatikan tombol menolak klik kedua selama proses.",
      "Ubah durasi simulasi dari 800ms menjadi 1500ms dan sesuaikan pesan hasilnya.",
      "Disabled adalah keadaan HTML, bukan sekadar opacity. Aria-busy menginformasikan proses tetapi tidak menonaktifkan tombol sendiri."
    ], [
      ["background-color pada :hover", "hover:bg-emerald-800", "Penekanan sementara saat pointer berada di tombol."],
      ["background-color dan color pada aria-pressed", "aria-pressed:bg-emerald-700 · aria-pressed:text-white", "Penampilan pilihan mengikuti aria-pressed=true yang diubah JavaScript."],
      ["opacity pada :disabled", "disabled:opacity-50", "Tampilan lebih redup ketika atribut disabled aktif."],
      ["cursor pada :disabled", "disabled:cursor-not-allowed", "Petunjuk bahwa aksi sedang tidak tersedia."],
      ["outline pada :focus-visible", "focus-visible:outline-2 · focus-visible:outline-offset-2", "Fokus keyboard tetap terlihat sebelum dan setelah proses."]
    ], [
      componentExample("toggle", "Toggle dengan status pilihan", "Satu tombol dapat memilih atau membatalkan favorit.", "JavaScript membalik aria-pressed. Tailwind membaca atribut tersebut untuk warna; pesan teks ikut menjelaskan statusnya.", '<button id="favoriteButton" type="button" aria-pressed="false" class="rounded-lg border border-emerald-700 px-4 py-2 aria-pressed:bg-emerald-700 aria-pressed:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Favorit</button><p id="favoriteStatus" class="mt-3" role="status">Belum dipilih.</p>', "Tambahkan label tombol yang berbeda saat dipilih.", "Status tampilan, teks, dan aria-pressed harus mencerminkan keadaan yang sama.", [1, 4], 'document.querySelector("#favoriteButton").addEventListener("click", function () {\n  const selected = this.getAttribute("aria-pressed") !== "true";\n  this.setAttribute("aria-pressed", String(selected));\n  document.querySelector("#favoriteStatus").textContent = selected ? "Sudah menjadi favorit." : "Belum dipilih.";\n});'),
      componentExample("loading", "Loading tanpa klik ganda", "Selama proses, pengguna perlu tahu bahwa tombol sudah menerima aksi.", "Disabled mencegah klik berikutnya. Simulasi selesai setelah 800ms, lalu label dan status dikembalikan.", `<button id="saveButton" type="button" aria-busy="false" class="${essentialButton}">Simpan demo</button><p id="saveStatus" class="mt-3" role="status">Belum ada proses.</p>`, "Ubah 800 menjadi 1500 dan coba klik berulang.", "Ini simulasi, bukan penyimpanan data. Pada request nyata, pulihkan tombol pada jalur sukses maupun gagal.", [0, 2, 3, 4], 'document.querySelector("#saveButton").addEventListener("click", function () {\n  const button = this;\n  const status = document.querySelector("#saveStatus");\n  button.disabled = true;\n  button.setAttribute("aria-busy", "true");\n  button.textContent = "Memproses...";\n  status.textContent = "Simulasi sedang berjalan.";\n  setTimeout(function () {\n    button.disabled = false;\n    button.setAttribute("aria-busy", "false");\n    button.textContent = "Simpan demo";\n    status.textContent = "Simulasi selesai. Tidak ada data disimpan.";\n  }, 800);\n});')
    ])
  ] },
  { title: "Komponen esensial", lessons: [
    componentLesson("tw-card", "Card dan kumpulan card", "rounded-xl, border, shadow-sm, dan grid", [
      "Informasi peserta atau kursus lebih mudah dipindai jika dikelompokkan dalam kartu. Kita menyusun judul, deskripsi, dan aksi tanpa aturan CSS baru.",
      "Card adalah pola komponen, bukan satu class khusus Tailwind. Border dan radius membatasi area, padding memberi ruang, dan typography membedakan isi. Setelah satu kartu rapi, grid membantu menata beberapa kartu secara responsif.",
      "Run kartu tunggal dan cocokkan setiap bagian isi dengan jarak, ukuran teks, serta batas kotaknya.",
      "Coba kumpulan card, ubah sm:grid-cols-2, lalu ganti shadow-sm menjadi shadow-none.",
      "Jangan memasukkan terlalu banyak aksi dalam satu kartu. Gunakan struktur heading yang masuk akal dan link untuk menuju halaman lain."
    ], [
      ["border dan border-radius", "border · rounded-xl", "Batas 1px dan sudut 0.75rem untuk mengelompokkan informasi."],
      ["padding", "p-6", "Ruang dalam 1.5rem, menjaga isi dari tepi kartu."],
      ["box-shadow", "shadow-sm · shadow-none", "Kedalaman ringan atau tanpa bayangan. Bukan pengganti struktur isi."],
      ["font-size dan font-weight", "text-xl · font-semibold", "Judul lebih menonjol daripada deskripsi."],
      ["grid-template-columns dan gap", "grid-cols-1 · sm:grid-cols-2 · gap-4", "Satu kolom dahulu lalu dua, dengan jarak 1rem antarkartu."]
    ], [
      componentExample("tunggal", "Card dengan judul dan aksi", "Satu kartu menjelaskan satu topik supaya pembaca tidak harus menebak hubungannya.", "Judul, deskripsi, dan tombol diberi jarak terpisah. Max-w-sm menjaga panjang baris tetap nyaman.", `<article class="max-w-sm rounded-xl border bg-white p-6 shadow-sm"><h2 class="text-xl font-semibold">Praktikum Tailwind</h2><p class="mt-2 leading-relaxed text-slate-600">Belajar menyusun antarmuka melalui contoh yang bisa langsung dicoba.</p><button type="button" class="mt-4 ${essentialButton}">Lihat contoh</button></article>`, "Ubah p-6 menjadi p-4 dan bandingkan ruang isi.", "Tombol ini hanya demo styling, belum memiliki aksi navigasi.", [0, 1, 2, 3]),
      componentExample("kumpulan", "Card dalam grid responsif", "Dua topik dapat berdampingan ketika ruang cukup tanpa membuat kartu terlalu sempit.", "Layout diatur pada pembungkus grid, sementara setiap article tetap mengatur isi kartunya sendiri.", '<div class="grid grid-cols-1 gap-4 sm:grid-cols-2"><article class="rounded-xl border bg-white p-6 shadow-sm"><h2 class="text-xl font-semibold">Tailwind CSS</h2><p class="mt-2 text-slate-600">Menyusun tampilan.</p></article><article class="rounded-xl border bg-white p-6 shadow-sm"><h2 class="text-xl font-semibold">jQuery</h2><p class="mt-2 text-slate-600">Membuat interaksi.</p></article></div>', "Tambah card ketiga dan coba sm:grid-cols-3.", "Responsiveness mengikuti lebar preview, bukan seluruh aplikasi.", [0, 1, 4])
    ]),
    componentLesson("tw-navigation", "Navbar dan breadcrumb", "flex, sm:, hidden, gap, dan text-", [
      "Pengguna perlu tahu ke mana bisa berpindah dan sedang berada di bagian mana. Navbar menyediakan pilihan, sedangkan breadcrumb menunjukkan jalur halaman.",
      "Navbar contoh memiliki tombol Menu pada layar sempit. JavaScript hanya membuka daftar dan memperbarui aria-expanded; Tailwind mengatur susunan serta breakpoint. Breadcrumb berikutnya memakai nav dan aria-current untuk posisi saat ini.",
      "Run pada preview sempit, klik Menu, lalu coba Tab. Perbesar jendela untuk membandingkan daftar yang mendatar.",
      "Tambah satu tautan beserta bagian tujuan dalam contoh, kemudian ubah jarak antarmenu.",
      "Link adalah navigasi dan button adalah aksi buka-tutup. Semua tautan contoh menuju bagian dalam preview, tidak mengubah aplikasi utama."
    ], [
      ["display", "flex · hidden · sm:flex · sm:hidden", "Susunan navbar dan visibilitas menu mengikuti breakpoint 640px."],
      ["justify-content", "justify-between", "Pisahkan nama aplikasi dan tombol Menu dalam satu baris."],
      ["gap dan margin", "gap-4 · mt-3", "Jarak pilihan 1rem dan ruang atas 0.75rem."],
      ["color dan font-weight", "text-emerald-700 · font-semibold", "Penekanan pada tautan atau halaman aktif, tidak pada semua item."],
      ["flex-wrap", "flex-wrap", "Breadcrumb boleh turun baris saat jalur terlalu panjang."]
    ], [
      componentExample("navbar", "Navbar dengan menu mobile", "Menu tidak boleh menghabiskan ruang layar kecil. Kita sediakan tombol untuk membukanya.", "Sm:flex menampilkan daftar mendatar pada layar lebar. Pada layar sempit, button mengubah class hidden serta aria-expanded.", '<nav aria-label="Menu demo" class="rounded-xl border bg-white p-4"><div class="flex items-center justify-between"><strong>Lab Web</strong><button id="menuToggle" type="button" aria-controls="mobileMenu" aria-expanded="false" class="rounded border px-3 py-2 sm:hidden focus-visible:outline focus-visible:outline-2">Menu</button></div><div id="mobileMenu" class="mt-3 hidden gap-4 space-y-2 sm:flex sm:space-y-0"><a href="#demoLessons" class="block text-emerald-700 hover:underline">Materi</a><a href="#demoHelp" class="block text-emerald-700 hover:underline">Bantuan</a></div></nav><section id="demoLessons" class="mt-6 rounded bg-emerald-100 p-4"><h2 class="font-semibold">Materi</h2><p>Tujuan link Materi.</p></section><section id="demoHelp" class="mt-6 rounded bg-blue-100 p-4"><h2 class="font-semibold">Bantuan</h2><p>Tujuan link Bantuan.</p></section>', "Klik Menu dua kali dan periksa apakah daftar ikut berubah. Tambah tautan baru dengan target yang ada.", "Pada layar lebar, menu terlihat melalui sm:flex walaupun keadaan mobile tertutup.", [0, 1, 2, 3], 'document.querySelector("#menuToggle").addEventListener("click", function () {\n  const open = this.getAttribute("aria-expanded") !== "true";\n  this.setAttribute("aria-expanded", String(open));\n  document.querySelector("#mobileMenu").classList.toggle("hidden", !open);\n});'),
      componentExample("breadcrumb", "Breadcrumb dan posisi aktif", "Jalur halaman membantu pengguna mengetahui posisi tanpa membuat semua teks terlihat sebagai aksi aktif.", "Link sebelumnya berwarna lebih lembut; item saat ini memakai font-semibold dan aria-current=page. Pemisah dekoratif tidak dibaca sebagai isi.", '<nav aria-label="Breadcrumb demo"><ol class="flex flex-wrap items-center gap-2 text-sm"><li><a href="#homeDemo" class="text-slate-600 hover:underline">Beranda</a></li><li aria-hidden="true">/</li><li><a href="#homeDemo" class="text-slate-600 hover:underline">Materi</a></li><li aria-hidden="true">/</li><li><span aria-current="page" class="font-semibold text-emerald-700">Form</span></li></ol></nav><section id="homeDemo" class="mt-6 rounded border p-4">Bagian tujuan link demo.</section>', "Ubah judul halaman aktif menjadi Button dan tambah tingkat jalur.", "Aria-current membantu menunjukkan posisi; tampilan kontras tetap diperlukan untuk pembaca visual.", [2, 3, 4])
    ]),
    componentLesson("tw-alert", "Alert dan pesan status", "border, background, text color, dan hidden", [
      "Setelah pengguna melakukan sesuatu, kita perlu menjelaskan hasilnya. Pesan berhasil, peringatan, dan error harus bisa dipahami tanpa mengandalkan warna saja.",
      "Alert menggabungkan batas, latar lembut, dan tulisan yang menyebut tindakan berikutnya. Contoh kedua dapat ditutup dan dibuka lagi. JavaScript mengatur visibilitas; Tailwind hanya mengatur tampilan pesannya.",
      "Run dan baca tiga pesan. Cocokkan warna dengan makna yang juga ditulis dalam judul dan kalimat.",
      "Coba menutup pesan, lalu menampilkannya kembali. Ubah kalimat error menjadi petunjuk perbaikan yang lebih spesifik.",
      "Gunakan role=status untuk hasil biasa dan role=alert secara hati-hati untuk perubahan yang perlu segera diumumkan. Jangan memberi semua pesan sifat mendesak."
    ], [
      ["background-color", "bg-emerald-50 · bg-amber-50 · bg-red-50", "Latar lembut membedakan sukses, perhatian, dan error."],
      ["border-color", "border-emerald-200 · border-amber-200 · border-red-200", "Garis mengikuti jenis pesan tetapi maknanya tetap dijelaskan lewat teks."],
      ["color", "text-emerald-900 · text-amber-900 · text-red-900", "Teks gelap untuk kontras pada latar lembut."],
      ["padding dan border-radius", "p-4 · rounded-lg", "Ruang 1rem dan sudut 0.5rem untuk membatasi pesan."],
      ["display: none", "hidden", "Pembanding utility untuk menyembunyikan pesan. Contoh interaktif memakai atribut HTML hidden."]
    ], [
      componentExample("jenis", "Sukses, perhatian, dan error", "Tiga hasil berbeda membutuhkan tulisan yang menjelaskan maknanya.", "Setiap kotak memakai kombinasi latar, garis, dan warna teks. Label pada judul tetap menjelaskan keadaan tanpa warna.", '<div class="space-y-3"><div class="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900"><strong>Berhasil</strong><p>Format isian sudah benar.</p></div><div class="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900"><strong>Perhatian</strong><p>Periksa kembali jadwal sebelum melanjutkan.</p></div><div class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-900"><strong>Perlu diperbaiki</strong><p>Isi email dengan format nama@example.com.</p></div></div>', "Ganti isi pesan error agar menyebut kolom yang harus diperbaiki.", "Contoh ini hanya pesan statis untuk membandingkan styling.", [0, 1, 2, 3]),
      componentExample("tutup", "Pesan yang bisa ditutup", "Pengguna boleh menutup informasi setelah membacanya dan membukanya kembali jika perlu.", "Button memiliki nama yang jelas. Setelah pesan ditutup, fokus dikembalikan ke tombol Tampilkan agar tidak hilang pada elemen tersembunyi.", `<button id="showAlert" type="button" class="${essentialButton}">Tampilkan pesan</button><div id="notice" class="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900"><div class="flex items-center justify-between gap-3"><p id="noticeText" role="status">Contoh siap dipelajari.</p><button id="closeAlert" type="button" aria-label="Tutup pesan" class="rounded px-3 py-1 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2">×</button></div></div>`, "Tutup lalu buka lagi; coba alur yang sama dengan keyboard.", "Menyembunyikan lewat atribut hidden tidak menghapus isi dokumen.", [0, 1, 2, 3, 4], 'document.querySelector("#closeAlert").addEventListener("click", function () {\n  document.querySelector("#notice").hidden = true;\n  document.querySelector("#showAlert").focus();\n});\ndocument.querySelector("#showAlert").addEventListener("click", function () {\n  document.querySelector("#notice").hidden = false;\n  document.querySelector("#noticeText").textContent = "Pesan ditampilkan kembali.";\n});')
    ]),
    componentLesson("tw-badge-list", "Badge dan daftar informasi", "inline-flex, rounded-full, divide-y, dan text-sm", [
      "Status seperti Aktif atau jumlah peserta sebaiknya ringkas, tetapi tetap mudah dibaca. Badge membantu menandainya di dalam kartu atau daftar.",
      "Badge hanyalah teks kecil dengan latar dan bentuk yang jelas, bukan tombol otomatis. Dalam daftar, divide-y memisahkan baris dan flex menempatkan nama serta status di dua sisi. Kita tetap memakai ul dan li untuk struktur daftar.",
      "Run dan bandingkan badge status dengan tombol. Pada daftar, lihat bagaimana jarak dan pemisah membantu memindai baris.",
      "Tambah satu peserta dengan status baru, lalu ubah warna badge tanpa mengganti maknanya.",
      "Badge yang hanya memberi informasi tidak perlu dibuat button. Selalu tulis statusnya; warna saja tidak cukup menjelaskan keadaan."
    ], [
      ["display", "inline-flex · flex", "Badge mengalir bersama teks, sedangkan baris daftar memakai flex untuk posisi isi."],
      ["border-radius", "rounded-full", "Bentuk pil pada label pendek, bukan penanda bahwa label bisa diklik."],
      ["font-size dan padding", "text-sm · px-2 · py-1", "Teks 0.875rem dengan ruang mendatar 0.5rem dan vertikal 0.25rem."],
      ["background-color dan color", "bg-emerald-100 · text-emerald-900 · bg-amber-100", "Status diberi latar lembut dan teks kontras."],
      ["border antar-anak", "divide-y", "Garis pemisah 1px antara item daftar langsung."],
      ["justify-content", "justify-between", "Nama di awal dan status di ujung pada baris daftar."]
    ], [
      componentExample("badge", "Badge untuk status dan jumlah", "Status kursus dan jumlah peserta bisa ditampilkan dekat judul tanpa bersaing dengan aksi utama.", "Inline-flex, padding kecil, dan rounded-full membentuk label ringkas. Isi teks menyebut status atau jumlahnya.", '<div class="flex flex-wrap gap-2"><span class="inline-flex rounded-full bg-emerald-100 px-2 py-1 text-sm font-medium text-emerald-900">Aktif</span><span class="inline-flex rounded-full bg-amber-100 px-2 py-1 text-sm font-medium text-amber-900">Menunggu</span><span class="inline-flex rounded-full bg-blue-100 px-2 py-1 text-sm font-medium text-blue-900">24 peserta</span></div>', "Tambahkan badge Selesai dan pilih palet yang tetap kontras.", "Semua badge contoh adalah informasi, bukan kontrol yang menerima klik.", [0, 1, 2, 3]),
      componentExample("daftar", "Daftar dengan nama dan status", "Daftar peserta perlu baris yang mudah dibedakan dan status yang cepat dikenali.", "Ul menampung li; divide-y pada induk memberi pemisah. Setiap li memakai flex dan justify-between untuk nama serta badge.", '<ul class="max-w-md divide-y rounded-lg border bg-white"><li class="flex items-center justify-between gap-3 p-4"><span>Ayu</span><span class="inline-flex rounded-full bg-emerald-100 px-2 py-1 text-sm text-emerald-900">Hadir</span></li><li class="flex items-center justify-between gap-3 p-4"><span>Budi</span><span class="inline-flex rounded-full bg-amber-100 px-2 py-1 text-sm text-amber-900">Menunggu</span></li></ul>', "Tambah peserta Citra dan periksa apakah pemisah otomatis muncul.", "Untuk data yang punya banyak kolom saling terkait, pertimbangkan tabel daripada daftar sederhana.", [0, 2, 3, 4, 5])
    ]),
    componentLesson("tw-accordion", "Accordion dengan details dan summary", "open:, group-open:, border, dan padding", [
      "Penjelasan tambahan tidak harus memenuhi halaman sejak awal. Accordion membantu pengguna membuka jawaban yang sedang dibutuhkan.",
      "HTML details dan summary sudah menyediakan interaksi buka-tutup dengan keyboard, tanpa JavaScript. Tailwind menghias kotak dan membaca keadaan open untuk warna serta tanda plus. Ini contoh penting: tidak semua interaksi membutuhkan library tambahan.",
      "Run, klik judul, lalu gunakan Tab dan Enter atau Space. Amati isi yang muncul serta warna ketika details terbuka.",
      "Pada kumpulan FAQ, buka dua jawaban. Ubah class group-open untuk melihat penanda ikut berubah.",
      "Contoh FAQ membolehkan beberapa item terbuka sekaligus. Summary harus tetap jelas sebagai kontrol; jangan menyembunyikan instruksi utama yang selalu dibutuhkan."
    ], [
      ["background-color pada atribut open", "open:bg-white", "Latar berubah ketika details memiliki atribut open."],
      ["box-shadow pada atribut open", "open:ring-1", "Penanda tambahan saat bagian terbuka; HTML mengatur statusnya."],
      ["transform saat induk group terbuka", "group-open:rotate-45", "Tanda plus diputar 45° ketika details.group terbuka."],
      ["cursor", "cursor-pointer", "Petunjuk bahwa summary bisa diaktifkan; interaksinya tetap berasal dari HTML."],
      ["border dan padding", "border · p-4 · px-4 · pb-4", "Batas kotak, ruang judul, serta ruang isi. Tidak mengubah cara toggle bekerja."]
    ], [
      componentExample("dasar", "Satu jawaban buka-tutup", "Satu catatan dapat disimpan di bawah judul yang jelas.", "Klik summary untuk mengubah atribut open pada details. Tidak ada handler JavaScript; open:bg-white dan open:ring-1 mengikuti keadaan HTML itu.", '<details class="max-w-lg rounded-lg border bg-slate-100 open:bg-white open:ring-1 open:ring-emerald-500"><summary class="cursor-pointer p-4 font-semibold focus-visible:outline focus-visible:outline-2">Apa tugas utility class?</summary><p class="px-4 pb-4 leading-relaxed">Utility menerapkan aturan CSS kecil yang bisa digabung untuk menyusun komponen.</p></details>', "Tambahkan atribut open untuk keadaan awal terbuka.", "Tanda panah bawaan summary membantu memberi petunjuk buka-tutup.", [0, 1, 3, 4]),
      componentExample("faq", "Kumpulan FAQ dengan penanda", "Beberapa pertanyaan dapat dibuka terpisah sehingga pengguna memilih jawaban yang dibutuhkan.", "Setiap details diberi group. Span tanda plus memakai group-open:rotate-45 untuk mengikuti hanya kotak induknya.", '<div class="max-w-lg space-y-3"><details class="group rounded-lg border bg-white"><summary class="cursor-pointer p-4 font-semibold focus-visible:outline focus-visible:outline-2">Apakah perlu JavaScript? <span aria-hidden="true" class="ml-2 inline-block group-open:rotate-45">+</span></summary><p class="px-4 pb-4">Tidak untuk details dan summary dasar ini.</p></details><details class="group rounded-lg border bg-white"><summary class="cursor-pointer p-4 font-semibold focus-visible:outline focus-visible:outline-2">Bisa dibuka lewat keyboard? <span aria-hidden="true" class="ml-2 inline-block group-open:rotate-45">+</span></summary><p class="px-4 pb-4">Ya, fokuskan summary lalu tekan Enter atau Space.</p></details></div>', "Tambah pertanyaan ketiga dan buka dua jawaban bersamaan.", "Tanda plus bersifat dekoratif dan diberi aria-hidden. Semantik buka-tutup tetap dari details.", [2, 3, 4])
    ])
  ] }
];

const essentialTrack = lessonCatalog.find((track) => track.sectionId === "tailwind");
essentialFormGroups.forEach((group) => {
  group.number = essentialTrack.groups.length + 1;
  group.lessons.forEach((lesson, index) => Object.assign(lesson, {
    sectionId: essentialTrack.sectionId, groupTitle: group.title,
    groupNumber: group.number, number: `${group.number}.${index + 1}`,
    practiceTitle: `Mencoba ${lesson.title.toLowerCase()}`
  }));
  essentialTrack.groups.push(group);
});
