import { Suspense } from 'react';
import HeroSearch from './components/HeroSearch';
import PropertyGrid from './components/PropertyGrid';

export default async function Home(props: { searchParams: Promise<{ search?: string }> }) {
  const searchParams = await props.searchParams;
  return (
    <main className="bg-[#121212] min-h-screen text-white">
      <HeroSearch />
      <Suspense fallback={<div className="text-center py-24 text-gray-500">Loading listings...</div>}>
        <PropertyGrid searchParams={searchParams} />
      </Suspense>

      {/* Footer Placeholder */}
      <footer className="border-t border-white/10 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2026 RealStat. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
