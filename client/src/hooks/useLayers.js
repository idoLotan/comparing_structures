import { useState, useEffect } from 'react';
import { API_BASE } from '../config/mapConfig';

// Fetches both orthophoto and GeoJSON layer lists from the server on mount.
// Returns { orthophotos, geojsonLayers, loading, error }.
export function useLayers() {
  const [orthophotos, setOrthophotos]   = useState([]);
  const [geojsonLayers, setGeojsonLayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/orthophotos`).then(r => r.json()),
      fetch(`${API_BASE}/api/geojson`).then(r => r.json()),
    ])
      .then(([orthos, geojsons]) => {
        setOrthophotos(orthos);
        setGeojsonLayers(geojsons);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { orthophotos, geojsonLayers, loading, error };
}
