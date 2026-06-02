# Wunschtiger

Kunstprojekt-Website. Sammelt Wünsche von verschiedenen Skulptur-Standorten und macht sie öffentlich sichtbar.

## Lokal anschauen

Doppelklick auf `index.html` reicht. (Falls Browser blockt: `python -m http.server` im Ordner starten und `localhost:8000` öffnen.)

## Inhalt pflegen (für Lisa)

Wünsche stehen in `wishes.csv`. Spalten: `wunsch, kategorie, ort, datum`.

**Variante A — direkt in der CSV (einfach):**
1. `wishes.csv` in Excel oder einem Texteditor öffnen
2. Zeile anhängen, speichern, im Browser neu laden

**Variante B — über Google Sheet (komfortabler):**
1. Google Sheet erstellen mit Spalten `wunsch, kategorie, ort, datum`
2. Datei → Im Web veröffentlichen → als CSV
3. Veröffentlichungs-Link in `script.js` bei `DATA_URL` eintragen

## Deployment

Cloudflare Pages → Connect to Git → Repo wählen → Framework: **None** → Build command: leer → Output: `/` → Deploy.

Bei jedem `git push` wird automatisch neu deployed.

## Anpassen

- **Farben & Schrift:** `styles.css` ganz oben unter `:root`
- **Kategorien-Reihenfolge:** `script.js`, Konstante `CATEGORY_ORDER`
- **Texte (Titel, Intro, Footer):** `index.html`
