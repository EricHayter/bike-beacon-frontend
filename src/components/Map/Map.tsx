import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState, useEffect, useCallback, useRef } from "react";
import "leaflet/dist/leaflet.css";
import CreateStationCard from "./CreateStationCard";
import BikeStation from "../../types/station"

interface MapProps {
  setSelectedBike: (selected: boolean) => void;
}

// Component that handles map clicks and movement
function MapEventHandler({
  onMapClick,
  onBoundsChange,
}: {
  onMapClick: (latlng: [number, number]) => void;
  onBoundsChange: (bounds: L.LatLngBounds) => void;
}) {
  const map = useMapEvents({
    click: (e) => {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },

    moveend: () => {
      onBoundsChange(map.getBounds());
    },
  });

  // Load initial markers when map is ready
  useEffect(() => {
    onBoundsChange(map.getBounds());
  }, [map, onBoundsChange]);

  return null;
}

function Map({ setSelectedBike }: MapProps) {
  const position: [number, number] = [45.424721, -75.695];
  const [stations, setStations] = useState<BikeStation[]>([]);
  const [pendingPosition, setPendingPosition] = useState<
    [number, number] | null
  >(null);
  const [showCreateCard, setShowCreateCard] = useState(false);

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load markers from API based on map bounds with debouncing
  const loadMarkers = useCallback(async (bounds: L.LatLngBounds) => {
    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce the API call by 300ms
    debounceTimerRef.current = setTimeout(async () => {
      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();

      try {
        const center = bounds.getCenter();
        const response = await fetch(
          `/api/stations?` +
            new URLSearchParams({
              lat: center.lat.toString(),
              lng: center.lng.toString(),
            }),
          { signal: abortControllerRef.current.signal }
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data: BikeStation[] = await response.json();
        setStations(data);
      } catch (error) {
        // Ignore abort errors
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        console.error("Failed to load bike stations:", error);
        // Optionally: show error to user
      } finally {
      }
    }, 300);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleMapClick = (latlng: [number, number]) => {
    setPendingPosition(latlng);
    setShowCreateCard(true);
  };

  const handleCreateStation = () => {
    if (pendingPosition) {
      // TODO: Send POST request to create station
      // For now, add to local state
      const newStation: BikeStation = {
        Id: `temp-${Date.now()}`,
        AddressStr: "New Station",
        Location: {
          lat: pendingPosition[0],
          lng: pendingPosition[1],
        },
        CreatedAt: new Date().toISOString(),
      };
      setStations((prev) => [...prev, newStation]);
    }
    setShowCreateCard(false);
    setPendingPosition(null);
  };

  const handleCancelCreate = () => {
    setShowCreateCard(false);
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
        <MapEventHandler
          onMapClick={handleMapClick}
          onBoundsChange={loadMarkers}
        />

        {stations.map((station) => (
          <Marker
            key={station.Id}
            position={[station.Location.lat, station.Location.lng]}
            eventHandlers={{
              click: () => setSelectedBike(true),
            }}
          ></Marker>
        ))}

        {/* Temporary marker while creating new station */}
        {pendingPosition && (
          <Marker
            position={pendingPosition}
            opacity={0.6}
          ></Marker>
        )}
      </MapContainer>

      {showCreateCard && (
        <CreateStationCard
          onCancel={handleCancelCreate}
          onCreate={handleCreateStation}
        />
      )}
    </>
  );
}

export default Map;
