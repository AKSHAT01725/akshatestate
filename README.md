# Akshat Estate — Rental Homes & Real Estate in Ahmedabad

Open `index.html` in a browser to view. The admin panel, live listings, enquiries and the service worker need the site to be served over http(s) (for example on GitHub Pages), not opened as a local file.

## Project structure

```
index.html, about.html, rent.html, contact.html …   public pages (kept in the root so every web address stays the same)
admin.html                                          only forwards old bookmarks to admin/ (you can delete it later)
admin/                                              the admin panel and its installable app: index.html, manifest.webmanifest, sw.js
blog/                                               blog articles and rental tools
properties/                                         one static page per listing
css/                                                style.css (site), admin.css (admin panel)
js/                                                 main.js, search.js, properties.js, reviews.js, reviews-data.js,
                                                    rental-tools.js, admin.js, firebase-config.js
images/                                             logo.png, og-image.png, icons/ (favicons) and admin/ (admin app icons)
fonts/                                              Poppins (self-hosted)
firebase/                                           firestore.rules (paste into the Firebase console; not used by the site)
tools/                                              add-structured-data.js (run with Node after changing listings; see Structured data)
favicon.ico, apple-touch-icon.png                   stay in the root (browsers look for them there)
sw.js, robots.txt, sitemap.xml, 404.html, offline.html, .nojekyll               must stay in the root
```

Rules of thumb: a new script goes in `js/`, a new stylesheet in `css/`, a new picture in `images/`, and a new page in the root (or `blog/`). Pages link to them as `css/style.css`, `js/main.js` and `images/logo.png` (with `../` in front for pages inside `blog/` or `properties/`).

## Hosting on GitHub Pages

1. Put the contents of this folder in the root of your repository (the `index.html` must be at the top level).
2. **Settings > Pages:** deploy from the `main` branch, folder `/ (root)`. Under *Custom domain* enter `akshatestate.com` and tick *Enforce HTTPS*. GitHub then creates a `CNAME` file in the repository; keep it there when you upload new versions.
3. `.nojekyll` (already included) makes GitHub serve the files exactly as they are. `404.html` is shown automatically for unknown addresses.
4. GitHub Pages file names are **case-sensitive** and extensions are optional: `about.html` is served at `/about`, and `1BHK-flats-for-rent-gurukul.html` must be linked with exactly that capitalisation.
5. Add your live domain (and `<username>.github.io` if you test there) to Firebase **Authentication > Settings > Authorized domains**, and to the allowed origins in your EmailJS dashboard.
6. Everything in the repository is public, including `firebase/firestore.rules` (it contains your admin email address) and this README. None of it contains secrets; the Firebase web keys are meant to be public.

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
| `css/style.css` | Styles (Poppins font, self-hosted from `fonts/`) |
| `js/main.js` | Nav, WhatsApp, forms |
| `js/properties.js` | Built-in property data (14 real rental listings, Gurukul and Memnagar) |
| `js/search.js` | Search & filter logic |
| `admin/index.html` / `css/admin.css` / `js/admin.js` | Admin panel: add, edit, hide and delete listings |
| `js/firebase-config.js` | Firebase project settings (shared by the site and admin) |
| `firebase/firestore.rules` | Security rules to publish in Firebase (public read, admin-only write) |
| `blog.html` | Blog index (lists all articles) |
| `blog/` | 12 blog articles plus 3 rental tools (each has a Back to Blog button) |
| `js/reviews-data.js` | Your real Google reviews (edit this file only) |
| `js/reviews.js` | Google reviews carousel and auto-rotate on the homepage |
| `js/rental-tools.js` | Budget calculator and tick-off checklists used by the 3 blog tools |
| `1room-for-rent.html` / `-gurukul` / `-memnagar` | 1 Room landing pages (same layout as the 1 RK pages) |
| `rental-agreement-help.html` | Short page on what a rental agreement covers and how we help |

## Contact

- **Phone / WhatsApp:** +91 81412 93057
- **Email:** akshatestate.ahd@gmail.com (replace if needed)

## Tech

- HTML5, CSS3, Vanilla JS
- Font: **Poppins**, self-hosted in `fonts/` (Latin subset, 4 weights, about 42 KB in total)
- Icons: Font Awesome 6
- No frameworks

## Customise

1. Edit properties in `js/properties.js` (14 real listings exported on 2026-10-03)
2. Connect contact form to Formspree / EmailJS (see comments in `js/main.js`)
3. Replace email if different

