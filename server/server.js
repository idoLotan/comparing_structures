const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const TILES_DIR = path.join(__dirname, 'tiles');
const GEOJSON_DIR = path.join(__dirname, 'geojson');

app.use(cors());
app.use(express.json());

// Tiles served statically with 30-day cache header
app.use('/tiles', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=2592000'); // 30 days in seconds
  next();
}, express.static(TILES_DIR));

// GeoJSON files served statically
app.use('/geojson', express.static(GEOJSON_DIR));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ── List orthophoto tile sets ─────────────────────────────────────────────────
// Reads the tiles/ directory automatically — no hardcoded layer list.
app.get('/api/orthophotos', (req, res) => {
  try {
    if (!fs.existsSync(TILES_DIR)) return res.json([]);

    const dirs = fs
      .readdirSync(TILES_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => ({
        id: d.name,
        // "ortho_2024" → "Ortho 2024"
        name: d.name
          .replace(/_/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase()),
      }));

    res.json(dirs);
  } catch (err) {
    console.error('Error reading tiles directory:', err.message);
    res.json([]);
  }
});

// ── List GeoJSON layers ───────────────────────────────────────────────────────
// Reads the geojson/ directory automatically — no hardcoded layer list.
app.get('/api/geojson', (req, res) => {
  try {
    if (!fs.existsSync(GEOJSON_DIR)) return res.json([]);

    const files = fs
      .readdirSync(GEOJSON_DIR)
      .filter(f => f.toLowerCase().endsWith('.geojson'))
      .map(f => ({
        id: f.replace(/\.geojson$/i, ''),
        // "road_network" → "Road Network"
        name: f
          .replace(/\.geojson$/i, '')
          .replace(/_/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase()),
      }));

    res.json(files);
  } catch (err) {
    console.error('Error reading geojson directory:', err.message);
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`GIS Server running at http://localhost:${PORT}`);
  console.log(`  Tiles:   /tiles/{layer}/{z}/{x}/{y}.png`);
  console.log(`  GeoJSON: /geojson/{layer}.geojson`);
});
