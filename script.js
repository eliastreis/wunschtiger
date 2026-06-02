// ============================================================
//  Wunschtiger — frontend
//  Liest Wünsche aus einer CSV-Datei (lokal oder aus Google Sheet)
// ============================================================

// Datenquelle:
//   - Lokal:  "wishes.csv"
//   - Google Sheet:  Sheet → Datei → Im Web veröffentlichen → CSV → Link hier rein.
const DATA_URL = "wishes.csv";

// Kategorien-Reihenfolge in der Filterleiste (optional — falls leer,
// werden Kategorien aus den Daten automatisch sortiert übernommen).
const CATEGORY_ORDER = [
  "Innerer Frieden",
  "Beziehungen",
  "Familie",
  "Gesundheit",
  "Beruf & Kunst",
  "Gesellschaft",
  "Sonstiges",
];

// ============================================================

let allWishes = [];
let activeCategory = "alle";

async function loadWishes() {
  try {
    const res = await fetch(DATA_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Fehler beim Laden: " + res.status);
    const text = await res.text();
    allWishes = parseCSV(text);
    render();
  } catch (err) {
    document.getElementById("wishes-grid").innerHTML =
      `<p class="empty">Wünsche konnten nicht geladen werden.<br/><small>${err.message}</small></p>`;
  }
}

// Minimaler CSV-Parser (kommt mit Anführungszeichen und Kommas in Feldern klar).
function parseCSV(text) {
  const lines = text.replace(/\r/g, "").split("\n").filter(l => l.trim());
  if (lines.length < 2) return [];
  const headers = splitCSVLine(lines[0]);
  return lines.slice(1).map(line => {
    const cells = splitCSVLine(line);
    const row = {};
    headers.forEach((h, i) => row[h.trim().toLowerCase()] = (cells[i] || "").trim());
    return row;
  });
}

function splitCSVLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (c === "," && !inQuotes) {
      out.push(cur); cur = "";
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

function getCategories() {
  const set = new Set(allWishes.map(w => w.kategorie).filter(Boolean));
  // Bekannte zuerst (in Reihenfolge), dann unbekannte alphabetisch.
  const known = CATEGORY_ORDER.filter(c => set.has(c));
  const extra = [...set].filter(c => !CATEGORY_ORDER.includes(c)).sort();
  return [...known, ...extra];
}

function render() {
  renderFilters();
  renderWishes();
  document.getElementById("count").textContent = allWishes.length;
}

function renderFilters() {
  const container = document.querySelector(".filters-inner");
  // "Alle"-Chip behalten, Rest neu aufbauen
  container.querySelectorAll(".chip:not([data-category='alle'])").forEach(el => el.remove());
  getCategories().forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "chip";
    btn.dataset.category = cat;
    btn.textContent = cat;
    container.appendChild(btn);
  });
  container.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category;
      container.querySelectorAll(".chip").forEach(b => b.classList.toggle("active", b === btn));
      renderWishes();
    });
  });
}

function renderWishes() {
  const grid = document.getElementById("wishes-grid");
  const filtered = activeCategory === "alle"
    ? allWishes
    : allWishes.filter(w => w.kategorie === activeCategory);

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="empty">Noch keine Wünsche in dieser Kategorie.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(w => `
    <article class="wish-card">
      <p class="wish-text">${escapeHTML(w.wunsch)}</p>
      <div class="wish-meta">
        <span class="wish-category">${escapeHTML(w.kategorie || "")}</span>
        <span class="wish-place">${escapeHTML(w.ort || "")}</span>
      </div>
    </article>
  `).join("");
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

loadWishes();
