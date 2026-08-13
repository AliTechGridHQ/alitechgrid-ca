(() => {
  "use strict";

  const CONTACT_EMAIL = "contact@alitechgrid.com";
  const WHATSAPP_NUMBER = "16726719982";

  const PHYSICAL_LAB_NOTE =
    "Where physical equipment practice is required for this training plan, AliTechGrid will arrange and schedule the practical session. Date, location, joining instructions, applicable safety requirements and equipment procedures will be provided separately. Any required physical lab and any related cost will be identified in the final confirmed plan before payment.";

  const plans = {
    "desktop-support": {
      code: "DSA",
      title: "Desktop Support Analyst",
      hours: 16,
      support: 2,
      group: 649,
      private: 999,
      team: 2399,
      physicalLab: true,
      prereq: "Basic computer use is sufficient. No previous technician job experience is required. Learners with very limited Windows/Linux familiarity may use the included Skills Completion Support for listed core outcomes.",
      skills: [
        "Endpoint setup and employee-use configuration",
        "Windows/Linux installation, drivers and patching",
        "Hardware/software incident troubleshooting",
        "User profiles, peripherals, Wi-Fi/VPN and basic TCP/IP support",
        "Ticket documentation and post-fix validation"
      ],
      final: "Receive a simulated desktop-support ticket, diagnose the fault, configure or repair the endpoint, validate service and document closure."
    },
    "help-desk": {
      code: "HDT",
      title: "Help Desk Technician",
      hours: 8,
      support: 2,
      group: 349,
      private: 549,
      team: 1499,
      physicalLab: false,
      prereq: "Basic computer and internet use is sufficient. The workshop is designed for new or early-career support learners.",
      skills: [
        "Incident intake and problem clarification",
        "Account/application/basic connectivity troubleshooting",
        "Technical-document and knowledge-base research",
        "Remote user guidance and escalation",
        "Problem/solution logging and ticket closure"
      ],
      final: "Handle a simulated support call from intake through troubleshooting, escalation decision, user communication and closure."
    },
    "service-desk": {
      code: "SDA",
      title: "Service Desk Analyst",
      hours: 8,
      support: 2,
      group: 349,
      private: 549,
      team: 1499,
      physicalLab: false,
      prereq: "Basic computer use is required. Previous customer-service experience is helpful but not required.",
      skills: [
        "Incident vs service-request classification",
        "Priority and basic SLA awareness",
        "Remote diagnostics and first-line resolution",
        "Escalation with useful technical evidence",
        "Knowledge-base and service-restoration documentation"
      ],
      final: "Process a simulated service-desk queue, resolve one incident, escalate one correctly and produce closure documentation."
    },
    "computer-technician": {
      code: "CT",
      title: "Computer Technician",
      hours: 16,
      support: 2,
      group: 649,
      private: 999,
      team: 2399,
      physicalLab: true,
      prereq: "Basic computer use is required. Hardware activities are performed using safe handling procedures and suitable lab equipment.",
      skills: [
        "PC/laptop hardware inspection and safe handling",
        "RAM/SSD/storage diagnosis and upgrades",
        "BIOS/UEFI and boot troubleshooting",
        "Windows/Linux installation, drivers and updates",
        "Post-repair functional testing and documentation"
      ],
      final: "Complete a break/fix scenario: diagnose, replace or configure the required component/software, boot successfully and verify the system."
    },
    "network-support": {
      code: "NST",
      title: "Network Support Technician",
      hours: 16,
      support: 2,
      group: 649,
      private: 999,
      team: 2399,
      physicalLab: true,
      prereq: "Basic computer use is required. Previous networking experience is not mandatory, but learners should be comfortable using Windows or Linux command-line tools during guided labs.",
      skills: [
        "TCP/IP, IPv4, gateway, DHCP and DNS troubleshooting",
        "Switching, routing and VLAN concepts",
        "Wi-Fi/VPN and connected-device support",
        "ping, traceroute and ipconfig/ifconfig diagnostics",
        "Connectivity validation, basic security checks and incident documentation"
      ],
      final: "Troubleshoot a small-business LAN/Wi-Fi incident, restore connectivity, verify DNS/gateway access and document the resolution."
    },
    "computer-network": {
      code: "CNT",
      title: "Computer Network Technician",
      hours: 24,
      support: 4,
      group: 899,
      private: 1399,
      team: 3199,
      physicalLab: true,
      prereq: "Recommended: basic TCP/IP and computer-support knowledge, or completion of equivalent Network Support Technician fundamentals. This pathway moves faster and includes broader network operations tasks.",
      skills: [
        "LAN/WAN and workstation network-service installation",
        "Switching, VLANs, addressing and routing fundamentals",
        "Network access, monitoring and performance checks",
        "Backup/recovery and basic security/quality-control tasks",
        "Windows/Linux networking plus shell/Python scripting basics"
      ],
      final: "Build and validate a small network, introduce a fault, troubleshoot it, perform a backup/verification task and document the change."
    },
    "cloud-support": {
      code: "CLD",
      title: "Systems Administration & Cloud Support",
      hours: 12,
      support: 2,
      group: 499,
      private: 749,
      team: 1899,
      physicalLab: false,
      prereq: "Recommended: basic Windows/Linux and TCP/IP familiarity. The track is practical foundation training, not a cloud-engineer certification program.",
      skills: [
        "Windows/Linux administration basics",
        "Virtual machines / compute",
        "IAM and least-privilege access",
        "Storage and VPC/VNet networking concepts",
        "Backup, logs, monitoring and validation"
      ],
      final: "Deploy and validate a small cloud/system environment with user access, networking and monitoring checks."
    },
    "automation": {
      code: "AUT",
      title: "Python & PowerShell IT Automation",
      hours: 12,
      support: 2,
      group: 499,
      private: 749,
      team: 1899,
      physicalLab: false,
      prereq: "Basic computer use is required. Previous scripting experience is helpful but not required; the course focuses on small support/operations automations rather than advanced software development.",
      skills: [
        "Practical scripting fundamentals",
        "Files, CSV/JSON and log parsing",
        "Endpoint/network health checks",
        "Input validation, error handling and logging",
        "Reusable operations utility and reporting"
      ],
      final: "Build, run and explain a working automation utility for a support or infrastructure use case."
    },
    "ai-support": {
      code: "AIO",
      title: "AI-Assisted IT Support & Operations",
      hours: 6,
      support: 1,
      group: 249,
      private: 399,
      team: 999,
      physicalLab: false,
      prereq: "Basic computer use and familiarity with common support tasks are recommended. Labs use authorized, synthetic, public or otherwise approved data only.",
      skills: [
        "Responsible AI use in support workflows",
        "Incident/log/error summarization",
        "Troubleshooting and knowledge-base drafting",
        "Verification of AI recommendations against evidence",
        "Credential, customer-data and privacy safeguards"
      ],
      final: "Use AI on an authorized synthetic incident, verify the recommendation technically and produce a safe support note."
    }
  };

  const q = (selector) => document.querySelector(selector);
  const fmtMoney = (amount) =>
    `CAD ${new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(amount)}`;

  const sessionSuffix = (() => {
    try {
      const existing = sessionStorage.getItem("atgTrainingEstimateSuffix");
      if (existing) return existing;
      const created = Math.random().toString(36).slice(2, 6).toUpperCase().padEnd(4, "X");
      sessionStorage.setItem("atgTrainingEstimateSuffix", created);
      return created;
    } catch (_) {
      return "PLAN";
    }
  })();

  function currentPlan() {
    const role = q("#role");
    return plans[(role && role.value) || "desktop-support"] || plans["desktop-support"];
  }

  function clampParticipants(value) {
    const numeric = Number(value || 1);
    if (!Number.isFinite(numeric)) return 1;
    return Math.max(1, Math.min(6, Math.round(numeric)));
  }

  function estimateReference(plan) {
    const now = new Date();
    const datePart =
      String(now.getFullYear()) +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0");
    return `ATG-TRN-${datePart}-${plan.code}-${sessionSuffix}`;
  }

  function preparedDate() {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date());
  }

  function ensurePhysicalLabBlock() {
    let wrap = q("#out-physical-wrap");
    if (wrap) return wrap;

    const finalBlock = q("#out-final")?.closest(".estimate-plan");
    if (!finalBlock) return null;

    wrap = document.createElement("div");
    wrap.className = "estimate-plan atg-physical-lab-note";
    wrap.id = "out-physical-wrap";
    wrap.hidden = true;
    wrap.innerHTML =
      '<h3>Physical Skills Lab — If Required</h3>' +
      '<p id="out-physical"></p>';
    finalBlock.insertAdjacentElement("afterend", wrap);
    return wrap;
  }

  function buildMessage(data) {
    return [
      "Hello AliTechGrid Canada.",
      "",
      "Please confirm this Initial Training Plan & Estimate:",
      `Reference: ${data.reference}`,
      `Training: ${data.title}`,
      `Core training: ${data.hours} instructional hours`,
      `Skills Completion Support: up to ${data.support} hour${data.support === 1 ? "" : "s"} included`,
      `Format: ${data.formatText}`,
      `Participants: ${data.participants}`,
      `Delivery: ${data.deliveryText}`,
      `Current level: ${data.level}`,
      data.physicalLab ? "Physical Skills Lab: If required for the confirmed plan, scheduled separately by AliTechGrid." : "",
      `Estimated subtotal: ${fmtMoney(data.fee)} (${data.feeNote})`,
      `Suggested deposit after confirmation: ${fmtMoney(data.deposit)} before applicable taxes`,
      `Estimated balance: ${fmtMoney(data.balance)} before applicable taxes`,
      data.goal ? `Goal: ${data.goal}` : "",
      "",
      "Please confirm the final scope, schedule, prerequisites, physical-lab requirements if applicable, location, applicable taxes, cancellation/refund terms and payment instructions."
    ].filter(Boolean).join("\n");
  }

  function update() {
    const roleEl = q("#role");
    const formatEl = q("#format");
    const participantEl = q("#participants");
    const deliveryEl = q("#delivery");
    const levelEl = q("#level");
    const goalEl = q("#goal");
    if (!roleEl || !formatEl || !participantEl || !deliveryEl || !levelEl || !goalEl) return;

    const p = currentPlan();
    const format = formatEl.value;
    let participants = clampParticipants(participantEl.value);
    const delivery = deliveryEl.value;
    const level = levelEl.value || "Not specified";
    const goal = goalEl.value.trim();

    if (format === "private") {
      participants = 1;
      participantEl.value = "1";
      participantEl.disabled = true;
    } else {
      participantEl.disabled = false;
      participantEl.value = String(participants);
    }

    let fee = 0;
    let feeNote = "";
    let formatText = "";
    let paymentSchedule = "";
    let depositRate = 0.25;

    if (format === "group") {
      fee = p.group * participants;
      feeNote = `${participants} participant${participants === 1 ? "" : "s"} × ${fmtMoney(p.group)}/person`;
      formatText = `Small group · ${participants} participant${participants === 1 ? "" : "s"}`;
      paymentSchedule = "25% booking deposit after scope/schedule confirmation; remaining 75% due before training unless otherwise agreed in writing.";
    } else if (format === "private") {
      fee = p.private;
      feeNote = "Private 1-to-1 package";
      formatText = "Private 1-to-1";
      paymentSchedule = "25% booking deposit after scope/schedule confirmation; remaining 75% due before training unless otherwise agreed in writing.";
    } else {
      fee = p.team;
      feeNote = `Business-team package · selected ${participants} participant${participants === 1 ? "" : "s"} · up to 6 included`;
      formatText = `Business team · ${participants} participant${participants === 1 ? "" : "s"} (up to 6 included)`;
      depositRate = 0.50;
      paymentSchedule = "50% booking deposit after scope/schedule confirmation; remaining 50% due before delivery unless a written business purchase-order arrangement is approved.";
    }

    const deliveryText =
      delivery === "online"
        ? "Live online"
        : delivery === "onsite"
          ? "Customer on-site · travel/lab requirements confirmed separately"
          : "AliTechGrid-arranged / scheduled location";

    const deposit = Math.round(fee * depositRate * 100) / 100;
    const balance = Math.round((fee - deposit) * 100) / 100;
    const reference = estimateReference(p);

    q("#out-title").textContent = p.title;
    q("#out-description").textContent = "Practical role/skill-track training with defined core outcomes and final validation.";
    q("#out-reference").textContent = reference;
    q("#out-date").textContent = preparedDate();
    q("#out-hours").textContent = `${p.hours} instructional hours`;
    q("#out-support").textContent = `Up to ${p.support} hour${p.support === 1 ? "" : "s"} included`;
    q("#out-format").textContent = formatText;
    q("#out-participants").textContent = String(participants);
    q("#out-delivery").textContent = deliveryText;
    q("#out-level").textContent = level;
    q("#out-fee").textContent = fmtMoney(fee);
    q("#out-fee-note").textContent = feeNote;
    q("#out-deposit").textContent = fmtMoney(deposit);
    q("#out-balance").textContent = fmtMoney(balance);
    q("#out-payment-schedule").textContent = paymentSchedule;
    q("#out-prereq").textContent = p.prereq;
    q("#out-skills").innerHTML = p.skills.map((item) => `<li>${item}</li>`).join("");
    q("#out-final").textContent = p.final;

    const physicalWrap = ensurePhysicalLabBlock();
    if (physicalWrap) {
      const physicalText = q("#out-physical");
      if (physicalText) physicalText.textContent = p.physicalLab ? PHYSICAL_LAB_NOTE : "";
      physicalWrap.hidden = !p.physicalLab;
    }

    const goalWrap = q("#out-goal-wrap");
    q("#out-goal").textContent = goal;
    goalWrap.hidden = !goal;

    const data = {
      reference,
      title: p.title,
      hours: p.hours,
      support: p.support,
      formatText,
      participants,
      deliveryText,
      level,
      physicalLab: p.physicalLab,
      fee,
      feeNote,
      deposit,
      balance,
      goal
    };
    const message = buildMessage(data);

    q("#wa-estimate").href =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    const subject = `AliTechGrid Training Estimate ${reference} — ${p.title}`;
    q("#email-estimate").href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  }

  const params = new URLSearchParams(window.location.search);
  if (params.get("role") && plans[params.get("role")]) q("#role").value = params.get("role");
  if (["group", "private", "team"].includes(params.get("format"))) q("#format").value = params.get("format");
  if (params.get("participants")) q("#participants").value = String(clampParticipants(params.get("participants")));
  if (["scheduled", "online", "onsite"].includes(params.get("delivery"))) q("#delivery").value = params.get("delivery");

  ["role", "format", "participants", "delivery", "level", "goal"].forEach((id) => {
    const el = q(`#${id}`);
    if (el) {
      el.addEventListener("change", update);
      el.addEventListener("input", update);
    }
  });

  const printButton = q("#print-estimate");
  if (printButton) {
    printButton.addEventListener("click", () => window.print());
  }

  update();
})();
