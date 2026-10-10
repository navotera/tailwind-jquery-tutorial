// Data proyek lengkap. Builder dipakai aplikasi saja; source lengkap berbentuk HTML
// yang sudah diekspansi, bukan helper tersembunyi atau pengulangan saat runtime.
function capstoneCase(brief, audience, work, modules) {
  return { brief, audience, work, modules: modules.map((line) => {
    const [title, ...items] = line.split('|');
    if (items.length !== 3) throw new Error(`Modul proyek harus punya tiga entri: ${title}`);
    return { title, items };
  }) };
}
const guidedCapstoneCases = {
  tailwind: [
    capstoneCase('Portal orientasi untuk pertemuan pertama praktikum web.', 'Mahasiswa baru dan instruktur', ['Mengenali isi halaman sebelum mengubah tampilan', 'Menghubungkan warna, jarak, dan ukuran dengan tujuan informasi', 'Menyusun informasi kelas tanpa kehilangan urutan membaca'], [
      'Orientasi kelas|Tujuan praktikum|Aturan diskusi|Hasil yang diharapkan', 'Materi pembuka|Struktur HTML|Property CSS|Utility Tailwind', 'Penutup orientasi|Ringkasan konsep|Target berikutnya|Refleksi peserta'
    ]),
    capstoneCase('Papan pengumuman akademik dengan informasi pertemuan, tenggat, dan layanan kelas.', 'Peserta praktikum dan asisten kelas', ['Membedakan judul utama, subjudul, dan isi pengumuman', 'Menentukan penekanan informasi tanpa memperbesar semua tulisan', 'Menjaga format pengumuman konsisten saat isi bertambah'], [
      'Pengumuman terbaru|Pertemuan pertama|Perubahan ruangan|Persiapan presentasi', 'Informasi kelompok|Pembagian peserta|Peran anggota|Jadwal diskusi', 'Pertemuan berikutnya|Topik baru|Persiapan peserta|Target pertemuan'
    ]),
    capstoneCase('Katalog belajar responsif yang tetap nyaman ketika viewport preview berubah.', 'Peserta yang belajar dari laptop maupun ponsel', ['Memulai dari susunan layar sempit sebelum menambah breakpoint', 'Mengatur kelompok kartu tanpa menetapkan posisi secara manual', 'Menjaga kartu baru tetap mengikuti susunan responsif yang sama'], [
      'Katalog dasar|HTML pemula|CSS dasar|Utility class', 'Pilihan sesi|Sesi pagi|Sesi siang|Sesi sore', 'Uji responsif|Viewport sempit|Viewport sedang|Viewport lebar'
    ]),
    capstoneCase('Dashboard kegiatan kelas dengan header menetap, badge, panel informasi, dan navigasi antarseksi.', 'Instruktur yang memantau kegiatan praktikum', ['Menentukan pembungkus dan acuan posisi setiap komponen', 'Menjaga isi panjang tetap dapat dijangkau lewat panel scroll', 'Membedakan ruang elemen tersembunyi dan urutan lapisan'], [
      'Agenda harian|Pembukaan|Praktikum inti|Diskusi hasil', 'Sumber belajar|Dokumentasi kelas|Berkas contoh|Catatan peserta', 'Penutup dashboard|Ringkasan agenda|Keputusan instruktur|Rencana lanjutan'
    ]),
    capstoneCase('Direktori kelas dan konsultasi yang menyusun kartu menggunakan Flexbox.', 'Peserta yang memilih kelas dan jadwal pendampingan', ['Membagi ruang antara informasi tetap dan konten yang tumbuh', 'Mengizinkan kartu membungkus ketika ruang mendatar berkurang', 'Membedakan arah susunan dan urutan visual tanpa mengubah data'], [
      'Kelas dasar|HTML pagi|CSS siang|Tailwind sore', 'Slot konsultasi|Slot 09.00|Slot 10.00|Slot 11.00', 'Rekomendasi belajar|Kelas pengantar|Kelas latihan|Kelas presentasi'
    ]),
    capstoneCase('Galeri proyek dan pembagian tugas dalam grid dengan item unggulan.', 'Tim kecil yang membagi pekerjaan proyek web', ['Menentukan jumlah track dari layar sempit sampai lebar', 'Memberi area lebih besar pada item yang memang perlu ditonjolkan', 'Menguji auto placement setelah daftar proyek bertambah'], [
      'Proyek unggulan|Portal kelas|Katalog belajar|Dashboard kegiatan', 'Tugas tampilan|Rancang kartu|Atur gap|Pilih warna', 'Pekerjaan berikutnya|Tambah proyek|Ubah track|Review distribusi'
    ]),
    capstoneCase('Dashboard ringkasan peserta dengan statistik, status, dan pesan kosong yang sejajar.', 'Instruktur dan koordinator kelompok', ['Memilih sumbu yang tepat untuk distribusi dan perataan', 'Menyelaraskan seluruh kelompok lalu menimpa satu item bila perlu', 'Menempatkan pesan kosong tanpa margin perkiraan'], [
      'Statistik kelas|Jumlah peserta|Jumlah kelompok|Jumlah pertemuan', 'Hasil presentasi|Presentasi awal|Presentasi lanjutan|Presentasi akhir', 'Review alignment|Sumbu utama|Sumbu silang|Perataan satu item'
    ]),
    capstoneCase('Profil belajar peserta dengan kontak, target mingguan, proyek, dan catatan panjang.', 'Peserta yang menyusun portofolio praktikum', ['Membedakan ruang di dalam komponen dan jarak di luarnya', 'Membatasi lebar baca tanpa memaksa ukuran tetap pada mobile', 'Menyediakan batas tinggi sekaligus akses ke isi yang panjang'], [
      'Identitas peserta|Nama dan kelas|Minat belajar|Kebiasaan coding', 'Proyek latihan|Profil pribadi|Katalog materi|Halaman jadwal', 'Rencana perbaikan|Ruang isi|Jeda antar-panel|Ukuran nyaman'
    ]),
    capstoneCase('Majalah praktikum yang memadukan artikel, kutipan, glosarium, dan catatan editor.', 'Pembaca materi yang membutuhkan teks panjang nyaman', ['Membangun hirarki tulisan dari heading sampai catatan kecil', 'Membedakan jarak baris dan jarak huruf pada konteks yang sesuai', 'Menjaga kode, istilah, dan teks bacaan punya penampilan berbeda'], [
      'Artikel utama|Utility sebagai keputusan|Membaca source|Belajar lewat perubahan', 'Glosarium font|Font family|Font weight|Line height', 'Edisi berikutnya|Tema layout|Tema komponen|Tema interaksi'
    ]),
    capstoneCase('Halaman promosi workshop dengan banner gradasi, panel jadwal, dan latar dekoratif lokal.', 'Calon peserta yang meninjau program workshop', ['Memilih warna yang mendukung informasi bukan menutupi teks', 'Mengatur arah gradasi tanpa mencampur perubahan palet', 'Menguji ukuran, posisi, dan pengulangan background secara terpisah'], [
      'Program workshop|Pengenalan web|Layout responsif|Komponen praktis', 'Paket peserta|Paket pemula|Paket latihan|Paket proyek', 'Agenda penutup|Demo hasil|Umpan balik|Rencana belajar'
    ]),
    capstoneCase('Katalog paket belajar dengan fasilitas, rekomendasi, dan batas komponen yang jelas.', 'Peserta yang membandingkan pilihan pendampingan', ['Membedakan border luar komponen dari pemisah di antara anak', 'Menggunakan ring sebagai penekanan tambahan di luar batas', 'Menjaga satu rekomendasi utama agar hirarki pilihan jelas'], [
      'Paket belajar|Mandiri|Dengan pendamping|Kelompok kecil', 'Pilihan pendamping|Review struktur|Review tampilan|Review source', 'Langkah berikutnya|Pilih paket|Siapkan latihan|Ikuti review'
    ]),
    capstoneCase('Galeri materi visual dengan thumbnail dekoratif, bayangan, dan filter yang terarah.', 'Peserta yang meninjau contoh sebelum praktik', ['Memberi kedalaman tanpa mengubah ruang layout', 'Menerapkan filter pada dekorasi dan menjaga informasi tetap jelas', 'Membedakan redupnya seluruh kartu dari perubahan latar saja'], [
      'Galeri tersedia|Materi layout|Materi typography|Materi spacing', 'Pilihan filter|Grayscale|Saturasi|Hue rotation', 'Audit visual|Kontras teks|Penekanan wajar|Informasi lengkap'
    ]),
    capstoneCase('Administrasi jadwal, pembagian kelompok, dan hasil review dalam tabel yang aksesibel.', 'Koordinator kelas dan mahasiswa', ['Memilih tabel untuk hubungan baris dan kolom yang nyata', 'Menjaga header sel dan caption sesuai isi data', 'Memastikan kolom tetap dapat dijangkau pada viewport sempit'], [
      'Jadwal pertemuan|Senin pengantar|Selasa praktik|Kamis review', 'Daftar tugas|Tugas struktur|Tugas tampilan|Tugas integrasi', 'Agenda berikutnya|Pengumpulan|Diskusi|Perbaikan'
    ]),
    capstoneCase('Katalog sesi belajar dengan umpan balik hover/fokus, transisi, dan penanda animasi dekoratif.', 'Pengguna mouse maupun keyboard', ['Menguji keadaan awal dan perubahan state dengan informasi yang sama', 'Memilih property transisi dan durasi sesuai tujuan umpan balik', 'Menghormati pilihan pengurangan gerak tanpa menghilangkan isi'], [
      'Pilihan materi|Dasar HTML|Layout CSS|Komponen Tailwind', 'Durasi pembanding|Durasi singkat|Durasi sedang|Durasi panjang', 'Review sesi|Catatan durasi|Catatan easing|Catatan akses'
    ]),
    capstoneCase('Portofolio poster workshop dengan transform yang tidak mengganggu informasi sekitar.', 'Peserta yang memilih sesi workshop', ['Menyediakan ruang sebelum memperbesar atau memutar poster', 'Memisahkan efek scale, rotate, dan translate saat membandingkan', 'Menguji poros dan reduced motion pada ukuran layar berbeda'], [
      'Poster utama|Workshop HTML|Workshop CSS|Workshop Tailwind', 'Eksperimen scale|Ukuran semula|Sedikit besar|Tanpa pembesaran', 'Galeri hasil|Versi awal|Versi diperbaiki|Versi akhir'
    ]),
    capstoneCase('Workspace catatan belajar dengan textarea, seleksi teks, fokus keyboard, dan overlay dekoratif.', 'Peserta yang mengetik sambil mengikuti demonstrasi', ['Memastikan kontrol tetap dapat diakses dengan keyboard', 'Membedakan petunjuk cursor dari perilaku kontrol yang sebenarnya', 'Menjaga catatan dapat diseleksi dan diperpanjang bila diperlukan'], [
      'Catatan konsep|Definisi utility|Acuan positioning|Perilaku overflow', 'Pertanyaan kelas|Masalah setup|Masalah tampilan|Masalah interaksi', 'Refleksi interaksi|Uji Tab|Uji klik|Uji seleksi'
    ]),
    capstoneCase('Portal pendaftaran workshop dengan formulir lengkap dan informasi proses yang transparan.', 'Peserta yang memilih kelas dan sesi pendampingan', ['Menyatukan label, jenis kontrol, dan petunjuk pengisian', 'Membedakan kontrol wajib, opsional, readonly, dan disabled', 'Memberi feedback validasi sebelum menampilkan ringkasan lokal'], [
      'Pilihan program|Program pemula|Program layout|Program komponen', 'Panduan data diri|Nama lengkap|Alamat email|Nomor kontak', 'Langkah setelah daftar|Baca ringkasan|Simpan source|Bawa hasil praktik'
    ]),
    capstoneCase('Pusat pengaturan kelas dengan tombol aksi, pilihan aktif, dan simulasi proses yang konsisten.', 'Instruktur yang mengubah preferensi tampilan kelas', ['Mengubah atribut status bersama label dan penampilan tombol', 'Mencegah aksi berulang selama simulasi loading berlangsung', 'Memulihkan semua keadaan setelah proses selesai atau direset'], [
      'Preferensi kelas|Pengingat kelas|Ringkasan mingguan|Mode tampilan', 'Varian tombol|Primary|Secondary|Danger demo', 'Skenario uji|Klik berulang|Reset pilihan|Proses selesai'
    ]),
    capstoneCase('Portal kelas semester lengkap yang memadukan semua komponen esensial.', 'Peserta, asisten, dan instruktur', ['Memadukan navigasi, informasi, form, dan status dalam satu konteks', 'Menjaga link, kontrol, dan fokus konsisten saat bagian disembunyikan', 'Menggunakan komponen semantik untuk data, pesan, dan bantuan'], [
      'Materi semester|Dasar web|Layout responsif|Komponen UI', 'Informasi kelas|Pengumuman|Perubahan jadwal|Tenggat tugas', 'Rencana penutup|Pengumpulan|Presentasi|Refleksi'
    ])
  ],
  jquery: [
    capstoneCase('Portal sambutan yang memperkenalkan alur pilih, tunggu event, lalu ubah teks.', 'Peserta yang baru memakai jQuery', ['Memuat library sebelum kode aplikasi memakai tanda $', 'Memasang handler setelah elemen halaman tersedia', 'Mengubah pesan hanya saat tindakan pengguna benar-benar terjadi'], [
      'Sambutan kelas|Salam pembuka|Instruksi praktik|Pesan penutup', 'Target perubahan|Pesan utama|Petunjuk peserta|Catatan status', 'Kriteria hasil|Library siap|Tombol bekerja|Tidak ada reload'
    ]),
    capstoneCase('Katalog pilihan kelas dengan input, tombol bersama, dan ringkasan tindakan pengguna.', 'Peserta yang memilih program belajar', ['Memilih sasaran lewat ID dan class sesuai kebutuhan', 'Membaca input terbaru ketika event input berjalan', 'Menghubungkan this dengan tombol yang diklik peserta'], [
      'Program belajar|Web A|Web B|Web C', 'Kelas sore|Review|Latihan|Presentasi', 'Review selector|Target benar|Event tepat|Teks aman'
    ]),
    capstoneCase('Papan tugas tim yang mendukung penambahan, prioritas, dan penghapusan item baru.', 'Kelompok praktikum yang membagi pekerjaan', ['Membuat elemen sebelum memasukkan teks pengguna', 'Memilih append atau prepend berdasarkan prioritas tugas', 'Mendelegasikan event agar item baru langsung dapat digunakan'], [
      'Backlog struktur|Susun heading|Buat navigasi|Pisahkan section', 'Backlog komponen|Buat card|Buat daftar|Buat status', 'Kriteria papan|Tidak ada item kosong|Teks tidak jadi markup|Delegasi bekerja'
    ]),
    capstoneCase('Pengaturan profil dengan class state, atribut, property kontrol, dan ringkasan teks aman.', 'Peserta yang mengatur profil belajar', ['Membedakan atribut awal dan property keadaan terkini', 'Mengubah class tampilan bersama atribut status aksesibel', 'Menampilkan isi pengguna sebagai teks bukan markup aktif'], [
      'Data profil|Nama peserta|Nama kelas|Catatan belajar', 'Penampilan aktif|Warna pilihan|Ketebalan label|Ring penanda', 'Kriteria profil|State cocok|Input aman|Reset lengkap'
    ]),
    capstoneCase('Papan review peserta yang mencari sasaran dari tombol melalui hubungan elemen.', 'Asisten yang memilih kartu presentasi', ['Memulai pencarian dari elemen yang benar-benar diklik', 'Membedakan anak langsung, keturunan, dan ancestor kartu', 'Memperbarui kartu terpilih tanpa menukar data peserta lain'], [
      'Kelompok pertama|Ayu|Bima|Citra', 'Review struktur|Heading|Navigasi|Section', 'Kriteria review|Satu pilihan|Nama benar|Status pulih'
    ]),
    capstoneCase('Pusat bantuan dengan panel buka-tutup, efek, dan antrean yang terkendali.', 'Peserta yang mencari bantuan sambil coding', ['Menyelaraskan status tombol dengan keadaan panel yang dituju', 'Membuang antrean ketika pengguna melakukan klik berulang', 'Menampilkan informasi tanpa animasi pada reduced motion'], [
      'Bantuan setup|Library tidak dimuat|Folder salah|Script salah urutan', 'Bantuan source|Edit belum di-Run|Tab yang salah|Draft belum disimpan', 'Kriteria bantuan|Isi terlihat|Antrean bersih|Fokus aman'
    ]),
    capstoneCase('Pendaftaran peserta dengan validasi beberapa field dan ringkasan lokal tanpa pengiriman.', 'Calon peserta workshop', ['Memeriksa submit baik dari tombol maupun Enter', 'Memberi pesan khusus dan fokus pada field yang perlu diperbaiki', 'Membersihkan state error ketika peserta memperbaiki data'], [
      'Identitas pendaftar|Nama lengkap|Alamat email|Nomor peserta', 'Persetujuan|Siap belajar|Paham demo|Bawa perangkat', 'Kriteria pendaftaran|Submit tertahan|Fokus tepat|Tidak ada data terkirim'
    ]),
    capstoneCase('Direktori peserta dengan request JSON lokal, retry, keadaan kosong, dan feedback kegagalan.', 'Koordinator yang meninjau hasil request', ['Menampilkan loading sebelum hasil dibaca', 'Memisahkan sukses, kosong, dan gagal dalam pesan yang jelas', 'Memulihkan kontrol di always agar request dapat dicoba lagi'], [
      'Direktori pemula|Ayu|Bima|Citra', 'Data peserta|Nama|Kelas|Minat', 'Kriteria direktori|Jumlah benar|Tombol pulih|Tanpa backend'
    ])
  ]
};

