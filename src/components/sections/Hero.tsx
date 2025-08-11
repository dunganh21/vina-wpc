'use client';

import Image from 'next/image';
import { PageIndicator } from '../ui/PageIndicator';
import { useState } from 'react';
import PageNavigator from '../ui/PageNavigator';

export function Hero() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <div className='hero h-screen absolute top-0 left-0 overflow-hidden'>
        <div className='hero-overlay absolute inset-0'>
          <Image
            src='/images/hero-background.jpg'
            alt='VINA WPC Hero Background'
            fill
            className='object-cover'
            priority
          />
          <div
            className='absolute inset-0 opacity-70 mix-blend-multiply'
            style={{
              background: 'linear-gradient(180deg, #000 0%, #D9D9D9 98.05%)',
            }}
          />
        </div>

        <div className='hero-content text-center text-white relative z-10'>
          <div className='max-w-4xl'>
            <h1 className='hero-title mb-4 text-white font-semibold'>
              VINA WPC
            </h1>
            <p className='text-2xl md:text-3xl font-normal leading-[1.25em] tracking-[0.01em] text-white'>
              Bền vững từ tâm - nâng tầm cuộc sống
            </p>
          </div>
        </div>
        <div className='container absolute bottom-15 flex justify-between'>
          <div className=''>
            <PageIndicator
              currentPage={currentPage}
              totalPages={4}
              onPageChange={setCurrentPage}
            />
          </div>
          <div className=''>
            <PageNavigator
              onPrevious={() => setCurrentPage(currentPage - 1)}
              onNext={() => setCurrentPage(currentPage + 1)}
              disablePrevious={currentPage === 1}
              disableNext={currentPage === 4}
            />
          </div>
        </div>
      </div>
      <div className='h-screen' />
    </>
  );
}
