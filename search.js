
function rebindWhatsApp(root) {
  if (typeof getWhatsAppLink !== "function") return;
  (root || document).querySelectorAll("[data-whatsapp]").forEach(function (el) {
    el.href = getWhatsAppLink(el.getAttribute("data-whatsapp-msg"));
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });
}

/**
 * AKSHAT ESTATE - Search & Filter
 */

document.addEventListener("DOMContentLoaded", function () {
  function start() {
    initHeroSearch();
    initListingsPage();
    initFeaturedProperties();
    initFeaturedRentals();
    initAreaRentTables();
    initShortlistPage();
    initPropertyCardClicks();
    if (document.getElementById("property-detail")) initPropertyDetails();
  }
  /* properties.js loads the live listings from Firebase first (falls back to built-in data) */
  if (window.propertiesReady && typeof window.propertiesReady.then === "function") {
    window.propertiesReady.then(start, start);
  } else {
    start();
  }
});

function initPropertyCardClicks() {
  document.addEventListener("click", function (e) {
    const card = e.target.closest(".property-card, .property-hcard, .rental-card");
    if (!card) return;
    if (e.target.closest("a, button, input, select, textarea")) return;
    const id = card.getAttribute("data-id");
    if (id) window.location.href = "property-details.html?id=" + encodeURIComponent(id);
  });
}

function initHeroSearch() {
  const form = document.getElementById("rental-search-form") || document.getElementById("hero-search-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const val = function (name) { return form.querySelector('[name="' + name + '"]')?.value; };
    const pending = { status: "rent" };
    const type = val("type");
    const location = val("location");
    const bedrooms = val("bedrooms");
    const furnishing = val("furnishing");
    const maxPrice = val("maxPrice");
    if (type && type !== "all") pending.type = type;
    if (location && location !== "all") pending.location = location;
    if (bedrooms && bedrooms !== "all") pending.bedrooms = bedrooms;
    if (furnishing && furnishing !== "all") pending.furnishing = furnishing;
    if (maxPrice) pending.maxPrice = maxPrice;
    try { sessionStorage.setItem("ae_filters", JSON.stringify(pending)); } catch (err) {}
    window.location.href = "rent.html";
  });
}

function initFeaturedRentals() {
  const container = document.getElementById("featured-rentals");
  if (!container || typeof getFeaturedRentals !== "function") return;
  container.innerHTML = getFeaturedRentals().map(renderRentalCard).join("");
  rebindWhatsApp(container);
  if (typeof aeSyncFavorites === "function") aeSyncFavorites(container);
}

function initFeaturedProperties() {
  const container = document.getElementById("featured-properties");
  if (!container || typeof getFeaturedProperties !== "function") return;
  container.innerHTML = getFeaturedProperties().map(renderPropertyCard).join("");
  rebindWhatsApp(container);
  if (typeof aeSyncFavorites === "function") aeSyncFavorites(container);
}

