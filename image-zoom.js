(function () {
  function getEls() {
    return {
      modal: document.getElementById("imgModal"),
      modalImg: document.getElementById("imgModalImage"),
      viewport: document.getElementById("imgModalViewport"),
    };
  }

  function setInitialScroll(viewport) {
    if (!viewport) return;

    const maxLeft = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    const maxTop = Math.max(0, viewport.scrollHeight - viewport.clientHeight);

    // Halfway across + halfway down
    viewport.scrollLeft = Math.round(maxLeft * 0.5);
    viewport.scrollTop = Math.round(maxTop * 0.45); // slightly above exact middle
  }

  function openModal(imgEl) {
    const { modal, modalImg, viewport } = getEls();
    if (!modal || !modalImg || !viewport || !imgEl) return;

    // Clear any previous handler so we don't stack onload events
    modalImg.onload = null;

    // Set src/alt first so onload can fire reliably
    modalImg.src = imgEl.currentSrc || imgEl.src;
    modalImg.alt = imgEl.alt || "";

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // When image loads, set scroll positions
    modalImg.onload = () => {
      // 1) first paint/layout tick
      requestAnimationFrame(() => {
        setInitialScroll(viewport);

        // 2) second tick helps with cached images and some mobile browsers
        requestAnimationFrame(() => setInitialScroll(viewport));
      });
    };

    // If the image is already cached and complete, onload may not fire
    if (modalImg.complete) {
      requestAnimationFrame(() => {
        setInitialScroll(viewport);
        requestAnimationFrame(() => setInitialScroll(viewport));
      });
    }
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
