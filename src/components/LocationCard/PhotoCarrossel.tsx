interface PhotoCarrosselProps {
  photos: string[] | null;
}

function PhotoCarrossel({ photos }: PhotoCarrosselProps) {
  // TODO handle the image loading a bit more gracefully (i.e. 100+ photos potentially)
  // check this to see if it's the right effect.
  if (!photos || photos.length === 0) {
    return (
      <figure className="bg-base-200 flex h-64 w-full items-center justify-center">
        <div className="text-base-content/50 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-2 h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm">No photos available</p>
        </div>
      </figure>
    );
  }

  return (
    <div className="carousel h-64 w-full">
      {photos.map((photo_url, idx) => (
        <div
          key={idx}
          id={"slide" + idx}
          className="carousel-item relative h-64 w-full"
        >
          <img
            src={photo_url}
            className="h-64 w-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-1/2 right-5 left-5 flex -translate-y-1/2 transform justify-between">
            <a
              href={"#slide" + ((idx + photos.length - 1) % photos.length)}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={"#slide" + ((idx + 1) % photos.length)}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PhotoCarrossel;
