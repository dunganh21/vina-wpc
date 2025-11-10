import Image from 'next/image';

export function ProductsHero() {
  return (
    <div className="relative aspect-[1.8] w-full overflow-hidden lg:aspect-[4/1]">
      {/* Background Image */}
      <Image
        src="/images/products-hero.webp"
        alt="Không gian sống với sản phẩm VINA WPC"
        fill
        className="object-cover object-center sm:object-[center_30%]"
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px"
      />

      {/* Content with normal padding layout */}
      <div className="relative flex h-full items-end">
        <div className="w-full px-6 pb-12 lg:px-[108px] lg:pb-16">
          <div className="max-w-2/3 space-y-2 text-white lg:space-y-5">
            {/* Breadcrumb Navigation */}
            <nav
              className="subtitle-2 text-white"
              aria-label="Breadcrumb"
              style={{
                fontSize: 'clamp(0.75rem, 0.662rem + 0.3756vw, 1rem)',
              }}
            >
              <span className="pr-1.5">Trang chủ</span>
              <span aria-hidden="true">/</span>
              <span className="pl-1.5 opacity-50" aria-current="page">
                sản phẩm
              </span>
            </nav>

            {/* Main Heading */}
            <h1
              className="text-white"
              style={{
                fontSize: 'clamp(1.5rem, 0.7958rem + 3.0047vw, 3.5rem)',
              }}
            >
              Vật liệu tạo nên không gian sống
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
