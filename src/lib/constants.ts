// Company and Social Media Constants
export const COMPANY_INFO = {
  name: "VINA WPC",
  fullName: "Công ty TNHH Vina WPC",
  description: "Chuyên cung cấp sản phẩm gỗ nhựa WPC chất lượng cao cho nội thất và ngoại thất",
  
  // Contact Information
  address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
  phone: "+84 901 234 567",
  email: "info@vinawpc.com",
  website: "https://vinawpc.com",
  
  // Business Hours
  businessHours: {
    weekdays: "8:00 - 17:30",
    saturday: "8:00 - 12:00",
    sunday: "Nghỉ"
  }
};

// Social Media Links
export const SOCIAL_MEDIA = {
  facebook: "https://www.facebook.com/vinawpc",
  instagram: "https://www.instagram.com/vinawpc",
  youtube: "https://www.youtube.com/@vinawpc",
  zalo: "https://zalo.me/vinawpc",
  tiktok: "https://www.tiktok.com/@vinawpc"
};

// Product Categories and Filters
export const PRODUCT_CATEGORIES = [
  {
    id: "all",
    name: "Tất cả sản phẩm",
    slug: "all"
  },
  {
    id: "scandinavian-light",
    name: "Scandinavian Light",
    slug: "scandinavian-light"
  },
  {
    id: "outdoor",
    name: "Sàn ngoài trời",
    slug: "outdoor"
  },
  {
    id: "wall-panels",
    name: "Tấm ốp tường",
    slug: "wall-panels"
  },
  {
    id: "fencing",
    name: "Hàng rào",
    slug: "fencing"
  }
];

// Price Ranges for Filtering
export const PRICE_RANGES = [
  {
    id: "all",
    name: "Tất cả mức giá",
    min: 0,
    max: Infinity
  },
  {
    id: "under-500k",
    name: "Dưới 500.000đ",
    min: 0,
    max: 500000
  },
  {
    id: "500k-1m",
    name: "500.000đ - 1.000.000đ",
    min: 500000,
    max: 1000000
  },
  {
    id: "1m-2m",
    name: "1.000.000đ - 2.000.000đ",
    min: 1000000,
    max: 2000000
  },
  {
    id: "over-2m",
    name: "Trên 2.000.000đ",
    min: 2000000,
    max: Infinity
  }
];

// Sort Options
export const SORT_OPTIONS = [
  {
    id: "newest",
    name: "Mới nhất",
    field: "date",
    order: "desc"
  },
  {
    id: "oldest",
    name: "Cũ nhất",
    field: "date",
    order: "asc"
  },
  {
    id: "price-low-high",
    name: "Giá thấp đến cao",
    field: "price",
    order: "asc"
  },
  {
    id: "price-high-low",
    name: "Giá cao đến thấp",
    field: "price",
    order: "desc"
  },
  {
    id: "name-a-z",
    name: "Tên A-Z",
    field: "title",
    order: "asc"
  },
  {
    id: "name-z-a",
    name: "Tên Z-A",
    field: "title",
    order: "desc"
  }
];

// Blog Categories
export const BLOG_CATEGORIES = [
  {
    id: "all",
    name: "Tất cả bài viết",
    slug: "all"
  },
  {
    id: "go-nhua-wpc",
    name: "Gỗ Nhựa WPC",
    slug: "go-nhua-wpc"
  },
  {
    id: "noi-that",
    name: "Nội thất",
    slug: "noi-that"
  },
  {
    id: "ngoai-that",
    name: "Ngoại thất",
    slug: "ngoai-that"
  },
  {
    id: "huong-dan",
    name: "Hướng dẫn",
    slug: "huong-dan"
  },
  {
    id: "tin-tuc",
    name: "Tin tức",
    slug: "tin-tuc"
  }
];

// Common Product Features/Tags
export const PRODUCT_FEATURES = [
  "Chống thấm nước",
  "Chống mối mọt",
  "Chống tia UV",
  "Thân thiện môi trường",
  "Dễ lắp đặt",
  "Bảo trì thấp",
  "Chống cháy",
  "Chống trượt",
  "Đa dạng màu sắc",
  "Bền với thời tiết"
];

// Navigation Menu Items
export const NAVIGATION_ITEMS = [
  {
    name: "Trang chủ",
    href: "/",
    hasSubMenu: false
  },
  {
    name: "Sản phẩm",
    href: "/products",
    hasSubMenu: true,
    subMenu: PRODUCT_CATEGORIES.filter(cat => cat.id !== "all")
  },
  {
    name: "Về chúng tôi",
    href: "/about",
    hasSubMenu: false
  },
  {
    name: "Liên hệ",
    href: "/contact",
    hasSubMenu: false
  }
];

// SEO and Meta Data
export const SEO_DEFAULTS = {
  title: "VINA WPC - Gỗ nhựa composite chất lượng cao",
  description: "Chuyên cung cấp sản phẩm gỗ nhựa WPC chất lượng cao cho nội thất và ngoại thất. Chống thấm, bền đẹp, thân thiện môi trường.",
  keywords: "gỗ nhựa, WPC, composite, nội thất, ngoại thất, chống thấm, bền đẹp",
  ogImage: "/images/og-image.jpg",
  twitterCard: "summary_large_image"
};