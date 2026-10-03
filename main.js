/**
 * AKSHAT ESTATE - Main JavaScript
 * Phone / WhatsApp: 8141293057
 */

const WHATSAPP_NUMBER = "918141293057";
const PHONE_NUMBER = "8141293057";

document.addEventListener("DOMContentLoaded", function () {
  initHeader();
  initMobileNav();
  initFavorites();
  initHoneypots();
  initContactForm();
  initVisitBooking();
  initOwnerForm();
  initSmoothScroll();
  initWhatsAppLinks();
  initPhoneLinks();
  initShortlistLink();
  initBackToTop();
  initRequirementForm();
  initStaticMobileCta();
});

function initHeader() {
  const header = document.querySelector(".header");
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

function initMobileNav() {
  const hamburger = document.querySelector(".hamburger");
  const mobileNav = document.querySelector(".mobile-nav");
  const overlay = document.querySelector(".mobile-overlay");
  if (!hamburger || !mobileNav) return;

  function openNav() {
    hamburger.classList.add("active");
    mobileNav.classList.add("active");
    if (overlay) overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    hamburger.classList.remove("active");
    mobileNav.classList.remove("active");
    if (overlay) overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
  hamburger.addEventListener("click", function () {
    mobileNav.classList.contains("active") ? closeNav() : openNav();
  });
  if (overlay) overlay.addEventListener("click", closeNav);
  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });
}

/* ----------------------------------------------------------
   Favourites / shortlist (saved in this browser: localStorage "ae_favorites")
   ---------------------------------------------------------- */
function aeFavs() {
  try {
    var list = JSON.parse(localStorage.getItem("ae_favorites") || "[]");
    return Array.isArray(list) ? list.map(String) : [];
  } catch (e) { return []; }
}

function aeSetFavs(list) {
  try { localStorage.setItem("ae_favorites", JSON.stringify(list)); } catch (e) {}
  aeUpdateShortlistCount();
  window.dispatchEvent(new CustomEvent("ae:favorites-changed"));
}

/* Paint every heart button inside root to match the saved list (call after rendering cards) */
function aeSyncFavorites(root) {
  var favs = aeFavs();
  (root || document).querySelectorAll(".property-favorite").forEach(function (btn) {
    var on = favs.indexOf(String(btn.getAttribute("data-id"))) > -1;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("title", on ? "Remove from shortlist" : "Save to shortlist");
    var icon = btn.querySelector("i");
    if (icon) icon.className = (on ? "fas" : "far") + " fa-heart";
  });
}

function initFavorites() {
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".property-favorite");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const id = String(btn.getAttribute("data-id"));
    let favorites = aeFavs();
    favorites = favorites.indexOf(id) > -1 ? favorites.filter(function (f) { return f !== id; }) : favorites.concat(id);
    aeSetFavs(favorites);
    aeSyncFavorites(document);
  });
  aeSyncFavorites(document);
}

/* "My Shortlist" heart with a count in the header and the mobile menu (added here so every page gets it) */
function aeUpdateShortlistCount() {
  var n = aeFavs().length;
  document.querySelectorAll(".nav-shortlist-count").forEach(function (el) { el.textContent = n; el.hidden = n === 0; });
  document.querySelectorAll(".mobile-shortlist-count").forEach(function (el) { el.textContent = n ? " (" + n + ")" : ""; });
}

function initShortlistLink() {
  var href = AE_MAIN_SRC ? new URL("shortlist.html", AE_MAIN_SRC).href : "shortlist.html";
  var onPage = /shortlist\.html$/.test(location.pathname);
  var nav = document.querySelector(".header .nav");
  if (nav && !nav.querySelector(".nav-shortlist")) {
    var a = document.createElement("a");
    a.href = href;
    a.className = "nav-shortlist" + (onPage ? " active" : "");
    a.title = "My shortlist";
    a.setAttribute("aria-label", "My shortlist");
    a.innerHTML = '<i class="far fa-heart" aria-hidden="true"></i><span class="nav-shortlist-count" hidden>0</span>';
    nav.insertBefore(a, nav.querySelector(".nav-cta"));
  }
  var mobile = document.querySelector(".mobile-nav");
  if (mobile && !mobile.querySelector(".mobile-shortlist")) {
    var ma = document.createElement("a");
    ma.href = href;
    ma.className = "mobile-shortlist" + (onPage ? " active" : "");
    ma.innerHTML = 'My Shortlist<span class="mobile-shortlist-count"></span>';
    mobile.insertBefore(ma, mobile.querySelector(".btn") || null);
  }
  aeUpdateShortlistCount();
  window.addEventListener("storage", aeUpdateShortlistCount);
}

