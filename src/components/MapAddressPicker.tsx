// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import { LatLngExpression } from "leaflet";
// import "leaflet/dist/leaflet.css";

// type LocationResult = {
//   lat: number;
//   lon: number;
//   address?: string;
//   distance?: number;
// };

// type Props = {
//   initialLocation: {
//     lat: number;
//     lon: number;
//   };
//   onSelectLocation: (data: LocationResult) => void;
// };

// export default function MapAddressPicker({
//   initialLocation,
//   onSelectLocation,
// }: Props) {
//   const center: LatLngExpression = [initialLocation.lat, initialLocation.lon];

//   function LocationMarker() {
//     useMapEvents({
//       click(e) {
//         const lat = e.latlng.lat;
//         const lon = e.latlng.lng;

//         onSelectLocation({
//           lat,
//           lon,
//           address: "",
//           distance: undefined,
//         });
//       },
//     });

//     return <Marker position={center} />;
//   }

//   return (
//     <div className="h-[300px] w-full rounded-lg overflow-hidden">
//       <MapContainer center={center} zoom={13} className="h-full w-full">
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <LocationMarker />
//       </MapContainer>
//     </div>
//   );
// }
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css"; // Don't forget the CSS!

type LocationResult = {
  lat: number;
  lon: number;
  address?: string;
};

type Props = {
  initialLocation: { lat: number; lon: number };
  onSelectLocation: (data: LocationResult) => void;
};

export default function MapAddressPicker({
  initialLocation,
  onSelectLocation,
}: Props) {
  const center: LatLngExpression = [initialLocation.lat, initialLocation.lon];

  // --- Sub-component to handle searching ---
  function SearchField() {
    const map = useMap();

    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new (GeoSearchControl as any)({
        provider: provider,
        style: "bar", // or 'button'
        showMarker: false, // We use our own Marker component
        showPopup: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
      });

      map.addControl(searchControl);

      // Listen for the location selection event
      map.on("geosearch/showlocation", (result: any) => {
        onSelectLocation({
          lat: result.location.y,
          lon: result.location.x,
          address: result.location.label,
        });
      });

      return () => {
        map.removeControl(searchControl);
      };
    }, [map]);

    return null;
  }

  // --- Sub-component to handle map clicks ---
  function LocationMarker() {
    useMapEvents({
      click(e) {
        onSelectLocation({
          lat: e.latlng.lat,
          lon: e.latlng.lng,
          address: "",
        });
      },
    });

    return <Marker position={center} />;
  }

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border">
      <MapContainer center={center} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <SearchField />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
