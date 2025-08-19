import { Navbar } from '@/components/layout/Header';

export default function NavbarTestPage() {
  return (
    <div className="min-h-screen">
      {/* Color Test Section */}
      <div className="space-y-4 border-b p-4">
        <h2 className="mb-4 text-2xl font-bold">Color Test</h2>
        <div className="flex gap-4">
          <div className="text-primary">
            text-primary: Should be dark text (#2a332b)
          </div>
          <div className="bg-primary px-3 py-1 text-white">
            bg-primary: Should be green background (#3c5f3e)
          </div>
          <div className="bg-secondary px-3 py-1 text-white">
            bg-secondary: Should be orange background (#f57f41)
          </div>
        </div>
      </div>

      {/* Light variant */}
      <div className="mb-8">
        <h2 className="mb-4 px-4 text-2xl font-bold">Light Variant</h2>
        <Navbar variant="light" />
      </div>

      {/* Dark variant */}
      <div className="bg-neutral-900 pb-8">
        <h2 className="mb-4 px-4 pt-8 text-2xl font-bold text-white">
          Dark Variant
        </h2>
        <Navbar variant="dark" />
      </div>
    </div>
  );
}
