'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Kost } from '@/types/kost';
import KostCard from '@/components/KostCard';
import kostsData from '@/data/kosts.json';

const FAVORITES_KEY = 'kosthub_favorites';

export default function FavoritPage() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
      // Ignore
    }
    setIsLoaded(true);
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
  const favoritedKosts = kosts.filter((k) => favorites.includes(k.id));

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-yellow border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="border-b border-brand-orange/20 bg-gradient-to-b from-brand-salmon/10 to-white dark:border-white/5 dark:from-brand-salmon/5 dark:to-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-salmon/15 dark:bg-brand-salmon/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-brand-salmon dark:text-brand-salmon">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">Kost Favorit</h1>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                {favoritedKosts.length > 0
                  ? `${favoritedKosts.length} kost tersimpan`
                  : 'Belum ada kost yang disimpan'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {favoritedKosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoritedKosts.map((kost) => (
              <KostCard
                key={kost.id}
                kost={kost}
                isFavorited={true}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-orange/20 bg-white py-24 text-center dark:border-white/5 dark:bg-gray-900/30">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="mb-4 h-20 w-20 text-brand-orange/40 dark:text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <h3 className="mb-2 text-xl font-semibold text-slate-500 dark:text-gray-400">Belum ada favorit</h3>
            <p className="mb-6 max-w-sm text-sm text-slate-400 dark:text-gray-600">
              Tekan tombol ❤️ pada kartu kost di beranda untuk menambahkan ke daftar favorit Anda.
            </p>
            <Link
              href="/"
              className="rounded-xl bg-brand-salmon px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-salmon/25 transition-all hover:shadow-brand-salmon/40 hover:brightness-110"
            >
              Jelajahi Kost
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
