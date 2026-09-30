'use client';

import { useState, useEffect, useMemo } from 'react';
import { Kost, FilterState } from '@/types/kost';
import { filterKosts } from '@/utils/filterKosts';
import KostCard from '@/components/KostCard';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import PageTransition from '@/components/PageTransition';
import kostsData from '@/data/kosts.json';

const FAVORITES_KEY = 'kosthub_favorites';

export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    gender: 'all',
    nearCampus: 'all',
    facilities: [],
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every((item): item is string => typeof item === 'string')) {
          setFavorites(parsed);
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const kosts = kostsData as Kost[];
  const filteredKosts = useMemo(() => filterKosts(kosts, filters), [kosts, filters]);

  // Extract unique facilities
  const availableFacilities = useMemo(() => {
    const facilitySet = new Set<string>();
    kosts.forEach((k) => k.facilities.forEach((f) => facilitySet.add(f)));
    return Array.from(facilitySet).sort();
  }, [kosts]);

  return (
    <PageTransition>
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-brand-latte/60 bg-gradient-to-b from-brand-cream via-brand-cream to-white dark:border-white/5 dark:from-slate-950 dark:via-slate-950 dark:to-slate-950">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-brand-peach/15 blur-3xl dark:bg-brand-peach/5" />
          <div className="absolute right-1/4 top-20 h-80 w-80 rounded-full bg-brand-sky/20 blur-3xl dark:bg-brand-sky/5" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-sky/40 px-4 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-brand-sky/60 dark:bg-brand-sky/10 dark:text-brand-sky dark:ring-brand-sky/20">
              <span className="h-2 w-2 rounded-full bg-brand-peach animate-pulse dark:bg-brand-peach" />
              {kosts.length} kost tersedia
            </div>
            <h1 className="mb-5 text-4xl font-extrabold tracking-tight text-slate-800 dark:text-white sm:text-5xl lg:text-6xl">
              Temukan Kost{' '}
              <span className="text-brand-peach dark:text-brand-peach">
                Impianmu
              </span>
            </h1>
            <p className="mb-8 text-lg text-slate-600 dark:text-gray-400 sm:text-xl">
              Platform pencarian kost modern, cepat, dan terpercaya.
              <br className="hidden sm:block" />
              Cari, bandingkan, dan hubungi pemilik langsung via WhatsApp.
            </p>
            <div className="mx-auto max-w-xl">
              <SearchBar
                value={filters.searchQuery}
                onChange={(searchQuery) => setFilters((prev) => ({ ...prev, searchQuery }))}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Mobile filter toggle */}
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <p className="text-sm text-slate-500 dark:text-gray-400">
            <span className="font-semibold text-slate-800 dark:text-white">{filteredKosts.length}</span> kost ditemukan
          </p>
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-brand-latte/60 transition-colors hover:bg-brand-latte/30 dark:bg-slate-900 dark:text-gray-300 dark:ring-white/10 dark:shadow-none dark:hover:bg-white/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M17 2.75a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0v-5.5ZM17 15.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5ZM3.75 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM4.5 2.75a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0v-5.5ZM10 11a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5A.75.75 0 0 1 10 11ZM10.75 2.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5ZM10 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.75 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM16.25 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
            </svg>
            Filter
          </button>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className={`w-full shrink-0 lg:sticky lg:top-24 lg:w-72 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto lg:[&::-webkit-scrollbar]:hidden lg:[-ms-overflow-style:none] lg:[scrollbar-width:none] ${showMobileFilter ? 'block' : 'hidden lg:block'}`}>
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                availableFacilities={availableFacilities}
              />
          </div>

          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 hidden items-center justify-between lg:flex">
              <p className="text-sm text-slate-500 dark:text-gray-400">
                Menampilkan <span className="font-semibold text-slate-800 dark:text-white">{filteredKosts.length}</span> dari{' '}
                <span className="font-semibold text-slate-800 dark:text-white">{kosts.length}</span> kost
              </p>
            </div>

            {filteredKosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredKosts.map((kost) => (
                  <KostCard
                    key={kost.id}
                    kost={kost}
                    isFavorited={favorites.includes(kost.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-latte/50 bg-white py-20 text-center dark:border-white/5 dark:bg-slate-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="mb-4 h-16 w-16 text-brand-latte dark:text-gray-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <h3 className="mb-2 text-lg font-semibold text-slate-500 dark:text-gray-400">Tidak ada kost ditemukan</h3>
                <p className="text-sm text-slate-400 dark:text-gray-600">Coba ubah filter atau kata kunci pencarian Anda.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
    </PageTransition>
  );
}
