(function () {
  var CONSENT_KEY = "dm_cookie_consent";

  function getConsent() {
    try {
      var stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) return null;
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  }

  function setConsent(consent) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    applyConsent(consent);
  }

  function applyConsent(consent) {
    // Later: conditionally load analytics/marketing scripts here.
    // Keep empty for now.
  }

  function showBanner() {
    var banner = document.getElementById("cookie-banner");
    if (banner) banner.style.display = "flex";
  }

  function hideBanner() {
    var banner = document.getElementById("cookie-banner");
    if (banner) banner.style.display = "none";
  }

  function showModal() {
    var modal = document.getElementById("cookie-modal-backdrop");
    if (modal) {
      modal.style.display = "flex";
      modal.setAttribute("aria-hidden", "false");
    }
  }

  function hideModal() {
    var modal = document.getElementById("cookie-modal-backdrop");
    if (modal) {
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var consent = getConsent();
    if (!consent) {
      showBanner();
    } else {
      applyConsent(consent);
    }

    var btnAcceptAll = document.getElementById("cookie-accept-all");
    var btnRejectAll = document.getElementById("cookie-reject-all");
    var btnManage = document.getElementById("cookie-manage");
    var btnSave = document.getElementById("cookie-save");
    var btnCancel = document.getElementById("cookie-cancel");

    var chkAnalytics = document.getElementById("cookie-analytics");
    var chkMarketing = document.getElementById("cookie-marketing");

    if (btnAcceptAll) {
      btnAcceptAll.addEventListener("click", function () {
        setConsent({ essential: true, analytics: true, marketing: true });
        hideBanner();
      });
    }

    if (btnRejectAll) {
      btnRejectAll.addEventListener("click", function () {
        setConsent({ essential: true, analytics: false, marketing: false });
        hideBanner();
      });
    }

    if (btnManage) {
      btnManage.addEventListener("click", function () {
        var current = getConsent();
        if (chkAnalytics) chkAnalytics.checked = current ? !!current.analytics : false;
        if (chkMarketing) chkMarketing.checked = current ? !!current.marketing : false;
        showModal();
      });
    }

    if (btnSave) {
      btnSave.addEventListener("click", function () {
        setConsent({
          essential: true,
          analytics: chkAnalytics ? chkAnalytics.checked : false,
          marketing: chkMarketing ? chkMarketing.checked : false
        });
        hideModal();
        hideBanner();
      });
    }

    if (btnCancel) {
      btnCancel.addEventListener("click", function () {
        hideModal();
      });
    }
  });
})();