function initListingsPage() {
  const container = document.getElementById("properties-list");
  if (!container || typeof filterProperties !== "function") return;

  const urlParams = new URLSearchParams(window.location.search);
  const pageName = window.location.pathname.split("/").pop().toLowerCase();
  const pageBedroomType = pageName.startsWith("1rk-flats-for-rent") ? "1RK" : (pageName.startsWith("1bhk-flats-for-rent") ? "1BHK" : (pageName.startsWith("2bhk-flats-for-rent") ? "2BHK" : ""));
  var stored = {};
  try {
    stored = JSON.parse(sessionStorage.getItem("ae_filters") || "{}") || {};
    sessionStorage.removeItem("ae_filters");
  } catch (e) { stored = {}; }
  const filters = {
    status: stored.status || urlParams.get("status") || "all",
    type: stored.type || urlParams.get("type") || "all",
    location: stored.location || urlParams.get("location") || "all",
    bedrooms: stored.bedrooms || urlParams.get("bedrooms") || "all",
    bedroomType: pageBedroomType,
    furnishing: stored.furnishing || urlParams.get("furnishing") || "all",
    minPrice: stored.minPrice || urlParams.get("minPrice") || "",
    maxPrice: stored.maxPrice || urlParams.get("maxPrice") || ""
  };
  // Strip query string from address bar immediately
  if (window.location.search) {
    try { window.history.replaceState({}, "", window.location.pathname); } catch (e) {}
  }

  const filterForm = document.getElementById("filter-form");
  if (filterForm) {
    // Apply URL params to form controls, but NEVER overwrite hidden locked fields
    Object.keys(filters).forEach(function (key) {
      const el = filterForm.querySelector('[name="' + key + '"]');
      if (!el) return;
      if (el.type === "hidden") return; // keep locked status/location
      if (filters[key] && filters[key] !== "all") el.value = filters[key];
    });
    // Force filters from hidden fields (buy=sale, rent=rent, area=location)
    const hs = filterForm.querySelector('input[name="status"][type="hidden"]');
    const hl = filterForm.querySelector('input[name="location"][type="hidden"]');
    if (hs && hs.value) filters.status = hs.value;
    if (hl && hl.value) filters.location = hl.value;

    filterForm.addEventListener("click", function (e) {
      if (!e.target.closest("[data-clear-filters]")) return;
      e.preventDefault();
      filterForm.querySelectorAll("select").forEach(function (s) { s.selectedIndex = 0; });
      filterForm.querySelectorAll('input[type="number"]').forEach(function (i) { i.value = ""; });
      filterForm.querySelectorAll('input[type="checkbox"]').forEach(function (i) { i.checked = false; });
      applyFilters();
    });
    filterForm.addEventListener("change", applyFilters);
    filterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      applyFilters();
    });
  }
  applyFilters();

  function applyFilters() {
    const form = document.getElementById("filter-form");
    const current = {
      status: form?.querySelector('[name="status"]')?.value || "all",
      type: form?.querySelector('[name="type"]')?.value || "all",
      location: form?.querySelector('[name="location"]')?.value || "all",
      bedrooms: form?.querySelector('[name="bedrooms"]')?.value || "all",
      bedroomType: pageBedroomType,
      furnishing: form?.querySelector('[name="furnishing"]')?.value || "all",
      minPrice: form?.querySelector('[name="minPrice"]')?.value || "",
      maxPrice: form?.querySelector('[name="maxPrice"]')?.value || "",
      sort: form?.querySelector('[name="sort"]')?.value || "",
      bachelors: !!form?.querySelector('[name="bachelors"]')?.checked,
      parking: !!form?.querySelector('[name="parking"]')?.checked,
      furnishedOnly: !!form?.querySelector('[name="furnishedOnly"]')?.checked
    };
    // Prefer hidden fields (buy/rent/area pages lock status or location)
    const hiddenStatus = form?.querySelector('input[name="status"][type="hidden"]');
    const hiddenLoc = form?.querySelector('input[name="location"][type="hidden"]');
    if (hiddenStatus && hiddenStatus.value) current.status = hiddenStatus.value;
    if (hiddenLoc && hiddenLoc.value) current.location = hiddenLoc.value;

    const results = filterProperties(current);
    const countEl = document.getElementById("results-count");
    if (countEl) {
      countEl.innerHTML = "Showing <strong>" + results.length + "</strong> propert" + (results.length === 1 ? "y" : "ies");
    }
    if (results.length === 0) {
      const reqHref = document.getElementById("requirement") ? "#requirement" : "rent.html#requirement";
      const waText = "Hi Akshat Estate, I could not find a match on the website. I'm looking for " + describeFilters(current) + ". Please share options.";
      container.innerHTML = '<div class="no-results"><i class="fas fa-search"></i><h3>No properties match these filters</h3>' +
        '<p>Try removing a filter, or tell us what you need and we will look for it.</p>' +
        '<div class="no-results-actions"><a href="' + reqHref + '" class="btn btn-primary">Tell us what you need</a>' +
        '<a href="#" class="btn btn-whatsapp" data-whatsapp data-whatsapp-msg="' + escapeAttr(waText) + '"><i class="fab fa-whatsapp"></i> WhatsApp Us</a></div></div>';
      rebindWhatsApp(container);
    } else {
      const renderer = typeof renderPropertyHCard === "function" ? renderPropertyHCard : renderPropertyCard;
      container.innerHTML = '<div class="property-list">' + results.map(renderer).join("") + '</div>';
      rebindWhatsApp(container);
    }
    // Keep URL clean — do not put filter query params in the address bar
    if (window.location.search) {
      try { window.history.replaceState({}, "", window.location.pathname); } catch (e) {}
    }

    const favorites = JSON.parse(localStorage.getItem("ae_favorites") || "[]");
    container.querySelectorAll(".property-favorite").forEach(function (btn) {
      if (favorites.includes(btn.getAttribute("data-id"))) {
        btn.classList.add("active");
        btn.querySelector("i").className = "fas fa-heart";
      }
    });
  }
}

