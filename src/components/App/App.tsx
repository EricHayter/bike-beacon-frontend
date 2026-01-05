import Map from "../Map/Map";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import LocationCard from "../LocationCard/LocationCard";
import { useState } from "react";
import BikeStation from "../../types/station"

function App() {
  const [selectedStation, setSelectedStation] = useState<BikeStation | null>(null);

  return (
    <>
      <Navbar />
      <Map setSelectedBike={setSelectedStation} />
      {selectedStation && (
        <div className="absolute top-20 right-4 z-20">
          <LocationCard
             station={selectedStation}
             onClose={() => setSelectedStation(null)}
          />
        </div>
      )}
    </>
  );
}

export default App;
