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
  V7.2.4 final responsive fit.
  Preserves V7.2.3 desktop behavior and adds mobile-only corrections.
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
          /* Desktop: preserve the approved V7.2.3 single-line hero. */
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

          /* Tablet: normal wrapping. */
          '@media (min-width:701px) and (max-width:1149px){' +
          '.dynamic-hero-heading h1,' +
          '.dynamic-hero-heading .dynamic-lead{white-space:normal;}' +
          '}' +

          /* Mobile-only corrections. */
          '@media (max-width:700px){' +
          '.site-header .header-inner{' +
          'padding:10px 12px!important;' +
          'gap:8px!important;' +
          'flex-wrap:nowrap!important;' +
          '}' +
          '.site-header .brand img{' +
          'width:200px!important;' +
          'max-height:64px!important;' +
          '}' +
          '.site-header .menu-button{' +
          'margin-left:auto!important;' +
          'flex:0 0 auto!important;' +
          'padding:8px 10px!important;' +
          '}' +
          '.site-header .header-book{display:none!important;}' +

          '.dynamic-hero{' +
          'padding:34px 0 30px!important;' +
          '}' +
          '.dynamic-hero-heading{' +
          'margin-bottom:24px!important;' +
          '}' +
          '.dynamic-hero-heading .local-badge{' +
          'max-width:100%!important;' +
          'padding:6px 9px!important;' +
          'font-size:.62rem!important;' +
          'letter-spacing:.075em!important;' +
          'line-height:1.35!important;' +
          '}' +
          '.dynamic-hero-heading h1{' +
          'max-width:none!important;' +
          'margin:18px 0 14px!important;' +
          'font-size:2.05rem!important;' +
          'line-height:1.05!important;' +
          'letter-spacing:-.035em!important;' +
          'white-space:normal!important;' +
          'overflow-wrap:normal!important;' +
          'word-break:normal!important;' +
          '}' +
          '.dynamic-hero-heading .dynamic-lead{' +
          'max-width:none!important;' +
          'font-size:1rem!important;' +
          'line-height:1.52!important;' +
          'white-space:normal!important;' +
          '}' +
          '.dynamic-hero-heading .dynamic-location{' +
          'font-size:.9rem!important;' +
          'line-height:1.5!important;' +
          '}' +

          /* Keep chat available but compact so it does not cover the mobile content. */
          '.atg-chatbot{right:10px!important;bottom:10px!important;}' +
          '.atg-chat-launcher{' +
          'width:48px!important;' +
          'height:48px!important;' +
          'min-height:48px!important;' +
          'padding:0!important;' +
          'justify-content:center!important;' +
          'border-radius:50%!important;' +
          '}' +
          '.atg-chat-launcher>span:last-child{' +
          'position:absolute!important;' +
          'width:1px!important;' +
          'height:1px!important;' +
          'padding:0!important;' +
          'margin:-1px!important;' +
          'overflow:hidden!important;' +
          'clip:rect(0,0,0,0)!important;' +
          'white-space:nowrap!important;' +
          'border:0!important;' +
          '}' +
          '}' ;

        document.head.appendChild(style);
      }
    }
  } catch (error) {
    /* Never block the existing site if this enhancement cannot run. */
  }
})();
