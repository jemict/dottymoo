// Dotty Moo Carousel — transform based, reliable on mobile + desktop
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
    const lastIndex = slides.length - 1;
    const dots = [];

    /* ---------------------------
       UPDATE UI (arrows + dots)
    ----------------------------*/
    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;

      dots.forEach((dot, i) => {
        if (i === index) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    }

    /* ---------------------------
       BUILD DOTS
    ----------------------------*/
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        if (i === 0) dot.setAttribute('aria-current', 'true');
        dotsWrap.appendChild(dot);
        dots.push(dot);

        dot.addEventListener('click', () => {
          index = i;
          update();
        });
      });
    }

    /* ---------------------------
       ARROWS WITH LOOPING
    ----------------------------*/
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        index = (index === 0) ? lastIndex : index - 1;
        update();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        index = (index === lastIndex) ? 0 : index + 1;
        update();
      });
    }

    /* ---------------------------
       SWIPE SUPPORT
    ----------------------------*/
    let startX = null;

    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', e => {
      if (startX === null) return;
      const diff = e.changedTouches[0].clientX - startX;

      if (Math.abs(diff) > 40) {
        if (diff < 0) {
          index = (index === lastIndex) ? 0 : index + 1;
        } else {
          index = (index === 0) ? lastIndex : index - 1;
        }
        update();
      }

      startX = null;
    });

    /* ---------------------------
       INITIAL STATE
    ----------------------------*/
    update();
  });
})();
