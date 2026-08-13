window.ALITECHGRID_CONFIG = {
  // REQUIRED BEFORE PUBLIC LAUNCH:
  // Paste the complete Zoho Calendar "Live link" between the quotation marks.
  bookingUrl: "https://calendar.zohocloud.ca/zc/view/slot-booking/zz080112307961a55f27599c17ced0f5a1aab58c6916680163755acca06e9e3a51d1360c0b1025b7e3be1c0fdd1be5fcdca7762647",

  siteUrl: "https://alitechgrid.ca",
  contactEmail: "contact@alitechgrid.com",
  supportEmail: "support@alitechgrid.com",
  companyName: "AliTechGrid Canada"
};

/*
  V7.2.3 homepage hero fit fix.
  Keeps the full desktop heading on one line where there is enough viewport width,
  while allowing normal responsive wrapping on smaller screens.
*/
(function () {
  try {
    var nav = document.querySelector("[data-main-nav]");
    if (nav && !nav.querySelector('a[href="training.html"]')) {
      var trainingLink = document.createElement("a");
      trainingLink.href = "training.html";
      trainingLink.textContent = "Training";

      var path = (window.location && window.location.pathname) || "";
      if (path.endsWith("/training.html") || path.endsWith("/training-estimate.html")) {
        trainingLink.setAttribute("aria-current", "page");
      }

      var links = nav.querySelectorAll("a");
      var bookLink = null;
      for (var i = 0; i < links.length; i++) {
        if (links[i].getAttribute("href") === "book.html") {
          bookLink = links[i];
          break;
        }
      }

      if (bookLink) nav.insertBefore(trainingLink, bookLink);
      else nav.appendChild(trainingLink);
    }

    var homeHero = document.querySelector(".dynamic-hero-heading");
    if (homeHero) {
      var homeHeading = homeHero.querySelector("h1");
      var homeLead = homeHero.querySelector(".dynamic-lead");

      if (homeHeading) {
        homeHeading.textContent = "Computer Repair, Network Support & Job‑Role Technical Training";
      }

      if (homeLead) {
        homeLead.textContent = "Windows & Linux · Desktop Support · Wi‑Fi & Networking · Cloud · Automation · AI‑Assisted IT Operations";
      }

      if (!document.getElementById("atg-home-hero-fit")) {
        var style = document.createElement("style");
        style.id = "atg-home-hero-fit";
        style.textContent =
          '@media (min-width:1150px){' +
          '.dynamic-hero-heading{max-width:none!important;}' +
          '.dynamic-hero-heading h1{' +
          'max-width:none!important;' +
          'font-size:clamp(2rem,2.6vw,2.4rem)!important;' +
          'white-space:nowrap;' +
          'letter-spacing:-.045em;' +
          '}' +
          '.dynamic-hero-heading .dynamic-lead{' +
          'max-width:none!important;' +
          'white-space:nowrap;' +
          'font-size:1.05rem;' +
          '}' +
          '}' +
          '@media (max-width:1149px){' +
          '.dynamic-hero-heading h1,' +
          '.dynamic-hero-heading .dynamic-lead{' +
          'white-space:normal;' +
          '}' +
          '}';
        document.head.appendChild(style);
      }
    }
  } catch (error) {
    /* Never block the existing site if this enhancement cannot run. */
  }
})();
