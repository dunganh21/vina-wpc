'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { Button } from './Button';

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

interface FilterSidebarMobileProps {
  onFilterChange?: (value: FilterData) => void;
  showFilters: boolean;
  onClose: () => void;
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

export function FilterSidebarMobile({
  onFilterChange,
  showFilters,
  onClose,
}: FilterSidebarMobileProps) {
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
                      <span className="body-3 text-primary">{price.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* DÀNH CHO */}
              <div>
                <div className="subtitle-3 mb-4 text-primary">DÀNH CHO</div>
                <div className="space-y-3">
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
