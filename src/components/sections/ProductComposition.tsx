import Image from 'next/image';
import { Button } from '../ui';

const compositionLayers = [
  {
    number: 1,
    title: 'Lớp bảo vệ bề mặt',
    description: 'Chống trầy xước, nấm mốc.',
    position: { top: '14%', left: '75%' }, // Position relative to container
  },
  {
    number: 2,
    title: 'Lớp film màu',
    description: 'Được phủ lớp vân gỗ, đá, bê tông hoặc màu sơn...',
    position: { top: '27%', left: '75%' },
  },
  {
    number: 3,
    title: 'Lớp gắn kết',
    description:
      'Tạo sự liên kết giữa bề mặt các tấm và giúp phân tán lực tác động lên bề mặt tấm.',
    position: { top: '41%', left: '75%' },
  },
  {
    number: 4,
    title: 'Lớp cốt',
    description:
      'Có cấu tạo từ bột đá cẩm thạch và nhựa nguyên sinh tạo sự ổn định, chống ẩm, chống mối mọt và chống ồn.',
    position: { top: '56%', left: '75%' },
  },
];

export function ProductComposition() {
  return (
    <section className="page-container py-12 lg:py-16">
      <div className="flex flex-col lg:flex-row">
        <h2 className="h3 lg:flex-[0_0_25%]">Cấu tạo sản phẩm</h2>

        <div className="relative aspect-square w-full flex-1 overflow-hidden bg-base-200">
          <Image
            src="/images/wood-layer.png"
            alt="Cấu tạo sản phẩm VINA WPC - Exploded view showing all layers"
            fill
            className="object-cover"
            sizes="67vw"
          />

          {/* Absolutely positioned text descriptions with lines */}
          {compositionLayers.map((layer, index) => (
            <div
              key={layer.number}
              className="absolute w-80"
              style={{
                top: layer.position.top,
                left: layer.position.left,
              }}
            >
              {/* Text content */}
              <div className="hidden space-y-2 bg-white/95 p-4 lg:block">
                <h3 className="h4">{layer.title}</h3>
                <p className="body-2 text-neutral/80">{layer.description}</p>
              </div>

              <div className="h6 flex aspect-square w-5 translate-y-2 items-center justify-center bg-primary text-white sm:w-8 lg:hidden">
                {layer.number}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:hidden">
          {compositionLayers.map((layer, index) => (
            <div
              key={layer.number}
              className="flex border-t border-base-300 py-6"
            >
              <div className="flex items-start gap-2">
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center bg-primary p-1">
                  <span className="h6 text-white">{layer.number}</span>
                </div>
                <div className="flex-1 space-y-0">
                  <h3 className="h5">{layer.title}</h3>
                  <p className="body-2">{layer.description}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Final separator line */}
          <div className="h-px w-full bg-base-300"></div>
        </div>
      </div>
    </section>
  );
}
