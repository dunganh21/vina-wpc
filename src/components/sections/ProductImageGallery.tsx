import Image from 'next/image';

interface ProductImageGalleryProps {
  images: {
    main: {
      src: string;
      alt: string;
    };
    secondary: Array<{
      src: string;
      alt: string;
    }>;
  };
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  return (
    <section className={`bg-white py-6 lg:py-16`}>
      <div className="page-container">
        <div className="flex flex-col gap-6">
          {/* Main Large Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-[21/9]">
            <Image
              src={images.main.src}
              alt={images.main.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              priority
            />
          </div>

          {/* Secondary Images Row */}
          <div className="flex flex-col gap-6 md:flex-row">
            {images.secondary.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] w-full overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
