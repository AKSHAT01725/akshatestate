/**
 * Akshat Estate - Admin panel
 * Firebase Auth (email + password) and Firestore collection "properties".
 * Each document id is the property's numeric id, e.g. properties/14.
 */
import { firebaseConfig, FIREBASE_VERSION } from "./firebase-config.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const CACHE_KEY = "ae_live_properties_v1"; /* same key the public site uses */
const AMENITY_SUGGESTIONS = ["Parking", "Lift", "Security", "Power Backup", "Water Supply", "Gym", "Balcony", "Modular Kitchen", "CCTV", "Garden"];

/* ---------- Load Firebase ---------- */
let app, auth, db, A, F;
try {
  const base = `https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/`;
  const [appMod, authMod, fsMod] = await Promise.all([
    import(base + "firebase-app.js"),
    import(base + "firebase-auth.js"),
    import(base + "firebase-firestore.js")
  ]);
  A = authMod; F = fsMod;
  app = appMod.initializeApp(firebaseConfig);
  auth = A.getAuth(app);
  db = F.getFirestore(app);
} catch (err) {
  console.error(err);
  showLogin();
  showLoginError("Could not load Firebase. Check your internet connection, and open this page from a web address (http or https), not by double-clicking the file.");
  $("#login-btn").disabled = true;
}

/* ---------- State ---------- */
const state = { list: [], filter: "all", q: "", editing: null, loaded: false, startEmpty: false, busy: false };
const col = () => F.collection(db, "properties");
const ref = (id) => F.doc(db, "properties", String(id));

/* ---------- Small helpers ---------- */
let toastTimer;
function toast(msg, isError = false) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.toggle("is-error", isError);
  t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, isError ? 6000 : 2800);
}
function notice(msg, kind = "error") {
  const n = $("#notice");
  if (!msg) { n.hidden = true; return; }
  n.textContent = msg;
  n.className = "notice is-" + (kind === "error" ? "error" : "info");
  n.hidden = false;
}
function clearSiteCache() { try { localStorage.removeItem(CACHE_KEY); } catch (e) {} }

function friendlyError(err) {
  const code = (err && err.code) || "";
  if (code === "permission-denied" || code === "firestore/permission-denied")
    return "Firebase refused this. Publish firestore.rules and sign in with the admin email listed in it.";
  if (code === "unavailable" || code === "auth/network-request-failed") return "No connection to Firebase. Check your internet and try again.";
  if (code === "unauthenticated") return "Your session has ended. Please sign in again.";
  return (err && err.message) || "Something went wrong. Please try again.";
}

const LOGIN_ERRORS = {
  "auth/invalid-credential": "That email and password don't match. Check both and try again.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/user-disabled": "This account has been disabled in Firebase.",
  "auth/too-many-requests": "Too many attempts. Wait a few minutes, or reset your password.",
  "auth/network-request-failed": "No connection to Firebase. Check your internet and try again."
};

function formatPrice(n, status) {
  n = Number(n);
  if (!n) return "";
  if (status === "sale") {
    if (n >= 1e7) return "₹" + +(n / 1e7).toFixed(2) + " Crore";
    if (n >= 1e5) return "₹" + +(n / 1e5).toFixed(2) + " Lakh";
  }
  return "₹" + n.toLocaleString("en-IN");
}
function layoutText(p) {
  if (p.bedroomType === "1RK") return "1 RK";
  if (p.bedroomType === "1ROOM") return "1 Room";
  return p.bedrooms > 0 ? p.bedrooms + " BHK" : "";
}
const typeLabel = (t) => ({ apartment: "Flat", bungalow: "Bungalow", office: "Office", shop: "Shop" }[t] || t);

/* ---------- Views ---------- */
function showLogin() { $("#app-view").hidden = true; $("#login-view").hidden = false; }
function showApp() { $("#login-view").hidden = true; $("#app-view").hidden = false; }
function showLoginError(msg) { const e = $("#login-error"); e.textContent = msg; e.hidden = !msg; }

/* ---------- Auth ---------- */
if (auth) {
  A.onAuthStateChanged(auth, (user) => {
    if (user) {
      $("#user-email").textContent = user.email || "";
      showApp();
      loadAll();
      startEnquiries();
      onSignedIn();
    } else {
      state.list = []; state.loaded = false;
      stopEnquiries();
      onSignedOut();
      showLogin();
    }
  });

  $("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    showLoginError("");
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    if (!email || !password) { showLoginError("Enter your email and password."); return; }
    const btn = $("#login-btn");
    btn.disabled = true; btn.textContent = "Signing in…";
    try {
      await A.signInWithEmailAndPassword(auth, email, password);
      e.target.password.value = "";
    } catch (err) {
      showLoginError(LOGIN_ERRORS[err.code] || friendlyError(err));
    } finally {
      btn.disabled = false; btn.textContent = "Sign in";
    }
  });

  $("#reset-btn").addEventListener("click", async () => {
    const email = $("#login-form").email.value.trim();
    if (!email) { showLoginError("Type your email above first, then choose Forgot password."); return; }
    try {
      await A.sendPasswordResetEmail(auth, email);
      showLoginError("");
      toast("If that email has an account, a reset link is on its way.");
    } catch (err) {
      showLoginError(LOGIN_ERRORS[err.code] || friendlyError(err));
    }
  });

  $("#signout-btn").addEventListener("click", () => A.signOut(auth));
}

/* ---------- Load listings ---------- */
async function loadAll() {
  notice("");
  $("#summary").textContent = "Loading listings…";
  try {
    const snap = await F.getDocs(col());
    state.list = snap.docs.map((d) => normalise(d.data(), d.id)).filter(Boolean);
    state.loaded = true;
  } catch (err) {
    console.error(err);
    state.loaded = false;
    $("#summary").textContent = "Could not load listings.";
    notice(friendlyError(err), "error");
  }
  render();
}

function normalise(d, docId) {
  const id = parseInt(d.id ?? docId, 10);
  if (!id) return null;
  return {
    ...d,
    id,
    gallery: Array.isArray(d.gallery) ? d.gallery : [],
    amenities: Array.isArray(d.amenities) ? d.amenities : [],
    active: d.active !== false,
    homeFeatured: d.homeFeatured === true
  };
}

/* ---------- Render list ---------- */
function staticCount() { return typeof PROPERTIES !== "undefined" ? PROPERTIES.length : 0; }
function needsSeed() { return state.loaded && state.list.length === 0 && staticCount() > 0 && !state.startEmpty; }

function render() {
  const list = state.list;
  const counts = {
    all: list.length,
    rent: list.filter((p) => p.status === "rent").length,
    sale: list.filter((p) => p.status === "sale").length,
    hidden: list.filter((p) => !p.active).length,
    stale: list.filter(needsCheck).length,
    rented: list.filter(isRentedP).length
  };
  $$("[data-count]").forEach((el) => { el.textContent = counts[el.dataset.count]; });

  const live = list.length - counts.hidden;
  if (state.loaded) {
    $("#summary").textContent = list.length
      ? `${live} live on the website${counts.hidden ? `, ${counts.hidden} hidden` : ""}. ${counts.rent} for rent, ${counts.sale} for sale.${counts.rented ? ` ${counts.rented} rented.` : ""}${counts.stale ? ` ${counts.stale} need${counts.stale === 1 ? "s" : ""} a quick check.` : ""}`
      : "No listings yet.";
  }

  const seedNeeded = needsSeed();
  $("#seed-box").hidden = !seedNeeded;
  $("#seed-count").textContent = staticCount();
  $("#add-btn").disabled = !state.loaded || seedNeeded;
  $("#export-btn").disabled = !list.length;
  $("#list-panel").hidden = seedNeeded || !state.loaded;

  const q = state.q.trim().toLowerCase();
  const rows = list
    .filter((p) => {
      if (state.filter === "rent") return p.status === "rent";
      if (state.filter === "sale") return p.status === "sale";
      if (state.filter === "hidden") return !p.active;
      if (state.filter === "stale") return needsCheck(p);
      if (state.filter === "rented") return isRentedP(p);
      return true;
    })
    .filter((p) => !q || [p.title, p.location, p.city, String(p.id), p.priceDisplay].join(" ").toLowerCase().includes(q))
    .sort((a, b) => b.id - a.id);

  $("#rows").innerHTML = rows.map(rowHTML).join("");

  const empty = $("#empty");
  if (!rows.length && state.loaded && !seedNeeded) {
    empty.hidden = false;
    empty.innerHTML = list.length
      ? "<strong>No listings match</strong>Try a different word or switch tab."
      : "<strong>Add your first property</strong>Use the Add property button to create a listing.";
  } else {
    empty.hidden = true;
  }
  if (!$("#view-insights").hidden) renderInsights();
}