/* Plain-English summary of the active filters, e.g. "a 2 BHK flat in Memnagar, furnished, up to ₹20,000" */
function describeFilters(f) {
  const bits = [];
  const size = f.bedrooms && f.bedrooms !== "all" ? (f.bedrooms === "1RK" ? "1 RK" : f.bedrooms + " BHK") : "";
  const kind = f.type && f.type !== "all" ? ({ apartment: "flat", bungalow: "bungalow", office: "office", shop: "shop" }[f.type] || f.type) : "home";
  let what = "a " + (size ? size + " " : "") + kind + (f.status === "sale" ? " for sale" : " for rent");
  if (f.location && f.location !== "all") what += " in " + f.location;
  bits.push(what);
  if (f.furnishing && f.furnishing !== "all") bits.push(f.furnishing);
  if (f.furnishedOnly) bits.push("furnished or semi-furnished");
  if (f.bachelors) bits.push("bachelors allowed");
  if (f.parking) bits.push("with parking");
  if (f.minPrice) bits.push("from " + formatINR(f.minPrice));
  if (f.maxPrice) bits.push("up to " + formatINR(f.maxPrice));
  return bits.join(", ");
}

/* Area pages: rent range per size, worked out from the rental listings currently on the site */
function initAreaRentTables() {
  if (typeof getAreaRentStats !== "function") return;
  document.querySelectorAll("[data-area-rent]").forEach(function (el) {
    const area = el.getAttribute("data-area-rent");
    const stats = getAreaRentStats(area);
    if (!stats.rows.length) {
      el.innerHTML = '<p class="rent-table-note">There are no rental flats listed in ' + area + ' right now. Tell us what you need and we will look for one.</p>';
      return;
    }
    const rows = stats.rows.map(function (r) {
      const range = r.min === r.max ? formatINR(r.min) : formatINR(r.min) + " &ndash; " + formatINR(r.max);
      return "<tr><td>" + r.label + "</td><td>" + r.count + "</td><td>" + range + " / month</td></tr>";
    }).join("");
    el.innerHTML = '<div class="rent-table-wrap"><table class="rent-table"><thead><tr><th>Size</th><th>Listings</th><th>Monthly rent</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
      '<p class="rent-table-note">Based on the ' + stats.total + " rental flat" + (stats.total === 1 ? "" : "s") + " currently listed on Akshat Estate in " + area + ". Actual rent depends on the building, floor and furnishing.</p>";
  });

  /* Ahmedabad page: the three areas side by side */
  document.querySelectorAll("[data-area-compare]").forEach(function (el) {
    const areas = ["Gurukul", "Memnagar", "Sola"];
    const stats = areas.map(function (a) { return getAreaRentStats(a); });
    const labels = ["1 RK", "1 BHK", "2 BHK", "3 BHK"];
    const body = labels.map(function (label) {
      const cells = stats.map(function (s) {
        const r = s.rows.filter(function (x) { return x.label === label; })[0];
        if (!r) return '<td class="rent-none">&ndash;</td>';
        return "<td>" + (r.min === r.max ? formatINR(r.min) : formatINR(r.min) + " &ndash; " + formatINR(r.max)) + "</td>";
      }).join("");
      return "<tr><td>" + label + "</td>" + cells + "</tr>";
    }).join("");
    el.innerHTML = '<div class="rent-table-wrap"><table class="rent-table"><thead><tr><th>Monthly rent</th>' +
      areas.map(function (a) { return '<th><a href="' + a.toLowerCase() + '.html">' + a + "</a></th>"; }).join("") +
      "</tr></thead><tbody>" + body + '</tbody></table></div><p class="rent-table-note">Based on the rental flats currently listed on Akshat Estate. A dash means we have no listing of that size in that area right now.</p>';
  });
}

