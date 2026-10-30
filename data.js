/* DATA SITUS (contoh): ganti dengan data asli perusahaan Anda.
   Dibaca oleh more.js lewat window.SITE_DATA. File ini harus dimuat sebelum more.js.
   Gambar yang gagal dimuat otomatis diganti monogram/gradasi. */
{
/* ========== DATA ========== */
const PARTNERS = [
  { id: "mitra-nusantara", logo: "img/partners/mitra-nusantara.svg", name: "Mitra Nusantara", ini: "MN", color: "#1f4e79", sector: "Distribusi & Logistik", since: 2016, city: "Surabaya",
    img: "img/offices/mitra-nusantara.svg",
    about: "Perusahaan distribusi barang konsumsi dengan jaringan gudang di Jawa dan Bali. Bekerja sama dengan kami sejak 2016 untuk merapikan alur pengiriman dan sistem informasinya.",
    work: ["Sistem pelacakan pengiriman berbasis web", "Strategi ekspansi gudang ke Bali dan Nusa Tenggara"] },
  { id: "cipta-karsa", logo: "img/partners/cipta-karsa.svg", name: "Cipta Karsa", ini: "CK", color: "#8a6230", sector: "Properti & Konstruksi", since: 2017, city: "Jakarta",
    img: "img/offices/cipta-karsa.svg",
    about: "Pengembang properti hunian dan komersial. Kami mendampingi pembangunan citra merek dan kehadiran digitalnya.",
    work: ["Situs perusahaan dan katalog proyek properti", "Identitas visual untuk tiga kawasan hunian baru"] },
  { id: "samudra-digital", logo: "img/partners/samudra-digital.svg", name: "Samudra Digital", ini: "SD", color: "#2d5a63", sector: "Teknologi", since: 2018, city: "Bandung",
    img: "img/offices/samudra-digital.svg",
    about: "Perusahaan rintisan teknologi yang membuat aplikasi manajemen usaha untuk UMKM. Kami membantu positioning produk dan strategi peluncuran.",
    work: ["Strategi peluncuran produk dan penetapan harga", "Desain antarmuka aplikasi versi kedua"] },
  { id: "arunika-studio", logo: "img/partners/arunika-studio.svg", name: "Arunika Studio", ini: "AS", color: "#a24b5b", sector: "Studio Kreatif", since: 2019, city: "Yogyakarta",
    img: "img/offices/arunika-studio.svg",
    about: "Studio ilustrasi dan produksi konten. Kami bertukar keahlian: mereka mengisi kebutuhan visual, kami menyediakan strategi dan pengembangan digital.",
    work: ["Kolaborasi produksi konten kampanye klien bersama", "Pengembangan portofolio daring studio"] },
  { id: "bumi-rasa", logo: "img/partners/bumi-rasa.svg", name: "Bumi Rasa", ini: "BR", color: "#6b7d2c", sector: "Kuliner", since: 2020, city: "Jakarta",
    img: "img/offices/bumi-rasa.svg",
    about: "Jaringan restoran dan katering dengan bahan lokal. Kami mendampingi pembukaan cabang baru dan penataan merek.",
    work: ["Rencana ekspansi dari 3 ke 8 cabang", "Branding menu dan kemasan pesan-antar"] },
  { id: "lintas-daya", logo: "img/partners/lintas-daya.svg", name: "Lintas Daya", ini: "LD", color: "#b3731d", sector: "Energi", since: 2021, city: "Semarang",
    img: "img/offices/lintas-daya.svg",
    about: "Penyedia solusi panel surya untuk rumah dan usaha kecil. Kami membantu mereka menjelaskan produk teknis dengan bahasa yang mudah dipahami pelanggan.",
    work: ["Situs edukasi dan kalkulator penghematan listrik", "Materi penjualan untuk tim lapangan"] },
  { id: "sinar-edukasi", logo: "img/partners/sinar-edukasi.svg", name: "Sinar Edukasi", ini: "SE", color: "#5b3f8c", sector: "Pendidikan", since: 2022, city: "Malang",
    img: "img/offices/sinar-edukasi.svg",
    about: "Lembaga kursus dan pelatihan profesional. Kami membangun platform pendaftaran dan merapikan komunikasi dengan calon peserta.",
    work: ["Platform pendaftaran kelas dan pembayaran", "Strategi konten untuk media sosial"] },
  { id: "harapan-sehat", logo: "img/partners/harapan-sehat.svg", name: "Harapan Sehat", ini: "HS", color: "#177a6b", sector: "Kesehatan", since: 2023, city: "Medan",
    img: "img/offices/harapan-sehat.svg",
    about: "Jaringan klinik keluarga. Kami membantu menyederhanakan pengalaman pasien dari pendaftaran daring sampai pengingat kontrol.",
    work: ["Sistem janji temu daring untuk 5 klinik", "Penyegaran identitas dan papan petunjuk klinik"] }
];

const PROJECTS = {
  1: { cat: "Branding", title: "Identitas Toko Retail", img: "img/1.svg", client: "Toko Retail Keluarga", year: "2025", duration: "8 minggu", services: "Riset, logo, papan nama, kemasan",
    summary: "Penyegaran identitas toko keluarga agar tampil konsisten dari papan nama sampai tas belanja.",
    challenge: "Toko sudah dikenal warga sekitar, tetapi tampilannya tidak seragam dan sulit dibedakan dari toko lain di area yang sama.",
    solution: "Kami merumuskan karakter merek yang hangat dan rapi, lalu menurunkannya ke logo, palet warna, papan nama, tenda, dan tas belanja.",
    results: ["Seluruh titik sentuh toko memakai satu identitas", "Pelanggan baru lebih mudah mengenali toko dari jauh", "Panduan merek siap dipakai untuk cabang berikutnya"] },
  2: { cat: "Website", title: "Situs Perusahaan Properti", img: "img/2.svg", client: "Cipta Karsa", year: "2025", duration: "10 minggu", services: "Desain UI, pengembangan web, SEO dasar",
    summary: "Situs perusahaan yang menampilkan proyek, denah, dan formulir minat dalam satu alur sederhana.",
    challenge: "Calon pembeli harus menghubungi tim penjualan hanya untuk melihat unit yang tersedia, sehingga banyak yang berhenti di tengah jalan.",
    solution: "Kami membuat katalog proyek yang bisa disaring, halaman unit dengan denah, dan formulir minat yang langsung masuk ke tim penjualan.",
    results: ["Waktu muat halaman di bawah 2 detik pada jaringan seluler", "Pertanyaan masuk terkumpul rapi dalam satu kotak surat", "Tim penjualan memperbarui unit sendiri tanpa bantuan teknis"] },
  3: { cat: "Strategi", title: "Ekspansi Usaha Kuliner", img: "img/3.svg", client: "Bumi Rasa", year: "2024", duration: "12 minggu", services: "Riset pasar, model keuangan, rencana operasional",
    summary: "Rencana pertumbuhan dari tiga ke delapan cabang dengan urutan lokasi dan anggaran yang jelas.",
    challenge: "Pemilik ingin cepat berekspansi, tetapi belum tahu lokasi mana yang layak lebih dulu dan berapa modal yang aman.",
    solution: "Kami memetakan potensi tiap lokasi, menyusun model keuangan per cabang, dan membagi ekspansi menjadi tiga gelombang dengan titik evaluasi.",
    results: ["Urutan pembukaan cabang berdasarkan data, bukan perkiraan", "Anggaran per gelombang disetujui sebelum pembangunan", "Standar operasional tertulis untuk setiap cabang baru"] }
};

const POSTS = [
  { slug: "strategi-90-hari", cat: "Strategi", title: "Menyusun strategi bisnis 90 hari yang realistis", date: "12 September 2026", read: "5 menit baca",
    img: "img/blog/strategi-90-hari.svg",
    excerpt: "Rencana setahun sering usang di bulan ketiga. Rencana 90 hari lebih mudah dijalankan dan dievaluasi.",
    body: [
      "Rencana tahunan penting, tetapi pasar bergerak lebih cepat dari kalender. Karena itu kami membantu klien memecahnya menjadi blok 90 hari yang bisa diukur.",
      { h: "Mulai dari satu tujuan" },
      "Pilih satu tujuan utama untuk periode ini, misalnya menaikkan pesanan ulang atau membuka satu kanal penjualan baru. Tujuan yang banyak membuat tim bekerja setengah-setengah.",
      { h: "Pecah menjadi langkah mingguan" },
      { ul: ["Tentukan 3 hasil kunci yang bisa dihitung", "Tetapkan satu penanggung jawab untuk tiap hasil", "Tinjau progres setiap minggu selama 30 menit"] },
      { h: "Evaluasi di hari ke-90" },
      "Bandingkan hasil dengan target, catat apa yang berhasil dan tidak, lalu gunakan itu untuk menyusun 90 hari berikutnya. Dari siklus inilah strategi tahunan terbentuk, bukan sebaliknya."
    ] },
  { slug: "branding-umkm", cat: "Branding", title: "Branding untuk UMKM: mulai dari mana?", date: "28 Agustus 2026", read: "4 menit baca",
    img: "img/blog/branding-umkm.svg",
    excerpt: "Branding bukan hanya logo. Tiga hal ini perlu beres lebih dulu sebelum Anda memesan desain.",
    body: [
      "Banyak pemilik usaha langsung memesan logo. Hasilnya bagus, tetapi sering tidak terpakai karena arah mereknya belum jelas.",
      { h: "Tiga hal yang perlu jelas" },
      { ul: ["Untuk siapa produk Anda dibuat", "Apa yang membedakan Anda dari pesaing terdekat", "Bagaimana Anda ingin dikenal: ramah, premium, atau praktis"] },
      { h: "Baru kemudian visual" },
      "Setelah tiga hal itu terjawab, logo, warna, dan kemasan punya dasar pertimbangan. Desainer pun bisa bekerja lebih cepat karena revisinya mengarah.",
      "Terakhir, tulis panduan satu halaman berisi logo, warna, huruf, dan gaya bahasa. Dokumen sederhana ini menjaga tampilan tetap konsisten saat tim bertambah."
    ] },
  { slug: "website-cepat", cat: "Digital", title: "Mengapa website yang cepat membantu penjualan", date: "10 Agustus 2026", read: "4 menit baca",
    img: "img/blog/website-cepat.svg",
    excerpt: "Pengunjung tidak menunggu. Kecepatan halaman memengaruhi apakah mereka bertahan atau pergi.",
    body: [
      "Sebagian besar pengunjung membuka website dari ponsel dengan sinyal yang berubah-ubah. Halaman yang lambat membuat mereka pergi sebelum membaca apa pun.",
      { h: "Penyebab paling sering" },
      { ul: ["Gambar berukuran besar yang tidak dikompres", "Terlalu banyak skrip pihak ketiga", "Font dan animasi yang berlebihan"] },
      { h: "Perbaikan yang cepat dilakukan" },
      "Kompres gambar dan muat gambar di bawah layar belakangan, hapus skrip yang tidak dipakai, dan batasi variasi huruf. Tiga langkah ini biasanya sudah terasa dampaknya.",
      "Ukur dulu sebelum dan sesudah perbaikan agar Anda tahu langkah mana yang paling berpengaruh."
    ] }
];

window.SITE_DATA = { PARTNERS, PROJECTS, POSTS };
}
