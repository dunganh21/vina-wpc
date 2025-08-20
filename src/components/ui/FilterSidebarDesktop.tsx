'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from './Checkbox';

interface FilterOption {
  id: string;
  label: string;
  defaultChecked: boolean;
}

interface FilterData {
  categories: string[];
  priceRanges: string[];
  rooms: string[];
}

interface FilterSidebarDesktopProps {
  className?: string;
  onFilterChange?: (value: FilterData) => void;
}

const defaultCategories: FilterOption[] = [
  { id: 'wall-cladding', label: 'Wall Cladding', defaultChecked: true },
  { id: 'flooring', label: 'Flooring', defaultChecked: false },
  { id: 'ceiling-tiles', label: 'Ceiling Tiles', defaultChecked: false },
  {
    id: 'modular-partitions',
    label: 'Modular Partitions',
    defaultChecked: false,
  },
  { id: 'office-furniture', label: 'Office Furniture', defaultChecked: false },
  {
    id: 'conference-room',
    label: 'Conference Room Equipment',
    defaultChecked: false,
  },
  { id: 'interior-signage', label: 'Interior Signage', defaultChecked: false },
  { id: 'display-windows', label: 'Display Windows', defaultChecked: false },
];

const defaultPriceRanges: FilterOption[] = [
  { id: 'over-1000', label: '> 1.000.000đ', defaultChecked: false },
  { id: '850-1000', label: '850.000đ', defaultChecked: false },
  { id: '600-850', label: '600.000đ', defaultChecked: false },
  { id: 'under-250', label: '< 250.000đ', defaultChecked: false },
];

const defaultRooms: FilterOption[] = [
  { id: 'living-room', label: 'Phòng khách', defaultChecked: false },
  { id: 'bedroom', label: 'Phòng ngủ', defaultChecked: false },
  { id: 'kitchen', label: 'Phòng bếp', defaultChecked: false },
];

export function FilterSidebarDesktop({
  className,
  onFilterChange,
}: FilterSidebarDesktopProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRanges, setPriceRanges] = useState<string[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);

  const handleCategoryChange = (id: string) => {
    setCategories((prev) => [...prev, id]);
    onFilterChange?.({ categories: categories, priceRanges, rooms });
  };

  const handlePriceChange = (id: string) => {
    setPriceRanges((prev) => [...prev, id]);
    onFilterChange?.({ categories, priceRanges: priceRanges, rooms });
  };

  const handleRoomChange = (id: string) => {
    setRooms((prev) => [...prev, id]);
    onFilterChange?.({ categories, priceRanges, rooms: rooms });
  };

  return (
    <div className={cn('w-full space-y-8', className)}>
      {/* BỘ SẢN PHẨM */}
      <div>
        <div className="subtitle-3 mb-2 text-primary">BỘ SẢN PHẨM</div>
        <div className="space-y-2">
          {defaultCategories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                defaultChecked={category.defaultChecked}
                checked={categories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <span className="whitespace-nowrap">{category.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* PHẠM VỊ GIÁ */}
      <div>
        <div className="subtitle-3 mb-2 text-primary">PHẠM VỊ GIÁ</div>
        <div className="space-y-2">
          {defaultPriceRanges.map((price) => (
            <label
              key={price.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                defaultChecked={price.defaultChecked}
                checked={priceRanges.includes(price.id)}
                onChange={() => handlePriceChange(price.id)}
              />
              <span className="body-3 whitespace-nowrap text-primary">
                {price.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* DÀNH CHO */}
      <div>
        <div className="subtitle-3 mb-2 text-primary">DÀNH CHO</div>
        <div className="space-y-2">
          {defaultRooms.map((room) => (
            <label
              key={room.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                defaultChecked={room.defaultChecked}
                checked={rooms.includes(room.id)}
                onChange={() => handleRoomChange(room.id)}
              />
              <span className="body-3 text-neutral">{room.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}