## Rental-first homepage (how to edit)

- **Featured Rentals:** edit `FEATURED_RENTAL_IDS` at the bottom of `js/properties.js` (6 to 8 property IDs).
- **WhatsApp messages:** built by `getPropertyWhatsAppMessage()` in `js/properties.js`. Detail pages and cards use the same text.
- **Rental search:** `#rental-search-form` on `index.html`; it sends filters to `rent.html` (see `initHeroSearch` in `js/search.js`).
- **List Your Property form:** `list-your-property.html` has no backend, so it opens WhatsApp with the owner's details pre-filled (`initOwnerForm` in `js/main.js`). Swap in Formspree/EmailJS to receive submissions by email or to collect photos.
- **Google reviews:** the homepage carousel (`#reviews`) reads the `REVIEWS` list in `js/reviews-data.js` (up to 12) and scrolls continuously (pauses on hover, touch and focus). It stays hidden until you paste in real Google reviews. Open `index.html?preview-reviews` to check the layout with placeholders.
- **Trust section:** add business hours and your Google Business Profile link where marked in `index.html`.
- **New guides:** `blog/cost-to-rent-flat-ahmedabad.html` and `blog/furnished-flats-for-rent-ahmedabad.html`.

## Admin panel (Firebase)

Open `admin/` on the live site (for example `https://akshatestate.com/admin/`) to add, edit, duplicate, hide or delete listings, feature rentals on the homepage, and download a JSON backup. The **Enquiries** tab shows everything visitors send through the website forms. The page is set to `noindex` and is not linked from the website.

The public site reads listings from Firestore (collection `properties`). If Firebase is unreachable or still empty, it falls back to the built-in listings in `js/properties.js`, so the site never shows a blank page. Visitors get changes within about 2 minutes (listings are cached in the browser briefly to keep Firebase reads low).

### One-time setup (Firebase Console, project `akshatestate-c9868`)

1. **Authentication > Sign-in method:** turn on **Email/Password**.
2. **Authentication > Users > Add user:** create the admin email and a strong password.
3. **Firestore Database:** create the database if it does not exist yet (production mode).
4. **Firestore Database > Rules:** paste the contents of `firebase/firestore.rules` (it covers both listings and enquiries), the admin email in the file is already set to `akshat@gmail.com` (it must match the user from step 2), then **Publish**. This is what actually protects your data.
5. **Authentication > Settings > User actions:** untick **Enable create (sign-up)** so nobody else can register an account.
6. **Authentication > Settings > Authorized domains:** make sure your live domain is listed.
7. Open `admin/`, sign in, and click **Import listings** once to copy the listings from `js/properties.js` into Firebase.

Optional: in Google Cloud Console > APIs & Services > Credentials, restrict the browser API key to your website's domain.

### Good to know

- Photos are pasted as image links (https). Uploading files needs Firebase Storage, which requires the Blaze plan.
- Listings marked **Live** off are hidden from every page. Deleting is permanent, so use the backup button first if unsure.
- The homepage **Featured Rentals** row follows the "Homepage" switch in the admin. Before you import, it follows `FEATURED_RENTAL_IDS` in `js/properties.js`.
- The static pages in `properties/` (one file per current listing, 14 in total; see `properties/README-pages.txt`) and the "Related Properties" cards inside blog articles are plain HTML and are **not** updated from the admin.
- The site must be served over http(s). Opening files by double-click still works for the public pages (built-in listings), but the admin panel and live data need a web address or `localhost`.

### Enquiries

Every website form now saves to Firestore (collection `inquiries`) and appears live in **admin/ > Enquiries**:

| Where the visitor sent it | Shown as |
|---|---|
| Contact page form | Contact form |
| Enquiry box on area and listing pages (Gurukul, Memnagar, Sola, rent, buy, 1 BHK pages and so on) | Area page enquiry |
| "Send Inquiry" box on a property page | Property enquiry (with a link to that property) |
| List Your Property form | Owner listing request (WhatsApp still opens as before) |

In the admin, the Enquiries screen has just four tabs: All, New, Contacted and Closed. The type of each enquiry (Property enquiry, Visit request, WhatsApp enquiry, Owner listing request, Contact form, Area page enquiry) shows as a label on its card, and the search box matches it, so typing "visit" or "owner" finds those. Tapping **Call** or **WhatsApp** on a new enquiry marks it Contacted automatically (WhatsApp opens a ready-made reply). Each card also has a New / Contacted / Closed switch, plus search, delete and CSV download. New enquiries show a red count on the Enquiries tab and a small notice while the page is open.

