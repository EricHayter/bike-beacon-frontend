import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import CreateStationCard from "./CreateStationCard";
//import Icon from './Icon'

interface MapProps {
  setSelectedBike: (selected: boolean) => void;
}

// Component that handles map clicks
function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (latlng: [number, number]) => void;
}) {
  useMapEvents({
    click: (e) => {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function Map({ setSelectedBike }: MapProps) {
  const position: [number, number] = [45.424721, -75.695];
  const [markers, setMarkers] = useState<[number, number][]>([position]);
  const [pendingPosition, setPendingPosition] = useState<
    [number, number] | null
  >(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleMapClick = (latlng: [number, number]) => {
    setPendingPosition(latlng);
    setShowCreateModal(true);
  };

  const handleCreateStation = () => {
    if (pendingPosition) {
      setMarkers((prev) => [...prev, pendingPosition]);
    }
    setShowCreateModal(false);
    setPendingPosition(null);
  };

  const handleCancelCreate = () => {
    setShowCreateModal(false);
    setPendingPosition(null);
  };

  return (
    <>
      <MapContainer
        center={position}
        zoom={16}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        <MapClickHandler onMapClick={handleMapClick} />

        {markers.map((markerPos, idx) => (
          <Marker
            key={idx}
            position={markerPos}
            eventHandlers={{
              click: () => setSelectedBike(true),
            }}
          ></Marker>
        ))}
      </MapContainer>

      {showCreateModal && (
        <CreateStationCard
          onCancel={handleCancelCreate}
          onCreate={handleCreateStation}
        />
      )}
    </>
  );
}

export default Map;
