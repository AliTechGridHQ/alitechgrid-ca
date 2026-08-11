(() => {
  "use strict";

  const services = {
    desktop: {
      icon: "PC",
      title: "Desktop Computer Repair & Setup",
      description: "Help with slow computers, startup failures, Windows problems, upgrades and everyday desktop setup.",
      problems: [
        "Slow, freezing or crashing computer",
        "Windows startup or software problems",
        "SSD, RAM and storage upgrade assessment",
        "New computer setup and data migration"
      ],
      bookLabel: "Book desktop service",
      detailHref: "services.html#computer"
    },
    laptop: {
      icon: "LT",
      title: "Laptop Repair & Upgrade Support",
      description: "Practical diagnosis for performance, startup, battery, charging, Windows and upgrade-related laptop problems.",
      problems: [
        "Laptop is slow, freezing or overheating",
        "Won't start or Windows is failing",
        "Battery, charger or keyboard assessment",
        "SSD, RAM and storage upgrade assessment"
      ],
      bookLabel: "Book laptop service",
      detailHref: "services.html#computer"
    },
    mobile: {
      icon: "MB",
      title: "Mobile Phone & Tablet Support",
      description: "Setup, migration and initial troubleshooting for common phone and tablet software, charging and connectivity issues.",
      problems: [
        "New phone or tablet setup",
        "Data, photo and account migration",
        "Charging or battery problem assessment",
        "Wi-Fi, Bluetooth and software troubleshooting"
      ],
      bookLabel: "Book mobile support",
      detailHref: "services.html#mobile"
    },
    wifi: {
      icon: "Wi",
      title: "Wi-Fi Troubleshooting & Setup",
      description: "Help with weak coverage, dropped connections, new wireless setup and devices that will not stay connected.",
      problems: [
        "Weak or unreliable Wi-Fi signal",
        "Devices keep disconnecting",
        "New Wi-Fi setup or security review",
        "Printer and smart-device connectivity"
      ],
      bookLabel: "Book Wi-Fi help",
      detailHref: "services.html#network"
    },
    network: {
      icon: "NW",
      title: "Home & Small-Business Networking",
      description: "Practical support for switches, wired connections, printers, workstations and small-office device connectivity.",
      problems: [
        "Network switch and Ethernet setup",
        "Printer or workstation connectivity",
        "Small-office device connection issues",
        "Basic network organization and troubleshooting"
      ],
      bookLabel: "Book network support",
      detailHref: "services.html#network"
    },
    router: {
      icon: "RT",
      title: "Router Setup & Support",
      description: "Configuration and troubleshooting for new or existing routers used in homes and small offices.",
      problems: [
        "New router installation and setup",
        "Internet or local connection problems",
        "Wireless name, password and security setup",
        "Connecting computers, printers and other devices"
      ],
      bookLabel: "Book router support",
      detailHref: "services.html#network"
    }
  };

  const choices = [...document.querySelectorAll("[data-service]")];
  const title = document.querySelector("[data-panel-title]");
  const description = document.querySelector("[data-panel-description]");
  const problems = document.querySelector("[data-panel-problems]");
  const icon = document.querySelector("[data-panel-icon]");
  const book = document.querySelector("[data-panel-book]");
  const estimate = document.querySelector("[data-panel-estimate]");
  const whatsapp = document.querySelector("[data-panel-whatsapp]");
  const details = document.querySelector("[data-panel-details]");

  if (!choices.length || !title || !description || !problems || !icon || !book || !details) return;

  const selectService = (key, focusPanel = false) => {
    const service = services[key];
    if (!service) return;

    choices.forEach((choice) => {
      const selected = choice.dataset.service === key;
      choice.classList.toggle("is-active", selected);
      choice.setAttribute("aria-checked", String(selected));
      choice.tabIndex = selected ? 0 : -1;
    });

    icon.textContent = service.icon;
    title.textContent = service.title;
    description.textContent = service.description;
    problems.replaceChildren(...service.problems.map((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      return li;
    }));
    book.textContent = service.bookLabel;
    if (estimate) estimate.href = `estimate.html?service=${encodeURIComponent(key)}`;
    if (whatsapp) {
      const message = `Hello AliTechGrid Canada. I need help with ${service.title}. My problem is: `;
      whatsapp.href = window.ALITECHGRID_WHATSAPP?.makeUrl?.(message) || `https://wa.me/16726719982?text=${encodeURIComponent(message)}`;
    }
    details.href = service.detailHref;

    if (focusPanel) title.focus?.({ preventScroll: true });
  };

  choices.forEach((choice, index) => {
    choice.addEventListener("click", () => selectService(choice.dataset.service));
    choice.addEventListener("keydown", (event) => {
      if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % choices.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + choices.length) % choices.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = choices.length - 1;
      const next = choices[nextIndex];
      selectService(next.dataset.service);
      next.focus();
    });
  });
})();
