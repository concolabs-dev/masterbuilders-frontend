// "use client"
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
// import type { LatLngExpression, LatLngTuple } from "leaflet"
// import "leaflet/dist/leaflet.css"
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
// import "leaflet-defaulticon-compatibility"

// interface MapProps {
//   posix: LatLngExpression | LatLngTuple
//   zoom?: number
// }
// const defaults = { zoom: 15 }

// export default function Map({ posix, zoom = defaults.zoom }: MapProps) {
//   return (
//     <MapContainer
//       center={posix}
//       zoom={zoom}
//       scrollWheelZoom={false}
//       style={{ height: "100%", width: "100%" }}
//     >
//       <TileLayer
//         attribution='&copy; OpenStreetMap contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={posix}>
//         <Popup>Custom popup text</Popup>
//       </Marker>
//     </MapContainer>
//   )
// }