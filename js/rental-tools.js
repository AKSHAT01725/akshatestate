/* Rental tools used by the blog guides:
   - [data-checklist="key"]  : tick-off checklist (progress bar, Reset, Print). Ticks are remembered in this browser only.
   - #budget-calculator      : rent budget calculator (everything is worked out in the browser; nothing is sent anywhere). */
(function () {
  function inr(n) { return "\u20B9" + Math.round(n).toLocaleString("en-IN"); }

  document.querySelectorAll("[data-checklist]").forEach(function (root) {
    var key = "ae_checklist_" + root.getAttribute("data-checklist");
    var boxes = Array.prototype.slice.call(root.querySelectorAll('input[type="checkbox"]'));
    var bar = root.querySelector(".tool-progress-bar");
    var label = root.querySelector(".tool-progress-text");
    var saved = [];
    try { saved = JSON.parse(localStorage.getItem(key) || "[]") || []; } catch (e) {}
    boxes.forEach(function (b, i) { b.checked = saved.indexOf(i) > -1; });

    function update(persist) {
      var done = boxes.filter(function (b) { return b.checked; });
      if (bar) bar.style.width = (boxes.length ? Math.round(done.length / boxes.length * 100) : 0) + "%";
      if (label) label.textContent = done.length + " of " + boxes.length + " done";
      boxes.forEach(function (b) { b.closest("li").classList.toggle("is-done", b.checked); });
      if (persist) {
        try { localStorage.setItem(key, JSON.stringify(boxes.map(function (b, i) { return b.checked ? i : -1; }).filter(function (i) { return i > -1; }))); } catch (e) {}
      }
    }
    boxes.forEach(function (b) { b.addEventListener("change", function () { update(true); }); });
    var reset = root.querySelector("[data-checklist-reset]");
    if (reset) reset.addEventListener("click", function () { boxes.forEach(function (b) { b.checked = false; }); update(true); });
    var print = root.querySelector("[data-checklist-print]");
    if (print) print.addEventListener("click", function () { window.print(); });
    update(false);
  });

  var calc = document.getElementById("budget-calculator");
  if (calc) {
    var num = function (id) { var v = parseFloat((document.getElementById(id) || {}).value); return isFinite(v) && v > 0 ? v : 0; };
    var set = function (id, text) { var el = document.getElementById(id); if (el) el.textContent = text; };
    function run() {
      var income = num("bc-income"), rent = num("bc-rent"), maint = num("bc-maint"), util = num("bc-util");
      var other = num("bc-other"), depMonths = num("bc-deposit"), broker = num("bc-broker"), moving = num("bc-moving");
      var housing = rent + maint + util;
      var share = income > 0 ? housing / income * 100 : 0;
      var maxRent = Math.max(0, income * 0.30 - maint - util);
      var left = income - housing - other;
      var upfront = rent + rent * depMonths + broker + moving;

      set("bc-out-housing", inr(housing));
      set("bc-out-share", income > 0 ? share.toFixed(0) + "% of income" : "Enter your income");
      set("bc-out-max", income > 0 ? inr(maxRent) : "-");
      set("bc-out-left", income > 0 ? inr(left) : "-");
      set("bc-out-upfront", inr(upfront));
      var note = document.getElementById("bc-out-note");
      if (note) {
        if (!income || !rent) note.textContent = "Fill in your income and the rent you are considering to see how it fits.";
        else if (share <= 30) note.textContent = "This is within the common guideline of keeping housing at about 30% of take-home income.";
        else if (share <= 40) note.textContent = "This is above the common 30% guideline. It can work if your other costs are low, but leaves less room for savings.";
        else note.textContent = "This is well above the common 30% guideline. Consider a lower rent, a smaller home or sharing.";
        if (left < 0 && income) note.textContent += " After your other monthly commitments you would be short each month.";
      }
    }
    calc.addEventListener("input", run);
    run();
  }
})();
