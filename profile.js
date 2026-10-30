/* Profil perusahaan: setiap item yang diklik membuka jendela berisi penjelasan.
   Ubah isi penjelasan di objek INFO di bawah. Memakai jendela #detailModal yang sama dengan partner/portfolio. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const EMAIL = "info@kiranasafira.co.id";
  const PHONE_TEXT = "+62 815 8513 1017";
  const PHONE_LINK = "+6281585131017";
  const WA_LINK = "https://wa.me/6281585131017";

  /* ========== DATA PENJELASAN ========== */
  // icon: simbol di kiri judul | tag: label kecil | title: judul | text: daftar paragraf
  // facts: [[label, nilai]] (opsional) | points: daftar poin (opsional)
  // actions: tombol di bawah. { label, href, dismiss?: true, primary?: true, copy?: "teks" }
  const INFO = {
    logo: {
      icon: "KS", tag: "Identitas", title: "Logo dan slogan kami",
      text: [
        "Lingkaran biru tua melambangkan keteguhan dan kepercayaan, sedangkan bintang emas di atas huruf KS melambangkan arah dan harapan yang ingin kami wujudkan bersama klien.",
        "Slogan “Dream. Collaborate. Grow.” adalah urutan kerja kami: berani bermimpi, bekerja bersama, lalu bertumbuh."
      ],
      points: ["Dream: memulai dari tujuan dan ide klien", "Collaborate: strategi, desain, dan teknologi dikerjakan satu tim", "Grow: hasil diukur dan terus ditingkatkan"],
      actions: [{ label: "Kenali kami lebih jauh", href: "#about", dismiss: true, primary: true }]
    },
    intro: {
      icon: "★", tag: "Tentang kami", title: "Perjalanan Kirana Safira Group",
      text: [
        "Kami memulai sebagai tim konsultan beranggotakan tiga orang yang membantu pemilik usaha menyusun strategi. Seiring berkembangnya kebutuhan klien, kami menambah layanan branding dan pengembangan digital.",
        "Kini Kirana Safira Group melayani berbagai bisnis agar strategi, identitas merek, dan sistem digitalnya berjalan selaras."
      ],
      facts: [["Berdiri", "2014"], ["Awal tim", "3 orang"], ["Lini layanan", "3"]],
      actions: [{ label: "Lihat layanan", href: "#services", dismiss: true, primary: true }, { label: "Lihat karya", href: "#portfolio", dismiss: true }]
    },

    y2014: {
      icon: "2014", tag: "Perjalanan", title: "2014: Awal berdiri",
      text: ["Kirana Safira berdiri sebagai konsultan strategi usaha dengan fokus membantu pemilik usaha menentukan arah, target, dan langkah kerja yang realistis."],
      facts: [["Tanggal", "14 Maret 2014"], ["Bentuk", "Konsultan strategi"], ["Tim", "3 orang"]]
    },
    y2017: {
      icon: "2017", tag: "Perjalanan", title: "2017: Branding dan kreatif",
      text: ["Seiring meningkatnya kebutuhan klien akan merek yang tampil konsisten, kami menambah layanan branding dan kreatif yang mencakup identitas visual, kemasan, dan konten."],
      points: ["Identitas visual dan logo", "Kemasan dan materi promosi", "Konten untuk media sosial"]
    },
    y2020: {
      icon: "2020", tag: "Perjalanan", title: "2020: Divisi pengembangan digital",
      text: ["Kami membuka divisi pengembangan digital agar klien dapat memperoleh website, aplikasi, dan sistem pendukung usaha dari satu mitra yang sama."],
      points: ["Website perusahaan dan katalog", "Aplikasi dan sistem internal", "Perbaikan kecepatan dan pengalaman pengguna"]
    },
    y2023: {
      icon: "2023", tag: "Perjalanan", title: "2023: Kirana Safira Group",
      text: ["Tiga lini layanan, yaitu strategi, branding, dan digital, dipersatukan di bawah Kirana Safira Group agar klien dilayani oleh satu tim yang bekerja searah."],
      facts: [["Lini 1", "Strategi"], ["Lini 2", "Branding"], ["Lini 3", "Digital"]],
      actions: [{ label: "Lihat layanan", href: "#services", dismiss: true, primary: true }]
    },

    founded: {
      icon: "📅", tag: "Data perusahaan", title: "Tahun berdiri",
      text: ["Kirana Safira berdiri pada 14 Maret 2014. Tanggal ini juga tercantum pada data terstruktur website untuk mesin pencari."],
      facts: [["Tanggal berdiri", "14 Maret 2014"]]
    },
    hq: {
      icon: "📍", tag: "Data perusahaan", title: "Kantor pusat",
      text: ["Kantor pusat kami berada di Bantar Gebang, Kota Bekasi. Kunjungan dapat dilakukan pada jam operasional, dan kami menyarankan Anda membuat janji terlebih dahulu agar tim kami dapat menyambut Anda dengan baik."],
      facts: [["Alamat", "SMK Industri Kreatif, Gg. Barin"], ["Kecamatan", "Bantar Gebang"], ["Kota", "Kota Bekasi"]],
      actions: [
        { label: "Buka di Google Maps", href: "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("SMK Industri Kreatif, Gg. Barin, Bantar Gebang, Kota Bekasi"), primary: true, external: true },
        { label: "Salin alamat", copy: "SMK Industri Kreatif, Gg. Barin, Bantar Gebang, Kota Bekasi" }
      ]
    },
    field: {
      icon: "💡", tag: "Data perusahaan", title: "Bidang usaha",
      text: ["Kami bergerak di tiga bidang yang saling melengkapi, sehingga satu proyek bisa ditangani dari rencana sampai peluncuran."],
      points: ["Strategi: riset pasar, arah pertumbuhan, rencana kerja", "Branding: identitas visual dan konten kreatif", "Pengembangan digital: website, aplikasi, dan sistem"],
      actions: [{ label: "Lihat semua layanan", href: "#services", dismiss: true, primary: true }]
    },

    email: {
      icon: "✉", tag: "Hubungi kami", title: "Email",
      text: ["Cocok untuk pertanyaan yang butuh lampiran, seperti brief proyek atau dokumen penawaran. Kami membalas dalam 1–2 hari kerja."],
      facts: [["Alamat email", EMAIL], ["Waktu balasan", "1–2 hari kerja"]],
      actions: [{ label: "Kirim email", href: "mailto:" + EMAIL, primary: true }, { label: "Salin email", copy: EMAIL }]
    },
    phone: {
      icon: "☎", tag: "Hubungi kami", title: "Telepon",
      text: ["Cocok untuk pertanyaan singkat atau penjadwalan pertemuan. Silakan menghubungi kami pada jam operasional agar langsung tersambung dengan tim kami."],
      facts: [["Nomor", PHONE_TEXT], ["Jam telepon", "Sesuai jam operasional"]],
      actions: [{ label: "Telepon sekarang", href: "tel:" + PHONE_LINK, primary: true }, { label: "Chat WhatsApp", href: WA_LINK, external: true }, { label: "Salin nomor", copy: PHONE_TEXT }],
      note: "Di komputer, tombol telepon hanya berfungsi bila ada aplikasi panggilan terpasang."
    },
    message: {
      icon: "💬", tag: "Hubungi kami", title: "Pesan lewat formulir",
      text: ["Ceritakan kebutuhan Anda lewat formulir kontak di bagian bawah halaman. Isi nama, email, dan pesan minimal 10 karakter, lalu kami balas dalam 1–2 hari kerja."],
      actions: [{ label: "Buka formulir kontak", href: "#contact", dismiss: true, primary: true }]
    },

    weekday: {
      icon: "🕘", tag: "Jam operasional", title: "Senin – Jumat",
      text: ["Hari kerja reguler. Tim strategi, kreatif, dan digital tersedia untuk rapat, konsultasi, dan pertanyaan."],
      facts: [["Buka", "08.30 WIB"], ["Tutup", "17.00 WIB"]]
    },
    saturday: {
      icon: "🕘", tag: "Jam operasional", title: "Sabtu",
      text: ["Layanan setengah hari. Cocok untuk konsultasi awal atau kunjungan singkat. Rapat panjang sebaiknya dijadwalkan pada hari kerja."],
      facts: [["Buka", "09.00 WIB"], ["Tutup", "13.00 WIB"]]
    },
    sunday: {
      icon: "🚪", tag: "Jam operasional", title: "Minggu dan libur nasional",
      text: ["Kantor tutup. Pesan yang masuk lewat email atau formulir tetap kami terima dan dibalas pada hari kerja berikutnya."],
      actions: [{ label: "Kirim pesan", href: "#contact", dismiss: true, primary: true }]
    },
    timezone: {
      icon: "🌏", tag: "Jam operasional", title: "Waktu Indonesia Barat (WIB)",
      text: ["Semua jam operasional memakai WIB, yaitu UTC+7 (waktu Jakarta). Jika Anda berada di WITA, tambahkan 1 jam; di WIT, tambahkan 2 jam."],
      facts: [["WIB", "UTC+7"], ["WITA", "UTC+8"], ["WIT", "UTC+9"]]
    }
  };

  // Penjelasan status buka/tutup dibuat dari jam saat ini (WIB).
  const statusInfo = () => {
    const badge = $("#openBadge");
    const open = badge && badge.classList.contains("is-open");
    return {
      icon: open ? "🟢" : "🔴", tag: "Jam operasional", title: open ? "Kami sedang buka" : "Kami sedang tutup",
      text: [open
        ? "Berdasarkan waktu Jakarta saat ini, kantor kami sedang buka. Anda bisa menelepon atau datang sekarang."
        : "Berdasarkan waktu Jakarta saat ini, kantor kami sedang tutup. Silakan kirim pesan, dan kami balas pada jam operasional berikutnya."],
      actions: open
        ? [{ label: "Telepon sekarang", href: "tel:" + PHONE_LINK, primary: true }]
        : [{ label: "Kirim pesan", href: "#contact", dismiss: true, primary: true }]
    };
  };

  /* ========== TAMPILAN ========== */
  const render = (d) => {
    const facts = d.facts ? `<dl class="facts">${d.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : "";
    const points = d.points ? `<ul class="detail-list">${d.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : "";
    const actions = (d.actions || []).map((a) => {
      if (a.copy) return `<button type="button" class="btn btn-copy" data-copy="${esc(a.copy)}">${esc(a.label)}</button>`;
      const cls = a.primary ? "btn btn-brand" : "btn btn-outline-brand";
      const dis = a.dismiss ? ' data-bs-dismiss="modal"' : "";
      const ext = a.external ? ' target="_blank" rel="noopener"' : "";
      return `<a class="${cls}" href="${esc(a.href)}"${dis}${ext}>${esc(a.label)}</a>`;
    }).join("");
    return `
      <div class="explain-hero">
        <span class="explain-icon" aria-hidden="true">${esc(d.icon)}</span>
        <div><p class="detail-tag mb-1">${esc(d.tag)}</p><h3 class="detail-title mb-0" id="detailTitle">${esc(d.title)}</h3></div>
      </div>
      <div class="explain-body">
        ${d.text.map((t) => `<p>${esc(t)}</p>`).join("")}
        ${facts}${points}
        ${actions ? `<div class="explain-actions">${actions}</div>` : ""}
        ${d.note ? `<p class="explain-note">${esc(d.note)}</p>` : ""}
      </div>`;
  };

  const modalEl = $("#detailModal");
  const content = $("#detailContent");
  if (!modalEl || !content) return;

  // Klik item mana pun yang punya data-info.
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-info]");
    if (!btn || !window.bootstrap) return;
    const key = btn.dataset.info;
    const data = key === "status" ? statusInfo() : INFO[key];
    if (!data) return;
    content.innerHTML = render(data);
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  });

  // Tombol "Salin" di dalam jendela.
  modalEl.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    const original = b.textContent;
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      b.textContent = "Tersalin ✓";
    } catch (err) {
      b.textContent = "Salin manual dari teks di atas";
    }
    setTimeout(() => { b.textContent = original; }, 1800);
  });
})();
