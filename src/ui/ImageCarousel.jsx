/* eslint-disable react/prop-types */
import { useState } from "react";

function ImageCarousel({ images }) {
  const defaultImage = "/DefaultImage.jpg";
  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePrevClick() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function handleNextClick() {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  return (
    <div className="relative w-full h-64 overflow-hidden z-10">
      <img
        src={images.length > 0 ? images[currentIndex].url : defaultImage}
        alt="Campground"
        className="w-full h-full object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
            className={`absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            &#8249;
          </button>
          <button
            onClick={handleNextClick}
            disabled={currentIndex === images.length - 1}
            className={`absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full ${
              currentIndex === images.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            &#8250;
          </button>
        </>
      )}
    </div>
  );
}

export default ImageCarousel;
