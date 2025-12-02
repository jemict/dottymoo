// Dotty Moo carousel – simple, pixel-perfect, loops correctly on mobile & desktop
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
    const dots = [];

    // ----- sizing -----
    function setWidths() {
      const width = carousel.clientWidth; // inner width of the carousel card
      track.style.width = (width * slides.length) + 'px';

      slides.forEach(slide => {
        slide.style.width = width + 'px';
        slide.style.flex = '0 0 ' + width + 'px';
      });

      // keep current slide centred after resize
      track.style.transform = `translateX(${-index * width}px)`;
    }

    // ----- dots -----
    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        if (i === 0) dot.setAttribute('aria-current', 'true');
        dotsWrap.appendChild(dot);
        dots.push(dot);

        dot.addEventListener('click', () => goTo(i));
      });
    }

    function updateDots() {
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    }

    // ----- movement -----
    function goTo(target) {
      const width = carousel.clientWidth;
      // loop nicely
      if (target < 0) target = lastIndex;
      if (target > lastIndex) target = 0;

      index = target;
      track.style.transform = `translateX(${-index * width}px)`;
      updateDots();
    }

    // arrows
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goTo(index - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goTo(index + 1);
      });
    }

    // ----- swipe on touch -----
    let startX = null;
    let isDragging = false;

    track.addEventListener('touchstart', e => {
      if (!e.touches || !e.touches.length) return;
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    track.addEventListener('touchmove', e => {
      if (!isDragging || startX === null) return;
      // we let the browser do the actual drag/scroll visually;
      // we only care about deciding left/right on touchend
    }, { passive: true });

    track.addEventListener('touchend', e => {
      if (!isDragging || startX === null) return;
      const endX = (e.changedTouches && e.changedTouches[0].clientX) || startX;
      const deltaX = endX - startX;

      // simple threshold so tiny taps don’t move slides
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          goTo(index + 1); // swiped left, go forwards
        } else {
          goTo(index - 1); // swiped right, go backwards
        }
      }

      startX = null;
      isDragging = false;
    });

    // keep everything correct on resize / orientation change
    window.addEventListener('resize', setWidths);

    // initial setup
    setWidths();
    buildDots();
    updateDots();
  });
})();
