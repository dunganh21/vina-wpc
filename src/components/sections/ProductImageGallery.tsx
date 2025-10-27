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
  // Combine main image and secondary images into one array
  const allImages = [images.main, ...images.secondary];

  return (
    <section className={`bg-white py-6 lg:py-16`}>
      <div className="page-container">
        {/* All Images Grid - 3 images per row */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] w-full overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index === 0} // Only prioritize first image
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
