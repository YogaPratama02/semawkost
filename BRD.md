# Business Requirements Document (BRD)

**Nama Proyek:** Platform Promosi Kost (`KostHub` - Frontend-Only MVP)  
**Versi:** 2.1 (Disesuaikan dengan TypeScript & Next.js App Router)  

---

## 1. Ringkasan Eksekutif & Tujuan Proyek

Proyek ini bertujuan untuk membangun platform web katalog kost modern, interaktif, dan berkinerja tinggi berbasis **Frontend-Only** menggunakan **Next.js (App Router)**, **Tailwind CSS**, dan **TypeScript**. 

Seluruh data properti dikelola secara statis menggunakan file JSON lokal (`data/kosts.json`) yang diikat (*strictly typed*) menggunakan TypeScript interface. Pendekatan ini memangkas biaya backend/database hingga Rp 0 serta menjamin keamanan tipe data (*type safety*) dan keandalan kode saat pengembangan.

### Tujuan Utama:
* Membangun katalog promosi kost yang cepat diakses, responsif, dan ramah SEO.
* Menjamin ketahanan kode (*code robustness*) dan *developer experience* (DX) yang tinggi melalui sistem *type safety* TypeScript.
* Menghubungkan pencari kost secara langsung ke pemilik via WhatsApp tanpa hambatan pendaftaran akun.
* Meminimalkan biaya operasional (0 IDR hosting) dengan memanfaatkan *Static Site Generation* (SSG).

---

## 2. Target Pengguna (User Persona)

| Persona | Peran | Kebutuhan Utama |
| :--- | :--- | :--- |
| **Pencari Kost** | Mahasiswa / Pekerja | Mencari kost berdasarkan lokasi/harga/fasilitas, melihat foto detail, menyimpan daftar favorit, dan menghubungi pemilik via WhatsApp. |
| **Pemilik / Pengelola** | Landlord | Menampilkan info unit kost secara ringkas dan menerima calon penyewa langsung di WhatsApp. |
| **Admin Platform** | Developer / Operator | Meng-update data kost melalui file JSON statis yang tervalidasi oleh tipe data TypeScript. |

---

## 3. Ruang Lingkup Proyek (Scope of Work)

### In-Scope (Fase 1 - FE Only + TypeScript):
* **Katalog & Beranda Statis:** Halaman utama yang menampilkan grid daftar kost dari file `kosts.json` berbasis komponen React TypeScript (`.tsx`).
* **Pencarian & Filter Strongly-Typed:** Filter *client-side* berbasis TypeScript utility functions yang memproses pencarian berdasarkan rentang harga, lokasi, jenis gender (Putra/Putri/Campur), dan fasilitas.
* **Halaman Detail Unit (SSG):** Dibuat otomatis saat *build time* menggunakan `generateStaticParams()` Next.js dengan pengetikan parameter dinamis (`params: { slug: string }`).
* **Integrasi WhatsApp CTA:** Generasi otomatis tautan WhatsApp dengan pesan default terformat via helper function typed.
* **Fitur Favorit / Bookmark:** Menyimpan daftar kost incaran menggunakan `localStorage` browser dengan parsial pengetikan JSON.
* **Form Pasang Iklan (Type-Safe Form Handler):** Form input bagi pemilik kost baru yang memformat data input menjadi pesan teks WhatsApp Admin.

### Out-of-Scope:
* Database relasional/NoSQL.
* Sistem autentikasi pengguna (Login/Register).
* Panel Dashboard pengisian data berbasis web (CMS).
* Fitur *chat* internal dan sistem pembayaran online.

---

## 4. Persyaratan Fungsional & Teknikal

### 4.1. Pemrosesan Data & Type Safety
* **Kontrak Tipe Data (`types/kost.ts`):** Seluruh objek properti wajib mematuhi interface TypeScript yang telah ditentukan sebelum dapat di-render oleh komponen UI.
* **Real-time Search & Filter (Typed Utility):**
  * Pencarian teks universal pada field `title`, `location.city`, dan `location.address`.
  * Filter Enum/Union Type pada Kategori Gender (`'putra' | 'putri' | 'campur'`).
  * Filter fasilitas berbasis pemeriksaan array TypeScript (`string[]`).
  * *Sorting* berbasis komparasi numerik pada `priceMonthly`.

### 4.2. Halaman Detail & Integrasi WhatsApp
* **Static Page Generation:** Halaman `app/kost/[slug]/page.tsx` menggunakan `getKostBySlug(slug: string): Kost | undefined` untuk menjamin pencarian item aman dari *null/undefined error*.
* **Galeri Foto Component:** Slider/Carousel foto berbasis komponen TypeScript dengan *type props* eksplisit.
* **Direct WhatsApp Generator:** Helper function untuk merender URL WhatsApp:
  ```typescript
  function createWhatsAppLink(ownerPhone: string, kostTitle: string): string
  ```

