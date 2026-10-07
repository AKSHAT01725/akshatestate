/**
 * Akshat Estate - Property Data
 * 15 real listings (14 for rent in Gurukul and Memnagar, 1 for sale in Sola), exported from the admin panel on 2026-10-07.
 * This is the built-in fallback list. When Firebase has listings, the site uses those instead.
 * Photos starting with images/ are files in this site's images folder. Stock (Unsplash) photos are placeholders: they stay blurred behind a Request Image button.
 */

const PROPERTIES = [
  {
    id: 3,
    title: "1 BHK Tenament for Rent in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    areaUnit: "sq.ft",
    carpetArea: 500,
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 15000,
    priceDisplay: "₹15,000",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"],
    description: "Compact 1 BHK ideal for Family or Bachelor. Close to markets and public transport in Gurukul.",
    amenities: ["Security", "Water Supply", "Balcony"],
    floorNo: 0,
    totalFloors: 2,
    carParking: 0,
    bachelorsAllowed: true,
    featured: false,
    active: true,
    homeFeatured: true,
    homeRank: 4,
    confirmedAt: 1791349902826
  },
  {
    id: 20,
    title: "1 BHK Godown for Rent in Sonal Char rasta, Gurukul",
    type: "shop",
    status: "rent",
    bedrooms: 0,
    bathrooms: 1,
    area: 1000,
    areaUnit: "sq.ft",
    carpetArea: 1000,
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 25000,
    priceDisplay: "₹25,000",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80"],
    description: "Budget Godown near Sonal Char rasta in Gurukul. Good for storage working.",
    amenities: ["Security", "Parking", "Water Supply", "Power Backup"],
    floorNo: 0,
    totalFloors: 2,
    carParking: 1,
    bachelorsAllowed: false,
    featured: false,
    active: true,
    homeFeatured: false,
    homeRank: 0,
    confirmedAt: 1791349902826
  },
  {
    id: 27,
    title: "1 Room Semi-Furnished with AC in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 0,
    bedroomType: "1ROOM",
    bathrooms: 1,
    area: 300,
    areaUnit: "sq.ft",
    carpetArea: 300,
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "semi-furnished",
    price: 14000,
    priceDisplay: "₹14,000",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"],
    description: "Semi-furnished 1 Room with AC and bed. Quiet residential block in Gurukul.",
    amenities: ["Parking", "Security", "Water Supply", "AC"],
    floorNo: 1,
    totalFloors: 3,
    carParking: 0,
    bachelorsAllowed: true,
    availability: "available",
    featured: false,
    active: true,
    homeFeatured: true,
    homeRank: 3,
    confirmedAt: 1791349902826
  },
  {
    id: 31,
    title: "1 RK Flat for Rent in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 0,
    bedroomType: "1RK",
    bathrooms: 1,
    area: 300,
    areaUnit: "sq.ft",
    carpetArea: 300,
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 12000,
    priceDisplay: "₹12,000",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"],
    description: "Compact 1 RK rental in Gurukul, suitable for a single tenant or student and close to everyday conveniences.",
    amenities: ["Security", "Water Supply", "Balcony"],
    floorNo: 1,
    totalFloors: 2,
    carParking: 0,
    bachelorsAllowed: false,
    featured: false,
    active: true,
    homeFeatured: true,
    homeRank: 1,
    confirmedAt: 1791349902826
  },
  {
    id: 34,
    title: "1 RK Flat for Rent in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 0,
    bedroomType: "1RK",
    bathrooms: 1,
    area: 300,
    areaUnit: "sq.ft",
    carpetArea: 300,
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "semi-furnished",
    price: 13000,
    priceDisplay: "₹13,000",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"],
    description: "Compact 1 RK rental in Gurukul, suitable for a single tenant or student and close to everyday conveniences.",
    amenities: ["Security", "Water Supply", "Balcony"],
    floorNo: 0,
    totalFloors: 2,
    carParking: 0,
    bachelorsAllowed: true,
    featured: false,
    active: true,
    homeFeatured: true,
    homeRank: 2,
    confirmedAt: 1791349902826
  },
  {
    id: 35,
    title: "1 BHK Tenament for Rent in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    areaUnit: "sq.ft",
    carpetArea: 500,
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "semi-furnished",
    price: 14000,
    priceDisplay: "₹14,000",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"],
    description: "Compact 1 BHK ideal for Family or Bachelor. Close to markets and public transport in Gurukul.",
    amenities: ["Security", "Water Supply", "Balcony"],
    floorNo: 1,
    totalFloors: 2,
    carParking: 0,
    bachelorsAllowed: true,
    featured: false,
    active: true,
    homeFeatured: true,
    homeRank: 6,
    confirmedAt: 1791349902826
  },
  {
    id: 36,
    title: "1 BHK Tenament for Rent in Gurukul",
    type: "apartment",
    status: "rent",
    bedrooms: 1,
    bathrooms: 2,
    area: 600,
    areaUnit: "sq.ft",
    carpetArea: 600,
    location: "Gurukul",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 17000,
    priceDisplay: "₹17,000",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"],
    description: "Compact 1 BHK ideal for Family or Bachelor. Close to markets and public transport in Gurukul.",
    amenities: ["Security", "Water Supply", "Balcony"],
    floorNo: 0,
    totalFloors: 2,
    carParking: 0,
    bachelorsAllowed: true,
    featured: false,
    active: true,
    homeFeatured: true,
    homeRank: 7,
    confirmedAt: 1791349902826
  },
  {
    id: 37,
    title: "1 BHK Tenament for Rent in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    areaUnit: "sq.ft",
    carpetArea: 500,
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 15000,
    priceDisplay: "₹15,000",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"],
    description: "Compact 1 BHK ideal for Family or Bachelor. Close to markets and public transport in Memnagar.",
    amenities: ["Security", "Water Supply", "Balcony"],
    floorNo: 0,
    totalFloors: 2,
    carParking: 0,
    bachelorsAllowed: true,
    featured: false,
    active: true,
    homeFeatured: true,
    homeRank: 9,
    confirmedAt: 1791349902826
  },
  {
    id: 38,
    title: "1 BHK Godown for Rent in Sonal Char rasta, Memnagar",
    type: "shop",
    status: "rent",
    bedrooms: 0,
    bathrooms: 1,
    area: 1000,
    areaUnit: "sq.ft",
    carpetArea: 1000,
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 25000,
    priceDisplay: "₹25,000",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80"],
    description: "Budget Godown near Sonal  Char rasta in Memnagar. Good for storage working.",
    amenities: ["Security", "Parking", "Water Supply", "Power Backup"],
    floorNo: 0,
    totalFloors: 2,
    carParking: 1,
    bachelorsAllowed: false,
    featured: false,
    active: true,
    homeFeatured: false,
    confirmedAt: 1791349902826
  },
  {
    id: 39,
    title: "1 Room Semi-Furnished with AC in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 0,
    bedroomType: "1ROOM",
    bathrooms: 1,
    area: 300,
    areaUnit: "sq.ft",
    carpetArea: 300,
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "semi-furnished",
    price: 14000,
    priceDisplay: "₹14,000",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80"],
    description: "Semi-furnished 1 Room with AC and bed. Quiet residential block in Memnagar.",
    amenities: ["Parking", "Security", "Water Supply", "AC"],
    floorNo: 1,
    totalFloors: 3,
    carParking: 1,
    bachelorsAllowed: true,
    availability: "available",
    featured: false,
    active: true,
    homeFeatured: false,
    confirmedAt: 1791349902826
  },
  {
    id: 40,
    title: "1 RK Flat for Rent in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 0,
    bedroomType: "1RK",
    bathrooms: 1,
    area: 300,
    areaUnit: "sq.ft",
    carpetArea: 300,
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 12000,
    priceDisplay: "₹12,000",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"],
    description: "Compact 1 RK rental in Memnagar, suitable for a single tenant or student and close to everyday conveniences.",
    amenities: ["Security", "Water Supply", "Balcony"],
    floorNo: 1,
    totalFloors: 2,
    carParking: 0,
    bachelorsAllowed: false,
    featured: false,
    active: true,
    homeFeatured: true,
    homeRank: 8,
    confirmedAt: 1791349902826
  },
  {
    id: 41,
    title: "1 RK Flat for Rent in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 0,
    bedroomType: "1RK",
    bathrooms: 1,
    area: 300,
    areaUnit: "sq.ft",
    carpetArea: 300,
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "semi-furnished",
    price: 13000,
    priceDisplay: "₹13,000",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"],
    description: "Compact 1 RK rental in Memnagar, suitable for a single tenant or student and close to everyday conveniences.",
    amenities: ["Security", "Water Supply", "Balcony"],
    floorNo: 0,
    totalFloors: 2,
    carParking: 0,
    bachelorsAllowed: true,
    featured: false,
    active: true,
    homeFeatured: true,
    homeRank: 5,
    confirmedAt: 1791349902826
  },
  {
    id: 42,
    title: "1 BHK Tenament for Rent in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 1,
    bathrooms: 1,
    area: 500,
    areaUnit: "sq.ft",
    carpetArea: 500,
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "semi-furnished",
    price: 14000,
    priceDisplay: "₹14,000",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"],
    description: "Compact 1 BHK ideal for Family or Bachelor. Close to markets and public transport in Memnagar.",
    amenities: ["Security", "Water Supply", "Balcony"],
    floorNo: 1,
    totalFloors: 2,
    carParking: 0,
    bachelorsAllowed: true,
    featured: false,
    active: true,
    homeFeatured: false,
    confirmedAt: 1791349902827
  },
  {
    id: 43,
    title: "1 BHK Tenament for Rent in Memnagar",
    type: "apartment",
    status: "rent",
    bedrooms: 1,
    bathrooms: 2,
    area: 600,
    areaUnit: "sq.ft",
    carpetArea: 600,
    location: "Memnagar",
    city: "Ahmedabad",
    furnishing: "unfurnished",
    price: 17000,
    priceDisplay: "₹17,000",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"],
    description: "Compact 1 BHK ideal for Family or Bachelor. Close to markets and public transport in Memnagar.",
    amenities: ["Security", "Water Supply", "Balcony"],
    floorNo: 0,
    totalFloors: 2,
    carParking: 0,
    bachelorsAllowed: true,
    availability: "available",
    featured: false,
    active: true,
    homeFeatured: false,
    confirmedAt: 1791349902827
  },
  {
    id: 44,
    title: "2 BHK Full-Furnished Flat for Sale in Sola",
    type: "apartment",
    status: "sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1000,
    areaUnit: "sq.ft",
    carpetArea: 1000,
    location: "Sola",
    city: "Ahmedabad",
    furnishing: "furnished",
    price: 5000000,
    priceDisplay: "₹50 Lakh",
    image: "images/sola-sale-hall.webp",
    gallery: ["images/sola-sale-hall.webp", "images/sola-sale-room.webp", "images/sola-sale-full.webp"],
    description: "",
    amenities: ["Parking", "Lift", "Security", "Power Backup", "Water Supply", "Balcony", "Garden", "AC"],
    floorNo: 2,
    totalFloors: 5,
    carParking: 1,
    bachelorsAllowed: false,
    availability: "available",
    availableFrom: "2026-11-15",
    active: true,
    homeFeatured: false,
    listedAt: 1791349902828,
    confirmedAt: 1791349902828
  }
];

