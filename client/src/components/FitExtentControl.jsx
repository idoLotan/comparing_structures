import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

// Adds a "Fit to extent" button (⊞) to the top-left of the map.
// Clicking it fits the viewport to the union of all currently active GeoJSON layers.
export default function FitExtentControl({ geojsonDataMap, activeGeojson }) {
  const map = useMap();

  // Use refs so the click handler always reads the latest props
  // without needing to recreate the Leaflet control on every render.
  const dataRef   = useRef(geojsonDataMap);
  const activeRef = useRef(activeGeojson);

  useEffect(() => { dataRef.current   = geojsonDataMap; });
  useEffect(() => { activeRef.current = activeGeojson;  });

  useEffect(() => {
    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    const btn = L.DomUtil.create('a', 'fit-extent-btn', container);
    btn.href  = '#';
    btn.title = 'Fit layers to extent';
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-label', 'Fit layers to extent');
    btn.innerHTML = '⊞';

    L.DomEvent.on(btn, 'click', (e) => {
      L.DomEvent.preventDefault(e);
      L.DomEvent.stopPropagation(e);

      const bounds = L.latLngBounds([]);
      Object.entries(dataRef.current).forEach(([id, data]) => {
        if (activeRef.current[id] && data) {
          try {
            const b = L.geoJSON(data).getBounds();
            if (b.isValid()) bounds.extend(b);
          } catch {}
        }
      });

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    });

    // Prevent map clicks from propagating through the button
    L.DomEvent.disableClickPropagation(container);

    const ctrl = L.control({ position: 'topleft' });
    ctrl.onAdd = () => container;
    ctrl.addTo(map);

    return () => ctrl.remove();
  }, [map]); // only runs once per map instance

  return null;
}
