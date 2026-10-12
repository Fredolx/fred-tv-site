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
})();
