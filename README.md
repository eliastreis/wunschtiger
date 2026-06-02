# Wunschtiger

Webseite zum partizipativen Kunstprojekt von Amrei Treis. Wünsche werden über die analogen Wunschtiger-Skulpturen gesammelt und auf dieser Seite öffentlich sichtbar gemacht.

## Datenquelle

Wünsche werden live aus einem Google Sheet gelesen:
https://docs.google.com/spreadsheets/d/1uU3sqnia6w_WzVVFAb3GSyq1S_P4w5-6SlpQSriTFSw/edit

Spalten: `wunsch | kategorie | ort | datum`

Kategorien (müssen exakt so geschrieben werden): `Innerer Frieden`, `Beziehungen`, `Familie`, `Gesundheit`, `Beruf & Kunst`, `Gesellschaft`, `Sonstiges`

Datumsformat: `YYYY-MM-DD` (z.B. `2026-04-15`)

Neue Wünsche im Sheet eintragen → nach max. 1 Min im Browser sichtbar (cache: no-store).

## Lokal anschauen

`index.html` per Doppelklick öffnen. Falls Browser CORS blockt: `python -m http.server` im Ordner starten und `localhost:8000` öffnen.

## Deployment

Cloudflare Pages → Connect to Git → `wunschtiger` Repo → Framework: **None**, Build command: leer, Output: `/` → Deploy. Auto-Deploy bei jedem Push.

## Anpassen

- **Künstlerin-Bio, Foto, Kontakt:** `index.html`, Sektion `<section id="artist">`
- **Farben:** `tailwind.config` oben im HTML, `museum.*`
- **Kategorien (Farbe/Icon):** JS-Konstante `CATEGORIES`
- **Sheet-URL austauschen:** JS-Konstante `CSV_URL`
