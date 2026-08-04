(() => {
  "use strict";

  if (document.getElementById("atg-chatbot")) return;

  const BUSINESS_PHONE_DISPLAY = "+1 778-358-4040";
  const BUSINESS_PHONE_HREF = "tel:+17783584040";
  const CONTACT_EMAIL = "contact@alitechgrid.com";

  const track = (eventName, details = {}) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        chatbot_name: "AliTechGrid Canada Virtual Assistant",
        page_location: window.location.href,
        ...details
      });
    }
  };

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const widget = document.createElement("div");
  widget.id = "atg-chatbot";
  widget.className = "atg-chatbot";
  widget.innerHTML = `
    <button class="atg-chat-launcher" type="button" aria-controls="atg-chat-panel" aria-expanded="false">
      <span class="atg-chat-launcher-icon" aria-hidden="true">💬</span>
      <span>Chat with us</span>
    </button>
    <section class="atg-chat-panel" id="atg-chat-panel" role="dialog" aria-modal="false" aria-label="AliTechGrid Canada virtual assistant" hidden>
      <header class="atg-chat-header">
        <div>
          <strong>AliTechGrid Canada</strong>
          <span>Virtual Assistant</span>
        </div>
        <button class="atg-chat-close" type="button" aria-label="Close virtual assistant">×</button>
      </header>
      <div class="atg-chat-log" role="log" aria-live="polite" aria-relevant="additions"></div>
      <div class="atg-chat-quick" aria-label="Suggested questions"></div>
      <form class="atg-chat-form">
        <label class="atg-chat-label" for="atg-chat-input">Type your question</label>
        <div class="atg-chat-input-row">
          <input id="atg-chat-input" name="message" type="text" maxlength="250" autocomplete="off" placeholder="How can we help?" required>
          <button type="submit">Send</button>
        </div>
      </form>
      <p class="atg-chat-privacy">Do not enter passwords, payment-card details, government ID, or sensitive personal information.</p>
    </section>
  `;

  document.body.appendChild(widget);

  const launcher = widget.querySelector(".atg-chat-launcher");
  const panel = widget.querySelector(".atg-chat-panel");
  const closeButton = widget.querySelector(".atg-chat-close");
  const log = widget.querySelector(".atg-chat-log");
  const quick = widget.querySelector(".atg-chat-quick");
  const form = widget.querySelector(".atg-chat-form");
  const input = widget.querySelector(".atg-chat-input-row input");

  const scrollToLatest = () => {
    requestAnimationFrame(() => {
      log.scrollTop = log.scrollHeight;
    });
  };

  const addMessage = (sender, html) => {
    const message = document.createElement("div");
    message.className = `atg-chat-message atg-chat-message-${sender}`;
    message.innerHTML = html;
    log.appendChild(message);
    scrollToLatest();
  };

  const setQuickActions = (actions) => {
    quick.innerHTML = "";
    actions.forEach(({ label, intent }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.dataset.intent = intent;
      quick.appendChild(button);
    });
  };

  const linkButtons = (items) => `
    <div class="atg-chat-actions">
      ${items.map(({ label, href, primary = false }) => `
        <a class="${primary ? "is-primary" : ""}" href="${href}"${href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>
      `).join("")}
    </div>
  `;

  const mainActions = [
    { label: "Computer or laptop", intent: "computer" },
    { label: "Phone or tablet", intent: "mobile" },
    { label: "Wi-Fi or printer", intent: "network" },
    { label: "Websites & digital setup", intent: "website" },
    { label: "Book service", intent: "book" },
    { label: "Request estimate", intent: "estimate" },
    { label: "Call AliTechGrid", intent: "contact" }
  ];

  const responses = {
    computer: () => ({
      text: `<strong>Computer and laptop support</strong><br>We assess startup problems, slow performance, Windows issues, SSD/RAM upgrades, batteries, chargers, keyboards, viruses and other common problems. Diagnosis is completed before unapproved additional work.`,
      links: [
        { label: "Book a diagnostic", href: "book.html", primary: true },
        { label: "View services", href: "services.html" }
      ]
    }),
    mobile: () => ({
      text: `<strong>Phone and tablet assessment</strong><br>We can assess screen, battery, charging, connectivity, software setup, reset and data-transfer issues. Service depends on the device model, parts availability and repair feasibility.`,
      links: [
        { label: "Book an assessment", href: "book.html", primary: true },
        { label: "Request an estimate", href: "estimate.html" }
      ]
    }),
    network: () => ({
      text: `<strong>Wi-Fi, network and printer help</strong><br>We support router and wireless configuration, device connectivity, printers, displays, peripherals and new-computer setup for homes and small businesses.`,
      links: [
        { label: "Book service", href: "book.html", primary: true },
        { label: "View services", href: "services.html" }
      ]
    }),
    data: () => ({
      text: `<strong>Data transfer and backup assistance</strong><br>We support old-to-new computer transfers, backup setup, restore assistance and storage migration. Data recovery may be assessed or referred, but recovery cannot be guaranteed.`,
      links: [
        { label: "Request an estimate", href: "estimate.html", primary: true },
        { label: "Book service", href: "book.html" }
      ]
    }),
    business: () => ({
      text: `<strong>Small-business IT support</strong><br>We assist with business email and domain setup, cloud productivity accounts, workstation onboarding, basic networks and device documentation.`,
      links: [
        { label: "Contact AliTechGrid", href: "contact.html", primary: true },
        { label: "Call business services", href: BUSINESS_PHONE_HREF }
      ]
    }),
    website: () => ({
      text: `<strong>Affordable websites and digital business setup</strong><br>AliTechGrid offers a Smart One-Page Website starting from CAD $399, an AI-Enabled Starter Website starting from CAD $699, and a Complete Digital Business Setup starting from CAD $1,199. Services may include domain and DNS setup, business email, booking, virtual phone guidance, analytics and a controlled FAQ chatbot. Final pricing depends on scope and third-party charges.`,
      links: [
        { label: "View website packages", href: "websites.html", primary: true },
        { label: "Email website request", href: "mailto:sales@alitechgrid.com?subject=Website%20service%20request" },
        { label: "Call AliTechGrid", href: BUSINESS_PHONE_HREF }
      ]
    }),
    book: () => ({
      text: `<strong>Book a diagnostic appointment</strong><br>Online booking is available 24/7. Select an available appointment time. The service location, pickup/drop-off or on-site option will be confirmed after the request is reviewed.`,
      links: [
        { label: "Open booking", href: "book.html", primary: true }
      ]
    }),
    estimate: () => ({
      text: `<strong>Request an estimate</strong><br>Use the estimate page when you can clearly describe the device and problem. A final price may require inspection, and no additional work should be completed without approval.`,
      links: [
        { label: "Request estimate", href: "estimate.html", primary: true },
        { label: "Book a diagnostic", href: "book.html" }
      ]
    }),
    area: () => ({
      text: `<strong>Service area</strong><br>AliTechGrid Canada serves Coquitlam, Port Moody, Burnaby, New Westminster and nearby Greater Vancouver communities. On-site and pickup/drop-off availability depends on location, schedule and the type of work.`,
      links: [
        { label: "Book service", href: "book.html", primary: true },
        { label: "Contact us", href: "contact.html" }
      ]
    }),
    hours: () => ({
      text: `<strong>Booking and appointment times</strong><br>The booking page is available 24/7. Current appointment times are shown in the online calendar.`,
      links: [
        { label: "Check appointment times", href: "book.html", primary: true }
      ]
    }),
    contact: () => ({
      text: `<strong>Call ${BUSINESS_PHONE_DISPLAY}</strong><br>Press <strong>0</strong> for Customer Support, <strong>1</strong> for Technical Support, or <strong>2</strong> for AI, Cloud Consultancy & Training. You can also email ${CONTACT_EMAIL}.`,
      links: [
        { label: "Call now", href: BUSINESS_PHONE_HREF, primary: true },
        { label: "Email us", href: `mailto:${CONTACT_EMAIL}` },
        { label: "Contact page", href: "contact.html" }
      ]
    }),
    ai: () => ({
      text: `<strong>AI, cloud consultancy and training</strong><br>For these inquiries, call ${BUSINESS_PHONE_DISPLAY} and press <strong>2</strong>, or use the contact page.`,
      links: [
        { label: "Call and press 2", href: BUSINESS_PHONE_HREF, primary: true },
        { label: "Contact us", href: "contact.html" }
      ]
    }),
    privacy: () => ({
      text: `<strong>Please protect your information.</strong><br>Do not share passwords, PINs, payment-card details, government identification, private business credentials or sensitive personal data in this chat or in booking notes.`,
      links: [
        { label: "Read privacy policy", href: "privacy.html", primary: true }
      ]
    }),
    safety: () => ({
      text: `<strong>Safety first.</strong><br>If a device is smoking, burning, unusually hot, has a swollen battery or has been exposed to liquid: stop using it, disconnect power only when safe, do not charge it, and keep it away from flammable materials. For fire or immediate danger, call 911. Do not open a swollen or damaged battery yourself.`,
      links: [
        { label: "Call Technical Support", href: BUSINESS_PHONE_HREF, primary: true },
        { label: "Book an assessment", href: "book.html" }
      ]
    }),
    fallback: () => ({
      text: `I can help with computer and laptop repair, phone and tablet assessment, Wi-Fi and printer support, affordable websites, digital business setup, data transfer, booking, estimates, service areas and contact options. For a question requiring a person, call ${BUSINESS_PHONE_DISPLAY}.`,
      links: [
        { label: "Call AliTechGrid", href: BUSINESS_PHONE_HREF, primary: true },
        { label: "Contact page", href: "contact.html" }
      ]
    })
  };

  const intentFromText = (raw) => {
    const text = raw.toLowerCase().replace(/[^a-z0-9\s&+-]/g, " ");
    const has = (...terms) => terms.some((term) => text.includes(term));

    if (has("smoke", "smoking", "fire", "burning", "swollen", "bulging", "battery hot", "overheating", "liquid", "water damage", "wet phone", "chemical smell")) return "safety";
    if (has("password", "pin", "credit card", "debit card", "payment card", "government id", "sin number", "privacy", "personal information")) return "privacy";
    if (has("website", "web site", "web design", "webpage", "digital business", "online presence", "one page site", "business site", "chatbot setup", "virtual receptionist", "domain setup")) return "website";
    if (has("book", "booking", "appointment", "schedule", "diagnostic")) return "book";
    if (has("estimate", "quote", "cost", "price", "how much", "fee", "charge")) return "estimate";
    if (has("call", "phone number", "telephone", "contact", "human", "person", "operator", "customer support", "technical support")) return "contact";
    if (has("ai", "artificial intelligence", "cloud", "consultancy", "consulting", "training", "course", "workshop")) return "ai";
    if (has("location", "service area", "coquitlam", "port moody", "burnaby", "new westminster", "vancouver", "pickup", "drop off", "on site", "onsite")) return "area";
    if (has("hours", "open", "closing", "weekend", "today", "time")) return "hours";
    if (has("data", "backup", "transfer", "migration", "recover", "recovery", "files")) return "data";
    if (has("business", "domain", "email setup", "microsoft 365", "office 365", "workspace", "workstation")) return "business";
    if (has("wifi", "wi fi", "internet", "router", "network", "printer", "display", "peripheral")) return "network";
    if (has("phone", "mobile", "tablet", "iphone", "ipad", "android", "charging port", "screen", "battery")) return "mobile";
    if (has("computer", "laptop", "pc", "windows", "startup", "slow", "ssd", "ram", "keyboard", "charger", "virus", "malware", "software")) return "computer";
    return "fallback";
  };

  const respond = (intent, userLabel = "") => {
    if (userLabel) addMessage("user", escapeHtml(userLabel));
    const response = (responses[intent] || responses.fallback)();
    addMessage("bot", `${response.text}${response.links ? linkButtons(response.links) : ""}`);
    setQuickActions(mainActions);
    track("chatbot_intent", { chatbot_intent: intent });
  };

  const showPanel = () => {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    launcher.classList.add("is-hidden");
    input.focus();
    track("chatbot_open");
  };

  const hidePanel = () => {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    launcher.classList.remove("is-hidden");
    launcher.focus();
    track("chatbot_close");
  };

  launcher.addEventListener("click", showPanel);
  closeButton.addEventListener("click", hidePanel);

  quick.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-intent]");
    if (!button) return;
    respond(button.dataset.intent, button.textContent.trim());
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    input.value = "";
    respond(intentFromText(value), value);
  });

  widget.addEventListener("click", (event) => {
    const link = event.target.closest(".atg-chat-actions a");
    if (!link) return;
    track("chatbot_link_click", {
      link_text: link.textContent.trim(),
      link_url: link.href
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !panel.hidden) hidePanel();
  });

  addMessage("bot", `<strong>Hello! I’m the AliTechGrid Canada virtual assistant.</strong><br>I can help with repair services, affordable websites, digital business setup, booking, estimates, service areas and contact options.`);
  addMessage("bot", `For your security, do not enter passwords, payment-card details, government ID or sensitive personal information.`);
  setQuickActions(mainActions);
})();
