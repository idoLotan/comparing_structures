import React, { useState, useEffect, useRef } from 'react';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { geojsonUrl } from '../config/mapConfig';
import { getFeatureStyle, pointStyle } from '../config/geoStyles';

// Builds an HTML string listing all feature properties for the popup.
const buildPopupHtml = (properties) =>
  Object.entries(properties || {})
    .map(([k, v]) => `<strong>${k}:</strong> ${String(v)}`)
    .join('<br/>');

export default function GeoJsonLayer({ layer, onLoad }) {
  const [data, setData] = useState(null);
  // dataVersion increments on each successful fetch so GeoJSON's key changes
  // and React-Leaflet recreates the layer with fresh data.
  const dataVersion = useRef(0);

  useEffect(() => {
    fetch(geojsonUrl(layer.id))
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(d => {
        dataVersion.current += 1;
        setData(d);
        onLoad?.(layer.id, d);
      })
      .catch(err => console.error(`Failed to load ${layer.id}:`, err));
  }, [layer.id]);

  if (!data) return null;

  // Render Points as CircleMarkers with the style from geoStyles.js
  const pointToLayer = (_feature, latlng) =>
    L.circleMarker(latlng, pointStyle);

  // Bind popup to every feature that has properties
  const onEachFeature = (feature, leafletLayer) => {
    if (feature.properties && Object.keys(feature.properties).length > 0) {
      leafletLayer.bindPopup(buildPopupHtml(feature.properties));
    }
  };

  return (
    <GeoJSON
      key={`${layer.id}-v${dataVersion.current}`}
      data={data}
      style={getFeatureStyle}
      pointToLayer={pointToLayer}
      onEachFeature={onEachFeature}
    />
  );
}