/* Small "back to top" button (appears after scrolling down) */
function initBackToTop() {
  var b = document.createElement("button");
  b.type = "button";
  b.className = "back-to-top";
  b.setAttribute("aria-label", "Back to top");
  b.innerHTML = '<i class="fas fa-arrow-up" aria-hidden="true"></i>';
  document.body.appendChild(b);
  function toggle() { b.classList.toggle("visible", window.scrollY > 600); }
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
  b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
}

/* Property pages on a phone: WhatsApp + Call bar pinned to the bottom of the screen */
function aeAddMobileCtaBar(waHref) {
  if (document.querySelector(".mobile-cta-bar")) return;
  var bar = document.createElement("div");
  bar.className = "mobile-cta-bar";
  bar.innerHTML = '<a class="btn btn-whatsapp" target="_blank" rel="noopener noreferrer"><i class="fab fa-whatsapp"></i> WhatsApp</a>' +
                  '<a class="btn btn-secondary" href="tel:+' + WHATSAPP_NUMBER + '"><i class="fas fa-phone"></i> Call</a>';
  bar.firstChild.href = waHref;
  document.body.appendChild(bar);
  document.body.classList.add("has-cta-bar");
}

/* Static property pages (properties/*.html) already contain their WhatsApp button; reuse its link */
function initStaticMobileCta() {
  if (!document.querySelector(".detail-title") || document.getElementById("property-detail")) return;
  var wa = document.querySelector(".sidebar-card .btn-whatsapp");
  if (wa) aeAddMobileCtaBar(wa.href);
}

/* ----------------------------------------------------------
   Enquiries: saved to Firebase (Firestore "inquiries") and shown in admin.html, and also
   emailed through EmailJS (see aeSubmitLead below).
   Works for every #contact-form on the site (contact page, area pages and the
   property page). The property-page form is added to the page later by search.js,
   so submits are handled at document level instead of binding to the form.
   ---------------------------------------------------------- */
var AE_MAIN_SRC = document.currentScript && document.currentScript.src;

function aeSaveInquiry(data) {
  if (!AE_MAIN_SRC || location.protocol === "file:") return Promise.reject(new Error("offline"));
  var save = import(new URL("firebase-config.js", AE_MAIN_SRC).href).then(function (cfg) {
    var base = "https://www.gstatic.com/firebasejs/" + cfg.FIREBASE_VERSION + "/";
    return Promise.all([import(base + "firebase-app.js"), import(base + "firebase-firestore.js")]).then(function (m) {
      var app = m[0].getApps().length ? m[0].getApp() : m[0].initializeApp(cfg.firebaseConfig);
      var fs = m[1];
      var doc = {};
      Object.keys(data).forEach(function (k) {
        var v = data[k];
        if (v === undefined || v === null || v === "") return;
        doc[k] = typeof v === "string" ? v.slice(0, k === "message" ? 2000 : 200) : v;
      });
      doc.status = "new";
      doc.createdAt = fs.serverTimestamp();
      return fs.addDoc(fs.collection(fs.getFirestore(app), "inquiries"), doc);
    });
  });
  var timeout = new Promise(function (_, reject) { setTimeout(function () { reject(new Error("timeout")); }, 12000); });
  return Promise.race([save, timeout]);
}

/* ----------------------------------------------------------
   EmailJS: every lead form also emails you.
   Public key + service/template IDs are meant to be public (they only allow SENDING
   through your template). Lock them to your domain in the EmailJS dashboard:
   Account > Security > allowed origins.
   ---------------------------------------------------------- */
var AE_EMAILJS = {
  serviceId: "service_g19zso8",
  templateId: "template_fu86367",
  publicKey: "4Ynx8WPpZN2LccJrr"
};

var AE_FORM_LABELS = { property: "Property enquiry", contact: "Contact form", enquiry: "Area page enquiry", owner: "Owner listing request" };

/* Readable "label: value" lines for the email body, built from whatever the visitor filled in */
function aeEmailDetails(label, data) {
  var rows = [
    ["Name", data.name], ["Phone", data.phone], ["Email", data.email],
    ["Property", data.propertyTitle], ["Looking to", data.requirement],
    ["Listing type", data.listingType], ["Location", data.location], ["Property type", data.propertyType],
    ["BHK", data.bhk], ["Expected rent / price", data.rent], ["Furnishing", data.furnishing],
    ["Message", data.message]
  ];
  var lines = ["Type: " + label];
  rows.forEach(function (r) { if (r[1]) lines.push(r[0] + ": " + r[1]); });
  return lines.join("\n");
}

