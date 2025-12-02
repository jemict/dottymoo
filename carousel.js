// Dotty Moo carousel – pixel-based transform so each slide stays centred
(function () {
  const carousels = document.querySelectorAll('.dm-carousel');
  if (!carousels.length) return;

  carousels.forEach(carousel => {
    const track   = carousel.querySelector('.dm-track');
    const slides  = Array.from(carousel.querySelectorAll('.dm-slide'));
    const prevBtn = carousel.querySelector('.dm-prev');
    const nextBtn = carousel.querySelector('.dm-next');
    const dotsWrap = carousel.querySelector('.dm-dots');

    if (!track || slides.length <= 1) return;

    let index = 0;
    const lastIndex = slides.length - 1;

    // Build dots
    const dots = [];
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      slides.forEach((_, i) => {
        const dot = document.createElement("button");
        if (i === 0) dot.setAttribute("aria-current", "true");
        dotsWrap.appendChild(dot);
        dots.push(dot);

        dot.addEventListener("click", () => {
          index = i;
          update();
        });
      });
    }

    function getSlideWidth() {
      // width of the visible carousel area
      return carousel.getBoundingClientRect().width;
    }

    function update() {
      const slideWidth = getSlideWidth();
      track.style.transform = `translateX(-${index * slideWidth}px)`;

      dots.forEach((dot, i) => {
        dot.toggleAttribute("aria-current", i === index);
      });
    }

    // Arrows with looping
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        index = (index === 0 ? lastIndex : index - 1);
        update();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        index = (index === lastIndex ? 0 : index + 1);
        update();
      });
    }

    // Keep things correct on resize (desktop ↔ mobile etc.)
    window.addEventListener("resize", update);

    // Initial position
    update();
  });
})();
