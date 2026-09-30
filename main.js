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

function initFavorites() {
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".property-favorite");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const id = btn.getAttribute("data-id");
    let favorites = JSON.parse(localStorage.getItem("ae_favorites") || "[]");
    if (favorites.includes(id)) {
      favorites = favorites.filter(function (f) { return f !== id; });
      btn.classList.remove("active");
      btn.querySelector("i").className = "far fa-heart";
    } else {
      favorites.push(id);
      btn.classList.add("active");
      btn.querySelector("i").className = "fas fa-heart";
    }
    localStorage.setItem("ae_favorites", JSON.stringify(favorites));
  });
  const favorites = JSON.parse(localStorage.getItem("ae_favorites") || "[]");
  document.querySelectorAll(".property-favorite").forEach(function (btn) {
    if (favorites.includes(btn.getAttribute("data-id"))) {
      btn.classList.add("active");
      btn.querySelector("i").className = "fas fa-heart";
    }
  });
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
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
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
