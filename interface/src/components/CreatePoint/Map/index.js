import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

const Map = ({ center, zoom, onZoomChanged, onClick }) => {
  const [position, setPosition] = useState({ lat: 0, lgn: 0 });

  function handleZoomChanged() {
    onZoomChanged(this.getZoom());
  }

  useEffect(() => {
    setPosition(center);
  }, [center]);

  return (
    <GoogleMap defaultZoom={zoom} defaultCenter={center} onZoomChanged={handleZoomChanged} onClick={onClick}>
      <Marker position={position} />
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));
