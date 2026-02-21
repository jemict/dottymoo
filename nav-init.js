document.addEventListener("DOMContentLoaded", () => {
  // nav.html is injected, so we watch for it appearing
  const mount = document.getElementById("site-nav");
  if (!mount) return;

  const attach = () => {
    const nav = mount.querySelector(".site-nav");
    const btn = mount.querySelector(".nav-toggle");
    if (!nav || !btn) return;

    // Avoid double-binding if called more than once
    if (btn.dataset.bound === "1") return;
    btn.dataset.bound = "1";

    btn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  };

  // Try immediately (in case nav is already present)
  attach();

  // Observe changes because nav is injected after load
  const obs = new MutationObserver(attach);
  obs.observe(mount, { childList: true, subtree: true });
});