/* Reconfirm: a live listing counts as "checked" when it was saved or ticked within the last 30 days */
const CHECK_DAYS = 30;
function checkedMs(p) { return toMs(p.confirmedAt); }
const isRentedP = (p) => p.availability === "rented";
function needsCheck(p) {
  if (!p.active || isRentedP(p)) return false;
  const ms = checkedMs(p);
  return !ms || Date.now() - ms > CHECK_DAYS * 86400000;
}
function checkedText(p) {
  const ms = checkedMs(p);
  if (!ms) return "Not checked yet";
  const d = Math.floor((Date.now() - ms) / 86400000);
  return d <= 0 ? "Checked today" : d === 1 ? "Checked yesterday" : `Checked ${d} days ago`;
}

function homeOrderHTML(p) {
  const list = homeList();
  const i = list.findIndex((x) => x.id === p.id);
  if (i < 0) return "";
  return `<span class="home-order" title="Order on the homepage">
        <button type="button" class="ord-btn" data-act="up" aria-label="Show earlier on the homepage" ${i === 0 ? "disabled" : ""}><i class="fas fa-chevron-up"></i></button>
        <span class="ord-num">#${i + 1}</span>
        <button type="button" class="ord-btn" data-act="down" aria-label="Show later on the homepage" ${i === list.length - 1 ? "disabled" : ""}><i class="fas fa-chevron-down"></i></button>
      </span>`;
}

function enqCountFor(id) { return (state.enqByProp && state.enqByProp[id]) || 0; }

function rowHTML(p) {
  const layout = layoutText(p);
  const isRent = p.status === "rent";
  const price = esc(p.priceDisplay || formatPrice(p.price, p.status));
  return `
  <li class="row ${p.active ? "" : "is-hidden"}" data-id="${p.id}">
    <img class="thumb" src="${esc(p.image || p.gallery[0] || "")}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">
    <div class="row-main">
      <div class="row-title" title="${esc(p.title)}">${esc(p.title)}</div>
      <div class="row-meta">
        <span><b>${price}</b>${isRent ? " a month" : ""}</span>
        <span>${esc(p.location)}</span>
        <span>${esc(layout || typeLabel(p.type))}</span>
        <span>${esc(p.area)} ${esc(p.areaUnit || "sq.ft")}</span>
        <span>ID ${p.id}</span>
        ${enqCountFor(p.id) ? `<span><button type="button" class="meta-link" data-act="enqs" title="Show the enquiries for this property">${enqCountFor(p.id)} enquir${enqCountFor(p.id) === 1 ? "y" : "ies"}</button></span>` : ""}
      </div>
      ${p.active ? (isRentedP(p)
        ? `<div class="row-check"><span class="chk">Rented${p.availableFrom ? ` &middot; free from ${esc(p.availableFrom)}` : ""}</span>
            <button type="button" class="meta-link" data-act="available" title="It is free again">Mark available</button></div>`
        : `<div class="row-check ${needsCheck(p) ? "is-stale" : ""}">
            <span class="chk">${esc(checkedText(p))}${p.availableFrom ? ` &middot; from ${esc(p.availableFrom)}` : ""}</span>
            <button type="button" class="meta-link" data-act="confirm" title="Tap if this is still available">Still available</button>
            <button type="button" class="meta-link ${needsCheck(p) ? "warn" : ""}" data-act="rented" title="Keep it on the website with a Rented tag">Mark rented</button>
          </div>`) : ""}
    </div>
    <span class="chip ${isRent ? "rent" : "sale"}">${isRent ? "For rent" : "For sale"}</span>
    <div class="toggles">
      <label class="switch" title="Show this property on the website">
        <input type="checkbox" data-act="active" ${p.active ? "checked" : ""}><span class="track"></span>Live
      </label>
      <label class="switch ${isRent ? "" : "is-off"}" title="${isRent ? "Show in Featured Rentals on the homepage" : "Only rentals can be featured on the homepage"}">
        <input type="checkbox" data-act="home" ${p.homeFeatured && isRent ? "checked" : ""} ${isRent ? "" : "disabled"}><span class="track"></span>Homepage
      </label>
      ${homeOrderHTML(p)}
    </div>
    <div class="row-actions">
      <button type="button" class="btn btn-ghost btn-sm" data-act="edit" aria-label="Edit ${esc(p.title)}">Edit</button>
      <button type="button" class="icon-btn" data-act="copy" title="Duplicate" aria-label="Duplicate ${esc(p.title)}"><i class="fas fa-copy"></i></button>
      <a class="icon-btn" href="../property-details.html?id=${p.id}" target="_blank" rel="noopener" title="View on website" aria-label="View ${esc(p.title)} on the website"><i class="fas fa-arrow-up-right-from-square"></i></a>
      <button type="button" class="icon-btn danger" data-act="delete" title="Delete" aria-label="Delete ${esc(p.title)}"><i class="fas fa-trash-can"></i></button>
    </div>
  </li>`;
}

/* ---------- List interactions ---------- */
$("#tabs").addEventListener("click", (e) => {
  const b = e.target.closest("[data-filter]");
  if (!b) return;
  state.filter = b.dataset.filter;
  $$(".tab").forEach((t) => { t.classList.toggle("is-active", t === b); t.setAttribute("aria-selected", t === b); });
  render();
});
$("#search").addEventListener("input", (e) => { state.q = e.target.value; render(); });

$("#rows").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-act]");
  if (!btn) return;
  const id = Number(btn.closest(".row").dataset.id);
  const p = state.list.find((x) => x.id === id);
  if (!p) return;
  if (btn.dataset.act === "edit") openDrawer(p);
  if (btn.dataset.act === "copy") openDrawer(p, true);
  if (btn.dataset.act === "delete") askDelete(p);
  if (btn.dataset.act === "enqs") showEnquiriesFor(p);
  if (btn.dataset.act === "confirm") setAvailability(p, "confirm");
  if (btn.dataset.act === "rented") setAvailability(p, "rented");
  if (btn.dataset.act === "available") setAvailability(p, "available");
  if (btn.dataset.act === "up") moveHome(p, -1);
  if (btn.dataset.act === "down") moveHome(p, 1);
});

async function setAvailability(p, what) {
  const patch = { updatedAt: F.serverTimestamp() };
  const local = {};
  if (what === "rented") { patch.availability = "rented"; local.availability = "rented"; }
  else {
    patch.confirmedAt = F.serverTimestamp(); local.confirmedAt = { toMillis: () => Date.now() };
    if (what === "available") { patch.availability = "available"; local.availability = "available"; }
  }
  try {
    await F.updateDoc(ref(p.id), patch);
    Object.assign(p, local);
    clearSiteCache();
    toast(what === "rented" ? "Marked as rented. It stays on the website with a Rented tag." : what === "available" ? "Marked as available again" : "Marked as still available");
  } catch (err) {
    console.error(err);
    toast(friendlyError(err), true);
  }
  render();
}

/* ---------- Homepage order ---------- */
/* Same order the website uses: lowest number first, rented or hidden flats are left out */
function homeList() {
  return state.list
    .filter((p) => p.homeFeatured && p.status === "rent" && p.active && !isRentedP(p))
    .sort((a, b) => (a.homeRank || 999) - (b.homeRank || 999) || a.id - b.id);
}
async function moveHome(p, dir) {
  const list = homeList();
  const i = list.findIndex((x) => x.id === p.id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= list.length) return;
  [list[i], list[j]] = [list[j], list[i]];
  const changed = [];
  list.forEach((x, k) => { if (x.homeRank !== k + 1) changed.push([x, k + 1]); });
  try {
    await Promise.all(changed.map(([x, rank]) => F.updateDoc(ref(x.id), { homeRank: rank, updatedAt: F.serverTimestamp() })));
    changed.forEach(([x, rank]) => { x.homeRank = rank; });
    clearSiteCache();
    toast("Homepage order updated");
  } catch (err) {
    console.error(err);
    toast(friendlyError(err), true);
  }
  render();
}

$("#rows").addEventListener("change", async (e) => {
  const input = e.target.closest("input[data-act]");
  if (!input) return;
  const id = Number(input.closest(".row").dataset.id);
  const p = state.list.find((x) => x.id === id);
  if (!p) return;
  const field = input.dataset.act === "active" ? "active" : "homeFeatured";
  const value = input.checked;
  const patch = { [field]: value, updatedAt: F.serverTimestamp() };
  if (field === "homeFeatured" && value && !p.homeRank) patch.homeRank = nextHomeRank();
  try {
    await F.updateDoc(ref(id), patch);
    Object.assign(p, { [field]: value }, patch.homeRank ? { homeRank: patch.homeRank } : {});
    clearSiteCache();
    toast(field === "active" ? (value ? "Now live on the website" : "Hidden from the website") : (value ? "Added to homepage Featured Rentals" : "Removed from homepage Featured Rentals"));
  } catch (err) {
    console.error(err);
    input.checked = !value;
    toast(friendlyError(err), true);
  }
  render();
});