function getPropertyById(id) {
  return PROPERTIES.find(p => p.id === parseInt(id, 10));
}

function getFeaturedProperties() {
  return PROPERTIES.filter(p => p.featured);
}

function filterProperties(filters) {
  const list = PROPERTIES.filter(p => {
    if (filters.status && filters.status !== "all" && p.status !== filters.status) return false;
    if (filters.type && filters.type !== "all" && p.type !== filters.type) return false;
    if (filters.location && filters.location !== "all") {
      var loc = filters.location.toLowerCase();
      // Ahmedabad page = all areas (Gurukul, Memnagar, Sola)
      if (loc === "ahmedabad") {
        var allowed = ["gurukul", "memnagar", "sola", "ahmedabad"];
        if (allowed.indexOf(p.location.toLowerCase()) === -1) return false;
      } else if (p.location.toLowerCase() !== loc) {
        return false;
      }
    }
    if (filters.bedroomType && filters.bedroomType !== "all") {
      if (filters.bedroomType === "1RK") {
        if (p.bedroomType !== "1RK") return false;
      } else if (filters.bedroomType === "1ROOM") {
        if (p.bedroomType !== "1ROOM") return false;
      } else if (filters.bedroomType === "1BHK") {
        if (p.bedroomType || p.bedrooms !== 1) return false;
      } else if (filters.bedroomType === "2BHK") {
        if (p.bedrooms !== 2) return false;
      }
    }
    if (filters.bedrooms && filters.bedrooms !== "all" && !filters.bedroomType) {
      if (filters.bedrooms === "1RK" || filters.bedrooms === "1rk") {
        if (p.bedroomType !== "1RK") return false;
      } else if (filters.bedrooms === "1ROOM" || filters.bedrooms === "1room") {
        if (p.bedroomType !== "1ROOM") return false;
      } else {
        const beds = parseInt(filters.bedrooms, 10);
        if (p.bedroomType || p.bedrooms !== beds) return false;
      }
    }
    if (filters.furnishing && filters.furnishing !== "all" && p.furnishing !== filters.furnishing) return false;
    if (filters.minPrice && p.price < parseInt(filters.minPrice, 10)) return false;
    if (filters.maxPrice && p.price > parseInt(filters.maxPrice, 10)) return false;
    if (isOn(filters.bachelors) && !(p.type === "apartment" && getPropertyExtras(p).bachelorsAllowed)) return false;
    if (isOn(filters.parking) && !hasParking(p)) return false;
    if (isOn(filters.furnishedOnly) && p.furnishing === "unfurnished") return false;
    return true;
  });
  const sorted = sortProperties(list, filters.sort);
  /* rented flats stay visible but come after the available ones */
  return sorted.filter(function (p) { return !isRented(p); }).concat(sorted.filter(isRented));
}

