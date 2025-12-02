// Dotty Moo transform-based carousel (final stable version)
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

    // Create dots
    const dots = [];
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

    function update() {
      track.style.transform = `translateX(-${index * 100}%)`;

      dots.forEach((dot, i) => {
        dot.toggleAttribute('aria-current', i === index);
      });
    }

    // Arrows
    prevBtn.addEventListener('click', () => {
      index = (index === 0 ? lastIndex : index - 1);
      update();
    });

    nextBtn.addEventListener('click', () => {
      index = (index === lastIndex ? 0 : index + 1);
      update();
    });

    update();
  });
})();
