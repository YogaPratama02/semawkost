'use client';

import Link from 'next/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 border-b border-brand-latte/50 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-peach shadow-lg shadow-brand-peach/25">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-slate-900">
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a.75.75 0 0 1 .091-.086L12 5.432Z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
            Semaw<span className="text-brand-peach">Kos</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-latte/40 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-brand-peach"
          >
            Beranda
          </Link>
          <Link
            href="/favorit"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-latte/40 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-brand-peach"
          >
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.723.723 0 0 1-.69 0l-.002-.001Z" />
              </svg>
              Favorit
            </span>
          </Link>

          <ThemeToggle />

          <Link
            href="/pasang-iklan"
            className="ml-2 rounded-lg bg-brand-peach px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg shadow-brand-peach/25 transition-all hover:bg-brand-latte hover:shadow-brand-latte/40"
          >
            Pasang Iklan
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-brand-latte/40 hover:text-slate-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-brand-latte/60 px-4 pb-4 dark:border-white/5 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-latte/40 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              Beranda
            </Link>
            <Link
              href="/favorit"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-brand-latte/40 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
            >
              ❤️ Favorit
            </Link>
            <Link
              href="/pasang-iklan"
              onClick={() => setIsOpen(false)}
              className="mt-1 rounded-lg bg-brand-peach px-4 py-2.5 text-center text-sm font-semibold text-slate-900"
            >
              Pasang Iklan
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
