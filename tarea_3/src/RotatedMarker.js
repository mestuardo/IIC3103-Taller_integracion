import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useState, useEffect, useCallback, useRef, forwardRef } from "react";
import L from "leaflet";
import "leaflet-rotatedmarker";

// const defaultIcon = L.icon({
//   iconUrl: "https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png",
//   iconSize: [20, 40],
//   iconAnchor: [18, 18],
//   popupAnchor: [0, -10],
//   shadowAnchor: [10, 10]
// });

const RotatedMarker = forwardRef(({ children, ...props }, forwardRef) => {
  const markerRef = useRef();

  const { rotationAngle, rotationOrigin } = props;
  useEffect(() => {
    const marker = markerRef.current;
    if (marker) {
      marker.setRotationAngle(rotationAngle);
      marker.setRotationOrigin(rotationOrigin);
      marker.openPopup()
    }
  }, [rotationAngle, rotationOrigin]);

  return (
    <Marker
      ref={(ref) => {
        markerRef.current = ref;
        if (forwardRef) {
          forwardRef.current = ref;
        }
      }}
      {...props}
    >
      {children}
    </Marker>
  );
});

export default RotatedMarker