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
function openModal(imgEl) {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("imgModalImage");
  const viewport = document.getElementById("imgModalViewport");
  if (!modal || !modalImg || !viewport || !imgEl) return;

  modalImg.src = imgEl.currentSrc || imgEl.src;
  modalImg.alt = imgEl.alt || "";

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // After image loads, scroll viewport so chest area is near centre
  modalImg.onload = () => {
    // Because we use transform scale(2), scrollHeight/Width won't change,
    // so we centre based on the image's rendered box.
    const rect = modalImg.getBoundingClientRect();
    const vRect = viewport.getBoundingClientRect();

    // Aim a bit above centre (shirt area)
    const targetX = (rect.width - vRect.width) / 2;
    const targetY = (rect.height - vRect.height) * 0.35;

    viewport.scrollLeft = Math.max(0, targetX);
    viewport.scrollTop = Math.max(0, targetY);
  };
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

