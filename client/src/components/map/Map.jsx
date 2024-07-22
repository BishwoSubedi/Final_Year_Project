import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss"; // Make sure map.scss is correctly importing styles
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

function Map({ items }) {
  const defaultCenter = [28.394857, 84.124008]; // Default center for Nepal

  // Determine map center based on items
  const mapCenter = items.length === 1 
    ? [items[0].latitude, items[0].longitude] 
    : defaultCenter;

  return (
    <MapContainer
      center={mapCenter}
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin 
          item={item} 
          key={item.id} 
          position={[item.latitude, item.longitude]} 
          title={`${item.city}, ${item.district}`} 
        />
      ))}
    </MapContainer>
  );
}

export default Map;
