// next.config.ts
export default {
  // Enable static export
  output: 'export',

  // Static export requires unoptimized images
  images: {
    unoptimized: true,
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
