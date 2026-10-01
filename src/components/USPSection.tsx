'use client';

import { motion } from 'framer-motion';
import { MapPin, BedDouble, ShieldCheck } from 'lucide-react';

const usps = [
  {
    title: 'Lokasi Strategis',
    description: 'Berada di area premium yang tenang, namun tetap sangat dekat dengan kampus-kampus utama di Malang dan pusat kuliner.',
    icon: MapPin,
    iconBg: 'bg-brand-sky',
    iconColor: 'text-slate-800',
  },
  {
    title: 'Fasilitas Siap Huni',
    description: 'Kamar fully furnished lengkap dengan kasur nyaman, meja belajar, AC, dan Water Heater. Tinggal bawa koper!',
    icon: BedDouble,
    iconBg: 'bg-brand-latte',
    iconColor: 'text-slate-800',
  },
  {
    title: 'Keamanan & Privasi',
    description: 'Berada di perumahan klaster eksklusif dengan One Gate System dan sekuriti 24 jam. Lingkungan sangat kondusif untuk belajar.',
    icon: ShieldCheck,
    iconBg: 'bg-brand-peach',
    iconColor: 'text-slate-800',
  },
];

export default function USPSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
        >
          Standar Hunian Nyaman di Malang
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-gray-400"
        >
          Fokus kuliah dan beraktivitas, urusan kenyamanan tempat tinggal serahkan pada standar kualitas kami.
        </motion.p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {usps.map((usp, index) => {
          const Icon = usp.icon;
          return (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group flex flex-col items-center rounded-2xl border border-brand-latte/50 bg-white p-8 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900"
            >
              <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${usp.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                <Icon className={`h-8 w-8 ${usp.iconColor}`} />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-slate-800 dark:text-white">
                {usp.title}
              </h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                {usp.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
