import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

const MapComponent = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    height: "100%",
    width: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  if (!searchResults) {
    return null; // Or you can render a loading state or fallback UI
  }

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              role="img"
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {selectedLocation.longitude === result.long && (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};


export default MapComponent;