function nextHomeRank() { return Math.max(0, ...state.list.map((p) => Number(p.homeRank) || 0)) + 1; }
function nextId() { return Math.max(0, ...state.list.map((p) => p.id), ...(typeof PROPERTIES !== "undefined" ? PROPERTIES.map((p) => p.id) : [])) + 1; }

/* ---------- Drawer / form ---------- */
const form = $("#prop-form");
const drawer = $("#drawer");
const scrim = $("#scrim");
let amenities = [];
let lastFocus = null;
let priceDirty = false;

function openDrawer(p = null, asCopy = false) {
  lastFocus = document.activeElement;
  state.editing = p && !asCopy ? p : null;
  $("#drawer-title").textContent = asCopy ? "Duplicate property" : p ? "Edit property" : "Add property";
  $("#save-btn").textContent = p && !asCopy ? "Save changes" : "Save property";
  fillForm(p, asCopy);
  showFormError("");
  scrim.hidden = false; drawer.setAttribute("aria-hidden", "false");
  requestAnimationFrame(() => {
    scrim.classList.add("is-open");
    drawer.classList.add("is-open");
    form.elements.title.focus({ preventScroll: true }); /* focus right away so it can't steal focus mid-typing */
  });
}
function closeDrawer() {
  scrim.classList.remove("is-open"); drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  setTimeout(() => { scrim.hidden = true; }, 260);
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}
$("#add-btn").addEventListener("click", () => openDrawer());
$("#drawer-close").addEventListener("click", closeDrawer);
$("#drawer-cancel").addEventListener("click", closeDrawer);
scrim.addEventListener("click", closeDrawer);
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("is-open")) closeDrawer(); });

function layoutValue(p) {
  if (p.bedroomType === "1RK" || p.bedroomType === "1ROOM") return p.bedroomType;
  return p.bedrooms > 0 ? String(p.bedrooms) : "2";
}

function fillForm(p, asCopy) {
  form.reset();
  const src = p || {};
  form.elements.title.value = src.title ? (asCopy ? src.title + " (copy)" : src.title) : "";
  form.status.value = src.status || "rent";
  form.type.value = src.type || "apartment";
  form.location.value = src.location || "";
  form.city.value = src.city || "Ahmedabad";
  form.layout.value = p ? layoutValue(src) : "2";
  form.bathrooms.value = src.bathrooms ?? 1;
  form.furnishing.value = src.furnishing || "unfurnished";
  form.area.value = src.area ?? "";
  form.areaUnit.value = src.areaUnit || "sq.ft";
  form.price.value = src.price ?? "";
  form.priceDisplay.value = src.priceDisplay || "";
  priceDirty = !!(src.priceDisplay && src.priceDisplay !== formatPrice(src.price, src.status));
  form.image.value = src.image || "";
  const others = (src.gallery || []).filter((u) => u && u !== src.image);
  form.gallery.value = others.join("\n");
  form.description.value = src.description || "";
  form.carpetArea.value = src.carpetArea ?? "";
  form.carParking.value = src.carParking ?? 0;
  form.floorNo.value = src.floorNo ?? 1;
  form.totalFloors.value = src.totalFloors ?? 2;
  form.bachelorsAllowed.checked = src.bachelorsAllowed !== false;
  form.availability.value = asCopy ? "available" : (src.availability === "rented" ? "rented" : "available");
  form.availableFrom.value = asCopy ? "" : (src.availableFrom || "");
  form.active.checked = asCopy ? true : src.active !== false;
  form.homeFeatured.checked = asCopy ? false : src.homeFeatured === true;
  amenities = [...(src.amenities || [])];
  renderChips();
  renderSuggestions();
  syncForm();
  renderPhotoPreview();
  $$(".is-invalid", form).forEach((el) => el.classList.remove("is-invalid"));
}

/* Show or hide fields depending on listing and property type */
function syncForm() {
  const isRent = form.status.value === "rent";
  const isHome = form.type.value === "apartment" || form.type.value === "bungalow";
  $("#price-label").textContent = isRent ? "Rent per month (₹)" : "Sale price (₹)";
  $("#layout-field").hidden = !isHome;
  $("#bachelors-field").hidden = !isHome;
  const home = $("#home-field");
  home.classList.toggle("is-off", !isRent);
  form.homeFeatured.disabled = !isRent;
  if (!isRent) form.homeFeatured.checked = false;
  if (!priceDirty) form.priceDisplay.value = formatPrice(form.price.value, form.status.value);
}
form.status.addEventListener("change", syncForm);
form.type.addEventListener("change", syncForm);
form.price.addEventListener("input", syncForm);
form.priceDisplay.addEventListener("input", () => {
  priceDirty = form.priceDisplay.value.trim() !== "" && form.priceDisplay.value !== formatPrice(form.price.value, form.status.value);
  if (form.priceDisplay.value.trim() === "") { priceDirty = false; syncForm(); }
});

/* Photo preview */
function galleryList() {
  const main = form.image.value.trim();
  const rest = form.gallery.value.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
  return [main, ...rest].filter(Boolean).filter((u, i, a) => a.indexOf(u) === i);
}
let previewTimer;
function renderPhotoPreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(() => {
    $("#photo-preview").innerHTML = galleryList().filter((u) => /^https?:\/\//i.test(u))
      .map((u) => `<img src="${esc(u)}" alt="" loading="lazy" onerror="this.remove()">`).join("");
  }, 300);
}
form.image.addEventListener("input", renderPhotoPreview);
form.gallery.addEventListener("input", renderPhotoPreview);

/* Amenity chips */
function renderChips() {
  const input = $("#amen-input");
  $$(".tag", $("#chips")).forEach((t) => t.remove());
  amenities.forEach((a, i) => {
    const t = document.createElement("span");
    t.className = "tag";
    t.innerHTML = `${esc(a)}<button type="button" aria-label="Remove ${esc(a)}" data-i="${i}">&times;</button>`;
    $("#chips").insertBefore(t, input);
  });
}
function renderSuggestions() {
  const fromData = state.list.flatMap((p) => p.amenities);
  const all = [...new Set([...AMENITY_SUGGESTIONS, ...fromData])];
  const have = amenities.map((a) => a.toLowerCase());
  $("#amen-suggest").innerHTML = all.filter((a) => !have.includes(a.toLowerCase()))
    .map((a) => `<button type="button" data-add="${esc(a)}">+ ${esc(a)}</button>`).join("");
}
function addAmenity(v) {
  v = v.replace(/[<>]/g, "").trim();
  if (!v || amenities.some((a) => a.toLowerCase() === v.toLowerCase())) return;
  amenities.push(v.slice(0, 40));
  renderChips(); renderSuggestions();
}
$("#amen-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === ",") {
    e.preventDefault();
    addAmenity(e.target.value);
    e.target.value = "";
  } else if (e.key === "Backspace" && !e.target.value && amenities.length) {
    amenities.pop(); renderChips(); renderSuggestions();
  }
});
$("#amen-input").addEventListener("blur", (e) => { if (e.target.value.trim()) { addAmenity(e.target.value); e.target.value = ""; } });
$("#chips").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-i]");
  if (b) { amenities.splice(Number(b.dataset.i), 1); renderChips(); renderSuggestions(); }
});
$("#amen-suggest").addEventListener("click", (e) => {
  const b = e.target.closest("[data-add]");
  if (b) addAmenity(b.dataset.add);
});

function showFormError(msg) { const e = $("#form-error"); e.textContent = msg; e.hidden = !msg; }

