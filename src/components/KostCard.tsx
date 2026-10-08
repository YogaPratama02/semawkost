'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Kost } from '@/types/kost';
import { formatRupiah } from '@/utils/filterKosts';

interface KostCardProps {
  kost: Kost;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
}

const genderConfig: Record<Kost['gender'], { label: string; className: string }> = {
  putra: {
    label: 'Putra',
    className: 'bg-brand-sky text-slate-800',
  },
  putri: {
    label: 'Putri',
    className: 'bg-brand-peach text-slate-900',
  },
  campur: {
    label: 'Campur',
    className: 'bg-brand-sky text-slate-800',
  },
};

function RoomBadge({ availableRooms }: { availableRooms: number }) {
  if (availableRooms === 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-0.5 text-xs font-semibold text-red-600 ring-1 ring-red-500/25 dark:bg-red-500/20 dark:text-red-400 dark:ring-red-500/30">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        Kamar Penuh
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-sky/60 px-2.5 py-0.5 text-xs font-semibold text-slate-700 ring-1 ring-brand-sky/80 dark:bg-brand-sky/15 dark:text-brand-sky dark:ring-brand-sky/30">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-sky dark:bg-brand-sky" />
      Sisa {availableRooms} Kamar
    </span>
  );
}

export default function KostCard({ kost, isFavorited, onToggleFavorite }: KostCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const badge = genderConfig[kost.gender];

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-latte/50 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] dark:border-white/10 dark:bg-slate-900 dark:shadow-xl dark:shadow-black/20">
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-latte/30 dark:bg-slate-800">
        <Image
          src={kost.images[imgIndex]}
          alt={kost.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />

        {/* Carousel dots */}
        {kost.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {kost.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setImgIndex(i);
                }}
                className={`h-2 rounded-full transition-all ${
                  i === imgIndex ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Lihat foto ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Carousel arrows */}
        {kost.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                setImgIndex((prev) => (prev === 0 ? kost.images.length - 1 : prev - 1));
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/60"
              aria-label="Foto sebelumnya"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setImgIndex((prev) => (prev === kost.images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:bg-black/60"
              aria-label="Foto berikutnya"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        {/* Gender badge */}
        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${badge.className}`}>
          {badge.label}
        </span>

        {/* Featured badge */}
        {kost.isFeatured && (
          <span className="absolute right-12 top-3 flex items-center gap-1 rounded-full bg-brand-peach px-3 py-1 text-xs font-semibold text-slate-900 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
              <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
            </svg>
            Unggulan
          </span>
        )}

        {/* Bookmark button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(kost.id);
          }}
          className="absolute right-3 top-3 rounded-full bg-black/40 p-2 backdrop-blur-sm transition-all hover:bg-black/60"
          aria-label={isFavorited ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorited ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isFavorited ? 0 : 2}
            className={`h-5 w-5 transition-colors ${isFavorited ? 'text-brand-peach' : 'text-white'}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </button>
      </div>

      {/* Card Content */}
      <Link href={`/kost/${kost.slug}`} className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-snug text-slate-800 transition-colors group-hover:text-brand-peach dark:text-white dark:group-hover:text-brand-peach">
            {kost.title}
          </h3>
        </div>

        <div className="mb-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-brand-peach/70 dark:text-gray-500">
            <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
          </svg>
          {kost.location.address}, {kost.location.city}
        </div>

        {/* Cluster / Perumahan name */}
        {kost.location.clusterName && (
          <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
            </svg>
            {kost.location.clusterName}
          </div>
        )}

        {/* Room availability badge */}
        <div className="mb-3">
          <RoomBadge availableRooms={kost.availableRooms} />
        </div>

        {/* Facilities preview */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {kost.facilities.slice(0, 3).map((facility) => (
            <span
              key={facility}
              className="rounded-md bg-brand-cream px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-brand-latte/60 dark:bg-white/5 dark:text-gray-300 dark:ring-white/10"
            >
              {facility}
            </span>
          ))}
          {kost.facilities.length > 3 && (
            <span className="rounded-md bg-brand-sky/30 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-brand-sky/10 dark:text-brand-sky">
              +{kost.facilities.length - 3} lainnya
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-auto border-t border-brand-latte/40 pt-4 dark:border-white/5">
          <div className="mb-3">
            <p className="text-2xl font-bold text-slate-800 dark:text-brand-peach">
              {formatRupiah(kost.priceMonthly)}
            </p>
            <p className="text-xs text-slate-400 dark:text-gray-500">per bulan</p>
          </div>
          <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-peach px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-md shadow-brand-peach/15 transition-all active:scale-95 group-hover:bg-brand-latte group-hover:shadow-lg group-hover:shadow-brand-latte/20 dark:bg-brand-peach dark:text-slate-900 dark:group-hover:bg-brand-latte">
            Lihat Detail
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-0.5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </Link>
    </div>
  );
}
