import Map from './Map'
import './App.css'
import Navbar from './Navbar'
import LocationCard from './LocationCard'
import { useState } from 'react'

function App() {
  const [selectedBike, setSelectedBike] = useState<boolean>(false);

  return (
    <>
      <Navbar />
      <Map setSelectedBike={setSelectedBike} />
      {selectedBike && (
        <div className="absolute right-4 top-20 z-20">
          <LocationCard onClose={() => setSelectedBike(false)} />
        </div>
      )}
    </>
  )
}

export default App
