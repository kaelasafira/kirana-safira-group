document.documentElement.classList.add("js");

// Gambar yang gagal dimuat: logo mitra diganti monogram berwarna, gambar lain disembunyikan
// (latar gradasi di belakangnya tetap tampil). "error" tidak bubbling, jadi memakai capture.
document.addEventListener("error", (e) => {
  const img = e.target;
  if (!img || img.tagName !== "IMG") return;
  if (img.dataset.ini) {
    const mark = document.createElement("i");
    mark.className = "logo-mark " + (img.classList.contains("logo-lg") ? "logo-lg" : "");
    mark.style.setProperty("--c", img.dataset.color || "#10283f");
    mark.textContent = img.dataset.ini;
    mark.setAttribute("role", "img");
    mark.setAttribute("aria-label", img.alt || "");
    if (!img.alt) mark.setAttribute("aria-hidden", "true");
    img.replaceWith(mark);
  } else if (!img.closest(".hero-visual")) {
    img.classList.add("img-failed");
  }
}, true);

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".site-navbar");
  const navCollapse = document.querySelector("#mainNavigation");
  const navLinks = document.querySelectorAll("#mainNavigation .nav-link, #mainNavigation .btn");

  // Tahun footer mengikuti tahun saat ini.
  const year = document.querySelector("#currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // Efek navbar saat halaman digulir.
  const updateNavbar = () => {
    if (navbar) navbar.classList.toggle("navbar-scrolled", window.scrollY > 20);
  };
  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  // Tutup menu HP setelah tautan dipilih.
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navCollapse && navCollapse.classList.contains("show") && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  // Animasi elemen saat masuk ke layar.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Formulir kontak: validasi, lalu kirim ke layanan formulir (data-endpoint) atau buka email.
  const form = document.querySelector("#contactForm");
  const status = document.querySelector("#formStatus");

  if (form && status) {
    const setStatus = (text, kind) => { status.className = "form-status" + (kind ? " is-" + kind : ""); status.textContent = text; };
    const submitBtn = form.querySelector('[type="submit"]');

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      setStatus("");

      // Kolom jebakan untuk bot: bila terisi, pura-pura sukses tanpa mengirim.
      if (form.elements.website && form.elements.website.value) { form.reset(); setStatus("Terima kasih.", "success"); return; }

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        const first = form.querySelector(":invalid");
        if (first) first.focus();
        setStatus("Periksa kembali kolom yang berwarna merah.", "error");
        return;
      }

      const data = Object.fromEntries(new FormData(form));
      delete data.website;
      const endpoint = (form.dataset.endpoint || "").trim();

      if (endpoint) {
        // Mode layanan formulir (Formspree, Getform, backend sendiri, dsb.).
        if (submitBtn) submitBtn.disabled = true;
        setStatus("Mengirim pesan…");
        try {
          const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) });
          if (!res.ok) throw new Error("HTTP " + res.status);
          form.reset();
          form.classList.remove("was-validated");
          form.dispatchEvent(new Event("reset"));
          setStatus("Terima kasih, pesan Anda sudah terkirim. Kami membalas dalam 1–2 hari kerja.", "success");
        } catch (err) {
          setStatus("Pesan belum terkirim. Periksa koneksi Anda lalu coba lagi.", "error");
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
        return;
      }

      // Tanpa server: siapkan email lewat aplikasi email pengunjung (jujur, tidak berpura-pura tersimpan).
      const to = form.dataset.mailto || "";
      const subject = encodeURIComponent("Pesan dari website: " + data.name);
      const body = encodeURIComponent(data.message + "\n\n— " + data.name + " (" + data.email + ")");
      setStatus("Membuka aplikasi email Anda. Tekan Kirim di sana untuk menyelesaikan pesan.", "success");
      window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;
    });
  }
});
