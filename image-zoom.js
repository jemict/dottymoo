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

    modalImg.src = imgEl.currentSrc || imgEl.src;
    modalImg.alt = imgEl.alt || "";

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Centre the scroll after the image is ready
    modalImg.onload = () => {
      const rect = modalImg.getBoundingClientRect();
      const vRect = viewport.getBoundingClientRect();

      const targetX = Math.max(0, (rect.width - vRect.width) / 2);
      const targetY = Math.max(0, (rect.height - vRect.height) * 0.35);

      viewport.scrollLeft = targetX;
      viewport.scrollTop = targetY;
    };
  }

  function closeModal() {
    const { modal, modalImg } = getEls();
    if (!modal || !modalImg) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.removeAttribute("src");
    modalImg.alt = "";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const img = e.target.closest("img.zoomable");
    if (img) {
      openModal(img);
      return;
    }

    const closeTarget = e.target.closest("[data-close='true']");
    if (closeTarget) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
})();
