/**
 * Centralized filter constants for product filtering
 * Edit these values to update filter options across the entire application
 */

export interface FilterOption {
  id: string;
  label: string;
  defaultChecked: boolean;
}

export interface PriceRangeConfig {
  id: string;
  label: string;
  min?: number;
  max?: number;
  defaultChecked: boolean;
}

export interface RoomMapping {
  display: string;
  urlSlug: string;
}

// ==================== CATEGORY FILTERS ====================

export const PRODUCT_CATEGORIES: FilterOption[] = [
  { id: 'sàn wpc', label: 'Sàn WPC', defaultChecked: false },
  { id: 'ốp tường wpc', label: 'Ốp Tường WPC', defaultChecked: false },
  { id: 'hàng rào wpc', label: 'Hàng Rào WPC', defaultChecked: false },
  { id: 'lam che nắng wpc', label: 'Lam Che Nắng WPC', defaultChecked: false },
  { id: 'sàn gỗ ngoài trời', label: 'Sàn Gỗ Ngoài Trời', defaultChecked: false },
  { id: 'tấm ốp 3d', label: 'Tấm Ốp 3D', defaultChecked: false },
];

// ==================== PRICE RANGE FILTERS ====================

export const PRICE_RANGES: PriceRangeConfig[] = [
  {
    id: 'over-1000',
    label: '> 1.000.000đ',
    min: 1000000,
    defaultChecked: false
  },
  {
    id: '850-1000',
    label: '850.000đ - 1.000.000đ',
    min: 850000,
    max: 1000000,
    defaultChecked: false
  },
  {
    id: '600-850',
    label: '600.000đ - 850.000đ',
    min: 600000,
    max: 850000,
    defaultChecked: false
  },
  {
    id: 'under-250',
    label: '< 250.000đ',
    max: 250000,
    defaultChecked: false
  },
];

// ==================== ROOM FILTERS ====================

// Desktop version - fewer options
export const ROOMS_DESKTOP: FilterOption[] = [
  { id: 'phòng khách', label: 'Phòng khách', defaultChecked: false },
  { id: 'phòng ngủ', label: 'Phòng ngủ', defaultChecked: false },
  { id: 'phòng bếp', label: 'Phòng bếp', defaultChecked: false },
  { id: 'phòng tắm', label: 'Phòng tắm', defaultChecked: false },
];

// Mobile version - all room options
export const ROOMS_MOBILE: FilterOption[] = [
  { id: 'phòng khách', label: 'Phòng khách', defaultChecked: false },
  { id: 'phòng ngủ', label: 'Phòng ngủ', defaultChecked: false },
  { id: 'phòng bếp', label: 'Phòng bếp', defaultChecked: false },
  { id: 'phòng tắm', label: 'Phòng tắm', defaultChecked: false },
  { id: 'sân vườn', label: 'Sân vườn', defaultChecked: false },
  { id: 'ban công', label: 'Ban công', defaultChecked: false },
  { id: 'hành lang', label: 'Hành lang', defaultChecked: false },
  { id: 'văn phòng', label: 'Văn phòng', defaultChecked: false },
];

// ==================== ROOM URL MAPPINGS ====================

// Mapping from display names to URL-friendly slugs (for URL generation)
export const ROOM_DISPLAY_TO_URL: Record<string, string> = {
  'phòng khách': 'phongkhach',
  'phòng ngủ': 'phongngu',
  'phòng bếp': 'phongbep',
  'phòng tắm': 'phongtam',
  'sân vườn': 'sanvuon',
  'ban công': 'bancong',
  'hành lang': 'hanhlang',
  'văn phòng': 'vanphong',
};

// Mapping from URL slugs to display names (for URL parsing)
export const ROOM_URL_TO_DISPLAY: Record<string, string> = {
  'phongkhach': 'phòng khách',
  'phongngu': 'phòng ngủ',
  'phongbep': 'phòng bếp',
  'phongtam': 'phòng tắm',
  'sanvuon': 'sân vườn',
  'bancong': 'ban công',
  'hanhlang': 'hành lang',
  'vanphong': 'văn phòng',
};

// ==================== PRICE RANGE LOGIC ====================

/**
 * Check if a price falls within a given price range
 * @param price - Product price in VND
 * @param rangeId - Price range identifier
 * @returns true if price matches the range
 */
export function matchesPriceRange(price: number, rangeId: string): boolean {
  const range = PRICE_RANGES.find(r => r.id === rangeId);
  if (!range) return false;

  if (range.min !== undefined && range.max !== undefined) {
    return price >= range.min && price <= range.max;
  } else if (range.min !== undefined) {
    return price > range.min;
  } else if (range.max !== undefined) {
    return price < range.max;
  }

  return false;
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Convert room display name to URL slug
 */
export function roomToUrlSlug(displayRoom: string): string {
  return ROOM_DISPLAY_TO_URL[displayRoom.toLowerCase()] ||
         displayRoom.replace(/\s+/g, '').toLowerCase();
}

/**
 * Convert room URL slug to display name
 */
export function roomFromUrlSlug(urlSlug: string): string {
  return ROOM_URL_TO_DISPLAY[urlSlug.toLowerCase()] || urlSlug;
}