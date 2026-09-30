import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Kost } from '@/types/kost';
import kostsData from '@/data/kosts.json';
import KostDetailClient from './KostDetailClient';
import PageTransition from '@/components/PageTransition';

const kosts = kostsData as Kost[];

function getKostBySlug(slug: string): Kost | undefined {
  return kosts.find((k) => k.slug === slug);
}

export function generateStaticParams(): { slug: string }[] {
  return kosts.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const kost = getKostBySlug(slug);
  if (!kost) return { title: 'Kost Tidak Ditemukan' };

  return {
    title: `${kost.title} - SemawKos`,
    description: `${kost.title} di ${kost.location.city}. Fasilitas: ${kost.facilities.join(', ')}. Harga mulai dari Rp ${kost.priceMonthly.toLocaleString('id-ID')}/bulan.`,
  };
}

export default async function KostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const kost = getKostBySlug(slug);

  if (!kost) {
    notFound();
  }

  return <PageTransition><KostDetailClient kost={kost} /></PageTransition>;
}