function isOn(v) { return v === true || v === "1" || v === "on" || v === "true"; }

/* Parking: a stored car-parking count, or "Parking" listed in the amenities */
function hasParking(p) {
  return getPropertyExtras(p).carParking > 0 || (p.amenities || []).some(function (a) { return /parking/i.test(a); });
}

/* Sort a list of properties: "newest" (latest added first), "price-asc", "price-desc", "area-desc" */
function sortProperties(list, sort) {
  const out = list.slice();
  if (sort === "price-asc") out.sort(function (a, b) { return a.price - b.price || a.id - b.id; });
  else if (sort === "price-desc") out.sort(function (a, b) { return b.price - a.price || a.id - b.id; });
  else if (sort === "area-desc") out.sort(function (a, b) { return b.area - a.area || a.id - b.id; });
  else if (sort === "newest") out.sort(function (a, b) { return b.id - a.id; });
  return out;
}

/* "New" tag (listed in the last 7 days) and "Updated N days ago" (last time the listing was
   checked as still available; hidden after 30 days so old dates never sit on a card).
   Both come from the admin, so a listing without those dates shows nothing. */
function getFreshness(property) {
  var now = Date.now(), DAY = 86400000, out = { isNew: false, updated: "" };
  if (property.listedAt && now - property.listedAt >= 0 && now - property.listedAt < 7 * DAY) out.isNew = true;
  if (property.confirmedAt) {
    var days = Math.floor((now - property.confirmedAt) / DAY);
    if (days <= 0) out.updated = "Updated today";
    else if (days === 1) out.updated = "Updated yesterday";
    else if (days <= 30) out.updated = "Updated " + days + " days ago";
  }
  return out;
}
/* ----------------------------------------------------------
   Structured data (schema.org) for ONE listing, for search engines.
   Used by the property page (aeDetailSeo in search.js) and by tools/add-structured-data.js, which writes it into
   the static pages in properties/, so both always describe a listing the same way.
   Only facts that are reliably true go in: no floor number, parking or "bachelors allowed", because
   older listings still carry placeholder values for those.
   includeAvailability is false for the static pages: they are not refreshed when you mark a listing Rented,
   so they must not claim "in stock".
   ---------------------------------------------------------- */
const AE_SITE_URL = "https://akshatestate.com";

