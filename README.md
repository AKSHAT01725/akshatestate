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
| `properties.js` | Built-in property data (14 real rental listings, Gurukul and Memnagar) |
| `search.js` | Search & filter logic |
| `admin.html` / `admin.css` / `admin.js` | Admin panel: add, edit, hide and delete listings |
| `firebase-config.js` | Firebase project settings (shared by the site and admin) |
| `firestore.rules` | Security rules to publish in Firebase (public read, admin-only write) |
| `blog.html` | Blog index (lists all articles) |
| `blog/` | All 12 blog article pages (each has a Back to Blog button) |

## Contact

- **Phone / WhatsApp:** +91 81412 93057
- **Email:** akshatestate.ahd@gmail.com (replace if needed)

## Tech

- HTML5, CSS3, Vanilla JS
- Font: **Poppins** (Google Fonts)
- Icons: Font Awesome 6
- No frameworks

## Customise

1. Edit properties in `properties.js` (14 real listings exported on 2026-10-03)
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

Open `admin.html` on the live site (for example `https://akshatestate.com/admin.html`) to add, edit, duplicate, hide or delete listings, feature rentals on the homepage, and download a JSON backup. The **Enquiries** tab shows everything visitors send through the website forms. The page is set to `noindex` and is not linked from the website.

The public site reads listings from Firestore (collection `properties`). If Firebase is unreachable or still empty, it falls back to the built-in listings in `properties.js`, so the site never shows a blank page. Visitors get changes within about 2 minutes (listings are cached in the browser briefly to keep Firebase reads low).

### One-time setup (Firebase Console, project `akshatestate-c9868`)

1. **Authentication > Sign-in method:** turn on **Email/Password**.
2. **Authentication > Users > Add user:** create the admin email and a strong password.
3. **Firestore Database:** create the database if it does not exist yet (production mode).
4. **Firestore Database > Rules:** paste the contents of `firestore.rules` (it covers both listings and enquiries), the admin email in the file is already set to `akshat@gmail.com` (it must match the user from step 2), then **Publish**. This is what actually protects your data.
5. **Authentication > Settings > User actions:** untick **Enable create (sign-up)** so nobody else can register an account.
6. **Authentication > Settings > Authorized domains:** make sure your live domain is listed.
7. Open `admin.html`, sign in, and click **Import listings** once to copy the listings from `properties.js` into Firebase.

Optional: in Google Cloud Console > APIs & Services > Credentials, restrict the browser API key to your website's domain.

### Good to know

- Photos are pasted as image links (https). Uploading files needs Firebase Storage, which requires the Blaze plan.
- Listings marked **Live** off are hidden from every page. Deleting is permanent, so use the backup button first if unsure.
- The homepage **Featured Rentals** row follows the "Homepage" switch in the admin. Before you import, it follows `FEATURED_RENTAL_IDS` in `properties.js`.
- The static pages in `properties/` (one file per current listing, 14 in total; see `properties/README-pages.txt`) and the "Related Properties" cards inside blog articles are plain HTML and are **not** updated from the admin.
- The site must be served over http(s). Opening files by double-click still works for the public pages (built-in listings), but the admin panel and live data need a web address or `localhost`.

### Enquiries

Every website form now saves to Firestore (collection `inquiries`) and appears live in **admin.html > Enquiries**:

| Where the visitor sent it | Shown as |
|---|---|
| Contact page form | Contact form |
| Enquiry box on area and listing pages (Gurukul, Memnagar, Sola, rent, buy, 1 BHK pages and so on) | Area page enquiry |
| "Send Inquiry" box on a property page | Property enquiry (with a link to that property) |
| List Your Property form | Owner listing request (WhatsApp still opens as before) |

In the admin, tabs split enquiries by type (Property enquiry, Owner listing request, Contact form, Area page enquiry) and by status (New, Contacted, Closed). Tapping **Call** on a new enquiry marks it Contacted automatically; **WhatsApp** opens a blank chat with the visitor. You can also mark enquiries manually, search, delete, and download everything as a CSV. New enquiries show a red count on the Enquiries tab and a small notice while the page is open.

- Visitors can only **create** an enquiry. They can never read, change or delete any (see `firestore.rules`).
- If saving fails (offline, blocked, or rules not published yet), the visitor sees a message with a WhatsApp link so the lead is not lost.
- Anyone who knows the public API key could still send junk enquiries straight to Firebase. If that ever happens, turn on **Firebase App Check** (reCAPTCHA) for Firestore.
- Enquiries are personal data (names and phone numbers). Only the admin account can read them; consider deleting old ones from time to time.

## Added in the latest round

