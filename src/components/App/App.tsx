import Map from "../Map/Map";
import "./App.css";
import Navbar from "../Navbar/Navbar";
import LocationCard from "../LocationCard/LocationCard";
import { useState } from "react";

function App() {
  const [selectedBike, setSelectedBike] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <Map setSelectedBike={setSelectedBike} />
      {selectedBike && (
        <div className="absolute top-20 right-4 z-20">
          <LocationCard onClose={() => setSelectedBike(false)} />
        </div>
      )}
    </>
  );
}

export default App;