/* Full listing details for the email, so you know exactly which property was asked about
   (titles repeat across listings). Only facts that are always real: no floor, parking or
   bachelors info, because older listings still carry placeholder values for those. */
function aePropertyInfo(p) {
  var rent = p.status === "rent";
  var layout = p.bedroomType === "1RK" ? "1 RK" : (p.bedrooms > 0 ? p.bedrooms + " BHK" : "");
  var typeNames = { apartment: "Flat / Apartment", bungalow: "Bungalow", office: "Office", shop: "Shop / Godown" };
  var price = (p.priceDisplay || ("\u20B9" + Number(p.price).toLocaleString("en-IN"))) + (rent ? " per month" : "");
  var where = [p.location, p.city].filter(Boolean).join(", ");
  var link = new URL("property-details.html?id=" + p.id, location.href).href;
  var lines = [
    "Property ID: " + p.id,
    "Title: " + p.title,
    "Listing: " + (rent ? "For rent" : "For sale"),
    "Price: " + price,
    "Location: " + where,
    "Type: " + [layout, typeNames[p.type] || p.type].filter(Boolean).join(" "),
    "Area: " + p.area + " " + (p.areaUnit || "sq.ft")
  ];
  if (p.bathrooms) lines.push("Bathrooms: " + p.bathrooms);
  if (p.furnishing) lines.push("Furnishing: " + p.furnishing);
  lines.push("Link: " + link);
  return { id: p.id, title: p.title, price: price, location: where, link: link, image: p.image || "", text: lines.join("\n") };
}

function aeSendEmail(label, data, detailsOverride, property) {
  var details = detailsOverride ? "Type: " + label + "\n" + detailsOverride : aeEmailDetails(label, data);
  if (property) details += "\n\nProperty details:\n" + property.text;
  var when = "";
  try { when = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }) + " IST"; } catch (e) { when = new Date().toString(); }
  var subject = "New " + label.toLowerCase() + ": " + data.name + " (" + data.phone + ")";
  var params = {
    subject: subject, title: subject, form_type: label,
    name: data.name, from_name: data.name, phone: data.phone,
    email: data.email || "", reply_to: data.email || "",
    property: data.propertyTitle || "",
    property_id: property ? String(property.id) : "", property_title: property ? property.title : "",
    property_price: property ? property.price : "", property_location: property ? property.location : "",
    property_link: property ? property.link : "", property_image: property ? property.image : "",
    property_details: property ? property.text : "",
    message: details,            /* everything in one readable block, so a template with just {{message}} still shows it all */
    details: details,
    note: data.message || "",    /* only what the visitor typed in the message box */
    page_url: location.href, submitted_at: when
  };
  var ctrl = typeof AbortController === "function" ? new AbortController() : null;
  var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 12000);
  return fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ service_id: AE_EMAILJS.serviceId, template_id: AE_EMAILJS.templateId, user_id: AE_EMAILJS.publicKey, template_params: params }),
    signal: ctrl ? ctrl.signal : undefined
  }).then(function (res) {
    clearTimeout(timer);
    if (res.ok) return true;
    return res.text().then(function (t) { throw new Error("EmailJS " + res.status + ": " + t); });
  }, function (err) { clearTimeout(timer); throw err; });
}

/* Saves the lead to the admin panel (Firestore) AND emails it. Resolves as soon as either one
   works, so a lead is only reported as failed when both failed. */
function aeSubmitLead(label, data, detailsOverride, property) {
  return new Promise(function (resolve, reject) {
    var failures = 0, settled = false;
    function ok(how) { if (!settled) { settled = true; resolve(how); } }
    function fail(what, err) {
      console.warn(what + " failed:", err);
      failures++;
      if (failures === 2 && !settled) { settled = true; reject(new Error("Could not save or email the enquiry")); }
    }
    aeSaveInquiry(data).then(function () { ok("saved"); }, function (e) { fail("Saving enquiry", e); });
    aeSendEmail(label, data, detailsOverride, property).then(function () { ok("emailed"); }, function (e) { fail("Emailing enquiry", e); });
  });
}

function setFormStatus(form, kind, text, linkHref, linkText) {
  var el = form.querySelector(".form-status");
  if (!el) {
    el = document.createElement("p");
    el.setAttribute("role", "status");
    form.appendChild(el);
  }
  el.className = "form-status is-" + kind;
  el.textContent = text;
  if (linkHref) {
    el.appendChild(document.createTextNode(" "));
    var a = document.createElement("a");
    a.href = linkHref; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = linkText;
    el.appendChild(a);
  }
}