const capstoneJqueryReferences = [
  [['DOM ready', '$(function () { … })', 'menunggu DOM siap'], ['Event klik', '.on("click", handler)', 'menunggu tindakan pengguna'], ['Isi pesan', '.text(value)', 'mengganti teks status']],
  [['Selector ID', '$("#id")', 'memilih target tunggal'], ['Input terbaru', '.val()', 'membaca isi kontrol'], ['Event bersama', '.on("click", handler)', 'mengenali tombol lewat this']],
  [['Tambah item', '.append() / .prepend()', 'memilih posisi item baru'], ['Delegasi', '.on("click", selector, handler)', 'menangani tombol dinamis'], ['Hapus item', '.remove()', 'menghapus item yang dipilih']],
  [['State kontrol', '.prop()', 'membaca atau mengubah property'], ['Status akses', '.attr()', 'menyelaraskan atribut informasi'], ['Tampilan pilihan', '.toggleClass()', 'mengganti class state']],
  [['Ancestor', '.closest()', 'menemukan kartu dari tombol'], ['Anak langsung', '.children()', 'membaca judul kartu'], ['Keturunan', '.find()', 'memilih status yang lebih dalam']],
  [['Keadaan panel', '.show() / .hide()', 'memastikan isi dapat diakses'], ['Antrean', '.stop(true, true)', 'menghentikan efek lama'], ['Efek panel', '.slideDown() / .slideUp()', 'membuka atau menutup panel']],
  [['Submit', '.on("submit", handler)', 'menangani tombol dan Enter'], ['Isi field', '.val().trim()', 'membaca nama tanpa spasi tepi'], ['Feedback', '.attr("aria-invalid", value)', 'menandai field yang salah']],
  [['Request JSON', '$.ajax()', 'mengambil data demo'], ['Hasil', '.done() / .fail()', 'memisahkan sukses dan gagal'], ['Pemulihan', '.always()', 'mengaktifkan kontrol kembali']]
];
function capstoneEscape(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
function capstoneGrid(track, number) {
  if (track === 'tailwind' && number < 3) return 'space-y-5';
  if (track === 'tailwind' && number === 5) return 'flex flex-col gap-5 sm:flex-row sm:flex-wrap';
  return 'grid grid-cols-1 gap-5 md:grid-cols-3';
}
function capstoneCardClasses(track, number, item) {
  const base = 'min-w-0 rounded-xl bg-white p-5';
  if (track !== 'tailwind') return `${base} border border-slate-200`;
  const style = {
    4: 'relative', 5: 'flex-1 sm:basis-72', 6: item === 0 ? 'md:col-span-2' : '',
    7: 'flex flex-col justify-between', 8: 'min-h-64 max-w-xl', 9: 'font-serif',
    10: 'capstone-pattern bg-repeat bg-[length:32px_32px]',
    11: item === 0 ? 'border-2 border-emerald-700 ring-2 ring-emerald-100 ring-offset-2' : 'border-2 border-dashed border-slate-300',
    12: ['shadow-lg', 'shadow-sm', 'shadow-inner'][item],
    14: 'shadow-sm transition-shadow duration-300 ease-out hover:shadow-xl motion-reduce:transition-none',
    15: `${['origin-bottom-left hover:rotate-2', 'origin-top-right hover:-rotate-2', 'origin-center hover:translate-y-1'][item]} shadow-md transition-transform duration-300 hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none`,
    16: 'border border-slate-200', 17: 'border border-slate-200', 18: 'border border-slate-200', 19: 'border border-slate-200 shadow-sm'
  };
  return `${base} ${style[number] || ''}`;
}
function capstoneItem(config, project, track, number, moduleIndex, itemIndex) {
  const module = config.modules[moduleIndex];
  const name = module.items[itemIndex];
  const sequence = moduleIndex * 3 + itemIndex + 1;
  const id = `capstone-item-${sequence}`;
  const reference = track === 'jquery' ? capstoneJqueryReferences[number - 1][itemIndex] : project.rows[itemIndex % project.rows.length];
  const instruction = config.work[itemIndex];
  const status = ['Siap dikerjakan', 'Dalam pendampingan', 'Menunggu review'][itemIndex];
  const reviewer = ['Ayu · penyusun', 'Bima · penguji', 'Citra · peninjau'][itemIndex];
  const label = (value) => capstoneEscape(value);
  let extra = '';
  if (track === 'tailwind' && number === 4) extra = `<span class="absolute right-3 top-3 z-10 rounded bg-emerald-100 px-2 py-1 text-xs">Unit ${sequence}</span>`;
  if (track === 'tailwind' && [10, 12, 15].includes(number)) extra = `<div aria-hidden="true" class="mb-4 h-20 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 ${number === 12 ? ['grayscale', 'saturate-150', 'hue-rotate-90'][itemIndex] : ''}"></div>`;
  if (track === 'tailwind' && number === 16) extra = `<label for="${id}-note" class="mt-4 block font-semibold">Catatan untuk ${label(name)}</label>
          <textarea id="${id}-note" name="note-${sequence}" rows="3" class="mt-2 w-full resize-y select-text rounded-lg border p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-700" placeholder="Tulis pengamatanmu di sini"></textarea>`;
  if (track === 'tailwind' && number === 19) extra = `<details class="mt-4 rounded-lg border open:bg-emerald-50">
          <summary class="cursor-pointer p-3 font-semibold focus-visible:outline focus-visible:outline-2">Bantuan untuk ${label(name)}</summary>
          <p class="px-3 pb-3">Mulai dari komponen utama, periksa informasi ${label(module.title.toLowerCase())}, lalu simpan catatan perubahan setelah menguji hasil.</p>
        </details>`;
  if (track === 'jquery' && number === 5) extra = `<button type="button" class="capstone-review mt-4 rounded bg-emerald-700 px-3 py-2 text-white focus-visible:outline focus-visible:outline-2" aria-pressed="false">Pilih untuk review</button>
        <p class="capstone-review-status mt-2 text-sm" role="status">Belum dipilih dalam kelompok ini.</p>`;
  if (track === 'jquery' && number === 6) extra = `<button type="button" class="capstone-help mt-4 rounded bg-emerald-700 px-3 py-2 text-white focus-visible:outline focus-visible:outline-2" aria-expanded="false" aria-controls="${id}-help" data-panel="${id}-help">Buka petunjuk</button>
        <div id="${id}-help" style="display:none" class="mt-3 rounded bg-emerald-50 p-3">
          <p>${label(instruction)}. Buka panel ini lewat tombol; klik ulang untuk menutup, dan cek apakah status tombol tetap cocok setelah klik cepat.</p>
        </div>`;
  return `      <article id="${id}" class="capstone-item ${capstoneCardClasses(track, number, itemIndex)}">
        <header class="${number === 4 && track === 'tailwind' ? 'pr-24' : ''}">
          <p class="text-xs font-semibold uppercase tracking-wide text-emerald-800">${label(module.title)} · ${sequence}</p>
          <h4 class="mt-2 text-lg font-semibold">${label(name)}</h4>
          <p class="mt-3 leading-relaxed text-slate-600">${label(instruction)}. Entri ini membantu ${label(config.audience.toLowerCase())} menyiapkan ${label(name.toLowerCase())} dengan informasi yang bisa ditinjau tanpa berpindah halaman.</p>
        </header>
        <dl class="mt-4 space-y-3 ${track === 'tailwind' && number === 11 ? 'divide-y divide-slate-200' : ''}">
          <div class="${number >= 7 ? 'flex items-start justify-between gap-3' : ''}">
            <dt class="text-sm text-slate-600">Penanggung jawab</dt>
            <dd class="font-medium">${reviewer}</dd>
          </div>
          <div class="${number >= 7 ? 'flex items-center justify-between gap-3' : ''}">
            <dt class="text-sm text-slate-600">Status kegiatan</dt>
            <dd class="rounded-full bg-emerald-100 px-2 py-1 text-sm text-emerald-900">${status}</dd>
          </div>
          <div class="${number >= 7 ? 'flex items-start justify-between gap-3' : ''}">
            <dt class="text-sm text-slate-600">Waktu pendampingan</dt>
            <dd class="font-medium">${['09.00–09.30', '10.00–10.30', '11.00–11.30'][itemIndex]}</dd>
          </div>
        </dl>
        <h5 class="mt-5 font-semibold">Rencana pelaksanaan</h5>
        <ol class="mt-3 list-decimal space-y-2 pl-5 ${track === 'tailwind' && [4, 8].includes(number) ? 'max-h-40 overflow-auto' : ''}">
          <li>Siapkan versi pertama untuk ${label(name.toLowerCase())}; cocokkan isi dengan kebutuhan ${label(module.title.toLowerCase())}, bukan mengganti warna tanpa alasan.</li>
          <li>Periksa ${label(reference[0].toLowerCase())} melalui <code class="font-mono text-sm">${label(reference[1])}</code>, kemudian bandingkan pengaruhnya pada komponen dan pembungkusnya.</li>
          <li>Uji hasil pada konteks halaman lengkap. Catat elemen yang berubah, bagian yang tetap, dan alasan memilih versi akhir sebelum meminta review.</li>
        </ol>
        <div class="mt-4 rounded-lg bg-slate-50 p-3">
          <h5 class="font-semibold">Hasil yang disiapkan</h5>
          <p class="mt-2 text-sm leading-relaxed">Satu perubahan yang dapat dijelaskan pada ${label(name.toLowerCase())}, source HTML yang masih berjalan, serta catatan sebelum/sesudah. Pemeriksaan fokus pada ${label(reference[2])}; status ini adalah informasi contoh, bukan progres yang disimpan aplikasi.</p>
        </div>
        ${extra}
      </article>`;
}

function capstoneTable(config, index) {
  const module = config.modules[index];
  return `    <div class="mt-5 overflow-auto rounded-lg border border-slate-200">
      <table class="w-full min-w-[640px] ${index % 2 ? 'table-auto border-separate border-spacing-2' : 'table-fixed border-collapse'} text-left">
        <caption class="p-3 text-left font-semibold">Rekap ${capstoneEscape(module.title.toLowerCase())}</caption>
        <thead>
          <tr>
            <th scope="col" class="border border-slate-200 bg-slate-100 p-3">Kegiatan</th>
            <th scope="col" class="border border-slate-200 bg-slate-100 p-3">Pendamping</th>
            <th scope="col" class="border border-slate-200 bg-slate-100 p-3">Status</th>
            <th scope="col" class="border border-slate-200 bg-slate-100 p-3">Catatan review</th>
          </tr>
        </thead>
        <tbody>
${module.items.map((item, itemIndex) => `          <tr class="${itemIndex % 2 ? 'bg-emerald-50' : 'bg-white'}">
            <th scope="row" class="border border-slate-200 p-3 font-medium">${capstoneEscape(item)}</th>
            <td class="border border-slate-200 p-3">${['Rina', 'Budi', 'Sari'][itemIndex]}</td>
            <td class="border border-slate-200 p-3">${['Siap', 'Direview', 'Menunggu'][itemIndex]}</td>
            <td class="border border-slate-200 p-3">${capstoneEscape(config.work[itemIndex])}.</td>
          </tr>`).join('\n')}
        </tbody>
      </table>
    </div>`;
}

function capstoneControls(track, number) {
  const field = 'mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500';
  const button = 'rounded-lg bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
  const formControls = `      <form id="capstone-registration" class="grid gap-5 sm:grid-cols-2" novalidate>
        <div>
          <label for="capstone-name" class="block font-semibold">Nama lengkap</label>
          <input id="capstone-name" name="name" autocomplete="name" required minlength="3" aria-describedby="capstone-result" class="${field} aria-[invalid=true]:border-red-500">
        </div>
        <div>
          <label for="capstone-email" class="block font-semibold">Email peserta</label>
          <input id="capstone-email" name="email" type="email" autocomplete="email" required aria-describedby="capstone-result" class="${field} aria-[invalid=true]:border-red-500">
        </div>
        <div>
          <label for="capstone-class" class="block font-semibold">Kelas yang dipilih</label>
          <select id="capstone-class" name="className" required class="${field}">
            <option value="">Pilih kelas</option>
            <option value="Web A">Web A · pengenalan</option>
            <option value="Web B">Web B · layout</option>
            <option value="Web C">Web C · komponen</option>
          </select>
        </div>
        <div>
          <label for="capstone-code" class="block font-semibold">Kode demo (readonly)</label>
          <input id="capstone-code" name="code" value="P-DEMO" readonly class="${field} read-only:bg-slate-100">
        </div>
        <fieldset class="rounded-lg border p-4">
          <legend class="px-1 font-semibold">Sesi pendampingan</legend>
          <label class="block py-2"><input type="radio" name="capstone-session" value="pagi" checked class="accent-emerald-600"> Pagi · 09.00</label>
          <label class="block py-2"><input type="radio" name="capstone-session" value="siang" class="accent-emerald-600"> Siang · 10.00</label>
          <label class="block py-2"><input type="radio" name="capstone-session" value="sore" class="accent-emerald-600"> Sore · 11.00</label>
        </fieldset>
        <div>
          <label for="capstone-message" class="block font-semibold">Catatan opsional</label>
          <textarea id="capstone-message" name="message" rows="4" class="${field} resize-y" placeholder="Apa yang ingin didiskusikan?"></textarea>
        </div>
        <label class="sm:col-span-2"><input id="capstone-consent" name="consent" type="checkbox" required class="accent-emerald-600"> Saya memahami bahwa ini latihan browser tanpa pengiriman data</label>
        <div class="flex flex-wrap gap-3 sm:col-span-2">
          <button type="submit" class="${button}">Periksa data peserta</button>
          <button type="reset" class="rounded-lg border px-4 py-2 focus-visible:outline focus-visible:outline-2">Kosongkan form</button>
        </div>
      </form>
      <p id="capstone-result" class="mt-4 rounded-lg bg-slate-100 p-4" role="status">Form belum diperiksa. Tidak ada data yang dikirim.</p>`;
  if ((track === 'tailwind' && [17, 19].includes(number)) || (track === 'jquery' && number === 7)) return { html: formControls, type: 'form' };
  if (track === 'tailwind' && number === 18) return { type: 'settings', html: `      <div class="max-w-xl space-y-5">
        <div><label for="capstone-setting-name" class="block font-semibold">Nama kelas</label><input id="capstone-setting-name" value="Praktikum Web" class="${field}"></div>
        <button id="capstone-reminder" type="button" aria-pressed="false" class="rounded-lg border border-emerald-700 px-4 py-2 aria-pressed:bg-emerald-700 aria-pressed:text-white focus-visible:outline focus-visible:outline-2">Pengingat belum aktif</button>
        <div class="flex flex-wrap gap-3"><button id="capstone-process" type="button" class="${button}">Mulai simulasi</button><button id="capstone-settings-reset" type="button" class="rounded-lg border px-4 py-2 focus-visible:outline focus-visible:outline-2">Kembalikan pilihan</button></div>
        <p id="capstone-result" class="rounded-lg bg-slate-100 p-4" role="status">Belum ada simulasi. Pilihan tidak disimpan.</p>
      </div>` };
  if (track !== 'jquery') return { type: 'static', html: `      <div class="rounded-lg bg-emerald-50 p-5">
        <h4 class="font-semibold">Cara meninjau hasil halaman</h4>
        <p class="mt-3 leading-relaxed">Gunakan navigasi proyek untuk mengunjungi tiap modul. Pilih dua komponen, ubah property yang sedang dipelajari, lalu bandingkan pengaruhnya pada versi halaman lengkap.</p>
        <a href="#studio-journal" class="mt-4 inline-block text-emerald-800 underline focus-visible:outline focus-visible:outline-2">Tulis hasil peninjauan pada jurnal</a>
      </div>` };
  const controls = {
    1: `      <div class="flex flex-wrap gap-3"><button id="capstone-welcome" type="button" class="${button}">Mulai sesi proyek</button><button id="capstone-welcome-reset" type="button" class="rounded-lg border px-4 py-2 focus-visible:outline focus-visible:outline-2">Ulangi sambutan</button></div><p id="capstone-result" class="mt-4" role="status">Klik tombol setelah halaman siap.</p>`,
    2: `      <label for="capstone-participant" class="block font-semibold">Nama peserta</label><input id="capstone-participant" class="${field}" placeholder="Contoh: Ayu"><div class="mt-4 flex flex-wrap gap-3"><button type="button" class="capstone-class ${button}">Web A</button><button type="button" class="capstone-class ${button}">Web B</button><button type="button" class="capstone-class ${button}">Web C</button></div><p id="capstone-result" class="mt-4" role="status">Isi nama dan pilih kelas.</p>`,
    3: `      <form id="capstone-task-form"><label for="capstone-task-text" class="block font-semibold">Tugas proyek baru</label><input id="capstone-task-text" required class="${field}"><label class="mt-3 block"><input id="capstone-task-priority" type="checkbox" class="accent-emerald-600"> Prioritaskan di awal</label><button type="submit" class="mt-4 ${button}">Tambah tugas</button></form><ul id="capstone-tasks" class="mt-5 space-y-3"></ul><p id="capstone-result" class="mt-4" role="status">Daftar tugas masih kosong.</p>`,
    4: `      <label for="capstone-profile-name" class="block font-semibold">Nama profil</label><input id="capstone-profile-name" class="${field}"><button id="capstone-profile-toggle" type="button" aria-pressed="false" class="mt-4 rounded-lg border px-4 py-2 focus-visible:outline focus-visible:outline-2">Pengingat nonaktif</button><label class="mt-4 block"><input id="capstone-profile-consent" type="checkbox"> Setuju menampilkan ringkasan</label><button id="capstone-profile-save" type="button" disabled title="Centang persetujuan dahulu" class="mt-4 ${button}">Tampilkan profil</button><p id="capstone-result" class="mt-4" role="status">Nama akan tampil sebagai teks biasa.</p>`,
    5: '      <p class="leading-relaxed">Gunakan tombol Pilih untuk review pada setiap kartu. Pemilihan berlaku pada tiga kartu dalam modul yang sama; kartu pada modul lain tetap punya konteks review sendiri.</p>',
    6: '      <p class="leading-relaxed">Setiap kartu mempunyai panel petunjuk. Coba klik cepat dan uji dengan keyboard; penanda aria-expanded harus selalu mengikuti keadaan yang dituju.</p>',
    8: `      <label for="capstone-request-mode" class="block font-semibold">Skenario request</label><select id="capstone-request-mode" class="${field}"><option value="valid">Data valid</option><option value="empty">Array kosong</option><option value="broken">JSON rusak</option></select><button id="capstone-load" type="button" class="mt-4 ${button}">Muat direktori demo</button><p id="capstone-result" class="mt-4" role="status">Request belum dimulai.</p><ul id="capstone-directory" class="mt-4 space-y-3"></ul>`
  };
  return { type: `jquery-${number}`, html: controls[number] };
}

function capstoneNativeScript(type) {
  if (type === 'form') return `// Form lengkap: validasi native, ringkasan lokal, dan pemulihan reset.
const capstoneForm = document.querySelector("#capstone-registration");
capstoneForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.querySelector("#capstone-name");
  const result = document.querySelector("#capstone-result");
  if (!name.value.trim()) {
    result.textContent = "Nama tidak boleh hanya spasi.";
    name.focus();
    return;
  }
  if (!this.reportValidity()) {
    result.textContent = "Perbaiki kolom wajib, format email, atau persetujuan.";
    return;
  }
  const className = document.querySelector("#capstone-class").value;
  result.textContent = name.value.trim() + " memilih " + className + ". Format valid; data tidak dikirim.";
});
capstoneForm.addEventListener("reset", function () {
  document.querySelector("#capstone-result").textContent = "Form dikosongkan. Silakan mulai lagi.";
});`;
  if (type === 'settings') return `// Pengaturan lengkap: atribut pilihan dan loading mengikuti perilaku nyata.
const capstoneReminder = document.querySelector("#capstone-reminder");
const capstoneProcess = document.querySelector("#capstone-process");
const capstoneReset = document.querySelector("#capstone-settings-reset");
capstoneReminder.addEventListener("click", function () {
  const active = this.getAttribute("aria-pressed") !== "true";
  this.setAttribute("aria-pressed", String(active));
  this.textContent = active ? "Pengingat aktif" : "Pengingat belum aktif";
});
capstoneProcess.addEventListener("click", function () {
  this.disabled = true;
  this.setAttribute("aria-busy", "true");
  capstoneReset.disabled = true;
  this.textContent = "Menjalankan simulasi…";
  document.querySelector("#capstone-result").textContent = "Tunggu proses lokal; tidak ada request ke server.";
  setTimeout(function () {
    capstoneProcess.disabled = false;
    capstoneProcess.setAttribute("aria-busy", "false");
    capstoneReset.disabled = false;
    capstoneProcess.textContent = "Mulai simulasi";
    const name = document.querySelector("#capstone-setting-name").value.trim();
    document.querySelector("#capstone-result").textContent = "Simulasi untuk " + (name || "kelas tanpa nama") + " selesai. Data tidak disimpan.";
  }, 1000);
});
capstoneReset.addEventListener("click", function () {
  capstoneReminder.setAttribute("aria-pressed", "false");
  capstoneReminder.textContent = "Pengingat belum aktif";
  document.querySelector("#capstone-setting-name").value = "Praktikum Web";
  document.querySelector("#capstone-result").textContent = "Pilihan kembali ke keadaan awal.";
});`;
  return '';
}
function capstoneJqueryScript(number) {
  const scripts = {
    1: `$(function () {
  $("#capstone-welcome").on("click", function () {
    $("#capstone-result").text("Sesi proyek dimulai. Jelajahi modul, kemudian pilih satu perubahan untuk diuji.");
  });
  $("#capstone-welcome-reset").on("click", function () {
    $("#capstone-result").text("Sambutan diulang. Klik tombol setelah halaman siap.");
  });
});`,
    2: `$(function () {
  let capstoneClass = "belum dipilih";
  function renderCapstoneSelection() {
    const name = $("#capstone-participant").val().trim();
    $("#capstone-result").text("Peserta: " + (name || "nama belum diisi") + "; kelas: " + capstoneClass + ".");
  }
  $("#capstone-participant").on("input", renderCapstoneSelection);
  $(".capstone-class").on("click", function () {
    capstoneClass = $(this).text();
    renderCapstoneSelection();
  });
});`,
    3: `$(function () {
  function updateCapstoneTasks() {
    const total = $("#capstone-tasks").children("li").length;
    $("#capstone-result").text(total ? total + " tugas proyek. Data hanya di browser." : "Daftar tugas masih kosong.");
  }
  $("#capstone-task-form").on("submit", function (event) {
    event.preventDefault();
    const value = $("#capstone-task-text").val().trim();
    if (!value) {
      $("#capstone-result").text("Isi nama tugas, bukan hanya spasi.");
      $("#capstone-task-text").focus();
      return;
    }
    const item = $("<li>").addClass("flex items-center gap-3 rounded-lg bg-emerald-50 p-4");
    item.append($("<span>").addClass("grow").text(value));
    item.append($("<button>").attr({ type: "button", "aria-label": "Hapus tugas " + value }).addClass("capstone-remove underline").text("Hapus"));
    if ($("#capstone-task-priority").prop("checked")) $("#capstone-tasks").prepend(item);
    else $("#capstone-tasks").append(item);
    $("#capstone-task-text").val("").focus();
    updateCapstoneTasks();
  });
  $("#capstone-tasks").on("click", ".capstone-remove", function () {
    $(this).parent().remove();
    $("#capstone-task-text").focus();
    updateCapstoneTasks();
  });
});`,
    4: `$(function () {
  $("#capstone-profile-toggle").on("click", function () {
    const active = $(this).attr("aria-pressed") !== "true";
    $(this).attr("aria-pressed", String(active)).toggleClass("bg-emerald-700 text-white", active).text(active ? "Pengingat aktif" : "Pengingat nonaktif");
  });
  $("#capstone-profile-consent").on("change", function () {
    const allowed = $(this).prop("checked");
    $("#capstone-profile-save").prop("disabled", !allowed).attr("title", allowed ? "Siap menampilkan profil" : "Centang persetujuan dahulu");
  });
  $("#capstone-profile-save").on("click", function () {
    const name = $("#capstone-profile-name").val().trim();
    $("#capstone-result").text(name ? "Profil " + name + " diperiksa. Tidak disimpan." : "Isi nama profil terlebih dahulu.");
  });
});`,
    5: `$(function () {
  $(".capstone-review").on("click", function () {
    const card = $(this).closest(".capstone-item");
    const others = card.siblings(".capstone-item");
    others.removeClass("ring-2 ring-emerald-500");
    others.find(".capstone-review").attr("aria-pressed", "false");
    others.find(".capstone-review-status").text("Belum dipilih dalam kelompok ini.");
    card.addClass("ring-2 ring-emerald-500");
    $(this).attr("aria-pressed", "true");
    const name = card.children("header").find("h4").text();
    card.find(".capstone-review-status").text(name + " dipilih untuk review kelompok ini.");
  });
});`,
    6: `$(function () {
  $(".capstone-help").on("click", function () {
    const open = $(this).attr("aria-expanded") !== "true";
    $(this).attr("aria-expanded", String(open)).text(open ? "Tutup petunjuk" : "Buka petunjuk");
    const panel = $("#" + $(this).attr("data-panel")).stop(true, true);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (open) panel.show(); else panel.hide();
    } else {
      if (open) panel.slideDown(200); else panel.slideUp(200);
    }
  });
});`,
    7: `$(function () {
  $("#capstone-registration").on("submit", function (event) {
    event.preventDefault();
    const name = $("#capstone-name").val().trim();
    const nameValid = name.length >= 3;
    const emailValid = $("#capstone-email")[0].checkValidity();
    const classValid = Boolean($("#capstone-class").val());
    const consentValid = $("#capstone-consent").prop("checked");
    $("#capstone-name").attr("aria-invalid", String(!nameValid));
    $("#capstone-email").attr("aria-invalid", String(!emailValid));
    $("#capstone-class").attr("aria-invalid", String(!classValid));
    if (!nameValid || !emailValid || !classValid || !consentValid) {
      const message = !nameValid ? "Nama perlu minimal tiga karakter." : !emailValid ? "Format email perlu diperbaiki." : !classValid ? "Pilih kelas dahulu." : "Baca dan centang persetujuan.";
      $("#capstone-result").text(message);
      const target = !nameValid ? "#capstone-name" : !emailValid ? "#capstone-email" : !classValid ? "#capstone-class" : "#capstone-consent";
      $(target).focus();
      return;
    }
    $("#capstone-result").text(name + " memilih " + $("#capstone-class").val() + ". Format valid; data tidak dikirim.");
  });
  $("#capstone-registration").on("reset", function () {
    $("#capstone-name, #capstone-email, #capstone-class").attr("aria-invalid", "false");
    $("#capstone-result").text("Form dikosongkan. Mulai lagi dari data diri.");
  });
});`,
    8: `$(function () {
  const capstonePeople = [
    { name: "Ayu", className: "Web A", interest: "Struktur HTML" },
    { name: "Bima", className: "Web A", interest: "Utility CSS" },
    { name: "Citra", className: "Web B", interest: "Layout responsif" },
    { name: "Dimas", className: "Web B", interest: "Grid" },
    { name: "Eka", className: "Web C", interest: "Komponen UI" },
    { name: "Fajar", className: "Web C", interest: "Interaksi" }
  ];
  $("#capstone-load").on("click", function () {
    const button = $(this).prop("disabled", true).attr("aria-busy", "true");
    const mode = $("#capstone-request-mode").val();
    const data = mode === "broken" ? "JSON rusak" : JSON.stringify(mode === "empty" ? [] : capstonePeople);
    $("#capstone-result").removeClass("text-red-700").text("Memuat direktori lokal…");
    $("#capstone-directory").empty();
    $.ajax({ url: "data:application/json," + encodeURIComponent(data), dataType: "json" })
      .done(function (people) {
        if (!people.length) {
          $("#capstone-result").text("Request berhasil, tetapi belum ada peserta.");
          return;
        }
        people.forEach(function (person) {
          const item = $("<li>").addClass("rounded-lg border border-slate-200 bg-white p-4");
          item.append($("<h4>").addClass("font-semibold").text(person.name));
          item.append($("<p>").addClass("mt-2 text-slate-600").text(person.className + " · " + person.interest));
          $("#capstone-directory").append(item);
        });
        $("#capstone-result").text(people.length + " peserta dimuat dari JSON demo.");
      })
      .fail(function () {
        $("#capstone-result").addClass("text-red-700").text("JSON tidak dapat dibaca. Pilih data valid dan coba kembali.");
      })
      .always(function () {
        button.prop("disabled", false).attr("aria-busy", "false");
      });
  });
});`
  };
  return scripts[number];
}

function buildGuidedCapstone(project, track, number) {
  const catalog = guidedCapstoneCases[track]?.[number - 1];
  if (!catalog || catalog.modules.length !== 3) throw new Error(`Proyek lengkap belum tersedia: ${track}/${number}`);
  // Tiga modul menyatukan alur inti, pekerjaan pendamping, dan review akhir.
  const config = catalog;
  const controls = capstoneControls(track, number);
  const script = track === 'jquery' ? capstoneJqueryScript(number) : capstoneNativeScript(controls.type);
  const html = `    <section id="capstone-project" class="mt-10" aria-labelledby="capstone-title">
      <header class="rounded-xl bg-emerald-800 p-6 text-white">
        <p class="text-sm font-semibold uppercase tracking-wide">Proyek halaman lengkap</p>
        <h2 id="capstone-title" class="mt-2 text-2xl font-bold">${capstoneEscape(project.title)} · versi pengembangan</h2>
        <p class="mt-4 max-w-3xl leading-relaxed">${capstoneEscape(config.brief)} Seluruh bagian di bawah menjadi bahan coding: ubah susunan, spacing, informasi, dan state tanpa melepas konteks halaman.</p>
        <p class="mt-3 text-sm">Pengguna halaman: ${capstoneEscape(config.audience)}. Semua nama dan status adalah data demo untuk praktikum.</p>
      </header>
      <nav aria-label="Bagian proyek lengkap" class="mt-5 rounded-xl bg-white p-5">
        <h3 class="font-semibold">Navigasi proyek</h3>
        <ul class="mt-3 ${track === 'tailwind' && number < 3 ? 'space-y-2' : 'flex flex-wrap gap-3'}">
${config.modules.map((module, index) => `          <li><a href="#capstone-module-${index + 1}" class="text-emerald-800 underline focus-visible:outline focus-visible:outline-2">${capstoneEscape(module.title)}</a></li>`).join('\n')}
          <li><a href="#capstone-tools" class="text-emerald-800 underline focus-visible:outline focus-visible:outline-2">${controls.type === 'static' ? 'Peninjauan hasil' : 'Kontrol proyek'}</a></li>
        </ul>
      </nav>
${config.modules.map((module, index) => `    <section id="capstone-module-${index + 1}" class="mt-8" aria-labelledby="capstone-module-title-${index + 1}">
      <header class="mb-5 rounded-lg bg-slate-100 p-4 ${track === 'tailwind' && number === 4 ? 'sticky top-0 z-10' : ''}">
        <p class="text-xs font-semibold uppercase tracking-wide text-slate-600">Modul ${index + 1} dari ${config.modules.length}</p>
        <h3 id="capstone-module-title-${index + 1}" class="mt-2 text-xl font-semibold">${capstoneEscape(module.title)}</h3>
        <p class="mt-3 leading-relaxed text-slate-600">Bagian ini mengelompokkan ${module.items.map((item) => capstoneEscape(item.toLowerCase())).join(', ')}. Informasi disusun untuk ${capstoneEscape(config.audience.toLowerCase())}; pertahankan hubungan antara judul, detail, dan status ketika mengedit layout.</p>
      </header>
      <div class="${capstoneGrid(track, number)}">
${module.items.map((_, itemIndex) => capstoneItem(config, project, track, number, index, itemIndex)).join('\n')}
      </div>
${track === 'tailwind' && (number === 13 || (number === 19 && index === 0)) ? capstoneTable(config, index) : ''}
    </section>`).join('\n')}
    <section id="capstone-tools" class="mt-8 rounded-xl border border-slate-200 bg-white p-6" aria-labelledby="capstone-tools-title">
      <h3 id="capstone-tools-title" class="text-xl font-semibold">${controls.type === 'static' ? 'Peninjauan hasil proyek' : 'Kontrol proyek lengkap'}</h3>
      <p class="mb-5 mt-3 text-slate-600">${controls.type === 'static' ? 'Tidak ada aksi yang diam-diam menyimpan data. Fokus halaman ini adalah penampilan dan susunan komponen.' : 'Uji tindakan pengguna dan perhatikan feedback. Kontrol hanya bekerja dalam halaman demo; tidak ada backend atau penyimpanan.'}</p>
${controls.html}
    </section>
    </section>`;
  return { html, script, config, css: track === 'tailwind' && number === 10 ? '.capstone-pattern { background-image: radial-gradient(circle, #d1fae5 2px, transparent 3px); }' : '', moduleCount: config.modules.length, itemCount: config.modules.length * 3 };
}
