// Live stock: fetches the published Google Sheet CSV and marks rows sold out
// when their pack quantity exceeds the balls remaining for that line.
// Fill in STOCK_CSV_URL below once the sheet is published (see README).
(function () {
  "use strict";

  var STOCK_CSV_URL = ""; // e.g. "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv"

  var rows = document.querySelectorAll(".price-table tr[data-line]");
  if (!rows.length || !STOCK_CSV_URL) return;

  fetch(STOCK_CSV_URL, { cache: "no-store" })
    .then(function (res) {
      if (!res.ok) throw new Error("stock fetch failed: " + res.status);
      return res.text();
    })
    .then(function (csv) {
      var stock = parseStockCsv(csv);
      rows.forEach(function (row) {
        var lineId = row.getAttribute("data-line");
        var qty = parseInt(row.getAttribute("data-qty"), 10);
        if (!(lineId in stock)) return; // unknown line: leave the pre-baked state alone
        var remaining = stock[lineId];
        row.classList.toggle("sold-out", remaining < qty);
      });
    })
    .catch(function (err) {
      // Fetch failed (offline, sheet not published yet, etc.) - keep whatever
      // sold-out state was last baked into the HTML rather than guessing.
      console.warn("Live stock check skipped:", err);
    });

  function parseStockCsv(csv) {
    var stock = {};
    var lines = csv.trim().split(/\r?\n/);
    for (var i = 1; i < lines.length; i++) { // skip header row
      var cols = lines[i].split(",");
      var lineId = (cols[0] || "").trim();
      var balls = parseInt(cols[1], 10);
      if (lineId && !isNaN(balls)) stock[lineId] = balls;
    }
    return stock;
  }
})();