/* ----------------------------------------------------------
   Spam protection (no captcha, nothing for real visitors to do):
   - Honeypot: every lead form gets a hidden text box. People never see it, but bots fill it in.
   - Timing: a form submitted less than 2 seconds after it appeared is treated as a bot.
   A caught submission is dropped silently (the sender sees the normal thank-you message),
   so bots get no hint about what tripped them. Forms added later by search.js are covered too.
   ---------------------------------------------------------- */
var AE_LEAD_FORM_IDS = ["contact-form", "requirement-form", "owner-form", "visit-form"];

function aeAddHoneypot(form) {
  if (!form || form.querySelector(".ae-hp")) return;
  form.setAttribute("data-ae-t", String(Date.now()));
  var box = document.createElement("div");
  box.className = "ae-hp";
  box.setAttribute("aria-hidden", "true");
  box.innerHTML = '<label>Leave this field empty<input type="text" name="ae_company_site" tabindex="-1" autocomplete="off"></label>';
  form.appendChild(box);
}

function aeScanHoneypots(root) {
  if (!root || !root.querySelectorAll) return;
  if (root.tagName === "FORM" && AE_LEAD_FORM_IDS.indexOf(root.id) > -1) aeAddHoneypot(root);
  root.querySelectorAll("form").forEach(function (f) { if (AE_LEAD_FORM_IDS.indexOf(f.id) > -1) aeAddHoneypot(f); });
}

function initHoneypots() {
  aeScanHoneypots(document);
  if (typeof MutationObserver !== "function") return;
  new MutationObserver(function (list) {
    list.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) aeScanHoneypots(n); }); });
  }).observe(document.body, { childList: true, subtree: true });
}

function aeIsBot(form) {
  var hp = form.querySelector(".ae-hp input");
  if (hp && hp.value) return true;
  var t = Number(form.getAttribute("data-ae-t")) || 0;
  return !!t && Date.now() - t < 2000;
}

/* Property details for a lead: the full record when properties.js is loaded, else what the static page carries */
function aePropertyForLead(id, title) {
  var prop = (id && typeof getPropertyById === "function") ? getPropertyById(id) : null;
  if (prop) return aePropertyInfo(prop);
  var link = location.href.split("#")[0];
  return { id: id, title: title, price: "", location: "", link: link, image: "", text: "Property ID: " + id + "\nTitle: " + title + "\nLink: " + link };
}

/* ----------------------------------------------------------
   Book a visit: any button with data-visit-open (+ data-visit-id / data-visit-title) opens a small
   date and time-slot form. It opens WhatsApp with the request, saves it to the Enquiries tab as a
   property enquiry (requirement "Visit request") and emails it, like every other lead.
   ---------------------------------------------------------- */
var AE_VISIT_SLOTS = ["9 AM - 12 PM", "12 PM - 3 PM", "3 PM - 6 PM", "6 PM - 9 PM"]; /* visiting hours: 9 AM to 9 PM */

function aeLocalISO(d) {
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}

function aeCloseVisitDialog() {
  var m = document.getElementById("visit-modal");
  if (!m) return;
  m.remove();
  document.body.classList.remove("visit-open");
  if (window.aeVisitReturnFocus && window.aeVisitReturnFocus.focus) window.aeVisitReturnFocus.focus();
}

function aeOpenVisitDialog(prop, opener) {
  aeCloseVisitDialog();
  window.aeVisitReturnFocus = opener || null;
  var today = new Date(), last = new Date();
  last.setDate(last.getDate() + 60);
  var slots = AE_VISIT_SLOTS.map(function (s) { return "<option>" + s + "</option>"; }).join("");
  var m = document.createElement("div");
  m.id = "visit-modal";
  m.className = "visit-modal";
  m.innerHTML =
    '<div class="visit-backdrop" data-visit-close></div>' +
    '<div class="visit-card" role="dialog" aria-modal="true" aria-labelledby="visit-title">' +
    '<button type="button" class="visit-x" data-visit-close aria-label="Close"><i class="fas fa-xmark"></i></button>' +
    '<h3 id="visit-title">Book a visit</h3>' +
    '<p class="visit-prop"></p>' +
    '<p class="visit-hours"><i class="far fa-clock"></i> Visits are available daily, 9 AM to 9 PM.</p>' +
    '<form id="visit-form">' +
    '<div class="form-group"><label for="visit-name">Your name</label><input type="text" id="visit-name" name="name" required autocomplete="name"></div>' +
    '<div class="form-group"><label for="visit-phone">Phone number</label><input type="tel" id="visit-phone" name="phone" required autocomplete="tel"></div>' +
    '<div class="visit-row">' +
    '<div class="form-group"><label for="visit-date">Preferred date</label><input type="date" id="visit-date" name="visitdate" required min="' + aeLocalISO(today) + '" max="' + aeLocalISO(last) + '"></div>' +
    '<div class="form-group"><label for="visit-slot">Time slot</label><select id="visit-slot" name="slot">' + slots + '</select></div>' +
    '</div>' +
    '<div class="form-group"><label for="visit-note">Note (optional)</label><textarea id="visit-note" name="note" rows="2" placeholder="Anything we should know?"></textarea></div>' +
    '<button type="submit" class="btn btn-whatsapp btn-block"><i class="fab fa-whatsapp"></i> Request visit</button>' +
    '</form></div>';
  m.querySelector(".visit-prop").textContent = prop.title || "This property";
  var form = m.querySelector("#visit-form");
  form.setAttribute("data-visit-id", String(prop.id || ""));
  form.setAttribute("data-visit-title", prop.title || "");
  document.body.appendChild(m);
  document.body.classList.add("visit-open");
  aeAddHoneypot(form);
  setTimeout(function () { var f = m.querySelector("#visit-name"); if (f) f.focus(); }, 30);
}

