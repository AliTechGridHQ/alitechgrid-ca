(() => {
  "use strict";

  const config = window.ALITECHGRID_CONFIG || {};
  const placeholder = "PASTE_FULL_ZOHO_LIVE_LINK_HERE";
  const bookingReady =
    typeof config.bookingUrl === "string" &&
    config.bookingUrl.trim() &&
    config.bookingUrl !== placeholder &&
    /^https:\/\/calendar\.zohocloud\.ca\//i.test(config.bookingUrl);

  document.querySelectorAll("[data-booking-link]").forEach((link) => {
    if (bookingReady) {
      link.href = config.bookingUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "book.html";
    }
  });

  const bookingFrame = document.querySelector("[data-booking-frame]");
  const bookingNotice = document.querySelector("[data-booking-notice]");
  if (bookingFrame) {
    if (bookingReady) {
      bookingFrame.src = config.bookingUrl;
      bookingFrame.hidden = false;
      if (bookingNotice) bookingNotice.hidden = true;
    } else {
      bookingFrame.hidden = true;
      if (bookingNotice) bookingNotice.hidden = false;
    }
  }

  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const menuButton = document.querySelector("[data-menu-button]");
  const nav = document.querySelector("[data-main-nav]");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
    });
  }

  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", async () => {
      const email = button.dataset.copyEmail;
      try {
        await navigator.clipboard.writeText(email);
        const old = button.textContent;
        button.textContent = "Email copied";
        setTimeout(() => (button.textContent = old), 1600);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });
})();
