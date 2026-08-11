AliTechGrid Canada — Final Professional Website Update
Generated: 2026-08-11

PURPOSE
This is a production overlay for the existing GitHub Pages repository:
AliTechGridHQ/alitechgrid-ca

WHAT THIS UPDATE ADDS / REFINES
- Customer-first dynamic service selector: Desktop, Laptop, Mobile, Wi-Fi, Network, Router
- Preliminary estimator with home vs small-business service modes
- 10% eligible-labour first-time customer discount
- 10% eligible-labour multi-device saving on additional qualifying devices
- 20% maximum combined promotional labour discount
- GST/PST planning display with final tax confirmed after scope is known
- WhatsApp Business integration: +1 672 671 9982
- Primary business phone preserved: +1 778-358-4040
- Stronger "We come to you" positioning for home and small-business service
- Pickup & return service positioning
- Four distinct, purpose-selected website images with poster text/incorrect campaign claims cropped out:
  * Home on-site support
  * Small-business IT support
  * Computer/laptop repair
  * Pickup & return
- No Tesla-specific campaign wording on the live homepage
- No GTA, placeholder phone numbers, or unsupported 100% satisfaction claim

FILES TO UPLOAD / REPLACE
At repository root:
- index.html
- services.html
- estimate.html
- book.html
- contact.html

Under assets/css:
- local-it.css
- estimate.css

Under assets/js:
- local-services.js
- estimate.js
- whatsapp.js

Under assets/img:
- alitechgrid-home-service.jpg
- alitechgrid-business-service.jpg
- alitechgrid-repair-service.jpg
- alitechgrid-pickup-service.jpg

DO NOT DELETE OR REPLACE UNLESS INTENDED
Keep the existing production files including:
- CNAME
- assets/css/styles.css
- assets/js/site-config.js
- assets/js/main.js
- existing AliTechGrid logo/favicon assets
- websites.html
- about.html
- privacy.html
- terms.html
- accessibility.html
- robots.txt
- sitemap.xml
- chatbot assets
- manifest.webmanifest
- Zoho booking configuration

DEPLOYMENT
1. Back up the repository or confirm the latest commit is recoverable.
2. Extract this ZIP locally.
3. Upload the files INSIDE the extracted package to their matching repository paths.
4. Do not upload the ZIP itself as the website.
5. Commit with a clear message, for example:
   Finalize customer-first website with professional service imagery
6. Wait for GitHub Pages to deploy.
7. Test https://alitechgrid.ca/ in a private/incognito browser window.

POST-DEPLOYMENT CHECKLIST
- Homepage dynamic Desktop/Laptop/Mobile/Wi-Fi/Network/Router selector changes correctly
- Book Service opens the existing Zoho booking flow
- Get Estimate opens estimate.html
- WhatsApp opens +1 672 671 9982 with the prepared message
- Call links use +1 778-358-4040
- Home on-site image appears in "We come to you"
- Small-business image appears only in the business section
- Repair image appears only with repair services
- Pickup image appears only in pickup/return
- Desktop and mobile layouts remain clean
- No Tesla/GTA/incorrect campaign phone text appears in website HTML

VERIFICATION
See TEST_REPORT.txt. The package passed 156/156 automated production-overlay checks, including image integrity, SEO/structured data, dynamic selector hooks, WhatsApp configuration, estimator execution, discount/tax logic, JavaScript syntax, responsive CSS markers, local-reference validation, and local HTTP smoke testing.

IMPORTANT PRICING NOTE
The estimator is a planning / preliminary estimate, not a binding quotation. Parts, travel outside the normal service area, unusual complexity, advanced recovery, and additional approved work may change the final amount. Applicable taxes are finalized after the taxable service components are known.


FINAL VISUAL FIX (2026-08-11)
- Replace index.html and assets/css/local-it.css from this package.
- Keep all five assets/img/alitechgrid-*-service.jpg files from the package.
- The fix removes empty image-panel space and normalizes image sizing/cropping across desktop, tablet and mobile.
