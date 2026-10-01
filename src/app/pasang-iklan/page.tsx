'use client';

import { useState } from 'react';
import type { GenderCategory } from '@/types/kost';

interface FormData {
  namaKost: string;
  alamat: string;
  kota: string;
  gender: GenderCategory;
  harga: string;
  fasilitas: string;
  namaPemilik: string;
  whatsapp: string;
}

const ADMIN_WHATSAPP = '6281311570549';

export default function PasangIklanPage() {
  const [form, setForm] = useState<FormData>({
    namaKost: '',
    alamat: '',
    kota: '',
    gender: 'campur',
    harga: '',
    fasilitas: '',
    namaPemilik: '',
    whatsapp: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!form.namaKost.trim()) newErrors.namaKost = 'Nama kost wajib diisi';
    if (!form.alamat.trim()) newErrors.alamat = 'Alamat wajib diisi';
    if (!form.kota.trim()) newErrors.kota = 'Kota wajib diisi';
    if (!form.harga.trim()) newErrors.harga = 'Harga wajib diisi';
    if (!form.namaPemilik.trim()) newErrors.namaPemilik = 'Nama pemilik wajib diisi';
    if (!form.whatsapp.trim()) newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    else if (!/^628\d{8,12}$/.test(form.whatsapp))
      newErrors.whatsapp = 'Format: 628xxxxxxxxxx';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const genderLabel: Record<GenderCategory, string> = {
      putra: 'Putra',
      putri: 'Putri',
      campur: 'Campur',
    };

    const message = `Halo Admin, saya ingin bertanya mengenai pemasangan iklan kost di website ini. Berikut detailnya:

📋 *PENGAJUAN KOST BARU - SemawKos*

🏠 *Nama Kost:* ${form.namaKost}
📍 *Alamat:* ${form.alamat}, ${form.kota}
👤 *Tipe:* ${genderLabel[form.gender]}
💰 *Harga/bulan:* Rp ${Number(form.harga).toLocaleString('id-ID')}
✨ *Fasilitas:* ${form.fasilitas || '-'}

👨‍💼 *Nama Pemilik:* ${form.namaPemilik}
📱 *WhatsApp Pemilik:* ${form.whatsapp}

_Dikirim melalui platform SemawKos_`;

    const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputBaseClass =
    'w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 shadow-sm transition-all focus:outline-none focus:ring-2 dark:bg-slate-800/50 dark:text-white dark:placeholder-gray-500 dark:shadow-none';
  const inputNormalBorder =
    'border-brand-latte/60 focus:border-brand-peach focus:ring-brand-latte/50 dark:border-white/10 dark:focus:border-brand-latte/50 dark:focus:ring-brand-latte/40';
  const inputErrorBorder =
    'border-rose-400 focus:ring-rose-500/20 dark:border-rose-500 dark:focus:ring-rose-500/20';

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-brand-latte/50 bg-gradient-to-b from-brand-cream/50 to-white dark:border-white/5 dark:from-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-latte/40 dark:bg-brand-latte/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-brand-peach dark:text-brand-latte">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white sm:text-3xl">Pasang Iklan Kost</h1>
              <p className="text-sm text-slate-500 dark:text-gray-400">
                Isi formulir di bawah lalu kirim ke Admin via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Info Kost */}
          <div className="rounded-2xl border border-brand-latte/50 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none dark:backdrop-blur-sm">
            <h2 className="mb-5 text-lg font-semibold text-slate-800 dark:text-white">Informasi Kost</h2>
            <div className="space-y-4">
              {/* Nama Kost */}
              <div>
                <label htmlFor="namaKost" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">
                  Nama Kost <span className="text-brand-peach dark:text-brand-peach">*</span>
                </label>
                <input
                  id="namaKost"
                  name="namaKost"
                  type="text"
                  value={form.namaKost}
                  onChange={handleChange}
                  placeholder="Contoh: Kost Mewah Dekat UI"
                  className={`${inputBaseClass} ${errors.namaKost ? inputErrorBorder : inputNormalBorder}`}
                />
                {errors.namaKost && <p className="mt-1 text-xs text-rose-500 dark:text-rose-400">{errors.namaKost}</p>}
              </div>

              {/* Alamat */}
              <div>
                <label htmlFor="alamat" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">
                  Alamat Lengkap <span className="text-brand-peach dark:text-brand-peach">*</span>
                </label>
                <textarea
                  id="alamat"
                  name="alamat"
                  value={form.alamat}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Contoh: Jl. Akses UI No. 45, Kelapa Dua"
                  className={`${inputBaseClass} ${errors.alamat ? inputErrorBorder : inputNormalBorder}`}
                />
                {errors.alamat && <p className="mt-1 text-xs text-rose-500 dark:text-rose-400">{errors.alamat}</p>}
              </div>

              {/* Kota */}
              <div>
                <label htmlFor="kota" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">
                  Kota <span className="text-brand-peach dark:text-brand-peach">*</span>
                </label>
                <input
                  id="kota"
                  name="kota"
                  type="text"
                  value={form.kota}
                  onChange={handleChange}
                  placeholder="Contoh: Depok"
                  className={`${inputBaseClass} ${errors.kota ? inputErrorBorder : inputNormalBorder}`}
                />
                {errors.kota && <p className="mt-1 text-xs text-rose-500 dark:text-rose-400">{errors.kota}</p>}
              </div>

              {/* Gender & Harga */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="gender" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">
                    Tipe Kost
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className={`${inputBaseClass} ${inputNormalBorder}`}
                  >
                    <option value="putra">Putra</option>
                    <option value="putri">Putri</option>
                    <option value="campur">Campur</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="harga" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">
                    Harga / Bulan (Rp) <span className="text-brand-peach dark:text-brand-peach">*</span>
                  </label>
                  <input
                    id="harga"
                    name="harga"
                    type="number"
                    value={form.harga}
                    onChange={handleChange}
                    placeholder="Contoh: 1500000"
                    className={`${inputBaseClass} ${errors.harga ? inputErrorBorder : inputNormalBorder}`}
                  />
                  {errors.harga && <p className="mt-1 text-xs text-rose-500 dark:text-rose-400">{errors.harga}</p>}
                </div>
              </div>

              {/* Fasilitas */}
              <div>
                <label htmlFor="fasilitas" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">
                  Fasilitas (pisahkan dengan koma)
                </label>
                <input
                  id="fasilitas"
                  name="fasilitas"
                  type="text"
                  value={form.fasilitas}
                  onChange={handleChange}
                  placeholder="Contoh: AC, Wi-Fi, Kamar Mandi Dalam, Kasur"
                  className={`${inputBaseClass} ${inputNormalBorder}`}
                />
              </div>
            </div>
          </div>

          {/* Info Pemilik */}
          <div className="rounded-2xl border border-brand-latte/50 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/60 dark:shadow-none dark:backdrop-blur-sm">
            <h2 className="mb-5 text-lg font-semibold text-slate-800 dark:text-white">Informasi Pemilik</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="namaPemilik" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">
                  Nama Pemilik <span className="text-brand-peach dark:text-brand-peach">*</span>
                </label>
                <input
                  id="namaPemilik"
                  name="namaPemilik"
                  type="text"
                  value={form.namaPemilik}
                  onChange={handleChange}
                  placeholder="Contoh: Bpk. Ahmad"
                  className={`${inputBaseClass} ${errors.namaPemilik ? inputErrorBorder : inputNormalBorder}`}
                />
                {errors.namaPemilik && <p className="mt-1 text-xs text-rose-500 dark:text-rose-400">{errors.namaPemilik}</p>}
              </div>

              <div>
                <label htmlFor="whatsapp" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-gray-300">
                  Nomor WhatsApp <span className="text-brand-peach dark:text-brand-peach">*</span>
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="text"
                  value={form.whatsapp}
                  onChange={handleChange}
                  placeholder="Format: 628xxxxxxxxxx"
                  className={`${inputBaseClass} ${errors.whatsapp ? inputErrorBorder : inputNormalBorder}`}
                />
                {errors.whatsapp && <p className="mt-1 text-xs text-rose-500 dark:text-rose-400">{errors.whatsapp}</p>}
              </div>
            </div>
          </div>

          {/* Info Disclaimer */}
          <div className="rounded-xl border border-brand-latte/50 bg-brand-latte/10 p-4 dark:border-brand-latte/50 dark:bg-brand-latte/10">
            <div className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="mt-0.5 h-5 w-5 shrink-0 text-brand-peach dark:text-brand-peach">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-brand-peach dark:text-brand-peach">Cara Kerja</p>
                <p className="mt-1 text-xs text-brand-peach/70 dark:text-brand-peach/60">
                  Setelah klik &quot;Kirim&quot;, Anda akan diarahkan ke WhatsApp Admin dengan pesan
                  berformat data kost otomatis. Admin akan memproses dan menambahkan kost Anda ke platform.
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-peach px-6 py-4 text-base font-semibold text-slate-900 shadow-lg shadow-brand-peach/20 transition-all hover:shadow-brand-peach/30 hover:brightness-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 1.82.487 3.53 1.338 5.005L2 22l5.233-1.237A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm-1.2 14.5a7.12 7.12 0 0 1-3.6-1l-.25-.15-2.6.68.7-2.55-.16-.26a7.06 7.06 0 0 1-1.1-3.82c0-3.92 3.2-7.12 7.12-7.12 1.9 0 3.68.74 5.02 2.08a7.07 7.07 0 0 1 2.08 5.04c0 3.92-3.18 7.1-7.1 7.1h-.01Zm3.9-5.32c-.21-.11-1.26-.62-1.46-.69-.2-.07-.34-.11-.48.11-.14.21-.55.69-.67.83-.12.14-.25.16-.46.05a5.8 5.8 0 0 1-1.71-1.06 6.41 6.41 0 0 1-1.18-1.47c-.12-.21-.01-.33.09-.43.1-.1.21-.26.32-.39.11-.14.14-.23.21-.39.07-.14.04-.28-.02-.39-.07-.11-.48-1.14-.65-1.56-.17-.41-.35-.36-.48-.36h-.41a.79.79 0 0 0-.57.27c-.2.21-.74.73-.74 1.77s.76 2.05.86 2.19c.11.14 1.5 2.29 3.63 3.21.51.22.9.35 1.21.45.51.16.97.14 1.34.08.41-.06 1.26-.51 1.44-1.01.18-.5.18-.92.12-1.01-.05-.09-.2-.14-.41-.25Z" />
            </svg>
            Kirim ke WhatsApp Admin
          </button>
        </form>
      </section>
    </div>
  );
}
