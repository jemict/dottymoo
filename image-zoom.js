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

    // Attach onload BEFORE setting src (important for cached images)
    modalImg.onload = () => {
      viewport.scrollLeft = 0;
      viewport.scrollTop = 0;
    };

    modalImg.src = imgEl.currentSrc || imgEl.src;
    modalImg.alt = imgEl.alt || "";

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Fallback: if the image is already loaded from cache, onload may not fire
    // so we also reset scroll on the next frame
    requestAnimationFrame(() => {
      viewport.scrollLeft = 0;
      viewport.scrollTop = 0;
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
