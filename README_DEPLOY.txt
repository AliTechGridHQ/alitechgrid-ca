ALITECHGRID.CA — CUSTOMER-PROBLEM / REPAIR-SHOP REDESIGN
Build date: 2026-08-10
Target repository: AliTechGridHQ/alitechgrid-ca
Target branch: main
Publishing: GitHub Pages, repository root

WHAT THIS PATCH CHANGES
1. index.html
   - Rebuilt first viewport as a real-world tech repair/service counter.
   - Shows desktop, laptop, mobile, Wi-Fi, switch and router visually.
   - Makes Book Service, Call and Get an Estimate immediate actions.
   - Adds customer-problem cards instead of requiring technical knowledge.
   - Separates home technology and small-business technology.
2. services.html
   - Keeps the problem-oriented detailed service page and aligns navigation wording.
3. assets/css/local-it.css
   - New responsive repair-shop visual layer.

IMPORTANT
- This is a SAFE DROP-IN PATCH for the existing production repository.
- DO NOT delete existing files or the assets folder.
- DO NOT upload this ZIP file directly into GitHub Pages.
- Extract the ZIP first, then upload the files/folders inside it and allow GitHub to replace matching files.
- Preserve the existing CNAME, robots.txt, sitemap.xml, assets/img/, assets/js/, websites.html, book.html, estimate.html, about.html, contact.html, privacy.html, terms.html, accessibility.html and 404.html.
- The existing booking URL remains in assets/js/site-config.js and this patch does not replace it.

RECOMMENDED COMMIT MESSAGE
Redesign Canada homepage around customer repair problems

POST-DEPLOY CHECKS
- Open https://alitechgrid.ca/ in a private/incognito window.
- Confirm desktop, laptop, mobile, Wi-Fi, switch and router appear in the first viewport.
- Test Book Service, Call and Estimate buttons.
- Test Computer is slow, Wi-Fi keeps dropping, Network/printer and Website problem cards.
- Open services.html and test its section links.
- Resize browser to mobile width and confirm there is no horizontal scrolling.
- Confirm the AliTechGrid logo, footer, and existing booking page still load.
