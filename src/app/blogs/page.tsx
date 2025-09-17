import { BlogPageServer } from '@/components/sections/BlogPageServer';

// Enable ISR with 1-hour revalidation for blog content
export const revalidate = 3600;

export default function Blog() {
  return (
    <main className="min-h-screen bg-white">
      <BlogPageServer />
    </main>
  );
}