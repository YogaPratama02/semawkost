'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  status: string;
  review: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Nadia Shafira',
    status: 'Mahasiswi UB',
    review: 'Kost di Myrra Residence bener-bener nyaman dan aman. One gate system bikin tenang kalau pulang malem habis nugas. Fasilitas kamarnya juga premium banget!',
    rating: 5,
  },
  {
    name: 'Bima Arya',
    status: 'Mahasiswa Polinema',
    review: 'Awalnya ragu cari kost online, tapi pas dateng ke Graha Agung ternyata sesuai foto. Suasana perumahannya tenang, cocok buat yang butuh fokus belajar.',
    rating: 5,
  },
  {
    name: 'Siti Aisyah',
    status: 'Mahasiswi UM',
    review: 'Suka banget sama desain kamarnya yang estetik dan bersih. Ditambah lagi ownernya ramah dan fast respon kalau ada apa-apa.',
    rating: 5,
  },
];

export default function TestimonialSection() {
  return (
    <section className="bg-brand-cream py-16 dark:bg-slate-900/50 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
          >
            Kata Mereka yang Sudah Tinggal
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-gray-400"
          >
            Pengalaman nyata dari penghuni kost tentang kenyamanan dan fasilitas yang kami tawarkan.
          </motion.p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative flex flex-col rounded-2xl bg-white p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1 hover:shadow-md dark:bg-slate-800"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-brand-latte/50 dark:text-white/5" />
              
              <div className="mb-4 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>
              
              <p className="mb-6 flex-1 text-slate-700 italic dark:text-gray-300">
                "{testimonial.review}"
              </p>
              
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h4>
                <p className="text-sm text-brand-peach dark:text-brand-peach">{testimonial.status}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
