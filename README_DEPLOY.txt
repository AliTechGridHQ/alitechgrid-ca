AliTechGrid Canada — Final Professional Website Update
Date: 2026-08-11

PURPOSE
This production overlay keeps the interactive customer-first hero and strengthens AliTechGrid's four highest-value service visuals:
1. Home / on-site support
2. Pickup & Return
3. Small-business IT support
4. Computer & laptop repair

WHAT CHANGED
- Pickup & Return is now a full dedicated business section, not a small card.
- The interactive Desktop / Laptop / Mobile / Wi-Fi / Network / Router selector remains the homepage entry point.
- Home, Pickup, Business and Repair images are each used once only.
- Images are constrained to professional landscape dimensions on desktop/tablet/mobile.
- WhatsApp Business remains +1 672 671 9982.
- Main phone remains +1 778-358-4040.
- Existing preliminary estimator, first-time discount, multi-device discount, tax planning and booking hooks are preserved.
- No Tesla-specific wording, GTA claims, placeholder phone numbers, or unsupported 100% satisfaction claim are included.

DEPLOYMENT
This is an overlay package for the existing AliTechGrid GitHub Pages repository.
Upload the CONTENTS of this package to the matching repository paths.
Do NOT upload the ZIP itself as the website.
Do NOT delete existing production files that are not included here.

IMPORTANT — PRESERVE EXISTING PRODUCTION FILES
Keep the existing:
- CNAME
- assets/css/styles.css
- assets/js/main.js
- assets/js/site-config.js (including the working Zoho booking URL)
- existing logos, favicon and manifest assets
- chatbot assets
- privacy/terms/accessibility pages
- sitemap.xml and robots.txt
- any other production pages not included in this overlay

FILES IN THIS UPDATE
- index.html
- services.html
- estimate.html
- book.html
- contact.html
- assets/css/local-it.css
- assets/css/estimate.css
- assets/js/local-services.js
- assets/js/estimate.js
- assets/js/whatsapp.js
- assets/img/alitechgrid-home-service.jpg
- assets/img/alitechgrid-pickup-service.jpg
- assets/img/alitechgrid-business-service.jpg
- assets/img/alitechgrid-repair-service.jpg
- PRICING_TAX_WHATSAPP_CONFIG.md
- TEST_REPORT.txt

POST-DEPLOYMENT CHECK
1. Wait for GitHub Pages deployment.
2. Open alitechgrid.ca in an InPrivate/Incognito window.
3. Test Desktop, Laptop, Mobile, Wi-Fi, Network and Router selectors.
4. Test Get Preliminary Estimate.
5. Test WhatsApp from the hero and Pickup & Return section.
6. Test Book Service / Zoho booking.
7. Review the homepage on desktop and a real phone.
8. Confirm the four images are cropped cleanly and no image dominates the page.
9. Confirm Pickup & Return appears immediately after the We Come to You section.

RECOMMENDED COMMIT MESSAGE
Strengthen on-site and pickup-return customer journey with professional service imagery

FINAL 2026-08-11 MOBILE-SERVICE UPDATE
- Added assets/img/alitechgrid-mobile-service.jpg as a fifth, secondary business-value image.
- Homepage order: interactive selector -> We Come to You -> Pickup & Return -> Mobile service capability -> Small-Business IT -> Computer/Laptop Repair -> process -> CTA.
- The mobile-service image is a clean landscape crop; poster headings/icons were excluded.
- Do not delete existing production assets not included in this patch (CNAME, styles.css, site-config.js, main.js, logos, chatbot assets, policy pages, sitemap, etc.).
- Upload files INSIDE the ZIP to the matching repository paths.
- After GitHub Pages publishes, test index.html, estimate.html, book.html and contact.html in an InPrivate/Incognito window and on a phone.
