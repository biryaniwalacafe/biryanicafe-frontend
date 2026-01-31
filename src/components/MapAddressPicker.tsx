// import { useEffect } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   useMapEvents,
//   useMap,
// } from "react-leaflet";
// import { LatLngExpression } from "leaflet";
// import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
// import "leaflet/dist/leaflet.css";
// import "leaflet-geosearch/dist/geosearch.css"; // Don't forget the CSS!

// type LocationResult = {
//   lat: number;
//   lon: number;
//   address?: string;
// };

// type Props = {
//   initialLocation: { lat: number; lon: number };
//   onSelectLocation: (data: LocationResult) => void;
// };

// export default function MapAddressPicker({
//   initialLocation,
//   onSelectLocation,
// }: Props) {
//   const center: LatLngExpression = [initialLocation.lat, initialLocation.lon];

//   // --- Sub-component to handle searching ---
//   function SearchField() {
//     const map = useMap();

//     useEffect(() => {
//       const provider = new OpenStreetMapProvider();
//       const searchControl = new (GeoSearchControl as any)({
//         provider: provider,
//         style: "bar", // or 'button'
//         showMarker: false, // We use our own Marker component
//         showPopup: false,
//         autoClose: true,
//         retainZoomLevel: false,
//         animateZoom: true,
//         keepResult: true,
//       });

//       map.addControl(searchControl);

//       // Listen for the location selection event
//       map.on("geosearch/showlocation", (result: any) => {
//         onSelectLocation({
//           lat: result.location.y,
//           lon: result.location.x,
//           address: result.location.label,
//         });
//       });

//       return () => {
//         map.removeControl(searchControl);
//       };
//     }, [map]);

//     return null;
//   }

//   // --- Sub-component to handle map clicks ---
//   // Inside MapAddressPicker.tsx

//   function LocationMarker() {
//     useMapEvents({
//       async click(e) {
//         const { lat, lng } = e.latlng;

//         try {
//           // Reverse Geocoding Fetch
//           const response = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
//             {
//               headers: {
//                 "User-Agent": "YourAppName/1.0", // Replace with your app name
//               },
//             },
//           );
//           const data = await response.json();

//           // This is the formatted address from OSM
//           const address = data.display_name || "";

//           onSelectLocation({
//             lat,
//             lon: lng,
//             address: address, // Passing the fetched address back
//           });
//         } catch (error) {
//           console.error("Geocoding failed", error);
//           // Fallback to just coordinates if fetch fails
//           onSelectLocation({ lat, lon: lng });
//         }
//       },
//     });

//     return <Marker position={center} />;
//   }

//   return (
//     <div className="h-[400px] w-full rounded-lg overflow-hidden border">
//       <MapContainer center={center} zoom={13} className="h-full w-full">
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         <SearchField />
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
import { LatLngExpression, Icon } from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

// Fix for missing marker icons
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Re-configure the Default Icon
const DefaultIcon = new Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

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

  // Helper to move the map when initialLocation changes (from search or parent)
  function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
    const map = useMap();
    useEffect(() => {
      map.setView([lat, lon], map.getZoom());
    }, [lat, lon, map]);
    return null;
  }

  function SearchField() {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new (GeoSearchControl as any)({
        provider,
        style: "bar",
        showMarker: false,
        autoClose: true,
        keepResult: true,
      });

      map.addControl(searchControl);
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

  function LocationMarker() {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
            { headers: { "User-Agent": "FoodApp/1.0" } },
          );
          const data = await response.json();
          onSelectLocation({
            lat,
            lon: lng,
            address: data.display_name || "",
          });
        } catch (error) {
          onSelectLocation({ lat, lon: lng });
        }
      },
    });

    return <Marker position={center} icon={DefaultIcon} />;
  }

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden border">
      <MapContainer center={center} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RecenterMap lat={initialLocation.lat} lon={initialLocation.lon} />
        <SearchField />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
