import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import getCenter from "geolib/es/getCenter";
import markerIcon from "../../public/map-icon.png";

const customMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});


const MapComponent = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 51.509865,
    longitude:  -0.118092,
    zoom: 9,
  });

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      const coordinates = searchResults.map((result) => ({
        longitude: result.long,
        latitude: result.lat,
      }));
      const center = getCenter(coordinates);
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: center.latitude,
        longitude: center.longitude,
      }));
    }
  }, [searchResults]);

  if (typeof window === "undefined") {
    return null; // Render nothing in non-browser environments
  }

  if (!searchResults) {
    return null; // Or you can render a loading state or fallback UI
  }

  return (
    <MapContainer
      center={[viewport.latitude, viewport.longitude]}
      zoom={viewport.zoom}
      style={{ height: "100%", width: "100%", zIndex: -1 }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {searchResults.map((result) => (
        <Marker position={[result.lat, result.long]} key={result.long} icon={customMarkerIcon}>
          <Popup>{result.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
