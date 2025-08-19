'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { ButtonIcon } from '@/components/ui/ButtonIcon';
import { RoomType } from '@/components/ui/RoomType';
import { SizeSelector } from '@/components/ui/SizeSelector';
import CollectionCard from '@/components/ui/CollectionCard';
import { ProductTooltipCard } from '@/components/ui/ProductTooltipCard';
import Pagination from '@/components/ui/Pagination';

export default function TestComponentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 30;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Page changed to:', page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Header */}
      <div className="bg-primary py-16 text-center">
        <h1 className="h1 mb-4 text-white">Component Test Page</h1>
        <p className="text-lg text-white/90">
          Trang kiểm tra các component UI của hệ thống
        </p>
      </div>

      {/* Size Selector Demo Section */}
      <section className="page-container mx-auto space-y-8 px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="h2 mb-4 text-neutral">Size Selector Component</h2>
          <p className="text-lg text-secondary">
            Component chọn kích thước sản phẩm với dropdown
          </p>
        </div>

        <div className="mx-auto max-w-md space-y-6">
          {/* Default selector */}
          <SizeSelector
            label="Kích thước"
            options={[
              '900×120×15mm',
              '900×120×20mm',
              '900×140×15mm',
              '900×140×20mm',
            ]}
            onChange={(value) => console.log('Selected:', value)}
            onSelect={(_, option) => console.log('Selected option:', option)}
          />

          {/* Controlled selector with placeholder */}
          <SizeSelector
            label="Kích thước sản phẩm"
            options={['600×80×12mm', '800×100×15mm', '1000×150×18mm']}
            placeholder="Chọn kích thước phù hợp"
            required
            name="product-size"
            onChange={(value) => console.log('Controlled selected:', value)}
          />

          {/* Disabled selector */}
          <SizeSelector
            label="Kích thước (Vô hiệu hóa)"
            options={['900×120×15mm', '900×120×20mm']}
            defaultValue="900×120×15mm"
            disabled
          />
        </div>
      </section>

      {/* RoomType Demo Section */}
      <section className="page-container mx-auto space-y-8 px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="h2 mb-4 text-neutral">Room Type Component</h2>
          <p className="text-lg text-secondary">
            Component loại phòng với trạng thái hover
          </p>
        </div>

        <div className="mx-auto max-w-md space-y-4 rounded-lg bg-primary p-8">
          <RoomType category="Phòng khách" icon="living-room.svg" />
          <RoomType category="Phòng ngủ" icon="bed-room.svg" />
          <RoomType category="Phòng bếp" icon="kitchen.svg" />
        </div>
      </section>

      {/* Collection Card Demo Section */}
      <section className="page-container mx-auto space-y-8 px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="h2 mb-4 text-neutral">Collection Card Component</h2>
          <p className="text-lg text-secondary">
            Component thẻ bộ sưu tập sản phẩm
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <CollectionCard
            title="Sàn gỗ nội thất"
            description="Sàn gỗ mang lại cảm giác êm chân, ấm áp và thẩm mỹ cao, lý tưởng cho mọi không gian sống hiện đại."
            productCount={12}
            imageUrl="/images/collection-card-bg.png"
            onLearnMore={() => console.log('Learn more clicked')}
          />
        </div>
      </section>

      {/* Product Tooltip Card Demo Section */}
      <section className="page-container mx-auto mb-6 space-y-16 px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="h2 mb-4 text-neutral">Product Tooltip Card</h2>
          <p className="text-lg text-secondary">
            Component thẻ sản phẩm với tooltip
          </p>
        </div>

        <div className="flex justify-center">
          <ProductTooltipCard
            image="/images/product-test.jpg"
            title="Scandinavian Light"
            subtitle="Tấm ốp gỗ sồi WR205"
            price="850.000đ/m²"
            dimensions="900×120×15mm"
          />
        </div>
      </section>

      {/* Button Demo Section */}
      <section className="page-container mx-auto space-y-8 px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="h2 mb-4 text-neutral">Demo Buttons</h2>
          <p className="text-lg text-secondary">
            Các loại button khác nhau trong hệ thống thiết kế
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Primary Light Button */}
          <div className="space-y-4 text-center">
            <Button mode="light" className="w-full">
              Button Light
            </Button>
            <p className="text-sm text-neutral">Primary Light</p>
          </div>

          {/* Primary Dark Button */}
          <div className="space-y-4 text-center">
            <Button mode="dark" className="w-full">
              Button Dark
            </Button>
            <p className="text-sm text-neutral">Primary Dark</p>
          </div>

          {/* Outline Button */}
          <div className="space-y-4 text-center">
            <Button variant="button-outline" mode="light" className="w-full">
              Outline Button
            </Button>
            <p className="text-sm text-neutral">Outline Light</p>
          </div>

          {/* White Button */}
          <div className="space-y-4 text-center">
            <Button variant="white" className="w-full">
              White Button
            </Button>
            <p className="text-sm text-neutral">White Variant</p>
          </div>
        </div>

        {/* Button with Icon */}
        <div className="space-y-4 text-center">
          <Button mode="light" icon="search.svg" className="mx-auto">
            Thêm vào giỏ hàng
          </Button>
          <p className="text-sm text-neutral">Button with Shopping Cart Icon</p>
        </div>

        {/* ButtonIcon Variants */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
          {/* Button-icon Light */}
          <div className="space-y-4 text-center">
            <ButtonIcon
              variant="button-icon"
              theme="light"
              icon="search.svg"
              className="mx-auto"
              aria-label="Search Light"
            />
            <p className="text-sm text-neutral">Button-icon Light</p>
          </div>

          {/* Button-icon Dark */}
          <div className="space-y-4 text-center">
            <ButtonIcon
              variant="button-icon"
              theme="dark"
              icon="search.svg"
              className="mx-auto"
              aria-label="Cart Dark"
            />
            <p className="text-sm text-neutral">Button-icon Dark</p>
          </div>

          {/* Button-icon White */}
          <div className="space-y-4 rounded bg-neutral p-4 text-center">
            <ButtonIcon
              variant="button-icon"
              theme="white"
              icon="search.svg"
              className="mx-auto"
              aria-label="Search White"
            />
            <p className="text-sm text-white">Button-icon White</p>
          </div>

          {/* Button-outline Light */}
          <div className="space-y-4 text-center">
            <ButtonIcon
              variant="button-outline"
              theme="light"
              icon="search.svg"
              className="mx-auto"
              aria-label="Cart Outline Light"
            />
            <p className="text-sm text-neutral">Button-outline Light</p>
          </div>

          {/* Button-outline Dark */}
          <div className="space-y-4 rounded bg-neutral p-4 text-center">
            <ButtonIcon
              variant="button-outline"
              theme="dark"
              icon="search.svg"
              className="mx-auto"
              aria-label="Search Outline Dark"
            />
            <p className="text-sm text-white">Button-outline Dark</p>
          </div>

          {/* Button-outline White */}
          <div className="space-y-4 rounded bg-neutral p-4 text-center">
            <ButtonIcon
              variant="button-outline"
              theme="white"
              icon="search.svg"
              className="mx-auto"
              aria-label="Cart Outline White"
            />
            <p className="text-sm text-white">Button-outline White</p>
          </div>
        </div>

        {/* Disabled States */}
        <div className="grid grid-cols-2 gap-8">
          {/* Disabled Button */}
          <div className="space-y-4 text-center">
            <Button mode="light" disabled className="mx-auto">
              Disabled Button
            </Button>
            <p className="text-sm text-neutral">Disabled Button</p>
          </div>

          {/* Disabled ButtonIcon */}
          <div className="space-y-4 text-center">
            <ButtonIcon
              variant="button-icon"
              theme="light"
              icon="search.svg"
              disabled
              className="mx-auto"
              aria-label="Disabled Search"
            />
            <p className="text-sm text-neutral">Disabled ButtonIcon</p>
          </div>
        </div>
      </section>

      {/* Pagination Demo Section */}
      <section className="page-container mx-auto space-y-8 px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="h2 mb-4 text-neutral">Pagination Component</h2>
          <p className="text-lg text-secondary">
            Component phân trang với các trạng thái khác nhau
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-12">
          {/* Current pagination state */}
          <div className="space-y-4 text-center">
            <h3 className="h4 text-neutral">Trạng thái hiện tại</h3>
            <p className="text-neutral">
              Trang {currentPage} / {totalPages}
            </p>
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            </div>
          </div>

          {/* No overflow example (few pages) */}
          <div className="space-y-4 text-center">
            <h3 className="h4 text-neutral">Không có overflow (3 trang)</h3>
            <div className="flex justify-center">
              <Pagination
                currentPage={1}
                totalPages={3}
                onPageChange={(page) => console.log('No overflow page:', page)}
                onPrevious={() => console.log('Previous')}
                onNext={() => console.log('Next')}
              />
            </div>
          </div>

          {/* Overflow at end example */}
          <div className="space-y-4 text-center">
            <h3 className="h4 text-neutral">Overflow ở cuối (trang 1/30)</h3>
            <div className="flex justify-center">
              <Pagination
                currentPage={1}
                totalPages={30}
                onPageChange={(page) => console.log('Overflow end page:', page)}
                onPrevious={() => console.log('Previous')}
                onNext={() => console.log('Next')}
              />
            </div>
          </div>

          {/* 2 side overflow example (middle pages) */}
          <div className="space-y-4 text-center">
            <h3 className="h4 text-neutral">Overflow 2 bên (trang 15/30)</h3>
            <div className="flex justify-center">
              <Pagination
                currentPage={15}
                totalPages={30}
                onPageChange={(page) =>
                  console.log('2-side overflow page:', page)
                }
                onPrevious={() => console.log('Previous')}
                onNext={() => console.log('Next')}
              />
            </div>
          </div>

          {/* Overflow at start (near end) */}
          <div className="space-y-4 text-center">
            <h3 className="h4 text-neutral">Overflow ở đầu (trang 30/30)</h3>
            <div className="flex justify-center">
              <Pagination
                currentPage={30}
                totalPages={30}
                onPageChange={(page) =>
                  console.log('Overflow start page:', page)
                }
                onPrevious={() => console.log('Previous')}
                onNext={() => console.log('Next')}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}