function aeListingSchema(p, url, includeAvailability) {
  const city = p.city || "Ahmedabad";
  const unit = p.areaUnit || "sq.ft";
  const unitCodes = { "sq.ft": "FTK", "sq.yd": "YDK", "sq.m": "MTK" };
  const kind = p.type === "apartment" ? "Apartment" : p.type === "bungalow" ? "House" : "Place";
  const place = {
    "@type": kind,
    name: p.title,
    address: { "@type": "PostalAddress", addressLocality: city, addressRegion: "Gujarat", addressCountry: "IN" },
    containedInPlace: { "@type": "Place", name: p.location + ", " + city }
  };
  if (kind !== "Place") {
    if (p.bedroomType === "1RK" || p.bedroomType === "1ROOM") place.numberOfRooms = 1;
    else if (p.bedrooms > 0) place.numberOfBedrooms = p.bedrooms;
    if (p.bathrooms > 0) place.numberOfBathroomsTotal = p.bathrooms;
    if (p.area > 0 && unitCodes[unit]) place.floorSize = { "@type": "QuantitativeValue", value: p.area, unitCode: unitCodes[unit] };
  } else if (p.area > 0) {
    place.additionalProperty = [{ "@type": "PropertyValue", name: "Area", value: p.area, unitText: unit }];
  }
  const features = (p.amenities || []).map(function (a) { return { "@type": "LocationFeatureSpecification", name: a, value: true }; });
  if (p.furnishing === "furnished" || p.furnishing === "semi-furnished") {
    features.push({ "@type": "LocationFeatureSpecification", name: p.furnishing === "furnished" ? "Furnished" : "Semi-furnished", value: true });
  }
  if (features.length) place.amenityFeature = features;

  const offer = {
    "@type": "Offer", price: p.price, priceCurrency: "INR", url: url,
    seller: { "@type": "RealEstateAgent", "@id": AE_SITE_URL + "/#business", name: "Akshat Estate", url: AE_SITE_URL + "/", telephone: "+91-8141293057" }
  };
  if (p.status === "rent") offer.priceSpecification = { "@type": "UnitPriceSpecification", price: p.price, priceCurrency: "INR", unitCode: "MON", unitText: "month" };
  if (includeAvailability) {
    offer.availability = isRented(p) ? "https://schema.org/OutOfStock" : "https://schema.org/InStock";
    if (!isRented(p) && /^\d{4}-\d{2}-\d{2}$/.test(p.availableFrom || "") && new Date(p.availableFrom + "T00:00:00") > new Date()) offer.availabilityStarts = p.availableFrom;
  }

  const images = (p.gallery && p.gallery.length ? p.gallery : [p.image]).map(function (u) { u = String(u || ""); return /^https?:/i.test(u) ? u : (u && !/^[a-z][a-z0-9+.\-]*:/i.test(u) ? AE_SITE_URL + "/" + u.replace(/^\/+/, "") : ""); }).filter(Boolean).slice(0, 5);
  const ld = { "@context": "https://schema.org", "@type": "RealEstateListing", "@id": url + "#listing", url: url, name: p.title, description: p.description || p.title };
  if (images.length) ld.image = images;
  ld.offers = offer;
  ld.about = place;
  return ld;
}

/* Rented / available-from. availableFrom is a date written YYYY-MM-DD; a date that has passed is ignored. */
function isRented(p) { return !!p && p.availability === "rented"; }
function futureAvailableFrom(p) {
  if (!p || !p.availableFrom) return null;
  var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(p.availableFrom);
  if (!m) return null;
  var d = new Date(+m[1], +m[2] - 1, +m[3]), today = new Date(); today.setHours(0, 0, 0, 0);
  return d > today ? d : null;
}
function fmtDay(d) { return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }); }
/* Short text for cards: "" when simply available now */
function availabilityText(p) {
  var d = futureAvailableFrom(p);
  if (isRented(p)) return d ? "Rented, free from " + fmtDay(d) : "Rented";
  return d ? "Available from " + fmtDay(d) : "";
}
/* Value for the detail page row */
function availabilityDetail(p) {
  var d = futureAvailableFrom(p);
  if (isRented(p)) return d ? "Rented (free from " + fmtDay(d) + ")" : "Rented";
  return d ? "From " + fmtDay(d) : "Available now";
}
function rentedClass(p) { return isRented(p) ? " is-rented" : ""; }

function freshnessHTML(property) {
  if (isRented(property)) return '<div class="fresh-line"><span class="fresh-rented">' + availabilityText(property) + "</span></div>";
  var f = getFreshness(property), a = availabilityText(property);
  if (!f.isNew && !f.updated && !a) return "";
  return '<div class="fresh-line">' + (a ? '<span class="fresh-avail">' + a + "</span>" : "") + (f.isNew ? '<span class="fresh-new">New</span>' : "") + (f.updated ? '<span class="fresh-upd"><i class="far fa-clock" aria-hidden="true"></i> ' + f.updated + "</span>" : "") + "</div>";
}

