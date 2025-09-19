import Image from 'next/image';

export function Hero() {
  return (
    <>
      <div className="absolute top-0 left-0 flex h-screen w-full flex-col overflow-hidden">
        <div className="absolute inset-0 hero-overlay">
          <Image
            src="/images/hero-background.jpg"
            alt="VINA WPC Hero Background"
            fill
            className="animate-hero-bg object-cover"
            priority
            fetchPriority="high"
            sizes="100vw"
          />
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
          {/* <div className="animate-hero-nav flex items-center justify-between gap-4">
            <PageIndicator
              currentPage={currentPage}
              totalPages={4}
              onPageChange={setCurrentPage}
            />

            <PageNavigator
              onPrevious={() => setCurrentPage(currentPage - 1)}
              onNext={() => setCurrentPage(currentPage + 1)}
              disablePrevious={currentPage === 1}
              disableNext={currentPage === 4}
            />
          </div> */}
        </div>
      </div>
      <div className="h-screen" />
      <div id="hero-sentinel" className="absolute bottom-0 left-0 h-1 w-full" />
    </>
  );
}