### 4.3. Fitur LocalStorage Bookmark
* State Management berbasis React `useState` / `useEffect` dengan pengetikan array string ID kost (`string[]`).

---

## 5. Persyaratan Non-Fungsional & Spesifikasi Teknologi

* **Bahasa Pemrograman:** TypeScript (`strict: true` pada `tsconfig.json`).
* **Framework Frontend:** Next.js (App Router) versi terbaru.
* **Styling Framework:** Tailwind CSS.
* **Performa Ekstrem:** Menggunakan *Static Site Generation* (SSG). Target skor Google Lighthouse > 90 pada performa dan SEO.
* **Kualitas Kode:** Bebas dari tipe `any` (menggunakan strict typing) untuk mencegah *runtime error* di browser pengguna.
* **Zero Cost Hosting:** Siap di-deploy secara gratis di Vercel atau Netlify.

---

## 6. TypeScript Architecture & JSON Schema

### 6.1. Definisi Tipe Data (`types/kost.ts`)

```typescript
export type GenderCategory = 'putra' | 'putri' | 'campur';

export interface Location {
  city: string;
  address: string;
  googleMapsUrl: string;
}

export interface Owner {
  name: string;
  whatsapp: string; // Format: "628xxxxxxxxxx"
}

export interface Kost {
  id: string;
  slug: string;
  title: string;
  gender: GenderCategory;
  priceMonthly: number;
  location: Location;
  owner: Owner;
  facilities: string[];
  images: string[];
  isFeatured?: boolean;
}

export interface FilterState {
  searchQuery: string;
  gender: GenderCategory | 'all';
  maxPrice: number;
  facilities: string[];
}
```

### 6.2. Struktur File Data Statis (`data/kosts.json`)

```json
[
  {
    "id": "kost-001",
    "slug": "kost-mewah-depok",
    "title": "Kost Mewah Dekat UI Depok",
    "gender": "putra",
    "priceMonthly": 1700000,
    "location": {
      "city": "Depok",
      "address": "Jl. Akses UI No. 45, Kelapa Dua",
      "googleMapsUrl": "https://maps.google.com/?q=-6.3534,106.8381"
    },
    "owner": {
      "name": "Bpk. Ahmad",
      "whatsapp": "6281234567890"
    },
    "facilities": ["AC", "Wi-Fi", "Kamar Mandi Dalam", "Kasur Springbed"],
    "images": [
      "/images/kosts/kost-1-main.jpg",
      "/images/kosts/kost-1-room.jpg"
    ],
    "isFeatured": true
  }
]
```

---

## 7. Rencana Struktur Folder & Fase Pengembangan

### 7.1. Struktur Folder Project

```text
├── app/
│   ├── layout.tsx
│   ├── page.tsx                  // Katalog utama + Search & Filter
│   ├── kost/
│   │   └── [slug]/
│   │       └── page.tsx          // Halaman detail kost (SSG)
│   ├── pasang-iklan/
│   │   └── page.tsx              // Form generator pesan WA
│   └── favorit/
│       └── page.tsx              // List bookmark dari localStorage
├── components/
│   ├── KostCard.tsx
│   ├── SearchBar.tsx
│   ├── FilterSidebar.tsx
│   └── Navbar.tsx
├── data/
│   └── kosts.json                // Data statis kost
├── types/
│   └── kost.ts                   // TypeScript interface & types
├── utils/
│   └── filterKosts.ts            // Typed helper logic
└── public/
    └── images/                   // Folder aset foto
```

### 7.2. Roadmap Eksekusi

```
[Fase 1: TS Types & Data Setup] ➔ [Fase 2: Typed Filter & Komponen UI] ➔ [Fase 3: SSG Detail & LocalStorage] ➔ [Fase 4: Deployment Vercel]
```

1. **Fase 1 - Setup Project & TypeScript Interfaces (1 Hari):**
   * Setup Next.js App Router dengan TypeScript (`npx create-next-app@latest --typescript`).
   * Membuat file `types/kost.ts` dan `data/kosts.json`.
2. **Fase 2 - Komponen UI & Filter Logic (2 Hari):**
   * Membuat komponen React TypeScript (`KostCard.tsx`, `FilterSidebar.tsx`).
   * Mengembangkan fungsi filter typed di `utils/filterKosts.ts`.
3. **Fase 3 - Halaman Detail SSG & WhatsApp Direct (2 Hari):**
   * Pembuatan route `app/kost/[slug]/page.tsx` dengan `generateStaticParams`.
   * Integrasi helper WhatsApp dan fitur favorit via `localStorage`.
4. **Fase 4 - Testing Tipe Data & Deployment (1 Hari):**
   * Running `tsc --noEmit` untuk memastikan 0 error TypeScript.
   * Deployment ke **Vercel**.