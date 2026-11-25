import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { categories, products } from './src/data/products';

/** Genera sitemap.xml y robots.txt en dist/ con el dominio de VITE_SITE_URL. */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const urls = [
        { loc: '/', priority: '1.0' },
        ...categories.map((c) => ({ loc: `/c/${c.id}`, priority: '0.8' })),
        ...products.map((p) => ({ loc: `/p/${p.id}`, priority: '0.9', image: p.metaImage, title: p.name })),
      ];
      const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
      const body = urls
        .map(
          (u) =>
            `  <url>\n    <loc>${siteUrl}${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${u.priority}</priority>` +
            ('image' in u && u.image ? `\n    <image:image><image:loc>${esc(u.image)}</image:loc><image:title>${esc(u.title)}</image:title></image:image>` : '') +
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
    console.warn('\n[seo] VITE_SITE_URL no está definido; el sitemap usa un dominio de ejemplo.\n');
  }
  return {
    plugins: [react(), seoFiles(siteUrl)],
  };
});
