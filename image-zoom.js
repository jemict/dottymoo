(function () {
  function getModalEls() {
    return {
      modal: document.getElementById("imgModal"),
      modalImg: document.getElementById("imgModalImage"),
    };
  }

  function openModal(src, alt) {
    const { modal, modalImg } = getModalEls();
    if (!modal || !modalImg) return;

    modalImg.src = src;
    modalImg.alt = alt || "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const { modal, modalImg } = getModalEls();
    if (!modal || !modalImg) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  // Click-to-zoom for any image with class="zoomable"
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".zoomable");
    if (img) {
      openModal(img.currentSrc || img.src, img.alt);
      return;
    }

    // Close if clicking backdrop or X button
    if (e.target && e.target.dataset && e.target.dataset.close === "true") {
      closeModal();
    }
  });

  // Esc to close
  document.addEventListener("keydown", (e) => {
    const { modal } = getModalEls();
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
})();
