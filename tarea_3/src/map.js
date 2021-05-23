import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {icon} from 'leaflet'
import React from 'react'
import RotatedMarker from "./RotatedMarker";

const polyline = [
  [51.505, -0.09],
  [51.51, -0.12],
]

const colorOptions = [
  { color: 'blue' },
  { color: 'red' },
  { color: 'lime' },
  { color: 'purple' },
  { color: 'red' }

]

function getColor(i) {
  if (i<5){
    return colorOptions[i]
  }else{
    return colorOptions[i%5]
  }
  
}


const ICON = icon({
  iconUrl: "/aeroplane.svg",
  iconSize: [20, 20],
  
})

function angle(cx, cy, ex, ey) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}






export default function Map({positions, flights}){
  React.useEffect(()=>
  console.log(flights),[flights])

  return (
        <MapContainer 
        center={[7.5735284, -13.6171943]} 
        zoom={2} 
        minZoom={2}
        style={{ height: '400px', width: '95%', margin:'auto', borderRadius:'8px' }}
        >
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {Object.keys(positions).map((flightName,i)=> 
    <RotatedMarker 
      key={flightName} 
      position={positions[flightName]} 
      icon={ICON}
      rotationAngle={ flights.some((f)=>f.code==flightName)       ?
        angle(positions[flightName][0],positions[flightName][1],flights.find((f)=>f.code==flightName).destination[0],flights.find((f)=>f.code==flightName).destination[1])
      : 0}
      rotationOrigin="center"
    >      <Popup>
    {flightName}
  </Popup>
  </RotatedMarker>
  
  ) }
  
  {flights.map((flight,i)=> <React.Fragment key={flight.code}>
  <Polyline pathOptions={getColor(i)} positions={[flight.origin,flight.destination]} dashArray='10 20' />
  <Circle center={flight.origin} radius={10000} pathOptions={getColor(i)} />
  <Circle center={flight.destination} radius={10000} pathOptions={getColor(i)}  />

  </React.Fragment>
  
  )}
  

</MapContainer>
    )
}