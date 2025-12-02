// Scroll-based Dotty Moo carousel with reliable looping
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
    let isProgrammatic = false;
    let scrollTimeout = null;

    function getSlideWidth() {
      return carousel.getBoundingClientRect().width;
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

    function scrollToIndex(targetIndex) {
      const slideWidth = getSlideWidth();
      index = targetIndex;
      isProgrammatic = true;

      track.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });

      updateDots();

      // after scroll finishes, allow manual scroll updates again
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isProgrammatic = false;
      }, 450);
    }

    // Build dots
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        if (i === 0) dot.setAttribute('aria-current', 'true');
        dotsWrap.appendChild(dot);
        dots.push(dot);

        dot.addEventListener('click', () => scrollToIndex(i));
      });
    }

    // Arrow buttons (with looping)
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const next = (index === 0) ? lastIndex : index - 1;
        scrollToIndex(next);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const next = (index === lastIndex) ? 0 : index + 1;
        scrollToIndex(next);
      });
    }

    // Update index when the user manually swipes
    track.addEventListener('scroll', () => {
      if (isProgrammatic) return; // ignore scrolls from our own scrollTo()

      const slideWidth = getSlideWidth();
      const newIndex = Math.round(track.scrollLeft / slideWidth);

      if (newIndex !== index && newIndex >= 0 && newIndex <= lastIndex) {
        index = newIndex;
        updateDots();
      }
    });

    // Initial state
    scrollToIndex(0);
  });
})();
