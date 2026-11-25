/**
 * Metadatos SEO de cada página, sin dependencias del navegador.
 * Lo usan tanto la app (src/seo.ts) como el build (vite.config.ts), que genera
 * un HTML por página con estas etiquetas ya escritas para redes sociales.
 */
import { categories, defaultMetaImage, products, type Category, type Product } from './data/products';
import { href } from './router';

export const SITE_NAME = 'Tech Studio';

export const defaults = {
  title: 'Tech Studio | Ratones, teclados, cámaras y audífonos',
  description:
    'Tienda online de tecnología con productos reales de Amazon: ratones, teclados, cámaras web, audífonos de diadema e in-ears de Logitech, Apple, Sony, Razer, Bose y más.',
  image: defaultMetaImage,
};

export type JsonLd = Record<string, unknown>;

export interface PageMeta {
  title: string;
  description: string;
  image: string;
  /** Ruta canónica, p. ej. "/p/mx-master-3s". */
  path: string;
  type: 'website' | 'product';
  noindex: boolean;
  jsonLd: JsonLd[];
}

/* ---------- Metadatos por tipo de página ---------- */

export function homeMeta(base: string): PageMeta {
  return {
    ...defaults,
    path: '/',
    type: 'website',
    noindex: false,
    jsonLd: [organizationLd(base), websiteLd(base), itemListLd(base, products)],
  };
}

export function categoryMeta(base: string, cat: Category): PageMeta {
  const list = products.filter((p) => p.category === cat.id);
  return {
    title: cat.metaTitle,
    description: cat.metaDescription,
    image: list[0]?.metaImage ?? defaults.image,
    path: href.category(cat.id),
    type: 'website',
    noindex: false,
    jsonLd: [
      collectionLd(base, cat),
      breadcrumbLd(base, [{ name: 'Inicio', path: '/' }, { name: cat.name, path: href.category(cat.id) }]),
      itemListLd(base, list),
    ],
  };
}

export function productMeta(base: string, p: Product): PageMeta {
  const cat = categories.find((c) => c.id === p.category)!;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    image: p.metaImage,
    path: href.product(p.id),
    type: 'product',
    noindex: false,
    jsonLd: [
      productLd(base, p),
      breadcrumbLd(base, [
        { name: 'Inicio', path: '/' },
        { name: cat.name, path: href.category(cat.id) },
        { name: p.name, path: href.product(p.id) },
      ]),
    ],
  };
}

/** Búsquedas y páginas inexistentes: no se indexan para evitar contenido duplicado. */
export function utilityMeta(title: string, description: string, path: string): PageMeta {
  return { title, description, image: defaults.image, path, type: 'website', noindex: true, jsonLd: [] };
}

/* ---------- Etiquetas del <head> ---------- */

export type HeadTag =
  | { kind: 'meta'; attr: 'name' | 'property'; key: string; content: string }
  | { kind: 'canonical'; href: string };

export function headTags(meta: PageMeta, base: string): HeadTag[] {
  const url = base + meta.path;
  const m = (attr: 'name' | 'property', key: string, content: string): HeadTag => ({ kind: 'meta', attr, key, content });
  const tags: HeadTag[] = [
    m('name', 'description', meta.description),
    m('name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'),
    { kind: 'canonical', href: url },
    m('property', 'og:site_name', SITE_NAME),
    m('property', 'og:locale', 'es_CO'),
    m('property', 'og:type', meta.type),
    m('property', 'og:title', meta.title),
    m('property', 'og:description', meta.description),
    m('property', 'og:url', url),
    m('property', 'og:image', meta.image),
    // Las fotos de producto son cuadradas; solo las imágenes generales son 1200x630.
    ...(meta.type === 'product' ? [] : [m('property', 'og:image:width', '1200'), m('property', 'og:image:height', '630')]),
    m('property', 'og:image:alt', meta.title),
    m('name', 'twitter:card', meta.type === 'product' ? 'summary' : 'summary_large_image'),
    m('name', 'twitter:title', meta.title),
    m('name', 'twitter:description', meta.description),
    m('name', 'twitter:image', meta.image),
  ];
  const product = meta.jsonLd.find((ld) => ld['@type'] === 'Product') as { offers?: { price: string; priceCurrency: string } } | undefined;
  if (product?.offers) {
    tags.push(m('property', 'product:price:amount', product.offers.price), m('property', 'product:price:currency', product.offers.priceCurrency));
  }
  return tags;
}

export function jsonLdText(meta: PageMeta, base: string): string {
  const data = meta.jsonLd.length ? meta.jsonLd : [organizationLd(base)];
  const doc = data.length === 1 ? data[0] : { '@context': 'https://schema.org', '@graph': data.map(stripContext) };
  // Escapa "<" para que el JSON no pueda cerrar la etiqueta <script>.
  return JSON.stringify(doc).replace(/</g, '\\u003c');
}

const escAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** HTML del bloque SEO para un archivo estático (usado en el build). */
export function renderHead(meta: PageMeta, base: string): string {
  const lines = [`<title>${escAttr(meta.title)}</title>`];
  for (const t of headTags(meta, base)) {
    lines.push(
      t.kind === 'canonical'
        ? `<link rel="canonical" href="${escAttr(t.href)}" />`
        : `<meta ${t.attr}="${t.key}" content="${escAttr(t.content)}" />`,
    );
  }
  lines.push(`<script type="application/ld+json" id="ld-json">${jsonLdText(meta, base)}</script>`);
  return lines.join('\n    ');
}

/* ---------- Schema.org ---------- */

const stripContext = ({ '@context': _ignored, ...rest }: JsonLd) => rest;

export function organizationLd(base: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': base + '/#organization',
    name: SITE_NAME,
    url: base + '/',
    logo: base + '/favicon.svg',
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', availableLanguage: ['es'] },
  };
}

export function websiteLd(base: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': base + '/#website',
    name: SITE_NAME,
    url: base + '/',
    inLanguage: 'es',
    publisher: { '@id': base + '/#organization' },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: base + '/buscar?q={search_term_string}' },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbLd(base: string, items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: base + it.path })),
  };
}

export function itemListLd(base: string, list: Product[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: list.length,
    itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: base + href.product(p.id), name: p.name })),
  };
}

export function collectionLd(base: string, cat: Category): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cat.name,
    description: cat.metaDescription,
    url: base + href.category(cat.id),
    isPartOf: { '@id': base + '/#website' },
  };
}

export function productLd(base: string, p: Product): JsonLd {
  const cat = categories.find((c) => c.id === p.category);
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  const ld: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': base + href.product(p.id) + '#product',
    sku: p.id,
    name: p.name,
    description: p.short,
    image: [p.metaImage, p.image],
    category: cat?.name,
    brand: { '@type': 'Brand', name: p.brand },
    offers: {
      '@type': 'Offer',
      url: base + href.product(p.id),
      priceCurrency: 'USD',
      price: (p.price ?? 0).toFixed(2),
      priceValidUntil: nextYear.toISOString().slice(0, 10),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': base + '/#organization' },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'CO' },
        shippingRate: { '@type': 'MonetaryAmount', value: (p.price ?? 0) >= 29 ? 0 : 5, currency: 'USD' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 4, unitCode: 'DAY' },
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'CO',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
  };
  // Sin precio confirmado no se publica la oferta.
  if (!p.price) delete ld.offers;
  return ld;
}
