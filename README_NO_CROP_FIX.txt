AliTechGrid Canada — Final No-Crop Image Fix
Date: 2026-08-11

WHAT CHANGED
- Removed the effective fixed-height/object-fit:cover behaviour from all five homepage business-value image sections.
- Service images now display their complete source image at the natural aspect ratio using width:100%, height:auto and object-fit:contain.
- The same no-crop behaviour is enforced on tablet and mobile layouts.
- Home/on-site and repair captions are placed in normal document flow instead of overlaying the photograph.
- Existing interactive selector, estimator, WhatsApp, booking and service-area content are unchanged.

FILES TO UPLOAD
- index.html
- assets/css/local-it.css
- assets/img/alitechgrid-home-service.jpg
- assets/img/alitechgrid-pickup-service.jpg
- assets/img/alitechgrid-mobile-service.jpg
- assets/img/alitechgrid-business-service.jpg
- assets/img/alitechgrid-repair-service.jpg
- assets/js/local-services.js
- assets/js/whatsapp.js
- estimate.html / assets/js/estimate.js only if your deployed version is older than the supplied package.

IMPORTANT
Upload the CONTENTS of the ZIP to the matching repository paths. Do not delete CNAME, existing styles.css, main.js, site-config.js, Zoho configuration, logos, policies, chatbot assets, sitemap or other production files.

Recommended commit message:
Fix service images to display full uncropped photos on all screen sizes
