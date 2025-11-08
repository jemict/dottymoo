(function(){
  const carousels = document.querySelectorAll('.dm-carousel');

  function perViewFor(root){
    // data-per-view="3" on desktop; auto-downgrade on small screens
    const base = Number(root.dataset.perView || 1);
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return Math.min(2, base);
    return base;
  }

  carousels.forEach(root => {
    const track = root.querySelector('.dm-track');
    const slides = [...root.querySelectorAll('.dm-slide')];
    const prev = root.querySelector('.dm-prev');
    const next = root.querySelector('.dm-next');
    const dotsBox = root.querySelector('.dm-dots');

    let pv = perViewFor(root);          // per-view cards
    let i = 0;                           // index of the left-most visible slide

    function updateDots(){
      dotsBox.innerHTML = '';
      const pages = Math.max(1, slides.length - pv + 1);
      for (let k=0; k<pages; k++){
        const b = document.createElement('button');
        b.setAttribute('aria-label', `Go to set ${k+1}`);
        if (k === i) b.setAttribute('aria-current','true');
        b.addEventListener('click', ()=>{ i = k; update(); });
        dotsBox.appendChild(b);
      }
    }

    function update(){
      const step = 100 / pv;                            // move by one-card width
      const maxI = Math.max(0, slides.length - pv);     // last starting index
      if (i > maxI) i = maxI;
      track.style.transform = `translateX(-${i * step}%)`;
      [...dotsBox.children].forEach((b,k)=> b.setAttribute('aria-current', k===i ? 'true' : 'false'));
    }

    function onResize(){
      const newPv = perViewFor(root);
      if (newPv !== pv){
        pv = newPv;
        updateDots();
        update();
      }
    }

    prev && prev.addEventListener('click', ()=>{ i = Math.max(0, i-1); update(); });
    next && next.addEventListener('click', ()=>{ const maxI = Math.max(0, slides.length - pv); i = Math.min(maxI, i+1); update(); });

    updateDots(); update();
    window.addEventListener('resize', onResize);
  });
})();
