
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
  initHeroSearch();
  initListingsPage();
  initFeaturedProperties();
  initPropertyCardClicks();
  if (document.getElementById("property-detail")) initPropertyDetails();
});

function initPropertyCardClicks() {
  document.addEventListener("click", function (e) {
    const card = e.target.closest(".property-card, .property-hcard");
    if (!card) return;
    if (e.target.closest("a, button, input, select, textarea")) return;
    const id = card.getAttribute("data-id");
    if (id) window.location.href = "property-details.html?id=" + encodeURIComponent(id);
  });
}

function initHeroSearch() {
  const form = document.getElementById("hero-search-form");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const params = new URLSearchParams();
    const status = form.querySelector('[name="status"]')?.value;
    const type = form.querySelector('[name="type"]')?.value;
    const location = form.querySelector('[name="location"]')?.value;
    const bedrooms = form.querySelector('[name="bedrooms"]')?.value;
    const maxPrice = form.querySelector('[name="maxPrice"]')?.value;
    const pending = {};
    if (status && status !== "all") pending.status = status;
    if (type && type !== "all") pending.type = type;
    if (location && location !== "all") pending.location = location;
    if (bedrooms && bedrooms !== "all") pending.bedrooms = bedrooms;
    if (maxPrice) pending.maxPrice = maxPrice;
    try { sessionStorage.setItem("ae_filters", JSON.stringify(pending)); } catch (e) {}
    window.location.href = "properties.html";
  });
}

function initFeaturedProperties() {
  const container = document.getElementById("featured-properties");
  if (!container || typeof getFeaturedProperties !== "function") return;
  container.innerHTML = getFeaturedProperties().map(renderPropertyCard).join("");
  rebindWhatsApp(container);
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
      maxPrice: form?.querySelector('[name="maxPrice"]')?.value || ""
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
      container.innerHTML = '<div class="no-results"><i class="fas fa-search"></i><h3>No properties found</h3><p>Try adjusting your filters.</p></div>';
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
  const badgeClass = property.status === "sale" ? "badge-sale" : "badge-rent";
  const badgeText = property.status === "sale" ? "For Sale" : "For Rent";
  const bedsText = property.bedrooms > 0 ? property.bedrooms + " BHK" : "N/A";
  const bathsText = property.bathrooms > 0 ? property.bathrooms : "N/A";
  const typeLabel = property.type.charAt(0).toUpperCase() + property.type.slice(1);
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
          <button class="request-image-btn" type="button" data-whatsapp data-whatsapp-msg="Hello Akshat Estate, please share photos for: ${property.title} in ${property.location} (ID: ${property.id}).">
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
          <div class="spec-item"><div class="spec-label">Built-up Area</div><div class="spec-value">${property.area} ${property.areaUnit}</div></div>
          <div class="spec-item"><div class="spec-label">Property Type</div><div class="spec-value">${typeLabel}</div></div>
          <div class="spec-item"><div class="spec-label">Bedrooms</div><div class="spec-value">${bedsText}</div></div>
          <div class="spec-item"><div class="spec-label">Bathrooms</div><div class="spec-value">${bathsText}</div></div>
          <div class="spec-item"><div class="spec-label">Transaction</div><div class="spec-value">${badgeText}</div></div>
          <div class="spec-item"><div class="spec-label">Listed By</div><div class="spec-value">Verified User</div></div>
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
          <h3>Send Inquiry</h3>
          <p>Interested in ${property.title}?</p>
          <form id="contact-form">
            <div class="form-group"><input type="text" name="name" required placeholder="Your Name"></div>
            <div class="form-group"><input type="tel" name="phone" required placeholder="Phone Number"></div>
            <div class="form-group"><input type="email" name="email" placeholder="Email (optional)"></div>
            <div class="form-group"><textarea name="message" placeholder="Message"></textarea></div>
            <button type="submit" class="btn btn-primary btn-block">Send Inquiry</button>
          </form>
          <div style="margin-top:0.75rem;display:flex;flex-direction:column;gap:0.5rem">
            <a href="#" data-whatsapp data-whatsapp-msg="Hello Akshat Estate, I am interested in ${property.title} in ${property.location} (ID: ${property.id})." class="btn btn-outline btn-block"><i class="fab fa-whatsapp"></i> WhatsApp</a>
            <a href="tel:+918141293057" class="btn btn-secondary btn-block"><i class="fas fa-phone"></i> Call +91 81412 93057</a>
          </div>
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

  // Re-bind WhatsApp on request image buttons

  if (typeof getWhatsAppLink === "function") {
    container.querySelectorAll("[data-whatsapp]").forEach(function (el) {
      el.href = getWhatsAppLink(el.getAttribute("data-whatsapp-msg"));
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });
  }
}
