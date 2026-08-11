AliTechGrid Canada — Dynamic Customer Service Homepage Update
Build date: 2026-08-10

PURPOSE
This patch changes the homepage from a static repair-shop hero into a customer-controlled service counter.

NEW HOMEPAGE EXPERIENCE
- Six accessible, radio-style service selectors: Desktop, Laptop, Mobile, Wi-Fi, Network, Router.
- Selecting a service updates the problem list, service title and relevant details link without reloading the page.
- Web Design is intentionally kept out of the repair selector and shown under Business Technology Services.
- Business Technology Services: Website Design, Small-Business IT, Cloud & Business Email.
- The full AliTechGrid Canada logo remains the primary site identity.
- The repair-shop image is retained lower on the homepage as a high-quality trust/branding visual.
- The image file is the exact 1254 × 1254 PNG supplied for the website update.

FILES TO UPLOAD / REPLACE
1. index.html
2. services.html
3. assets/css/local-it.css
4. assets/js/local-services.js   (NEW)
5. assets/img/alitechgrid-repair-workbench.png

IMPORTANT
- Upload the files/folders INSIDE this package to the root of AliTechGridHQ/alitechgrid-ca.
- Do NOT upload the ZIP file itself as the website.
- Do NOT delete the existing CNAME, robots.txt, sitemap.xml, policy pages, assets/css/styles.css, assets/js/main.js, assets/js/site-config.js, booking configuration, chatbot files, logos or other existing production files.
- Keep the new assets/js/local-services.js path exactly as supplied.

AFTER DEPLOYMENT
1. Open alitechgrid.ca in an InPrivate/Incognito browser window.
2. Select all six service icons and confirm the solution panel changes immediately.
3. Test Book Service, Call, Estimate and service-detail links.
4. Check the homepage on desktop and a mobile phone.
5. Confirm the repair-shop image loads sharply in the Professional Local Technology Support section.

SUGGESTED GITHUB COMMIT MESSAGE
Rebuild homepage with dynamic service selector and business technology services
