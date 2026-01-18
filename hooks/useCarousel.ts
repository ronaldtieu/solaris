'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useCarousel(totalSlides: number, autoPlayDelay = 5000) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto play
  useEffect(() => {
    if (isPaused || totalSlides === 0) return;

    intervalRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, autoPlayDelay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalSlides, isPaused, autoPlayDelay]);

  // Go to specific slide
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Previous slide
  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Reset auto play (called on manual navigation)
  const resetAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsPaused(false);
  }, []);

  // Pause auto play
  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Resume auto play
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    pause,
    resume,
    resetAutoPlay,
  };
}
