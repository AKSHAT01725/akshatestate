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
    } else {
      state.list = []; state.loaded = false;
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
    hidden: list.filter((p) => !p.active).length
  };
  $$("[data-count]").forEach((el) => { el.textContent = counts[el.dataset.count]; });

  const live = list.length - counts.hidden;
  if (state.loaded) {
    $("#summary").textContent = list.length
      ? `${live} live on the website${counts.hidden ? `, ${counts.hidden} hidden` : ""}. ${counts.rent} for rent, ${counts.sale} for sale.`
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
}

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
      </div>
    </div>
    <span class="chip ${isRent ? "rent" : "sale"}">${isRent ? "For rent" : "For sale"}</span>
    <div class="toggles">
      <label class="switch" title="Show this property on the website">
        <input type="checkbox" data-act="active" ${p.active ? "checked" : ""}><span class="track"></span>Live
      </label>
      <label class="switch ${isRent ? "" : "is-off"}" title="${isRent ? "Show in Featured Rentals on the homepage" : "Only rentals can be featured on the homepage"}">
        <input type="checkbox" data-act="home" ${p.homeFeatured && isRent ? "checked" : ""} ${isRent ? "" : "disabled"}><span class="track"></span>Homepage
      </label>
    </div>
    <div class="row-actions">
      <button type="button" class="btn btn-ghost btn-sm" data-act="edit" aria-label="Edit ${esc(p.title)}">Edit</button>
      <button type="button" class="icon-btn" data-act="copy" title="Duplicate" aria-label="Duplicate ${esc(p.title)}"><i class="fas fa-copy"></i></button>
      <a class="icon-btn" href="property-details.html?id=${p.id}" target="_blank" rel="noopener" title="View on website" aria-label="View ${esc(p.title)} on the website"><i class="fas fa-arrow-up-right-from-square"></i></a>
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
});

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
  requestAnimationFrame(() => { scrim.classList.add("is-open"); drawer.classList.add("is-open"); });
  setTimeout(() => form.elements.title.focus(), 60);
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
  if (p.bedroomType === "1RK") return "1RK";
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
    bedrooms: isHome && layout !== "1RK" ? Number(layout) : 0,
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
    active: form.active.checked,
    homeFeatured: status === "rent" && form.homeFeatured.checked
  };
  if (isHome) data.bachelorsAllowed = form.bachelorsAllowed.checked;
  return { data, isOneRK: isHome && layout === "1RK", problems };
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (state.busy) return;
  const { data, isOneRK, problems } = readForm();
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
  if (isOneRK) payload.bedroomType = "1RK";
  else if (editing && editing.bedroomType) payload.bedroomType = F.deleteField();
  if (!editing) payload.featured = false;
  if (payload.homeFeatured && !(editing && editing.homeRank)) payload.homeRank = nextHomeRank();

  const btn = $("#save-btn");
  state.busy = true; btn.disabled = true; btn.textContent = "Saving…";
  try {
    await F.setDoc(ref(id), payload, { merge: true });
    const local = { ...(editing || {}), ...data, id };
    if (isOneRK) local.bedroomType = "1RK"; else delete local.bedroomType;
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

/* ---------- Delete ---------- */
const dlg = $("#confirm");
function askDelete(p) {
  $("#confirm-text").textContent = `“${p.title}” will be removed from the website and from Firebase. This cannot be undone. To keep it but stop showing it, turn off Live instead.`;
  dlg.returnValue = "";
  dlg.onclose = async () => {
    if (dlg.returnValue !== "ok") return;
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
  };
  dlg.showModal();
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
$("#export-btn").addEventListener("click", () => {
  const rows = state.list.map(({ updatedAt, ...rest }) => rest).sort((a, b) => a.id - b.id);
  const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `akshat-estate-listings-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});