/* Read and validate the form */
function readForm() {
  const clean = (v, max = 600) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, max);
  const num = (v) => (v === "" || v == null ? NaN : Number(v));
  const problems = [];
  const mark = (el, msg) => { el.classList.add("is-invalid"); problems.push(msg); };
  $$(".is-invalid", form).forEach((el) => el.classList.remove("is-invalid"));

  const title = clean(form.elements.title.value, 160);
  if (!title) mark(form.elements.title, "Add a title.");
  const location = clean(form.location.value, 60);
  if (!location) mark(form.location, "Add the area or locality.");
  const area = num(form.area.value);
  if (!(area > 0)) mark(form.area, "Enter the built-up area.");
  const price = num(form.price.value);
  if (!(price > 0)) mark(form.price, form.status.value === "rent" ? "Enter the monthly rent." : "Enter the sale price.");

  const urls = galleryList();
  const bad = urls.find((u) => !/^https:\/\/|^http:\/\//i.test(u));
  if (!form.image.value.trim()) mark(form.image, "Add a main photo link.");
  else if (bad) mark(bad === form.image.value.trim() ? form.image : form.gallery, "Photo links must start with https://");

  const status = form.status.value;
  const type = form.type.value;
  const isHome = type === "apartment" || type === "bungalow";
  const layout = form.layout.value;
  const data = {
    title, status, type, location,
    city: clean(form.city.value, 60) || "Ahmedabad",
    bedrooms: isHome && layout !== "1RK" && layout !== "1ROOM" ? Number(layout) : 0,
    bathrooms: Math.max(0, num(form.bathrooms.value) || 0),
    area, areaUnit: form.areaUnit.value,
    furnishing: form.furnishing.value,
    price,
    priceDisplay: clean(form.priceDisplay.value, 40) || formatPrice(price, status),
    image: urls[0] || "",
    gallery: urls,
    description: clean(form.description.value, 2000),
    amenities: [...amenities],
    carpetArea: Number.isFinite(num(form.carpetArea.value)) ? num(form.carpetArea.value) : area,
    carParking: Math.max(0, num(form.carParking.value) || 0),
    floorNo: Math.max(0, num(form.floorNo.value) || 0),
    totalFloors: Math.max(1, num(form.totalFloors.value) || 1),
    availability: form.availability.value === "rented" ? "rented" : "available",
    availableFrom: /^\d{4}-\d{2}-\d{2}$/.test(form.availableFrom.value) ? form.availableFrom.value : "",
    active: form.active.checked,
    homeFeatured: status === "rent" && form.homeFeatured.checked
  };
  if (isHome) data.bachelorsAllowed = form.bachelorsAllowed.checked;
  return { data, roomType: isHome && (layout === "1RK" || layout === "1ROOM") ? layout : "", problems };
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (state.busy) return;
  const { data, roomType, problems } = readForm();
  if (problems.length) {
    showFormError(problems.join(" "));
    const first = $(".is-invalid", form);
    if (first) first.focus();
    return;
  }
  showFormError("");

  const editing = state.editing;
  const id = editing ? editing.id : nextId();
  const payload = { ...data, id, updatedAt: F.serverTimestamp() };
  if (roomType) payload.bedroomType = roomType;
  else if (editing && editing.bedroomType) payload.bedroomType = F.deleteField();
  if (!editing) { payload.featured = false; payload.listedAt = F.serverTimestamp(); }
  payload.confirmedAt = F.serverTimestamp(); /* saving a listing counts as checking it */
  if (payload.homeFeatured && !(editing && editing.homeRank)) payload.homeRank = nextHomeRank();

  const btn = $("#save-btn");
  state.busy = true; btn.disabled = true; btn.textContent = "Saving…";
  try {
    await F.setDoc(ref(id), payload, { merge: true });
    const nowTs = { toMillis: () => Date.now() };
    const local = { ...(editing || {}), ...data, id, confirmedAt: nowTs };
    if (!editing) local.listedAt = nowTs;
    if (roomType) local.bedroomType = roomType; else delete local.bedroomType;
    if (payload.homeRank) local.homeRank = payload.homeRank;
    if (editing) Object.assign(editing, local); else state.list.push(normalise(local, id));
    clearSiteCache();
    closeDrawer();
    toast(editing ? "Changes saved" : "Property added");
    render();
  } catch (err) {
    console.error(err);
    showFormError(friendlyError(err));
  } finally {
    state.busy = false; btn.disabled = false;
    btn.textContent = state.editing ? "Save changes" : "Save property";
  }
});

/* ---------- Confirm dialog ---------- */
const dlg = $("#confirm");
function confirmBox(title, text, okLabel) {
  return new Promise((resolve) => {
    $("#confirm-title").textContent = title;
    $("#confirm-text").textContent = text;
    $("#confirm-ok").textContent = okLabel;
    dlg.returnValue = "";
    dlg.onclose = () => resolve(dlg.returnValue === "ok");
    dlg.showModal();
  });
}

/* ---------- Delete property ---------- */
async function askDelete(p) {
  const ok = await confirmBox(
    "Delete this property?",
    `“${p.title}” will be removed from the website and from Firebase. This cannot be undone. To keep it but stop showing it, turn off Live instead.`,
    "Delete property"
  );
  if (!ok) return;
  try {
    await F.deleteDoc(ref(p.id));
    state.list = state.list.filter((x) => x.id !== p.id);
    clearSiteCache();
    toast("Property deleted");
    render();
  } catch (err) {
    console.error(err);
    toast(friendlyError(err), true);
  }
}

/* ---------- Import built-in listings (one time) ---------- */
$("#seed-btn").addEventListener("click", async () => {
  if (typeof PROPERTIES === "undefined") return;
  const btn = $("#seed-btn");
  btn.disabled = true; btn.textContent = "Importing…";
  try {
    const homeIds = typeof FEATURED_RENTAL_IDS !== "undefined" ? FEATURED_RENTAL_IDS : [];
    const batch = F.writeBatch(db);
    PROPERTIES.forEach((p) => {
      const x = typeof getPropertyExtras === "function" ? getPropertyExtras(p) : {};
      const rank = homeIds.indexOf(p.id);
      const doc = {
        ...p,
        carpetArea: x.carpetArea ?? p.area,
        bachelorsAllowed: x.bachelorsAllowed ?? true,
        floorNo: x.floorNo ?? 1,
        totalFloors: x.totalFloors ?? 2,
        carParking: x.carParking ?? 0,
        active: true,
        homeFeatured: rank > -1 && p.status === "rent",
        homeRank: rank > -1 ? rank + 1 : 0,
        updatedAt: F.serverTimestamp()
      };
      if (p.type !== "apartment" && p.type !== "bungalow") delete doc.bachelorsAllowed;
      batch.set(ref(p.id), doc);
    });
    await batch.commit();
    clearSiteCache();
    toast(`${PROPERTIES.length} listings imported`);
    await loadAll();
  } catch (err) {
    console.error(err);
    toast(friendlyError(err), true);
    notice(friendlyError(err), "error");
  } finally {
    btn.disabled = false; btn.textContent = "Import listings";
  }
});
$("#seed-skip").addEventListener("click", () => { state.startEmpty = true; render(); });

/* ---------- Backup ---------- */
function downloadBackup() {
  const plain = (v) => (v && typeof v.toMillis === "function" ? new Date(v.toMillis()).toISOString() : v);
  const rows = state.list
    .map(({ updatedAt, ...rest }) => Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, plain(v)])))
    .sort((x, y) => x.id - y.id);
  const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `akshat-estate-listings-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
$("#export-btn").addEventListener("click", downloadBackup);

/* ==========================================================
   Enquiries
   Collection "inquiries", created by the website forms. Read live.
   ========================================================== */
const enq = { list: [], filter: "all", q: "", prop: null, unsub: null, ready: false };
const SOURCE_LABELS = { property: "Property enquiry", contact: "Contact form", enquiry: "Area page enquiry", owner: "Owner listing request" };
const VISIT_LABEL = "Visit request";
const isVisit = (e) => e.source === "property" && e.requirement === VISIT_LABEL;
const PHOTO_LABEL = "Photo request";
const isPhoto = (e) => e.source === "property" && e.requirement === PHOTO_LABEL;
const WA_LABEL = "WhatsApp enquiry";
const isWa = (e) => e.source === "property" && e.requirement === WA_LABEL;
const srcLabel = (e) => (isVisit(e) ? VISIT_LABEL : isWa(e) ? WA_LABEL : isPhoto(e) ? PHOTO_LABEL : SOURCE_LABELS[e.source] || "Enquiry");
const STATUS_LABELS = { new: "New", contacted: "Contacted", closed: "Closed" };

function toMs(v) {
  if (!v) return null;
  if (typeof v.toMillis === "function") return v.toMillis();
  if (typeof v === "number") return v;
  return null;
}
function whenText(ms) {
  if (!ms) return "Just now";
  const diff = Date.now() - ms;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "Just now";
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"} ago`;
  const day = Math.floor(hr / 24);
  if (day === 1) return "Yesterday";
  if (day < 7) return `${day} days ago`;
  return new Date(ms).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function fullDate(ms) {
  return ms ? new Date(ms).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }) : "";
}
function waNumber(phone) {
  let d = String(phone || "").replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  if (d.length === 10) d = "91" + d;
  return d;
}

