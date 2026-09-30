'use client';

import { GenderCategory, FilterState } from '@/types/kost';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableFacilities: string[];
}

const genderOptions: { value: GenderCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'putra', label: 'Putra' },
  { value: 'putri', label: 'Putri' },
  { value: 'campur', label: 'Campur' },
];

const campusOptions = [
  { value: 'all', label: 'Semua Kampus' },
  { value: 'UB', label: 'Universitas Brawijaya (UB)' },
  { value: 'UM', label: 'Universitas Negeri Malang (UM)' },
  { value: 'UMM', label: 'Universitas Muhammadiyah Malang (UMM)' },
  { value: 'POLINEMA', label: 'Politeknik Negeri Malang (Polinema)' },
  { value: 'UIN', label: 'UIN Maulana Malik Ibrahim' },
];

export default function FilterSidebar({ filters, onFilterChange, availableFacilities }: FilterSidebarProps) {
  const handleGenderChange = (gender: GenderCategory | 'all') => {
    onFilterChange({ ...filters, gender });
  };

  const handleCampusChange = (nearCampus: string) => {
    onFilterChange({ ...filters, nearCampus });
  };

  const handleFacilityToggle = (facility: string) => {
    const updated = filters.facilities.includes(facility)
      ? filters.facilities.filter((f) => f !== facility)
      : [...filters.facilities, facility];
    onFilterChange({ ...filters, facilities: updated });
  };

  const handleReset = () => {
    onFilterChange({
      searchQuery: filters.searchQuery,
      gender: 'all',
      nearCampus: 'all',
      facilities: [],
    });
  };

  const activeFilterCount =
    (filters.gender !== 'all' ? 1 : 0) +
    (filters.nearCampus && filters.nearCampus !== 'all' ? 1 : 0) +
    filters.facilities.length;

  return (
    <aside className="rounded-2xl border border-brand-latte/50 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-slate-900 dark:shadow-none">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-brand-peach dark:text-brand-peach">
            <path d="M17 2.75a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0v-5.5ZM17 15.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5ZM3.75 15a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM4.5 2.75a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0v-5.5ZM10 11a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0v-5.5A.75.75 0 0 1 10 11ZM10.75 2.75a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0v-1.5ZM10 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.75 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM16.25 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
          </svg>
          Filter
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-peach text-xs font-bold text-slate-900">
              {activeFilterCount}
            </span>
          )}
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={handleReset}
            className="text-xs font-medium text-brand-peach transition-colors hover:text-brand-peach/70 dark:text-brand-peach dark:hover:text-brand-peach/70"
          >
            Reset
          </button>
        )}
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-slate-500 dark:text-gray-400">Tipe Kost</h3>
        <div className="flex flex-wrap gap-2">
          {genderOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleGenderChange(option.value)}
              className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all ${
                filters.gender === option.value
                  ? 'bg-brand-peach text-slate-900 shadow-md shadow-brand-peach/20'
                  : 'bg-brand-cream text-slate-600 ring-1 ring-brand-latte/60 hover:bg-brand-latte/40 hover:text-slate-800 dark:bg-white/5 dark:text-gray-400 dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Campus Filter */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-medium text-slate-500 dark:text-gray-400">Kampus Terdekat (Malang)</h3>
        <div className="flex flex-col gap-1.5">
          {campusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleCampusChange(option.value)}
              className={`rounded-lg px-3.5 py-2 text-left text-sm font-medium transition-all ${
                filters.nearCampus === option.value
                  ? 'bg-brand-peach/15 text-slate-800 ring-1 ring-brand-peach/30 dark:bg-brand-peach/15 dark:text-brand-peach dark:ring-brand-peach/30'
                  : 'text-slate-500 hover:bg-brand-latte/30 hover:text-slate-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities Filter */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-slate-500 dark:text-gray-400">Fasilitas</h3>
        <div className="flex flex-col gap-2">
          {availableFacilities.map((facility) => (
            <label
              key={facility}
              className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-brand-latte/30 dark:hover:bg-white/5"
            >
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                  filters.facilities.includes(facility)
                    ? 'border-brand-peach bg-brand-peach text-slate-900'
                    : 'border-brand-latte bg-white group-hover:border-brand-peach/50 dark:border-white/20 dark:bg-white/5 dark:group-hover:border-white/30'
                }`}
              >
                {filters.facilities.includes(facility) && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={filters.facilities.includes(facility)}
                onChange={() => handleFacilityToggle(facility)}
                className="sr-only"
              />
              <span className={`text-sm ${filters.facilities.includes(facility) ? 'text-slate-800 font-medium dark:text-white' : 'text-slate-500 dark:text-gray-400'}`}>
                {facility}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