- Visitors can only **create** an enquiry. They can never read, change or delete any (see `firebase/firestore.rules`).
- If saving fails (offline, blocked, or rules not published yet), the visitor sees a message with a WhatsApp link so the lead is not lost.
- Anyone who knows the public API key could still send junk enquiries straight to Firebase. If that ever happens, turn on **Firebase App Check** (reCAPTCHA) for Firestore.
- Enquiries are personal data (names and phone numbers). Only the admin account can read them; consider deleting old ones from time to time.

## Added in the latest round

- **Tell Us What You Need** (`#requirement` on `index.html` and `rent.html`): tenant requirement form. Opens WhatsApp with the details and saves them to the admin Enquiries tab (source "enquiry"), using the existing Firestore rules.
- **Shortlist / compare:** the heart on any card saves a home in the visitor's browser (`localStorage` key `ae_favorites`). `shortlist.html` lists saved homes, compares them side by side, and shares them on WhatsApp with a link like `shortlist.html?ids=14,5,27`. The header shows a heart with a count on wide screens, and the mobile menu has a My Shortlist link.
- **Rent page:** sort (newest, price, area) and quick chips (Bachelors allowed, With parking, Furnished / Semi). Sort is also on the Buy, Properties, area and Ahmedabad pages. "Bachelors allowed" uses `PROPERTY_DETAIL_DEFAULTS` / `PROPERTY_EXTRAS` in `js/properties.js` (set real values per listing). "With parking" uses the parking count or "Parking" in the amenities.
- **Area pages** (`gurukul.html`, `memnagar.html`, `sola.html`): about text, nearby landmarks, a rent table worked out from the live listings, and an FAQ. `ahmedabad.html` compares the three areas. Edit the text in each page's `#about-area` section. Check the landmarks and metro details before publishing; they can change.
- **FAQs** with FAQ schema on the homepage, rent page, area pages and Ahmedabad page.
- **SEO:** `sitemap.xml`, `robots.txt`, canonical tags (blog articles and listing pages included), Open Graph / Twitter preview image (`images/og-image.png`), WebSite, BreadcrumbList, BlogPosting and RealEstateListing data. Add new pages to `sitemap.xml` by hand. Regenerate `images/og-image.png` if you change the branding.
- **Polish:** back-to-top button, WhatsApp + Call bar pinned to the bottom of property pages on phones, lazy-loaded images.

### Email notifications (EmailJS)

Every lead form (contact form, area and property-page enquiry boxes, the "Tell us what you need" requirement form, and List Your Property) also sends you an email through EmailJS, in addition to saving it to the Enquiries tab. If either the save or the email fails, the visitor still sees success as long as the other worked; they only see the WhatsApp fallback when both fail.

The IDs live at the top of the enquiry section in `js/main.js` (`AE_EMAILJS`): service `service_g19zso8`, template `template_fu86367`.

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

