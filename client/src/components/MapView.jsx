import React from 'react';
import { MapContainer, TileLayer, ScaleControl, ZoomControl } from 'react-leaflet';
import { MAP_CENTER, MAP_ZOOM } from '../config/mapConfig';
import OrthoLayer from './OrthoLayer';
import GeoJsonLayer from './GeoJsonLayer';
import MouseCoordinates from './MouseCoordinates';
import FitExtentControl from './FitExtentControl';

export default function MapView({
  activeOrtho,
  orthoOpacity,
  geojsonLayers,
  activeGeojson,
  geojsonDataMap,
  onGeojsonLoad,
}) {
  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      zoomControl={false}
      className="map-container"
    >
      {/* OSM base layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={20}
      />

      {/* Active orthophoto overlay */}
      {activeOrtho && (
        <OrthoLayer id={activeOrtho} opacity={orthoOpacity} />
      )}

      {/* Vector layers — render only the active ones */}
      {geojsonLayers.map(layer =>
        activeGeojson[layer.id] ? (
          <GeoJsonLayer
            key={layer.id}
            layer={layer}
            onLoad={onGeojsonLoad}
          />
        ) : null
      )}

      {/* Built-in controls */}
      <ZoomControl position="bottomright" />
      <ScaleControl position="bottomleft" metric imperial={false} />

      {/* Custom controls (must be inside MapContainer for useMap() to work) */}
      <MouseCoordinates />
      <FitExtentControl
        geojsonDataMap={geojsonDataMap}
        activeGeojson={activeGeojson}
      />
    </MapContainer>
  );
}
