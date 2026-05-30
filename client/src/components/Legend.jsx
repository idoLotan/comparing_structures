import React from 'react';
import { pointStyle, lineStyle, polygonStyle } from '../config/geoStyles';

// Static map legend — symbols are drawn with inline SVG so they exactly
// match the Leaflet styles defined in geoStyles.js.
export default function Legend() {
  return (
    <div className="legend">
      <h4 className="legend-title">Legend</h4>

      {/* Point */}
      <div className="legend-item">
        <svg width="22" height="22" aria-hidden="true">
          <circle
            cx="11" cy="11" r={pointStyle.radius}
            fill={pointStyle.fillColor}
            stroke={pointStyle.color}
            strokeWidth={pointStyle.weight}
            fillOpacity={pointStyle.fillOpacity}
          />
        </svg>
        <span>Point</span>
      </div>

      {/* LineString */}
      <div className="legend-item">
        <svg width="22" height="22" aria-hidden="true">
          <line
            x1="2" y1="11" x2="20" y2="11"
            stroke={lineStyle.color}
            strokeWidth={lineStyle.weight}
            strokeOpacity={lineStyle.opacity}
          />
        </svg>
        <span>Line</span>
      </div>

      {/* Polygon */}
      <div className="legend-item">
        <svg width="22" height="22" aria-hidden="true">
          <rect
            x="2" y="5" width="18" height="12"
            fill={polygonStyle.fillColor}
            stroke={polygonStyle.color}
            strokeWidth={polygonStyle.weight}
            fillOpacity={polygonStyle.fillOpacity}
          />
        </svg>
        <span>Polygon</span>
      </div>
    </div>
  );
}
