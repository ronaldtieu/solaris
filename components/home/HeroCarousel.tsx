'use client';

import { useEffect, useRef, useState } from 'react';
import { useCarousel } from '@/hooks/useCarousel';

const slides = [
  {
    image: '/assets/images/hero1.jpg',
    title: 'SOLARIS',
    slogan: 'Strong Light, Controlled Fights',
    cta: 'Shop Now',
    link: '#shop',
  },
  {
    image: '/assets/images/hero2.jpg',
    title: 'New Collection',
    slogan: 'Elevate Your Game',
    cta: 'Explore',
    link: '#shop',
  },
  {
    image: '/assets/images/hero3.jpg',
    title: 'Performance Gear',
    slogan: 'Built for Champions',
    cta: 'Discover',
    link: '#shop',
  },
];

export default function HeroCarousel() {
  const { currentSlide, nextSlide, prevSlide, goToSlide, pause, resume } = useCarousel(3, 5000);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.changedTouches[0].screenX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].screenX);
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <section className="hero-carousel">
      <div
        className="carousel-container"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slides.map((slide, index) => (
            <div key={index} className="carousel-slide">
              <div className="slide-content">
                <img src={slide.image} alt={`Hero ${index + 1}`} />
                <div className="hero-overlay">
                  <div className="hero-text">
                    <h1>{slide.title}</h1>
                    <p className="hero-slogan">{slide.slogan}</p>
                    <a href={slide.link} className="btn-primary">
                      {slide.cta}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn prev" onClick={prevSlide} aria-label="Previous slide">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="carousel-btn next" onClick={nextSlide} aria-label="Next slide">
          <i className="fas fa-chevron-right"></i>
        </button>

        <div className="carousel-dots" id="carouselDots">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
