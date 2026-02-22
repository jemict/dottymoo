document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("site-nav");
  if (!mount) return;

  const attach = () => {
    const nav = mount.querySelector(".site-nav");
    const btn = mount.querySelector(".nav-toggle");
    if (!nav || !btn) return;

    if (btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";

    const closeMenu = () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    };

    btn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });

    // Close after choosing a link (mobile UX + prevents stuck scroll states)
    mount.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      closeMenu();
    });

    // Close on resize/orientation change
    window.addEventListener("resize", closeMenu, { passive: true });
  };

  attach();
  const obs = new MutationObserver(attach);
  obs.observe(mount, { childList: true, subtree: true });
});
