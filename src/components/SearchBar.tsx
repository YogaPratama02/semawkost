'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5 text-brand-peach/60 dark:text-gray-500"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari kost berdasarkan nama, kota, atau alamat..."
        className="w-full rounded-xl border border-brand-latte/60 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition-all focus:border-brand-peach focus:outline-none focus:ring-2 focus:ring-brand-peach/20 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder-gray-500 dark:shadow-none dark:focus:border-brand-peach/50 dark:focus:ring-brand-peach/20"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-brand-peach dark:text-gray-500 dark:hover:text-gray-300"
          aria-label="Hapus pencarian"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
