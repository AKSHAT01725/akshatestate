# Akshat Estate — Rental Homes & Real Estate in Ahmedabad

All files are in **one folder**. Open `index.html` in a browser to view.

## Files

| File | Description |
|------|-------------|
| `index.html` | Homepage |
| `properties.html` | All properties + filters |
| `property-details.html` | Single property view |
| `buy.html` / `rent.html` | Buy & rent listings |
| `list-your-property.html` | List your property |
| `about.html` / `contact.html` | About & contact |
| `gurukul.html` | Area: Gurukul |
| `memnagar.html` | Area: Memnagar |
| `sola.html` | Area: Sola |
| `ahmedabad.html` | Area: Ahmedabad |
| `style.css` | Styles (Poppins font) |
| `main.js` | Nav, WhatsApp, forms |
| `properties.js` | Demo property data |
| `search.js` | Search & filter logic |
| `admin.html` / `admin.css` / `admin.js` | Admin panel: add, edit, hide and delete listings |
| `firebase-config.js` | Firebase project settings (shared by the site and admin) |
| `firestore.rules` | Security rules to publish in Firebase (public read, admin-only write) |
| `blog.html` | Blog index (lists all articles) |
| `blog/` | All 12 blog article pages (each has a Back to Blog button) |

## Contact

- **Phone / WhatsApp:** +91 81412 93057
- **Email:** info@akshatestate.com (replace if needed)

## Tech

- HTML5, CSS3, Vanilla JS
- Font: **Poppins** (Google Fonts)
- Icons: Font Awesome 6
- No frameworks

## Customise

1. Edit properties in `properties.js`
2. Connect contact form to Formspree / EmailJS (see comments in `main.js`)
3. Replace email if different

## Rental-first homepage (how to edit)

- **Featured Rentals:** edit `FEATURED_RENTAL_IDS` at the bottom of `properties.js` (6 to 8 property IDs).
- **WhatsApp messages:** built by `getPropertyWhatsAppMessage()` in `properties.js`. Detail pages and cards use the same text.
- **Rental search:** `#rental-search-form` on `index.html`; it sends filters to `rent.html` (see `initHeroSearch` in `search.js`).
- **List Your Property form:** `list-your-property.html` has no backend, so it opens WhatsApp with the owner's details pre-filled (`initOwnerForm` in `main.js`). Swap in Formspree/EmailJS to receive submissions by email or to collect photos.
- **Testimonials:** the homepage section is commented out until you have real client feedback.
- **Trust section:** add business hours and your Google Business Profile link where marked in `index.html`.
- **New guides:** `blog/cost-to-rent-flat-ahmedabad.html` and `blog/furnished-flats-for-rent-ahmedabad.html`.

## Admin panel (Firebase)

Open `admin.html` on the live site (for example `https://akshatestate.com/admin.html`) to add, edit, duplicate, hide or delete listings, feature rentals on the homepage, and download a JSON backup. The page is set to `noindex` and is not linked from the website.

The public site reads listings from Firestore (collection `properties`). If Firebase is unreachable or still empty, it falls back to the built-in listings in `properties.js`, so the site never shows a blank page. Visitors get changes within about 2 minutes (listings are cached in the browser briefly to keep Firebase reads low).

### One-time setup (Firebase Console, project `akshatestate-c9868`)

1. **Authentication > Sign-in method:** turn on **Email/Password**.
2. **Authentication > Users > Add user:** create the admin email and a strong password.
3. **Firestore Database:** create the database if it does not exist yet (production mode).
4. **Firestore Database > Rules:** paste the contents of `firestore.rules`, replace `REPLACE-WITH-ADMIN-EMAIL@example.com` with the admin email from step 2, then **Publish**. This is what actually protects your data.
5. **Authentication > Settings > User actions:** untick **Enable create (sign-up)** so nobody else can register an account.
6. **Authentication > Settings > Authorized domains:** make sure your live domain is listed.
7. Open `admin.html`, sign in, and click **Import listings** once to copy the listings from `properties.js` into Firebase.

Optional: in Google Cloud Console > APIs & Services > Credentials, restrict the browser API key to your website's domain.

### Good to know

- Photos are pasted as image links (https). Uploading files needs Firebase Storage, which requires the Blaze plan.
- Listings marked **Live** off are hidden from every page. Deleting is permanent, so use the backup button first if unsure.
- The homepage **Featured Rentals** row follows the "Homepage" switch in the admin. Before you import, it follows `FEATURED_RENTAL_IDS` in `properties.js`.
- The static pages in `properties/` (one file per demo listing) and the "Related Properties" cards inside blog articles are plain HTML and are **not** updated from the admin.
- The site must be served over http(s). Opening files by double-click still works for the public pages (built-in listings), but the admin panel and live data need a web address or `localhost`.
