// MapPicker.tsx
"use client"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
export default function MapPicker({ lat, lng, onMapClick }: {
  lat: number
  lng: number
  onMapClick: (lat: number, lng: number) => void
}) {
  function MapEventHandler() {
    useMapEvents({
      click(e) {
        onMapClick(e.latlng.lat, e.latlng.lng)
      },
    })
    return null
  }

  return (
    <MapContainer center={[51.505, -0.09]} zoom={7} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
      <MapEventHandler />
      <Marker position={[51.505, -0.09]} />
    </MapContainer>
  )
}