/* ----------------------------------------------------------
   My Shortlist page: saved homes, compare table, share on WhatsApp.
   A shared link looks like shortlist.html?ids=14,5,27 and shows those homes read-only.
   ---------------------------------------------------------- */
function initShortlistPage() {
  const list = document.getElementById("shortlist-list");
  if (!list || typeof getPropertyById !== "function") return;

  const shared = (new URLSearchParams(location.search).get("ids") || "")
    .split(",").map(function (s) { return s.trim(); }).filter(function (s) { return /^\d+$/.test(s); }).slice(0, 30);
  const isShared = shared.length > 0;
  const toolbar = document.getElementById("shortlist-toolbar");
  const banner = document.getElementById("shortlist-banner");
  const compare = document.getElementById("shortlist-compare");
  const base = new URL("shortlist.html", document.baseURI).href;

  function currentIds() { return isShared ? shared : getSavedIds(); }
  function currentProps() {
    return currentIds().map(function (id) { return getPropertyById(id); }).filter(Boolean);
  }
  function shareUrl(props) { return base + "?ids=" + props.map(function (p) { return p.id; }).join(","); }

  function render() {
    const props = currentProps();
    toolbar.hidden = props.length === 0;

    if (isShared) {
      banner.innerHTML = '<div class="shortlist-banner"><span><i class="fas fa-share-nodes"></i> This is a shortlist someone shared with you.</span>' +
        '<button type="button" class="btn btn-primary btn-sm" id="shortlist-import">Add these to my shortlist</button></div>';
      const clear = document.getElementById("shortlist-clear");
      if (clear) clear.hidden = true;
    }

    if (!props.length) {
      list.innerHTML = '<div class="shortlist-empty"><i class="far fa-heart"></i><h3>' +
        (isShared ? "These homes are no longer listed" : "No saved homes yet") + '</h3>' +
        '<p>' + (isShared ? "They may have been rented out. We can find similar homes for you." : "Tap the heart on any home to save it here, then compare your favourites side by side.") + '</p>' +
        '<a href="rent.html" class="btn btn-primary">Browse Rentals</a><a href="rent.html#requirement" class="btn btn-outline">Tell us what you need</a></div>';
      compare.innerHTML = "";
      return;
    }

    document.getElementById("shortlist-count").textContent = props.length + (props.length === 1 ? " home" : " homes") + (isShared ? " shared with you" : " saved");
    list.innerHTML = props.map(renderPropertyHCard).join("");
    rebindWhatsApp(list);
    if (typeof aeSyncFavorites === "function") aeSyncFavorites(list);

    /* WhatsApp: a short message with a link for each home */
    const lines = ["Hi, here are the homes I shortlisted on Akshat Estate:", ""];
    props.slice(0, 10).forEach(function (p, i) {
      lines.push((i + 1) + ". " + p.title + " (" + p.priceDisplay + (p.status === "rent" ? " / month" : "") + ")");
      lines.push(getPropertyUrl(p));
    });
    lines.push("", "All of them in one place: " + shareUrl(props), "", "Please share more details.");
    const wa = document.getElementById("shortlist-share");
    wa.href = getWhatsAppLink(lines.join("\n"));
    wa.target = "_blank"; wa.rel = "noopener noreferrer";

    renderCompare(props);
  }

  function renderCompare(props) {
    if (props.length < 2) { compare.innerHTML = ""; return; }
    const rows = [
      ["Rent / Price", function (p) { return '<span class="cmp-price">' + p.priceDisplay + (p.status === "rent" ? " / month" : "") + "</span>"; }],
      ["Area", function (p) { return p.location + ", " + p.city; }],
      ["Type", function (p) { return formatPropertyType(p); }],
      ["BHK", function (p) { return getBhkText(p) || "&ndash;"; }],
      ["Super Built-up", function (p) { return p.area + " " + (p.areaUnit || "sq.ft"); }],
      ["Carpet Area", function (p) { return getPropertyExtras(p).carpetArea + " " + (p.areaUnit || "sq.ft"); }],
      ["Bathrooms", function (p) { return p.bathrooms > 0 ? p.bathrooms : "&ndash;"; }],
      ["Furnishing", function (p) { return formatFurnishing(p.furnishing); }],
      ["Bachelors", function (p) { return p.type === "apartment" ? (getPropertyExtras(p).bachelorsAllowed ? "Yes" : "No") : "&ndash;"; }],
      ["Floor", function (p) { const x = getPropertyExtras(p); return x.floorNo + " of " + x.totalFloors; }],
      ["Car Parking", function (p) { return getPropertyExtras(p).carParking; }]
    ];
    const head = '<tr><th></th>' + props.map(function (p) {
      return '<th class="cmp-title"><a href="property-details.html?id=' + p.id + '">' + p.title + '</a>' +
        (isShared ? "" : '<br><a href="#" class="cmp-remove" data-remove="' + p.id + '">Remove</a>') + "</th>";
    }).join("") + "</tr>";
    const body = rows.map(function (r) {
      return "<tr><th scope=\"row\">" + r[0] + "</th>" + props.map(function (p) { return "<td>" + r[1](p) + "</td>"; }).join("") + "</tr>";
    }).join("");
    compare.innerHTML = '<div class="compare-section"><h2>Compare side by side</h2><p class="rent-table-note" style="margin:0 0 0.9rem">Swipe sideways to see every home.</p>' +
      '<div class="rent-table-wrap"><table class="rent-table compare-table"><thead>' + head + "</thead><tbody>" + body + "</tbody></table></div></div>";
  }

  document.addEventListener("click", function (e) {
    const rm = e.target.closest("[data-remove]");
    if (rm) {
      e.preventDefault();
      const id = String(rm.getAttribute("data-remove"));
      aeSetFavs(aeFavs().filter(function (f) { return f !== id; }));
      render();
      return;
    }
    if (e.target.closest("#shortlist-import")) {
      const merged = aeFavs();
      shared.forEach(function (id) { if (merged.indexOf(id) < 0) merged.push(id); });
      aeSetFavs(merged);
      location.href = "shortlist.html";
      return;
    }
    if (e.target.closest("#shortlist-clear")) {
      if (window.confirm("Remove all saved homes from your shortlist?")) { aeSetFavs([]); render(); }
      return;
    }
    if (e.target.closest("#shortlist-copy")) {
      const props = currentProps();
      const btn = document.getElementById("shortlist-copy");
      const original = btn.innerHTML;
      copyToClipboard(shareUrl(props)).then(function () {
        btn.innerHTML = '<i class="fas fa-check"></i> Link copied';
        setTimeout(function () { btn.innerHTML = original; }, 2000);
      }, function () { window.prompt("Copy this link:", shareUrl(props)); });
    }
  });

  /* un-hearting a home on this page removes it from the list */
  window.addEventListener("ae:favorites-changed", function () { if (!isShared) render(); });
  render();
}

