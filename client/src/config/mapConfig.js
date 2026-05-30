// ── Server base URL ────────────────────────────────────────────────────────────
export const API_BASE = 'http://localhost:3000';

// ── Map initial view (Israel) ──────────────────────────────────────────────────
export const MAP_CENTER = [32.7940, 35.0217];
export const MAP_ZOOM   = 16;

// ── URL helpers ────────────────────────────────────────────────────────────────
export const tilesUrl   = (id) => `${API_BASE}/tiles/${id}/{z}/{x}/{y}.png`;
export const geojsonUrl = (id) => `${API_BASE}/geojson/${id}.geojson`;
