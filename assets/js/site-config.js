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
  V7.2.2 homepage heading layout fix.
  - Preserves booking/config values.
  - Preserves Training navigation integration.
  - Controls only homepage H1 line grouping.
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
        homeHeading.innerHTML =
          'Computer Repair, Network Support &amp;<br>' +
          '<span class="atg-home-role-line">Job&#8209;Role Technical Training</span>';

        if (!document.getElementById("atg-home-heading-style")) {
          var style = document.createElement("style");
          style.id = "atg-home-heading-style";
          style.textContent =
            '.dynamic-hero-heading h1 .atg-home-role-line{white-space:nowrap;}' +
            '@media(max-width:700px){.dynamic-hero-heading h1 .atg-home-role-line{white-space:normal;}}';
          document.head.appendChild(style);
        }
      }

      if (homeLead) {
        homeLead.textContent =
          "Windows & Linux · Desktop Support · Wi‑Fi & Networking · Cloud · Automation · AI‑Assisted IT Operations";
      }
    }
  } catch (error) {
    /* Never block the existing site if this enhancement cannot run. */
  }
})();
