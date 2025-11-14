import { useState, useEffect } from 'react'

interface PhotoCarrosselProps {
  photos: string[] | null;
}

function PhotoCarrossel({ photos }: PhotoCarrosselProps) {
    // TODO handle the image loading a bit more gracefully (i.e. 100+ photos potentially)
    // check this to see if it's the right effect.
    if (!photos || photos.length === 0) {
      return (
        <figure className="w-full h-64 bg-base-200 flex items-center justify-center">
          <div className="text-center text-base-content/50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm">No photos available</p>
          </div>
        </figure>
      );
    }

    return (
      <div className="carousel w-full h-64">
          {photos.map((photo_url, idx) => (
                <div key={idx} id={"slide" + idx} className="carousel-item relative w-full h-64">
                  <img
                    src={photo_url}
                    className="w-full h-64 object-cover"
                    loading="lazy" />
                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href={"#slide" + ((idx + photos.length - 1) % photos.length)} className="btn btn-circle">❮</a>
                    <a href={"#slide" + ((idx + 1) % photos.length)} className="btn btn-circle">❯</a>
                  </div>
                </div>
              )
            )
          }
      </div>
    );
}

interface LocationData {
  name: string;
  address: string;
  recentNegativeReports: number;
  availableTools: string[];
}

function LocationCard() {
    const [locationData, setLocationData] = useState<LocationData | null>(null);
    const [photos, setPhotos] = useState<string[] | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLocationData({
                name: "Parliament Hill Bike Station",
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
      <div className="card bg-base-100 w-96 shadow-sm">
        {!locationData ? (
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
        ) : (
          <>
            <PhotoCarrossel photos={photos} />
            <div className="card-body min-h-64">
              <h2 className="card-title">{locationData.name}</h2>

              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-base-content/70">Address</p>
                  <p className="text-sm">{locationData.address}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-base-content/70">Status</p>
                  {locationData.recentNegativeReports > 5 ? (
                    <div className="badge badge-warning gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-4 w-4 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                      High negative reports ({locationData.recentNegativeReports})
                    </div>
                  ) : (
                    <div className="badge badge-success gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-4 w-4 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Good condition
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold text-base-content/70 mb-2">Available Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {locationData.availableTools.map((tool, idx) => (
                      <div key={idx} className="badge badge-outline">{tool}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary btn-sm">Leave Review</button>
              </div>
            </div>
          </>
        )}
      </div>
    );
}

export default LocationCard;


