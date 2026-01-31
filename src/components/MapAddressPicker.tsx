import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type LocationResult = {
  lat: number;
  lon: number;
  address?: string;
  distance?: number;
};

type Props = {
  initialLocation: {
    lat: number;
    lon: number;
  };
  onSelectLocation: (data: LocationResult) => void;
};

export default function MapAddressPicker({
  initialLocation,
  onSelectLocation,
}: Props) {
  const center: LatLngExpression = [initialLocation.lat, initialLocation.lon];

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;

        onSelectLocation({
          lat,
          lon,
          address: "",
          distance: undefined,
        });
      },
    });

    return <Marker position={center} />;
  }

  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden">
      <MapContainer center={center} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
