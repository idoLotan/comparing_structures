import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

// Adds a custom Leaflet control (bottom-right) that tracks and displays
// the cursor's geographic coordinates in real time.
export default function MouseCoordinates() {
  const map = useMap();

  useEffect(() => {
    const div = L.DomUtil.create('div', 'mouse-coordinates');

    const ctrl = L.control({ position: 'bottomright' });
    ctrl.onAdd = () => div;
    ctrl.addTo(map);

    const onMove = (e) => {
      div.textContent =
        `Lat: ${e.latlng.lat.toFixed(6)}   Lng: ${e.latlng.lng.toFixed(6)}`;
    };
    const onOut = () => { div.textContent = ''; };

    map.on('mousemove', onMove);
    map.on('mouseout', onOut);

    return () => {
      map.off('mousemove', onMove);
      map.off('mouseout', onOut);
      ctrl.remove();
    };
  }, [map]);

  return null;
}
