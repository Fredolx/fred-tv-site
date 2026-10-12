(() => {
  "use strict";

  document.querySelectorAll("[data-gallery]").forEach((g) => {
    const imgs = g.querySelectorAll(".gallery__img");
    const thumbs = g.querySelectorAll(".gallery__thumb");
    thumbs.forEach((t) =>
      t.addEventListener("click", () => {
        const i = t.dataset.index;
        imgs.forEach((img) => img.classList.toggle("is-active", img.dataset.index === i));
        thumbs.forEach((x) => {
          const on = x === t;
          x.classList.toggle("is-active", on);
          x.setAttribute("aria-selected", on ? "true" : "false");
        });
      })
    );
  });

  document.querySelectorAll("[data-carousel]").forEach((c) => {
    const slides = [...c.querySelectorAll(".carousel__slide")];
    if (slides.length < 2) return;
    const dotsEl = c.querySelector("[data-carousel-dots]");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = 0;
    let timer = null;

    const dots = slides.map((_, i) => {
      const d = document.createElement("button");
      d.type = "button";
      d.className = "carousel__dot";
      d.setAttribute("aria-label", `Screenshot ${i + 1} of ${slides.length}`);
      d.addEventListener("click", () => { show(i); restart(); });
      dotsEl.append(d);
      return d;
    });

    const preload = (i) => {
      const img = slides[(i + slides.length) % slides.length].querySelector("img");
      if (img) img.loading = "eager";
    };

    const show = (i) => {
      current = (i + slides.length) % slides.length;
      preload(current);
      preload(current + 1);
      preload(current - 1);
      slides.forEach((s, j) => {
        const on = j === current;
        s.classList.toggle("is-active", on);
        s.setAttribute("aria-hidden", on ? "false" : "true");
      });
      dots.forEach((d, j) => d.setAttribute("aria-current", j === current ? "true" : "false"));
    };

    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => { if (!reduced && !timer) timer = setInterval(() => show(current + 1), 6000); };
    const restart = () => { stop(); start(); };

    c.querySelector("[data-carousel-prev]").addEventListener("click", () => { show(current - 1); restart(); });
    c.querySelector("[data-carousel-next]").addEventListener("click", () => { show(current + 1); restart(); });
    c.addEventListener("mouseenter", stop);
    c.addEventListener("mouseleave", start);
    c.addEventListener("focusin", stop);
    c.addEventListener("focusout", start);

    show(0);
    c.classList.add("is-ready");
    start();
  });
})();
