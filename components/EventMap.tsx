// components/EventMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import marker from "@/public/location.png";

// Fix marker icon
const icon = L.icon({
  iconUrl: marker.src,
  iconSize: [41, 41],
  iconAnchor: [12, 41],
});

interface EventMapProps {
  latitude: number;
  longitude: number;
  eventName: string;
}

const EventMap = ({ latitude, longitude, eventName }: EventMapProps) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={14}
      style={{ height: "200px", width: "100%", borderRadius: "10px" }}
      className="rounded-lg"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[latitude, longitude]} icon={icon}>
        <Popup>{eventName}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default EventMap;
