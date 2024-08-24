/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


function CampgroundMap({ coordinates, title, description }) {
  const position = [coordinates[1], coordinates[0]]; // Latitude, Longitude

  return (
    <MapContainer center={position} zoom={13} className="h-96 w-full z-10">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <strong>{title}</strong>
          <br />
          {description}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default CampgroundMap;
