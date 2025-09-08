interface ProductSpecificationsProps {
  specifications?: Array<{
    label: string;
    description: string;
  }>;
  className?: string;
}

export function ProductSpecifications({
  specifications = [
    { label: 'Kích thước', description: '900 x 120 x 15mm' },
    {
      label: 'Loại gỗ',
      description: 'Gỗ sồi trắng tự nhiên (White Oak Rustic)',
    },
    { label: 'Kiểu cạnh', description: 'Ghép âm dương / Cạnh thẳng không vát' },
    { label: 'Bề mặt', description: 'Sơn UV mờ hoặc dầu lau tự nhiên' },
    {
      label: 'Vân gỗ',
      description: 'Rustic tự nhiên – có mắt gỗ & vết nứt nhẹ',
    },
    {
      label: 'Loại gỗ',
      description: 'Gỗ sồi trắng tự nhiên (White Oak Rustic)',
    },
    {
      label: 'Độ ẩm tiêu chuẩn',
      description: '8–12% (phù hợp khí hậu Việt Nam)',
    },
    {
      label: 'Ứng dụng',
      description: 'Ốp tường nội thất, ốp trần nhẹ, decor quán',
    },
    {
      label: 'Phong cách phù hợp',
      description: 'Bắc Âu, Japandi, Tối giản, Zen',
    },
    { label: 'Bảo hành', description: '5 năm cho mục đích nội thất trong nhà' },
  ],
  className = '',
}: ProductSpecificationsProps) {
  return (
    <section className={`bg-white py-5 lg:py-15 ${className}`}>
      <div className="page-container">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-43">
          {/* Title Column */}
          <div className="flex w-full max-w-lg flex-shrink-0 justify-start lg:w-1/3 lg:max-w-md lg:justify-end">
            <h4>Thông số kỹ thuật</h4>
          </div>

          {/* Specifications Column */}
          <div className="flex flex-1 flex-col gap-4 lg:w-1/3 lg:max-w-lg lg:gap-6">
            {/* Mobile: 2-column grid layout */}
            <div className="grid grid-cols-2 gap-x-[35px] gap-y-4 lg:hidden">
              {specifications.map((item, index) => (
                <div key={index} className="flex w-3/4 flex-col gap-0.5">
                  <div className="h6">{item.label}</div>
                  <div className="body-2">{item.description}</div>
                </div>
              ))}
            </div>

            {/* Desktop: horizontal layout (original) */}
            <div className="hidden space-y-4 lg:block">
              {specifications.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-base-300 pb-4"
                >
                  <div className="body-2">{item.label}</div>
                  <div className="body-2">{item.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