function startEnquiries() {
  stopEnquiries();
  enq.ready = false;
  const q = F.query(col2(), F.orderBy("createdAt", "desc"), F.limit(300));
  let first = true;
  enq.unsub = F.onSnapshot(q, (snap) => {
    enq.list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    enq.ready = true;
    $("#enq-notice").hidden = true;
    if (!first) {
      snap.docChanges().forEach((ch) => {
        if (ch.type === "added" && !(ch.doc.metadata && ch.doc.metadata.hasPendingWrites)) toast(`New enquiry from ${ch.doc.data().name || "a visitor"}`);
      });
    }
    first = false;
    renderEnquiries();
    if (!$("#view-insights").hidden) renderInsights();
  }, (err) => {
    console.error(err);
    enq.ready = false;
    const n = $("#enq-notice");
    n.textContent = friendlyError(err);
    n.className = "notice is-error";
    n.hidden = false;
    $("#enq-summary").textContent = "Could not load enquiries.";
  });
}
function stopEnquiries() {
  if (enq.unsub) { enq.unsub(); enq.unsub = null; }
  enq.list = [];
  renderEnquiries();
}
function col2() { return F.collection(db, "inquiries"); }
const eref = (id) => F.doc(db, "inquiries", id);

function enqStatus(e) { return STATUS_LABELS[e.status] ? e.status : "new"; }

function renderEnquiries() {
  const list = enq.list;
  const counts = { all: list.length, new: 0, contacted: 0, closed: 0 };
  const byProp = {};
  list.forEach((e) => {
    counts[enqStatus(e)]++;
    if (e.propertyId) byProp[e.propertyId] = (byProp[e.propertyId] || 0) + 1;
  });
  /* Keep the "N enquiries" link on each listing in step with the enquiries list */
  if (JSON.stringify(byProp) !== JSON.stringify(state.enqByProp || {})) {
    state.enqByProp = byProp;
    if (state.loaded) render();
  }
  const bar = $("#enq-propbar");
  if (bar) {
    const shown = enq.prop ? state.list.find((x) => x.id === enq.prop) : null;
    bar.hidden = !enq.prop;
    if (enq.prop) {
      bar.innerHTML = `Showing enquiries for <b>${esc(shown ? shown.title : "property " + enq.prop)}</b> (ID ${enq.prop}) <button type="button" class="meta-link" id="enq-prop-clear">Show all</button>`;
    }
  }
  $$("[data-ecount]").forEach((el) => { el.textContent = counts[el.dataset.ecount]; });

  const badge = $("#new-badge");
  badge.textContent = counts.new;
  badge.hidden = counts.new === 0;
  document.title = (counts.new ? `(${counts.new}) ` : "") + "Admin | Akshat Estate";
  $("#enq-export").disabled = !list.length;

  if (enq.ready) {
    $("#enq-summary").textContent = list.length
      ? `${counts.new} new, ${counts.contacted} contacted, ${counts.closed} closed.`
      : "No enquiries yet.";
  }

  const q = enq.q.trim().toLowerCase();
  const rows = list
    .filter((e) => !enq.prop || Number(e.propertyId) === enq.prop)
    .filter((e) => enq.filter === "all" || enqStatus(e) === enq.filter)
    .filter((e) => !q || [e.name, e.phone, e.email, e.message, e.propertyTitle, e.location, e.requirement, srcLabel(e)].join(" ").toLowerCase().includes(q));

  $("#enq-rows").innerHTML = rows.map(enqHTML).join("");
  const empty = $("#enq-empty");
  if (!rows.length && enq.ready) {
    empty.hidden = false;
    empty.innerHTML = list.length
      ? "<strong>No enquiries match</strong>Try a different word or switch tab."
      : "<strong>No enquiries yet</strong>New ones from your website forms will show up here as they arrive.";
  } else {
    empty.hidden = true;
  }
}

function enqAbout(e) {
  const bits = [];
  if (e.source === "property") {
    const label = esc(e.propertyTitle || (e.propertyId ? "Property " + e.propertyId : "a property"));
    bits.push(e.propertyId
      ? `<span>About <a href="../property-details.html?id=${Number(e.propertyId)}" target="_blank" rel="noopener">${label}</a></span>`
      : `<span>About <b>${label}</b></span>`);
  }
  if (e.source === "property" && e.propertyId && enqCountFor(e.propertyId) > 1) {
    bits.push(`<span><button type="button" class="meta-link" data-eact="byprop" data-prop="${Number(e.propertyId)}">${enqCountFor(e.propertyId)} enquiries for this property</button></span>`);
  }
  if (e.source === "contact" && e.requirement) bits.push(`<span>Looking to <b>${esc(e.requirement)}</b></span>`);
  if (e.source === "enquiry" && e.page) bits.push(`<span>Sent from <b>${esc(e.page)}</b></span>`);
  if (e.source === "owner") {
    const action = e.listingType === "Sell" ? "sell" : "rent out";
    const what = [e.bhk, e.propertyType].filter(Boolean).join(" ") || "property";
    bits.push(`<span>Wants to <b>${action}</b> a ${esc(what)}${e.location ? " in <b>" + esc(e.location) + "</b>" : ""}</span>`);
    if (e.rent) {
      const amount = /^\d+$/.test(String(e.rent).trim()) ? Number(e.rent).toLocaleString("en-IN") : e.rent;
      bits.push(`<span>Expected ${e.listingType === "Sell" ? "price" : "rent"} <b>₹${esc(amount)}</b></span>`);
    }
    if (e.furnishing) bits.push(`<span>${esc(e.furnishing)}</span>`);
  }
  return bits.length ? `<div class="enq-about">${bits.join("")}</div>` : "";
}

/* Ready-made first reply for the WhatsApp button, so you only press send */
function replyText(e) {
  const hi = `Hi ${e.name || "there"}, this is Akshat Estate.`;
  if (isVisit(e)) {
    const when = String(e.message || "").split("\n")[0].replace(/^Visit request:\s*/i, "");
    return `${hi} Thank you for your visit request${e.propertyTitle ? " for " + e.propertyTitle : ""}${when ? " (" + when + ")" : ""}. Does that time work for you? We will confirm the visit.`;
  }
  if (isPhoto(e)) return `${hi} Thank you for asking for photos${e.propertyTitle ? " of " + e.propertyTitle : ""}. Sending them to you here now.`;
  if (isWa(e)) return `${hi} Thank you for your interest${e.propertyTitle ? " in " + e.propertyTitle : ""}. How can we help you with it?`;
  if (e.source === "property") return `${hi} Thank you for your enquiry${e.propertyTitle ? " about " + e.propertyTitle : ""}. How can we help you with it?`;
  if (e.source === "owner") return `${hi} Thank you for your request to list your property. Please share a few photos and we will get started.`;
  if (e.source === "enquiry" && e.requirement === "Rental requirement") return `${hi} Thank you for sharing what you need. We will send you matching homes shortly.`;
  return `${hi} Thank you for getting in touch. How can we help?`;
}

function enqHTML(e) {
  const st = enqStatus(e);
  const ms = toMs(e.createdAt);
  const num = waNumber(e.phone);
  const tel = String(e.phone || "").replace(/[^\d+]/g, "");
  const seg = ["new", "contacted", "closed"].map((k) =>
    `<button type="button" class="seg-btn${st === k ? " is-on" : ""}" data-eact="${k}" aria-pressed="${st === k}">${STATUS_LABELS[k]}</button>`).join("");
  return `
  <li class="enq is-${st}" data-id="${esc(e.id)}">
    <div class="enq-head">
      <div class="enq-who">
        <strong>${esc(e.name)}</strong>
        <span class="chip ${isVisit(e) || isWa(e) || isPhoto(e) ? "visit" : "src"}">${esc(srcLabel(e))}</span>
        <span class="chip st-${st}">${STATUS_LABELS[st]}</span>
      </div>
      <time title="${esc(fullDate(ms))}">${esc(whenText(ms))}</time>
    </div>
    <div class="enq-contact">
      <a href="tel:${esc(tel)}">${esc(e.phone)}</a>
      ${e.email ? `<a href="mailto:${esc(e.email)}">${esc(e.email)}</a>` : ""}
    </div>
    ${enqAbout(e)}
    ${e.message ? `<p class="enq-msg">${esc(e.message)}</p>` : ""}
    <div class="enq-actions">
      <a class="btn btn-primary" href="tel:${esc(tel)}"><i class="fas fa-phone" aria-hidden="true"></i> Call</a>
      <a class="btn btn-ghost" data-wa-reply href="https://wa.me/${esc(num)}?text=${encodeURIComponent(replyText(e))}" target="_blank" rel="noopener"><i class="fab fa-whatsapp" aria-hidden="true"></i> WhatsApp</a>
    </div>
    <div class="enq-foot">
      <div class="seg" role="group" aria-label="Status of the enquiry from ${esc(e.name)}">${seg}</div>
      <button type="button" class="icon-btn danger" data-eact="delete" title="Delete enquiry" aria-label="Delete enquiry from ${esc(e.name)}"><i class="fas fa-trash-can"></i></button>
    </div>
  </li>`;
}

