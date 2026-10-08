'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Kost } from '@/types/kost';
import { createWhatsAppLink, formatRupiah } from '@/utils/filterKosts';

const FAVORITES_KEY = 'kosthub_favorites';

const genderConfig: Record<Kost['gender'], { label: string; light: string; dark: string }> = {
  putra: {
    label: 'Kost Putra',
    light: 'bg-brand-sky/50 text-slate-800 ring-1 ring-brand-sky/60',
    dark: 'dark:bg-brand-sky/15 dark:text-brand-sky dark:ring-brand-sky/30',
  },
  putri: {
    label: 'Kost Putri',
    light: 'bg-brand-peach/30 text-slate-800 ring-1 ring-brand-peach/40',
    dark: 'dark:bg-brand-peach/15 dark:text-brand-peach dark:ring-brand-peach/30',
  },
  campur: {
    label: 'Kost Campur',
    light: 'bg-brand-sky/50 text-slate-800 ring-1 ring-brand-sky/60',
    dark: 'dark:bg-brand-sky/15 dark:text-brand-sky dark:ring-brand-sky/30',
  },
};

const campusFullNames: Record<string, string> = {
  UB: 'Universitas Brawijaya (UB)',
  UM: 'Universitas Negeri Malang (UM)',
  UMM: 'Universitas Muhammadiyah Malang (UMM)',
  POLINEMA: 'Politeknik Negeri Malang (Polinema)',
  UIN: 'UIN Maulana Malik Ibrahim',
};

