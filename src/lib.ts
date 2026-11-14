import { getCollection } from 'astro:content';

export const SITE = 'https://pdcnoticias.com.mx';
export const BRAND_NAME = 'PDC Noticias';
export const BRAND_SUBTITLE = 'Playa del Carmen · Riviera Maya · Quintana Roo';
export const CENTRAL = 'https://central.neuronamedios.com';

export const SECTIONS = [
  'Playa del Carmen',
  'Turismo',
  'Comunidad',
  'Medio ambiente',
  'Cultura',
  'Economía local',
];

export const FOOTER_SECTIONS = [
  'Playas',
  'Clima',
  'Leyendas',
  'Arte',
  'Noticias',
  'Gastronomía',
  'Seguridad',
  'Tecnología',
  'Reportes',
];

export const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export async function getNotas() {
  const all = await getCollection('noticias', (n) => !n.data.draft);
  return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export const img = (n: any) => n.data.image ?? n.data.heroImage ?? null;
export const summary = (n: any) => n.data.excerpt ?? n.data.description ?? n.data.subtitle ?? '';

export const cats = (n: any): string[] => {
  const list: string[] = [];
  if (n.data.category) list.push(n.data.category);
  if (Array.isArray(n.data.categories)) {
    for (const c of n.data.categories) {
      if (c && !list.includes(c)) list.push(c);
    }
  }
  return list.length ? list : ['Playa del Carmen'];
};

export const fmt = (d: Date) =>
  d.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

export const fmtFull = (d: Date) =>
  d.toLocaleDateString('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

export const CLOUD_NAME = 'hhgxvujx';
export const CLOUDINARY_API_KEY = '724569219931925';

export function optimize(src: string | null, width = 900): string | null {
  if (!src) return src;
  if (src.includes('res.cloudinary.com') && src.includes('/image/upload/') && !src.includes('/f_auto')) {
    return src.replace('/image/upload/', `/image/upload/f_auto,q_auto,w_${width}/`);
  }
  return src;
}
