// ── All GeoJSON visual style definitions live here ────────────────────────────
// Edit this file to change the look of all vector layers app-wide.

export const pointStyle = {
  radius:      7,
  fillColor:   '#ff7800',
  color:       '#333333',
  weight:      1.5,
  opacity:     1,
  fillOpacity: 0.85,
};

export const lineStyle = {
  color:   '#0066cc',
  weight:  3,
  opacity: 0.9,
};

export const polygonStyle = {
  color:       '#0055aa',
  weight:      2,
  opacity:     0.9,
  fillColor:   '#3377cc',
  fillOpacity: 0.20,
};

// Returns a Leaflet path-style object based on geometry type.
// Used as the `style` prop on <GeoJSON>.
export const getFeatureStyle = (feature) => {
  const type = feature?.geometry?.type;
  if (type === 'Polygon' || type === 'MultiPolygon')         return polygonStyle;
  if (type === 'LineString' || type === 'MultiLineString')   return lineStyle;
  return {}; // points are handled by pointToLayer
};