/* Stock placeholder photos stay blurred behind a "Request Image" button; real photos (your own uploads) show clearly */
function isStockPhoto(url) { return /^https?:\/\/images\.unsplash\.com\//i.test(String(url || "")); }
function blurClass(url) { return isStockPhoto(url) ? "img-blur" : ""; }
function requestImageButton(property, cls, label) {
  if (!isStockPhoto(property.image)) return "";
  return `<button type="button" class="${cls}" data-photo-open data-photo-id="${property.id}" data-photo-title="${escapeAttr(property.title)}">
          <i class="fas fa-camera"></i> ${label}
        </button>`;
}

function renderPropertyCard(property) {
  const badgeClass = property.status === "sale" ? "badge-sale" : "badge-rent";
  const badgeText = property.status === "sale" ? "For Sale" : "For Rent";
  const bedsText = (property.bedroomType === "1RK" ? "1 RK" : property.bedroomType === "1ROOM" ? "1 Room" : (property.bedrooms > 0 ? property.bedrooms + " BHK" : "—"));
  const bathsText = property.bathrooms > 0 ? property.bathrooms + " Bath" : "—";
  const typeLabel = property.type === "apartment" ? "Flat / Apartment" : (property.type === "shop" ? "Shop / Godown" : (property.type.charAt(0).toUpperCase() + property.type.slice(1)));

  return `
    <article class="property-card${rentedClass(property)}" data-id="${property.id}">
      <div class="property-image">
        <img src="${property.image}" alt="${property.title} in ${property.location}, Ahmedabad" class="${blurClass(property.image)}" loading="lazy" width="400" height="220">
        <span class="property-badge badge ${badgeClass}">${badgeText}</span>
        ${requestImageButton(property, "request-image-btn", "Request Image")}
        <span class="img-type-label">${typeLabel}</span>
        <button class="property-favorite" aria-label="Add to favorites" data-id="${property.id}">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <div class="property-body">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.5rem;margin-bottom:0.25rem">
          <h3 class="property-title" style="margin:0"><a href="property-details.html?id=${property.id}">${property.title}</a></h3>
          <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
        </div>
        <div class="property-society" style="font-size:0.8125rem;color:var(--text-light);margin-bottom:0.35rem">${typeLabel}</div>
        <div class="property-price">${property.priceDisplay}</div>
        <div class="property-location">
          <i class="fas fa-map-marker-alt"></i>
          ${property.location}, ${property.city}
        </div>
        ${freshnessHTML(property)}
        <div class="property-specs">
          <div class="property-spec"><i class="fas fa-ruler-combined"></i> ${property.area} ${property.areaUnit}</div>
          <div class="property-spec"><i class="fas fa-home"></i> ${typeLabel}</div>
          <div class="property-spec"><i class="fas fa-bed"></i> ${bedsText}</div>
          <div class="property-spec"><i class="fas fa-bath"></i> ${bathsText}</div>
          <div class="property-spec"><i class="fas fa-couch"></i> ${property.furnishing.charAt(0).toUpperCase() + property.furnishing.slice(1)}</div>
        </div>
        <div class="property-actions">
          <a href="property-details.html?id=${property.id}" class="btn btn-outline btn-sm">View Details</a>
          <a href="#" class="btn btn-whatsapp btn-sm" data-wa-lead-id="${property.id}" data-wa-lead-title="${escapeAttr(property.title)}" data-whatsapp data-whatsapp-msg="${escapeAttr(getPropertyWhatsAppMessage(property))}"><i class="fab fa-whatsapp"></i> WhatsApp</a>
          <button type="button" class="btn btn-outline btn-sm btn-share btn-share-icon" data-share-url="${escapeAttr(getPropertyUrl(property))}" title="Copy link to share" aria-label="Copy link to this property"><i class="fas fa-share-nodes"></i></button>
        </div>
      </div>
    </article>
  `;
}

function renderPropertyHCard(property) {
  const badgeClass = property.status === "sale" ? "badge-sale" : "badge-rent";
  const badgeText = property.status === "sale" ? "For Sale" : "For Rent";
  const bedsText = (property.bedroomType === "1RK" ? "1 RK" : property.bedroomType === "1ROOM" ? "1 Room" : (property.bedrooms > 0 ? property.bedrooms + " BHK" : "—"));
  const typeLabel = property.type === "apartment" ? "Flat / Apartment" : (property.type === "shop" ? "Shop / Godown" : (property.type.charAt(0).toUpperCase() + property.type.slice(1)));

  return `
    <article class="property-hcard${rentedClass(property)}" data-id="${property.id}">
      <div class="property-hcard-img">
        <img src="${property.image}" alt="${property.title}" class="${blurClass(property.image)}" loading="lazy">
        <span class="property-badge badge ${badgeClass}" style="position:absolute;top:0.75rem;left:0.75rem;z-index:3">${badgeText}</span>
        ${requestImageButton(property, "request-image-btn", "Request Image")}
        <span class="img-type-label">${typeLabel}</span>
        <div class="property-hcard-actions">
          <button class="icon-btn property-favorite" data-id="${property.id}" aria-label="Favorite"><i class="far fa-heart"></i></button>
        </div>
      </div>
      <div class="property-hcard-body">
        ${freshnessHTML(property)}
        <div class="property-hcard-top">
          <h3 class="property-hcard-title"><a href="property-details.html?id=${property.id}">${property.title}</a></h3>
          <span class="verified-badge"><i class="fas fa-check-circle"></i> Verified</span>
        </div>
        <div class="property-society">${typeLabel}</div>
        <div class="property-price-row">
          <span class="property-price">${property.priceDisplay}</span>
        </div>
        <div class="property-loc"><i class="fas fa-map-marker-alt"></i> ${property.location}, ${property.city}</div>
        <div class="property-meta">
          <span><span class="property-meta-label">Area</span><strong>${property.area} ${property.areaUnit}</strong></span>
          <span><span class="property-meta-label">Type</span><strong>${typeLabel}</strong></span>
          <span><span class="property-meta-label">BHK</span><strong>${bedsText}</strong></span>
          <span><span class="property-meta-label">Furnishing</span><strong>${property.furnishing.charAt(0).toUpperCase() + property.furnishing.slice(1)}</strong></span>
          <span><span class="property-meta-label">Posted By</span><strong>Verified User</strong></span>
        </div>
        <div class="property-hcard-cta">
          <a href="property-details.html?id=${property.id}" class="btn btn-outline btn-sm">View Property</a>
          <a href="#" class="btn btn-whatsapp btn-sm" data-wa-lead-id="${property.id}" data-wa-lead-title="${escapeAttr(property.title)}" data-whatsapp data-whatsapp-msg="${escapeAttr(getPropertyWhatsAppMessage(property))}"><i class="fab fa-whatsapp"></i> WhatsApp Inquiry</a>
          <button type="button" class="btn btn-outline btn-sm btn-share" data-share-url="${escapeAttr(getPropertyUrl(property))}" aria-label="Copy link to this property"><i class="fas fa-share-nodes"></i> Share</button>
        </div>
      </div>
    </article>
  `;
}


/* ==========================================================
   Rental-first helpers
   ========================================================== */

/* Homepage "Featured Rental Properties" (edit this list to change what is featured) */
const FEATURED_RENTAL_IDS = [31, 34, 27, 3, 41, 35, 36, 40, 37];

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getFeaturedRentals() {
  /* Live listings (admin panel) carry a homeFeatured flag; use it when present */
  if (PROPERTIES.some(function (p) { return typeof p.homeFeatured === "boolean"; })) {
    return PROPERTIES
      .filter(function (p) { return p.homeFeatured === true && p.status === "rent" && !isRented(p); })
      .sort(function (a, b) { return (a.homeRank || 999) - (b.homeRank || 999) || a.id - b.id; });
  }
  return FEATURED_RENTAL_IDS
    .map(function (id) { return getPropertyById(id); })
    .filter(function (p) { return p && p.status === "rent" && !isRented(p); });
}

function getPropertyLabel(property) {
  if (property.bedroomType === "1RK") return "1 RK property";
  if (property.bedroomType === "1ROOM") return "1 Room property";
  if (property.type === "apartment" && property.bedrooms > 0) return property.bedrooms + " BHK property";
  if (property.type === "shop") return "shop";
  if (property.type === "office") return "office";
  return "property";
}

/* Absolute link to a property's page, built from wherever the site is hosted (no hard-coded domain) */
function getPropertyUrl(property) {
  return new URL("property-details.html?id=" + property.id, document.baseURI).href;
}

/* Pre-filled WhatsApp message for a single property: the property page link, a blank line, then the message, e.g.
   <site>/property-details.html?id=14
   Hi, I'm interested in the 2 BHK property in Memnagar listed on Akshat Estate. Please share more details. */
function getPropertyWhatsAppMessage(property) {
  return getPropertyUrl(property) + "\n\n" +
    "Hi, I'm interested in the " + getPropertyLabel(property) +
    (property.status === "sale" ? " for sale" : "") +
    " in " + property.location + " listed on Akshat Estate. Please share more details.";
}

function getPhotoRequestMessage(property) {
  return getPropertyUrl(property) + "\n\n" +
    "Hello Akshat Estate, please share photos for: " + property.title + " in " + property.location + ".";
}

function formatFurnishing(value) {
  return (value || "").split("-").map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join("-");
}

/* ----------------------------------------------------------
   Listing details: Type, Super Built-up Area, Bathrooms, Furnishing, Listed By,
   Bachelors Allowed, Carpet Area, Floor No, Total Floors, Car Parking.
   Type, area, bathrooms and furnishing come from each property above.
   The rest are set here: PROPERTY_DETAIL_DEFAULTS apply to every property, and
   PROPERTY_EXTRAS overrides them per property ID, e.g.
     14: { carpetArea: 820, bachelorsAllowed: false, floorNo: 3, totalFloors: 5, carParking: 1 }
   ---------------------------------------------------------- */
const PROPERTY_DETAIL_DEFAULTS = { bachelorsAllowed: true, floorNo: 1, totalFloors: 2, carParking: 0 };
const PROPERTY_EXTRAS = {
  /* id: { carpetArea, bachelorsAllowed, floorNo, totalFloors, carParking } */
};

function getPropertyExtras(property) {
  /* Extras saved on the property itself (from the admin panel) win over the defaults above */
  var own = {};
  ["carpetArea", "bachelorsAllowed", "floorNo", "totalFloors", "carParking"].forEach(function (k) {
    if (property[k] !== undefined && property[k] !== null && property[k] !== "") own[k] = property[k];
  });
  return Object.assign({ carpetArea: property.area }, PROPERTY_DETAIL_DEFAULTS, PROPERTY_EXTRAS[property.id] || {}, own);
}

function formatPropertyType(property) {
  if (property.type === "apartment") return "Flat / Apartment";
  return property.type.charAt(0).toUpperCase() + property.type.slice(1);
}

function getBhkText(property) {
  if (property.bedroomType === "1RK") return "1 RK";
  if (property.bedroomType === "1ROOM") return "1 Room";
  return property.bedrooms > 0 ? property.bedrooms + " BHK" : "";
}

/* Rows shown on the property detail page, in this order */
function getPropertyDetailRows(property) {
  const x = getPropertyExtras(property);
  const unit = property.areaUnit || "sq.ft";
  const isHome = property.type === "apartment";
  const rows = [["Type", formatPropertyType(property)]];
  if (getBhkText(property)) rows.push(["BHK", getBhkText(property)]);
  rows.push(["Availability", availabilityDetail(property)]);
  rows.push(["Super Built-up Area", property.area + " " + unit]);
  if (property.bathrooms > 0) rows.push(["Bathrooms", property.bathrooms]);
  rows.push(["Furnishing", formatFurnishing(property.furnishing)]);
  rows.push(["Listed By", "Verified User"]);
  if (isHome && property.status !== "sale") rows.push(["Bachelors Allowed", x.bachelorsAllowed ? "Yes" : "No"]);
  rows.push(["Carpet Area", x.carpetArea + " " + unit]);
  rows.push(["Floor No", x.floorNo]);
  rows.push(["Total Floors", x.totalFloors]);
  rows.push(["Car Parking", x.carParking]);
  return rows;
}

function renderSpecItems(rows) {
  return rows.map(function (r) {
    return '<div class="spec-item"><div class="spec-label">' + r[0] + '</div><div class="spec-value">' + r[1] + '</div></div>';
  }).join("\n          ");
}

/* Clean, minimal rental card: clear photo, rent, BHK, area, furnishing, location, short description, 2 actions */
function renderRentalCard(property) {
  const bhk = getBhkText(property);
  const detailUrl = "property-details.html?id=" + property.id;
  const msg = escapeAttr(getPropertyWhatsAppMessage(property));
  const facts = [
    ["fa-ruler-combined", "Built-up Area", property.area + " " + property.areaUnit],
    ["fa-house", "Type", formatPropertyType(property)]
  ];
  if (bhk) facts.push(["fa-bed", "BHK", bhk]);
  if (property.bathrooms > 0) facts.push(["fa-bath", "Bathrooms", property.bathrooms + " Bath"]);
  facts.push(["fa-couch", "Furnishing", formatFurnishing(property.furnishing)]);
  const factsHTML = facts.map(function (f) {
    return '<li title="' + f[1] + '"><i class="fas ' + f[0] + '" aria-hidden="true"></i><span><span class="sr-only">' + f[1] + ': </span>' + f[2] + '</span></li>';
  }).join("");

  return `
    <article class="rental-card${rentedClass(property)}" data-id="${property.id}">
      <div class="rental-card-img">
        <a class="rental-card-link" href="${detailUrl}" tabindex="-1" aria-hidden="true">
          <img src="${property.image}" alt="${escapeAttr(property.title)}" class="${blurClass(property.image)}" loading="lazy" width="400" height="280" draggable="false">
        </a>
        ${requestImageButton(property, "request-image-btn", "Request Image")}
        <button type="button" class="rental-fav property-favorite" data-id="${property.id}" title="Save to shortlist" aria-label="Save to shortlist"><i class="far fa-heart"></i></button>
        <button type="button" class="rental-share btn-share btn-share-icon" data-share-url="${escapeAttr(getPropertyUrl(property))}" title="Copy link to share" aria-label="Copy link to this property"><i class="fas fa-share-nodes"></i></button>
      </div>
      <div class="rental-card-body">
        <div class="rental-price">${property.priceDisplay}<span> / month</span></div>
        <h3 class="rental-title"><a href="${detailUrl}">${property.title}</a></h3>
        <div class="rental-loc"><i class="fas fa-map-marker-alt"></i> ${property.location}, ${property.city}</div>
        ${freshnessHTML(property)}
        <ul class="rental-meta">${factsHTML}</ul>
        <div class="rental-actions">
          <a href="${detailUrl}" class="btn btn-outline btn-sm">View Property</a>
          <a href="#" class="btn btn-whatsapp btn-sm" data-wa-lead-id="${property.id}" data-wa-lead-title="${escapeAttr(property.title)}" data-whatsapp data-whatsapp-msg="${msg}"><i class="fab fa-whatsapp"></i> WhatsApp Inquiry</a>
        </div>
      </div>
    </article>
  `;
}


/* ==========================================================
   LIVE LISTINGS (Firebase)
   Listings managed in admin.html are stored in Firestore ("properties").
   This replaces the built-in PROPERTIES above with the live list before the
   page renders (search.js waits for window.propertiesReady).
   If Firebase is unreachable, blocked, still empty, or the page is opened
   from a file:// path, the built-in listings above are used instead.
   ========================================================== */
window.propertiesReady = (function () {
  var scriptSrc = document.currentScript && document.currentScript.src;
  if (window.AE_ADMIN || !scriptSrc || location.protocol === "file:") return Promise.resolve(false);

  var CACHE_KEY = "ae_live_properties_v1";
  var FRESH_MS = 2 * 60 * 1000;        /* reuse the last download for 2 minutes */
  var STALE_OK_MS = 24 * 60 * 60 * 1000; /* only if Firebase can't be reached */
  var WAIT_MS = 3500;                  /* give up waiting for Firebase after this */
  var GS = "https://www.gstatic.com/firebasejs/";
  var PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="560"><rect width="100%" height="100%" fill="#e8e5f0"/></svg>');

  function str(v, max) { return String(v == null ? "" : v).replace(/[<>]/g, "").trim().slice(0, max || 600); }
  function num(v, d) { var n = Number(v); return isFinite(n) ? n : d; }
  function link(v) { v = str(v, 1500); return (/^https?:\/\//i.test(v) || !/^[a-z][a-z0-9+.\-]*:/i.test(v)) ? v : ""; }
  function pick(v, list, d) { return list.indexOf(v) > -1 ? v : d; }

  /* Normalise one Firestore document into the shape the site expects */
  function clean(d) {
    var id = parseInt(d && d.id, 10);
    if (!id) return null;
    var gallery = (Array.isArray(d.gallery) ? d.gallery : []).map(link).filter(Boolean);
    var image = link(d.image) || gallery[0] || PLACEHOLDER;
    if (!gallery.length) gallery = [image];
    var price = num(d.price, 0);
    var p = {
      id: id,
      title: str(d.title, 160) || "Property",
      type: pick(d.type, ["apartment", "bungalow", "office", "shop"], "apartment"),
      status: pick(d.status, ["rent", "sale"], "rent"),
      bedrooms: num(d.bedrooms, 0),
      bathrooms: num(d.bathrooms, 0),
      area: num(d.area, 0),
      areaUnit: str(d.areaUnit, 12) || "sq.ft",
      location: str(d.location, 60) || "Ahmedabad",
      city: str(d.city, 60) || "Ahmedabad",
      furnishing: pick(d.furnishing, ["unfurnished", "semi-furnished", "furnished"], "unfurnished"),
      price: price,
      priceDisplay: str(d.priceDisplay, 40) || ("\u20B9" + price.toLocaleString("en-IN")),
      image: image,
      gallery: gallery,
      description: str(d.description, 2000),
      amenities: (Array.isArray(d.amenities) ? d.amenities : []).map(function (a) { return str(a, 40); }).filter(Boolean),
      featured: d.featured === true,
      active: d.active !== false,
      homeFeatured: d.homeFeatured === true,
      homeRank: num(d.homeRank, 999)
    };
    if (d.bedroomType === "1RK" || d.bedroomType === "1ROOM") p.bedroomType = d.bedroomType;
    ["carpetArea", "floorNo", "totalFloors", "carParking"].forEach(function (k) {
      if (d[k] !== undefined && d[k] !== null && d[k] !== "") p[k] = num(d[k], 0);
    });
    if (typeof d.bachelorsAllowed === "boolean") p.bachelorsAllowed = d.bachelorsAllowed;
    p.availability = d.availability === "rented" ? "rented" : "available";
    if (typeof d.availableFrom === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d.availableFrom)) p.availableFrom = d.availableFrom;
    ["listedAt", "confirmedAt"].forEach(function (k) {
      var v = d[k], ms = null;
      if (v && typeof v.toMillis === "function") ms = v.toMillis();
      else if (typeof v === "number") ms = v;
      if (ms && isFinite(ms)) p[k] = ms;
    });
    return p;
  }

  function apply(list) {
    PROPERTIES.length = 0;
    list.forEach(function (p) { PROPERTIES.push(p); });
  }

  function readCache() {
    try {
      var c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
      if (c && Array.isArray(c.list) && c.t) return { list: c.list, age: Date.now() - c.t };
    } catch (e) {}
    return null;
  }
  function writeCache(list) {
    try {
      if (list) localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), list: list }));
      else localStorage.removeItem(CACHE_KEY);
    } catch (e) {}
  }

  var appPromise = null;
  function getFirebaseApp() {
    if (!appPromise) {
      appPromise = import(new URL("firebase-config.js", scriptSrc).href).then(function (cfg) {
        var base = GS + cfg.FIREBASE_VERSION + "/";
        return import(base + "firebase-app.js").then(function (m) {
          return { base: base, app: m.getApps().length ? m.getApp() : m.initializeApp(cfg.firebaseConfig) };
        });
      });
    }
    return appPromise;
  }

  function fetchLive() {
    return getFirebaseApp().then(function (ctx) {
      return import(ctx.base + "firebase-firestore.js").then(function (fs) {
        return fs.getDocs(fs.collection(fs.getFirestore(ctx.app), "properties")).then(function (snap) {
          if (snap.empty) return null; /* not set up yet: keep the built-in listings */
          var list = [];
          snap.forEach(function (doc) {
            var p = clean(doc.data());
            if (p && p.active) list.push(p);
          });
          list.sort(function (a, b) { return a.id - b.id; });
          return list;
        });
      });
    });
  }

  /* Analytics (Firebase), loaded after the page is interactive */
  window.addEventListener("load", function () {
    setTimeout(function () {
      getFirebaseApp().then(function (ctx) {
        return import(ctx.base + "firebase-analytics.js").then(function (an) {
          return an.isSupported().then(function (ok) { if (ok) an.getAnalytics(ctx.app); });
        });
      }).catch(function () {});
    }, 1500);
  });

  var cached = readCache();
  if (cached && cached.age < FRESH_MS) { apply(cached.list); return Promise.resolve(true); }

  var live = fetchLive().then(function (list) { writeCache(list); return list; });
  var timer = new Promise(function (resolve) { setTimeout(function () { resolve("timeout"); }, WAIT_MS); });
  var usable = cached && cached.age < STALE_OK_MS;

  return Promise.race([live, timer]).then(function (res) {
    if (Array.isArray(res)) { apply(res); return true; }
    if (res === "timeout" && usable) { apply(cached.list); return true; }
    return false;
  }).catch(function () {
    if (usable) { apply(cached.list); return true; }
    return false;
  });
})();


