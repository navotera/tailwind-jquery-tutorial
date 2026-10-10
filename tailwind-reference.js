// Tabel khusus setiap halaman, bukan daftar utility umum yang diulang.
// Property menyebut sasaran CSS; keterangan menjelaskan nilai dan cara memakainya.
const tailwindPropertyReferences = {
  ...essentialTailwindReferences,
  "tw-framework": [
    ["padding", "p-4 · p-8", "Ruang di dalam kartu. p-4 memberi 1rem pada semua sisi; p-8 memberi 2rem."],
    ["background-color", "bg-blue-100", "Warna latar biru muda untuk membedakan kartu dari halaman."],
    ["color", "text-blue-800", "Warna tulisan biru gelap. Ini tidak mengubah warna latar."],
    ["border-radius", "rounded-lg · rounded-2xl", "Sudut kartu: rounded-lg 0.5rem, rounded-2xl 1rem. Bandingkan dengan border-radius pada CSS native."],
    ["max-width", "max-w-sm", "Batas kartu 24rem, setara 384px pada ukuran root 16px yang dipakai contoh."],
    ["font-size dan font-weight", "text-xl · font-semibold", "Judul 1.25rem dengan ketebalan 600, menggantikan aturan heading native."],
    ["margin-top", "mt-2 · mt-4", "Jarak atas 0.5rem pada deskripsi dan 1rem pada tombol."],
    ["background-color pada :hover", "hover:bg-blue-800", "Latar tombol berubah seperti aturan .native-button:hover."],
    ["outline pada :focus-visible", "focus-visible:outline-2 · focus-visible:outline-blue-700 · focus-visible:outline-offset-2", "Penanda fokus 2px dengan celah 2px, setara aturan fokus pada contoh native."]
  ],
  "tw-utility": [
    ["padding", "p-2 · p-4 · p-6", "Ruang dalam elemen: 0.5rem, 1rem, dan 1.5rem. Pilih berdasarkan ruang yang dibutuhkan isi."],
    ["font-weight", "font-normal · font-bold", "Ketebalan 400 atau 700. Tidak mengubah isi atau ukuran tulisan."],
    ["border-radius", "rounded-lg · rounded-full", "Lengkung sedang atau bentuk pil. Hasil rounded-full juga dipengaruhi ukuran kotak."],
    ["background-color pada :hover", "hover:bg-emerald-700", "Latar hanya berubah ketika pointer berada di atas elemen. Hover adalah kondisi, bukan property baru."]
  ],
  "tw-hello": [
    ["font-size dan line-height", "text-3xl · text-5xl", "text-3xl berukuran 1.875rem dengan tinggi baris 2.25rem; text-5xl berukuran 3rem dengan tinggi baris 1."],
    ["font-weight", "font-bold", "Ketebalan 700 agar judul lebih menonjol daripada isi."],
    ["color", "text-emerald-700 · text-violet-700", "Warna tulisan hijau atau ungu. Ganti palet tanpa mengganti ukuran font."],
    ["margin-top", "mt-3", "Jarak luar 0.75rem di atas paragraf supaya tidak menempel pada judul."],
    ["text-decoration-line", "underline", "Garis bawah pada tulisan. Bisa dipakai dalam percobaan penekanan judul."]
  ],
  "tw-install": [
    ["background-color", "bg-emerald-100 · bg-amber-100", "Latar hijau atau kuning muda. Jika warna muncul, runtime Tailwind sudah bekerja."],
    ["padding", "p-4 · p-6", "Ruang dalam elemen 1rem atau 1.5rem. Class baru menghasilkan aturan setelah Tailwind dimuat."],
    ["font-size", "text-2xl · text-3xl", "Ukuran heading 1.5rem atau 1.875rem; masing-masing juga memiliki tinggi baris bawaan."],
    ["font-weight", "font-bold", "Ketebalan 700. Tidak perlu menulis selector CSS khusus untuk heading."],
    ["border-radius", "rounded", "Lengkung sudut 0.25rem untuk kotak pesan contoh."]
  ],
  "tw-responsive": [
    ["display", "grid", "Mengaktifkan grid pada induk supaya anak dapat disusun dalam kolom."],
    ["grid-template-columns", "grid-cols-1", "Satu kolom sebagai aturan dasar, termasuk pada layar sempit."],
    ["@media (min-width: 640px)", "sm:grid-cols-2 · sm:grid-cols-3", "Mulai 640px, jumlah kolom menjadi dua atau tiga sesuai class yang dipilih."],
    ["@media (min-width: 768px)", "md:grid-cols-3 · md:grid-cols-4", "Mulai 768px, aturan md: menimpa jumlah kolom sebelumnya. Lebar yang dihitung adalah viewport iframe."],
    ["gap", "gap-3", "Jarak 0.75rem antarkartu, mendatar dan vertikal."]
  ],
  "tw-container": [
    ["width dan max-width", "container", "Lebar 100% dengan batas maksimum mengikuti breakpoint. Class ini tidak otomatis memusatkan kotak."],
    ["margin-left dan margin-right", "mx-auto", "Margin kiri-kanan auto membagi ruang tersisa sehingga pembungkus berada di tengah."],
    ["padding-left dan padding-right", "px-4", "Ruang 1rem di dua sisi dalam agar isi tidak menempel pada tepi."],
    ["max-width", "max-w-sm · max-w-lg", "Batas lebar 24rem atau 32rem. Gunakan untuk membuat isi lebih nyaman dibaca."],
    ["padding-top dan padding-bottom", "py-8", "Ruang vertikal 2rem di dalam pembungkus."]
  ],
  "tw-display": [
    ["display: block", "block", "Elemen mengambil satu baris dalam aliran normal; elemen berikutnya dimulai di bawah."],
    ["display: inline", "inline", "Elemen mengikuti aliran teks. Width dan height tidak berlaku seperti pada kotak biasa."],
    ["display: inline-block", "inline-block", "Tetap mengikuti aliran teks, tetapi dapat diberi width, height, dan padding sebagai kotak."],
    ["display: none", "hidden", "Elemen dan ruangnya hilang dari layout. Tag tetap ada di HTML."],
    ["width", "w-40", "Lebar 10rem pada contoh inline-block. Coba saat membandingkan bentuk kotak."]
  ],
  "tw-position": [
    ["position: relative", "relative", "Kotak tetap dalam aliran normal dan dapat menjadi acuan anak absolute."],
    ["position: absolute", "absolute", "Anak keluar dari aliran normal; letaknya mengacu ke ancestor terdekat yang diposisikan."],
    ["position: sticky", "sticky", "Elemen ikut menggulir lalu menempel pada batas yang ditentukan dalam area scrollnya."],
    ["position: fixed", "fixed", "Elemen menempel terhadap viewport iframe pada demo, bukan halaman aplikasi utama."],
    ["top, right, bottom, left", "top-2 · right-2 · bottom-2 · left-2", "Jarak 0.5rem dari sisi acuan. Ganti pasangan sisi untuk memindahkan badge."],
    ["top", "top-0", "Batas atas nol untuk header sticky. Sticky perlu batas sisi agar efek menempel terlihat."],
    ["bottom dan right", "bottom-4 · right-4", "Jarak 1rem dari bawah dan kanan untuk tombol fixed."]
  ],
  "tw-overflow": [
    ["overflow: auto", "overflow-auto", "Scroll tersedia ketika isi melampaui ukuran kotak. Cocok untuk panel data panjang."],
    ["overflow: scroll", "overflow-scroll", "Kotak menjadi area scroll; tampilan scrollbar bergantung browser dan sistem operasi."],
    ["overflow: hidden", "overflow-hidden", "Memotong tampilan isi yang melewati batas, tanpa menyediakan scrollbar pengguna."],
    ["overflow: visible", "overflow-visible", "Membiarkan isi keluar; dapat menutupi elemen di sekitarnya."],
    ["height", "h-24 · h-28 · h-48", "Tinggi 6rem, 7rem, atau 12rem. Batas tinggi membantu memperlihatkan kelebihan isi."]
  ],
  "tw-visibility": [
    ["visibility: hidden", "invisible", "Elemen tidak terlihat tetapi masih menyediakan ruang. Elemen C tidak mengisi tempat B."],
    ["visibility: visible", "visible", "Mengembalikan tampilan elemen yang memakai visibility hidden."],
    ["display: none", "hidden", "Berbeda dari invisible: ruang elemen ikut hilang, sehingga tetangga dapat bergeser."],
    ["opacity: 0", "opacity-0", "Tampilan transparan, tetapi ruang dan kemungkinan interaksinya tetap ada. Bukan pengganti invisible."]
  ],
  "tw-zindex": [
    ["z-index", "z-10 · z-20 · z-30", "Urutan lapisan 10, 20, atau 30. Dalam konteks lapisan yang sama, nilai lebih besar tampil di depan."],
    ["position", "relative · absolute", "Induk relative menjadi acuan dua kotak absolute yang saling bertumpuk."],
    ["left dan top", "left-16 · top-12", "Geser 4rem dari kiri dan 3rem dari atas agar area tumpang tindih terlihat."],
    ["isolation: isolate", "isolate", "Membuat konteks lapisan tersendiri. Angka z-index tidak selalu dapat dibandingkan melintasi konteks yang berbeda."]
  ],
  "tw-flex-direction": [
    ["display: flex", "flex", "Aktifkan flex pada induk agar arah serta pembagian ruang dapat diatur."],
    ["flex-direction: row", "flex-row", "Susun item mendatar pada arah tulisan bawaan contoh."],
    ["flex-direction: column", "flex-col", "Susun item ke bawah. Sumbu utama kini vertikal."],
    ["flex-direction: row-reverse", "flex-row-reverse", "Balik urutan visual baris tanpa mengubah urutan HTML."],
    ["flex-direction: column-reverse", "flex-col-reverse", "Balik urutan visual kolom. Fokus keyboard masih mengikuti dokumen."],
    ["gap", "gap-3", "Jarak 0.75rem antaranak flex, bukan ruang di tepi induk."]
  ],
  "tw-flex-wrap": [
    ["flex-wrap: wrap", "flex-wrap", "Item boleh turun ke baris berikutnya jika ruang tidak cukup."],
    ["flex-wrap: nowrap", "flex-nowrap", "Pertahankan satu baris. Item mungkin menyusut atau keluar dari pembungkus."],
    ["flex-shrink: 0", "shrink-0", "Jaga lebar item agar perbedaan wrap dan nowrap terlihat jelas."],
    ["width", "w-32", "Lebar item 8rem. Kebutuhan lebar menentukan kapan item perlu pindah baris."],
    ["max-width", "max-w-xs · max-w-lg", "Batas induk 20rem atau 32rem. Bandingkan jumlah item yang muat."],
    ["overflow-x: auto", "overflow-x-auto", "Berikan scroll mendatar untuk deretan nowrap yang melampaui lebar."]
  ],
  "tw-flex-sizing": [
    ["flex-grow: 1", "grow", "Ambil bagian dari ruang kosong. Dua item grow membagi ruang tambahan, bukan selalu memiliki lebar akhir sama."],
    ["flex-grow: 0", "grow-0", "Tidak ikut mengambil ruang tambahan."],
    ["flex-shrink: 1", "shrink", "Item boleh menyusut ketika total kebutuhan lebar terlalu besar."],
    ["flex-shrink: 0", "shrink-0", "Pertahankan ukuran item ketika induk sempit; item lain perlu mengalah atau isi keluar."],
    ["flex: 1 1 0%", "flex-1", "Boleh tumbuh dan menyusut dengan basis 0%. Ini lebih dari sekadar grow."],
    ["min-width: 0", "min-w-0", "Izinkan kotak menjadi lebih kecil daripada batas minimum berbasis isi, jika diperlukan."],
    ["width", "w-24 · w-48 · w-64", "Lebar 6rem, 12rem, atau 16rem untuk membandingkan kebutuhan item dengan ruang induk."]
  ],
  "tw-flex-order": [
    ["order", "order-1 · order-2 · order-3", "Angka 1, 2, 3 menentukan urutan visual item flex. Nilai lebih kecil didahulukan."],
    ["order: -9999", "order-first", "Pindahkan item ke awal secara visual tanpa memindahkan tag HTML."],
    ["order: 9999", "order-last", "Pindahkan item ke akhir secara visual."],
    ["order: 0", "order-none", "Kembalikan nilai order ke nol. Urutan baca dan fokus tidak berubah oleh order."]
  ],
  "tw-grid-template": [
    ["display: grid", "grid", "Aktifkan layout baris dan kolom pada induk."],
    ["grid-template-columns", "grid-cols-1 · grid-cols-2 · grid-cols-4", "Satu, dua, atau empat kolom sama besar, menggunakan repeat dengan minmax(0, 1fr)."],
    ["grid-template-rows", "grid-rows-1 · grid-rows-2", "Satu atau dua baris sama besar. Tinggi pembungkus membuat pembagiannya mudah terlihat."],
    ["grid-template-rows: 1fr 2fr", "grid-rows-[1fr_2fr]", "Baris kedua mengambil dua bagian ruang, baris pertama satu bagian."],
    ["height", "h-48 · h-64", "Tinggi induk 12rem atau 16rem untuk membandingkan ukuran baris."],
    ["gap", "gap-3", "Jarak 0.75rem antarpetak, tidak menambah ruang di tepi luar."]
  ],
  "tw-grid-span": [
    ["grid-column", "col-span-1 · col-span-2 · col-span-3", "Item memakai satu, dua, atau tiga kolom. Span menghitung petak yang ditempati."],
    ["grid-column-start", "col-start-1 · col-start-2", "Mulai dari garis pertama atau kedua. Tiga kolom memiliki empat garis batas."],
    ["grid-column-end", "col-end-3 · col-end-4", "Akhiri di garis ketiga atau keempat. Start 2 dan end 4 berarti memakai dua kolom."],
    ["grid-row-start", "row-start-1 · row-start-2", "Tentukan garis awal baris untuk menempatkan item."],
    ["grid-row", "row-span-2", "Item memanjang sepanjang dua baris."],
    ["grid-template-columns", "grid-cols-3", "Induk menyediakan tiga kolom yang menjadi acuan penempatan item."]
  ],
  "tw-grid-flow": [
    ["grid-auto-flow: row", "grid-flow-row", "Isi petak ke kanan dahulu, lalu lanjut ke baris berikutnya."],
    ["grid-auto-flow: column", "grid-flow-col", "Isi ke bawah dahulu, lalu lanjut ke kolom berikutnya."],
    ["grid-auto-flow: row dense", "grid-flow-row-dense", "Coba mengisi lubang dengan item berikutnya; urutan visual dapat berbeda dari HTML."],
    ["grid-template-rows", "grid-rows-2", "Sediakan dua baris agar arah column pada contoh dapat dibandingkan dengan row."]
  ],
  "tw-grid-gap": [
    ["gap", "gap-4", "Jarak 1rem di kedua arah antarpetak."],
    ["column-gap", "gap-x-2 · gap-x-8", "Jarak mendatar 0.5rem atau 2rem antarkolom."],
    ["row-gap", "gap-y-2 · gap-y-8", "Jarak vertikal 0.5rem atau 2rem antarbaris."],
    ["padding", "p-4", "Pembanding: padding memberi ruang di tepi dalam induk, bukan hanya antarpetak."]
  ],
  "tw-justify": [
    ["justify-content: flex-start", "justify-start", "Kumpulkan item pada awal sumbu utama."],
    ["justify-content: center", "justify-center", "Kumpulkan item di tengah sumbu utama."],
    ["justify-content: space-between", "justify-between", "Item ujung mendekati kedua batas; ruang tersisa dibagi di antaranya."],
    ["justify-content: space-evenly", "justify-evenly", "Jarak antaranak dan kedua ujung dibuat sama."],
    ["flex-direction", "flex-row · flex-col", "Menentukan sumbu utama: mendatar untuk row, vertikal untuk column."],
    ["height", "h-80", "Tinggi 20rem memberi ruang vertikal untuk percobaan justify pada flex-col."]
  ],
  "tw-align": [
    ["align-items: flex-start", "items-start", "Seluruh anak berada di awal sumbu silang."],
    ["align-items: center", "items-center", "Seluruh anak berada di tengah sumbu silang; vertikal pada flex-row contoh."],
    ["align-items: flex-end", "items-end", "Seluruh anak berada di ujung sumbu silang."],
    ["align-self: flex-start", "self-start", "Satu item menimpa aturan induk dan berada di awal."],
    ["align-self: center", "self-center", "Satu item berada di tengah tanpa mengubah saudaranya."],
    ["align-self: flex-end", "self-end", "Satu item berada di ujung, misalnya bawah pada flex-row."],
    ["align-content: space-between", "content-between", "Membagi ruang di antara beberapa baris flex yang membungkus; berbeda dari items untuk tiap anak."]
  ],
  "tw-place": [
    ["place-items", "place-items-start · place-items-center · place-items-end", "Atur setiap item di dalam petaknya pada dua sumbu sekaligus."],
    ["place-content", "place-content-start · place-content-center", "Atur posisi seluruh kumpulan track ketika ukurannya lebih kecil daripada induk."],
    ["place-self", "place-self-center · place-self-end", "Atur satu item saja, menimpa perataan bawaan induk."],
    ["grid-template-columns: 5rem 5rem", "grid-cols-[5rem_5rem]", "Dua kolom tetap untuk memperlihatkan ruang tersisa pada contoh place-content."],
    ["grid-auto-rows: 3rem", "auto-rows-[3rem]", "Tinggi baris tambahan 3rem pada contoh kumpulan track."]
  ],
  "tw-padding": [
    ["padding", "p-2 · p-4 · p-6", "Semua sisi dalam: 0.5rem, 1rem, atau 1.5rem. Latar elemen ikut mengisi ruang ini."],
    ["padding-left dan padding-right", "px-8 · px-12", "Ruang mendatar 2rem atau 3rem pada kedua sisi."],
    ["padding-top dan padding-bottom", "py-2 · py-4", "Ruang vertikal 0.5rem atau 1rem pada atas dan bawah."],
    ["padding-top", "pt-4", "Ruang 1rem di atas isi saja."],
    ["padding-bottom", "pb-4", "Ruang 1rem di bawah isi saja."]
  ],
  "tw-margin": [
    ["margin-top", "mt-2 · mt-8", "Jarak luar atas 0.5rem atau 2rem. Warna latar kotak tidak mengisi ruang ini."],
    ["margin-left dan margin-right", "mx-auto", "Bagikan ruang tersisa agar kotak dengan lebar tertentu terpusat."],
    ["margin", "m-4", "Jarak luar 1rem pada seluruh sisi elemen."],
    ["margin-top", "-mt-2", "Margin atas negatif 0.5rem untuk mendekatkan atau menumpuk elemen secara sengaja."],
    ["width", "w-48", "Lebar 12rem membuat pemusatan mx-auto terlihat jika induk lebih lebar."]
  ],
  "tw-space": [
    ["margin-top / margin-bottom antar-anak", "space-y-4 · space-y-8", "Tambahkan jarak 1rem atau 2rem antar-anak langsung yang tidak hidden; tidak menambah ruang di atas anak pertama."],
    ["margin-left / margin-right antar-anak", "space-x-4", "Tambahkan jarak mendatar 1rem. Berbeda dari padding pada tepi induk."],
    ["--tw-space-x-reverse / --tw-space-y-reverse", "space-x-reverse · space-y-reverse", "Variabel Tailwind membalik sisi margin yang dipakai, misalnya ketika arah flex memakai reverse."],
    ["gap", "gap-4", "Pembanding untuk flex/grid: jarak 1rem antar-item. Biasanya lebih sesuai untuk susunan yang membungkus."]
  ],
  "tw-size": [
    ["width: 50%", "w-1/2", "Setengah lebar induk, bukan setengah layar secara otomatis."],
    ["width: 75%", "w-3/4", "Tiga perempat lebar induk."],
    ["width: 100%", "w-full", "Penuhi lebar yang disediakan pembungkus."],
    ["height", "h-16 · h-24 · h-32", "Tinggi 4rem, 6rem, atau 8rem. Ini ukuran, bukan batas min/max."],
    ["width dan height", "size-20", "Lebar dan tinggi 5rem sekaligus, cocok untuk kotak persegi atau avatar."]
  ],
  "tw-minmax": [
    ["max-width", "max-w-xs · max-w-sm · max-w-lg", "Batas lebar 20rem, 24rem, atau 32rem. Kotak masih bisa lebih kecil jika induk sempit."],
    ["min-height", "min-h-24", "Tinggi minimum 6rem. Isi dapat membuat kotak lebih tinggi."],
    ["max-height", "max-h-24 · max-h-32 · max-h-40", "Batas tinggi 6rem, 8rem, atau 10rem. Padukan dengan overflow untuk mengakses isi panjang."],
    ["min-width", "min-w-0", "Izinkan lebar minimum nol, berguna jika isi panjang menahan penyusutan item flex."],
    ["width: 100%", "w-full", "Isi lebar tersedia hingga mencapai batas max-width."],
    ["overflow: auto", "overflow-auto", "Sediakan scroll ketika isi melampaui batas tinggi."]
  ],
  "tw-font": [
    ["font-family", "font-sans · font-serif · font-mono", "Pilih keluarga huruf untuk antarmuka, artikel, atau kode. Font akhirnya bergantung ketersediaan perangkat."],
    ["font-size dan line-height", "text-sm · text-base · text-xl · text-3xl · text-5xl", "Ukuran masing-masing 0.875rem, 1rem, 1.25rem, 1.875rem, dan 3rem; juga mengatur tinggi baris bawaan."],
    ["font-weight", "font-light · font-normal · font-semibold · font-bold", "Ketebalan 300, 400, 600, dan 700. Membuat penekanan tanpa mengganti ukuran."],
    ["line-height", "leading-tight · leading-relaxed · leading-loose", "Jarak baris 1.25, 1.625, atau 2 kali ukuran font. Uji pada paragraf beberapa baris."]
  ],
  "tw-text": [
    ["text-align", "text-left · text-center · text-right", "Perataan tulisan di dalam kotak, bukan posisi kotaknya di halaman."],
    ["color", "text-blue-700 · text-slate-500", "blue/slate adalah keluarga warna; 700/500 tonalitas, bukan ukuran atau persen. Pilihan 50, 100–900 per 100, dan 950; semakin besar semakin gelap dalam keluarga yang sama."],
    ["text-decoration-line", "underline · overline · line-through", "Garis di bawah, di atas, atau mencoret teks."],
    ["text-decoration-thickness", "decoration-2", "Ketebalan garis dekorasi 2px, bukan ketebalan huruf."],
    ["text-transform", "uppercase · lowercase · capitalize · normal-case", "Ubah tampilan huruf besar/kecil atau kembalikan aslinya. Isi teks HTML tidak diganti."]
  ],
  "tw-bg-color": [
    ["background-color", "bg-blue-500 · bg-emerald-500", "blue/emerald adalah keluarga warna; 500 tonalitas. Pilihan tema: 50, 100–900 per 100, dan 950. Angka kecil lebih terang, besar lebih gelap; bukan opacity atau piksel."],
    ["alpha pada background-color", "bg-blue-500/30 · bg-blue-500/70", "Warna latar dengan alpha 30% atau 70%. Tulisan dan anak tidak ikut dibuat transparan."],
    ["color", "text-white", "Warna teks putih untuk kontras pada latar gelap. Cek lagi jika latar diperlembut."],
    ["opacity", "opacity-30", "Pembanding: membuat seluruh kotak beserta isinya transparan, bukan hanya background."]
  ],
  "tw-bg-image": [
    ["background-image", "bg-[url('/gambar.svg')]", "Pasang gambar melalui utility dengan URL sendiri. Contoh demo memakai aturan .demo-image pada CSS agar SVG lokal mudah dibaca."],
    ["background-size: cover", "bg-cover", "Isi seluruh area latar; sebagian gambar dapat terpotong jika rasionya berbeda."],
    ["background-size: contain", "bg-contain", "Jaga seluruh gambar terlihat; mungkin menyisakan ruang kosong."],
    ["background-repeat: no-repeat", "bg-no-repeat", "Gambar ditampilkan sekali, bukan menjadi pola berulang."],
    ["height", "h-44", "Tinggi area 11rem. Gambar latar tidak otomatis menentukan tinggi elemen."]
  ],
  "tw-bg-position": [
    ["background-repeat", "bg-repeat · bg-no-repeat", "Ulangi pola atau tampilkan gambar sekali."],
    ["background-size", "bg-[length:40px_40px] · bg-[length:80px_80px]", "Ukuran gambar latar 40 × 40px atau 80 × 80px untuk mengatur ubin pola."],
    ["background-size", "bg-cover · bg-contain", "Cover menutup area dengan kemungkinan terpotong; contain menjaga gambar utuh."],
    ["background-position", "bg-left · bg-center · bg-right · bg-top", "Pilih posisi gambar dalam kotak. Lebih mudah dilihat pada gambar yang tampil sekali."]
  ],
  "tw-gradient": [
    ["background-image", "bg-gradient-to-r · bg-gradient-to-b", "Buat gradasi ke kanan atau ke bawah. Sintaks ini mengikuti Tailwind 3."],
    ["--tw-gradient-from / --tw-gradient-stops", "from-blue-600 · from-emerald-600", "Tentukan warna awal melalui variabel yang menyusun background-image gradasi."],
    ["--tw-gradient-stops", "via-violet-500", "Tambahkan warna perantara ke susunan gradasi. Hapus jika cukup memakai dua warna."],
    ["--tw-gradient-to", "to-rose-400 · to-cyan-400", "Tentukan warna ujung melalui variabel gradasi, bukan warna teks."],
    ["color", "text-white", "Pilih warna tulisan terpisah dari gradasi. Periksa keterbacaan di seluruh area."]
  ],
  "tw-radius": [
    ["border-radius: 0", "rounded-none", "Sudut tajam, tanpa lengkung."],
    ["border-radius", "rounded-lg · rounded-xl · rounded-2xl", "Lengkung 0.5rem, 0.75rem, atau 1rem."],
    ["border-radius: 9999px", "rounded-full", "Bentuk pil pada kotak panjang atau lingkaran pada kotak persegi."],
    ["width dan height", "w-20 · h-20", "Ukuran 5rem pada kedua arah agar rounded-full membentuk lingkaran."],
    ["overflow: hidden", "overflow-hidden", "Potong isi anak yang keluar dari sudut jika diperlukan, misalnya gambar kartu."]
  ],
  "tw-border-width": [
    ["border-width", "border · border-2 · border-4", "Garis semua sisi dengan tebal 1px, 2px, atau 4px."],
    ["border-left-width", "border-l-4", "Garis kiri 4px, cocok untuk penanda catatan."],
    ["border-bottom-width", "border-b-4 · border-b-8", "Garis bawah 4px atau 8px tanpa mengatur ketebalan sisi lain."],
    ["border-color", "border-blue-500 · border-emerald-500", "blue/emerald keluarga warna, 500 tonalitas; pilihan 50, 100–900 per 100, 950. Bukan 500px: border-2 mengatur ketebalan 2px secara terpisah."]
  ],
  "tw-border-style": [
    ["border-style: solid", "border-solid", "Garis penuh untuk batas biasa."],
    ["border-style: dashed", "border-dashed", "Garis putus-putus, misalnya penanda area unggah."],
    ["border-style: dotted", "border-dotted", "Garis berupa titik-titik."],
    ["border-color dengan alpha", "border-blue-500/40 · border-blue-500/100", "Intensitas warna garis 40% atau penuh. Tidak mengubah opacity tulisan."],
    ["border-width", "border-4", "Tebal 4px agar bentuk solid, dashed, dan dotted mudah dibandingkan."]
  ],
  "tw-divide-ring": [
    ["border-top-width / border-bottom-width antar-anak", "divide-y · divide-y-4", "Pemisah vertikal daftar menggunakan border anak. Tebalnya 1px atau 4px; tidak membingkai semua sisi tiap item."],
    ["border-color antar-anak", "divide-slate-300 · divide-blue-300", "Warna pemisah pada anak langsung. Class ditulis pada pembungkus daftar."],
    ["box-shadow untuk ring", "ring-2 · ring-4", "Garis luar 2px atau 4px yang tidak menambah ukuran layout seperti border."],
    ["--tw-ring-color pada box-shadow", "ring-emerald-500", "Warna garis luar melalui variabel ring Tailwind."],
    ["--tw-ring-offset-width pada box-shadow", "ring-offset-2", "Celah 2px antara elemen dan ring, dibuat melalui lapisan box-shadow."],
    ["ring pada :focus-visible", "focus-visible:ring-2", "Tampilkan ring pada fokus yang perlu terlihat, misalnya navigasi keyboard."]
  ],
  "tw-shadow": [
    ["box-shadow", "shadow-sm · shadow-lg · shadow-xl", "Bayangan kecil, sedang-besar, atau lebih besar untuk kedalaman visual. Setiap tingkat punya beberapa nilai bayangan."],
    ["box-shadow dengan inset", "shadow-inner", "Bayangan di dalam kotak, memberi kesan cekung."],
    ["box-shadow tanpa bayangan utama", "shadow-none", "Hilangkan bayangan kotak yang berasal dari utility shadow; ring terpisah dapat tetap ada."],
    ["--tw-shadow-color pada box-shadow", "shadow-emerald-500/30", "Warna hijau dengan alpha 30%, melengkapi ukuran shadow yang dipilih."]
  ],
  "tw-opacity": [
    ["opacity: 1", "opacity-100", "Kotak dan seluruh isinya tampil penuh."],
    ["opacity: 0.4", "opacity-40", "Kotak beserta tulisan dan anaknya memiliki opacity 40%."],
    ["opacity: 0", "opacity-0", "Tidak terlihat, tetapi ruang dan kemungkinan interaksi tetap ada."],
    ["alpha background-color", "bg-blue-700/40", "Pembanding: hanya warna latar yang memakai alpha 40%, tulisan tetap penuh."]
  ],
  "tw-filters": [
    ["filter: blur(...) sebagai salah satu komponen", "blur-sm · blur-md · blur-none", "Kabur 4px, 12px, atau nol. Utility filter disusun bersama melalui variabel Tailwind."],
    ["filter: brightness(...)", "brightness-75 · brightness-125", "Kecerahan 0.75 atau 1.25 kali normal. brightness-100 adalah keadaan normal."],
    ["filter: contrast(...)", "contrast-100 · contrast-150", "Kontras normal atau 1.5 kali normal; berbeda dari mengubah kecerahan."],
    ["filter: grayscale(...)", "grayscale · grayscale-0", "Hilangkan warna atau kembalikan warna aslinya."],
    ["filter: sepia(...)", "sepia", "Nuansa kecokelatan tanpa mengganti file sumber."],
    ["filter: saturate(...)", "saturate-0 · saturate-200", "Kejenuhan warna nol atau dua kali normal."],
    ["filter: hue-rotate(...)", "hue-rotate-90 · hue-rotate-180", "Geser hue 90 atau 180 derajat; tidak sama dengan brightness."]
  ],
  "tw-tables": [
    ["table-layout: auto", "table-auto", "Browser mempertimbangkan isi ketika menghitung lebar kolom."],
    ["table-layout: fixed", "table-fixed", "Layout kolom lebih tetap ketika lebar tabel ditentukan. Teks panjang perlu pengaturan pembungkusan."],
    ["border-collapse: collapse", "border-collapse", "Gabungkan garis sel yang bertemu menjadi satu."],
    ["border-collapse: separate", "border-separate", "Pertahankan garis tiap sel sehingga jarak antarsel bisa diatur."],
    ["border-spacing", "border-spacing-2", "Jarak 0.5rem antarsel; bekerja pada model separate."],
    ["width: 100%", "w-full", "Lebar tabel mengisi induknya dan membantu percobaan table-fixed."],
    ["overflow-wrap: break-word", "break-words", "Izinkan kata panjang membungkus supaya tidak melampaui sel."]
  ],
  "tw-transitions": [
    ["transition-property", "transition-colors · transition-transform", "Pilih perubahan warna atau transform yang dianimasikan, bukan semua property."],
    ["transition-duration", "duration-150 · duration-300 · duration-1000", "Waktu perubahan 150ms, 300ms, atau 1000ms. Berbeda dari jeda sebelum mulai."],
    ["transition-timing-function", "ease-linear · ease-in-out", "Kecepatan merata atau melambat di awal dan akhir; durasi bisa tetap sama."],
    ["transition-delay", "delay-150", "Tunggu 150ms sebelum perubahan dimulai."],
    ["background-color pada :hover", "hover:bg-rose-600", "Keadaan warna akhir ketika pointer berada pada tombol. Tanpa perubahan keadaan, transition tidak terlihat."],
    ["transition-property pada prefers-reduced-motion", "motion-reduce:transition-none", "Nonaktifkan transisi saat pengguna memilih pengurangan gerak."]
  ],
  "tw-animation": [
    ["animation", "animate-spin", "Putaran berulang satu detik per siklus dengan kecepatan linear, memakai keyframes spin."],
    ["animation", "animate-pulse", "Perubahan opacity berulang dua detik per siklus, memakai keyframes pulse."],
    ["animation", "animate-bounce", "Gerakan naik-turun berulang satu detik per siklus, memakai keyframes bounce."],
    ["animation: none", "animate-none", "Matikan animasi pada elemen."],
    ["animation pada prefers-reduced-motion", "motion-reduce:animate-none", "Matikan gerakan berulang jika pengguna meminta pengurangan gerak."]
  ],
  "tw-scale": [
    ["transform melalui variabel scale", "scale-95 · scale-100 · scale-110", "Ukuran visual 95%, 100%, atau 110% di dua arah. Ruang layout tetap memakai ukuran awal."],
    ["scale sumbu x pada transform", "scale-x-125", "Perbesar visual hanya mendatar menjadi 125%."],
    ["scale sumbu y pada transform", "scale-y-75", "Perkecil visual hanya vertikal menjadi 75%."],
    ["transform pada :hover", "hover:scale-110 · hover:scale-75", "Besar atau kecil hanya saat hover. Prefix tidak mengubah cara layout menyediakan ruang."],
    ["transition-property: transform", "transition-transform", "Haluskan perubahan skala ketika keadaan berubah."]
  ],
  "tw-rotate": [
    ["transform melalui variabel rotate", "rotate-6 · rotate-12 · rotate-45", "Putar visual 6°, 12°, atau 45° dari titik origin. Kotak dan isinya ikut berputar."],
    ["rotasi negatif pada transform", "-rotate-6 · -rotate-12", "Putar ke arah berlawanan, tanpa mengubah urutan atau ruang HTML."],
    ["rotasi nol pada transform", "rotate-0", "Kembalikan sudut rotasi ke nol."],
    ["transform-origin", "origin-center", "Titik putar di tengah. Ubah origin untuk membandingkan poros, bukan besarnya sudut."]
  ],
  "tw-translate": [
    ["translate x pada transform", "translate-x-8 · -translate-x-2", "Geser visual ke kanan 2rem atau ke kiri 0.5rem dalam contoh arah tulisan bawaan."],
    ["translate y pada transform", "translate-y-4 · -translate-y-2", "Geser visual ke bawah 1rem atau ke atas 0.5rem."],
    ["translate x relatif ukuran elemen", "translate-x-1/2", "Geser sebesar 50% lebar elemen itu sendiri, bukan lebar induk."],
    ["margin-left", "ml-8", "Pembanding: margin mengubah ruang luar dalam layout, sedangkan translate hanya memindahkan visual."]
  ],
  "tw-origin": [
    ["transform-origin: left", "origin-left", "Poros di tengah sisi kiri. Bagian kanan berayun ketika kotak diputar."],
    ["transform-origin: center", "origin-center", "Poros di tengah kotak."],
    ["transform-origin: top left", "origin-top-left", "Poros di sudut kiri atas."],
    ["transform-origin: bottom right", "origin-bottom-right", "Poros di sudut kanan bawah."],
    ["transform pada :hover", "hover:rotate-12", "Putar 12° saat hover agar pengaruh origin bisa diamati."]
  ],
  "tw-cursor": [
    ["cursor: pointer", "cursor-pointer", "Petunjuk visual bahwa elemen bisa diklik; tidak memasang handler klik."],
    ["cursor: not-allowed", "cursor-not-allowed", "Petunjuk larangan. Tombol tetap perlu disabled jika memang tidak boleh dipakai."],
    ["cursor: help", "cursor-help", "Petunjuk bahwa ada informasi bantuan."],
    ["cursor: wait", "cursor-wait", "Petunjuk bahwa proses sedang menunggu. Tidak menjalankan proses secara otomatis."],
    ["cursor: auto", "cursor-auto", "Biarkan browser memilih bentuk pointer sesuai konteks."]
  ],
  "tw-outline": [
    ["outline-style: solid", "outline", "Aktifkan garis outline yang berada di luar border dan tidak menambah ruang layout."],
    ["outline-width", "outline-2 · outline-4", "Tebal penanda 2px atau 4px."],
    ["outline-color", "outline-blue-600 · outline-emerald-600", "Warna garis fokus; pilih yang jelas terhadap latar."],
    ["outline-offset", "outline-offset-2 · outline-offset-4", "Jarak outline dari tepi elemen sebesar 2px atau 4px."],
    ["outline pada :focus-visible", "focus-visible:outline · focus-visible:outline-2", "Tampilkan penanda ketika fokus perlu terlihat, misalnya melalui Tab."]
  ],
  "tw-pointer": [
    ["pointer-events: none", "pointer-events-none", "Lapisan tidak menjadi target pointer; elemen di bawah dapat menerima hit-testing."],
    ["pointer-events: auto", "pointer-events-auto", "Kembalikan lapisan menjadi target pointer. Event masih dapat merambat ke induk."],
    ["position: absolute", "absolute", "Posisikan overlay di atas tombol relative pada contoh."],
    ["top, right, bottom, left: 0", "inset-0", "Overlay mengisi empat sisi acuannya. Ini bukan aturan pointer events."]
  ],
  "tw-resize-select": [
    ["resize: both", "resize", "Pengguna boleh mengubah ukuran ke dua arah jika elemen dan browser mendukungnya."],
    ["resize: vertical", "resize-y", "Hanya tinggi yang boleh diubah lewat pegangan resize."],
    ["resize: none", "resize-none", "Matikan pegangan resize pada textarea."],
    ["user-select: none", "select-none", "Batasi seleksi tulisan. Hindari untuk isi materi atau kode yang ingin disalin."],
    ["user-select: text", "select-text", "Izinkan pengguna memilih sebagian teks."],
    ["user-select: all", "select-all", "Teks dipilih sebagai satu kelompok saat diseleksi; perilaku detail bergantung browser."]
  ],
};

