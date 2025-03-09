import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet"; // Import Leaflet for custom icons
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS for proper rendering
import Icon from "../assets/car1.jpg"; // Import your custom marker image
import { useState,useEffect } from "react";

// 📍 Handle map clicks and update location state
const MapClickHandler = ({ setLocation, setLoading }) => {
  useMapEvents({
    click: async (e) => {
      setLoading(true);
      const { lat, lng } = e.latlng;
      const data = await reverseGeocode(lat, lng);
     
      setLocation({
        lat,
        lng,
        data,
      });
      setLoading(false);
    },
  });
  return null;
};



// 🌍 Reverse Geocoding (Convert Lat/Lng → Address)
const reverseGeocode = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    return await response.json();
  } catch (error) {
    console.error("Reverse Geocoding Error:", error);
    return { address: { display_name: "Location not found" } };
  }
};


const MapComponent = ( { setData }  ) => {
  const initialPosition = [21.9009, 95.9691]; // Default Map Center
  const [location, setLocation] = useState({
    lat: 16.8409,
    lng: 96.1735,
    data: { display_name: "Click on the map to select a location" },
    image: "",
  });

    

  useEffect(() => {
    if (typeof setData === "function") {
      setData(location.data);
    }
  }, [location.data, setData]);
  

  const [loading, setLoading] = useState(false);
 
  // 🏷️ Custom Marker Icon
  const customIcon = L.icon({
    iconUrl: Icon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <>
      {/* 📍 Location Display */}
      <div className=" text-black w-full mt-6 p-2 text-center">
        {loading ? (

       <div className="relative flex justify-center items-center">
    <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
    <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  className="rounded-full h-28 w-28"/>
      </div>
        ) : (

             <p className="text-red-700" >
             
              Your location: {location.data.display_name} 
             
              </p>
        )}
      </div>

      {/* 🗺️ Map */}
      <div style={{ height: "800px", width: "90%" }} className="mx-auto mt-5">
        <MapContainer center={initialPosition} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 🚗 Default Car Marker */}
          <Marker position={initialPosition} icon={customIcon}>
            <Popup>
              <img src={Icon} alt="Car" width="40" height="40" />
              <h3>Our Location</h3>
            </Popup>
          </Marker>

          {/* 📍 Click Handler */}
          <MapClickHandler setLocation={setLocation} setLoading={setLoading} />

          {/* 📍 Display User's Selected Location */}
          {location.data.display_name !== "Click on the map to select a location" && (
            <Marker position={[location.lat, location.lng]}>
              <Popup>
                <h3>{location.data.display_name}</h3>
               
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </>
  );
};

export default MapComponent;