/* ==========================================================
   Shortlist + area rent stats
   ========================================================== */

/* Saved (hearted) property IDs, stored in this browser only */
function getSavedIds() {
  try {
    const ids = JSON.parse(localStorage.getItem("ae_favorites") || "[]");
    return Array.isArray(ids) ? ids.map(String) : [];
  } catch (e) { return []; }
}

function formatINR(n) {
  return "\u20B9" + Number(n).toLocaleString("en-IN");
}

/* Rent range per size for an area, worked out from the rental listings currently on the site.
   area: "Gurukul" | "Memnagar" | "Sola" | "Ahmedabad" (all three areas) */
function getAreaRentStats(area) {
  const key = String(area || "").toLowerCase();
  const rows = [
    { label: "1 RK", test: function (p) { return p.bedroomType === "1RK"; } },
    { label: "1 Room", test: function (p) { return p.bedroomType === "1ROOM"; } },
    { label: "1 BHK", test: function (p) { return !p.bedroomType && p.bedrooms === 1; } },
    { label: "2 BHK", test: function (p) { return p.bedrooms === 2; } },
    { label: "3 BHK", test: function (p) { return p.bedrooms === 3; } }
  ];
  const rentals = PROPERTIES.filter(function (p) {
    return p.status === "rent" && p.type === "apartment" && p.price > 0 && !isRented(p) &&
      (key === "ahmedabad" || String(p.location).toLowerCase() === key);
  });
  const stats = rows.map(function (r) {
    const prices = rentals.filter(r.test).map(function (p) { return p.price; });
    return { label: r.label, count: prices.length, min: Math.min.apply(null, prices), max: Math.max.apply(null, prices) };
  }).filter(function (r) { return r.count > 0; });
  return { total: rentals.length, rows: stats };
}