// Bagian yang punya fokus berbeda memakai baris terkait saja. Tabel 1.2 yang
// sudah rinci dipertahankan, tidak diganti oleh ringkasan halaman.
const tailwindSectionReferenceRows = {
  "tw-framework": { "css-biasa": [0, 1, 2, 3, 4, 5, 6, 7, 8], utility: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
  "tw-install": { cuplikan: [0, 1, 2, 3, 4], cdn: [0, 1, 2, 3, 4], dokumen: [1, 2, 3] },
  "tw-responsive": { dasar: [0, 1, 4], breakpoint: [0, 1, 2, 3, 4] },
  "tw-display": { aliran: [0, 1, 2, 4], hidden: [3] },
  "tw-position": { absolute: [0, 1, 4], sticky: [2, 5], fixed: [3, 6] },
  "tw-overflow": { scroll: [0, 1, 4], potong: [2, 3, 4] },
  "tw-flex-direction": { arah: [0, 1, 2, 5], reverse: [0, 3, 4, 5] },
  "tw-flex-wrap": { wrap: [0, 2, 3, 4], nowrap: [1, 2, 3, 5] },
  "tw-flex-sizing": { grow: [0, 1, 4], shrink: [2, 3, 5, 6] },
  "tw-grid-template": { kolom: [0, 1, 5], baris: [0, 2, 3, 4, 5] },
  "tw-grid-span": { span: [0, 5], garis: [1, 2, 3, 4, 5] },
  "tw-justify": { row: [0, 1, 2, 3, 4], column: [1, 2, 4, 5] },
  "tw-align": { kelompok: [0, 1, 2], "satu-item": [1, 3, 4, 5] },
  "tw-place": { items: [0], content: [1, 3, 4], self: [0, 2] },
  "tw-minmax": { lebar: [0, 4], tinggi: [1, 2, 5] },
  "tw-font": { keluarga: [0], ukuran: [1], ketebalan: [2], baris: [3] },
  "tw-text": { perataan: [0], "warna-dekorasi": [1, 2, 3], transform: [4] },
  "tw-bg-position": { repeat: [0, 1], size: [0, 2], position: [0, 1, 3] },
  "tw-divide-ring": { divide: [0, 1], ring: [2, 3, 4, 5] },
  "tw-filters": { blur: [0], "brightness-contrast": [1, 2], grayscale: [3], warna: [4, 5, 6] },
  "tw-tables": { layout: [0, 1, 5, 6], border: [2, 3, 4] },
  "tw-transitions": { duration: [0, 1, 4, 5], easing: [0, 2, 3, 5] },
  "tw-resize-select": { resize: [0, 1, 2], select: [3, 4, 5] }
};

reviewedLessons.filter((lesson) => lesson.sectionId === "tailwind").forEach((lesson) => {
  const rows = tailwindPropertyReferences[lesson.id];
  if (!rows?.length) throw new Error(`Tabel property belum tersedia untuk ${lesson.id}`);
  lesson.propertyRows = rows;
  (lesson.sections || []).forEach((section) => {
    if (section.rows?.length) return;
    const indexes = tailwindSectionReferenceRows[lesson.id]?.[section.id];
    if (!indexes?.length) throw new Error(`Tabel bagian belum tersedia untuk ${lesson.id}/${section.id}`);
    section.rows = indexes.map((index) => {
      if (!rows[index]) throw new Error(`Baris property tidak valid: ${lesson.id}/${section.id}/${index}`);
      return rows[index];
    });
  });
});
