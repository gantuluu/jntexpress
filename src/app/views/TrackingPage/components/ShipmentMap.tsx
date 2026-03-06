import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface Coordinate {
  lat: number;
  lng: number;
  label?: string;
  date?: string;
}

interface ShipmentMapProps {
  points: Coordinate[];
}

export const ShipmentMap: React.FC<ShipmentMapProps> = ({ points }) => {
  if (!points || points.length === 0) return null;

  // Filter out points without valid coordinates
  const validPoints = points.filter(p => typeof p.lat === 'number' && typeof p.lng === 'number');

  if (validPoints.length === 0) return null;

  const center: [number, number] = [validPoints[0].lat, validPoints[0].lng];
  const polylinePositions: [number, number][] = validPoints.map(p => [p.lat, p.lng]);

  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden shadow-inner border border-gray-100 relative z-0">
      <MapContainer 
        center={center} 
        zoom={10} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {validPoints.map((point, index) => (
          <Marker key={index} position={[point.lat, point.lng]}>
            <Popup>
              <div className="text-xs">
                <div className="font-bold text-jnt-red">{point.label || 'Lokasi'}</div>
                {point.date && <div className="text-gray-500 mt-1">{point.date}</div>}
              </div>
            </Popup>
          </Marker>
        ))}

        {validPoints.length > 1 && (
          <Polyline 
            positions={polylinePositions} 
            color="#e60012" 
            weight={3} 
            opacity={0.6} 
            dashArray="10, 10"
          />
        )}
      </MapContainer>
    </div>
  );
};
