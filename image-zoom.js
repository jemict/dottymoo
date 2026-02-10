(function () {
  const modal = document.getElementById("imgModal");
  const modalImg = document.getElementById("imgModalImage");

  if (!modal || !modalImg) return;

  function openModal(src, alt) {
    modalImg.src = src;
    modalImg.alt = alt || "";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const img = e.target.closest(".zoomable");
    if (img) {
      openModal(img.src, img.alt);
    }

    if (e.target.dataset?.close === "true") {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
})();
