/* Google reviews carousel: layout and auto-rotate. Add your reviews in reviews-data.js, not here. */
(function () {
  "use strict";
  var section = document.getElementById("reviews");
  if (!section) return;

  var preview = /[?&]preview-reviews\b/.test(location.search);
  var list = REVIEWS.slice(0, 30);
  if (!list.length && preview) {
    for (var i = 1; i <= 30; i++) list.push({ name: "Client name " + i, detail: "Property type, Area", text: "Review text goes here. This is a layout preview only.", rating: 5 });
  }
  if (!list.length) return; /* nothing real to show: keep the section hidden */

  var G_BADGE = '<svg class="rv-gbadge" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#4285F4"/><text x="12" y="17.5" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="16" fill="#fff">G</text></svg>';
  var WORDMARK = '<span class="rv-gword" aria-label="Google"><i style="color:#4285F4">G</i><i style="color:#EA4335">o</i><i style="color:#FBBC05">o</i><i style="color:#4285F4">g</i><i style="color:#34A853">l</i><i style="color:#EA4335">e</i></span>';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var track = document.getElementById("reviews-track");
  var dotsBox = document.getElementById("reviews-dots");
  track.innerHTML = "";

  list.forEach(function (r) {
    var card = el("article", "rv-card");
    var head = el("div", "rv-head");
    var who = el("div", "rv-who");
    who.appendChild(el("h3", "rv-name", r.name || ""));
    if (r.detail) who.appendChild(el("p", "rv-detail", r.detail));
    head.appendChild(who);
    var wm = el("div", "rv-wm"); wm.innerHTML = WORDMARK; head.appendChild(wm);
    card.appendChild(head);

    var rating = Math.max(1, Math.min(5, Math.round(Number(r.rating) || 5)));
    var stars = el("div", "rv-stars");
    stars.setAttribute("role", "img");
    stars.setAttribute("aria-label", rating + " out of 5 stars");
    stars.textContent = "\u2605".repeat(rating) + "\u2606".repeat(5 - rating);
    card.appendChild(stars);

    card.appendChild(el("p", "rv-text", r.text || ""));

    var foot = el("div", "rv-foot");
    var tag = r.url && /^https:\/\//.test(r.url) ? el("a", "rv-posted") : el("span", "rv-posted");
    if (tag.tagName === "A") { tag.href = r.url; tag.target = "_blank"; tag.rel = "noopener noreferrer"; }
    tag.innerHTML = G_BADGE + "<span>Posted on Google</span>";
    foot.appendChild(tag);
    card.appendChild(foot);
    track.appendChild(card);
  });

  if (preview) {
    var note = document.getElementById("reviews-preview-note");
    if (note) note.hidden = false;
  }
  section.hidden = false;

  /* carousel: native scroll-snap, arrows and dots follow the scroll position */
  var prev = document.getElementById("reviews-prev");
  var next = document.getElementById("reviews-next");
  var pages = 1;

  function perView() { return window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1; }
  function buildDots() {
    pages = Math.max(1, Math.ceil(list.length / perView()));
    dotsBox.innerHTML = "";
    for (var i = 0; i < pages; i++) {
      var b = el("button", "rv-dot");
      b.type = "button";
      b.setAttribute("aria-label", "Show reviews page " + (i + 1));
      (function (idx) { b.addEventListener("click", function () { track.scrollTo({ left: idx * track.clientWidth, behavior: "smooth" }); }); })(i);
      dotsBox.appendChild(b);
    }
    sync();
  }
  function sync() {
    var w = track.clientWidth || 1;
    var idx = Math.min(pages - 1, Math.round(track.scrollLeft / w));
    Array.prototype.forEach.call(dotsBox.children, function (d, i) { d.classList.toggle("is-on", i === idx); });
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft + w >= track.scrollWidth - 4;
  }
  prev.addEventListener("click", function () { track.scrollBy({ left: -track.clientWidth, behavior: "smooth" }); });
  next.addEventListener("click", function () { track.scrollBy({ left: track.clientWidth, behavior: "smooth" }); });
  function onScroll() { window.requestAnimationFrame(sync); }
  track.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", buildDots);
  buildDots();

  /* continuous auto-scroll: the cards drift left slowly and loop with no jump.
     Pauses on hover, keyboard focus and touch, while the tab is hidden and while the
     section is off screen. Stays still for visitors who prefer reduced motion
     (they use the arrows and dots instead). */
  var SPEED = 40; /* pixels per second */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var originals = Array.prototype.slice.call(track.children);
  var flow = !reduce && originals.length > perView();
  var inView = false, held = false, raf = 0, last = 0, pos = 0, loopW = 0;

  if (flow) {
    originals.forEach(function (c) {
      var k = c.cloneNode(true);
      k.setAttribute("aria-hidden", "true");
      k.querySelectorAll("a").forEach(function (a) { a.tabIndex = -1; });
      track.appendChild(k);
    });
    track.classList.add("is-flow");
    dotsBox.hidden = true;
    prev.disabled = false; next.disabled = false;
    track.removeEventListener("scroll", onScroll);
  }
  function measure() {
    var first = originals[0], second = track.children[originals.length];
    loopW = second.offsetLeft - first.offsetLeft;
  }
  function tick(t) {
    raf = 0;
    if (!flow || held || !inView || document.hidden) { last = 0; return; }
    if (last) {
      pos += SPEED * (t - last) / 1000;
      if (pos >= loopW) pos -= loopW;
      track.scrollLeft = pos;
    }
    last = t;
    raf = requestAnimationFrame(tick);
  }
  function start() {
    if (!flow || raf || held || !inView || document.hidden) return;
    measure(); pos = track.scrollLeft; last = 0;
    raf = requestAnimationFrame(tick);
  }
  function hold() { held = true; if (raf) { cancelAnimationFrame(raf); raf = 0; } last = 0; }
  function release(delay) { setTimeout(function () { held = false; start(); }, delay || 0); }

  if (flow) {
    /* arrows nudge by one card width, then the drift carries on from there */
    var step = function (dir) {
      var w = originals[0].offsetWidth + 20;
      hold();
      var to = track.scrollLeft + dir * w;
      if (to < 0) to += loopW;
      track.scrollTo({ left: to, behavior: "smooth" });
      release(900);
    };
    prev.addEventListener("click", function (e) { e.stopImmediatePropagation(); step(-1); }, true);
    next.addEventListener("click", function (e) { e.stopImmediatePropagation(); step(1); }, true);
    track.addEventListener("scroll", function () {
      if (held && loopW && track.scrollLeft >= loopW) track.scrollLeft -= loopW;
    }, { passive: true });

    var wrap = track.parentNode;
    wrap.addEventListener("mouseenter", hold);
    wrap.addEventListener("mouseleave", function () { release(0); });
    wrap.addEventListener("focusin", hold);
    wrap.addEventListener("focusout", function () { release(0); });
    wrap.addEventListener("touchstart", hold, { passive: true });
    wrap.addEventListener("touchend", function () { release(3000); }, { passive: true });
    document.addEventListener("visibilitychange", function () { if (document.hidden) hold(); else release(0); });
    window.addEventListener("resize", function () { hold(); release(200); });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) start(); else if (raf) { cancelAnimationFrame(raf); raf = 0; last = 0; }
      }, { threshold: 0.3 }).observe(section);
    } else { inView = true; start(); }
  }
})();
