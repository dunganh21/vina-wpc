'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { PageIndicator } from '@/components/ui/PageIndicator';
import PageNavigator from '@/components/ui/PageNavigator';

const HERO_IMAGES = [
  '/images/hero/hero.webp',
  '/images/hero/hero-1.webp',
  '/images/hero/hero-2.webp',
  '/images/hero/hero-3.webp',
  '/images/hero/hero-4.webp',
  '/images/hero/hero-5.webp',
  '/images/hero/hero-6.webp',
  '/images/hero/hero-7.webp',
  '/images/hero/hero-8.webp',
  '/images/hero/hero-9.webp',
  '/images/hero/hero-10.webp',
];

const AUTO_SWAP_INTERVAL = 5000; // 5 seconds

export function Hero() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const totalPages = HERO_IMAGES.length;

  // Handle page navigation with wrapping
  const goToPage = useCallback(
    (pageIndex: number) => {
      setCurrentPage((pageIndex + totalPages) % totalPages);
      setIsAutoPlaying(false); // Pause auto-play when user manually navigates
    },
    [totalPages]
  );

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  // Intersection Observer to detect when hero is visible
  useEffect(() => {
    const sentinel = document.getElementById('hero-sentinel');
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Hero is visible if the sentinel is in viewport or above it
        setIsVisible(entry.isIntersecting || entry.boundingClientRect.top > 0);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
      }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Auto-swap images only when visible and auto-playing
  useEffect(() => {
    if (!isAutoPlaying) {
      // Resume auto-play after 10 seconds of inactivity
      const resumeTimer = setTimeout(() => setIsAutoPlaying(true), 10000);
      return () => clearTimeout(resumeTimer);
    }

    // Only swap images if the hero is visible on screen
    if (!isVisible) return;

    const interval = setInterval(goToNextPage, AUTO_SWAP_INTERVAL);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isVisible, goToNextPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPreviousPage();
        setIsAutoPlaying(false);
      } else if (e.key === 'ArrowRight') {
        goToNextPage();
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPreviousPage]);

  // Only render current and adjacent images for better performance
  const getVisibleImages = () => {
    const prev = (currentPage - 1 + totalPages) % totalPages;
    const next = (currentPage + 1) % totalPages;
    return [prev, currentPage, next];
  };

  return (
    <>
      <div className="absolute top-0 left-0 flex h-screen w-full flex-col overflow-hidden">
        <div className="absolute inset-0 hero-overlay">
          {/* Render only current and adjacent images for optimal performance */}
          {HERO_IMAGES.map((src, index) => {
            const visibleImages = getVisibleImages();
            const shouldRender = visibleImages.includes(index);

            if (!shouldRender) return null;

            return (
              <Image
                key={src}
                src={src}
                alt={`VINA WPC Hero ${index + 1}`}
                fill
                className={`object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentPage
                    ? 'opacity-100'
                    : 'pointer-events-none opacity-0'
                }`}
                priority={index === 0 && currentPage === 0} // Only prioritize first image on initial load
                fetchPriority={index === currentPage ? 'high' : 'low'}
                loading={index === 0 ? 'eager' : 'lazy'}
                sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, (max-width: 1920px) 1920px, 3840px"
                quality={80}
              />
            );
          })}
          <div
            className="absolute inset-0 opacity-70 mix-blend-multiply"
            style={{
              background: 'linear-gradient(180deg, #000 0%, #D9D9D9 98.05%)',
            }}
          />
        </div>

        <div className="page-container relative z-10 flex h-full flex-shrink-0 flex-col justify-between pt-24 pb-10 text-white lg:pt-50 lg:pb-13">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="hero-title animate-hero-title font-semibold text-white lg:mb-2">
              VINA WPC
            </h1>
            <p
              className="animate-hero-subtitle"
              style={{ fontSize: 'clamp(1rem, 0.6479rem + 1.5023vw, 2rem)' }}
            >
              Bền vững từ tâm - nâng tầm cuộc sống
            </p>
          </div>

          <div className="animate-hero-nav flex items-center justify-between gap-4">
            <PageIndicator
              currentPage={currentPage + 1}
              totalPages={totalPages}
              onPageChange={goToPage}
              variant="light"
            />

            <PageNavigator
              onPrevious={() => {
                goToPreviousPage();
                setIsAutoPlaying(false);
              }}
              onNext={() => {
                goToNextPage();
                setIsAutoPlaying(false);
              }}
              disablePrevious={false}
              disableNext={false}
              variant="white"
            />
          </div>
        </div>
      </div>
      <div className="h-screen" />
      <div id="hero-sentinel" className="absolute bottom-0 left-0 h-1 w-full" />
    </>
  );
}
