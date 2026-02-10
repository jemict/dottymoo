(function () {
  function getEls() {
    return {
      modal: document.getElementById("imgModal"),
      modalImg: document.getElementById("imgModalImage"),
      viewport: document.getElementById("imgModalViewport"),
    };
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

  modalImg.onload = () => {
    viewport.scrollLeft = 0;
    viewport.scrollTop = 0; // back to “as was”
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





