
(function(){
  const carousels = document.querySelectorAll('.dm-carousel');
  carousels.forEach(root => {
    const track = root.querySelector('.dm-track');
    const slides = [...root.querySelectorAll('.dm-slide')];
    const prev = root.querySelector('.dm-prev');
    const next = root.querySelector('.dm-next');
    const dotsBox = root.querySelector('.dm-dots');
    let i = 0;
    function update(){
      track.style.transform = `translateX(-${i*100}%)`;
      slides.forEach((s,k)=>s.setAttribute('aria-hidden', k!==i));
      [...dotsBox.children].forEach((b,k)=> b.setAttribute('aria-current', k===i ? 'true' : 'false'));
    }
    slides.forEach((_,k)=>{
      const b = document.createElement('button');
      b.setAttribute('aria-label',`Go to slide ${k+1}`);
      b.addEventListener('click', ()=>{ i=k; update(); });
      dotsBox.appendChild(b);
    });
    prev.addEventListener('click', ()=>{ i = (i-1+slides.length)%slides.length; update(); });
    next.addEventListener('click', ()=>{ i = (i+1)%slides.length; update(); });
    update();
  });
})();