function initVisitBooking() {
  document.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-visit-open]");
    if (opener) {
      e.preventDefault();
      aeOpenVisitDialog({
        id: parseInt(opener.getAttribute("data-visit-id"), 10) || 0,
        title: opener.getAttribute("data-visit-title") || document.title.split("|")[0].trim()
      }, opener);
      return;
    }
    if (e.target.closest("[data-visit-close]")) aeCloseVisitDialog();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") aeCloseVisitDialog(); });

  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form || form.id !== "visit-form") return;
    e.preventDefault();
    var val = function (k) { return form.elements[k] ? String(form.elements[k].value || "").trim() : ""; };
    var name = val("name"), phone = val("phone"), dateVal = val("visitdate"), slot = val("slot"), note = val("note");
    if (!name || phone.replace(/\D/g, "").length < 8) {
      setFormStatus(form, "error", "Please enter your name and a valid phone number.");
      return;
    }
    if (!dateVal) { setFormStatus(form, "error", "Please choose a date for the visit."); return; }
    var d = new Date(dateVal + "T00:00:00");
    var dateText = isNaN(d) ? dateVal : d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

    if (aeIsBot(form)) {
      form.innerHTML = "";
      var ok = document.createElement("p");
      ok.className = "form-status is-success";
      ok.textContent = "Thank you, " + name + ". We have your visit request and will call you to confirm.";
      form.appendChild(ok);
      return;
    }
    var lastSent = 0;
    try { lastSent = Number(localStorage.getItem("ae_last_inquiry")) || 0; } catch (err) {}
    if (Date.now() - lastSent < 20000) {
      setFormStatus(form, "error", "Your request was just sent. Please wait a few seconds before sending another.");
      return;
    }

    var id = parseInt(form.getAttribute("data-visit-id"), 10) || 0;
    var title = form.getAttribute("data-visit-title") || "";
    var info = aePropertyForLead(id, title);
    var message = "Visit request: " + dateText + ", " + slot + (note ? "\nNote: " + note : "");
    var wa = getWhatsAppLink(info.link + "\n\nHi Akshat Estate, I'd like to visit " + (title || "this property") + " on " + dateText + ", " + slot + ".\nName: " + name + "\nPhone: " + phone + (note ? "\nNote: " + note : ""));
    window.open(wa, "_blank", "noopener");

    var btn = form.querySelector('[type="submit"]');
    if (btn) { btn.textContent = "Sending..."; btn.disabled = true; }
    var data = { source: "property", name: name, phone: phone, requirement: "Visit request", message: message, page: location.pathname.slice(-150) };
    if (id) data.propertyId = id;
    if (title) data.propertyTitle = title;

    function finish(text) {
      form.innerHTML = "";
      var p = document.createElement("p");
      p.className = "form-status is-success";
      p.textContent = text + " ";
      var a = document.createElement("a");
      a.href = wa; a.target = "_blank"; a.rel = "noopener noreferrer"; a.textContent = "Open WhatsApp again";
      p.appendChild(a);
      var c = document.createElement("button");
      c.type = "button"; c.className = "btn btn-outline btn-block"; c.setAttribute("data-visit-close", ""); c.textContent = "Close"; c.style.marginTop = "1rem";
      form.appendChild(p); form.appendChild(c);
    }
    aeSubmitLead("Visit request", data, null, id ? info : null).then(function () {
      try { localStorage.setItem("ae_last_inquiry", String(Date.now())); } catch (err) {}
      finish("Thank you, " + name + ". We have your visit request for " + dateText + " (" + slot + ") and will call you to confirm. WhatsApp opened with the details: press send to reach us faster.");
    }).catch(function () {
      finish("WhatsApp opened with your visit request. Press send there and we will confirm the visit.");
    });
  });
}

