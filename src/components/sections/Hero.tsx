'use client';

import Image from 'next/image';
import { PageIndicator } from '../ui/PageIndicator';
import { useState } from 'react';
import PageNavigator from '../ui/PageNavigator';

export function Hero() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <div className="absolute top-0 left-0 hero h-screen overflow-hidden">
        <div className="absolute inset-0 hero-overlay">
          <Image
            src="/images/hero-background.jpg"
            alt="VINA WPC Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0 opacity-70 mix-blend-multiply"
            style={{
              background: 'linear-gradient(180deg, #000 0%, #D9D9D9 98.05%)',
            }}
          />
        </div>

        <div className="relative hero-content z-10 text-center text-white">
          <div className="max-w-4xl">
            <h1 className="hero-title mb-4 font-semibold text-white">
              VINA WPC
            </h1>
            <p className="text-2xl leading-[1.25em] font-normal tracking-[0.01em] text-white md:text-3xl">
              Bền vững từ tâm - nâng tầm cuộc sống
            </p>
          </div>
        </div>
        <div className="page-container absolute bottom-15 flex items-end justify-between">
          <div className="">
            <PageIndicator
              currentPage={currentPage}
              totalPages={4}
              onPageChange={setCurrentPage}
            />
          </div>
          <div className="">
            <PageNavigator
              onPrevious={() => setCurrentPage(currentPage - 1)}
              onNext={() => setCurrentPage(currentPage + 1)}
              disablePrevious={currentPage === 1}
              disableNext={currentPage === 4}
            />
          </div>
        </div>
      </div>
      <div className="h-screen" />
    </>
  );
}
