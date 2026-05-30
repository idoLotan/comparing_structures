import React from 'react';
import Legend from './Legend';

export default function LayerPanel({
  orthophotos,
  geojsonLayers,
  activeOrtho,
  orthoOpacity,
  activeGeojson,
  loading,
  onSelectOrtho,
  onOpacityChange,
  onToggleGeojson,
}) {
  return (
    <aside className="layer-panel">
      <div className="panel-header">
        <h2>Layers</h2>
      </div>

      <div className="panel-body">
        {loading && <p className="loading-text">Loading layers…</p>}

        {/* ── Orthophotos ── */}
        <section className="layer-section">
          <h3>Orthophotos</h3>

          {orthophotos.length === 0 && !loading && (
            <p className="empty-text">No tile sets found</p>
          )}

          {orthophotos.map(ortho => (
            <label key={ortho.id} className="layer-item">
              <input
                type="radio"
                name="orthophoto"
                checked={activeOrtho === ortho.id}
                onChange={() => onSelectOrtho(ortho.id)}
              />
              {ortho.name}
            </label>
          ))}

          {orthophotos.length > 0 && (
            <div className="opacity-control">
              <div className="opacity-label">
                <span>Opacity</span>
                <span>{Math.round(orthoOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={orthoOpacity}
                onChange={e => onOpacityChange(Number(e.target.value))}
                aria-label="Orthophoto opacity"
              />
            </div>
          )}
        </section>

        {/* ── GeoJSON layers ── */}
        <section className="layer-section">
          <h3>GeoJSON</h3>

          {geojsonLayers.length === 0 && !loading && (
            <p className="empty-text">No GeoJSON layers found</p>
          )}

          {geojsonLayers.map(layer => (
            <label key={layer.id} className="layer-item">
              <input
                type="checkbox"
                checked={!!activeGeojson[layer.id]}
                onChange={() => onToggleGeojson(layer.id)}
              />
              {layer.name}
            </label>
          ))}
        </section>
      </div>

      {/* ── Legend ── */}
      <Legend />
    </aside>
  );
}
