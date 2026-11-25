import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { categories, products } from './src/data/products';
import { categoryMeta, homeMeta, productMeta, renderHead, type PageMeta } from './src/seoMeta';

const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;

/**
 * En el build:
 * - Escribe un HTML por producto (dist/p/<id>.html) y por categoría (dist/c/<id>.html)
 *   con sus metas y JSON-LD, para que WhatsApp, Facebook, X y LinkedIn muestren la vista previa
 *   correcta sin ejecutar JavaScript.
 * - Genera sitemap.xml y robots.txt.
 */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset') return this.error('index.html no encontrado en el bundle');
      const template = String(index.source);
      if (!SEO_BLOCK.test(template)) return this.error('index.html no tiene el bloque <!-- seo:start --> … <!-- seo:end -->');

      const page = (meta: PageMeta) => template.replace(SEO_BLOCK, () => renderHead(meta, siteUrl));

      index.source = page(homeMeta(siteUrl));
      for (const c of categories) {
        this.emitFile({ type: 'asset', fileName: `c/${c.id}.html`, source: page(categoryMeta(siteUrl, c)) });
      }
      for (const p of products) {
        this.emitFile({ type: 'asset', fileName: `p/${p.id}.html`, source: page(productMeta(siteUrl, p)) });
      }

      const today = new Date().toISOString().slice(0, 10);
      const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      const urls = [
        { loc: '/', priority: '1.0' },
        ...categories.map((c) => ({ loc: `/c/${c.id}`, priority: '0.8' })),
        ...products.map((p) => ({ loc: `/p/${p.id}`, priority: '0.9', image: p.metaImage, title: p.name })),
      ];
      const body = urls
        .map(
          (u) =>
            `  <url>\n    <loc>${siteUrl}${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.priority}</priority>` +
            ('image' in u ? `\n    <image:image><image:loc>${esc(u.image)}</image:loc><image:title>${esc(u.title)}</image:title></image:image>` : '') +
            '\n  </url>',
        )
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nDisallow: /buscar\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = (env.VITE_SITE_URL || 'https://tech-studio.example.com').replace(/\/$/, '');
  if (!env.VITE_SITE_URL && mode === 'production') {
    console.warn('\n[seo] VITE_SITE_URL no está definido; las URLs del build usan un dominio de ejemplo.\n');
  }
  return {
    plugins: [react(), seoFiles(siteUrl)],
  };
});
