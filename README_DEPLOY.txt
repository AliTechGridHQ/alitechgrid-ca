AliTechGrid Canada — WhatsApp + On-Site Service + Estimator Update

This is a cumulative patch for the current customer-first/dynamic homepage and estimator design.

Upload/replace these files in the repository root while preserving the rest of the production repository:
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
- assets/img/alitechgrid-repair-workbench.png

DO NOT delete or replace unless intentionally changing them:
- CNAME
- assets/js/site-config.js (contains the live Zoho booking URL)
- assets/js/main.js
- assets/css/styles.css
- websites.html, about.html, privacy.html, terms.html, accessibility.html
- robots.txt, sitemap.xml and other production files

WhatsApp Business configured in this update:
+1 672 671 9982
Click-to-chat number: 16726719982

Suggested commit message:
Add WhatsApp Business and on-site home service to customer estimate flow

After GitHub Pages publishes, test in an InPrivate/private browser:
1. Homepage service selector and service-specific preliminary-estimate link.
2. Homepage WhatsApp buttons and floating WhatsApp button.
3. Estimate Home vs Small Business selection.
4. On-site option: $129 home planning minimum / $159 small-business planning minimum.
5. First-time and multi-device discounts.
6. WhatsApp Estimate opens a pre-filled conversation to +1 672 671 9982.
7. Screenshot/photo preview remains local; attach the image manually inside WhatsApp.
8. Zoho booking calendar still loads from the existing site-config.js.
9. Call links use +1 778-358-4040.
10. Test desktop and mobile layouts.
