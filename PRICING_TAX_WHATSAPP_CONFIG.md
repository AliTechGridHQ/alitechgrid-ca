# AliTechGrid Canada — Estimator, On-Site Service & WhatsApp Configuration

## Customer communication
- Main business phone: +1 778-358-4040
- WhatsApp Business: +1 672 671 9982
- WhatsApp click-to-chat number (digits only): 16726719982
- General email: contact@alitechgrid.com
- Support email: support@alitechgrid.com
- Estimate email: sales@alitechgrid.com

## Preliminary estimator policy
The website produces planning ranges, not binding quotes. Complex, parts-dependent, physical-damage, data-recovery and custom business/network work is routed to manual review.

### Promotional labour discounts
- First-time customer: 10% off eligible labour.
- Multi-device: 10% off labour attributable to each additional eligible desktop/laptop/mobile device in the same request.
- Combined promotional labour discount cap: 20%.
- Discounts exclude parts, licences, third-party costs, taxes, extended travel and custom projects.
- Discounts do not reduce an applicable on-site service-call minimum.

### Proposed on-site service-call planning minimums
- Home / personal: CAD $129.
- Small business: CAD $159.
- The on-site minimum is presented as a service-call planning floor rather than an extra fee stacked on top of the standard labour range.
- It is described as covering the confirmed local service call and up to the first 60 minutes. Extra time and extended travel require approval.
- These are AliTechGrid policy/configuration values and can be changed in `assets/js/estimate.js` under `ON_SITE`.

## Tax presentation
- GST planning rate in code: 5%.
- PST planning rate in code: 7% for hardware-classified services.
- Software-only services show a $0 PST planning amount.
- Mixed work says PST is to be confirmed.
- Actual tax must be finalized on the approved quote/invoice based on final scope and AliTechGrid's tax-collection obligations.

## Photo / screenshot handling
The static GitHub Pages estimator previews a selected image locally only. It does not upload the file. Customers are directed to attach the image inside WhatsApp or to the prepared email. If a secure upload form is added later, set `window.ALITECHGRID_CONFIG.estimateUploadUrl` in `assets/js/site-config.js`.

## WhatsApp workflow
`assets/js/whatsapp.js` centralizes the WhatsApp Business number and click-to-chat URL. The estimator builds a pre-filled WhatsApp message containing the estimate ID, customer type, service, problem, device count, service mode, city and preliminary range. The customer can then attach a screenshot/photo directly in WhatsApp.
