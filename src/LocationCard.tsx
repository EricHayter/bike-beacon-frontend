import { useState, useEffect } from 'react'

interface PhotoCarrosselProps {
  photos: string[] | null;
}

function PhotoCarrossel({ photos }: PhotoCarrosselProps) {
    // TODO handle the case where there is no photos
    // TODO handle the image loading a bit more gracefully (i.e. 100+ photos potentially)
    return (
      <div className="carousel w-full">
        {photos && photos.map((photo_url, idx) => (
              <div key={idx} id={"slide" + idx} className="carousel-item relative w-full">
                <img
                  src={photo_url}
                  className="w-full"
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
  // Add properties as you build out the data structure
}

function LocationCard() {
    const [locationData, setLocationData] = useState<LocationData | null>(null);
    const [photos, setPhotos] = useState<string[] | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLocationData({});
            setPhotos([
                "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgardensottawa.ca%2Fwp-content%2Fuploads%2F2020%2F12%2Fottawa-city-hall-marion-dewar-plaza-front-lawn.jpg&f=1&nofb=1&ipt=c4d347cdcc8a614d540887d6e88f5de7c8239d33fb24981460ffbb159562ebd9",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tripsavvy.com%2Fthmb%2FvfDxFUTB0TUTqo-eZ-4ar9uCi0s%3D%2F2168x1382%2Ffilters%3Ano_upscale()%3Amax_bytes(150000)%3Astrip_icc()%2Fparliament-hill-in-fall--ottawa--ontario--canada-1064713266-b595c67f48ca4778a985b13bb598ba04.jpg&f=1&nofb=1&ipt=cda5769eb73f79dddfb5458649c4dbdcc46b3ec01227cb0f4245d9966e68eea6"
            ]);
        }, 2000);

        return () => clearTimeout(timer); // cleanup on unmount
    }, []);

    return (
      <div className="card bg-base-100 w-96 shadow-sm">
        {!locationData &&
          <span className="loading loading-spinner loading-md"></span>
        }

        {locationData &&
        <>
        <PhotoCarrossel photos={photos} />
        <div className="card-body">
          <h2 className="card-title">Card Title</h2>
          <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
        </>
        }
      </div>
    );
}

export default LocationCard;


