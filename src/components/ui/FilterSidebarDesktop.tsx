'use client';

import { useState, useEffect } from 'react';
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
  initialFilters?: FilterData;
}

const defaultCategories: FilterOption[] = [
  { id: 'sàn wpc', label: 'Sàn WPC', defaultChecked: false },
  { id: 'ốp tường wpc', label: 'Ốp Tường WPC', defaultChecked: false },
  { id: 'hàng rào wpc', label: 'Hàng Rào WPC', defaultChecked: false },
  { id: 'lam che nắng wpc', label: 'Lam Che Nắng WPC', defaultChecked: false },
  {
    id: 'sàn gỗ ngoài trời',
    label: 'Sàn Gỗ Ngoài Trời',
    defaultChecked: false,
  },
  { id: 'tấm ốp 3d', label: 'Tấm Ốp 3D', defaultChecked: false },
];

const defaultPriceRanges: FilterOption[] = [
  { id: 'over-1000', label: '> 1.000.000đ', defaultChecked: false },
  { id: '850-1000', label: '850.000đ - 1.000.000đ', defaultChecked: false },
  { id: '600-850', label: '600.000đ - 850.000đ', defaultChecked: false },
  { id: 'under-250', label: '< 250.000đ', defaultChecked: false },
];

const defaultRooms: FilterOption[] = [
  { id: 'phòng khách', label: 'Phòng khách', defaultChecked: false },
  { id: 'phòng ngủ', label: 'Phòng ngủ', defaultChecked: false },
  { id: 'phòng bếp', label: 'Phòng bếp', defaultChecked: false },
  { id: 'phòng tắm', label: 'Phòng tắm', defaultChecked: false },
];

export function FilterSidebarDesktop({
  className,
  onFilterChange,
  initialFilters,
}: FilterSidebarDesktopProps) {
  const [categories, setCategories] = useState<string[]>(initialFilters?.categories || []);
  const [priceRanges, setPriceRanges] = useState<string[]>(initialFilters?.priceRanges || []);
  const [rooms, setRooms] = useState<string[]>(initialFilters?.rooms || []);

  // Update local state when initialFilters change
  useEffect(() => {
    if (initialFilters) {
      setCategories(initialFilters.categories || []);
      setPriceRanges(initialFilters.priceRanges || []);
      setRooms(initialFilters.rooms || []);
    }
  }, [initialFilters]);

  const handleCategoryChange = (id: string) => {
    setCategories((prev) => {
      const newCategories = prev.includes(id)
        ? prev.filter((cat) => cat !== id)
        : [...prev, id];
      onFilterChange?.({ categories: newCategories, priceRanges, rooms });
      return newCategories;
    });
  };

  const handlePriceChange = (id: string) => {
    setPriceRanges((prev) => {
      const newPriceRanges = prev.includes(id)
        ? prev.filter((price) => price !== id)
        : [...prev, id];
      onFilterChange?.({ categories, priceRanges: newPriceRanges, rooms });
      return newPriceRanges;
    });
  };

  const handleRoomChange = (id: string) => {
    setRooms((prev) => {
      const newRooms = prev.includes(id)
        ? prev.filter((room) => room !== id)
        : [...prev, id];
      onFilterChange?.({ categories, priceRanges, rooms: newRooms });
      return newRooms;
    });
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