function initContactForm() {
  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form || form.id !== "contact-form") return;
    e.preventDefault();
    if (aeIsBot(form)) {
      form.reset();
      setFormStatus(form, "success", "Thank you. We have received your enquiry and will call you shortly.");
      return;
    }

    var val = function (k) { return form.elements[k] ? String(form.elements[k].value || "").trim() : ""; };
    var name = val("name");
    var phone = val("phone");
    if (!name || phone.replace(/\D/g, "").length < 8) {
      setFormStatus(form, "error", "Please enter your name and a valid phone number.");
      return;
    }

    var lastSent = 0;
    try { lastSent = Number(localStorage.getItem("ae_last_inquiry")) || 0; } catch (err) {}
    if (Date.now() - lastSent < 20000) {
      setFormStatus(form, "error", "Your enquiry was just sent. Please wait a few seconds before sending another.");
      return;
    }

    var data = { name: name, phone: phone, email: val("email"), message: val("message"), requirement: val("requirement") };
    data.page = location.pathname.slice(-150);
    var propertyTitle = "";
    var propertyInfo = null;
    var staticId = parseInt(document.body.getAttribute("data-property-id"), 10) || 0;
    if (document.getElementById("property-detail") || staticId) {
      data.source = "property";
      var pid = staticId || parseInt(new URLSearchParams(location.search).get("id"), 10);
      if (pid) {
        data.propertyId = pid;
        var prop = typeof getPropertyById === "function" ? getPropertyById(pid) : null;
        var ptitle = prop ? prop.title : (document.body.getAttribute("data-property-title") || "");
        if (ptitle) { propertyTitle = ptitle; data.propertyTitle = ptitle; }
        propertyInfo = aePropertyForLead(pid, ptitle);
      }
    } else {
      data.source = form.elements.requirement ? "contact" : "enquiry";
    }

    var btn = form.querySelector('[type="submit"]');
    var original = btn ? btn.textContent : "";
    if (btn) { btn.textContent = "Sending..."; btn.disabled = true; }

    aeSubmitLead(AE_FORM_LABELS[data.source] || "Enquiry", data, null, propertyInfo).then(function () {
      try { localStorage.setItem("ae_last_inquiry", String(Date.now())); } catch (err) {}
      form.reset();
      setFormStatus(form, "success", "Thank you, " + name + ". We have received your enquiry and will call you shortly.");
    }).catch(function () {
      var wa = "Hi Akshat Estate, I'm " + name + " (" + phone + ")." +
        (propertyTitle ? " I'm interested in: " + propertyTitle + "." : "") +
        (data.message ? " " + data.message : "");
      setFormStatus(form, "error", "We could not send your enquiry right now. Please message us on WhatsApp instead:", getWhatsAppLink(wa), "Open WhatsApp");
    }).then(function () {
      if (btn) { btn.textContent = original; btn.disabled = false; }
    });
  });
}

/* "Tell us what you need" (tenant requirement form).
   Opens WhatsApp with the details filled in, saves the requirement to Firestore ("inquiries") and emails it
   (EmailJS), so you get it even if the visitor never presses send in WhatsApp. */
