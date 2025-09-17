'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { Button } from './Button';
import {
  PRODUCT_CATEGORIES,
  PRICE_RANGES,
  ROOMS_MOBILE,
} from '@/lib/filter-constants';


interface FilterData {
  categories: string[];
  priceRanges: string[];
  rooms: string[];
}

interface FilterSidebarMobileProps {
  onFilterChange?: (value: FilterData) => void;
  showFilters: boolean;
  onClose: () => void;
  initialFilters?: FilterData;
}




export function FilterSidebarMobile({
  onFilterChange,
  showFilters,
  onClose,
  initialFilters,
}: FilterSidebarMobileProps) {
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
        ? prev.filter(cat => cat !== id)
        : [...prev, id];
      onFilterChange?.({ categories: newCategories, priceRanges, rooms });
      return newCategories;
    });
  };

  const handlePriceChange = (id: string) => {
    setPriceRanges((prev) => {
      const newPriceRanges = prev.includes(id)
        ? prev.filter(price => price !== id)
        : [...prev, id];
      onFilterChange?.({ categories, priceRanges: newPriceRanges, rooms });
      return newPriceRanges;
    });
  };

  const handleRoomChange = (id: string) => {
    setRooms((prev) => {
      const newRooms = prev.includes(id)
        ? prev.filter(room => room !== id)
        : [...prev, id];
      onFilterChange?.({ categories, priceRanges, rooms: newRooms });
      return newRooms;
    });
  };

  useEffect(() => {
    // Only handle mobile modal logic
    const isMobile = window.innerWidth < 1024;
    if (!isMobile) return;

    const modal = document.getElementById(
      'filter_modal_mobile'
    ) as HTMLDialogElement;

    if (!modal) return;

    if (showFilters) {
      modal.showModal();
    } else {
      modal.close();
    }

    const handleClose = () => {
      onClose();
    };

    modal.addEventListener('close', handleClose);

    return () => {
      modal.removeEventListener('close', handleClose);
    };
  }, [showFilters, onClose]);

  return (
    <div className="sm:hidden lg:hidden">
      <dialog id="filter_modal_mobile" className="modal">
        <div className="modal-box overflow-hidden rounded-none bg-white">
          <form method="dialog">
            <button
              className="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm"
              onClick={onClose}
            >
              ✕
            </button>
          </form>

          <h3 className="h5 mb-6">Bộ lọc sản phẩm</h3>

          {/* Scrollable Content */}
          <div className="max-h-[calc(80vh-160px)] overflow-y-auto">
            <div className="space-y-6">
              {/* BỘ SẢN PHẨM */}
              <div>
                <div className="subtitle-3 mb-4 text-primary">BỘ SẢN PHẨM</div>
                <div className="space-y-3">
                  {PRODUCT_CATEGORIES.map((category) => (
                    <label
                      key={category.id}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <Checkbox
                        checked={categories.includes(category.id)}
                        onChange={() => handleCategoryChange(category.id)}
                      />
                      <span className="body-3 text-primary">
                        {category.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* PHẠM VỊ GIÁ */}
              <div>
                <div className="subtitle-3 mb-4 text-primary">PHẠM VỊ GIÁ</div>
                <div className="space-y-3">
                  {PRICE_RANGES.map((price) => (
                    <label
                      key={price.id}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <Checkbox
                        checked={priceRanges.includes(price.id)}
                        onChange={() => handlePriceChange(price.id)}
                      />
                      <span className="body-3 text-primary">{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* DÀNH CHO */}
              <div>
                <div className="subtitle-3 mb-4 text-primary">DÀNH CHO</div>
                <div className="space-y-3">
                  {ROOMS_MOBILE.map((room) => (
                    <label
                      key={room.id}
                      className="flex cursor-pointer items-center gap-3"
                    >
                      <Checkbox
                        checked={rooms.includes(room.id)}
                        onChange={() => handleRoomChange(room.id)}
                      />
                      <span className="body-3 text-neutral">{room.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-action">
            <Button
              variant="button-outline"
              onClick={onClose}
              className="flex-1"
            >
              Hủy
            </Button>
            <Button variant="button" onClick={onClose} className="flex-1">
              Áp dụng
            </Button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={onClose}>close</button>
        </form>
      </dialog>
    </div>
  );
}