- **Spam protection:** every lead form (contact, area/property enquiry, requirement, List Your Property, Book a visit) gets a hidden honeypot box and a 2-second timing check from `aeAddHoneypot` / `aeIsBot` in `js/main.js`. A caught submission is dropped silently and the sender still sees the thank-you message. Firebase App Check can be added later if spam gets heavy.
- **Book a visit:** a "Book a visit" button on every property page (the 14 static pages and `property-details.html`). The visitor picks a date (next 60 days) and a time slot (four 3-hour slots covering the 9 AM to 9 PM visiting hours), WhatsApp opens with the request, and it is saved to Enquiries as a property enquiry with requirement "Visit request" and emailed through EmailJS. No change to `firebase/firestore.rules` was needed. Slots are listed in `AE_VISIT_SLOTS` in `js/main.js`.
- **Static property pages now save enquiries:** the demo pages had a leftover script that cleared the form before it could be sent. It is removed, and each page carries `data-property-id` / `data-property-title` so its enquiries are tied to the right listing.
- **Admin Enquiries tab:** visit requests are labelled on their cards and searchable; an "N enquiries" link on each listing (opens that property's enquiries) and a count on each enquiry; WhatsApp opens a ready-made reply and, like Call, marks a new enquiry as Contacted; the CSV has a Property ID column.

## Added: WhatsApp number capture, blog rental tools, owner extras

- **WhatsApp About This Property now asks for the visitor's mobile number first.** Tapping it on a property page (sidebar button, floating button, mobile WhatsApp bar) or on a listing card opens a small popup (number required, name optional). The number is saved to Enquiries as a property enquiry with requirement "WhatsApp enquiry" (new **WhatsApp enquiries** tab in the admin), emailed through EmailJS, and then WhatsApp opens. If saving or email fails or takes more than 6 seconds, WhatsApp still opens. The number is remembered on that device so a repeat tap is one step, and the same property is not saved twice within a minute. Request Image buttons and general "WhatsApp us" links are unchanged. The code is `initWhatsAppLead` in `js/main.js`; no change to `firebase/firestore.rules` was needed.
- **Blog rental tools:** `blog/rent-budget-calculator-ahmedabad.html`, `blog/moving-checklist-ahmedabad.html`, `blog/rental-agreement-checklist-ahmedabad.html`. Checklist ticks are saved in the visitor's browser only. All three are on the blog index and in `sitemap.xml`.
- **Owner extras** on `list-your-property.html`: a "How Listing With Us Works" section and an owner FAQ (with FAQ schema), plus `rental-agreement-help.html`. Check that the wording matches what you actually offer.

### Admin on a phone

The admin (`admin/`) is built to be used from a phone: Listings and Enquiries are a bottom navigation bar, "Add property" is a floating button within thumb reach, the add/edit form fills the screen with Save pinned at the bottom, the tabs and search stay at the top while you scroll, and all buttons and fields are sized for fingers (16px fields, so iPhones do not zoom in when you tap one).


### Fresh listings and reconfirm (admin)

- New listings get a **listed** date. Public cards show a green **New** tag for 7 days.
- Saving a listing, or tapping **Still available** on its row, sets the **checked** date. Public cards show "Updated today / N days ago" for up to 30 days. Older dates are hidden, so a stale date never appears on the site.
- Listings not checked in 30 days (or never) show an amber note and count under the **Needs check** tab. Tap **Still available**, or **Mark rented** to keep it on the site with a Rented tag.
- Listings imported before this update have no dates, so they show nothing publicly and appear under **Needs check** until you tap Still available once.

### Rented status and homepage order (admin)

- Each listing has an **Availability** section: **Available** or **Rented**, plus an optional **Available from** date.
- A rented flat stays on the website with a grey Rented tag, drops to the end of the lists, leaves the homepage Featured Rentals and the area rent tables, and tells search engines it is out of stock. On the property page, visitors see a note asking them to message you for similar flats.
- A future "Available from" date shows on the card ("Available from 15 Dec 2026"). A date that has passed is ignored.
- On each row: **Mark rented** / **Mark available**. The **Rented** tab lists them.
- **Homepage order:** next to the Homepage switch, each featured rental has up and down arrows and a position number. The order matches the website. Rented or hidden flats are left out of the numbering.

### Map, price guide, installable app, privacy

- **Map:** every property page shows a Google Map of the area only (not the exact address) with an "Open in Google Maps" link. The link text says the exact address is shared when a visit is booked.
- **Open now / Closed now:** hidden until you set your hours. In `js/main.js`, change `var AE_HOURS = null;` to for example `var AE_HOURS = { days: [1, 2, 3, 4, 5, 6], open: "10:00", close: "19:00" };` (0 = Sunday). It shows on property pages, the home page contact card and the contact page, using India time.
- **Rent price guide:** `rent-price-guide-ahmedabad.html` builds its tables from your live listings (rented flats are left out). It has no hand-typed prices, so it stays correct by itself.
- **Offline page and faster repeat visits:** `sw.js` and `offline.html`. It works on https only. To clear every visitor's saved copy after a big change, change `VERSION` in `sw.js`. The admin is never saved by it. The public website is deliberately **not** an installable app: no page links a manifest, so browsers do not offer visitors "Install".
- **Privacy:** `privacy-policy.html` now names Firebase, EmailJS, Google Analytics, Google Maps and what is saved in the browser. A one-line privacy note is added under every enquiry form, and a small notice with an OK button appears once per visitor. Please read the policy and the notice once and change anything that is not how you work.

### Favicons

Every page declares the same icon set. `favicon.ico` and `apple-touch-icon.png` stay in the site root (browsers and iPhones look for them there automatically); the other four (`favicon-16x16.png`, `favicon-32x32.png`, `android-chrome-192x192.png`, `android-chrome-512x512.png`) are in `images/icons/`. The links are relative (for example `favicon.ico`, or `../favicon.ico` for pages inside `blog/` and `properties/`), so they work from the domain root, from a subfolder, and when a page is opened as a local file. The "Add to Home Screen" icon in `manifest.webmanifest` uses the same artwork. To change the icon later, replace those files and keep the same names. When you add a new page, copy the six icon lines from an existing page in the same folder.

### Admin app (install on your phone or computer)

Only the admin can be installed, and only after you sign in. The sign-in screen has no manifest, so browsers offer nothing there; once you are signed in, `js/admin.js` attaches `admin/manifest.webmanifest` and shows an "Install app" bar. The public website has no manifest at all.

- **Android (Chrome) and desktop (Chrome, Edge):** sign in at `/admin/` and tap **Install app** in the bar (or use the browser's own install icon). "Not now" hides the bar for 30 days.
- **iPhone / iPad (Safari):** Apple has no install button, so the bar shows the steps: tap the Share button, then **Add to Home Screen**.
- **Icon and name:** "AE Admin" with a navy "A" icon (`images/admin/`), so it is easy to tell apart from the website's favicon. Replace those four files (same names and sizes) to change it.
- **How it is separated:** the admin has its own service worker (`admin/sw.js`, scope `/admin/` only), network first so you always get the latest admin; it never touches Firebase, EmailJS or the public pages. On iPhones the installed app keeps its own sign-in, so you sign in once inside it.
- **Signing out** removes the install bar and the manifest from the page. To remove the app itself, uninstall it like any other app.

### Insights tab (admin)

The **Insights** tab turns your enquiries into numbers, for the last 30 days, 90 days or all time: how many came in, how many are still waiting for a reply, contacted and closed; enquiries per week for the last 12 weeks; the listings people ask about most (with a "View" button that opens those enquiries); where enquiries come from (property, visit request, WhatsApp, contact form, owners); how many reach Closed; and live listings that nobody has asked about (a hint to refresh their photos or price). It uses the enquiries already loaded for the Enquiries screen (your latest 300), so it adds no Firebase reads. It does not show reply times, because the admin does not record when an enquiry changed status.

### Restore from a backup file (admin)

**Download backup** saves all listings as a JSON file. **Restore backup** reads such a file and shows what it would do before anything is written: how many listings are new, which ones would change (and which fields), how many are already the same, and any entries it will skip because they are incomplete. By default it only adds and updates; a listing that is in Firebase but not in the file is left alone unless you tick "Also remove...". A fresh backup of the current listings is downloaded first (untick to skip). Restore also accepts older backup files, including dates written the old way.

### Structured data (for Google)

- **Business:** `index.html` and `contact.html` describe Akshat Estate as a `RealEstateAgent` with address (Gurukul Rd, Memnagar, 380052), phone, email, logo, Instagram, the areas you serve, and a map position. The map position was read from the Google Map on the contact page; check it is your office pin. Opening hours are deliberately not included, because they are not on the site yet.
- **Each listing:** every page in `properties/` has `RealEstateListing` data (price, rent per month, bedrooms, bathrooms, floor area, furnishing, amenities, photos, area) and a breadcrumb trail. The live property page (`property-details.html`) writes the same data from Firebase and also says whether the listing is available or Rented. The static pages do **not** say available or rented, because they are not updated from the admin. Floor number, parking and "bachelors allowed" are left out until those values are confirmed.
- **Keeping it current:** after you regenerate the pages in `properties/`, or change a listing in `js/properties.js`, run `node tools/add-structured-data.js` from the site root (needs Node 16 or newer, nothing to install). It rewrites the markup, can be run again safely, and warns if a page's visible text and the data disagree.
- **Checking it:** paste a page address into Google's Rich Results Test or the Schema Markup Validator. Google does not show a special result for property listings, so this helps search engines understand the pages rather than adding stars or prices to search results.


## Images

- `images/areas/` has one photo per area page and homepage area card: `gurukul.webp`, `memnagar.webp`, `sola.webp`, `ahmedabad.webp`. The area pages show it behind the page title (`.page-header.has-photo` in `css/style.css`).
- `images/blog/` has one image per blog article, named after the article (for example `blog/gurukul-vs-memnagar-rent.html` uses `images/blog/gurukul-vs-memnagar-rent.webp`). It is used at the top of the article, on the blog list page, on the homepage guide cards and in the article's structured data. To change one, replace the file with the same name. The sharing preview (`og:image`) still uses `images/og-image.png`, because some apps do not show WebP previews.
- Property photos are still placeholders until you add real ones.

## property-details.html without a property

`property-details.html?id=N` shows listing N. With no id, or an id that no longer exists, `renderPropertyPicker` in `js/search.js` shows a "Find Your Home" view instead of an error: quick filter chips (All homes, 1 RK, 1 BHK, Shop / Godown, Gurukul, Memnagar, Bachelors allowed), the current rental listings as cards, and a WhatsApp / call box. Styles are the `.picker-*` rules at the end of `css/style.css`. If you add a new area or listing type, add a chip to the `chips` list at the top of that function.

The homepage hero picture is `images/hero.webp` (set in `.hero-bg` in `css/style.css`, with a dark purple overlay so the white text stays readable). To change it, replace that file; to make the picture brighter or darker, change the two `rgba(...)` overlay values on the `.hero-bg` line.

## Sale listing and real photos

- **Listings:** `js/properties.js` now holds the 15 listings exported on 2026-10-07 (14 rentals in Gurukul and Memnagar, plus the 2 BHK flat for sale in Sola, id 44). `properties/` has one static page for each, and `sitemap.xml` includes them. After changing a listing, run `node tools/add-structured-data.js`. It may print a note that "₹50 Lakh" and 5000000 differ; that is only the way the price is written.
- **Photos of the Sola flat:** `images/sola-sale-hall.webp` (cover), `images/sola-sale-room.webp` and `images/sola-sale-full.webp` (all rooms together).
- **Blur rule:** stock placeholder photos (Unsplash links) stay blurred behind a "Request Image" button. Any other photo, such as your own uploads, shows clearly and has no Request button. This is decided in `isStockPhoto` in `js/properties.js`.
- **In the admin:** the live site reads listings from Firebase, so the Sola listing's photo links there must be set to the three files. Once the domain is live, use `https://akshatestate.com/images/sola-sale-hall.webp` (cover) and put `.../sola-sale-room.webp` and `.../sola-sale-full.webp` in the extra photos box, one per line.
- **Empty description:** a listing with no description simply shows no Description section.

## Request Image / Request Photos

These buttons no longer open WhatsApp. They ask for a mobile number (the name is optional), then save a "Photo request" to the admin panel's Enquiries tab (with the property attached) and email it to you through EmailJS. Your reply with the photos is sent by you, from the Enquiries tab (the WhatsApp button there opens a ready message to that number). The code is `aeOpenPhotoDialog` / `initPhotoRequest` in `js/main.js`; a button only needs `data-photo-open`, `data-photo-id` and `data-photo-title`. The same number is remembered on that phone for the next request. Real photos have no Request button, only the blurred stock placeholders do.

## Share buttons

The share button (on property cards, the property page and the static pages) opens the phone's own share sheet (WhatsApp, Messages, email, Instagram and so on) with the property's title, price, place and link. Where the browser has no share sheet (most desktop browsers), it copies the link instead and shows "Link copied". Closing the share sheet does nothing. The code is the `[data-share-url]` handler near the end of `js/main.js`. The Copy link button on the shortlist page stays a copy button on purpose.

## SEO notes

- **Titles and descriptions:** every page has one H1, a title, a meta description and a canonical address on `https://akshatestate.com`. Each listing page has its own title and description (title, price, size, furnishing), made by the page generator, so listings with the same name no longer look identical to Google.
- **Kept out of Google (`noindex`):** `admin`, `shortlist`, `404`, `offline`, `property-details.html` (a template filled from `?id=`; the static pages in `properties/` are the indexed ones), `properties/index.html` (a redirect), and the three 2 BHK rental pages (`2BHK-flats-for-rent-gurukul`, `2BHK-flats-for-rent-memnagar`, `2bhk-flats-for-rent`) because there are no 2 BHK rentals yet. When you add one, delete the `<meta name="robots" content="noindex, follow">` line from that page and add its address back to `sitemap.xml`.
- **Sitemap:** `sitemap.xml` lists only indexable pages. After adding a listing, run the page generator, then `node tools/add-structured-data.js`, and add the new page to the sitemap.