function initRequirementForm() {
  document.querySelectorAll('#requirement-form input[name="movein"]').forEach(function (i) {
    var t = new Date();
    i.min = t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
  });
  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form || form.id !== "requirement-form") return;
    e.preventDefault();
    if (aeIsBot(form)) {
      form.reset();
      setFormStatus(form, "success", "Thank you. We have your requirement and will call you with matching homes.");
      return;
    }

    var val = function (k) { return form.elements[k] ? String(form.elements[k].value || "").trim() : ""; };
    var name = val("name"), phone = val("phone");
    if (!name || phone.replace(/\D/g, "").length < 8) {
      setFormStatus(form, "error", "Please enter your name and a valid phone number.");
      return;
    }
    var lastSent = 0;
    try { lastSent = Number(localStorage.getItem("ae_last_inquiry")) || 0; } catch (err) {}
    if (Date.now() - lastSent < 20000) {
      setFormStatus(form, "error", "Your requirement was just sent. Please wait a few seconds before sending another.");
      return;
    }

    var area = val("area"), bhk = val("bhk"), budget = val("budget"), furnishing = val("furnishing"), movein = val("movein"), note = val("note");
    var bachelors = form.elements.bachelors && form.elements.bachelors.checked;
    var moveinText = "";
    if (movein) {
      var d = new Date(movein + "T00:00:00");
      moveinText = isNaN(d) ? movein : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
    }
    var lines = ["Hi Akshat Estate, I'm looking for a rental home.", "", "Name: " + name, "Phone: " + phone];
    if (area) lines.push("Area: " + area);
    if (bhk) lines.push("BHK: " + bhk);
    if (budget) lines.push("Budget: " + budget);
    if (furnishing) lines.push("Furnishing: " + furnishing);
    if (moveinText) lines.push("Move-in: " + moveinText);
    if (bachelors) lines.push("Tenant: Bachelors");
    if (note) lines.push("Notes: " + note);
    var summary = lines.join("\n");
    var waLink = getWhatsAppLink(summary);

    /* open WhatsApp right away (inside the click, so pop-up blockers allow it) */
    window.open(waLink, "_blank", "noopener");

    var btn = form.querySelector('[type="submit"]');
    var original = btn ? btn.textContent : "";
    if (btn) { btn.textContent = "Sending..."; btn.disabled = true; }

    var data = {
      source: "enquiry", name: name, phone: phone,
      requirement: "Rental requirement",
      message: summary.split("\n").slice(2).join("\n"),
      location: area, bhk: bhk, rent: budget, furnishing: furnishing,
      page: location.pathname.slice(-150)
    };
    aeSubmitLead("Rental requirement", data, summary.split("\n").slice(2).join("\n")).then(function () {
      try { localStorage.setItem("ae_last_inquiry", String(Date.now())); } catch (err) {}
      form.reset();
      setFormStatus(form, "success", "Thank you, " + name + ". We have your requirement and will call you with matching homes. WhatsApp opened with the details: press send to reach us faster.", waLink, "Open WhatsApp again");
    }).catch(function () {
      setFormStatus(form, "success", "WhatsApp opened with your requirement. Press send there and we will get back to you.", waLink, "Open WhatsApp again");
    }).then(function () {
      if (btn) { btn.textContent = original; btn.disabled = false; }
    });
  });
}

/* "List Your Property" form: submitting opens WhatsApp with the details pre-filled, and the lead is
   also saved to the admin panel and emailed (EmailJS). */
function initOwnerForm() {
  const form = document.getElementById("owner-form");
  if (!form) return;

  const listingType = form.querySelector('[name="listingType"]');
  const priceLabel = form.querySelector('label[for="owner-rent"]');
  const priceInput = form.querySelector('[name="rent"]');
  function syncPriceField() {
    const selling = listingType && listingType.value === "Sell";
    if (priceLabel) priceLabel.textContent = selling ? "Expected Price (₹) *" : "Expected Rent (₹ / month) *";
    if (priceInput) priceInput.placeholder = selling ? "e.g. 6500000" : "e.g. 15000";
  }
  if (listingType) listingType.addEventListener("change", syncPriceField);
  syncPriceField();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (aeIsBot(form)) { form.reset(); return; }
    const data = new FormData(form);
    const get = function (k) { return (data.get(k) || "").toString().trim(); };
    const selling = get("listingType") === "Sell";
    const lines = [
      selling ? "Hi, I'd like to list my property for sale on Akshat Estate." : "Hi, I'd like to list my property for rent on Akshat Estate.",
      "",
      "Owner name: " + get("name"),
      "Phone: " + get("phone"),
      "Property location: " + get("location"),
      "Property type: " + (get("propertyType") || "-"),
      "BHK: " + (get("bhk") || "-"),
      (selling ? "Expected price: ₹" : "Expected rent: ₹") + get("rent") + (selling ? "" : " / month"),
      "Furnishing: " + (get("furnishing") || "-")
    ];
    if (get("message")) lines.push("Notes: " + get("message"));
    lines.push("", "I will share photos here on WhatsApp.");
    window.open(getWhatsAppLink(lines.join("\n")), "_blank", "noopener");
    /* Also keep a copy in the admin panel and email it (WhatsApp above still opens as before) */
    aeSubmitLead("Owner listing request", {
      source: "owner", name: get("name"), phone: get("phone"), listingType: get("listingType"),
      location: get("location"), propertyType: get("propertyType"), bhk: get("bhk"),
      rent: get("rent"), furnishing: get("furnishing"), message: get("message"),
      page: location.pathname.slice(-150)
    }).catch(function () {});
  });
}

