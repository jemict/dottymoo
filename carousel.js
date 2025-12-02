// Simple Dotty Moo carousel: one slide at a time, works on mobile + desktop
(function () {
  const carousels = document.querySelectorAll('.dm-carousel');
  if (!carousels.length) return;

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.dm-track');
    const slides = Array.from(carousel.querySelectorAll('.dm-slide'));
    const prevBtn = carousel.querySelector('.dm-prev');
    const nextBtn = carousel.querySelector('.dm-next');
    const dotsWrap = carousel.querySelector('.dm-dots');

    if (!track || slides.length <= 1) return;

    let index = 0;
    let slideWidth = 0;
    let gap = 0;
    const dots = [];

    function measure() {
      const first = slides[0];
      if (!first) return;

      const style = getComputedStyle(track);
      gap = parseFloat(style.columnGap || style.gap || '0') || 0;
      slideWidth = first.getBoundingClientRect().width + gap;

      applyTransform();
    }

    function applyTransform() {
      track.style.transform = `translateX(${-index * slideWidth}px)`;
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    }

    // Build dots
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        if (i === 0) dot.setAttribute('aria-current', 'true');
        dotsWrap.appendChild(dot);
        dots.push(dot);

        dot.addEventListener('click', () => {
          index = i;
          applyTransform();
        });
      });
    }

    // Prev / Next buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        applyTransform();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        applyTransform();
      });
    }

    window.addEventListener('resize', measure);

    // Initial layout
    measure();
  });
})();
