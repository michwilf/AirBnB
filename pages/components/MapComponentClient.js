import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import getCenter from "geolib/es/getCenter";

const MapContainer = dynamic(() => import("react-leaflet").then((module) => module.MapContainer), {
  ssr: false,
});

const TileLayer = dynamic(() => import("react-leaflet").then((module) => module.TileLayer), {
  ssr: false,
});

const Marker = dynamic(() => import("react-leaflet").then((module) => module.Marker), {
  ssr: false,
});

const Popup = dynamic(() => import("react-leaflet").then((module) => module.Popup), {
  ssr: false,
});

let L;

if (typeof window !== "undefined") {
  L = require("leaflet");
}


const MapComponentClient = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 51.48695,
    longitude: -0.095091,
    zoom: 11,
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

  if (!searchResults) {
    return null;
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
        <Marker
          position={[result.lat, result.long]}
          key={result.long}
        >
          <Popup>{result.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponentClient;