$("#enq-tabs").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-efilter]");
  if (!b) return;
  enq.filter = b.dataset.efilter;
  $$("#enq-tabs .tab").forEach((t) => { t.classList.toggle("is-active", t === b); t.setAttribute("aria-selected", t === b); });
  renderEnquiries();
});
$("#enq-search").addEventListener("input", (ev) => { enq.q = ev.target.value; renderEnquiries(); });

$("#enq-rows").addEventListener("click", async (ev) => {
  /* Tapping Call, the phone number or WhatsApp marks a new enquiry as contacted; the call or chat still starts */
  const call = ev.target.closest('a[href^="tel:"], a[data-wa-reply]');
  if (call) {
    const item = enq.list.find((x) => x.id === call.closest(".enq").dataset.id);
    if (item && enqStatus(item) === "new") {
      try { await F.updateDoc(eref(item.id), { status: "contacted" }); toast("Marked as contacted"); }
      catch (err) { console.error(err); toast(friendlyError(err), true); }
    }
    return;
  }
  const btn = ev.target.closest("[data-eact]");
  if (!btn) return;
  const id = btn.closest(".enq").dataset.id;
  const item = enq.list.find((x) => x.id === id);
  if (!item) return;
  const act = btn.dataset.eact;
  if (act === "byprop") { enq.prop = Number(btn.dataset.prop); renderEnquiries(); return; }
  if (act === "delete") {
    const ok = await confirmBox("Delete this enquiry?", `The enquiry from ${item.name || "this visitor"} will be removed permanently.`, "Delete enquiry");
    if (!ok) return;
    try { await F.deleteDoc(eref(id)); toast("Enquiry deleted"); }
    catch (err) { console.error(err); toast(friendlyError(err), true); }
    return;
  }
  if (enqStatus(item) === act) return;
  try {
    await F.updateDoc(eref(id), { status: act });
    toast(act === "new" ? "Reopened" : act === "contacted" ? "Marked as contacted" : "Enquiry closed");
  } catch (err) {
    console.error(err);
    toast(friendlyError(err), true);
  }
});

