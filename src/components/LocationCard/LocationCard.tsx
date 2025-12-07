import { useState, useEffect } from "react";
import PhotoCarrossel from "./PhotoCarrossel";
import CheckIcon from "../icons/CheckIcon";
import ReportIcon from "../icons/ReportIcon";

interface LocationData {
  address: string;
  recentNegativeReports: number;
  availableTools: string[];
}

interface LocationCardProps {
  onClose?: () => void;
}

function LocationCard({ onClose }: LocationCardProps) {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [photos, setPhotos] = useState<string[] | null>(null);

  // TODO move this stuff outside of the prop we should be testing this from the parent component
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocationData({
        address: "Wellington St, Ottawa, ON K1A 0A9",
        recentNegativeReports: 8,
        availableTools: [
          "Tire Pump",
          "Multi-tool",
          "Chain Lubricant",
          "Patch Kit",
        ],
      });
      setPhotos([
        "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgardensottawa.ca%2Fwp-content%2Fuploads%2F2020%2F12%2Fottawa-city-hall-marion-dewar-plaza-front-lawn.jpg&f=1&nofb=1&ipt=c4d347cdcc8a614d540887d6e88f5de7c8239d33fb24981460ffbb159562ebd9",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tripsavvy.com%2Fthmb%2FvfDxFUTB0TUTqo-eZ-4ar9uCi0s%3D%2F2168x1382%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Fparliament-hill-in-fall--ottawa--ontario--canada-1064713266-b595c67f48ca4778a985b13bb598ba04.jpg&f=1&nofb=1&ipt=cda5769eb73f79dddfb5458649c4dbdcc46b3ec01227cb0f4245d9966e68eea6",
      ]);
    }, 2000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

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
      {locationData ? (
        <>
          <div className="card-body min-h-64">
            <h2 className="card-title">{locationData.address}</h2>
            <div>
              {/* Tools */}
              <div>
                <ul className="list bg-base-100">
                  <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
                    Available Tools
                  </li>

                  {locationData.availableTools.map((tool, idx) => (
                    <li key={idx} className="list-row py-2">
                      {/* replace with icons */}
                      <div>{/* Bike pump icon */}</div>

                      <div className="flex flex-1 items-center">{tool}</div>
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-xs btn-soft"
                        >
                          Report
                        </div>
                        <div
                          tabIndex={0}
                          className="dropdown-content card card-sm bg-base-100 z-50 w-64 shadow-lg"
                        >
                          <div className="card-body">
                            <button className="btn btn-soft btn-success btn-sm">
                              <CheckIcon />
                              working
                            </button>
                            <button className="btn btn-soft btn-error btn-sm">
                              <ReportIcon />
                              report
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LocationCardSkeleton />
      )}
    </div>
  );
}

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
