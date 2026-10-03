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
  initContactForm();
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
   Enquiries: saved to Firebase (Firestore "inquiries") and shown in admin.html.
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

function initContactForm() {
  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form || form.id !== "contact-form") return;
    e.preventDefault();

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
    if (document.getElementById("property-detail")) {
      data.source = "property";
      var pid = parseInt(new URLSearchParams(location.search).get("id"), 10);
      if (pid) {
        data.propertyId = pid;
        if (typeof getPropertyById === "function") {
          var prop = getPropertyById(pid);
          if (prop) { propertyTitle = prop.title; data.propertyTitle = prop.title; }
        }
      }
    } else {
      data.source = form.elements.requirement ? "contact" : "enquiry";
    }

    var btn = form.querySelector('[type="submit"]');
    var original = btn ? btn.textContent : "";
    if (btn) { btn.textContent = "Sending..."; btn.disabled = true; }

    aeSaveInquiry(data).then(function () {
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
   Opens WhatsApp with the details filled in and also saves the requirement to Firestore
   ("inquiries"), so it shows up in the admin Enquiries tab even if the visitor never presses send. */
function initRequirementForm() {
  document.querySelectorAll('#requirement-form input[name="movein"]').forEach(function (i) {
    var t = new Date();
    i.min = t.getFullYear() + "-" + String(t.getMonth() + 1).padStart(2, "0") + "-" + String(t.getDate()).padStart(2, "0");
  });
  document.addEventListener("submit", function (e) {
    var form = e.target;
    if (!form || form.id !== "requirement-form") return;
    e.preventDefault();

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
    aeSaveInquiry(data).then(function () {
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

/* "List Your Property" form: no backend yet, so submitting opens WhatsApp with the details pre-filled.
   (To email submissions instead, point this form at Formspree/EmailJS.) */
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
    /* Also keep a copy in the admin panel (WhatsApp above still opens as before) */
    aeSaveInquiry({
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
