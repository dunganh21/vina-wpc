// next.config.mjs
const distDir =
  process.env.NEXT_DIST_DIR ??
  (process.env.NODE_ENV === 'development' ? '.next-dev' : '.next');

export default {
  distDir,
  // Suppress hydration warnings in development caused by browser extensions
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      suppressHydrationWarning: true,
    },
  }),
};
