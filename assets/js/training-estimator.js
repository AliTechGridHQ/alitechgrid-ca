
(() => {
  const plans = {
    "desktop-support": {
      title:"Desktop Support Analyst", hours:16, support:2, group:649, private:999, team:2399,
      skills:["Endpoint setup and employee-use configuration","Windows/Linux installation, drivers and patching","Hardware/software incident troubleshooting","User profiles, peripherals, Wi-Fi/VPN and basic TCP/IP support","Ticket documentation and post-fix validation"],
      final:"Receive a simulated desktop-support ticket, diagnose the fault, configure or repair the endpoint, validate service and document closure."
    },
    "help-desk": {
      title:"Help Desk Technician", hours:8, support:2, group:349, private:549, team:1499,
      skills:["Incident intake and problem clarification","Account/application/basic connectivity troubleshooting","Technical-document and knowledge-base research","Remote user guidance and escalation","Problem/solution logging and ticket closure"],
      final:"Handle a simulated support call from intake through troubleshooting, escalation decision, user communication and closure."
    },
    "service-desk": {
      title:"Service Desk Analyst", hours:8, support:2, group:349, private:549, team:1499,
      skills:["Incident vs service-request classification","Priority and basic SLA awareness","Remote diagnostics and first-line resolution","Escalation with useful technical evidence","Knowledge-base and service-restoration documentation"],
      final:"Process a simulated service-desk queue, resolve one incident, escalate one correctly and produce closure documentation."
    },
    "computer-technician": {
      title:"Computer Technician", hours:16, support:2, group:649, private:999, team:2399,
      skills:["PC/laptop hardware inspection and safe handling","RAM/SSD/storage diagnosis and upgrades","BIOS/UEFI and boot troubleshooting","Windows/Linux installation, drivers and updates","Post-repair functional testing and documentation"],
      final:"Complete a break/fix scenario: diagnose, replace or configure the required component/software, boot successfully and verify the system."
    },
    "network-support": {
      title:"Network Support Technician", hours:16, support:2, group:649, private:999, team:2399,
      skills:["TCP/IP, IPv4, gateway, DHCP and DNS troubleshooting","Switching, routing and VLAN concepts","Wi-Fi/VPN and connected-device support","ping, traceroute and ipconfig/ifconfig diagnostics","Connectivity validation, basic security checks and incident documentation"],
      final:"Troubleshoot a small-business LAN/Wi-Fi incident, restore connectivity, verify DNS/gateway access and document the resolution."
    },
    "computer-network": {
      title:"Computer Network Technician", hours:24, support:4, group:899, private:1399, team:3199,
      skills:["LAN/WAN and workstation network-service installation","Switching, VLANs, addressing and routing fundamentals","Network access, monitoring and performance checks","Backup/recovery and basic security/quality-control tasks","Windows/Linux networking plus shell/Python scripting basics"],
      final:"Build and validate a small network, introduce a fault, troubleshoot it, perform a backup/verification task and document the change."
    },
    "cloud-support": {
      title:"Systems Administration & Cloud Support", hours:12, support:2, group:499, private:749, team:1899,
      skills:["Windows/Linux administration basics","Virtual machines / compute","IAM and least-privilege access","Storage and VPC/VNet networking concepts","Backup, logs, monitoring and validation"],
      final:"Deploy and validate a small cloud/system environment with user access, networking and monitoring checks."
    },
    "automation": {
      title:"Python & PowerShell IT Automation", hours:12, support:2, group:499, private:749, team:1899,
      skills:["Practical scripting fundamentals","Files, CSV/JSON and log parsing","Endpoint/network health checks","Input validation, error handling and logging","Reusable operations utility and reporting"],
      final:"Build, run and explain a working automation utility for a support or infrastructure use case."
    },
    "ai-support": {
      title:"AI-Assisted IT Support & Operations", hours:6, support:1, group:249, private:399, team:999,
      skills:["Responsible AI use in support workflows","Incident/log/error summarization","Troubleshooting and knowledge-base drafting","Verification of AI recommendations against evidence","Credential, customer-data and privacy safeguards"],
      final:"Use AI on an authorized synthetic incident, verify the recommendation technically and produce a safe support note."
    }
  };

  const q = s => document.querySelector(s);
  const fmtMoney = n => new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD"}).format(n);
  function currentPlan(){ return plans[q("#role").value] || plans["desktop-support"]; }

  function update(){
    const p = currentPlan();
    const format = q("#format").value;
    const participants = Math.max(1, Math.min(6, Number(q("#participants").value || 1)));
    const delivery = q("#delivery").value;

    let fee = p[format];
    let feeNote = "";
    let formatText = "";
    if(format === "group"){ fee = p.group * participants; feeNote = participants === 1 ? "per participant" : `total for ${participants} participants at ${fmtMoney(p.group)} each`; formatText = `Small group · ${participants} participant${participants>1?"s":""}`; }
    if(format === "private"){ fee = p.private; feeNote = "private 1-to-1"; formatText = "Private 1-to-1"; q("#participants").value = 1; }
    if(format === "team"){ fee = p.team; feeNote = "business team · up to 6 participants"; formatText = "Business team · up to 6"; }

    const deliveryText = delivery === "online" ? "Live online" : delivery === "onsite" ? "Customer on-site" : "Scheduled location";
    const depositRate = format === "team" ? 0.50 : 0.25;
    const deposit = fee * depositRate;
    const balance = fee - deposit;

    q("#out-title").textContent = p.title;
    q("#out-hours").textContent = `${p.hours} instructional hours`;
    q("#out-support").textContent = `Up to ${p.support} hour${p.support>1?"s":""}`;
    q("#out-format").textContent = formatText;
    q("#out-delivery").textContent = deliveryText;
    q("#out-fee").textContent = fmtMoney(fee);
    q("#out-fee-note").textContent = feeNote;
    q("#out-deposit").textContent = fmtMoney(deposit);
    q("#out-balance").textContent = fmtMoney(balance);
    q("#out-skills").innerHTML = p.skills.map(x=>`<li>${x}</li>`).join("");
    q("#out-final").textContent = p.final;

    const goal = q("#goal").value.trim();
    const msg = [
      "Hello AliTechGrid Canada.",
      `I would like to request confirmation of this tentative training estimate:`,
      `Role: ${p.title}`,
      `Core training: ${p.hours} hours`,
      `Skills Completion Support: up to ${p.support} hours included`,
      `Format: ${formatText}`,
      `Delivery: ${deliveryText}`,
      `Tentative fee: ${fmtMoney(fee)} (${feeNote})`,
      goal ? `My goal: ${goal}` : "",
      "Please confirm the final scope, schedule, prerequisites, taxes and payment terms."
    ].filter(Boolean).join("\n");
    q("#wa-estimate").href = "https://wa.me/16726719982?text=" + encodeURIComponent(msg);
  }

  const params = new URLSearchParams(location.search);
  if(params.get("role") && plans[params.get("role")]) q("#role").value = params.get("role");
  ["role","format","participants","delivery","level","goal"].forEach(id => {
    const el = q("#"+id);
    if(el){ el.addEventListener("change",update); el.addEventListener("input",update); }
  });
  update();
})();
