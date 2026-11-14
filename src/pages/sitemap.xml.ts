import { getNotas, SITE, slugify, cats } from '../lib';

export async function GET() {
  const notas = await getNotas();
  const secs = new Set<string>();
  notas.forEach((n) => cats(n).forEach((c) => secs.add(slugify(c))));
  const urls = [
    { loc: `${SITE}/`, lastmod: notas[0]?.data.pubDate },
    ...[...secs].map((s) => ({ loc: `${SITE}/seccion/${s}/`, lastmod: undefined as Date | undefined })),
    ...notas.map((n) => ({ loc: `${SITE}/noticias/${n.id}/`, lastmod: n.data.pubDate })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod.toISOString()}</lastmod>` : ''}</url>`)
    .join('\n')}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