/* CSV export (cells starting with = + - @ are prefixed so spreadsheets don't run them as formulas) */
$("#enq-export").addEventListener("click", () => {
  const cell = (v) => {
    let t = String(v ?? "");
    if (/^[=+\-@]/.test(t)) t = "'" + t;
    return '"' + t.replace(/"/g, '""') + '"';
  };
  const head = ["Received", "Status", "Source", "Name", "Phone", "Email", "Message", "Property ID", "Property", "Looking to", "Page"];
  const lines = [head.map(cell).join(",")].concat(enq.list.map((e) => [
    fullDate(toMs(e.createdAt)), STATUS_LABELS[enqStatus(e)], isVisit(e) ? VISIT_LABEL : isWa(e) ? WA_LABEL : isPhoto(e) ? PHOTO_LABEL : SOURCE_LABELS[e.source] || "", e.name, e.phone, e.email, e.message,
    e.propertyId || "",
    e.propertyTitle || (e.source === "owner" ? [e.listingType, e.bhk, e.propertyType, e.location, e.rent].filter(Boolean).join(" ") : ""),
    e.requirement, e.page
  ].map(cell).join(",")));
  const blob = new Blob(["\ufeff" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `akshat-estate-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

/* From a listing's "N enquiries" link: open the Enquiries tab filtered to that property */
function showEnquiriesFor(p) {
  enq.prop = p.id;
  enq.filter = "all";
  $$("#enq-tabs .tab").forEach((t) => { const on = t.dataset.efilter === "all"; t.classList.toggle("is-active", on); t.setAttribute("aria-selected", on); });
  showView("enquiries");
}
document.addEventListener("click", (ev) => {
  if (ev.target.closest("#enq-prop-clear")) { enq.prop = null; renderEnquiries(); }
});

/* ---------- Section navigation ---------- */
function showView(name) {
  $("#view-listings").hidden = name !== "listings";
  $("#view-enquiries").hidden = name !== "enquiries";
  $("#view-insights").hidden = name !== "insights";
  $$(".nav-tab").forEach((t) => t.classList.toggle("is-active", t.dataset.view === name));
  if (name === "enquiries") renderEnquiries();
  if (name === "insights") renderInsights();
  window.scrollTo(0, 0);
}
$(".mainnav").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-view]");
  if (b) showView(b.dataset.view);
});

/* ==========================================================
   Install the admin as an app (only after you sign in)
   Nothing is offered on the sign-in screen, and the public website is not installable at all:
   the admin's own manifest is added to this page only once someone is signed in.
   ========================================================== */
const INSTALL_DISMISS_KEY = "ae_admin_install_dismissed";
let installEvent = null;
let signedIn = false;

const isStandalone = () => (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
function installDismissed() {
  try { const t = Number(localStorage.getItem(INSTALL_DISMISS_KEY)); return !!t && Date.now() - t < 30 * 24 * 60 * 60 * 1000; }
  catch (e) { return false; }
}

function setAdminManifest(on) {
  let link = document.querySelector('link[rel="manifest"]');
  if (on && !link) {
    link = document.createElement("link");
    link.rel = "manifest";
    link.href = "manifest.webmanifest";
    document.head.appendChild(link);
  } else if (!on && link) {
    link.remove();
  }
}

function registerAdminApp() {
  if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
  navigator.serviceWorker.register("sw.js", { scope: "./" }).catch(() => {});
}

function updateInstallBar() {
  const bar = $("#install-bar");
  const canPrompt = !!installEvent;
  const iosHelp = isIOS() && !canPrompt;
  bar.hidden = !(signedIn && !isStandalone() && !installDismissed() && (canPrompt || iosHelp));
  $("#install-btn").hidden = !canPrompt;
  $("#install-text").textContent = canPrompt
    ? "Install this admin as an app on this device for one-tap access."
    : "To install this admin as an app: tap the Share button in your browser, then choose \u201cAdd to Home Screen\u201d.";
  $("#install-dismiss").textContent = canPrompt ? "Not now" : "Got it";
}

function onSignedIn() {
  signedIn = true;
  setAdminManifest(true);      /* this is what makes the browser offer "Install" */
  registerAdminApp();
  updateInstallBar();
}
function onSignedOut() {
  signedIn = false;
  installEvent = null;
  setAdminManifest(false);
  updateInstallBar();
}

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();          /* we show our own button instead of the browser's pop-up */
  installEvent = e;
  updateInstallBar();
});
window.addEventListener("appinstalled", () => {
  installEvent = null;
  updateInstallBar();
  toast("App installed");
});
$("#install-btn").addEventListener("click", async () => {
  if (!installEvent) return;
  const ev = installEvent;
  installEvent = null;
  updateInstallBar();
  try { await ev.prompt(); await ev.userChoice; } catch (e) { /* the browser closed the prompt */ }
});
$("#install-dismiss").addEventListener("click", () => {
  try { localStorage.setItem(INSTALL_DISMISS_KEY, String(Date.now())); } catch (e) {}
  updateInstallBar();
});


/* ==========================================================
   Insights
   Counts what is already loaded for the Enquiries screen (your latest 300 enquiries), so it costs no extra reads.
   ========================================================== */
const ins = { range: "30" };
const INS_WEEKS = 12;
const DAY_MS = 864e5;
const pct = (n, total) => (total ? Math.round((n / total) * 100) : 0);
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
function weekStart(ms) {            /* Monday 00:00 (local time) of the week containing ms */
  const d = new Date(ms);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.getTime();
}

function renderInsights() {
  const now = Date.now();
  const all = enq.list.map((e) => ({ e, ms: toMs(e.createdAt) || now }));
  const empty = $("#ins-empty"), body = $("#ins-body");
  body.hidden = !all.length;
  empty.hidden = !!all.length || !enq.ready;
  if (!all.length) {
    $("#ins-summary").textContent = enq.ready ? "No enquiries yet." : "Loading…";
    empty.innerHTML = "<strong>Nothing to show yet</strong>Insights appear here as enquiries come in from your website.";
    return;
  }

  const since = ins.range === "all" ? 0 : now - Number(ins.range) * DAY_MS;
  const inRange = all.filter((x) => x.ms >= since).map((x) => x.e);
  const total = inRange.length;
  const by = { new: 0, contacted: 0, closed: 0 };
  inRange.forEach((e) => { by[enqStatus(e)]++; });
  const rangeLabel = ins.range === "all" ? "all time" : `last ${ins.range} days`;
  $("#ins-summary").textContent = `${plural(total, "enquiry", "enquiries")} ${ins.range === "all" ? "in total" : `in the last ${ins.range} days`}.`;

  /* tiles */
  $("#ins-tiles").innerHTML = [
    ["Enquiries", total, rangeLabel, ""],
    ["Waiting for a reply", by.new, "still marked New", by.new ? "warn" : ""],
    ["Contacted", by.contacted, `${pct(by.contacted, total)}% of enquiries`, ""],
    ["Closed", by.closed, `${pct(by.closed, total)}% of enquiries`, ""]
  ].map(([label, n, sub, cls]) => `<div class="tile ${cls}"><div class="tile-n">${n}</div><div class="tile-l">${esc(label)}</div><div class="tile-s">${esc(sub)}</div></div>`).join("");

  /* enquiries per week: always the last 12 weeks */
  const thisWeek = weekStart(now);
  const starts = [];
  for (let i = INS_WEEKS - 1; i >= 0; i--) { const d = new Date(thisWeek); d.setDate(d.getDate() - 7 * i); starts.push(d.getTime()); }
  const counts = starts.map(() => 0);
  all.forEach(({ ms }) => { const k = starts.indexOf(weekStart(ms)); if (k > -1) counts[k]++; });
  const max = Math.max(1, ...counts);
  const wk = $("#ins-weeks");
  wk.setAttribute("aria-label", `Enquiries per week over the last ${INS_WEEKS} weeks: ${counts.join(", ")}`);
  wk.innerHTML = starts.map((st, i) => {
    const label = new Date(st).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    const h = counts[i] ? Math.max(6, Math.round((counts[i] / max) * 100)) : 0;
    return `<div class="wk${i === starts.length - 1 ? " is-now" : ""}" title="Week of ${esc(label)}: ${plural(counts[i], "enquiry", "enquiries")}">
      <span class="wk-n">${counts[i]}</span><div class="wk-track"><div class="wk-bar" style="height:${h}%"></div></div><span class="wk-l">${esc(label)}</span></div>`;
  }).join("");

  /* most asked-about listings */
  const byProp = new Map();
  inRange.forEach((e) => {
    if (!e.propertyId) return;
    const id = Number(e.propertyId);
    const c = byProp.get(id) || { id, count: 0, title: e.propertyTitle || `Property ${id}` };
    c.count++; byProp.set(id, c);
  });
  const ranked = [...byProp.values()].sort((a, b) => b.count - a.count || a.id - b.id);
  const topMax = ranked[0] ? ranked[0].count : 1;
  $("#ins-top").innerHTML = ranked.length ? ranked.slice(0, 8).map((r, i) => {
    const p = state.list.find((x) => x.id === r.id);
    const title = p ? p.title : r.title;
    const flag = !p ? "Removed" : p.active === false ? "Hidden" : isRentedP(p) ? "Rented" : "";
    return `<li class="rank-row"><span class="rank-pos">${i + 1}</span>
      <div class="rank-main"><div class="rank-top"><span class="rank-name" title="${esc(title)}">${esc(title)}</span>${flag ? `<span class="chip st-closed">${flag}</span>` : ""}<span class="rank-n">${r.count}</span></div>
      <div class="bar"><span style="width:${Math.round((r.count / topMax) * 100)}%"></span></div></div>
      ${p ? `<button type="button" class="link-btn" data-ins-prop="${r.id}">View</button>` : ""}</li>`;
  }).join("") : '<li class="rank-empty">No enquiries about a specific listing in this period.</li>';
  const general = inRange.filter((e) => !e.propertyId).length;
  $("#ins-top-note").textContent = general ? `${plural(general, "enquiry", "enquiries")} in this period ${general === 1 ? "was" : "were"} not about one listing (contact form, owners, area pages).` : "";

  /* where they come from */
  const src = {};
  inRange.forEach((e) => { const k = srcLabel(e); src[k] = (src[k] || 0) + 1; });
  const srcRows = Object.entries(src).sort((a, b) => b[1] - a[1]);
  const sMax = srcRows[0] ? srcRows[0][1] : 1;
  $("#ins-sources").innerHTML = srcRows.length ? srcRows.map(([k, n]) =>
    `<li class="rank-row"><div class="rank-main"><div class="rank-top"><span class="rank-name">${esc(k)}</span><span class="rank-n">${n}</span></div><div class="bar alt"><span style="width:${Math.round((n / sMax) * 100)}%"></span></div></div></li>`).join("")
    : '<li class="rank-empty">No enquiries in this period.</li>';

  /* where they end up */
  const followed = by.contacted + by.closed;
  const seg = (k) => (by[k] ? `<span class="fun fun-${k}" style="flex:${by[k]}"></span>` : "");
  $("#ins-funnel").innerHTML = total
    ? `<div class="fun-bar" role="img" aria-label="New ${by.new}, contacted ${by.contacted}, closed ${by.closed}">${seg("new")}${seg("contacted")}${seg("closed")}</div>
       <ul class="fun-legend">${["new", "contacted", "closed"].map((k) => `<li><span class="dot dot-${k}"></span><b>${by[k]}</b> ${STATUS_LABELS[k]} <span class="muted">${pct(by[k], total)}%</span></li>`).join("")}</ul>
       <p class="ins-note">${followed} of ${total} ${total === 1 ? "enquiry has" : "enquiries have"} been followed up (${pct(followed, total)}%), and ${by.closed} reached Closed (${pct(by.closed, total)}%).</p>`
    : '<p class="ins-note">No enquiries in this period.</p>';

  /* live listings nobody has asked about (ignoring ones listed in the last 7 days) */
  const asked = new Set(inRange.filter((e) => e.propertyId).map((e) => Number(e.propertyId)));
  const quiet = state.loaded ? state.list.filter((p) => p.active !== false && !isRentedP(p) && !asked.has(p.id) && !(toMs(p.listedAt) > now - 7 * DAY_MS)) : [];
  $("#ins-quiet-card").hidden = !quiet.length;
  $("#ins-quiet-range").textContent = ins.range === "all" ? "ever" : `in the last ${ins.range} days`;
  $("#ins-quiet").innerHTML = quiet.slice(0, 8).map((p) =>
    `<li class="rank-row plain"><span class="rank-name" title="${esc(p.title)}">${esc(p.title)}</span><button type="button" class="link-btn" data-ins-edit="${p.id}">Edit</button></li>`).join("")
    + (quiet.length > 8 ? `<li class="rank-empty">and ${quiet.length - 8} more</li>` : "");

  const cap = $("#ins-cap");
  cap.hidden = enq.list.length < 300;
  cap.textContent = "Counting your latest 300 enquiries; older ones are not included.";
}

$("#ins-range").addEventListener("click", (ev) => {
  const b = ev.target.closest("[data-range]");
  if (!b) return;
  ins.range = b.dataset.range;
  $$("#ins-range .seg-btn").forEach((x) => { const on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on); });
  renderInsights();
});
$("#view-insights").addEventListener("click", (ev) => {
  const v = ev.target.closest("[data-ins-prop]");
  if (v) { const p = state.list.find((x) => x.id === Number(v.dataset.insProp)); if (p) showEnquiriesFor(p); return; }
  const ed = ev.target.closest("[data-ins-edit]");
  if (ed) { const p = state.list.find((x) => x.id === Number(ed.dataset.insEdit)); if (p) openDrawer(p); }
});

/* ==========================================================
   Restore listings from a backup file (the file made by "Download backup")
   Adds new listings and updates changed ones. Nothing is removed unless you tick the box.
   ========================================================== */
const RESTORE_ENUMS = { status: ["rent", "sale"], type: ["apartment", "bungalow", "office", "shop"], furnishing: ["unfurnished", "semi-furnished", "furnished"], areaUnit: ["sq.ft", "sq.yd", "sq.m"] };
const rText = (v, max = 600) => String(v ?? "").replace(/[<>]/g, "").trim().slice(0, max);
const rNum = (v) => (v === "" || v == null ? NaN : Number(v));
const rUrl = (v) => { const t = rText(v, 1500); return /^https?:\/\//i.test(t) ? t : ""; };
function rStampMs(v) {              /* accepts a Firestore timestamp, {seconds,nanoseconds}, a number, or a date string */
  if (!v) return null;
  if (typeof v.toMillis === "function") return v.toMillis();
  if (typeof v.seconds === "number") return v.seconds * 1000 + Math.floor((v.nanoseconds || 0) / 1e6);
  if (typeof v === "number" && v > 0) return v;
  if (typeof v === "string" && !Number.isNaN(Date.parse(v))) return Date.parse(v);
  return null;
}

/* Checks and tidies one listing from the file (same rules as the Add/Edit form) */
function cleanRestoreItem(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { error: "not a listing" };
  const id = Number(raw.id);
  if (!Number.isInteger(id) || id < 1) return { error: "missing or invalid id" };
  const fail = (reason) => ({ id, error: reason });
  const title = rText(raw.title, 160); if (!title) return fail("no title");
  if (!RESTORE_ENUMS.status.includes(raw.status)) return fail("status must be rent or sale");
  const status = raw.status;
  const price = rNum(raw.price); if (!(price > 0)) return fail("no price");
  const area = rNum(raw.area); if (!(area > 0)) return fail("no area");
  const location = rText(raw.location, 60); if (!location) return fail("no location");
  const gallery = (Array.isArray(raw.gallery) ? raw.gallery : []).map(rUrl).filter(Boolean);
  const image = rUrl(raw.image) || gallery[0] || ""; if (!image) return fail("no photo link");
  const pick = (k, d) => (RESTORE_ENUMS[k].includes(raw[k]) ? raw[k] : d);
  const data = {
    id, title, status, type: pick("type", "apartment"), location, city: rText(raw.city, 60) || "Ahmedabad",
    bedrooms: Math.max(0, rNum(raw.bedrooms) || 0), bathrooms: Math.max(0, rNum(raw.bathrooms) || 0),
    area, areaUnit: pick("areaUnit", "sq.ft"), furnishing: pick("furnishing", "unfurnished"),
    price, priceDisplay: rText(raw.priceDisplay, 40) || formatPrice(price, status),
    image, gallery: [image, ...gallery.filter((u) => u !== image)],
    description: rText(raw.description, 2000),
    amenities: (Array.isArray(raw.amenities) ? raw.amenities : []).map((a) => rText(a, 40)).filter(Boolean),
    featured: raw.featured === true, active: raw.active !== false,
    homeFeatured: status === "rent" && raw.homeFeatured === true,
    availability: raw.availability === "rented" ? "rented" : "available",
    availableFrom: /^\d{4}-\d{2}-\d{2}$/.test(raw.availableFrom || "") ? raw.availableFrom : ""
  };
  if (rNum(raw.homeRank) > 0) data.homeRank = Number(raw.homeRank);
  ["carpetArea", "carParking", "floorNo", "totalFloors"].forEach((k) => { const n = rNum(raw[k]); if (Number.isFinite(n) && n >= 0) data[k] = n; });
  if (typeof raw.bachelorsAllowed === "boolean") data.bachelorsAllowed = raw.bachelorsAllowed;
  if (raw.bedroomType === "1RK" || raw.bedroomType === "1ROOM") data.bedroomType = raw.bedroomType;
  const confirmed = rStampMs(raw.confirmedAt); if (confirmed) data.confirmedAt = confirmed;
  const listed = rStampMs(raw.listedAt); if (listed) data.listedAt = listed;
  return { id, data };
}
const diffFields = (a, b) => [...new Set([...Object.keys(a), ...Object.keys(b)])].filter((k) => JSON.stringify(a[k]) !== JSON.stringify(b[k]));
const writableListing = (data) => {
  const out = { ...data, updatedAt: F.serverTimestamp() };
  ["confirmedAt", "listedAt"].forEach((k) => { if (typeof out[k] === "number") out[k] = F.Timestamp.fromMillis(out[k]); });
  return out;
};

let restorePlan = null;
$("#restore-btn").addEventListener("click", () => {
  if (!state.loaded) { toast("Wait for the listings to finish loading first.", true); return; }
  $("#restore-file").click();
});
$("#restore-file").addEventListener("change", async (ev) => {
  const file = ev.target.files && ev.target.files[0];
  ev.target.value = "";                         /* lets you pick the same file again later */
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { toast("That file is too large to be a listings backup.", true); return; }
  let parsed;
  try { parsed = JSON.parse(await file.text()); }
  catch (e) { toast("That file is not valid JSON, so it cannot be a backup.", true); return; }
  const rows = Array.isArray(parsed) ? parsed : parsed && Array.isArray(parsed.listings) ? parsed.listings : null;
  if (!rows || !rows.length) { toast("This does not look like a listings backup (expected a list of listings).", true); return; }
  openRestoreDialog(file.name, rows);
});

function openRestoreDialog(fileName, rows) {
  const byId = new Map(state.list.map((p) => [p.id, p]));
  const incoming = new Map(), skipped = [];
  let dupes = 0;
  rows.forEach((raw, i) => {
    const r = cleanRestoreItem(raw);
    if (r.error) { skipped.push(r.id ? `#${r.id} (${r.error})` : `entry ${i + 1} (${r.error})`); return; }
    if (incoming.has(r.id)) dupes++;
    incoming.set(r.id, r.data);
  });
  const add = [], change = [], same = [];
  incoming.forEach((data, id) => {
    const cur = byId.get(id);
    if (!cur) { add.push({ id, data }); return; }
    const curClean = cleanRestoreItem(cur);
    const fields = curClean.error ? ["(current copy is incomplete)"] : diffFields(curClean.data, data);
    (fields.length ? change : same).push({ id, data, fields, title: cur.title });
  });
  const missing = state.list.filter((p) => !incoming.has(p.id));
  restorePlan = { add, change, same, missing };

  $("#restore-file-name").textContent = `${fileName}: ${plural(incoming.size, "listing", "listings")} found.`;
  const lines = [];
  if (add.length) lines.push(`<li><b>${add.length}</b> new, will be added</li>`);
  if (change.length) {
    lines.push(`<li><b>${change.length}</b> changed, will be updated<ul class="restore-changes">${change.slice(0, 6).map((c) => `<li>#${c.id} ${esc(c.title)}: ${esc(c.fields.slice(0, 4).join(", "))}${c.fields.length > 4 ? "…" : ""}</li>`).join("")}${change.length > 6 ? `<li>and ${change.length - 6} more</li>` : ""}</ul></li>`);
  }
  if (same.length) lines.push(`<li><b>${same.length}</b> already the same, left alone</li>`);
  if (!lines.length) lines.push("<li>Nothing in this file differs from your current listings.</li>");
  $("#restore-summary").innerHTML = lines.join("");
  const sk = $("#restore-skipped");
  const notes = [];
  if (skipped.length) notes.push(`${plural(skipped.length, "entry was", "entries were")} skipped: ${skipped.slice(0, 3).join(", ")}${skipped.length > 3 ? ` and ${skipped.length - 3} more` : ""}.`);
  if (dupes) notes.push(`${plural(dupes, "listing appears", "listings appear")} more than once; the last copy is used.`);
  sk.hidden = !notes.length;
  sk.textContent = notes.join(" ");
  $("#restore-backup-first").checked = true;
  $("#restore-delete").checked = false;
  $("#restore-delete-wrap").hidden = !missing.length;
  $("#restore-delete-label").textContent = `Also remove the ${plural(missing.length, "listing", "listings")} that ${missing.length === 1 ? "is" : "are"} not in this file`;
  updateRestoreButton();
  const d = $("#restore-dialog");
  d.returnValue = "";
  d.onclose = () => { if (d.returnValue === "ok") applyRestore(); };
  d.showModal();
}
function updateRestoreButton() {
  const n = restorePlan.add.length + restorePlan.change.length;
  const del = $("#restore-delete").checked ? restorePlan.missing.length : 0;
  $("#restore-ok").disabled = !n && !del;
  $("#restore-ok").textContent = n ? `Restore ${plural(n, "listing", "listings")}` : del ? "Remove listings" : "Nothing to restore";
}
$("#restore-delete").addEventListener("change", updateRestoreButton);

async function applyRestore() {
  const plan = restorePlan;
  if (!plan) return;
  const removing = $("#restore-delete").checked ? plan.missing : [];
  if ($("#restore-backup-first").checked && state.list.length) downloadBackup();
  const ops = [...plan.add, ...plan.change].map(({ id, data }) => ["set", id, data]).concat(removing.map((p) => ["del", p.id]));
  try {
    for (let i = 0; i < ops.length; i += 400) {            /* Firestore allows 500 writes per batch */
      const batch = F.writeBatch(db);
      ops.slice(i, i + 400).forEach(([kind, id, data]) => { if (kind === "set") batch.set(ref(id), writableListing(data)); else batch.delete(ref(id)); });
      await batch.commit();
    }
    clearSiteCache();
    await loadAll();
    const parts = [];
    if (plan.add.length) parts.push(`${plan.add.length} added`);
    if (plan.change.length) parts.push(`${plan.change.length} updated`);
    if (removing.length) parts.push(`${removing.length} removed`);
    toast(`Restored: ${parts.join(", ")}`);
  } catch (err) {
    console.error(err);
    toast(friendlyError(err), true);
  }
}
