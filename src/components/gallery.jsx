import { useState } from "react";

export default function Carousel({ images }) {
  // index of the currently visible slide
  const [index, setIndex] = useState(0);

  const prevSlide = () => {
    setIndex(i => (i === 0 ? images.length - 1 : i - 1));
  };

  const nextSlide = () => {
    setIndex(i => (i === images.length - 1 ? 0 : i + 1));
  };

  // jump directly to a specific slide
  const goToSlide = (n) => {
    setIndex(n);
  };

  return (
    <div className="carousel">
      <button className="carousel-btn left" onClick={prevSlide}>❮</button>

      <div className="carousel-window">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <div className="carousel-slide" key={i}>
              <img src={img.src} alt={img.label} />
              <div className="carousel-caption">{img.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn right" onClick={nextSlide}>❯</button>

      <div className="carousel-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`carousel-dot ${i === index ? "active" : ""}`}
            onClick={() => goToSlide(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
