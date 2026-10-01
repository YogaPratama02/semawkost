import { Kost, FilterState } from '@/types/kost';

/**
 * Memfilter array Kost berdasarkan search query, gender, kampus terdekat, dan fasilitas.
 */
export function filterKosts(kosts: Kost[], filters: FilterState): Kost[] {
  return kosts.filter((kost) => {
    // Filter berdasarkan search query (title, city, address)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesSearch =
        kost.title.toLowerCase().includes(query) ||
        kost.location.city.toLowerCase().includes(query) ||
        kost.location.address.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Filter berdasarkan gender
    if (filters.gender !== 'all' && kost.gender !== filters.gender) {
      return false;
    }

    // Filter berdasarkan kampus terdekat
    if (filters.nearCampus && filters.nearCampus !== 'all') {
      if (kost.nearCampus !== filters.nearCampus) {
        return false;
      }
    }

    // Filter berdasarkan perumahan / cluster
    if (filters.clusterName && filters.clusterName !== 'all') {
      if (kost.location.clusterName !== filters.clusterName) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Membuat URL WhatsApp dengan pesan default terformat.
 */
export function createWhatsAppLink(ownerPhone: string, kostTitle: string): string {
  const message = encodeURIComponent(
    `Halo, saya tertarik dengan "${kostTitle}" yang terdaftar di SemawKos. Apakah unit masih tersedia? Terima kasih.`
  );
  return `https://wa.me/${ownerPhone}?text=${message}`;
}

/**
 * Format angka ke Rupiah.
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
