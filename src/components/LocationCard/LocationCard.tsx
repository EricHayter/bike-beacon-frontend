import { useState, useEffect } from 'react'
import PhotoCarrossel from './PhotoCarrossel'
import CheckIcon from '../icons/CheckIcon'
import ReportIcon from '../icons/ReportIcon'

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
                availableTools: ["Tire Pump", "Multi-tool", "Chain Lubricant", "Patch Kit"]
            });
            setPhotos([
                "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgardensottawa.ca%2Fwp-content%2Fuploads%2F2020%2F12%2Fottawa-city-hall-marion-dewar-plaza-front-lawn.jpg&f=1&nofb=1&ipt=c4d347cdcc8a614d540887d6e88f5de7c8239d33fb24981460ffbb159562ebd9",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tripsavvy.com%2Fthmb%2FvfDxFUTB0TUTqo-eZ-4ar9uCi0s%3D%2F2168x1382%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Fparliament-hill-in-fall--ottawa--ontario--canada-1064713266-b595c67f48ca4778a985b13bb598ba04.jpg&f=1&nofb=1&ipt=cda5769eb73f79dddfb5458649c4dbdcc46b3ec01227cb0f4245d9966e68eea6"
            ]);
        }, 2000);

        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    return (
      <div className="card bg-base-100 h-min-128 w-96 shadow-sm relative overflow-visible">
        <figure>
          <PhotoCarrossel photos={photos} />
        </figure>

        {onClose && (
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle absolute right-2 top-2 z-10 bg-base-100/80 backdrop-blur-sm hover:bg-primary hover:text-primary-content transition-colors border-none"
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
                  <ul className="list bg-base-100 rounded-box shadow-md">
                    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Available Tools</li>

                    {locationData.availableTools.map((tool, idx) => (
                      <li key={idx} className="list-row py-2">
                        {/* replace with icons */}
                        <div>
                        {/* Bike pump icon */}
                        </div>


                        <div className="flex items-center">{tool}</div>
                        {/* check marks instead */}
                        <div className="dropdown dropdown-end">
                          <div tabIndex={0} role="button" className="btn btn-xs m-1">Report</div>
                          <div
                            tabIndex={0}
                            className="dropdown-content card card-sm bg-base-100 w-64 z-50 shadow-md">
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
        ) : <LocationCardSkeleton />}
      </div>
    );
}

function LocationCardSkeleton() {
    return (
          <>
            <figure className="w-full h-64 bg-base-200 flex items-center justify-center">
              <span className="loading loading-spinner loading-md"></span>
            </figure>
            <div className="card-body min-h-64">
              <div className="h-8 bg-base-200 rounded w-3/4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-base-200 rounded animate-pulse"></div>
                <div className="h-4 bg-base-200 rounded w-5/6 animate-pulse"></div>
              </div>
              <div className="card-actions justify-end mt-4">
                <div className="h-12 w-24 bg-base-200 rounded animate-pulse"></div>
              </div>
            </div>
          </>
    )
}

export default LocationCard;


