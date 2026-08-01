# AliTechGrid Canada Website

Production-ready static website for `alitechgrid.ca`.

## One required edit before launch

Open:

`assets/js/site-config.js`

Replace:

`PASTE_FULL_ZOHO_LIVE_LINK_HERE`

with the complete Zoho Calendar **Live link**.

Example:

```js
bookingUrl: "https://calendar.zohocloud.ca/zc/your-complete-link",
```

Do not paste the Embed HTML into this configuration file. Use the Live link.

## GitHub upload

Upload the **contents of this folder**, not the outer folder itself, to the root of:

`AliTechGridHQ/alitechgrid-ca`

The repository root must contain `index.html`, `CNAME`, `assets/`, and the other files.

## GitHub Pages

After uploading:

1. Open repository **Settings → Pages**.
2. Source: **Deploy from a branch**.
3. Branch: **main**.
4. Folder: **/(root)**.
5. Save.
6. Test the temporary GitHub Pages URL before changing DNS.

## Custom domain

The `CNAME` file is already set to:

`alitechgrid.ca`

Do not change DNS until the GitHub Pages temporary site works.

## Website contents

- Responsive home page
- Services page
- Zoho booking page integration
- About and contact pages
- Privacy, service terms and accessibility pages
- SEO titles and descriptions
- LocalBusiness structured data
- Sitemap and robots file
- Mobile manifest and icons
- GitHub Pages `CNAME` and `.nojekyll`

## Important launch decisions still required

Confirm before advertising:

- Full Zoho booking URL
- Final service area
- Public telephone number, if one will be used
- Diagnostic/travel/pickup fees
- Payment methods
- Warranty policy
- Canadian legal and privacy review of policy drafts
