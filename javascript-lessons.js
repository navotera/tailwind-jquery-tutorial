// Materi native memakai katalog, navigasi, source renderer, dan workspace yang sama.
// Dimuat setelah pengayaan Tailwind/jQuery agar tidak ikut builder proyek library.
const javascriptExampleStyles = `
main { max-width: 680px; margin: 0 auto; padding: 24px; }
h1 { font-size: 24px; }
label { display: block; margin-top: 16px; }
input, button { font: inherit; padding: 10px; border: 1px solid #64748b; border-radius: 6px; }
button { margin-top: 12px; background: #e1f4ec; color: #17212f; cursor: pointer; }
input { max-width: 100%; }
pre { padding: 16px; background: #f1f5f9; white-space: pre-wrap; overflow-wrap: anywhere; }
.is-highlighted { background: #e1f4ec; padding: 12px; }
li { margin-top: 8px; }
:focus-visible { outline: 3px solid #087f5b; outline-offset: 3px; }
`;

function javascriptSection(id, title, context, explanation, js, exercise, note, html = '<pre id="result" role="status">Hasil akan muncul setelah Run.</pre>') {
  return {
    id, title, paragraphs: [context, explanation], exercise, note,
    codeFile: "js", runtime: "none",
    code: { html: `<main>\n<h1>${title}</h1>\n${html}\n</main>`, css: javascriptExampleStyles, js }
  };
}

const javascriptBasicSections = [
  javascriptSection("pengenalan", "Peran JavaScript dan urutan eksekusi",
    "JavaScript adalah bahasa untuk menulis instruksi yang dijalankan browser. HTML membuat elemen seperti paragraf dan tombol, CSS mengatur tampilannya, lalu JavaScript dapat mengganti teks atau menanggapi klik. Kita mulai dengan satu instruksi yang mengubah tulisan di halaman.",
    "Pada contoh pertama, document berarti dokumen HTML yang sedang dijalankan. document.querySelector(\"#result\") mencari elemen dengan id result, sedangkan .textContent = memberi teks baru kepada elemen itu. Ketik baris tersebut di tab JavaScript, kemudian tekan Run. Cara memilih elemen akan dipelajari lebih lengkap pada bagian DOM.",
    `document.querySelector("#result").textContent = "Halo! Teks ini diubah oleh JavaScript native.";
console.log("Script selesai dijalankan.");`,
    "Ubah pesan hasil, lalu tambahkan instruksi kedua yang mengganti teks lagi. Prediksi pesan mana yang akhirnya terlihat.",
    "JavaScript adalah bahasa; jQuery adalah library yang ditulis dengan JavaScript. Seluruh contoh dasar ini berjalan tanpa jQuery."),

  javascriptSection("variabel", "Variabel, var, let, const, dan tipe data",
    "Variabel adalah nama yang kita berikan untuk menyimpan dan menggunakan sebuah nilai. Contohnya, let completed = 2; membuat variabel bernama completed dengan nilai awal 2. Kata let melakukan deklarasi, completed adalah nama variabel, tanda = memberikan nilai, dan 2 adalah nilai yang disimpan.",
    "Untuk mengganti nilai setelah variabel dibuat, tulis completed = 3; tanpa mengulang let. Const juga membuat variabel, tetapi variabel itu tidak boleh diberi nilai baru setelah deklarasi. Istilah konstanta di sini berarti ikatan nama dengan nilainya tidak dapat ditugaskan ulang; aturan itu tidak membekukan isi object atau array.",
    `var oldName = "Ayu";
var oldName = "Bima"; // var mengizinkan deklarasi nama yang sama.
const name = "Ayu";
let completed = 2;
const active = true;
let nextLesson;
const mentor = null;
completed = completed + 1;

document.querySelector("#result").textContent =
  "Peserta: " + name + " (" + typeof name + ")\\n" +
  "Latihan selesai: " + completed + " (" + typeof completed + ")\\n" +
  "Aktif: " + active + " (" + typeof active + ")\\n" +
  "Materi berikutnya: " + nextLesson + "\\n" +
  "Mentor: " + mentor + "\\n" +
  "Nama pada var lama: " + oldName;`,
    "Ubah nilai awal completed menjadi 4 dan active menjadi false: hasil latihan harus 5 dan status aktif harus false. Tambahkan name = \"Bima\"; untuk melihat kegagalan penugasan ulang const, lalu hapus baris itu dan Run kembali. Jangan menambahkan const kedua dengan nama name.",
    "Const tidak membuat isi array atau object menjadi kebal perubahan. Typeof null menghasilkan object; gunakan pemeriksaan nilai === null untuk kasus itu."),

  javascriptSection("operator", "Operator dan konversi angka",
    "Operator adalah simbol yang mengerjakan sesuatu terhadap nilai. Misalnya, 2 + 1 menghitung penjumlahan dan 12000 * 2 menghitung perkalian. Bedakan angka 2 dengan teks \"2\": angka ditulis tanpa tanda kutip, sedangkan teks memakai tanda kutip.",
    "Tanda + menjumlahkan dua angka, tetapi dapat menyambung teks jika salah satu nilai berupa string. Number(\"2\") menghasilkan angka 2. Karena itu, contoh menyimpan teks pada quantityText lalu mengubahnya menjadi angka quantity sebelum menghitung total. Operator === memeriksa kesamaan nilai dan tipe tanpa konversi otomatis.",
    `const price = 12000;
const quantityText = "2";
const quantity = Number(quantityText);
const total = price * quantity;

document.querySelector("#result").textContent =
  "Teks + angka: " + (quantityText + 1) + "\\n" +
  "Angka + angka: " + (quantity + 1) + "\\n" +
  "Total: Rp" + total + "\\n" +
  "Angka valid: " + Number.isFinite(quantity) + "\\n" +
  "2 sama dengan teks 2: " + (2 === "2");`,
    "Ganti \"2\" menjadi \"3\" dengan tetap memakai tanda kutip: total harus 36000. Ganti lagi menjadi \"abc\": total menjadi NaN dan Angka valid menjadi false. Pulihkan \"2\" setelah mencatat penyebabnya.",
    "Number('') menghasilkan 0. Periksa input kosong sebelum konversi agar nilai kosong tidak dianggap sebagai angka yang sengaja dimasukkan."),

  javascriptSection("kondisi", "Percabangan if/else dan logika",
    "Percabangan memilih instruksi berdasarkan keadaan. Tulis if (kondisi) { instruksi; }: kondisi di dalam kurung diperiksa dahulu dan isi kurung kurawal dijalankan jika hasilnya benar. Contoh memutuskan apakah nilai peserta minimal 75 dan tugasnya sudah dikumpulkan.",
    "Else if memeriksa kondisi berikutnya ketika kondisi sebelumnya gagal. Else menjadi pilihan terakhir jika tidak ada kondisi sebelumnya yang cocok. Pada rangkaian ini hanya satu cabang dijalankan. Variabel message dibuat sebelum percabangan agar setiap cabang dapat mengisi pesan yang nanti ditampilkan.",
    `const score = 80;
const submitted = true;
let message;

if (score >= 75 && submitted) {
  message = "Siap melanjutkan ke materi berikutnya.";
} else if (!submitted) {
  message = "Kumpulkan tugas terlebih dahulu.";
} else {
  message = "Ulangi latihan hingga nilai minimal 75.";
}

document.querySelector("#result").textContent = message;`,
    "Coba nilai 74 dan 75, masing-masing dengan submitted true serta false. Buat tabel dugaan sebelum menjalankan empat kombinasi itu.",
    "Penugasan memakai =, sedangkan perbandingan memakai ===. Kurung kurawal membantu melihat instruksi yang termasuk dalam setiap cabang."),

  javascriptSection("fungsi", "Fungsi, parameter, dan return",
    "Fungsi adalah kumpulan instruksi yang diberi nama dan dapat dipanggil berulang. Untuk membuatnya, tulis function namaFungsi(parameter) { instruksi; }. Pada contoh, nama fungsinya calculateTotal dan dua parameter, price serta quantity, menjadi nama untuk masukan yang akan diterima.",
    "Definisi fungsi menjelaskan cara bekerja; pemanggilan menjalankan cara tersebut. Pemanggilan calculateTotal(15000, 2) mengirim dua argumen: price menerima 15000 dan quantity menerima 2. Instruksi return price * quantity; mengembalikan 30000 ke pemanggil, sehingga const bookTotal menyimpan angka 30000.",
    `function calculateTotal(price, quantity) {
  return price * quantity;
}

const bookTotal = calculateTotal(15000, 2);
const penTotal = calculateTotal(4000, 3);

document.querySelector("#result").textContent =
  "Buku: Rp" + bookTotal + "\\n" +
  "Pulpen: Rp" + penTotal + "\\n" +
  "Seluruh belanja: Rp" + (bookTotal + penTotal);`,
    "Ubah harga buku menjadi 20000 dan jumlahnya menjadi 2: total buku harus 40000. Setelah itu, gunakan contoh parameter discount di atas untuk menambah diskon 5000: pemanggilan calculateTotal(20000, 2, 5000) harus menghasilkan 35000.",
    "Console.log menampilkan informasi untuk pengamatan; return memberikan nilai yang dapat dipakai oleh kode lain. Keduanya memiliki tugas berbeda."),

  javascriptSection("array-object", "Array dan object untuk data peserta",
    "Object mengelompokkan informasi milik satu hal menggunakan nama property. Tulis { name: \"Ayu\", score: 80 }: name dan score adalah nama property, sedangkan \"Ayu\" dan 80 adalah nilainya. Ekspresi firstParticipant.name membaca property name, dan firstParticipant.score = 85; mengganti nilai property score.",
    "Array menyimpan urutan item di dalam [ ]. Variabel participants berisi beberapa object peserta. Indeks adalah nomor posisi item, dimulai dari 0; participants[0] mengambil object pertama. Gabungkan dengan tanda titik menjadi participants[0].name untuk membaca nama peserta pertama.",
    `const firstParticipant = { name: "Ayu", score: 80 };
const participants = [firstParticipant, { name: "Bima", score: 70 }];
participants.push({ name: "Citra", score: 90 });
firstParticipant.score = 85;

document.querySelector("#result").textContent =
  "Jumlah peserta: " + participants.length + "\\n" +
  "Peserta pertama: " + participants[0].name + "\\n" +
  "Nilai terbaru: " + participants[0].score;`,
    "Tambahkan property course pada setiap peserta. Tampilkan nama dan course peserta terakhir memakai indeks participants.length - 1.",
    "Indeks di luar batas menghasilkan undefined. Membaca property dari nilai undefined akan menimbulkan error; periksa jumlah item terlebih dahulu."),

  javascriptSection("perulangan", "Perulangan for dan for...of",
    "Perulangan menjalankan instruksi berulang tanpa mengetik salinan instruksi itu. For...of cocok ketika ingin memproses setiap item array. Pada for (const name of participants), name menerima nama pertama, lalu nama kedua, lalu nama ketiga; isi kurung kurawal dijalankan sekali untuk setiap item.",
    "For biasa ditulis for (nilaiAwal; kondisi; perubahan) { instruksi; }. Contoh dimulai dari number = 1, berjalan selama number <= 3, lalu menambah number sebanyak 1 setelah setiap putaran. Total menyimpan hasil penjumlahan dari putaran yang sudah dikerjakan.",
    `const participants = ["Ayu", "Bima", "Citra"];
let listText = "";

for (const name of participants) {
  listText += "- " + name + "\\n";
}

let total = 0;
for (let number = 1; number <= 3; number += 1) {
  total += number;
}

document.querySelector("#result").textContent =
  listText + "Jumlah angka 1 sampai 3: " + total;`,
    "Tambah satu nama ke array dan ubah batas penjumlahan menjadi 5. Prediksi jumlah baris dan hasil penjumlahan sebelum Run.",
    "Pastikan kondisi perulangan akhirnya false. Jangan menghapus perubahan penghitung karena perulangan yang tidak selesai dapat membuat preview berhenti merespons."),

  javascriptSection("dom", "DOM, selector, value, dan textContent",
    "DOM adalah bentuk dokumen HTML yang dapat dibaca dan diubah JavaScript sebagai kumpulan elemen. Elemen input pada contoh mempunyai id participantName. Tulis document.querySelector(\"#participantName\") untuk mencari elemen itu; tanda # berarti mencari berdasarkan ID, bukan bagian dari nama ID HTML.",
    "Variabel nameInput menyimpan elemen input, bukan langsung teks yang diketik. Property nameInput.value membaca teksnya. Variabel greeting menyimpan elemen paragraf, dan greeting.textContent = ... mengganti isi paragraf. Jadi, memilih elemen, membaca data, dan menampilkan data adalah tiga langkah terpisah.",
    `const nameInput = document.querySelector("#participantName");
const greeting = document.querySelector("#greeting");

greeting.textContent = "Halo, " + nameInput.value.trim() + "!";
greeting.classList.add("is-highlighted");`,
    "Ubah value awal pada tab HTML lalu Run. Setelah itu, ubah nama langsung di preview dan amati mengapa sapaan belum berubah tanpa event handler.",
    "Elemen null biasanya menunjukkan selector salah atau script berjalan sebelum HTML tersedia. Teks nama yang mengandung markup tetap harus tampil sebagai teks.",
    '<label for="participantName">Nama peserta</label>\n<input id="participantName" value="Ayu">\n<p id="greeting" role="status">Sapaan awal.</p>'),

  javascriptSection("event", "Event, callback, dan form",
    "Event adalah kejadian yang dikenali browser, misalnya klik, perubahan isi input, atau pengiriman form. Listener adalah pendaftaran fungsi untuk menanggapi kejadian tersebut. Tulis form.addEventListener(\"submit\", fungsi): fungsi itu dipanggil browser ketika form dikirim, bukan ketika listener dipasang.",
    "Callback adalah fungsi yang diberikan kepada kode lain agar dipanggil pada waktu yang diperlukan. Function (event) { ... } dalam contoh menjadi callback; browser mengisi parameter event dengan informasi kejadian. Event.preventDefault() menahan tindakan bawaan submit, sehingga demo tidak membuka halaman baru.",
    `const form = document.querySelector("#greetingForm");
const nameInput = document.querySelector("#participantName");
const message = document.querySelector("#message");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (name.length < 3) {
    message.textContent = "Isi nama minimal tiga karakter.";
    nameInput.focus();
    return;
  }
  message.textContent = "Halo, " + name + "! Form tidak dikirim ke server.";
});`,
    "Kirim nama kosong, dua karakter, dan nama lengkap. Tambahkan event input yang menampilkan jumlah karakter tanpa mengubah validasi submit.",
    "Tuliskan callback sebagai function atau berikan referensi fungsi. Memanggil fungsi langsung saat memasang listener akan menjalankannya terlalu awal.",
    '<form id="greetingForm" novalidate>\n  <label for="participantName">Nama peserta</label>\n  <input id="participantName" autocomplete="name">\n  <button type="submit">Tampilkan sapaan</button>\n</form>\n<p id="message" role="status">Isi nama lalu kirim form.</p>')
];

