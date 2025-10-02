'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from './Checkbox';
import {
  PRODUCT_CATEGORIES,
  PRICE_RANGES,
  ROOMS_DESKTOP,
} from '@/lib/filter-constants';

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

export function FilterSidebarDesktop({
  className,
  onFilterChange,
  initialFilters,
}: FilterSidebarDesktopProps) {
  const [categories, setCategories] = useState<string[]>(
    initialFilters?.categories || []
  );
  const [priceRanges, setPriceRanges] = useState<string[]>(
    initialFilters?.priceRanges || []
  );
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
          {PRODUCT_CATEGORIES.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
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
        <div className="subtitle-3 mb-2 text-primary">
          phân khúc giá/m
          <sup className="text-xs">2</sup>
        </div>
        <div className="space-y-2">
          {PRICE_RANGES.map((price) => (
            <label
              key={price.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                checked={priceRanges.includes(price.id)}
                onChange={() => handlePriceChange(price.id)}
              />
              <span className="whitespace-nowrap">{price.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* DÀNH CHO */}
      <div>
        <div className="subtitle-3 mb-2 text-primary">DÀNH CHO</div>
        <div className="space-y-2">
          {ROOMS_DESKTOP.map((room) => (
            <label
              key={room.id}
              className="flex cursor-pointer items-center gap-3"
            >
              <Checkbox
                checked={rooms.includes(room.id)}
                onChange={() => handleRoomChange(room.id)}
              />
              <span>{room.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