- **Tell Us What You Need** (`#requirement` on `index.html` and `rent.html`): tenant requirement form. Opens WhatsApp with the details and saves them to the admin Enquiries tab (source "enquiry"), using the existing Firestore rules.
- **Shortlist / compare:** the heart on any card saves a home in the visitor's browser (`localStorage` key `ae_favorites`). `shortlist.html` lists saved homes, compares them side by side, and shares them on WhatsApp with a link like `shortlist.html?ids=14,5,27`. The header shows a heart with a count on wide screens, and the mobile menu has a My Shortlist link.
- **Rent page:** sort (newest, price, area) and quick chips (Bachelors allowed, With parking, Furnished / Semi). Sort is also on the Buy, Properties, area and Ahmedabad pages. "Bachelors allowed" uses `PROPERTY_DETAIL_DEFAULTS` / `PROPERTY_EXTRAS` in `properties.js` (set real values per listing). "With parking" uses the parking count or "Parking" in the amenities.
- **Area pages** (`gurukul.html`, `memnagar.html`, `sola.html`): about text, nearby landmarks, a rent table worked out from the live listings, and an FAQ. `ahmedabad.html` compares the three areas. Edit the text in each page's `#about-area` section. Check the landmarks and metro details before publishing; they can change.
- **FAQs** with FAQ schema on the homepage, rent page, area pages and Ahmedabad page.
- **SEO:** `sitemap.xml`, `robots.txt`, canonical tags (blog articles and listing pages included), Open Graph / Twitter preview image (`og-image.png`), WebSite, BreadcrumbList, BlogPosting and RealEstateListing data. Add new pages to `sitemap.xml` by hand. Regenerate `og-image.png` if you change the branding.
- **Polish:** back-to-top button, WhatsApp + Call bar pinned to the bottom of property pages on phones, lazy-loaded images.

### Email notifications (EmailJS)

Every lead form (contact form, area and property-page enquiry boxes, the "Tell us what you need" requirement form, and List Your Property) also sends you an email through EmailJS, in addition to saving it to the Enquiries tab. If either the save or the email fails, the visitor still sees success as long as the other worked; they only see the WhatsApp fallback when both fail.

The IDs live at the top of the enquiry section in `main.js` (`AE_EMAILJS`): service `service_g19zso8`, template `template_fu86367`.

**Set up the template in the EmailJS dashboard** (Email Templates > your template). Set **To Email** to your own address (a fixed address, not a variable), and use these variables:

| Variable | Contains |
|---|---|
| `{{subject}}` | e.g. "New contact form: Ravi Patel (9825012345)" (use as the email subject) |
| `{{message}}` | Everything in one readable block (type, name, phone, email, property, message, and so on). A template with just this one variable already shows the whole enquiry |
| `{{form_type}}` | Contact form, Property enquiry, Area page enquiry, Rental requirement or Owner listing request |
| `{{name}}`, `{{phone}}`, `{{email}}` | Visitor details (`{{email}}` is empty if they didn't give one) |
| `{{property}}` | Property title, for property-page enquiries |
| `{{property_id}}`, `{{property_title}}`, `{{property_price}}`, `{{property_location}}`, `{{property_link}}`, `{{property_image}}` | The exact listing the visitor asked about (ID, title, price such as "₹18,000 per month", area, page link and photo). Empty for forms that aren't about one property |
| `{{property_details}}` | The same listing details as a ready-made block (ID, listing type, price, location, layout, area, bathrooms, furnishing, link). Already included inside `{{message}}` for property enquiries |
| `{{note}}` | Only what the visitor typed in the message box |
| `{{page_url}}`, `{{submitted_at}}` | The page it came from, and the time in IST |
| `{{reply_to}}` | The visitor's email, for the Reply-To field |

**Protect the account** (EmailJS dashboard > Account > Security): add your website domain as an allowed origin, and consider turning on reCAPTCHA. The public key and IDs are visible to anyone who views the site's source, so without a domain restriction someone could use them to send emails from your account and use up your monthly quota (free plan: 200 emails/month; EmailJS also allows 1 request per second).

Property enquiries include the full listing details for every listing, including ones added from the admin panel. Floor, parking and bachelors info are deliberately left out of the email until you have confirmed those values in the admin, because the original listings still carry placeholder values for them.

## Added: spam protection, Book a visit, enquiry workflow

- **Spam protection:** every lead form (contact, area/property enquiry, requirement, List Your Property, Book a visit) gets a hidden honeypot box and a 2-second timing check from `aeAddHoneypot` / `aeIsBot` in `main.js`. A caught submission is dropped silently and the sender still sees the thank-you message. Firebase App Check can be added later if spam gets heavy.
- **Book a visit:** a "Book a visit" button on every property page (the 14 static pages and `property-details.html`). The visitor picks a date (next 60 days) and a time slot (four 3-hour slots covering the 9 AM to 9 PM visiting hours), WhatsApp opens with the request, and it is saved to Enquiries as a property enquiry with requirement "Visit request" and emailed through EmailJS. No change to `firestore.rules` was needed. Slots are listed in `AE_VISIT_SLOTS` in `main.js`.
- **Static property pages now save enquiries:** the demo pages had a leftover script that cleared the form before it could be sent. It is removed, and each page carries `data-property-id` / `data-property-title` so its enquiries are tied to the right listing.
- **Admin Enquiries tab:** a "Visit requests" tab; an "N enquiries" link on each listing (opens that property's enquiries) and a count on each enquiry; WhatsApp opens a ready-made reply and, like Call, marks a new enquiry as Contacted; the CSV has a Property ID column.