// Cara memasang script dipelajari sebelum variabel dan perhitungan.
const javascriptScriptSections = [
  {
    id: "script-html", title: "Menambahkan JavaScript langsung di HTML",
    codeFile: "html", runtime: "document",
    paragraphs: [
      "Browser mengenali kode JavaScript di HTML melalui pasangan tag <script> dan </script>. Tulis instruksi di antara kedua tag itu. Cara ini disebut script inline: HTML dan JavaScript berada di satu file.",
      "Contoh di bawah mempunyai paragraf dengan id result. Baris document.querySelector('#result') mencari paragraf tersebut; .textContent mengganti tulisannya. Simbol # berarti mencari berdasarkan ID. Kita memakai baris ini untuk melihat apakah script benar-benar dijalankan.",
      "Letakkan script setelah paragraf, sebelum </body>, supaya elemen yang dicari sudah tersedia ketika instruksi berjalan. Menaruh script yang langsung mencari elemen di head tanpa menunggu HTML dapat membuat pencarian menghasilkan null.",
      "Pada file sendiri, simpan seluruh contoh sebagai index.html lalu buka di browser. Pada tutorial ini, contoh lengkap berada di tab HTML; tab JavaScript dibiarkan kosong karena instruksinya sudah ditulis dalam tag script."
    ],
    steps: [
      "Buat file index.html dan ketik kerangka dokumen: doctype, html, head, dan body sesuai contoh lengkap di bawah.",
      "Di dalam body, ketik paragraf dengan id result dan teks awal Script belum dijalankan. Pertahankan ID agar cocok dengan selector.",
      "Setelah paragraf, ketik tag pembuka <script>, instruksi penggantian teks, lalu tag penutup </script>. Jangan letakkan instruksi di luar pasangan tag itu.",
      "Simpan lalu muat ulang file di browser, atau tekan Run di workspace. Hasil yang diharapkan: JavaScript dari HTML berhasil berjalan.",
      "Ganti pesan di dalam tanda kutip, simpan, dan muat ulang lagi. Pastikan perubahan teks berasal dari instruksi JavaScript yang kamu ubah."
    ],
    note: "Untuk script inline biasa, defer tidak menunda eksekusi. Pakai posisi setelah elemen yang dibutuhkan; penggunaan defer untuk file eksternal dibahas pada bagian berikutnya.",
    exercise: "Ubah pesan menjadi Halo dari kelas saya. Tambahkan paragraf kedua dengan ID berbeda dan satu instruksi untuk mengubahnya. Kedua pesan harus berubah setelah Run.",
    references: [{ url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script", label: "Elemen script di HTML" }],
    code: {
      html: `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Script langsung di HTML</title>
</head>
<body>
  <h1>JavaScript di HTML</h1>
  <p id="result">Script belum dijalankan.</p>

  <script>
    document.querySelector("#result").textContent =
      "JavaScript dari HTML berhasil berjalan.";
  </script>
</body>
</html>`,
      css: "/* Contoh ini tidak membutuhkan CSS tambahan. */",
      js: "// Instruksi JavaScript berada di dalam tag script pada tab HTML."
    }
  },
  javascriptSection("file-javascript", "Membuat file JavaScript terpisah",
    "Jika instruksi semakin panjang, simpan JavaScript dalam file tersendiri dengan ekstensi .js. Buat folder latihan berisi index.html dan javascript-example.js; kedua file berada pada tingkat folder yang sama.",
    "Isi javascript-example.js hanya dengan instruksi pada contoh berikut. Jangan tulis tag <script> dalam file .js: tag tersebut milik HTML. Nama file harus sama persis dengan nama yang nanti ditulis pada atribut src.",
    `document.querySelector("#result").textContent =
  "JavaScript dari file terpisah berhasil berjalan.";`,
    "Buat javascript-example.js di folder latihanmu dan ketik kode contoh. Bagian berikutnya menyediakan index.html yang menghubungkan file itu; membuka file .js saja tidak menghasilkan halaman HTML.",
    "Workspace menjalankan tab JavaScript setelah HTML pendukung tersedia. Pada file sendiri, index.html harus menghubungkan file .js dengan tag script; hubungan itu tidak dibuat otomatis.",
    '<p id="result">Script belum dijalankan.</p>'),
  {
    id: "script-eksternal", title: "Menghubungkan file .js dengan src dan defer",
    codeFile: "html", runtime: "document",
    paragraphs: [
      "Atribut src memberi tahu browser lokasi file JavaScript yang harus dimuat. Tuliskan <script src='./javascript-example.js' defer></script> di head. Awalan ./ berarti file berada di folder yang sama dengan halaman HTML pada latihan ini.",
      "Defer membuat script eksternal biasa dijalankan setelah HTML selesai dibaca. Karena itu, script dalam head tetap dapat menemukan paragraf di body. Alternatifnya, letakkan <script src='./javascript-example.js'></script> setelah paragraf, sebelum </body>.",
      "Saat menggunakan src, simpan instruksi di file .js dan kosongkan isi pasangan tag script. Hindari memasang versi inline dan eksternal sekaligus untuk instruksi yang sama agar tidak berjalan dua kali.",
      "File javascript-example.js pada aplikasi ini sudah berisi kode dari bagian sebelumnya sehingga contoh dapat dijalankan. Untuk latihan di folder sendiri, ketik file .js itu terlebih dahulu, simpan HTML berikut sebagai index.html di sebelahnya, lalu buka index.html melalui browser."
    ],
    steps: [
      "Siapkan index.html dan javascript-example.js dalam satu folder. Isi file .js memakai contoh dari bagian Membuat file JavaScript terpisah.",
      "Ketik HTML lengkap di bawah. Perhatikan bahwa script berada di head, mempunyai src serta defer, dan tidak berisi instruksi di antara tag pembuka/penutup.",
      "Simpan kedua file, buka index.html, dan muat ulang. Hasil yang diharapkan: JavaScript dari file terpisah berhasil berjalan.",
      "Jika pesan awal tidak berubah, buka DevTools Network lalu muat ulang. Cari javascript-example.js; status 404 berarti lokasi atau nama file perlu diperbaiki. Periksa juga pesan error di Console.",
      "Coba pindahkan file ke folder js. Ubah src menjadi ./js/javascript-example.js, lalu muat ulang untuk memastikan lokasi baru sesuai.",
      "Sebagai variasi, kembalikan file ke folder awal, pindahkan tag script ke akhir body, dan hapus defer. Pesan tetap harus berubah karena paragraf tersedia sebelum script dijalankan."
    ],
    note: "Defer dibahas di sini untuk script eksternal biasa, tanpa type module. Jangan memakai async untuk latihan yang membutuhkan urutan ini; async menjalankan script ketika selesai dimuat dan tidak menjamin HTML sudah selesai dibaca.",
    exercise: "Jalankan versi head + defer dan versi akhir body. Catat posisi tag script serta hasil keduanya. Sengaja salah ketik src, temukan request gagal di Network, lalu pulihkan path.",
    references: [{ url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script", label: "Atribut src, defer, dan async" }],
    connections: [{ id: "js-basic/file-javascript", label: "Isi file javascript-example.js" }],
    code: {
      html: `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Memuat file JavaScript</title>
  <script src="./javascript-example.js" defer></script>
</head>
<body>
  <h1>JavaScript dari file terpisah</h1>
  <p id="result">Script belum dijalankan.</p>
</body>
</html>`,
      css: "/* Contoh ini tidak membutuhkan CSS tambahan. */",
      js: "// HTML memuat javascript-example.js melalui src. Isi file ditampilkan pada bagian Membuat file JavaScript terpisah."
    }
  }
];
javascriptBasicSections.splice(1, 0, ...javascriptScriptSections);

const browserDebuggingSteps = [
  "Buka DevTools melalui menu browser atau F12/Ctrl+Shift+I pada Windows. Buka Console, jalankan contoh, lalu pilih konteks frame preview agar document menunjuk HTML hasil, bukan halaman tutorial.",
  "Pada Sources, cari contoh-script.js yang dibuat oleh tab JavaScript setelah Run. Klik nomor baris perhitungan untuk memasang breakpoint; kemudian klik tombol di preview. Untuk script inline HTML, buka sumber frame preview yang sesuai.",
  "Saat berhenti, periksa Scope dan tambahkan Watch untuk typeof quantity serta quantity. Gunakan Step over untuk satu instruksi, Step into untuk masuk fungsi, dan Resume untuk melanjutkan. Perbaiki kode di editor tutorial lalu Run kembali."
];

const javascriptDebuggingSections = [
  javascriptSection("debug-console", "Debugging dengan console dan typeof",
    "Debugging berarti mencari penyebab hasil yang salah lalu memperbaikinya berdasarkan bukti. Mulai dengan menulis hasil yang diharapkan, hasil yang terjadi, dan tindakan yang menghasilkan perbedaan itu. Pada contoh, jumlah \"3\" dan harga 12000 seharusnya menghasilkan total 36000 setelah konversi angka.",
    "Console adalah panel browser tempat script dapat menampilkan informasi untuk diperiksa. Console.log(\"label\", nilai) mencetak label dan nilai tanpa mengubah halaman. Console.table menampilkan array/object dalam tabel, sementara console.assert(kondisi, pesan) menampilkan pesan ketika kondisi bernilai false.",
    `const quantity = "3";
const price = 12000;
console.log("quantity:", quantity, "tipe:", typeof quantity);
console.table([{ quantity: quantity, price: price }]);
const total = Number(quantity) * price;
console.assert(total === 36000, "Perhitungan total tidak sesuai.");
document.querySelector("#result").textContent = "Total: Rp" + total;`,
    "Buka Console, lalu ganti quantity menjadi abc. Catat tipe, nilai total, dan pesan assert. Pulihkan masukan angka dan bandingkan hasilnya.",
    "Gunakan log untuk memeriksa dugaan tertentu. Jangan menampilkan kata sandi atau data pribadi ketika mencoba console pada aplikasi nyata."),
  javascriptSection("debug-error", "Membaca error, stack trace, dan selector null",
    "Error adalah laporan browser bahwa instruksi tidak dapat dijalankan sebagaimana ditulis. Nama error membantu menentukan apa yang perlu diperiksa, tetapi penyebab pastinya tetap dicari dari kode dan nilai saat kejadian. Contoh ini sengaja mempunyai salah ketik #resut, sedangkan HTML mempunyai id result.",
    "Pencarian querySelector mengembalikan null ketika elemen tidak ditemukan. Null tidak mempunyai property textContent yang dapat diisi, sehingga instruksi result.textContent = ... gagal dengan TypeError saat tombol diklik. Perbaikan yang diperlukan adalah mencocokkan selector dengan ID HTML.",
    `document.querySelector("#checkButton").addEventListener("click", function () {
  // Bug latihan: HTML memiliki #result, bukan #resut.
  const result = document.querySelector("#resut");
  console.log("Elemen yang ditemukan:", result);
  result.textContent = "Selector sudah benar.";
});`,
    "Klik Periksa selector, baca error, lalu perbaiki #resut menjadi #result. Run lagi dan pastikan pesan berubah tanpa error baru. Setelah itu coba salah ketik nama variabel untuk mengenali ReferenceError.",
    "Jangan hanya menutup pesan atau menambahkan try/catch untuk menyembunyikannya. Perbaiki penyebabnya, lalu ulangi tindakan yang sebelumnya gagal.",
    '<button id="checkButton" type="button">Periksa selector</button>\n<pre id="result" role="status">Contoh ini sengaja memiliki selector salah.</pre>'),
  javascriptSection("debug-browser", "Debugging browser: breakpoint, Scope, dan Watch",
    "DevTools adalah alat pemeriksaan yang disediakan browser. Breakpoint adalah tempat kita meminta browser berhenti sementara agar nilai variabel dapat dilihat sebelum instruksi berikutnya berjalan. Kita akan memeriksa mengapa input 3 menghasilkan 31, padahal penambahan satu seharusnya menghasilkan 4.",
    "Value pada input menghasilkan string meskipun type input adalah number. Saat quantity berisi \"3\", quantity + 1 menyambung teks dan menjadi \"31\". Berhenti pada baris const total sebelum baris itu dijalankan, periksa quantity dan typeof quantity, lalu tentukan perbaikan berdasarkan nilainya.",
    `document.querySelector("#calculate").addEventListener("click", function () {
  const quantity = document.querySelector("#quantity").value;
  // Hapus // pada baris berikut ketika DevTools sudah terbuka.
  // debugger;
  const total = quantity + 1; // Bug latihan: string disambung dengan angka.
  document.querySelector("#result").textContent = "Jumlah setelah ditambah satu: " + total;
});`,
    "Isi 3, pasang breakpoint sebelum total dihitung, lalu klik Hitung. Periksa typeof quantity; perbaiki rumus menjadi Number(quantity) + 1, kemudian uji 0 dan 10. Tambahkan pemeriksaan input kosong.",
    "Nomor baris editor tutorial bukan breakpoint DevTools. Edit di DevTools bersifat sementara; salin perbaikan dengan mengetik di editor lalu Run. Hapus breakpoint/debugger setelah selesai.",
    '<label for="quantity">Jumlah awal</label>\n<input id="quantity" type="number" value="3">\n<button id="calculate" type="button">Hitung</button>\n<pre id="result" role="status">Klik Hitung untuk mencoba bug konversi.</pre>')
];
javascriptDebuggingSections[0].references = [
  { url: "https://developer.chrome.com/docs/devtools/console/reference/", label: "Console dan konteks JavaScript" }
];
javascriptDebuggingSections[2].references = [
  { url: "https://developer.chrome.com/docs/devtools/javascript/", label: "Debugging JavaScript melalui DevTools" },
  { url: "https://developer.chrome.com/docs/devtools/javascript/breakpoints", label: "Jenis breakpoint" },
  { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger", label: "Pernyataan debugger" }
];
javascriptDebuggingSections[2].connections = [
  { id: "js-basic/operator", label: "Operator dan konversi angka" },
  { id: "js-basic/debug-error", label: "Membaca error sebelum memasang breakpoint" }
];

const javascriptGuidedScript = `const participants = [];
let nextNumber = 1;
const form = document.querySelector("#participantForm");
const nameInput = document.querySelector("#name");
const scoreInput = document.querySelector("#score");
const list = document.querySelector("#participantList");
const message = document.querySelector("#message");

function statusFor(score) {
  if (score >= 75) return "Siap lanjut";
  return "Perlu latihan";
}

function renderParticipants() {
  list.textContent = "";
  for (const participant of participants) {
    const item = document.createElement("li");
    item.textContent = participant.number + ". " + participant.name +
      " — " + participant.score + " — " + statusFor(participant.score);
    list.appendChild(item);
  }
  document.querySelector("#summary").textContent =
    "Jumlah peserta: " + participants.length;
  document.querySelector("#emptyMessage").hidden = participants.length > 0;
  document.querySelector("#clearButton").disabled = participants.length === 0;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const scoreText = scoreInput.value.trim();
  const score = Number(scoreText);
  if (name.length < 3) {
    message.textContent = "Nama harus minimal tiga karakter.";
    nameInput.focus();
    return;
  }
  if (scoreText === "" || !Number.isFinite(score) || score < 0 || score > 100) {
    message.textContent = "Isi nilai angka dari 0 sampai 100.";
    scoreInput.focus();
    return;
  }
  participants.push({ number: nextNumber, name: name, score: score });
  nextNumber += 1;
  renderParticipants();
  form.reset();
  message.textContent = "Peserta ditambahkan. Data hanya berada di memori preview.";
  nameInput.focus();
});

document.querySelector("#clearButton").addEventListener("click", function () {
  participants.length = 0;
  nextNumber = 1;
  renderParticipants();
  message.textContent = "Daftar dikosongkan.";
});

renderParticipants();`;

const javascriptGuidedDocument = `<!doctype html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daftar peserta praktikum</title>
  <style>
    body { margin: 0; font: 16px/1.6 system-ui, sans-serif; color: #17212f; background: #f7f8fa; }
    main, header, footer { max-width: 680px; margin: 0 auto; padding: 24px; }
    nav { display: flex; flex-wrap: wrap; gap: 16px; }
    a { color: #087f5b; }
    section { margin-top: 24px; }
    label { display: block; margin-top: 12px; }
    input, button { font: inherit; padding: 10px; border: 1px solid #64748b; border-radius: 6px; }
    input { max-width: 100%; }
    button { margin-top: 12px; background: #e1f4ec; color: #17212f; cursor: pointer; }
    button:disabled { cursor: default; opacity: .6; }
    li { margin-top: 8px; overflow-wrap: anywhere; }
    :focus-visible { outline: 3px solid #087f5b; outline-offset: 3px; }
    [hidden] { display: none !important; }
  </style>
</head>
<body>
  <header>
    <h1>Daftar peserta praktikum</h1>
    <p>Latihan JavaScript native: data, validasi, perulangan, dan event.</p>
    <nav aria-label="Navigasi proyek">
      <a href="#registration">Tambah peserta</a>
      <a href="#participants">Daftar peserta</a>
      <a href="#studio-journal">Jurnal latihan</a>
    </nav>
  </header>
  <main>
    <section id="registration" aria-labelledby="registrationTitle">
      <h2 id="registrationTitle">Tambah peserta</h2>
      <form id="participantForm" novalidate>
        <label for="name">Nama peserta</label>
        <input id="name" name="name" autocomplete="name" aria-describedby="message">
        <label for="score">Nilai latihan (0–100)</label>
        <input id="score" name="score" type="number" min="0" max="100" aria-describedby="message">
        <div><button type="submit">Tambah peserta</button></div>
      </form>
      <p id="message" role="status">Isi nama minimal tiga karakter dan nilai latihan.</p>
    </section>
    <section id="participants" aria-labelledby="participantsTitle">
      <h2 id="participantsTitle">Daftar peserta</h2>
      <p id="summary" role="status">Jumlah peserta: 0</p>
      <p id="emptyMessage">Belum ada peserta. Tambahkan melalui form di atas.</p>
      <ol id="participantList"></ol>
      <button id="clearButton" type="button" disabled>Kosongkan daftar</button>
    </section>
    <section id="studio-journal" aria-labelledby="journalTitle">
      <h2 id="journalTitle">Jurnal latihan</h2>
      <h3>Dugaan sebelum Run</h3>
      <p>Ganti dengan dugaanmu tentang batas nilai dan perubahan jumlah peserta.</p>
      <h3>Hasil sesudah Run</h3>
      <p>Catat masukan, hasil yang terlihat, serta satu nilai variabel yang diperiksa lewat DevTools.</p>
      <h3>Masalah dan perbaikan</h3>
      <p>Tulis penyebab bug, lokasi breakpoint, dan perubahan kode yang memperbaikinya.</p>
    </section>
  </main>
  <footer>Data hanya berada di memori. Run ulang memulai daftar baru; halaman ini tidak mengirim data.</footer>
  <script>
${javascriptGuidedScript}
  </script>
</body>
</html>`;

const javascriptGuidedSection = {
  id: "guided-learning", title: "Guided learning: daftar peserta praktikum",
  guided: true, runtime: "document", codeFile: "html", moduleCount: 3,
  paragraphs: [
    "Bangun halaman untuk mencatat nama dan nilai peserta tanpa library. Proyek menggabungkan form, daftar hasil, serta jurnal perubahan dengan JavaScript yang ditulis sendiri.",
    "Array menyimpan object peserta; fungsi menentukan status dan merender daftar. Handler submit memeriksa masukan sebelum menambah data. Mulai dari dokumen kosong dan ketik bertahap, lalu gunakan DevTools untuk mengikuti satu pengiriman form."
  ],
  duration: "Praktik bertahap; kerjakan satu bagian dan catat hasil sebelum melanjutkan.",
  steps: [
    "Baca kebutuhan proyek lalu tulis dugaan tentang data yang disimpan, syarat nama, dan batas nilai. Pisahkan data dari elemen yang menampilkannya.",
    "Ketik dokumen HTML dengan lang, charset, viewport, title, header, navigasi, main, dan footer. Jalankan untuk memastikan struktur awal terbaca.",
    "Ketik form nama dan nilai dengan pasangan label/for dan ID yang tepat. Tambahkan tombol submit serta pesan beratribut role status.",
    "Ketik daftar peserta, jumlah peserta, pesan kosong, dan tombol pengosongan. Pastikan seluruh sasaran selector mempunyai ID pada HTML.",
    "Tambahkan CSS native sedikit demi sedikit untuk keterbacaan, ruang antarbagian, keadaan fokus, dan tombol disabled. Coba viewport sempit.",
    "Deklarasikan array participants dan penghitung nextNumber. Pilih const untuk referensi array dan let untuk angka yang akan ditugaskan ulang.",
    "Tulis fungsi statusFor dengan batas nilai 75. Panggil sementara dengan 74 dan 75 untuk memastikan dua cabang memberi hasil berbeda.",
    "Tulis renderParticipants: kosongkan daftar, ulangi data dengan for...of, buat li, isi textContent, lalu tambahkan item ke daftar HTML.",
    "Perbarui jumlah peserta, pesan kosong, dan tombol disabled dari panjang array. Jalankan fungsi render sekali untuk keadaan awal.",
    "Pasang listener submit dan preventDefault. Baca masukan terbaru, trim nama, periksa teks nilai kosong, lalu konversi nilai dengan Number.",
    "Tambahkan validasi nama serta rentang nilai. Jika gagal, tampilkan petunjuk dan fokuskan input; jika berhasil, push object, render, lalu reset form.",
    "Pasang handler pengosongan. Buka Sources, pasang breakpoint sebelum push, kirim form, lalu periksa name, score, dan participants lewat Scope.",
    "Kerjakan delapan tantangan, ulangi kasus nilai kosong/0/74/75/100, dan catat dugaan serta hasil di jurnal. Simpan dokumen hasil ketikan sendiri."
  ],
  challenges: [
    { title: "Identitas kelas", target: "header dan title", instruction: "Ganti judul halaman dan pengantar dengan identitas kelasmu tanpa mengubah ID elemen yang dipakai JavaScript.", expected: "Identitas baru terlihat dan form serta navigasi tetap bekerja.", hint: "Ubah teks yang dibaca pengguna; pertahankan sasaran selector dan href." },
    { title: "Ruang dan fokus", target: "style dan input", instruction: "Perbesar jarak label dengan kolom input, lalu navigasikan seluruh form memakai Tab dan Enter.", expected: "Urutan fokus tetap jelas dan Enter mengirim form tanpa navigasi halaman.", hint: "Atur jarak di CSS dan pertahankan outline focus-visible serta label." },
    { title: "Batas kelulusan", target: "statusFor", instruction: "Ubah batas status Siap lanjut menjadi 80 dan bandingkan peserta bernilai 79 dengan peserta bernilai 80.", expected: "Nilai 79 memerlukan latihan dan nilai 80 memperoleh status Siap lanjut.", hint: "Ubah kondisi dalam satu fungsi, kemudian uji dua nilai di sekitar batas." },
    { title: "Rata-rata nilai", target: "renderParticipants dan #summary", instruction: "Hitung jumlah nilai lewat perulangan dan tampilkan rata-rata; berikan pesan khusus ketika array masih kosong.", expected: "Rata-rata sesuai nilai peserta dan keadaan kosong tidak menampilkan NaN.", hint: "Periksa length sebelum membagi total, lalu format hasil dengan toFixed." },
    { title: "Nama duplikat", target: "listener submit", instruction: "Periksa array sebelum push dan tolak nama yang sama tanpa membedakan huruf besar serta kecil.", expected: "Nama Ayu lalu ayu tidak menghasilkan dua entri dan pengguna menerima pesan jelas.", hint: "Ulangi data dan bandingkan name.toLowerCase() setelah trim." },
    { title: "Satu bug, satu bukti", target: "konversi score", instruction: "Sengaja baca nilai sebagai string, amati typeof di breakpoint, lalu pulihkan konversi sebelum menghitung rata-rata.", expected: "Jurnal mencatat tipe sebelum dan sesudah perbaikan serta hasil hitungan yang benar.", hint: "Gunakan Scope atau Watch saat berhenti; edit kembali sumber di editor tutorial." },
    { title: "Keadaan kosong", target: "#clearButton dan renderParticipants", instruction: "Tambah dua peserta, kosongkan daftar, lalu tambah peserta baru dan periksa nomor serta seluruh pesan keadaan kosong.", expected: "Daftar, ringkasan, tombol, dan nomor pertama kembali konsisten setelah dikosongkan.", hint: "Pengosongan data dan pengaturan ulang nextNumber harus diikuti render." },
    { title: "Jurnal debugging", target: "#studio-journal", instruction: "Ketik masukan yang diuji, breakpoint yang dipasang, nilai variabel yang diamati, dan alasan perbaikan pada jurnal.", expected: "Jurnal berisi hasil percobaan sendiri dan menjelaskan penyebab satu bug yang ditemukan.", hint: "Catat bukti dari pengulangan bug, jangan hanya menulis bahwa contoh berhasil." }
  ],
  completion: [
    "Dokumen HTML hasil ketikan mempunyai identitas sendiri dan menjalankan daftar peserta tanpa library.",
    "Delapan tantangan mempunyai catatan masukan, hasil, dan alasan perubahan, termasuk satu debugging lewat browser.",
    "Form kosong, batas nilai, pengosongan daftar, keyboard, dan layar sempit diperiksa setelah pengembangan."
  ],
  connections: [
    { id: "js-basic", label: "1.1 Dasar bahasa, DOM, dan debugging" },
    { id: "js-basic/array-object", label: "Array dan object peserta" },
    { id: "js-basic/debug-browser", label: "Debugging melalui browser" }
  ],
  note: "Seluruh kode pendukung berada di HTML; dokumen dapat dijalankan sendiri tanpa Tailwind atau jQuery. Data di memori hilang ketika Run diulang. Ketik manual dan simpan hasilmu sebelum Reset.",
  exercise: "Bangun daftar peserta dari kosong, selesaikan tantangan, dan jelaskan alur data → validasi → render sebelum mencoba versi jQuery.",
  code: { html: javascriptGuidedDocument, css: "/* CSS sudah berada dalam dokumen HTML. */", js: "// JavaScript sudah berada dalam dokumen HTML." }
};

// Rincian pedagogis setiap bagian: istilah, bentuk penulisan, pembacaan kode,
// hasil awal, dan pemeriksaan latihan. Renderer dan editor tetap dipakai bersama.
const javascriptTeachingDetails = {
  pengenalan: {
    extraParagraphs: [
      "Kode adalah teks instruksi. Pada contoh sederhana ini instruksi di luar fungsi/event dijalankan berurutan dari atas ke bawah. Jika dua instruksi mengisi paragraf yang sama, instruksi kedua mengganti hasil instruksi pertama.",
      "String adalah teks yang dibatasi tanda kutip. Tanda titik mengakses bagian milik sebuah object, tanda kurung ( ) memanggil fungsi, dan titik koma ; menandai akhir pernyataan dalam gaya penulisan contoh kita. Tuliskan nama API dengan huruf besar/kecil yang tepat, seperti querySelector, bukan QuerySelector.",
      "Teks setelah // pada satu baris adalah komentar dan tidak dijalankan. Di workspace, tab HTML berisi elemen, tab CSS berisi gaya, dan tab JavaScript berisi instruksi; tidak perlu menulis tag script pada tab JavaScript. Run menyiapkan HTML sebelum menjalankan instruksi tersebut."
    ],
    learningGoal: "Menulis satu instruksi JavaScript, menjalankannya, dan membedakan kode dari hasil yang terlihat.",
    learningTables: [{ title: "Peran tiga file pada contoh", headers: ["File", "Yang ditulis", "Pengaruhnya"], rows: [
      ["HTML", "<pre id=\"result\">Teks awal</pre>", "Menyediakan elemen yang akan menampilkan hasil."],
      ["CSS", "pre { background: #f1f5f9; }", "Mengatur latar elemen hasil; tidak mengganti teksnya."],
      ["JavaScript", "document.querySelector(\"#result\").textContent = \"Halo\";", "Mengganti teks elemen hasil ketika instruksi dijalankan."]
    ] }],
    learningSteps: ["Buka tab HTML dan cari id=\"result\". Itulah tempat hasil akan ditampilkan.", "Pada tab JavaScript, ketik ulang instruksi pengubahan teks sesuai contoh. Perhatikan tanda kutip, kurung, dan huruf besar/kecil.", "Tekan Run dan baca preview. Ubah pesan menjadi Halo kelas A, lalu Run sekali lagi."],
    codeWalkthrough: ["document.querySelector(\"#result\") mencari elemen yang sudah disiapkan HTML.", ".textContent = \"Halo! Teks ini diubah oleh JavaScript native.\" memberi teks baru pada elemen itu.", "console.log(...) mengirim pesan ke Console browser; pesan tersebut tidak mengganti isi preview."],
    expectedResults: ["Preview menampilkan: Halo! Teks ini diubah oleh JavaScript native.", "Console browser menerima: Script selesai dijalankan."],
    successCriteria: ["Kamu dapat menunjukkan elemen HTML yang berubah dan baris JavaScript yang mengubahnya.", "Ketika dua baris mengganti teks elemen yang sama, kamu dapat menjelaskan mengapa pesan baris terakhir yang terlihat."]
  },
  "script-html": {
    extraParagraphs: ["Tag script adalah bagian HTML; instruksi di antara tag pembuka dan penutup ditulis menggunakan JavaScript. Pada dokumen contoh, paragraf dibuat lebih dahulu, lalu script mengubah teks paragraf itu. Jika ingin menambahkan pesan kedua, buat elemen HTML kedua dan cocokkan ID-nya dengan selector baru."],
    learningGoal: "Menempatkan JavaScript di dalam dokumen HTML dan menjelaskan mengapa posisi script memengaruhi ketersediaan elemen.",
    learningTables: [{ title: "Membaca script inline", headers: ["Bagian", "Penulisan", "Tugas"], rows: [["Elemen tujuan", "<p id=\"result\">Script belum dijalankan.</p>", "Menyediakan paragraf yang akan diubah."], ["Tag pembuka", "<script>", "Memulai isi JavaScript di dalam HTML."], ["Instruksi", "document.querySelector(\"#result\").textContent = \"Pesan\";", "Mengisi paragraf dengan teks baru."], ["Tag penutup", "</script>", "Mengakhiri isi JavaScript."], ["Posisi", "Sesudah paragraf, sebelum </body>", "Elemen tujuan sudah dibaca sebelum script berjalan."]] }],
    codeWalkthrough: ["Head menyimpan metadata, sedangkan paragraf result dibuat di dalam body.", "Browser mencapai tag script sesudah paragraf tersedia.", "Instruksi mencari #result dan mengganti teks awalnya."],
    expectedResults: ["JavaScript dari HTML berhasil berjalan. terlihat sebagai isi paragraf setelah Run atau setelah file dibuka."],
    successCriteria: ["Kamu dapat menunjukkan batas kode HTML dan kode JavaScript pada dokumen yang sama.", "Kamu dapat menjelaskan mengapa script yang mencari elemen harus dijalankan setelah elemen tersedia."]
  },
  "file-javascript": {
    extraParagraphs: ["File JavaScript adalah berkas teks yang berisi instruksi dengan nama berakhiran .js. Nama file bebas dipilih, tetapi latihan ini memakai javascript-example.js agar sama dengan contoh src pada bagian berikutnya. Pastikan editor benar-benar menyimpan ekstensi .js, bukan menambahkan .txt.", "File .js belum terhubung ke halaman hanya karena berada di folder yang sama. HTML harus memuatnya lewat src. Di workspace hubungan HTML dengan tab JavaScript sudah disediakan aplikasi; pada folder latihanmu, hubungan itu perlu ditulis sendiri."],
    learningGoal: "Membuat file .js berisi instruksi dan membedakannya dari file HTML yang menampilkan halaman.",
    learningTables: [{ title: "Dua file pada folder latihan", headers: ["Nama file", "Isi", "Cara dipakai"], rows: [["index.html", "Elemen halaman dan tag script yang memuat .js", "Dibuka sebagai halaman di browser."], ["javascript-example.js", "Instruksi JavaScript tanpa tag script", "Dimuat oleh HTML; bukan halaman yang dibuka untuk melihat hasil."]] }],
    learningSteps: ["Buat folder latihan dan file javascript-example.js. Ketik instruksi di bawah tanpa tag script.", "Simpan file tersebut dengan ekstensi .js. Siapkan index.html memakai bagian berikutnya.", "Untuk melihat instruksinya bekerja di workspace, Run contoh ini. Untuk folder sendiri, buka index.html setelah src dipasang."],
    codeWalkthrough: ["File hanya berisi instruksi pengubahan textContent.", "Instruksi mencari #result, sehingga HTML yang memuat file harus menyediakan ID itu.", "Tanda kutip membatasi pesan dan titik koma mengakhiri instruksi; tidak ada tag HTML di file .js."],
    expectedResults: ["Workspace menampilkan JavaScript dari file terpisah berhasil berjalan.", "Pada folder sendiri, hasil baru terlihat setelah HTML memuat file .js; file saja tidak membuat paragraf."],
    successCriteria: ["Kamu mempunyai file HTML dan .js terpisah dan tidak menaruh tag script di dalam file .js.", "Nama file yang disimpan cocok dengan src yang ditulis pada HTML."]
  },
  "script-eksternal": {
    extraParagraphs: ["Path adalah alamat berkas relatif terhadap halaman. Pada src=\"./javascript-example.js\", titik menunjukkan folder halaman saat ini. Jika file dipindah ke subfolder js, path berubah menjadi ./js/javascript-example.js. Mengubah nama file di folder harus diikuti perubahan src."],
    learningGoal: "Menghubungkan file JavaScript ke HTML serta memeriksa nama, path, dan waktu eksekusinya.",
    learningTables: [{ title: "Memilih cara memuat script biasa", headers: ["Penulisan", "Kapan dijalankan", "Cocok untuk latihan ini?"], rows: [["Script inline setelah elemen di body", "Ketika browser mencapai tag script", "Ya; elemen yang diperlukan sudah ada."], ["<script src=\"./javascript-example.js\" defer></script> di head", "Setelah dokumen HTML selesai dibaca", "Ya; dipakai pada contoh."], ["Script eksternal tanpa defer di akhir body", "Ketika tag script di akhir body dicapai", "Ya; ditempatkan setelah elemen tujuan."], ["Script eksternal async", "Ketika file selesai dimuat", "Tidak dipakai di latihan ini karena elemen tujuan bisa belum tersedia."]] }],
    codeWalkthrough: ["Src menunjuk file javascript-example.js pada folder yang sama dengan HTML.", "Defer pada script eksternal biasa membuat eksekusi menunggu HTML selesai dibaca.", "File JavaScript mengisi paragraf result. Tidak ada instruksi inline kedua yang menggandakan pekerjaan."],
    expectedResults: ["HTML yang terhubung dengan benar menampilkan JavaScript dari file terpisah berhasil berjalan.", "Jika src salah, teks awal tetap terlihat dan request gagal dapat diperiksa di Network; perbaiki path lalu muat ulang."],
    successCriteria: ["Kamu dapat menjelaskan fungsi src secara terpisah dari fungsi defer.", "Kamu dapat memulihkan file yang tidak ditemukan dengan mencocokkan folder, nama berkas, dan path."]
  },
  variabel: {
    extraParagraphs: [
      "Deklarasi berarti memperkenalkan nama variabel. Inisialisasi berarti memberi nilai pertamanya. Penugasan ulang berarti memberi nilai baru setelah deklarasi. Dalam let completed = 2;, deklarasi dan inisialisasi dilakukan bersama. Pada completed = completed + 1;, nilai lama dibaca, ditambah satu, lalu hasilnya disimpan kembali.",
      "Var adalah cara deklarasi yang sering ditemukan dalam kode lama. Var dan let sama-sama dapat diberi nilai baru, tetapi batas tempat namanya dapat dipakai berbeda. Scope berarti wilayah kode tempat sebuah nama dapat diakses. Blok adalah kelompok instruksi di dalam { }; let dan const mengikuti batas blok, sementara var tidak dibatasi oleh blok biasa dan mengikuti fungsi yang membungkusnya, atau lingkup global jika berada di luar fungsi.",
      "Nama seperti completed, participantName, dan score2 diperbolehkan. Nama tidak boleh dimulai dengan angka, mengandung spasi, atau memakai kata kunci seperti let. Huruf besar/kecil membedakan nama: score dan Score adalah dua nama berbeda. Gunakan nama yang menjelaskan data, seperti participantName, agar mudah dibaca.",
      "Tipe menjelaskan jenis nilai yang disimpan, bukan jenis kata deklarasinya. Let age = 20; menyimpan number, sedangkan let ageText = \"20\"; menyimpan string. Typeof ditulis sebelum nilai, misalnya typeof age, untuk memperoleh teks nama tipe. Undefined pada let nextLesson; berarti variabel sudah dideklarasikan tetapi belum diberi nilai; null pada const mentor = null; adalah nilai kosong yang sengaja dipilih.",
      "Biasakan memilih const ketika tidak perlu mengganti nilai variabel dan let ketika perlu menugaskannya ulang. Var dibahas agar kamu dapat membaca kode lama. Let dan const harus dipakai setelah deklarasinya; jangan mengandalkan penggunaan nama sebelum deklarasi. Pembahasan lebih lanjut tentang hoisting dapat dibaca pada referensi."
    ],
    learningGoal: "Membuat variabel, memberi nilai, mengubah nilai yang diizinkan, dan menjelaskan alasan memilih var, let, atau const.",
    learningTables: [
      { title: "Membaca let completed = 2;", headers: ["Potongan", "Istilah", "Artinya"], rows: [
        ["let", "Kata deklarasi", "Membuat variabel yang dapat diberi nilai baru."], ["completed", "Nama variabel", "Nama yang dipakai untuk membaca atau mengubah nilai."], ["=", "Penugasan", "Memberikan nilai di kanan kepada nama di kiri; bukan perbandingan."], ["2", "Nilai awal", "Angka yang pertama disimpan."], [";", "Akhir pernyataan", "Menutup instruksi dalam gaya penulisan tutorial ini."]
      ] },
      { title: "Perbandingan var, let, dan const", headers: ["Aspek", "var", "let", "const"], rows: [
        ["Bentuk deklarasi", "var score = 80;", "let score = 80;", "const score = 80;"],
        ["Penugasan ulang: score = 90;", "Boleh", "Boleh", "Tidak boleh; menghasilkan TypeError."],
        ["Deklarasi nama yang sama dalam lingkup yang sama", "Boleh untuk deklarasi var lainnya; dapat menimpa nilai lama.", "Tidak boleh; menghasilkan SyntaxError.", "Tidak boleh; menghasilkan SyntaxError."],
        ["Nilai awal saat deklarasi", "Boleh ditunda: var score;", "Boleh ditunda: let score;", "Harus ada pada deklarasi biasa: const score = 80;"],
        ["Batas lingkup (scope)", "Fungsi; di luar fungsi mengikuti lingkup global atau module. Blok biasa tidak membatasinya.", "Blok { }, fungsi, atau lingkup tempat deklarasi berada.", "Blok { }, fungsi, atau lingkup tempat deklarasi berada."],
        ["Dibaca sebelum baris deklarasi dalam lingkupnya", "Dapat menghasilkan undefined; nilai inisialisasinya belum diberikan.", "ReferenceError: variabel belum dapat digunakan.", "ReferenceError: variabel belum dapat digunakan."],
        ["Pilihan untuk kode latihan baru", "Kenali untuk membaca kode lama.", "Gunakan ketika nilai akan ditugaskan ulang, misalnya penghitung.", "Gunakan ketika nilai/referensi variabel tidak akan ditugaskan ulang."]
      ] },
      { title: "Tipe nilai yang dipakai dalam contoh", headers: ["Tipe/nilai", "Contoh penulisan", "Makna dan cara memeriksa"], rows: [
        ["string", "const name = \"Ayu\";", "Teks memakai tanda kutip; typeof name menghasilkan string."],
        ["number", "let completed = 2;", "Angka tanpa tanda kutip; typeof completed menghasilkan number."],
        ["boolean", "const active = true;", "True/false tanpa tanda kutip; typeof active menghasilkan boolean."],
        ["undefined", "let nextLesson;", "Nilai awal variabel yang belum diisi; typeof nextLesson menghasilkan undefined."],
        ["null", "const mentor = null;", "Penanda kosong yang sengaja diisi; periksa mentor === null. Typeof null menghasilkan object."]
      ] }
    ],
    learningSnippets: [
      { id: "deklarasi", title: "Deklarasi, inisialisasi, lalu penugasan ulang", code: `let total;        // deklarasi; nilainya undefined
total = 2;        // memberi nilai pertama
total = total + 1; // penugasan ulang; nilainya menjadi 3
const course = "JavaScript"; // deklarasi const harus langsung diisi
// course = "jQuery"; // jika diaktifkan, penugasan ulang ini gagal`, explanation: "Baca perubahan total satu per satu. Cuplikan ini adalah acuan; ketik ke editor jika ingin mencobanya. Baris yang diawali // belum dijalankan." },
      { id: "scope", title: "Melihat perbedaan batas blok var dan let", code: `var outsideCount = 1;
{
  var outsideCount = 2;
  let insideCount = 3;
}
document.querySelector("#result").textContent = "outsideCount: " + outsideCount;
// insideCount tidak tersedia di luar blok di atas.`, explanation: "Jika cuplikan diketik ke editor, hasilnya outsideCount: 2 karena blok biasa tidak membuat var baru. Untuk melihat batas let, coba membaca insideCount setelah penutup blok: akan muncul ReferenceError. Contoh ini membahas blok biasa; scope fungsi dibahas lagi pada bagian fungsi." }
    ],
    learningSteps: ["Baca tabel deklarasi dan ketik contoh utama di editor. Bedakan tanda kutip pada \"Ayu\" dengan angka 2.", "Jalankan contoh awal, lalu periksa nilai completed setelah penugasan completed = completed + 1;.", "Kerjakan satu percobaan pada satu waktu. Ketika mencoba error const, hapus baris percobaan sebelum melanjutkan latihan tipe data."],
    codeWalkthrough: ["Dua deklarasi var oldName diperbolehkan; deklarasi kedua memberi nilai Bima. Pada let atau const, deklarasi ulang nama yang sama dalam scope yang sama gagal.", "Const name tetap Ayu. Let completed dimulai dari 2 lalu diberi nilai 3; hanya nilai completed yang berubah.", "Active berisi boolean true, nextLesson belum diisi, dan mentor sengaja diisi null.", "Bagian textContent hanya menyusun informasi untuk ditampilkan. Teks \\n membuat baris baru di dalam string hasil."],
    expectedResults: ["Peserta: Ayu (string); Latihan selesai: 3 (number); Aktif: true (boolean).", "Materi berikutnya: undefined; Mentor: null; Nama pada var lama: Bima."],
    successCriteria: ["Kamu dapat membedakan let score = 80; dari score = 90; dan menjelaskan kapan kata let ditulis.", "Kamu dapat menjelaskan bahwa const melarang penugasan ulang variabel, sementara perubahan property object dibahas pada bagian array/object.", "Kamu dapat menjelaskan perbedaan var dan let pada deklarasi ulang dan batas blok."]
  },
  operator: {
    extraParagraphs: [
      "Bagian yang dihitung oleh operator disebut operand: pada price * quantity, operand-nya price dan quantity. Kurung membantu menentukan bagian yang dikerjakan dahulu, seperti (2 + 1) * 4 yang menghasilkan 12.",
      "Number(\"abc\") menghasilkan NaN, yaitu nilai number khusus untuk hasil yang bukan angka yang dapat digunakan. Number.isFinite(quantity) memberi boolean false untuk NaN atau Infinity. Nilai kosong juga harus diperiksa: Number(\"\") menghasilkan 0, sehingga konversi saja belum cukup untuk validasi.",
      "Tanda = menugaskan nilai; === membandingkan nilai dan tipe; == dapat melakukan konversi tipe sebelum membandingkan. Tutorial memakai === agar perbandingan angka dan teks tidak tercampur tanpa disadari."
    ],
    learningGoal: "Membedakan hitungan angka, penyambungan teks, penugasan, dan perbandingan serta melakukan konversi yang diperlukan.",
    learningTables: [
      { title: "Operator hitung", headers: ["Operator", "Contoh", "Hasil"], rows: [["+", "2 + 1", "3"], ["-", "5 - 2", "3"], ["*", "4 * 3", "12"], ["/", "10 / 2", "5"], ["% (sisa bagi)", "7 % 2", "1"], ["** (pangkat)", "2 ** 3", "8"]] },
      { title: "Mengapa nilai dan tipe perlu diperiksa", headers: ["Ekspresi", "Hasil", "Alasan"], rows: [["\"2\" + 1", "\"21\" (string)", "Ada string; + menyambung teks."], ["Number(\"2\") + 1", "3 (number)", "Kedua operand berupa angka."], ["2 === \"2\"", "false", "Tipe berbeda."], ["2 == \"2\"", "true", "Terjadi konversi tipe pada perbandingan."], ["Number(\"abc\")", "NaN", "Teks tidak dapat dibaca sebagai angka."], ["Number(\"\")", "0", "Periksa teks kosong sebelum konversi."]] }
    ],
    learningSteps: ["Tulis quantityText = \"2\" dengan tanda kutip, lalu baca tabel sebelum Run.", "Bandingkan baris Teks + angka dan Angka + angka pada preview. Perhatikan bahwa keduanya memakai simbol + yang sama.", "Coba masukan \"3\" dan \"abc\" secara terpisah, lalu pulihkan masukan awal."],
    codeWalkthrough: ["Price menyimpan 12000 sebagai number. QuantityText menyimpan \"2\" sebagai string.", "Number(quantityText) mengubah \"2\" menjadi angka 2 yang disimpan pada quantity.", "Price * quantity menghasilkan total 24000. Number.isFinite(quantity) memeriksa quantity, bukan tampilan teks total.", "Ekspresi dalam kurung pada bagian output dihitung sebelum disambung dengan labelnya."],
    expectedResults: ["Teks + angka: 21; Angka + angka: 3; Total: Rp24000.", "Angka valid: true; 2 sama dengan teks 2: false."],
    successCriteria: ["Kamu dapat memprediksi hasil \"4\" + 2 dan Number(\"4\") + 2: masing-masing \"42\" dan 6.", "Kamu dapat menjelaskan mengapa input kosong harus diperiksa sebelum Number digunakan."]
  },
  kondisi: {
    extraParagraphs: [
      "Perbandingan seperti score >= 75 menghasilkan boolean. && menggabungkan dua syarat, || menyatakan salah satu syarat cukup, dan ! membalik benar/salah. Pada submitted yang sudah boolean, !submitted berarti tugas belum dikumpulkan.",
      "Kurung kurawal { } menunjukkan instruksi milik sebuah cabang. Let message diletakkan di luar cabang; jika variabel dibuat hanya di dalam blok dengan let, namanya tidak dapat dibaca oleh baris output di luar blok itu."
    ],
    learningGoal: "Menulis kondisi, memilih cabang yang sesuai, dan memeriksa batas nilai.",
    learningTables: [
      { title: "Simbol kondisi dan logika", headers: ["Simbol", "Contoh", "Artinya"], rows: [["=== / !==", "score === 75 / score !== 75", "Sama/tidak sama dengan pemeriksaan tipe."], [">= / <", "score >= 75 / score < 75", "Minimal 75 / kurang dari 75."], ["&&", "score >= 75 && submitted", "Kedua syarat harus benar."], ["||", "score >= 75 || submitted", "Salah satu syarat benar sudah cukup."], ["!", "!submitted", "Benar ketika submitted adalah false."]] },
      { title: "Hasil empat keadaan pada contoh", headers: ["Nilai score", "submitted", "Pesan"], rows: [["74", "true", "Ulangi latihan hingga nilai minimal 75."], ["75", "true", "Siap melanjutkan ke materi berikutnya."], ["74", "false", "Kumpulkan tugas terlebih dahulu."], ["75", "false", "Kumpulkan tugas terlebih dahulu."]] }
    ],
    learningSteps: ["Jalankan contoh score 80 dan submitted true.", "Ubah kedua nilai untuk mencoba empat baris pada tabel. Jangan ubah rumus kondisi dahulu.", "Bandingkan hasilmu dengan tabel, lalu jelaskan cabang pertama yang cocok pada setiap kasus."],
    codeWalkthrough: ["If pertama memeriksa nilai dan tugas sekaligus. Pada data awal keduanya benar, sehingga message diisi pesan Siap melanjutkan.", "Else if hanya diperiksa jika if pertama gagal; !submitted memeriksa apakah tugas belum dikumpulkan.", "Else menangani keadaan tugas sudah dikumpulkan tetapi nilainya belum cukup.", "Baris terakhir menampilkan message yang sudah dipilih, tidak menjalankan ulang percabangan."],
    expectedResults: ["Data awal score 80 dan submitted true menghasilkan: Siap melanjutkan ke materi berikutnya.", "Pada score 75 dan submitted false, pesan tetap meminta tugas dikumpulkan."],
    successCriteria: ["Kamu dapat menjelaskan mengapa score 75 lolos syarat >= 75 sementara score 74 tidak.", "Kamu dapat membedakan completed = 3 dari completed === 3 dan tidak memakai penugasan sebagai perbandingan."]
  },
  fungsi: {
    extraParagraphs: [
      "Parameter adalah nama pada definisi, seperti price. Argumen adalah nilai saat pemanggilan, seperti 15000. Urutannya penting: argumen pertama masuk ke parameter pertama. Nama dan variabel yang dibuat di dalam fungsi hanya dapat digunakan dalam lingkup fungsi tersebut.",
      "Return mengirim nilai dan langsung mengakhiri pemanggilan fungsi. Fungsi yang mencapai akhir tanpa return menghasilkan undefined. Console.log dapat membantu melihat nilai, tetapi tidak menggantikan return jika hasil fungsi ingin disimpan atau dihitung lagi.",
      "Nilai awal parameter disebut nilai default. Pada discount = 0, argumen yang tidak diberikan atau diberikan sebagai undefined menggunakan 0. Cuplikan berikut memperluas fungsi dasar; pelajari fungsi dua parameter dahulu sebelum mengganti versi di editor."
    ],
    learningGoal: "Mendefinisikan fungsi, memanggilnya dengan argumen, dan menggunakan nilai hasil return.",
    learningTables: [{ title: "Bagian sebuah fungsi", headers: ["Bagian", "Contoh", "Tugas"], rows: [["Definisi", "function calculateTotal(price, quantity) { ... }", "Menjelaskan instruksi tanpa langsung menjalankannya."], ["Parameter", "price, quantity", "Nama untuk masukan di dalam fungsi."], ["Argumen", "15000, 2", "Nilai yang dikirim saat pemanggilan."], ["Pemanggilan", "calculateTotal(15000, 2)", "Menjalankan fungsi dengan masukan tersebut."], ["Return", "return price * quantity;", "Mengembalikan hasil 30000 kepada pemanggil."], ["Penyimpanan hasil", "const bookTotal = calculateTotal(15000, 2);", "Menyimpan nilai hasil, bukan menyimpan definisi fungsi."]] }],
    learningSnippets: [{ id: "diskon", title: "Parameter default untuk diskon", code: `function calculateTotal(price, quantity, discount = 0) {
  return price * quantity - discount;
}
const withoutDiscount = calculateTotal(20000, 2);
const withDiscount = calculateTotal(20000, 2, 5000);
document.querySelector("#result").textContent =
  "Tanpa diskon: " + withoutDiscount + "; Dengan diskon: " + withDiscount;`, explanation: "Jika diketik sebagai pengganti contoh utama, hasilnya Tanpa diskon: 40000; Dengan diskon: 35000. Argumen ketiga yang tidak diberikan memakai default 0." }],
    learningSteps: ["Ketik definisi calculateTotal dan dua pemanggilan seperti contoh utama.", "Jalankan dan cocokkan hasil buku/pulpen. Ubah satu argumen harga tanpa mengubah definisi fungsi.", "Setelah memahami return, ketik cuplikan diskon sebagai pengganti contoh utama dan coba pemanggilan dengan dua serta tiga argumen."],
    codeWalkthrough: ["Definisi membuat fungsi calculateTotal. Belum ada hitungan yang dilakukan sampai fungsi dipanggil.", "Pemanggilan pertama menghitung 15000 × 2 dan menyimpan 30000 pada bookTotal.", "Pemanggilan kedua memakai fungsi yang sama untuk 4000 × 3 dan menyimpan 12000 pada penTotal.", "Output menjumlahkan dua nilai hasil menjadi 42000."],
    expectedResults: ["Buku: Rp30000; Pulpen: Rp12000; Seluruh belanja: Rp42000."],
    successCriteria: ["Kamu dapat menunjuk parameter dan argumen tanpa menukar istilahnya.", "Kamu dapat menjelaskan mengapa mengganti return dengan console.log membuat nilai hasil pemanggilan menjadi undefined."]
  },
  "array-object": {
    extraParagraphs: [
      "Method adalah fungsi yang dipanggil melalui sebuah object, misalnya participants.push(...). Push menambah item ke akhir array. Property length menyatakan jumlah item dan dibaca tanpa kurung: participants.length, bukan participants.length().",
      "Array peserta menyimpan referensi ke object firstParticipant yang sama, bukan salinan terpisah. Karena itu, ketika firstParticipant.score diubah menjadi 85, participants[0].score juga membaca 85.",
      "Const participants melarang participants = []; setelah deklarasinya, tetapi participants.push(...) masih diizinkan karena mengubah isi array yang sama. Demikian juga, const firstParticipant tidak melarang perubahan property score. Array/object dibahas di sini sebagai struktur data; typeof keduanya menghasilkan object."
    ],
    learningGoal: "Menulis object dan array, membaca item berdasarkan indeks, serta membedakan perubahan isi dari penugasan ulang variabel.",
    learningTables: [{ title: "Object, array, dan akses datanya", headers: ["Kebutuhan", "Penulisan", "Hasil pada contoh"], rows: [["Satu peserta", "{ name: \"Ayu\", score: 80 }", "Object dengan dua property."], ["Beberapa peserta", "[firstParticipant, { name: \"Bima\", score: 70 }]", "Array berisi dua object sebelum push."], ["Peserta pertama", "participants[0]", "Object firstParticipant."], ["Nama peserta pertama", "participants[0].name", "Ayu"], ["Tambah peserta", "participants.push({ name: \"Citra\", score: 90 })", "Item ketiga ditambahkan."], ["Jumlah peserta", "participants.length", "3"], ["Ubah property", "firstParticipant.score = 85;", "Nilai peserta pertama menjadi 85."], ["Indeks tidak tersedia", "participants[10]", "Undefined; jangan langsung membaca .name darinya."]] }],
    learningSteps: ["Cocokkan tanda { } milik object dengan tanda [ ] milik array pada contoh.", "Jalankan dan lihat jumlah peserta serta nilai peserta pertama setelah push dan perubahan score.", "Tambah property course: \"Web dasar\" pada setiap object, lalu tampilkan participants[participants.length - 1].course."],
    codeWalkthrough: ["FirstParticipant dibuat dengan nama Ayu dan nilai 80.", "Array participants menempatkan object itu pada indeks 0 dan object Bima pada indeks 1.", "Push menambahkan Citra pada indeks 2; length menjadi 3.", "Perubahan property score pada object yang sama membuat nilai yang dibaca dari participants[0] menjadi 85."],
    expectedResults: ["Jumlah peserta: 3; Peserta pertama: Ayu; Nilai terbaru: 85."],
    successCriteria: ["Kamu dapat mengambil peserta terakhir dengan length - 1, bukan length.", "Kamu dapat menjelaskan mengapa push diizinkan pada array const tetapi penugasan participants = [] tidak diizinkan."]
  },
  perulangan: {
    extraParagraphs: [
      "Satu pelaksanaan isi blok disebut satu putaran atau iterasi. Variabel listText dimulai dari string kosong \"\". Operator += memperbarui nilai: listText += teks sama dengan listText = listText + teks. Untuk string, operasi ini menambahkan teks ke isi yang sudah ada.",
      "Pada total += number, += menjumlahkan angka. Putaran pertama menambahkan 1, kedua menambahkan 2, dan ketiga menambahkan 3. Setelah number menjadi 4, kondisi number <= 3 gagal dan perulangan berakhir. Const name pada for...of merupakan binding baru untuk setiap putaran sehingga dapat menerima item berbeda.",
      "For...of membaca nilai item. For biasa memberi kendali atas angka penghitung atau indeks. Gunakan putaran terbatas saat latihan; jangan mengganti kondisi dengan true tanpa mekanisme berhenti."
    ],
    learningGoal: "Membaca urutan putaran dan menentukan kapan perulangan berhenti.",
    learningTables: [
      { title: "Bagian for (let number = 1; number <= 3; number += 1)", headers: ["Bagian", "Kapan dijalankan", "Pengaruh"], rows: [["let number = 1", "Sekali sebelum putaran pertama", "Menetapkan nilai awal penghitung."], ["number <= 3", "Sebelum setiap putaran", "Memutuskan apakah isi blok dijalankan."], ["total += number", "Di dalam putaran yang diizinkan", "Menambahkan number ke hasil sementara."], ["number += 1", "Sesudah isi setiap putaran", "Mengubah penghitung untuk pemeriksaan berikutnya."]] },
      { title: "Jejak nilai total", headers: ["number", "Perhitungan", "total sesudah putaran"], rows: [["1", "0 + 1", "1"], ["2", "1 + 2", "3"], ["3", "3 + 3", "6"], ["4", "Kondisi 4 <= 3 adalah false", "Tetap 6; tidak ada putaran keempat."]] }
    ],
    learningSteps: ["Jalankan contoh asli dan hitung tiga nama yang ditampilkan.", "Baca jejak total pada tabel sambil menelusuri for biasa.", "Tambah nama Deni dan ganti batas number menjadi 5; jalankan kembali setelah memprediksi hasil."],
    codeWalkthrough: ["For...of mengambil Ayu, Bima, dan Citra satu per satu lalu menambahkan satu baris untuk setiap nama.", "Teks \\n di dalam string membuat pemisah baris pada hasil.", "For biasa menjalankan tiga putaran dan total bergerak dari 0 → 1 → 3 → 6.", "TextContent menampilkan hasil setelah kedua perulangan selesai."],
    expectedResults: ["Ada tiga baris nama: - Ayu, - Bima, dan - Citra.", "Jumlah angka 1 sampai 3: 6. Setelah batas diganti menjadi 5, jumlahnya 15."],
    successCriteria: ["Kamu dapat menghitung banyak putaran tanpa menjalankan kode.", "Kamu dapat menjelaskan mengapa perulangan berhenti ketika penghitung menjadi 4 pada batas awal."]
  },
  dom: {
    extraParagraphs: [
      "Selector adalah pola pencarian elemen. #participantName mencari ID, .item mencari class, dan p mencari nama tag. QuerySelector mengembalikan satu elemen pertama yang cocok. Jika tidak ada, hasilnya null; karena itu nama ID pada HTML dan string selector harus sama persis.",
      "Property adalah nilai yang dibaca/diisi melalui tanda titik. Method adalah fungsi yang dipanggil dengan ( ). Value dan textContent adalah property; querySelector(), trim(), dan classList.add() melibatkan pemanggilan method. Trim menghapus spasi di awal/akhir string, bukan spasi di tengah nama.",
      "Pemanggilan greeting.classList.add(\"is-highlighted\") menambah class pada paragraf. Aturan .is-highlighted sudah tersedia pada tab CSS, sehingga paragraf memperoleh latar dan padding. Script ini baru berjalan saat Run; ketikan di input belum memanggilnya kembali tanpa listener event."
    ],
    learningGoal: "Menemukan elemen, membaca input, mengganti teks, dan membedakan property dengan method.",
    learningTables: [
      { title: "Tiga langkah menghubungkan data dengan HTML", headers: ["Langkah", "Kode", "Yang diperoleh/diubah"], rows: [["Cari elemen", "document.querySelector(\"#participantName\")", "Elemen input, atau null jika tidak cocok."], ["Baca isinya", "nameInput.value", "String yang sedang menjadi nilai input."], ["Rapikan masukan", "nameInput.value.trim()", "String tanpa spasi awal/akhir."], ["Cari tujuan", "document.querySelector(\"#greeting\")", "Elemen paragraf sapaan."], ["Tampilkan teks", "greeting.textContent = \"Halo\";", "Isi teks paragraf diganti."], ["Tambahkan class", "greeting.classList.add(\"is-highlighted\")", "Class CSS pada elemen ditambah."]] },
      { title: "Operasi string untuk latihan form", headers: ["Penulisan", "Hasil", "Pemakaian"], rows: [["\"  Ayu  \".trim()", "\"Ayu\"", "Membuang spasi awal dan akhir, tidak mengganti teks input secara otomatis."], ["\"Ayu\".length", "3", "Memeriksa panjang nama sederhana pada latihan."], ["\"Ayu\".toLowerCase()", "\"ayu\"", "Membandingkan nama tanpa membedakan huruf besar/kecil pada tantangan proyek."]] }
    ],
    learningSteps: ["Buka tab HTML dan cocokkan ID participantName serta greeting dengan kode JavaScript.", "Jalankan contoh; teks input awal Ayu menghasilkan sapaan Halo, Ayu!.", "Ubah input di preview menjadi Bima. Sapaan belum berubah. Ubah value awal di tab HTML menjadi Bima lalu Run; sekarang sapaan menjadi Halo, Bima!."],
    codeWalkthrough: ["NameInput menyimpan elemen input dan greeting menyimpan elemen paragraf.", "Value membaca teks Ayu dari input; trim merapikan tepi teks.", "Penggabungan string membuat Halo, Ayu! dan textContent menaruhnya di paragraf.", "ClassList menambahkan class is-highlighted yang gayanya sudah ditulis pada CSS."],
    expectedResults: ["Paragraf menampilkan Halo, Ayu! dengan latar lembut dan ruang isi.", "Mengubah input langsung setelah Run tidak otomatis mengubah paragraf pada contoh ini."],
    successCriteria: ["Kamu dapat membedakan elemen nameInput dengan string nameInput.value.", "Kamu dapat menjelaskan hubungan id=\"greeting\" pada HTML dengan selector \"#greeting\" pada JavaScript."]
  },
  event: {
    extraParagraphs: [
      "Objek event dibuat browser ketika kejadian terjadi. Parameter event adalah nama yang kita pilih untuk menerima objek itu. Pada callback, baca input ketika submit terjadi agar memakai teks terbaru, lalu trim dan periksa length. Untuk nama sederhana seperti Ayu, length bernilai 3; simbol tertentu seperti emoji dapat dihitung berbeda sehingga aturan latihan ini tidak mewakili semua cara menghitung karakter.",
      "Return pada cabang gagal menghentikan callback saat itu. Karena baris sapaan berada setelah cabang validasi, input yang terlalu pendek tidak mencapai baris sapaan. NameInput.focus() memindahkan fokus ke input agar pengguna dapat memperbaikinya.",
      "Submit dipilih karena mengirim form dapat dilakukan dengan klik tombol atau Enter. Event input cocok untuk menanggapi setiap perubahan isi kolom; click cocok untuk aksi tombol. Atribut novalidate pada HTML membuat contoh memakai pesan pemeriksaan dari JavaScript alih-alih menampilkan validasi bawaan browser."
    ],
    learningGoal: "Memasang callback tanpa memanggilnya terlalu awal dan memeriksa input pada waktu pengguna mengirim form.",
    learningTables: [{ title: "Kejadian dan instruksi dalam form", headers: ["Nama", "Kapan/tugas", "Contoh"], rows: [["click", "Saat elemen diaktifkan dengan klik", "button.addEventListener(\"click\", handler)"], ["input", "Saat pengguna mengubah nilai kolom", "nameInput.addEventListener(\"input\", handler)"], ["submit", "Saat form dikirim", "form.addEventListener(\"submit\", handler)"], ["preventDefault()", "Menahan tindakan bawaan event", "Menahan navigasi/pengiriman form pada demo."], ["return", "Menghentikan callback saat itu", "Menghindari sapaan ketika validasi gagal."]] }],
    learningSnippets: [{ id: "callback", title: "Memberikan fungsi sebagai listener", code: `function handleSubmit(event) {
  event.preventDefault();
  // Baca dan periksa masukan di sini.
}
// Bentuk yang benar: berikan fungsi untuk dipanggil browser.
form.addEventListener("submit", handleSubmit);
// Bentuk keliru: handleSubmit() memanggil fungsi sekarang.
// form.addEventListener("submit", handleSubmit());`, explanation: "Cuplikan menjelaskan penulisan callback dan memakai form yang sudah dipilih pada contoh utama. Tanda kurung setelah nama fungsi berarti memanggil, sehingga tidak dipakai ketika memberikan referensi handler." }],
    learningSteps: ["Run lalu kirim nama kosong. Perhatikan pesan dan posisi fokus.", "Coba Al, lalu Ayu menggunakan tombol dan Enter. Bandingkan dua jalur validasi.", "Ubah pesan sapaan di JavaScript lalu Run lagi. Untuk latihan input, tambahkan listener pada input yang membaca value.length."],
    codeWalkthrough: ["Tiga variabel di atas callback menyimpan elemen form, input, dan tujuan pesan.", "Listener dipasang sekali. Isi function (event) baru berjalan saat submit terjadi.", "Callback menahan aksi bawaan, membaca nama terbaru, lalu memeriksa batas minimal tiga.", "Cabang gagal menampilkan petunjuk dan return; jalur berhasil menampilkan sapaan tanpa mengirim data."],
    expectedResults: ["Nama kosong atau Al menghasilkan: Isi nama minimal tiga karakter.", "Nama Ayu menghasilkan: Halo, Ayu! Form tidak dikirim ke server.", "Pengiriman menggunakan Enter menjalankan pemeriksaan yang sama."],
    successCriteria: ["Kamu dapat menjelaskan mengapa nilai input dibaca di dalam callback.", "Kamu dapat menunjuk baris yang menghentikan navigasi dan baris yang menghentikan callback ketika input gagal."]
  },
  "debug-console": {
    extraParagraphs: [
      "Buka DevTools dari menu browser atau F12/Ctrl+Shift+I pada Windows, lalu pilih panel Console. Jalankan contoh dan cari label quantity. Jika mengetik document.querySelector sendiri di Console, pilih konteks frame preview terlebih dahulu; konteks halaman utama menunjuk HTML tutorial.",
      "Mulai dari tiga pertanyaan: nilai masukan apa, tipenya apa, dan hasil operasi apa? Hasil log di Console adalah bukti yang dapat dibandingkan dengan dugaan. Pada kode awal, assert tidak menampilkan kegagalan karena kondisi total === 36000 benar.",
      "Ketika quantity diubah menjadi \"abc\", konversi menghasilkan NaN dan assert melaporkan kegagalan. Assert membantu mendeteksi hasil tak sesuai tetapi tidak memperbaiki kode dan tidak menghentikan eksekusi dengan sendirinya."
    ],
    learningGoal: "Mengamati nilai dan tipe melalui Console sebelum memilih perubahan kode.",
    learningTables: [{ title: "Memilih alat pengamatan", headers: ["Instruksi", "Kegunaan", "Yang diperiksa pada contoh"], rows: [["console.log(label, nilai)", "Mencetak informasi", "Quantity dan typeof quantity."], ["console.table(data)", "Menata array/object sebagai tabel", "Quantity dan price dalam satu baris data."], ["console.assert(kondisi, pesan)", "Melaporkan kondisi false", "Apakah total sama dengan 36000."], ["typeof quantity", "Memeriksa tipe nilai", "String, meskipun isinya karakter angka."]] }],
    learningSteps: ["Buka Console browser sebelum Run agar pesan pengamatan mudah ditemukan.", "Run data awal dan baca log, tabel, serta output preview. Tidak ada kegagalan assert pada data awal.", "Ubah quantity menjadi \"abc\", Run, dan catat NaN serta pesan assert. Kembalikan \"3\" dan ulangi."],
    codeWalkthrough: ["Quantity berisi string \"3\" dan price berisi number 12000.", "Log menunjukkan masukan sebelum konversi; tabel menampilkan data yang sama dalam susunan kolom.", "Number(quantity) * price menghasilkan 36000.", "Assert memeriksa hasil, lalu textContent menampilkan total pada halaman."],
    expectedResults: ["Preview: Total: Rp36000. Log quantity menunjukkan nilai \"3\" dan tipe string.", "Data awal tidak memunculkan pesan kegagalan assert. Data \"abc\" menghasilkan NaN dan laporan perhitungan tidak sesuai."],
    successCriteria: ["Kamu dapat membedakan isi Console browser dari bar status aplikasi.", "Catatan debuggingmu memuat masukan, tipe, hasil, dan dugaan penyebab sebelum memperbaiki kode."]
  },
  "debug-error": {
    extraParagraphs: [
      "SyntaxError berarti susunan kode tidak valid, misalnya tanda kurung kurang. ReferenceError sering berarti nama variabel tidak tersedia. TypeError berarti operasi tidak cocok dengan nilai yang dipakai, misalnya mencoba mengisi property pada null. Teks lengkap error dapat berbeda antarbrowser.",
      "Stack trace adalah daftar lokasi pemanggilan saat error terjadi. Mulai dari lokasi yang menunjuk kode contohmu; callback event dan library dapat menambah baris lain. Pada workspace, JavaScript dari tab editor diberi nama contoh-script.js untuk membantu menemukan lokasi.",
      "Urutan debugging: ulangi bug, baca pesan pertama, lihat baris sumber, periksa nilai di baris itu, perbaiki penyebab, kemudian ulangi aksi yang sama. Error yang terjadi setelah tombol ditekan perlu dipicu dengan tombol lagi, bukan hanya dengan menekan Run."
    ],
    learningGoal: "Mengenali kategori error dan membuktikan penyebab selector null.",
    learningTables: [{ title: "Membedakan tiga error yang umum", headers: ["Error", "Contoh penyebab", "Langkah awal"], rows: [["SyntaxError", "Kurung atau tanda kutip belum lengkap", "Periksa struktur pada baris sumber dan baris sebelum itu."], ["ReferenceError", "Nama hasil belum dideklarasikan atau berada di luar scope", "Cocokkan nama dan lokasi deklarasi."], ["TypeError", "result adalah null saat result.textContent digunakan", "Periksa nilai result dan selector yang membentuknya."]] }],
    learningSteps: ["Run lalu klik Periksa selector. Catat TypeError dan log Elemen yang ditemukan: null.", "Buka lokasi sumber error dari Console, cocokkan #resut dengan id=\"result\" pada HTML.", "Perbaiki selector menjadi #result, Run, lalu klik tombol yang sama kembali."],
    codeWalkthrough: ["Listener dipasang pada #checkButton yang tersedia pada HTML.", "Saat klik, pencarian #resut gagal karena ID tersebut tidak ada, sehingga result berisi null.", "Log menampilkan null. Instruksi pengisian textContent kemudian memicu TypeError.", "Setelah selector diperbaiki, result menjadi elemen dan instruksi pengisian teks berhasil."],
    expectedResults: ["Contoh awal sengaja menghasilkan TypeError setelah klik, bukan saat pemasangan listener.", "Setelah diperbaiki dan diklik ulang, preview menampilkan Selector sudah benar. tanpa error baru."],
    successCriteria: ["Kamu dapat menjelaskan hubungan nilai null dengan baris yang gagal.", "Kamu mengulangi langkah pemicu yang sama setelah perbaikan, bukan hanya menutup pesan error."]
  },
  "debug-browser": {
    extraParagraphs: [
      "Breakpoint pada sebuah baris menghentikan eksekusi sebelum baris itu dikerjakan. Saat berhenti pada const total, quantity sudah dapat diperiksa tetapi total belum selesai dibuat. Resume melanjutkan eksekusi; halaman dapat tidak menanggapi interaksi sampai eksekusi dilanjutkan.",
      "Scope menampilkan variabel yang tersedia pada posisi berhenti. Watch mengevaluasi ekspresi yang kamu tambahkan, misalnya typeof quantity. Call Stack menunjukkan fungsi yang sedang berjalan dan pemanggilnya. Step over menjalankan instruksi berikutnya tanpa menelusuri isi fungsi yang dipanggil; Step into masuk ke fungsi tersebut; Step out melanjutkan sampai keluar dari fungsi saat ini.",
      "Pernyataan debugger; meminta jeda ketika debugger tersedia. Dalam contoh, baris tersebut diawali // sehingga belum aktif. Hapus // hanya saat DevTools sudah terbuka. Pause on uncaught exceptions pada Sources berguna untuk berhenti saat error tidak ditangani; gunakan contoh debug-error untuk percobaan itu."
    ],
    learningGoal: "Memasang breakpoint, memeriksa string masukan, dan menelusuri perbaikan penjumlahan melalui browser.",
    learningTables: [{ title: "Panel dan kontrol debugging", headers: ["Alat", "Tugas", "Pemakaian pada latihan"], rows: [["Console", "Membaca log/mengevaluasi ekspresi", "Pilih konteks frame preview saat membaca DOM hasil."], ["Sources", "Membaca sumber dan memasang breakpoint", "Buka contoh-script.js setelah Run."], ["Scope", "Melihat variabel saat berhenti", "Quantity bernilai \"3\" sebelum perhitungan."], ["Watch", "Memantau ekspresi", "Tambahkan typeof quantity."], ["Call Stack", "Melihat urutan pemanggilan", "Temukan callback tombol contoh."], ["Step over / Step into / Step out", "Mengendalikan penelusuran", "Jalankan baris, masuk fungsi, atau keluar fungsi."], ["Resume", "Melanjutkan script", "Selesaikan callback agar output muncul."]] }],
    learningSteps: ["Buka DevTools, Run, lalu klik Hitung tanpa breakpoint. Isi awal 3 menghasilkan 31; tulis hasil yang diharapkan, yaitu 4.", "Di Sources, buka contoh-script.js dan klik nomor baris const total. Alternatifnya, aktifkan debugger; di editor lalu Run.", "Klik Hitung lagi. Saat berhenti, baca quantity di Scope dan tambahkan typeof quantity di Watch; hasil tipenya string.", "Gunakan Step over lalu Resume. Ketik perbaikan Number(quantity) + 1 di editor, Run, dan uji 3, 0, serta 10. Hapus breakpoint/debugger setelah selesai."],
    codeWalkthrough: ["Callback mengambil value input saat tombol diaktifkan; value yang dibaca adalah string.", "Pada data awal quantity + 1 menghasilkan \"31\" melalui penyambungan teks.", "Breakpoint memberi kesempatan melihat nilai sebelum perhitungan, sehingga alasan perbaikan dapat dibuktikan.", "Number(quantity) + 1 memperbaiki perhitungan angka, tetapi input kosong masih memerlukan pemeriksaan tersendiri."],
    expectedResults: ["Sebelum perbaikan: masukan 3 → 31, 0 → 01, dan 10 → 101.", "Setelah konversi: masukan 3 → 4, 0 → 1, dan 10 → 11.", "Saat berhenti sebelum const total, quantity tersedia dan Watch typeof quantity menunjukkan string."],
    successCriteria: ["Kamu memasang breakpoint pada DevTools, bukan mengklik nomor baris editor tutorial.", "Perbaikan diketik pada editor dan diuji ulang, sehingga tidak hanya menjadi perubahan sementara di DevTools."]
  },
  "guided-learning": {
    extraParagraphs: [
      "Tujuan proyek adalah mengisi form nama/nilai, menyimpan setiap peserta sebagai object dalam array, lalu menampilkan daftar dan statusnya. Nama minimal tiga karakter; nilai tidak boleh kosong dan harus antara 0–100. Nilai minimal 75 memperoleh status Siap lanjut, sedangkan nilai lebih rendah memperoleh Perlu latihan.",
      "State adalah data keadaan aplikasi saat ini; pada proyek ini participants dan nextNumber menjadi state. Render berarti membuat tampilan sesuai data tersebut. Fungsi renderParticipants tidak menambah peserta; tugasnya hanya membaca array dan memperbarui daftar, ringkasan, pesan kosong, serta tombol.",
      "Pemanggilan document.createElement(\"li\") membuat elemen daftar yang belum tampil. Property item.textContent mengisi teksnya dan list.appendChild(item) memasukkannya ke halaman. Mengisi list.textContent = \"\" menghapus isi lama sebelum daftar dibangun kembali agar item tidak terduplikasi setiap render.",
      "Pemanggilan form.reset() mengembalikan input ke nilai awal HTML setelah peserta ditambahkan. Peserta yang sudah berada dalam array tetap ada. Tombol Kosongkan daftar mengubah panjang array menjadi 0, mengatur nomor kembali ke 1, kemudian memanggil render. Data hanya ada di memori; Run ulang memulai aplikasi baru.",
      "Untuk tantangan rata-rata, jumlahkan score dengan perulangan lalu bagi dengan participants.length hanya ketika jumlah peserta lebih dari 0. Pemanggilan average.toFixed(1) mengubah angka rata-rata menjadi string tampilan dengan satu angka di belakang titik; simpan perhitungan tetap sebagai number. Untuk tantangan nama duplikat, bandingkan string yang sudah trim dan toLowerCase sebelum push."
    ],
    learningGoal: "Menggabungkan konsep dasar dalam satu alur masukan → validasi → penyimpanan data → render, lalu menelusurinya dengan breakpoint.",
    learningTables: [
      { title: "Peta data dan fungsi proyek", headers: ["Nama", "Isi/tugas", "Kapan berubah/dipanggil"], rows: [["participants", "Array berisi object { number, name, score }", "Push saat submit valid; dikosongkan oleh tombol."], ["nextNumber", "Nomor untuk peserta berikutnya; awalnya 1", "Bertambah setelah push; kembali 1 saat daftar dikosongkan."], ["statusFor(score)", "Menghasilkan string status berdasarkan nilai", "Dipanggil saat satu peserta dirender."], ["renderParticipants()", "Memperbarui seluruh tampilan berdasarkan data", "Saat awal, setelah push, dan setelah pengosongan."], ["Listener submit", "Membaca input, memeriksa, lalu menyimpan peserta", "Saat form dikirim melalui tombol atau Enter."]] },
      { title: "Kasus yang harus diperiksa", headers: ["Masukan/tindakan", "Hasil yang diharapkan", "Data peserta"], rows: [["Nama kosong atau Al", "Pesan nama minimal tiga karakter", "Tidak ditambah."], ["Nama Ayu; nilai kosong", "Pesan nilai 0 sampai 100", "Tidak ditambah; kosong bukan nilai 0."], ["Ayu; nilai 0", "Status Perlu latihan", "Ditambah."], ["Ayu; nilai 74", "Status Perlu latihan", "Ditambah."], ["Ayu; nilai 75 atau 100", "Status Siap lanjut", "Ditambah."], ["Nilai -1 atau 101", "Pesan nilai 0 sampai 100", "Tidak ditambah."], ["Kosongkan daftar", "Jumlah peserta: 0; pesan kosong terlihat", "Array kosong dan nomor berikutnya 1."]] }
    ],
    codeWalkthrough: ["Deklarasi menyiapkan array, nomor, serta referensi elemen. Render pertama menampilkan keadaan kosong.", "Pada submit, preventDefault menahan navigasi. Nama dan teks nilai dibaca serta dirapikan sebelum pemeriksaan.", "Return pada validasi yang gagal memastikan push belum dijalankan. Masukan valid menghasilkan object dengan nomor, nama, dan score bertipe number.", "Nomor ditambah, render memperbarui daftar, dan form.reset membersihkan kolom tanpa menghapus peserta yang sudah disimpan.", "Handler tombol pengosongan menghapus data serta mengatur nomor, lalu memakai fungsi render yang sama."],
    expectedResults: ["Keadaan awal: Jumlah peserta: 0; pesan belum ada peserta terlihat; tombol Kosongkan daftar nonaktif.", "Tambahkan Ayu dengan nilai 80: daftar memuat 1. Ayu — 80 — Siap lanjut dan jumlah peserta menjadi 1.", "Masukan gagal tidak menambah daftar. Pengosongan memulihkan keadaan awal; peserta berikutnya kembali bernomor 1."],
    successCriteria: ["Kamu dapat menjelaskan perbedaan tugas submit, statusFor, dan renderParticipants.", "Kamu memeriksa seluruh kasus tabel, termasuk nilai kosong dan nilai 0 sebagai dua keadaan berbeda.", "Pada breakpoint sebelum push, kamu dapat menunjukkan name sebagai string, score sebagai number, serta array sebelum peserta baru ditambahkan."]
  }
};

for (const section of [...javascriptBasicSections, ...javascriptDebuggingSections, javascriptGuidedSection]) {
  const details = javascriptTeachingDetails[section.id];
  section.paragraphs.push(...details.extraParagraphs);
  const { extraParagraphs, ...presentation } = details;
  Object.assign(section, presentation);
}
javascriptBasicSections.find((section) => section.id === "variabel").references = [
  { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types", label: "Deklarasi dan tipe nilai" },
  { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var", label: "var" },
  { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let", label: "let" },
  { url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const", label: "const" }
];

const javascriptBasicLesson = topic("js-basic", "Dasar bahasa, DOM, dan debugging",
  "Sebelum memakai jQuery, pahami cara JavaScript menyimpan data, menghitung nilai, memilih elemen, dan merespons pengguna. Setiap bagian menyediakan contoh kecil yang dapat diketik dan dijalankan sendiri.",
  "var/let/const, tipe data, operator, if/else, fungsi, array/object, perulangan, DOM, event, dan debugging",
  "", "Ketik ulang contoh tiap bagian, prediksi hasil, lalu gabungkan konsep dalam proyek daftar peserta.");
guide("js-basic", javascriptBasicLesson.description,
  "Mulai dari cara menulis satu instruksi, kemudian membuat variabel dan menghitung nilai. Setiap bagian menjelaskan istilah, bentuk penulisan, pembacaan kode, serta hasil yang diharapkan. Setelah itu hubungkan data dengan elemen HTML dan tindakan pengguna. Materi ditujukan untuk pemula yang sudah mengenali elemen HTML seperti paragraf, tombol, dan input.",
  "Mulai dari Pengenalan, lalu Variabel. Baca tabel dan langkah mencoba, ketik contoh pada editor, kemudian cocokkan preview dengan Hasil yang seharusnya terlihat.",
  "Kerjakan latihan satu perubahan pada satu waktu. Jelaskan penyebab hasilnya sebelum berpindah ke bagian berikutnya; pada proyek akhir, gabungkan data, validasi, event, dan tampilan.",
  "Cuplikan penjelas merupakan acuan tambahan. Editor contoh utama tetap menjadi tempat mengetik dan Run. Semua bagian dapat dibuka langsung, tetapi istilah dipelajari berurutan dari dasar.");
Object.assign(javascriptBasicLesson, {
  sectionId: "javascript", groupTitle: "JavaScript dasar", groupNumber: 1, number: "1.1",
  practiceTitle: "Dari kebutuhan ke contoh nyata", runtime: "none", codeFile: "js",
  lead: lessonGuides["js-basic"].explanation,
  walkthrough: [lessonGuides["js-basic"].observe, lessonGuides["js-basic"].experiment],
  note: lessonGuides["js-basic"].note,
  outcomes: [
    ["Tulis dan baca kode", "Deklarasikan variabel, panggil fungsi, dan jelaskan hasil perhitungan dari nilai serta tipenya."],
    ["Hubungkan dengan HTML", "Baca input, tangani event, periksa data, dan tampilkan hasil melalui DOM."],
    ["Temukan penyebab bug", "Bandingkan hasil dengan dugaan, periksa Console/Scope, lalu ulangi kasus yang sama setelah perbaikan."]
  ],
  code: { ...javascriptBasicSections[0].code },
  sections: [...javascriptBasicSections, ...javascriptDebuggingSections, javascriptGuidedSection]
});

lessonCatalog.splice(lessonCatalog.findIndex((track) => track.sectionId === "jquery"), 0, {
  sectionId: "javascript", sectionLabel: "JavaScript dasar",
  reference: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
  groups: [{ number: 1, title: "JavaScript dasar", lessons: [javascriptBasicLesson] }]
});

// Debugging jQuery berada bersama materi event, sebelum latihan gabungannya.
const jqueryDebuggingSections = [
  javascriptSection("debug-console", "Debugging jQuery: cek selector dan value",
    "Selector jQuery yang tidak cocok menghasilkan koleksi kosong. Method text pada koleksi kosong dapat tidak mengubah apa pun tanpa melempar error.",
    "Periksa length sebelum memasang handler, lalu log nilai di dalam callback. Val membaca string; typeof membantu menentukan apakah konversi angka diperlukan. Periksa juga apakah $ tersedia dan $.fn.jquery terisi ketika memuat library pada HTML sendiri.",
    `console.log("Versi jQuery:", $.fn.jquery);
const button = $("#calculate");
const quantityInput = $("#quantity");
console.log("Tombol:", button.length, "Input:", quantityInput.length);

button.on("click", function () {
  const quantity = quantityInput.val();
  console.log("Masukan:", quantity, "Tipe:", typeof quantity);
  $("#result").text("Jumlah setelah ditambah satu: " + (Number(quantity) + 1));
});`,
    "Buka Console dan klik tombol. Sengaja ubah selector tombol menjadi #calculat, amati length 0, lalu pulihkan selector dan ulangi tindakan yang sama.",
    "Koleksi jQuery kosong berbeda dari null pada querySelector. Log console dibaca di DevTools browser, bukan seluruhnya di bar status tutorial.",
    '<label for="quantity">Jumlah awal</label>\n<input id="quantity" type="number" value="3">\n<button id="calculate" type="button">Hitung</button>\n<pre id="result" role="status">Menunggu klik.</pre>'),
  javascriptSection("debug-event", "Debugging event: callback dan target",
    "Klik tombol harus menjalankan callback sekali. Log posisi pemasangan handler dan event membantu membedakan script yang berjalan saat setup dari aksi yang berjalan setelah klik.",
    "Catat event.type, target, dan currentTarget. Target adalah elemen asal event; currentTarget adalah elemen yang sedang menangani event. Gunakan function biasa jika contoh membaca this sebagai elemen handler jQuery.",
    `console.log("Memasang handler tombol.");
let clicks = 0;
$("#action").on("click", function (event) {
  clicks += 1;
  console.log("Event:", event.type, "Asal:", event.target, "Handler:", event.currentTarget);
  console.log("this sama dengan currentTarget:", this === event.currentTarget);
  $("#result").text("Jumlah callback: " + clicks);
});`,
    "Klik tulisan dan ruang tombol. Tambahkan span pada tulisan tombol untuk melihat target berubah, lalu jelaskan mengapa currentTarget tetap tombol.",
    "Jika satu klik memanggil callback beberapa kali, periksa tempat .on dipanggil. Jangan memasang handler yang sama setiap kali tombol diklik.",
    '<button id="action" type="button"><span>Klik untuk mengamati event</span></button>\n<pre id="result" role="status">Jumlah callback: 0</pre>'),
  javascriptSection("debug-browser", "Debugging jQuery lewat browser",
    "Breakpoint dipasang pada callback milik kita agar nilai masukan dapat diamati ketika pengguna mengeklik tombol. Tidak perlu membaca seluruh source library untuk menemukan bug perhitungan.",
    "Ikuti langkah DevTools pada bagian ini, lalu berhenti sebelum total dihitung. Periksa Scope, Watch, dan Call Stack. Jika berhenti di source jQuery, gunakan Step out atau pilih frame callback contoh untuk menelusuri kode yang ditulis sendiri.",
    `$("#calculate").on("click", function () {
  const quantity = $("#quantity").val();
  // Aktifkan hanya saat DevTools sudah terbuka.
  // debugger;
  const total = quantity + 1; // Bug latihan: .val() menghasilkan string.
  $("#result").text("Jumlah setelah ditambah satu: " + total);
});`,
    "Pasang breakpoint sebelum total, isi 3, lalu klik Hitung. Periksa typeof quantity dan ubah rumus menjadi Number(quantity) + 1. Uji kembali 0, 10, serta input kosong.",
    "Di Elements, cocokkan ID input/tombol dengan selector. Di Network, periksa request library ketika $ tidak tersedia pada file mandiri. Perbaikan DevTools perlu diketik ulang pada editor dan dijalankan kembali.",
    '<label for="quantity">Jumlah awal</label>\n<input id="quantity" type="number" value="3">\n<button id="calculate" type="button">Hitung</button>\n<pre id="result" role="status">Contoh ini sengaja salah menjumlahkan.</pre>')
];
jqueryDebuggingSections.forEach((section) => { section.runtime = "local"; });
jqueryDebuggingSections[2].paragraphs.push(...browserDebuggingSteps);
jqueryDebuggingSections[2].references = javascriptDebuggingSections[2].references;
jqueryDebuggingSections[2].connections = [{ id: "js-basic/debug-browser", label: "Dasar breakpoint dan debugging JavaScript" }];
const jqueryEventLesson = lessonById("jq-events");
const jqueryGuidedIndex = jqueryEventLesson.sections.findIndex((section) => section.guided);
jqueryEventLesson.sections.splice(jqueryGuidedIndex < 0 ? jqueryEventLesson.sections.length : jqueryGuidedIndex, 0, ...jqueryDebuggingSections);
