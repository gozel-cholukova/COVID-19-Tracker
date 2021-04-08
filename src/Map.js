import React from 'react';
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import './Map.css';
import { showDataOnMap } from "./utl";

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Loop through countries and continents and draw circles on the screen */}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>      
    </div>
  );
}

export default Map;



//   function ChangeView({ center, zoom }) {
//     const map = useMap();
//     map.setView(center, zoom);
//     return null;
//   }

//   return (
//     <MapContainer
//       casesType={casesType}
//       className="map"
//       center={center}
//       zoom={zoom}
//       scrollWheelZoom={false}
//     >
//       <ChangeView center={center} zoom={zoom} />
//       <TileLayer
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       
//     </MapContainer>
//   );
// }

// export default Map;