function initSmoothScroll() {
  /* One delegated handler, so links added later (e.g. "Tell us what you need" in empty results) scroll smoothly too */
  document.addEventListener("click", function (e) {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || href.length < 2) return;          /* bare "#" links are handled by their own scripts */
    let target = null;
    try { target = document.querySelector(href); } catch (err) { return; }
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

function getWhatsAppLink(message) {
  const defaultMsg = "Hello Akshat Estate, I am interested in a property in Ahmedabad. Please share available options.";
  const text = encodeURIComponent(message || defaultMsg);
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
}

function initWhatsAppLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    const pageMsg = el.getAttribute("data-wa-page-msg");
    const customMsg = pageMsg
      ? window.location.href.split("#")[0] + "\n\n" + pageMsg   /* this page's own link + message */
      : (el.getAttribute("data-whatsapp-msg") || null);
    el.href = getWhatsAppLink(customMsg);
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });
}

function initPhoneLinks() {
  document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
    if (el.getAttribute("href").includes("XXXX") || el.getAttribute("href") === "tel:+91XXXXXXXXXX") {
      el.href = "tel:+91" + PHONE_NUMBER;
    }
  });
  document.querySelectorAll("[data-phone]").forEach(function (el) {
    el.href = "tel:+91" + PHONE_NUMBER;
    if (!el.textContent.trim() || el.textContent.includes("XXXX")) {
      el.textContent = "+91 " + PHONE_NUMBER.replace(/(\d{5})(\d{5})/, "$1 $2");
    }
  });
}


/* Share buttons on property cards: copy the property's page link so it can be pasted anywhere (WhatsApp, SMS, email...) */
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise(function (resolve, reject) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy") ? resolve() : reject(); } catch (err) { reject(err); }
    document.body.removeChild(ta);
  });
}

document.addEventListener("click", function (e) {
  const btn = e.target.closest("[data-share-url]");
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  const url = btn.getAttribute("data-share-url");
  const original = btn.innerHTML;
  const iconOnly = btn.classList.contains("btn-share-icon");
  copyToClipboard(url).then(function () {
    btn.innerHTML = iconOnly ? '<i class="fas fa-check"></i>' : '<i class="fas fa-check"></i> Link copied';
    btn.classList.add("is-copied");
  }, function () {
    window.prompt("Copy this link:", url);
  }).then(function () {
    setTimeout(function () { btn.innerHTML = original; btn.classList.remove("is-copied"); }, 2000);
  });
});

/* "Request Image" buttons are <button>s, so open their WhatsApp message on click */
document.addEventListener("click", function (e) {
  const btn = e.target.closest("button[data-whatsapp]");
  if (!btn) return;
  e.preventDefault();
  e.stopPropagation();
  window.open(getWhatsAppLink(btn.getAttribute("data-whatsapp-msg")), "_blank", "noopener");
});

/* Property photos: block right-click, dragging, long-press save and text selection on the images.
   (Deterrent only: the browser still has to download the image to show it, so anyone technical can find the file.) */
(function protectPropertyImages() {
  const sel = ".property-image, .property-hcard-img, .rental-card-img, .detail-gallery, .gallery-thumbs, .detail-gallery-wrap";
  const inGallery = function (t) { return t && t.closest && t.closest(sel); };
  document.addEventListener("contextmenu", function (e) { if (inGallery(e.target)) e.preventDefault(); });
  document.addEventListener("dragstart", function (e) { if (e.target && e.target.tagName === "IMG" && inGallery(e.target)) e.preventDefault(); });
  document.addEventListener("selectstart", function (e) { if (inGallery(e.target)) e.preventDefault(); });
})();

/* Whole property card clickable (except buttons/links inside) */
document.addEventListener("click", function (e) {
  var card = e.target.closest(".property-card, .property-hcard, .rental-card");
  if (!card) return;
  if (e.target.closest("a, button, .request-image-btn, .property-favorite, .icon-btn")) return;
  var link = card.querySelector("a[href*='properties/'], a[href*='property-details']");
  if (link && link.href) window.location.href = link.href;
});


/* Category cards: pass filters (via sessionStorage) without a query string in the URL.
   Use data-filters='{"status":"rent","bedrooms":"3"}' or the older data-filter-type="apartment". */
document.addEventListener("click", function (e) {
  var a = e.target.closest("a[data-filter-type], a[data-filters]");
  if (!a) return;
  e.preventDefault();
  var filters = {};
  try {
    if (a.hasAttribute("data-filters")) filters = JSON.parse(a.getAttribute("data-filters")) || {};
    else filters = { type: a.getAttribute("data-filter-type") };
    sessionStorage.setItem("ae_filters", JSON.stringify(filters));
  } catch (err) {}
  window.location.href = a.getAttribute("href") || "properties.html";
});