function initPropertyDetails() {
  const container = document.getElementById("property-detail");
  if (!container || typeof getPropertyById !== "function") return;
  const id = new URLSearchParams(window.location.search).get("id");
  const property = getPropertyById(id);

  if (!property) {
    container.innerHTML = '<div class="no-results" style="grid-column:1/-1"><i class="fas fa-home"></i><h3>Property not found</h3><p>This property may no longer be available.</p><a href="properties.html" class="btn btn-primary mt-2">Browse Properties</a></div>';
    return;
  }

  document.title = property.title + " in " + property.location + " | Akshat Estate";
  aeDetailSeo(property);
  const badgeClass = property.status === "sale" ? "badge-sale" : "badge-rent";
  const badgeText = property.status === "sale" ? "For Sale" : "For Rent";
  const bedsText = property.bedrooms > 0 ? property.bedrooms + " BHK" : "N/A";
  const bathsText = property.bathrooms > 0 ? property.bathrooms : "N/A";
  const typeLabel = property.type.charAt(0).toUpperCase() + property.type.slice(1);
  const waMessage = getPropertyWhatsAppMessage(property);
  const amenitiesHTML = property.amenities.map(function (a) {
    return '<span class="amenity-pill active"><i class="fas fa-check"></i> ' + a + '</span>';
  }).join("");
  const galleryThumbs = property.gallery.map(function (img, i) {
    return '<img src="' + img + '" alt="Gallery ' + (i + 1) + '" class="img-blur ' + (i === 0 ? 'active' : '') + '" data-src="' + img + '" loading="lazy">';
  }).join("");

  container.innerHTML = `
    <div class="detail-layout">
      <div class="detail-main">
        <div class="detail-gallery">
          <img src="${property.gallery[0]}" alt="${property.title}" id="gallery-main-img" class="img-blur">
          <button class="request-image-btn" type="button" data-whatsapp data-whatsapp-msg="${escapeAttr(getPhotoRequestMessage(property))}">
            <i class="fas fa-camera"></i> Request Photos
          </button>
        </div>
        <div class="gallery-thumbs">${galleryThumbs}</div>
        <div class="detail-tags">
          <span class="badge ${badgeClass}">${badgeText}</span>
          <span class="badge badge-verified-listing">Verified Listing</span>
          <span class="badge badge-type">${typeLabel}</span>
        </div>
        <h1 class="detail-title">${property.title}</h1>
        <div class="detail-loc"><i class="fas fa-map-marker-alt"></i> ${property.location}, ${property.city}</div>
        <div class="detail-price">${property.priceDisplay}</div>
        <div class="specs-card">
          ${renderSpecItems(getPropertyDetailRows(property))}
        </div>
        <div class="detail-section">
          <h3>Description</h3>
          <p>${property.description}</p>
        </div>
        <div class="detail-section">
          <h3>Nearby Landmarks</h3>
          <p class="nearby-landmarks">${property.location}, Ahmedabad — contact us for exact address and site visit.</p>
        </div>
      </div>
      <div>
        <div class="owner-card">
          <div class="owner-avatar">AE</div>
          <div>
            <h4>Akshat Estate</h4>
            <p>Property Consultant · Ahmedabad</p>
            <p style="margin-top:0.35rem">Contact via form or WhatsApp below.</p>
          </div>
        </div>
        <div class="sidebar-card">
          <h3>Interested in this property?</h3>
          <p>Message us on WhatsApp and we will share details and arrange a visit.</p>
          <a href="#" data-whatsapp data-whatsapp-msg="${escapeAttr(waMessage)}" class="btn btn-whatsapp btn-block btn-lg"><i class="fab fa-whatsapp"></i> WhatsApp About This Property</a>
          <a href="tel:+918141293057" class="btn btn-secondary btn-block" style="margin-top:0.5rem"><i class="fas fa-phone"></i> Call +91 81412 93057</a>
          <button type="button" class="btn btn-primary btn-block" data-visit-open data-visit-id="${property.id}" data-visit-title="${escapeAttr(property.title)}" style="margin-top:0.5rem"><i class="far fa-calendar-check"></i> Book a visit</button>
          <button type="button" class="btn btn-outline btn-block property-favorite detail-save" data-id="${property.id}" style="margin-top:0.5rem"><i class="far fa-heart"></i> <span>Save to shortlist</span></button>
          <div class="sidebar-divider"><span>or send an inquiry</span></div>
          <form id="contact-form">
            <div class="form-group"><input type="text" name="name" required placeholder="Your Name"></div>
            <div class="form-group"><input type="tel" name="phone" required placeholder="Phone Number"></div>
            <div class="form-group"><input type="email" name="email" placeholder="Email (optional)"></div>
            <div class="form-group"><textarea name="message" placeholder="Message"></textarea></div>
            <button type="submit" class="btn btn-outline btn-block">Send Inquiry</button>
          </form>
        </div>
      </div>
    </div>
    <div class="similar-section">
      <h2>Similar Properties</h2>
      <div class="properties-grid" id="similar-properties"></div>
    </div>
  `;

  container.querySelectorAll(".gallery-thumbs img").forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      document.getElementById("gallery-main-img").src = this.getAttribute("data-src");
      container.querySelectorAll(".gallery-thumbs img").forEach(function (t) { t.classList.remove("active"); });
      this.classList.add("active");
    });
  });

  
  // Similar properties
  var similarEl = document.getElementById("similar-properties");
  if (similarEl && typeof PROPERTIES !== "undefined") {
    var similar = PROPERTIES.filter(function(p) {
      return p.id !== property.id && (p.location === property.location || p.status === property.status);
    }).slice(0, 3);
    if (similar.length === 0) similar = PROPERTIES.filter(function(p) { return p.id !== property.id; }).slice(0, 3);
    similarEl.innerHTML = similar.map(renderPropertyCard).join("");
  }

  // Floating WhatsApp button sends the same property-specific message
  document.querySelectorAll(".whatsapp-float").forEach(function (el) {
    el.setAttribute("data-whatsapp-msg", waMessage);
    if (typeof getWhatsAppLink === "function") el.href = getWhatsAppLink(waMessage);
  });

  // Re-bind WhatsApp on request image buttons

  if (typeof getWhatsAppLink === "function") {
    container.querySelectorAll("[data-whatsapp]").forEach(function (el) {
      el.href = getWhatsAppLink(el.getAttribute("data-whatsapp-msg"));
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
  }
  if (typeof aeSyncFavorites === "function") aeSyncFavorites(container);
  const waBtn = container.querySelector(".sidebar-card .btn-whatsapp");
  if (waBtn && typeof aeAddMobileCtaBar === "function") aeAddMobileCtaBar(waBtn.href);
}

/* Search-engine tags for the property page, set from the listing (canonical link, description, RealEstateListing data) */
function aeDetailSeo(property) {
  try {
    const url = location.origin + location.pathname + "?id=" + encodeURIComponent(property.id);
    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement("link"); canon.rel = "canonical"; document.head.appendChild(canon); }
    canon.href = url;
    const desc = (property.description || property.title).slice(0, 300);
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = desc;
    const offer = property.status === "rent"
      ? { "@type": "Offer", price: property.price, priceCurrency: "INR", availability: "https://schema.org/InStock",
          priceSpecification: { "@type": "UnitPriceSpecification", price: property.price, priceCurrency: "INR", unitText: "MONTH" } }
      : { "@type": "Offer", price: property.price, priceCurrency: "INR", availability: "https://schema.org/InStock" };
    const ld = {
      "@context": "https://schema.org", "@type": "RealEstateListing",
      name: property.title, url: url, description: desc,
      address: { "@type": "PostalAddress", addressLocality: property.location + ", " + property.city, addressRegion: "Gujarat", addressCountry: "IN" },
      offers: offer
    };
    if (/^https?:/i.test(property.image || "")) ld.image = property.image;
    let tag = document.getElementById("ae-listing-ld");
    if (!tag) { tag = document.createElement("script"); tag.type = "application/ld+json"; tag.id = "ae-listing-ld"; document.head.appendChild(tag); }
    tag.textContent = JSON.stringify(ld);
  } catch (e) {}
}