export default function KostDetailClient({ kost }: { kost: Kost }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    thumbnailRefs.current[activeImage]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeImage]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setIsFavorited(parsed.includes(kost.id));
        }
      }
    } catch {
      // Ignore
    }
  }, [kost.id]);

  const toggleFavorite = () => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      let favorites: string[] = [];
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.every((item): item is string => typeof item === 'string')) {
          favorites = parsed;
        }
      }

      const updated = favorites.includes(kost.id)
        ? favorites.filter((f) => f !== kost.id)
        : [...favorites, kost.id];

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      setIsFavorited(!isFavorited);
    } catch {
      // Ignore
    }
  };

  const badge = genderConfig[kost.gender];
  const whatsAppUrl = createWhatsAppLink(kost.owner.whatsapp, kost.title);
  const isRoomFull = kost.availableRooms === 0;

  return (
    <div className="min-h-screen overflow-x-hidden w-full max-w-full">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 md:px-8 mb-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-gray-500">
          <Link href="/" className="transition-colors hover:text-brand-peach dark:hover:text-brand-peach">Beranda</Link>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
          <span className="text-brand-peach font-semibold">{kost.title}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Gallery */}
          <div className="lg:col-span-3 w-full max-w-full overflow-hidden">
            {/* Main Image */}
            <div className="relative mb-3 w-full aspect-[4/3] sm:aspect-video overflow-hidden rounded-2xl bg-brand-latte/30 dark:bg-slate-800">
              <Image
                src={kost.images[activeImage]}
                alt={`${kost.title} - foto ${activeImage + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover w-full h-full"
                priority
                unoptimized
              />

              {/* Nav arrows */}
              {kost.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((prev) => (prev === 0 ? kost.images.length - 1 : prev - 1))}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                    aria-label="Foto sebelumnya"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveImage((prev) => (prev === kost.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
                    aria-label="Foto berikutnya"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-3 right-3 rounded-lg bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                {activeImage + 1} / {kost.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex w-full overflow-x-auto gap-2 md:gap-4 py-2 mt-2 snap-x snap-mandatory scrollbar-hide">
              {kost.images.map((img, i) => (
                <button
                  key={i}
                  ref={(el) => { thumbnailRefs.current[i] = el; }}
                  onClick={() => setActiveImage(i)}
                  className={`flex-shrink-0 w-20 h-16 md:w-32 md:h-24 snap-center relative rounded-lg md:rounded-xl overflow-hidden cursor-pointer transition-all ${
                    i === activeImage
                      ? 'ring-2 ring-brand-peach ring-offset-2 ring-offset-brand-cream dark:ring-offset-slate-950'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    sizes="112px"
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-2">
            <div className="sticky top-20 space-y-6">
              {/* Title & Badge */}
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.light} ${badge.dark}`}>
                    {badge.label}
                  </span>
                  {kost.isFeatured && (
                    <span className="flex items-center gap-1 rounded-full bg-brand-peach px-3 py-1 text-xs font-semibold text-slate-900">
                      ⭐ Unggulan
                    </span>
                  )}
                </div>
                <h1 className="mb-2 text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">{kost.title}</h1>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-brand-peach/70 dark:text-gray-500">
                    <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{kost.location.address}, {kost.location.city}</span>
                </div>
                {kost.location.clusterName && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-slate-400 dark:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0">
                      <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs">{kost.location.clusterName}</span>
                  </div>
                )}
              </div>

              {/* Price Card */}
              <div className="rounded-xl border border-brand-latte/50 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
                <p className="mb-1 text-sm text-slate-500 dark:text-gray-400">Harga per bulan</p>
                <p className="text-3xl font-bold text-slate-800 dark:text-brand-peach">
                  {formatRupiah(kost.priceMonthly)}
                </p>
              </div>

              {/* Campus & Room Availability */}
              <div className="rounded-xl border border-brand-latte/50 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
                <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-white">Info Kampus & Ketersediaan</h2>
                <div className="space-y-3">
                  {/* Near Campus */}
                  {kost.nearCampus && (
                    <div className="flex items-center gap-3 rounded-lg bg-brand-cream px-3 py-2.5 dark:bg-white/5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-brand-peach dark:text-brand-peach">
                        <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-xs text-slate-400 dark:text-gray-500">Kampus Terdekat</p>
                        <p className="text-sm font-medium text-slate-700 dark:text-gray-300">{campusFullNames[kost.nearCampus] ?? kost.nearCampus}</p>
                      </div>
                    </div>
                  )}

                  {/* Room Availability */}
                  <div className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${
                    isRoomFull
                      ? 'bg-red-50 dark:bg-red-500/10'
                      : 'bg-brand-cream dark:bg-white/5'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 shrink-0 ${
                      isRoomFull ? 'text-red-500' : 'text-brand-sky dark:text-brand-sky'
                    }`}>
                      <path d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h9.454a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73Zm3.068-5.852A1.25 1.25 0 0 1 5.273 4.5h9.454a1.25 1.25 0 0 1 1.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 0 0-.86.49l-.606 1.02a1 1 0 0 1-.86.49H8.326a1 1 0 0 1-.86-.49l-.606-1.02A1 1 0 0 0 6 11H2.53l.015-.062 1.523-5.52Z" />
                    </svg>
                    <div>
                      <p className="text-xs text-slate-400 dark:text-gray-500">Ketersediaan Kamar</p>
                      {isRoomFull ? (
                        <p className="text-sm font-semibold text-red-600 dark:text-red-400">Kamar Penuh</p>
                      ) : (
                        <p className="text-sm font-medium text-slate-700 dark:text-gray-300">
                          Sisa <span className="font-semibold text-emerald-600 dark:text-emerald-400">{kost.availableRooms}</span> kamar tersedia
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div className="rounded-xl border border-brand-latte/50 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
                <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-white">Fasilitas</h2>
                <div className="grid grid-cols-2 gap-2.5">
                  {kost.facilities.map((facility) => (
                    <div key={facility} className="flex items-center gap-2.5 rounded-lg bg-brand-cream px-3 py-2.5 dark:bg-white/5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-brand-peach dark:text-brand-peach">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-slate-700 dark:text-gray-300">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Owner Info */}
              <div className="rounded-xl border border-brand-latte/50 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
                <h2 className="mb-3 text-lg font-semibold text-slate-800 dark:text-white">Pemilik</h2>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-peach/20 text-lg font-semibold text-slate-800 dark:bg-brand-peach/15 dark:text-brand-peach">
                    {kost.owner.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-white">{kost.owner.name}</p>
                    <p className="text-sm text-slate-500 dark:text-gray-500">Pemilik Kost</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="rounded-xl border border-brand-latte/50 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
                <h2 className="mb-3 text-lg font-semibold text-slate-800 dark:text-white">Lokasi</h2>
                <p className="mb-1 text-sm text-slate-500 dark:text-gray-400">{kost.location.address}, {kost.location.city}</p>
                {kost.location.clusterName && (
                  <div className="mb-4 flex items-center gap-1.5 text-slate-400 dark:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
                      <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-medium">{kost.location.clusterName}</span>
                  </div>
                )}
                {!kost.location.clusterName && <div className="mb-4" />}
                <a
                  href={kost.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-brand-cream px-4 py-3 text-sm font-medium text-slate-700 ring-1 ring-brand-latte/60 transition-all hover:bg-brand-latte/40 hover:text-slate-900 dark:bg-white/5 dark:text-gray-300 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-brand-peach dark:text-brand-peach">
                    <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                  </svg>
                  Buka di Google Maps
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                {isRoomFull ? (
                  <div className="flex flex-col items-center gap-2 rounded-xl bg-gray-100 px-6 py-4 dark:bg-slate-800/60">
                    <span className="flex items-center justify-center gap-2.5 text-base font-semibold text-gray-400 dark:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.82.487 3.53 1.338 5.005L2 22l5.233-1.237A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm-1.2 14.5a7.12 7.12 0 0 1-3.6-1l-.25-.15-2.6.68.7-2.55-.16-.26a7.06 7.06 0 0 1-1.1-3.82c0-3.92 3.2-7.12 7.12-7.12 1.9 0 3.68.74 5.02 2.08a7.07 7.07 0 0 1 2.08 5.04c0 3.92-3.18 7.1-7.1 7.1h-.01Zm3.9-5.32c-.21-.11-1.26-.62-1.46-.69-.2-.07-.34-.11-.48.11-.14.21-.55.69-.67.83-.12.14-.25.16-.46.05a5.8 5.8 0 0 1-1.71-1.06 6.41 6.41 0 0 1-1.18-1.47c-.12-.21-.01-.33.09-.43.1-.1.21-.26.32-.39.11-.14.14-.23.21-.39.07-.14.04-.28-.02-.39-.07-.11-.48-1.14-.65-1.56-.17-.41-.35-.36-.48-.36h-.41a.79.79 0 0 0-.57.27c-.2.21-.74.73-.74 1.77s.76 2.05.86 2.19c.11.14 1.5 2.29 3.63 3.21.51.22.9.35 1.21.45.51.16.97.14 1.34.08.41-.06 1.26-.51 1.44-1.01.18-.5.18-.92.12-1.01-.05-.09-.2-.14-.41-.25Z" />
                      </svg>
                      Hubungi Pemilik via WhatsApp
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-500/20 dark:text-red-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                      Kamar Saat Ini Penuh
                    </span>
                  </div>
                ) : (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 rounded-xl bg-brand-peach px-6 py-4 text-base font-semibold text-slate-900 shadow-lg shadow-brand-peach/20 transition-all hover:bg-brand-latte hover:shadow-brand-latte/30"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.82.487 3.53 1.338 5.005L2 22l5.233-1.237A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm-1.2 14.5a7.12 7.12 0 0 1-3.6-1l-.25-.15-2.6.68.7-2.55-.16-.26a7.06 7.06 0 0 1-1.1-3.82c0-3.92 3.2-7.12 7.12-7.12 1.9 0 3.68.74 5.02 2.08a7.07 7.07 0 0 1 2.08 5.04c0 3.92-3.18 7.1-7.1 7.1h-.01Zm3.9-5.32c-.21-.11-1.26-.62-1.46-.69-.2-.07-.34-.11-.48.11-.14.21-.55.69-.67.83-.12.14-.25.16-.46.05a5.8 5.8 0 0 1-1.71-1.06 6.41 6.41 0 0 1-1.18-1.47c-.12-.21-.01-.33.09-.43.1-.1.21-.26.32-.39.11-.14.14-.23.21-.39.07-.14.04-.28-.02-.39-.07-.11-.48-1.14-.65-1.56-.17-.41-.35-.36-.48-.36h-.41a.79.79 0 0 0-.57.27c-.2.21-.74.73-.74 1.77s.76 2.05.86 2.19c.11.14 1.5 2.29 3.63 3.21.51.22.9.35 1.21.45.51.16.97.14 1.34.08.41-.06 1.26-.51 1.44-1.01.18-.5.18-.92.12-1.01-.05-.09-.2-.14-.41-.25Z" />
                    </svg>
                    Hubungi Pemilik via WhatsApp
                  </a>
                )}
                <button
                  onClick={toggleFavorite}
                  className={`flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all ${
                    isFavorited
                      ? 'bg-brand-peach/15 text-slate-800 ring-1 ring-brand-peach/30 hover:bg-brand-peach/25 dark:bg-brand-peach/15 dark:text-brand-peach dark:ring-brand-peach/30 dark:hover:bg-brand-peach/25'
                      : 'bg-brand-cream text-slate-600 ring-1 ring-brand-latte/60 hover:bg-brand-latte/40 hover:text-slate-800 dark:bg-white/5 dark:text-gray-300 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={isFavorited ? 0 : 2} className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                  {isFavorited ? 'Hapus dari Favorit' : 'Simpan ke Favorit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
