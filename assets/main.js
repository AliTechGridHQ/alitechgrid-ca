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


  // Public AliTechGrid business telephone and click-to-call support.
  const businessPhoneDisplay = "+1 778-358-4040";
  const businessPhoneHref = "tel:+17783584040";
  const path = window.location.pathname.toLowerCase();

  const createPhoneLink = (label, className = "") => {
    const link = document.createElement("a");
    link.href = businessPhoneHref;
    link.textContent = label;
    link.setAttribute("aria-label", `Call AliTechGrid at ${businessPhoneDisplay}`);
    link.dataset.phoneLink = "true";
    if (className) link.className = className;
    return link;
  };

  // Add the telephone to LocalBusiness structured data for search engines.
  document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
    try {
      const data = JSON.parse(script.textContent);
      if (data && (data["@type"] === "LocalBusiness" || data["@type"] === "Organization")) {
        data.telephone = businessPhoneDisplay;
        script.textContent = JSON.stringify(data, null, 2);
      }
    } catch {
      // Leave unrelated or non-standard structured data unchanged.
    }
  });

  // Add Call Now to the Canada homepage.
  if (path.endsWith("/") || path.endsWith("/index.html")) {
    const actions = document.querySelector(".hero-actions");
    if (actions && !actions.querySelector('a[href^="tel:"]')) {
      actions.appendChild(createPhoneLink("Call Now", "button button-secondary"));
    }
  }

  // Make the telephone prominent on the Canada contact page.
  if (path.endsWith("/contact.html")) {
    const actionRow = document.querySelector(".button-row");
    if (actionRow && !actionRow.querySelector('a[href^="tel:"]')) {
      actionRow.insertBefore(createPhoneLink("Call Now", "button button-primary"), actionRow.firstChild);
    }

    const contactPanel = document.querySelector(".contact-panel");
    if (contactPanel && !contactPanel.querySelector('a[href^="tel:"]')) {
      const phoneRow = document.createElement("div");
      phoneRow.className = "contact-row";
      phoneRow.innerHTML = `<strong>Business phone</strong><br><a href="${businessPhoneHref}" data-phone-link="true">${businessPhoneDisplay}</a><br><span class="muted">Press 1 for Technical Support, 2 for AI, Cloud & Training, or 0 for Customer Support.</span>`;
      contactPanel.insertBefore(phoneRow, contactPanel.firstChild);
    }
  }

  // Display the business phone in the footer on every page.
  const footerIdentity = document.querySelector(".site-footer .footer-grid > div:first-child");
  if (footerIdentity && !footerIdentity.querySelector(".footer-phone")) {
    const phoneLine = document.createElement("p");
    phoneLine.className = "footer-phone";
    phoneLine.append("Business phone: ");
    phoneLine.appendChild(createPhoneLink(businessPhoneDisplay));
    footerIdentity.appendChild(phoneLine);
  }

  // Measure click-to-call actions in the Canada GA4 property.
  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    if (link.dataset.phoneTrackingReady === "true") return;
    link.dataset.phoneTrackingReady = "true";
    link.addEventListener("click", () => {
      if (typeof window.gtag === "function") {
        window.gtag("event", "phone_click", {
          phone_number: businessPhoneDisplay,
          page_location: window.location.href,
          link_text: link.textContent.trim()
        });
      }
    });
  });

})();
