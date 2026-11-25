import { useEffect } from 'react';
import { headTags, jsonLdText, type PageMeta } from './seoMeta';

/** Dominio público. Configúralo con VITE_SITE_URL al publicar; en local usa el origen actual. */
export const SITE_URL = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ?? window.location.origin;

function upsert<T extends HTMLElement>(selector: string, create: () => T): T {
  let el = document.head.querySelector<T>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

/** Aplica en el <head> las mismas etiquetas que el build escribe en cada HTML estático. */
export function useSeo(meta: PageMeta) {
  const key = JSON.stringify(meta);
  useEffect(() => {
    document.title = meta.title;
    for (const t of headTags(meta, SITE_URL)) {
      if (t.kind === 'canonical') {
        upsert('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' })).href = t.href;
      } else {
        upsert(`meta[${t.attr}="${t.key}"]`, () => {
          const el = document.createElement('meta');
          el.setAttribute(t.attr, t.key);
          return el;
        }).content = t.content;
      }
    }
    // Quita etiquetas de precio si la página actual no es un producto.
    if (meta.type !== 'product') {
      document.head.querySelectorAll('meta[property^="product:"]').forEach((el) => el.remove());
    }
    upsert('#ld-json', () => Object.assign(document.createElement('script'), { id: 'ld-json', type: 'application/ld+json' })).textContent =
      jsonLdText(meta, SITE_URL);
    // key (contenido serializado) evita re-ejecutar el efecto por objetos nuevos con el mismo contenido.
  }, [key]);
}
