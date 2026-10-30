document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector("#scrollProgress");
  const toTop = document.querySelector("#backToTop");

  // Progres gulir dan tombol kembali ke atas.
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    if (toTop) toTop.classList.toggle("is-shown", window.scrollY > 600);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toTop) {
    toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Menu aktif sesuai bagian yang sedang dilihat. Bagian tanpa menu (proses, FAQ, kontak) mengosongkan sorotan.
  const links = [...document.querySelectorAll("#mainNavigation .nav-link")];
  const sections = [...document.querySelectorAll("main > section[id]")];

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          const on = a.getAttribute("href") === `#${entry.target.id}`;
          a.classList.toggle("active", on);
          if (on) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  // Angka statistik menghitung naik saat terlihat.
  const counters = document.querySelectorAll("[data-count]");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const run = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = target + suffix; return; }
    const start = performance.now();
    const duration = 1600;
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => io.observe(c));
  } else {
    counters.forEach((c) => { c.textContent = c.dataset.count + (c.dataset.suffix || ""); });
  }

  // Penghitung karakter pada kolom pesan.
  const message = document.querySelector("#message");
  if (message) {
    const counter = document.createElement("span");
    counter.className = "char-count";
    counter.setAttribute("aria-hidden", "true");
    message.insertAdjacentElement("afterend", counter);
    const update = () => { counter.textContent = `${message.value.length} karakter (minimal 10)`; };
    update();
    message.addEventListener("input", update);
    message.form && message.form.addEventListener("reset", () => setTimeout(update));
  }
});
