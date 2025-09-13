// Shared type definitions for the data layer

// Blog post data structure for content management
export interface BlogPost {
  slug: string; // URL-friendly identifier
  title: string; // Blog post title
  date: string; // Publication date
  category: string; // Blog category
  image: string; // Featured image URL
  excerpt: string; // Short description
  content: string; // Full blog content
}

// Color variant for products
export interface ProductColor {
  name: string; // Color name (e.g., "Nâu gỗ")
  hex: string; // Hex color code (e.g., "#8B4513")
}

// Complete product information for detail pages
export interface Product {
  title: string; // Product name
  description: string; // Detailed description
  collection: string; // Product collection/category
  specifications: string; // Technical specifications
  features: string[]; // List of product features
  gallery: string[]; // Array of product image URLs
  price: string; // Optional price (some products may not have pricing)
  rooms: string[]; // Room types where product is suitable
  colors: ProductColor[]; // Available color variants
  dimensions: string[]; // Available dimensions for selection
  slug: string; // URL-friendly identifier
}

// Filter options for product search/filtering
export interface ProductFilters {
  category?: string; // Filter by product category
  colors?: string[]; // Filter by available colors
  priceRange?: string; // Filter by price range
  features?: string[]; // Filter by product features
}

// Search results containing both products and blog posts
export interface SearchResults {
  products: Product[]; // Array of matching products
  blogs: BlogPost[]; // Array of matching blog posts
}

// Minimal product data shared between UI components (cards, cart items)
// Used to avoid duplicating common fields across different component interfaces
export interface ProductSummary {
  id: string; // Unique product identifier
  slug: string; // URL-friendly identifier for navigation
  title: string; // Product name for display
  collection: string; // Product collection/category
  price: string; // Formatted price string (e.g., "2.500.000đ")
  dimensions: string; // Product dimensions (e.g., "120x80x2.5cm")
  image: string;
  colors: ProductColor[]; // Available color variants
}

// UI component data interfaces

// News article data for news/blog cards
export interface NewsArticle {
  id: string; // Unique article identifier
  title: string; // Article headline
  excerpt: string; // Short summary
  date: string; // Publication date
  category: string; // Article category
  imageUrl: string; // Article featured image
  readTime: string; // Estimated reading time
}
