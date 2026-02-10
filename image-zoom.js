(function () {
  function getEls() {
    return {
      modal: document.getElementById("imgModal"),
      modalImg: document.getElementById("imgModalImage"),
      viewport: document.getElementById("imgModalViewport"),
    };
  }

 function openModal(imgEl) {
  const { modal, modalImg, viewport } = getEls();
  if (!modal || !modalImg || !viewport || !imgEl) return;

  modalImg.onload = () => {
    viewport.scrollLeft = 0;

    const maxY = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    viewport.scrollTop = Math.round(maxY * 0.45); // halfway-ish
  };

  modalImg.src = imgEl.currentSrc || imgEl.src;
  modalImg.alt = imgEl.alt || "";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // extra nudge for cached images/layout timing
  requestAnimationFrame(() => {
    viewport.scrollLeft = 0;
    const maxY = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
    viewport.scrollTop = Math.round(maxY * 0.45);
  });
}


  function closeModal() {
    const { modal, modalImg } = getEls();
    if (!modal || !modalImg) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    modalImg.alt = "";
    modalImg.onload = null;
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const img = e.target.closest("img.zoomable");
    if (img) {
      openModal(img);
      return;
    }

    if (e.target.closest("[data-close='true']")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();



