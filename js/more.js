/* Fitur tambahan: detail partner, detail portfolio, blog (slide artikel), profil perusahaan.
   Data (PARTNERS, PROJECTS, POSTS) sekarang ada di index.html (blok "DATA SITUS"),
   dibaca lewat window.SITE_DATA. File ini hanya berisi logika tampilan. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  // Escape teks agar data tidak merusak HTML.
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Bila foto gagal dimuat, gambar dibuang dan latar gradasi tetap tampil.
  const IMG = (src, alt) => `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.remove()">`;
  // Logo mitra: bila file SVG tidak ada, script.js menggantinya dengan monogram berwarna.
  const LOGO = (p, size, cls = "") =>
    `<img class="logo-img ${cls}" src="${esc(p.logo)}" alt="${cls ? "Logo " + esc(p.name) : ""}" width="${size}" height="${size}" data-ini="${esc(p.ini)}" data-color="${esc(p.color)}">`;

  const { PARTNERS = [], PROJECTS = {}, POSTS = [] } = window.SITE_DATA || {};
  if (!window.SITE_DATA) console.warn("more.js: window.SITE_DATA tidak ditemukan. Pastikan blok DATA ada di index.html sebelum more.js.");

  /* ========== MODAL DETAIL (partner dan portfolio) ========== */
  const modalEl = $("#detailModal");
  const content = $("#detailContent");
  if (!modalEl || !content) return;
  const showModal = (html) => {
    if (!window.bootstrap) return; // Bootstrap gagal dimuat: jangan error
    content.innerHTML = html;
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  };

  // Tombol di dalam jendela (mis. "Diskusikan kerja sama"): tutup dulu, lalu gulir ke tujuan.
  let pendingHash = null;
  modalEl.addEventListener("click", (e) => {
    const a = e.target.closest('a[data-bs-dismiss][href^="#"]');
    if (!a) return;
    e.preventDefault();
    pendingHash = a.getAttribute("href");
    bootstrap.Modal.getOrCreateInstance(modalEl).hide();
  });
  modalEl.addEventListener("hidden.bs.modal", () => {
    if (!pendingHash) return;
    const target = document.querySelector(pendingHash);
    pendingHash = null;
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });

  const partnerHTML = (p) => `
    <div class="detail-cover">${IMG(p.img, "Kantor " + p.name)}</div>
    <div class="detail-body">
      <div class="detail-head">
        ${LOGO(p, 72, "logo-lg")}
        <div><h3 class="detail-title" id="detailTitle">${esc(p.name)}</h3><p class="detail-tag">${esc(p.sector)}</p></div>
      </div>
      <p>${esc(p.about)}</p>
      <dl class="facts">
        <div><dt>Bermitra sejak</dt><dd>${esc(p.since)}</dd></div>
        <div><dt>Lokasi</dt><dd>${esc(p.city)}</dd></div>
        <div><dt>Bidang</dt><dd>${esc(p.sector)}</dd></div>
      </dl>
      <h4 class="detail-sub">Yang dikerjakan bersama</h4>
      <ul class="detail-list">${p.work.map((w) => `<li>${esc(w)}</li>`).join("")}</ul>
      <a class="btn btn-brand" href="#contact" data-bs-dismiss="modal">Diskusikan kerja sama</a>
    </div>`;

  const projectHTML = (p) => `
    <div class="detail-cover detail-cover-project">${IMG(p.img, p.title)}</div>
    <div class="detail-body">
      <p class="detail-tag">${esc(p.cat)}</p>
      <h3 class="detail-title" id="detailTitle">${esc(p.title)}</h3>
      <p class="detail-summary">${esc(p.summary)}</p>
      <dl class="facts">
        <div><dt>Klien</dt><dd>${esc(p.client)}</dd></div>
        <div><dt>Tahun</dt><dd>${esc(p.year)}</dd></div>
        <div><dt>Durasi</dt><dd>${esc(p.duration)}</dd></div>
        <div><dt>Layanan</dt><dd>${esc(p.services)}</dd></div>
      </dl>
      <h4 class="detail-sub">Tantangan</h4><p>${esc(p.challenge)}</p>
      <h4 class="detail-sub">Solusi</h4><p>${esc(p.solution)}</p>
      <h4 class="detail-sub">Hasil</h4>
      <ul class="detail-list">${p.results.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
      <a class="btn btn-brand" href="#contact" data-bs-dismiss="modal">Diskusikan proyek serupa</a>
    </div>`;

  const openPartner = (id) => { const p = PARTNERS.find((x) => x.id === id); if (p) showModal(partnerHTML(p)); };

  // Partner: kisi di bagian Partner dan daftar di bagian Profil.
  const grid = $("#partnerGrid");
  if (grid) {
    grid.innerHTML = PARTNERS.map((p) => `
      <button type="button" class="partner-btn" data-partner="${esc(p.id)}" aria-haspopup="dialog">
        ${LOGO(p, 56)}
        <b>${esc(p.name)}</b><small>${esc(p.sector)}</small>
      </button>`).join("");
  }
  const list = $("#partnerList");
  if (list) {
    list.innerHTML = PARTNERS.map((p) => `
      <li><button type="button" class="partner-row" data-partner="${esc(p.id)}" aria-haspopup="dialog">
        ${LOGO(p, 56)}
        <span class="partner-row-text"><b>${esc(p.name)}</b><small>${esc(p.sector)}, sejak ${esc(p.since)}</small><em>${esc(p.work[0])}</em></span>
      </button></li>`).join("");
  }
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-partner]");
    if (btn) openPartner(btn.dataset.partner);
  });

  // Portfolio: kartu bisa diklik dan dioperasikan dengan keyboard.
  $$(".portfolio-card[data-project]").forEach((card) => {
    const p = PROJECTS[card.dataset.project];
    if (!p) return;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", "Lihat detail: " + p.title);
    const open = () => showModal(projectHTML(p));
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
  });

  /* ========== BLOG: kartu + panel slide artikel ========== */
  const blogGrid = $("#blogGrid");
  const blogFilter = $("#blogFilter");
  const renderBlog = (cat = "Semua") => {
    if (!blogGrid) return;
    const items = POSTS.filter((p) => cat === "Semua" || p.cat === cat);
    blogGrid.innerHTML = items.length ? items.map((p) => `
      <div class="col-md-6 col-lg-4">
        <article class="blog-card position-relative">
          <div class="blog-cover">${IMG(p.img, "")}</div>
          <div class="blog-info">
            <p class="blog-meta"><span class="blog-cat">${esc(p.cat)}</span><time>${esc(p.date)}</time><span>${esc(p.read)}</span></p>
            <h3><a class="stretched-link" href="#artikel-${esc(p.slug)}">${esc(p.title)}</a></h3>
            <p>${esc(p.excerpt)}</p>
            <span class="blog-more" aria-hidden="true">Baca artikel &rarr;</span>
          </div>
        </article>
      </div>`).join("") : `<p class="text-muted-brand">Belum ada artikel di kategori ini.</p>`;
  };
  if (blogFilter && POSTS.length) {
    const cats = ["Semua", ...new Set(POSTS.map((p) => p.cat))];
    blogFilter.innerHTML = cats.map((c, i) => `<button type="button" class="chip${i ? "" : " is-on"}" data-cat="${esc(c)}" aria-pressed="${i ? "false" : "true"}">${esc(c)}</button>`).join("");
    blogFilter.addEventListener("click", (e) => {
      const b = e.target.closest("[data-cat]");
      if (!b) return;
      $$(".chip", blogFilter).forEach((x) => { const on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on); });
      renderBlog(b.dataset.cat);
    });
  }
  renderBlog();

  const panel = $("#articlePanel");
  const article = $("#articleContent");
  let lastFocus = null;
  // Saat artikel terbuka, isi halaman di belakangnya tidak bisa difokus keyboard.
  const setBackgroundInert = (on) =>
    $$(".site-navbar, main, .site-footer, #backToTop").forEach((el) => { el.inert = on; });

  const blocks = (body) => body.map((b) =>
    typeof b === "string" ? `<p>${esc(b)}</p>`
      : b.h ? `<h2>${esc(b.h)}</h2>`
      : `<ul>${b.ul.map((li) => `<li>${esc(li)}</li>`).join("")}</ul>`).join("");

  const openPost = (slug) => {
    const i = POSTS.findIndex((p) => p.slug === slug);
    if (i < 0 || !panel) return;
    const p = POSTS[i], prev = POSTS[i - 1], next = POSTS[i + 1];
    article.innerHTML = `
      <div class="article-cover">${IMG(p.img, "")}</div>
      <div class="article-wrap">
        <p class="blog-meta"><span class="blog-cat">${esc(p.cat)}</span><time>${p.date}</time><span>${p.read}</span></p>
        <h1 id="articleTitle">${esc(p.title)}</h1>
        <div class="article-body">${blocks(p.body)}</div>
        <nav class="article-nav" aria-label="Artikel lainnya">
          ${prev ? `<a href="#artikel-${esc(prev.slug)}"><small>&larr; Sebelumnya</small>${esc(prev.title)}</a>` : "<span></span>"}
          ${next ? `<a href="#artikel-${esc(next.slug)}" class="is-next"><small>Berikutnya &rarr;</small>${esc(next.title)}</a>` : "<span></span>"}
        </nav>
      </div>`;
    if (!panel.classList.contains("is-open")) lastFocus = document.activeElement;
    panel.classList.add("is-open");
    setBackgroundInert(true);
    panel.scrollTop = 0;
    document.body.classList.add("panel-open");
    $("#articleBack").focus({ preventScroll: true });
    document.title = p.title + " | Kirana Safira Group";
  };

  const closePost = () => {
    if (!panel || !panel.classList.contains("is-open")) return;
    panel.classList.remove("is-open");
    setBackgroundInert(false);
    document.body.classList.remove("panel-open");
    document.title = "Kirana Safira Group | Dream. Collaborate. Grow.";
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  };

  // Alamat #artikel-... membuka panel; tombol Kembali di browser juga menutupnya.
  const route = () => {
    const m = location.hash.match(/^#artikel-(.+)$/);
    if (m) openPost(m[1]); else closePost();
  };
  window.addEventListener("hashchange", route);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel && panel.classList.contains("is-open")) location.hash = "#blog";
  });
  route();

  /* ========== Status jam operasional (WIB) ========== */
  const badge = $("#openBadge");
  if (badge) {
    const wib = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    const d = wib.getDay(), t = wib.getHours() + wib.getMinutes() / 60;
    const open = (d >= 1 && d <= 5 && t >= 8.5 && t < 17) || (d === 6 && t >= 9 && t < 13);
    badge.textContent = open ? "Buka sekarang" : "Tutup sekarang";
    badge.classList.add(open ? "is-open" : "is-closed");
  }
})();
