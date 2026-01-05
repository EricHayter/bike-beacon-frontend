import { useState, useEffect } from "react";
import PhotoCarrossel from "./PhotoCarrossel";
import ToolsList from "./ToolsList";
import BikeStation from "../../types/station"

function LocationCard({station, onClose }: { station: BikeStation, onClose: () => void} ) {
  const [photos, setPhotos] = useState<string[] | null>(null);
  const [photosLoading, setPhotosLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setPhotosLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_PREFIX}/stations/${station.Id}/photos`);

        if (!response.ok) {
          throw new Error(`Failed to fetch photos: ${response.statusText}`);
        }

        const data = await response.json();
        setPhotos(data); // Assuming backend returns an array of photo URLs
      } catch (error) {
        console.error('Error fetching photos:', error);
        setPhotos([]); // Set empty array on error
      } finally {
        setPhotosLoading(false);
      }
    };

    fetchPhotos();
  }, [station.Id])

  return (
    <div className="card bg-base-100 h-min-128 relative w-96 overflow-visible shadow-sm">
      <figure>
        <PhotoCarrossel photos={photos} />
      </figure>

      {onClose && (
        <button
          onClick={onClose}
          className="btn btn-sm btn-square btn-ghost bg-base-100/70 absolute top-2 right-2 z-10"
          aria-label="Close"
        >
          ✕
        </button>
      )}
          <div className="card-body min-h-64">
            <h2 className="card-title">{station.AddressStr}</h2>
            <div>
              {/* Tools */}
              <ToolsList stationId={station.Id} />
            </div>
          </div>
    </div>
  );
}

// TOOD maybe get rid of this I don't have any use for it at the moment
function LocationCardSkeleton() {
  return (
    <>
      <figure className="bg-base-200 flex h-64 w-full items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </figure>
      <div className="card-body min-h-64">
        <div className="bg-base-200 h-8 w-3/4 animate-pulse rounded"></div>
        <div className="space-y-2">
          <div className="bg-base-200 h-4 animate-pulse rounded"></div>
          <div className="bg-base-200 h-4 w-5/6 animate-pulse rounded"></div>
        </div>
        <div className="card-actions mt-4 justify-end">
          <div className="bg-base-200 h-12 w-24 animate-pulse rounded"></div>
        </div>
      </div>
    </>
  );
}

export default LocationCard;
