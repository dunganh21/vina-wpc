// next.config.ts
const distDir =
  process.env.NEXT_DIST_DIR ??
  (process.env.NODE_ENV === 'development' ? '.next-dev' : '.next');

export default {
  distDir,
  // Hybrid optimization: No static export, use SSG/ISR/SSR selectively
  images: {
    // Optimize images for better performance
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  // Better server-side performance
  serverExternalPackages: ['sharp'],
  // Performance optimizations
  experimental: {
    // Add future experimental features here
  },
  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
