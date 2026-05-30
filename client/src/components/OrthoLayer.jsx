import React from 'react';
import { TileLayer } from 'react-leaflet';
import { tilesUrl } from '../config/mapConfig';

// Displays a single XYZ tile layer for the selected orthophoto.
// The `key` prop on TileLayer is set to `id` so React replaces (not updates)
// the layer when the user switches to a different orthophoto.
export default function OrthoLayer({ id, opacity }) {
  return (
    <TileLayer
      key={id}
      url={tilesUrl(id)}
      opacity={opacity}
      attribution={`© Orthophoto ${id}`}
      maxZoom={22}
      tileSize={256}
    />
  );
}
