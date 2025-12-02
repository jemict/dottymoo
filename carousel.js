// Dotty Moo transform-based carousel (fixed centering)
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

    // Build dots safely
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

    function update() {
      // Move by 1 / slideCount of the track width each time
      const shiftPercent = (index * 100) / slides.length;
      track.style.transform = `translateX(-${shiftPercent}%)`;

      dots.forEach((dot, i) => {
        if (i === index) {
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.removeAttribute('aria-current');
        }
      });
    }

    // Arrows with looping
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        index = (index === 0 ? lastIndex : index - 1);
        update();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        index = (index === lastIndex ? 0 : index + 1);
        update();
      });
    }

    // Initial position
    update();
  });
})();
