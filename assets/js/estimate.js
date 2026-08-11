(() => {
  "use strict";

  const DISCOUNTS = Object.freeze({ firstTime: 0.10, additionalDevice: 0.10, maxCombined: 0.20 });
  const TAX_RATES = Object.freeze({ gst: 0.05, pst: 0.07 });
  const ON_SITE = Object.freeze({
    home: { minimum: 129, label: "Home on-site service call", additionalHourly: 90 },
    business: { minimum: 159, label: "Small-business on-site service call", additionalHourly: 120 }
  });

  const SERVICES = {
    desktop: {
      title: "Desktop Computer", detail: "services.html#computer", multiDevice: true,
      issues: {
        diagnostic: { label: "Diagnostic & troubleshooting", min: 79, max: 119, tax: "mixed" },
        slow: { label: "Slow / freezing / tune-up", min: 89, max: 129, tax: "software" },
        startup: { label: "Windows startup or software problem", min: 99, max: 149, tax: "software" },
        malware: { label: "Virus / malware cleanup", min: 99, max: 149, tax: "software" },
        upgrade: { label: "SSD / RAM installation labour", min: 69, max: 99, tax: "hardware", note: "Parts are extra and require approval." },
        setup: { label: "New computer setup", min: 89, max: 129, tax: "software" },
        transfer: { label: "Standard data transfer / migration", min: 89, max: 149, tax: "mixed" },
        physical: { label: "Physical damage / unknown hardware failure", manual: true, tax: "hardware" }
      }
    },
    laptop: {
      title: "Laptop", detail: "services.html#computer", multiDevice: true,
      issues: {
        diagnostic: { label: "Diagnostic & troubleshooting", min: 79, max: 119, tax: "mixed" },
        slow: { label: "Slow / freezing / tune-up", min: 89, max: 129, tax: "software" },
        startup: { label: "Windows startup or software problem", min: 99, max: 149, tax: "software" },
        malware: { label: "Virus / malware cleanup", min: 99, max: 149, tax: "software" },
        upgrade: { label: "SSD / RAM installation labour", min: 69, max: 99, tax: "hardware", note: "Parts are extra and require approval." },
        battery: { label: "Battery / charger assessment", min: 79, max: 119, tax: "mixed" },
        transfer: { label: "Standard data transfer / migration", min: 89, max: 149, tax: "mixed" },
        physical: { label: "Screen, liquid or physical damage", manual: true, tax: "hardware" }
      }
    },
    mobile: {
      title: "Mobile Phone / Tablet", detail: "services.html#mobile", multiDevice: true,
      issues: {
        setup: { label: "New device setup", min: 69, max: 109, tax: "software" },
        migration: { label: "Photo / data / account migration", min: 79, max: 119, tax: "software" },
        connectivity: { label: "Wi-Fi / Bluetooth / software troubleshooting", min: 69, max: 109, tax: "software" },
        charging: { label: "Charging / battery assessment", min: 79, max: 119, tax: "mixed" },
        physical: { label: "Screen or physical hardware damage", manual: true, tax: "hardware" }
      }
    },
    wifi: {
      title: "Wi-Fi Service", detail: "services.html#network", multiDevice: false,
      issues: {
        troubleshoot: { label: "Weak / unreliable Wi-Fi troubleshooting", min: 109, max: 159, tax: "mixed" },
        setup: { label: "New Wi-Fi setup / configuration", min: 99, max: 149, tax: "mixed" },
        devices: { label: "Printer / smart-device connectivity", min: 89, max: 139, tax: "mixed" },
        security: { label: "Wireless security / configuration review", min: 89, max: 129, tax: "software" },
        complex: { label: "Mesh, cabling or complex coverage project", manual: true, tax: "mixed" }
      }
    },
    network: {
      title: "Home / Small-Business Network", detail: "services.html#network", multiDevice: false,
      issues: {
        switch: { label: "Network switch / Ethernet setup", min: 129, max: 199, tax: "hardware" },
        printer: { label: "Printer / workstation connectivity", min: 99, max: 149, tax: "mixed" },
        troubleshoot: { label: "Network troubleshooting", min: 109, max: 169, tax: "mixed" },
        smalloffice: { label: "Small-office network setup", min: 149, max: 249, tax: "mixed" },
        complex: { label: "Large / custom business network", manual: true, tax: "mixed" }
      }
    },
    router: {
      title: "Router Service", detail: "services.html#network", multiDevice: false,
      issues: {
        setup: { label: "New router setup", min: 99, max: 149, tax: "mixed" },
        connection: { label: "Router / internet connection troubleshooting", min: 99, max: 149, tax: "mixed" },
        security: { label: "Router security / Wi-Fi configuration", min: 89, max: 129, tax: "software" },
        devices: { label: "Connect computers / printers / devices", min: 109, max: 169, tax: "mixed" },
        complex: { label: "Mesh / business router / advanced configuration", manual: true, tax: "mixed" }
      }
    }
  };

  const money = (value) => `$${Math.round(value).toLocaleString("en-CA")}`;
  const range = (min, max) => Math.round(min) === Math.round(max) ? money(min) : `${money(min)}–${money(max)}`;
  const clampInt = (value, min, max) => Math.max(min, Math.min(max, Number.parseInt(value, 10) || min));
  const normalizeCustomerType = (value) => value === "business" ? "business" : "home";
  const normalizeServiceOption = (value) => ["onsite","pickup","remote","location","not-sure"].includes(value) ? value : "not-sure";

  function calculateEstimate(serviceKey, issueKey, quantity = 1, firstTime = false, customerType = "home", serviceOption = "not-sure") {
    const service = SERVICES[serviceKey];
    if (!service) throw new Error("Unknown service");
    const issue = service.issues[issueKey] || Object.values(service.issues)[0];
    const customer = normalizeCustomerType(customerType);
    const mode = normalizeServiceOption(serviceOption);
    if (issue.manual) return { manual: true, service, issue, quantity: 1, firstTime: !!firstTime, customerType: customer, serviceOption: mode };

    const qty = service.multiDevice ? clampInt(quantity, 1, 5) : 1;
    const baseMin = issue.min * qty;
    const baseMax = issue.max * qty;
    let firstMin = firstTime ? baseMin * DISCOUNTS.firstTime : 0;
    let firstMax = firstTime ? baseMax * DISCOUNTS.firstTime : 0;
    let multiMin = service.multiDevice && qty > 1 ? issue.min * (qty - 1) * DISCOUNTS.additionalDevice : 0;
    let multiMax = service.multiDevice && qty > 1 ? issue.max * (qty - 1) * DISCOUNTS.additionalDevice : 0;

    const capMin = baseMin * DISCOUNTS.maxCombined;
    const capMax = baseMax * DISCOUNTS.maxCombined;
    const rawMin = firstMin + multiMin;
    const rawMax = firstMax + multiMax;
    const scaleMin = rawMin > capMin && rawMin > 0 ? capMin / rawMin : 1;
    const scaleMax = rawMax > capMax && rawMax > 0 ? capMax / rawMax : 1;
    firstMin *= scaleMin; multiMin *= scaleMin;
    firstMax *= scaleMax; multiMax *= scaleMax;

    const savingsMin = firstMin + multiMin;
    const savingsMax = firstMax + multiMax;
    const discountedMin = baseMin - savingsMin;
    const discountedMax = baseMax - savingsMax;

    const onsite = mode === "onsite" ? ON_SITE[customer] : null;
    const onsiteMinimum = onsite?.minimum || 0;
    const finalMin = onsite ? Math.max(discountedMin, onsite.minimum) : discountedMin;
    const finalMax = onsite ? Math.max(discountedMax, onsite.minimum) : discountedMax;
    const onsiteFloorApplied = !!onsite && (discountedMin < onsite.minimum || discountedMax < onsite.minimum);

    const gstMin = finalMin * TAX_RATES.gst;
    const gstMax = finalMax * TAX_RATES.gst;
    const pstMin = issue.tax === "hardware" ? finalMin * TAX_RATES.pst : 0;
    const pstMax = issue.tax === "hardware" ? finalMax * TAX_RATES.pst : 0;

    return {
      manual: false, service, issue, quantity: qty, firstTime: !!firstTime,
      customerType: customer, serviceOption: mode, baseMin, baseMax, firstMin, firstMax,
      multiMin, multiMax, savingsMin, savingsMax, discountedMin, discountedMax,
      finalMin, finalMax, onsiteMinimum, onsiteFloorApplied, onsite,
      gstMin, gstMax, pstMin, pstMax
    };
  }

  const API = { SERVICES, DISCOUNTS, TAX_RATES, ON_SITE, calculateEstimate, money, range };
  if (typeof module !== "undefined" && module.exports) module.exports = API;
  if (typeof window !== "undefined") window.ALITECHGRID_ESTIMATOR = API;
  if (typeof document === "undefined") return;

  const form = document.getElementById("instant-estimator");
  if (!form) return;

  const serviceButtons = [...document.querySelectorAll("[data-est-service]")];
  const customerButtons = [...document.querySelectorAll("[data-customer-type]")];
  const issueSelect = document.querySelector("[data-est-issue]");
  const quantitySelect = document.querySelector("[data-est-quantity]");
  const quantityWrap = document.querySelector("[data-quantity-wrap]");
  const quantityNote = document.querySelector("[data-quantity-note]");
  const serviceOption = document.querySelector("[data-service-option]");
  const firstTime = document.querySelector("[data-first-time]");
  const resultTitle = document.querySelector("[data-result-title]");
  const resultIssue = document.querySelector("[data-result-issue]");
  const resultPrice = document.querySelector("[data-result-price]");
  const resultPriceLabel = document.querySelector("[data-result-price-label]");
  const basePrice = document.querySelector("[data-base-price]");
  const firstRow = document.querySelector("[data-first-discount-row]");
  const firstValue = document.querySelector("[data-first-discount]");
  const multiRow = document.querySelector("[data-multi-discount-row]");
  const multiValue = document.querySelector("[data-multi-discount]");
  const savingsRow = document.querySelector("[data-savings-row]");
  const savingsValue = document.querySelector("[data-total-savings]");
  const onsiteRow = document.querySelector("[data-onsite-row]");
  const onsiteValue = document.querySelector("[data-onsite-minimum]");
  const modeNote = document.querySelector("[data-service-mode-note]");
  const manualReview = document.querySelector("[data-manual-review]");
  const standardResult = document.querySelector("[data-standard-result]");
  const gstPlanning = document.querySelector("[data-gst-planning]");
  const pstPlanning = document.querySelector("[data-pst-planning]");
  const pstLabel = document.querySelector("[data-pst-label]");
  const taxNote = document.querySelector("[data-tax-note]");
  const detailsLink = document.querySelector("[data-result-details]");
  const requestButton = document.querySelector("[data-prepare-request]");
  const whatsappButton = document.querySelector("[data-est-whatsapp]");
  const evidenceInput = document.querySelector("[data-evidence-input]");
  const evidencePreview = document.querySelector("[data-evidence-preview]");
  const evidenceImage = document.querySelector("[data-evidence-image]");
  const evidenceName = document.querySelector("[data-evidence-name]");
  const evidenceMeta = document.querySelector("[data-evidence-meta]");
  const evidenceRemove = document.querySelector("[data-evidence-remove]");
  const secureUpload = document.querySelector("[data-secure-upload]");
  const estimateIdNode = document.querySelector("[data-estimate-id]");

  let selectedService = "desktop";
  let selectedCustomerType = "home";
  let evidenceUrl = null;
  const estimateId = `ATG-${new Date().toISOString().slice(2,10).replaceAll("-","")}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  if (estimateIdNode) estimateIdNode.textContent = estimateId;

  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get("service");
  if (requestedService && SERVICES[requestedService]) selectedService = requestedService;
  if (params.get("customer") === "business") selectedCustomerType = "business";

  function populateIssues() {
    const service = SERVICES[selectedService];
    issueSelect.replaceChildren(...Object.entries(service.issues).map(([key, item]) => {
      const option = document.createElement("option");
      option.value = key; option.textContent = item.label; return option;
    }));
    quantitySelect.disabled = !service.multiDevice;
    quantityWrap.classList.toggle("quantity-disabled", !service.multiDevice);
    quantityNote.textContent = service.multiDevice
      ? "Multi-device saving applies when 2 or more eligible devices are serviced under the same request."
      : "This service uses scope-based pricing. Multi-device repair discount does not apply automatically.";
    if (!service.multiDevice) quantitySelect.value = "1";
  }

  function selectService(key) {
    selectedService = key;
    serviceButtons.forEach((button) => {
      const active = button.dataset.estService === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-checked", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    populateIssues(); render();
  }

  function selectCustomerType(type) {
    selectedCustomerType = type === "business" ? "business" : "home";
    customerButtons.forEach((button) => {
      const active = button.dataset.customerType === selectedCustomerType;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-checked", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    render();
  }

  function serviceModeText(mode, customer) {
    if (mode === "onsite") {
      const config = ON_SITE[customer];
      return `${config.label}: planning minimum ${money(config.minimum)} before applicable tax. It covers the confirmed local service call and up to the first 60 minutes; extra time or extended travel is approved first.`;
    }
    if (mode === "pickup") return "Pickup / return is arranged by location and repair type. Any transport charge is confirmed before service and is not automatically added to this estimate.";
    if (mode === "remote") return "Remote support has no on-site service-call minimum. It is offered only when the issue can be handled safely and effectively at a distance.";
    if (mode === "location") return "Service at a confirmed location uses the displayed labour range; location and appointment details are confirmed before service.";
    return "Service method is not selected yet. On-site, pickup/return, remote support or a confirmed location can be arranged after review.";
  }

  function currentCalculation() {
    return calculateEstimate(selectedService, issueSelect.value, quantitySelect.value, firstTime.checked, selectedCustomerType, serviceOption.value);
  }

  function currentWhatsAppMessage(calculation) {
    const data = new FormData(form);
    const evidenceFile = evidenceInput.files?.[0];
    const estimateText = calculation.manual ? "Manual estimate required" : `${range(calculation.finalMin, calculation.finalMax)} CAD before applicable taxes/parts`;
    return `Hello AliTechGrid Canada. I would like help with this service.\n\nEstimate ID: ${estimateId}\nCustomer type: ${calculation.customerType === "business" ? "Small business" : "Home / personal"}\nService: ${calculation.service.title}\nProblem: ${calculation.issue.label}\nDevices: ${calculation.quantity || 1}\nPreferred service: ${serviceOption.options[serviceOption.selectedIndex]?.text || "Not sure"}\nCity: ${data.get("city") || "Not provided"}\nBrand / model: ${data.get("model") || "Not provided"}\nPreliminary estimate: ${estimateText}\nFirst-time customer: ${calculation.firstTime ? "Yes" : "No"}\n\nProblem details: ${data.get("problem") || "Not provided"}\nScreenshot/photo: ${evidenceFile ? "Selected — I will attach it in WhatsApp." : "Not selected"}\n\nI understand the website estimate is preliminary and subject to diagnosis, approved scope, parts, promotional eligibility and applicable taxes.`;
  }

  function updateWhatsApp(calculation) {
    if (!whatsappButton) return;
    const message = currentWhatsAppMessage(calculation);
    whatsappButton.href = window.ALITECHGRID_WHATSAPP?.makeUrl?.(message) || `https://wa.me/16726719982?text=${encodeURIComponent(message)}`;
  }

  function render() {
    const calculation = currentCalculation();
    resultTitle.textContent = calculation.service.title;
    resultIssue.textContent = calculation.issue.label;
    detailsLink.href = calculation.service.detail;

    manualReview.hidden = !calculation.manual;
    standardResult.hidden = calculation.manual;
    if (calculation.manual) {
      modeNote.textContent = serviceModeText(calculation.serviceOption, calculation.customerType);
      updateWhatsApp(calculation); return;
    }

    resultPrice.textContent = `${range(calculation.finalMin, calculation.finalMax)} CAD`;
    resultPriceLabel.textContent = calculation.serviceOption === "onsite" ? "Estimated on-site service range" : "Estimated eligible labour";
    basePrice.textContent = range(calculation.baseMin, calculation.baseMax);

    const hasFirst = calculation.firstMin > 0 || calculation.firstMax > 0;
    firstRow.hidden = !hasFirst;
    if (hasFirst) firstValue.textContent = `−${range(calculation.firstMin, calculation.firstMax)}`;

    const hasMulti = calculation.multiMin > 0 || calculation.multiMax > 0;
    multiRow.hidden = !hasMulti;
    if (hasMulti) multiValue.textContent = `−${range(calculation.multiMin, calculation.multiMax)}`;

    const hasSavings = calculation.savingsMin > 0 || calculation.savingsMax > 0;
    savingsRow.hidden = !hasSavings;
    if (hasSavings) savingsValue.textContent = range(calculation.savingsMin, calculation.savingsMax);

    onsiteRow.hidden = calculation.serviceOption !== "onsite";
    if (calculation.serviceOption === "onsite") onsiteValue.textContent = `${money(calculation.onsiteMinimum)} minimum`;
    modeNote.textContent = serviceModeText(calculation.serviceOption, calculation.customerType);

    gstPlanning.textContent = range(calculation.gstMin, calculation.gstMax);
    if (calculation.issue.tax === "software") {
      pstLabel.textContent = "software-only service";
      pstPlanning.textContent = "$0 planning amount";
      taxNote.textContent = "B.C. services to software are generally PST-exempt. GST may still apply. Actual tax depends on final scope and AliTechGrid's collection obligations.";
    } else if (calculation.issue.tax === "hardware") {
      pstLabel.textContent = "hardware-related, if applicable";
      pstPlanning.textContent = range(calculation.pstMin, calculation.pstMax);
      taxNote.textContent = "B.C. hardware repair/installation related services can be subject to 7% PST. GST may also apply. Actual tax is finalized on the approved quote or invoice.";
    } else {
      pstLabel.textContent = "mixed scope — confirm after diagnosis";
      pstPlanning.textContent = "To be confirmed";
      taxNote.textContent = "Mixed hardware/software work can have different PST treatment. GST/PST, if applicable, is finalized after the taxable service components are known.";
    }
    updateWhatsApp(calculation);
  }

  function bindRadioGroup(buttons, dataKey, selectFn) {
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => selectFn(button.dataset[dataKey]));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowRight","ArrowLeft","ArrowDown","ArrowUp","Home","End"].includes(event.key)) return;
        event.preventDefault(); let next = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % buttons.length;
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + buttons.length) % buttons.length;
        if (event.key === "Home") next = 0; if (event.key === "End") next = buttons.length - 1;
        selectFn(buttons[next].dataset[dataKey]); buttons[next].focus();
      });
    });
  }
  bindRadioGroup(serviceButtons, "estService", selectService);
  bindRadioGroup(customerButtons, "customerType", selectCustomerType);

  issueSelect.addEventListener("change", render);
  quantitySelect.addEventListener("change", render);
  serviceOption.addEventListener("change", render);
  firstTime.addEventListener("change", render);
  form.querySelectorAll('input[name="model"],input[name="city"],textarea[name="problem"]').forEach((field) => field.addEventListener("input", render));

  const resetEvidence = () => {
    if (evidenceUrl) URL.revokeObjectURL(evidenceUrl);
    evidenceUrl = null; evidenceInput.value = ""; evidencePreview.hidden = true;
    evidenceImage.removeAttribute("src"); evidenceName.textContent = ""; evidenceMeta.textContent = ""; render();
  };

  evidenceInput.addEventListener("change", () => {
    const file = evidenceInput.files?.[0];
    if (!file) return resetEvidence();
    if (!/^image\/(png|jpeg|webp)$/i.test(file.type)) { window.alert("Please choose a PNG, JPG/JPEG or WebP image."); return resetEvidence(); }
    if (file.size > 10 * 1024 * 1024) { window.alert("Please choose an image smaller than 10 MB."); return resetEvidence(); }
    if (evidenceUrl) URL.revokeObjectURL(evidenceUrl);
    evidenceUrl = URL.createObjectURL(file); evidenceImage.src = evidenceUrl; evidenceName.textContent = file.name;
    evidenceMeta.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB · selected locally, not uploaded`; evidencePreview.hidden = false; render();
  });
  evidenceRemove.addEventListener("click", resetEvidence);

  const configuredUpload = window.ALITECHGRID_CONFIG?.estimateUploadUrl?.trim?.();
  if (configuredUpload && /^https:\/\//i.test(configuredUpload)) {
    secureUpload.href = configuredUpload; secureUpload.target = "_blank"; secureUpload.rel = "noopener noreferrer"; secureUpload.hidden = false;
  }

  requestButton.addEventListener("click", () => {
    const calculation = currentCalculation();
    const data = new FormData(form);
    const estimateText = calculation.manual ? "Manual estimate required" : `${range(calculation.finalMin, calculation.finalMax)} CAD before applicable taxes/parts`;
    const evidenceFile = evidenceInput.files?.[0];
    const subject = encodeURIComponent(`AliTechGrid estimate review - ${estimateId} - ${calculation.service.title}`);
    const body = encodeURIComponent(
`PRELIMINARY ESTIMATE REVIEW REQUEST\n\nEstimate ID: ${estimateId}\nCustomer type: ${calculation.customerType === "business" ? "Small business" : "Home / personal"}\nService: ${calculation.service.title}\nProblem: ${calculation.issue.label}\nDevices: ${calculation.quantity || 1}\nFirst-time customer: ${calculation.firstTime ? "Yes" : "No"}\nPreliminary estimate: ${estimateText}\nPreferred service option: ${serviceOption.options[serviceOption.selectedIndex]?.text || "Not sure"}\n\nBrand / model: ${data.get("model") || "Not provided"}\nCity: ${data.get("city") || "Not provided"}\nProblem description: ${data.get("problem") || "Not provided"}\n\nCustomer name: ${data.get("name") || "Not provided"}\nCustomer email: ${data.get("email") || "Not provided"}\nPhone: ${data.get("phone") || "Not provided"}\n\nScreenshot/photo selected: ${evidenceFile ? evidenceFile.name + " (Please attach this image manually to this email before sending.)" : "No"}\n\nThis website estimate is preliminary and is subject to diagnosis, approved scope, parts availability, promotional eligibility and applicable taxes.`);
    window.location.href = `mailto:sales@alitechgrid.com?subject=${subject}&body=${body}`;
  });

  selectService(selectedService);
  selectCustomerType(selectedCustomerType);
})();
