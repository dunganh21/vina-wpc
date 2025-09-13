interface ProductSpecificationsProps {
  specifications: Array<{
    label: string;
    description: string;
  }>;
}

export function ProductSpecifications({
  specifications,
}: ProductSpecificationsProps) {
  return (
    <section className="bg-white py-5 lg:py-15">
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
