/* Layanan dan Proses kerja: klik membuka jendela detail (memakai #detailModal yang sama).
   Ubah isi penjelasan di objek SERVICES dan STEPS di bawah.
   Durasi dan rincian adalah contoh/perkiraan: sesuaikan dengan kondisi perusahaan. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ========== DATA ========== */
  const SERVICES = {
    1: { tag: "Layanan", title: "Strategi Bisnis", img: "img/services/1.svg",
      summary: "Analisis pasar, perumusan arah pertumbuhan, dan perencanaan kerja yang realistis agar setiap keputusan usaha didukung oleh data dan pertimbangan yang matang.",
      facts: [["Cocok untuk", "Pemilik usaha yang akan bertumbuh atau berekspansi"], ["Perkiraan durasi", "4–12 minggu"], ["Contoh karya", "Ekspansi Usaha Kuliner"]],
      doing: ["Riset pasar dan pesaing", "Menentukan arah dan prioritas pertumbuhan", "Model keuangan dan anggaran", "Rencana kerja bertahap dengan titik evaluasi"],
      results: ["Dokumen strategi yang siap dijalankan", "Urutan langkah dan anggaran yang terperinci", "Indikator untuk mengukur capaian"] },
    2: { tag: "Layanan", title: "Branding & Kreatif", img: "img/services/2.svg",
      summary: "Pengembangan identitas visual dan materi komunikasi agar bisnis mudah dikenali serta tampil konsisten di seluruh kanal.",
      facts: [["Cocok untuk", "Usaha yang identitas visualnya belum seragam atau memerlukan penyegaran"], ["Perkiraan durasi", "6–8 minggu"], ["Contoh karya", "Identitas Toko Retail"]],
      doing: ["Merumuskan karakter dan arah merek", "Logo, palet warna, dan tipografi", "Kemasan, papan nama, dan materi promosi", "Konten untuk media sosial"],
      results: ["Panduan identitas merek", "Berkas logo dan materi siap digunakan", "Tampilan yang seragam di seluruh kanal"] },
    3: { tag: "Layanan", title: "Pengembangan Digital", img: "img/services/3.svg",
      summary: "Perancangan website, aplikasi, dan sistem yang andal, cepat, mudah digunakan, serta dapat dikelola secara mandiri oleh tim Anda.",
      facts: [["Cocok untuk", "Usaha yang ingin hadir secara daring atau menata sistem internal"], ["Perkiraan durasi", "8–10 minggu"], ["Contoh karya", "Situs Perusahaan Properti"]],
      doing: ["Desain antarmuka dan alur pengguna", "Pengembangan website atau aplikasi", "Optimasi kecepatan dan SEO dasar", "Pelatihan singkat bagi tim Anda"],
      results: ["Produk digital yang siap diluncurkan", "Halaman yang cepat diakses melalui jaringan seluler", "Konten dapat diperbarui tanpa bantuan teknis"] },
    4: { tag: "Layanan", title: "Pendampingan", img: "img/services/4.svg",
      summary: "Evaluasi berkala agar hasil terus meningkat setelah peluncuran, sehingga manfaat proyek tidak berhenti saat pekerjaan selesai.",
      facts: [["Cocok untuk", "Klien yang menginginkan hasil kerja terus dipantau dan ditingkatkan"], ["Bentuk", "Evaluasi berkala"], ["Dimulai", "Setelah peluncuran"]],
      doing: ["Memantau hasil terhadap target", "Rapat evaluasi berkala", "Perbaikan dan penyesuaian lanjutan", "Rekomendasi langkah berikutnya"],
      results: ["Laporan hasil berkala", "Perbaikan berdasarkan data", "Rencana tahap berikutnya"] }
  };

  const STEPS = {
    1: { title: "Diskusi", time: "Minggu 1", img: "img/process/1.svg",
      summary: "Kami memulai dengan memahami kebutuhan Anda. Tujuan, kendala, dan anggaran Anda menjadi dasar bagi seluruh keputusan berikutnya.",
      doing: ["Pertemuan awal (daring atau tatap muka)", "Menggali tujuan, target, dan kendala", "Mempelajari kondisi usaha dan pesaing"],
      you: ["Menyampaikan tujuan dan gambaran anggaran", "Membagikan data atau materi yang sudah ada"],
      result: "Usulan kerja tertulis yang merangkum pemahaman kami atas kebutuhan Anda." },
    2: { title: "Rencana", time: "Minggu 1–2", img: "img/process/2.svg",
      summary: "Berdasarkan hasil konsultasi, kami menyusun rencana kerja yang jelas mencakup ruang lingkup pekerjaan, jadwal, dan biaya.",
      doing: ["Menyusun strategi dan ruang lingkup", "Membagi pekerjaan menjadi tahap", "Menghitung jadwal dan anggaran"],
      you: ["Meninjau dan menyetujui rencana", "Menunjuk satu orang sebagai penghubung"],
      result: "Rencana kerja, jadwal, dan rincian biaya tertulis sebelum proyek dimulai." },
    3: { title: "Eksekusi", time: "Inti proyek", img: "img/process/3.svg",
      summary: "Tim strategi, kreatif, dan digital bekerja bersama, disertai laporan progres agar Anda selalu mengetahui perkembangan pekerjaan.",
      doing: ["Pengerjaan sesuai tahap yang disepakati", "Laporan progres berkala", "Tinjauan dan revisi di setiap tahap"],
      you: ["Memberi masukan pada tiap tinjauan", "Menyetujui hasil tiap tahap"],
      result: "Hasil kerja di setiap tahap yang dapat Anda tinjau dan setujui sebelum melanjutkan ke tahap berikutnya." },
    4: { title: "Evaluasi", time: "Setelah peluncuran", img: "img/process/4.svg",
      summary: "Setelah pekerjaan selesai, kami mengukur hasil dan menentukan langkah lanjutan agar manfaatnya terus berkelanjutan.",
      doing: ["Membandingkan hasil dengan target", "Mencatat hal yang telah berhasil dan yang masih perlu ditingkatkan", "Menyusun rekomendasi tahap berikutnya"],
      you: ["Membagikan data hasil setelah peluncuran", "Menentukan apakah ingin lanjut pendampingan"],
      result: "Laporan evaluasi dan rencana perbaikan lanjutan." }
  };

  /* ========== TAMPILAN ========== */
  const list = (items) => `<ul class="detail-list">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

  const serviceHTML = (d) => `
    <div class="detail-cover detail-cover-project"><img src="${esc(d.img)}" alt="" loading="lazy" onerror="this.remove()"></div>
    <div class="detail-body">
      <p class="detail-tag">${esc(d.tag)}</p>
      <h3 class="detail-title" id="detailTitle">${esc(d.title)}</h3>
      <p class="detail-summary">${esc(d.summary)}</p>
      <dl class="facts">${d.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
      <h4 class="detail-sub">Yang kami kerjakan</h4>${list(d.doing)}
      <h4 class="detail-sub">Yang Anda dapatkan</h4>${list(d.results)}
      <div class="explain-actions">
        <a class="btn btn-brand" href="#contact" data-bs-dismiss="modal">Diskusikan layanan ini</a>
        <a class="btn btn-outline-brand" href="#portfolio" data-bs-dismiss="modal">Lihat karya</a>
      </div>
    </div>`;

  const stepHTML = (n, d) => `
    <div class="detail-cover"><img src="${esc(d.img)}" alt="" loading="lazy" onerror="this.remove()"></div>
    <div class="detail-body">
      <p class="detail-tag">Langkah ${n} dari 4 · ${esc(d.time)}</p>
      <h3 class="detail-title" id="detailTitle">${esc(d.title)}</h3>
      <p class="detail-summary">${esc(d.summary)}</p>
      <h4 class="detail-sub">Yang kami kerjakan</h4>${list(d.doing)}
      <h4 class="detail-sub">Peran Anda</h4>${list(d.you)}
      <h4 class="detail-sub">Hasil langkah ini</h4><p>${esc(d.result)}</p>
      <p class="explain-note">Waktu dan rincian bersifat perkiraan dan disesuaikan dengan cakupan proyek.</p>
      <div class="explain-actions">
        ${n > 1 ? `<button type="button" class="btn btn-copy" data-goto-step="${n - 1}">&larr; Langkah ${n - 1}</button>` : ""}
        ${n < 4 ? `<button type="button" class="btn btn-brand" data-goto-step="${n + 1}">Langkah ${n + 1} &rarr;</button>` : `<a class="btn btn-brand" href="#contact" data-bs-dismiss="modal">Mulai dari diskusi</a>`}
      </div>
    </div>`;

  const modalEl = $("#detailModal");
  const content = $("#detailContent");
  if (!modalEl || !content) return;
  const show = (html) => {
    if (!window.bootstrap) return;
    content.innerHTML = html;
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  };
  const openStep = (n) => { if (STEPS[n]) show(stepHTML(Number(n), STEPS[n])); };

  // Layanan: kartu bisa diklik dan dioperasikan dengan keyboard.
  $$(".service-card[data-service]").forEach((card) => {
    const d = SERVICES[card.dataset.service];
    if (!d) return;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", "Lihat detail layanan: " + d.title);
    const open = () => show(serviceHTML(d));
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });

  // Proses: klik di mana saja pada langkah (atau tombol "Lihat detail").
  $$(".process-list li[data-step]").forEach((li) => {
    li.addEventListener("click", () => openStep(li.dataset.step));
  });

  // Tombol Sebelumnya/Berikutnya di dalam jendela langkah.
  modalEl.addEventListener("click", (e) => {
    const b = e.target.closest("[data-goto-step]");
    if (b) openStep(b.dataset.gotoStep);
  });
})();
