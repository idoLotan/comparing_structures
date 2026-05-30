import React, { useState, useEffect, useCallback } from 'react';
import MapView from './components/MapView';
import LayerPanel from './components/LayerPanel';
import { useLayers } from './hooks/useLayers';
import './styles/App.css';

export default function App() {
  const { orthophotos, geojsonLayers, loading, error } = useLayers();

  // Active orthophoto id (only one displayed at a time)
  const [activeOrtho, setActiveOrtho] = useState(null);
  // Opacity 0-1 for the active orthophoto
  const [orthoOpacity, setOrthoOpacity] = useState(1);
  // Map of geojson id → boolean visibility
  const [activeGeojson, setActiveGeojson] = useState({});
  // Map of geojson id → loaded GeoJSON data (for FitExtent)
  const [geojsonDataMap, setGeojsonDataMap] = useState({});

  // Once orthophotos load, activate the first one by default
  useEffect(() => {
    if (orthophotos.length > 0 && activeOrtho === null) {
      setActiveOrtho(orthophotos[0].id);
    }
  }, [orthophotos]);

  // Once geojson layers load, enable all by default
  useEffect(() => {
    if (geojsonLayers.length > 0) {
      setActiveGeojson(prev => {
        const next = { ...prev };
        geojsonLayers.forEach(l => {
          if (!(l.id in next)) next[l.id] = true;
        });
        return next;
      });
    }
  }, [geojsonLayers]);

  const toggleGeojson = useCallback((id) => {
    setActiveGeojson(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // Called by GeoJsonLayer when it finishes fetching data
  const handleGeojsonLoad = useCallback((id, data) => {
    setGeojsonDataMap(prev => ({ ...prev, [id]: data }));
  }, []);

  if (error) {
    return (
      <div className="error-screen">
        <p>Could not connect to GIS server.</p>
        <small>{error}</small>
      </div>
    );
  }

  return (
    <div className="app-container">
      <LayerPanel
        orthophotos={orthophotos}
        geojsonLayers={geojsonLayers}
        activeOrtho={activeOrtho}
        orthoOpacity={orthoOpacity}
        activeGeojson={activeGeojson}
        loading={loading}
        onSelectOrtho={setActiveOrtho}
        onOpacityChange={setOrthoOpacity}
        onToggleGeojson={toggleGeojson}
      />
      <MapView
        activeOrtho={activeOrtho}
        orthoOpacity={orthoOpacity}
        geojsonLayers={geojsonLayers}
        activeGeojson={activeGeojson}
        geojsonDataMap={geojsonDataMap}
        onGeojsonLoad={handleGeojsonLoad}
      />
    </div>
  );
}
