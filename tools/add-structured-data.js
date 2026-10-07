#!/usr/bin/env node
/* Akshat Estate: writes schema.org structured data (for Google) into the static pages.
 *
 *   node tools/add-structured-data.js        (run from the site root; needs Node 16+, nothing to install)
 *
 *   index.html, contact.html      the business (RealEstateAgent), with address, map position, logo and Instagram
 *   properties/<listing>.html     the listing (RealEstateListing) and its breadcrumb trail
 *
 * Listing facts come from js/properties.js through the same function the live property page uses
 * (aeListingSchema), matched by each page's data-property-id. Safe to run again: it replaces what it wrote
 * before. Run it after you regenerate the pages in properties/ or change a listing in js/properties.js.
 * It prints a warning if a page's visible text and the data disagree.
 */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");

/* ---- the listing data and the shared schema function ---- */
const ctx = { window: {}, document: { currentScript: null }, location: { protocol: "file:" }, localStorage: {}, Promise, console, URL };
vm.createContext(ctx);
vm.runInContext(read("js/properties.js") + ";this.api={aeListingSchema,PROPERTIES,AE_SITE_URL};", ctx);
const { aeListingSchema, PROPERTIES, AE_SITE_URL } = ctx.api;

/* ---- the business: only facts that are shown on the website ---- */
const BUSINESS = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": AE_SITE_URL + "/#business",
  name: "Akshat Estate",
  description: "Rental homes and real estate consultancy in Ahmedabad: flats for rent in Gurukul, Memnagar and Sola, plus buying and selling assistance. 20+ years of local experience.",
  url: AE_SITE_URL + "/",
  logo: AE_SITE_URL + "/images/logo.png",
  image: AE_SITE_URL + "/images/og-image.png",
  telephone: "+91-8141293057",
  email: "akshatestate.ahd@gmail.com",
  address: { "@type": "PostalAddress", streetAddress: "Gurukul Rd, Memnagar", addressLocality: "Ahmedabad", addressRegion: "Gujarat", postalCode: "380052", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 23.0525066, longitude: 72.5330279 },
  areaServed: [
    { "@type": "City", name: "Ahmedabad" },
    { "@type": "Place", name: "Gurukul, Ahmedabad" },
    { "@type": "Place", name: "Memnagar, Ahmedabad" },
    { "@type": "Place", name: "Sola, Ahmedabad" }
  ],
  contactPoint: { "@type": "ContactPoint", telephone: "+91-8141293057", contactType: "customer service", areaServed: "IN" },
  sameAs: ["https://www.instagram.com/akshatestate/"]
};

/* ---- helpers ---- */
const tag = (id, obj) => `  <script type="application/ld+json" id="${id}">\n${JSON.stringify(obj, null, 2).replace(/^/gm, "  ")}\n  </script>\n`;
const ownRe = (id) => new RegExp(`[ \\t]*<script type="application/ld\\+json" id="${id}">[\\s\\S]*?</script>[ \\t]*\\r?\\n?`, "g");
function upsert(html, id, obj) {
  html = html.replace(ownRe(id), "");
  if (!html.includes("</head>")) throw new Error("no </head>");
  return html.replace("</head>", tag(id, obj) + "</head>");
}
const canonicalOf = (rel) => { const m = read(rel).match(/<link rel="canonical" href="([^"]+)"/); return m ? m[1] : null; };
const decode = (t) => t.replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const warnings = [];

/* ---- 1. the business, on the home and contact pages ---- */
for (const f of ["index.html", "contact.html"]) {
  let html = read(f);
  if (f === "index.html") {   /* replace the older, shorter RealEstateAgent block */
    html = html.replace(/[ \t]*<script type="application\/ld\+json">\s*(\{[\s\S]*?\})\s*<\/script>[ \t]*\r?\n?/g, (all, json) => {
      try { return JSON.parse(json)["@type"] === "RealEstateAgent" ? "" : all; } catch (e) { return all; }
    });
  }
  fs.writeFileSync(path.join(ROOT, f), upsert(html, "ae-business-ld", BUSINESS));
}

/* ---- 2. each static listing page ---- */
let done = 0;
for (const name of fs.readdirSync(path.join(ROOT, "properties")).filter((n) => n.endsWith(".html") && n !== "index.html").sort()) {
  const rel = "properties/" + name;
  let html = read(rel);
  const id = Number((html.match(/data-property-id="(\d+)"/) || [])[1]);
  const p = PROPERTIES.find((x) => x.id === id);
  if (!p) { warnings.push(`${rel}: no listing with id ${id} in js/properties.js, skipped`); continue; }
  const url = canonicalOf(rel);

  /* visible text must agree with the data (Google expects markup to match the page) */
  const h1 = decode((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || "");
  const price = decode((html.match(/class="detail-price"[^>]*>([\s\S]*?)<\//) || [])[1] || "");
  const loc = decode((html.match(/class="detail-loc"[^>]*>([\s\S]*?)<\/div>/) || [])[1] || "");
  const text = decode(html.replace(/<script[\s\S]*?<\/script>/g, ""));
  if (h1 !== p.title) warnings.push(`${rel}: heading "${h1}" differs from data title "${p.title}"`);
  if (price.replace(/\D/g, "") !== String(p.price)) warnings.push(`${rel}: price text "${price}" differs from data ${p.price}`);
  if (!loc.includes(p.location)) warnings.push(`${rel}: location text "${loc}" does not mention "${p.location}"`);
  if (p.description && !text.includes(decode(p.description))) warnings.push(`${rel}: description in the data is not on the page`);

  /* breadcrumb trail from the page's own visible breadcrumb */
  const nav = (html.match(/<nav class="breadcrumb">([\s\S]*?)<\/nav>/) || [])[1] || "";
  const crumbs = [];
  nav.replace(/<a href="([^"]+)">([\s\S]*?)<\/a>/g, (all, href, label) => {
    const target = path.posix.normalize(path.posix.join("properties", href));
    let item = fs.existsSync(path.join(ROOT, target)) ? canonicalOf(target) : null;
    crumbs.push({ name: decode(label), item: item || new URL(href, url).href });
    return all;
  });
  const last = (nav.match(/<span>([\s\S]*?)<\/span>/) || [])[1];
  if (last) crumbs.push({ name: decode(last) });
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => Object.assign({ "@type": "ListItem", position: i + 1, name: c.name }, c.item ? { item: c.item } : {})) };

  html = upsert(html, "ae-listing-ld", aeListingSchema(p, url, false));
  html = upsert(html, "ae-breadcrumb-ld", breadcrumb);
  fs.writeFileSync(path.join(ROOT, rel), html);
  done++;
}
console.log(`Structured data written: business on 2 pages, listing + breadcrumb on ${done} listing pages.`);
if (warnings.length) { console.log("\nCheck these (the page and the data disagree):"); warnings.forEach((w) => console.log("  - " + w)); }
else console.log("Every listing page's visible title, price, location and description match the data.");
