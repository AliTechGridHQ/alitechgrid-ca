(() => {
  "use strict";
  const NUMBER = "16726719982";
  const DISPLAY = "+1 672 671 9982";
  const BASE_URL = `https://wa.me/${NUMBER}`;
  const DEFAULT_MESSAGE = "Hello AliTechGrid Canada. I need help with a technology issue.";

  function makeUrl(message = DEFAULT_MESSAGE) {
    const text = String(message || DEFAULT_MESSAGE).trim();
    return `${BASE_URL}?text=${encodeURIComponent(text)}`;
  }

  const API = Object.freeze({ number: NUMBER, display: DISPLAY, baseUrl: BASE_URL, makeUrl });
  if (typeof module !== "undefined" && module.exports) module.exports = API;
  if (typeof window !== "undefined") window.ALITECHGRID_WHATSAPP = API;
  if (typeof document === "undefined") return;

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    const message = link.dataset.whatsappMessage || DEFAULT_MESSAGE;
    link.href = makeUrl(message);
    if (!link.hasAttribute("target")) link.target = "_blank";
    const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    rel.add("noopener"); rel.add("noreferrer");
    link.setAttribute("rel", [...rel].join(" "));
  });
})();
