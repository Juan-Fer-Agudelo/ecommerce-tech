import { useEffect } from 'react';
import { categories, defaultMetaImage, type Category, type Product } from './data/products';
import { href } from './router';

/** Dominio público. Configúralo con VITE_SITE_URL al publicar; en local usa el origen actual. */
export const SITE_URL = import.meta.env?.VITE_SITE_URL?.replace(/\/$/, '') ?? window.location.origin;
export const SITE_NAME = 'Tech Studio';

export const defaults = {
  title: 'Tech Studio | Ratones, teclados, audio y gaming',
  description:
    'Tienda online de periféricos: ratones, teclados, audífonos, webcams, parlantes y equipo gaming. Envío gratis desde $29, devoluciones en 30 días y 2 años de garantía.',
  image: defaultMetaImage,
};

const abs = (path: string) => SITE_URL + path;

type JsonLd = Record<string, unknown>;

interface SeoInput {
  title: string;
  description: string;
  image?: string;
  /** Ruta canónica, p. ej. "/p/ts-glide-pro". */
  path: string;
  type?: 'website' | 'product';
  noindex?: boolean;
  jsonLd?: JsonLd[];
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = url;
}

function setJsonLd(data: JsonLd[]) {
  let el = document.getElementById('ld-json') as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = 'ld-json';
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data.length === 1 ? data[0] : { '@context': 'https://schema.org', '@graph': data.map(stripContext) });
}

const stripContext = ({ '@context': _ignored, ...rest }: JsonLd) => rest;

/** Aplica título, meta descripción, Open Graph, Twitter Card, canonical y JSON-LD de la página actual. */
export function useSeo({ title, description, image = defaults.image, path, type = 'website', noindex, jsonLd = [] }: SeoInput) {
  const ldKey = JSON.stringify(jsonLd);
  useEffect(() => {
    const url = abs(path);
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    setCanonical(url);

    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'es_CO');
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:image:alt', title);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    setJsonLd(jsonLd.length ? jsonLd : [organizationLd()]);
    // ldKey (contenido serializado) evita re-ejecutar el efecto por objetos nuevos con el mismo contenido.
  }, [title, description, image, path, type, noindex, ldKey]);
}

/* ---------- Schema.org builders ---------- */

export function organizationLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': abs('/#organization'),
    name: SITE_NAME,
    url: abs('/'),
    logo: abs('/favicon.svg'),
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', availableLanguage: ['es'] },
  };
}

export function websiteLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': abs('/#website'),
    name: SITE_NAME,
    url: abs('/'),
    inLanguage: 'es',
    publisher: { '@id': abs('/#organization') },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: abs('/buscar?q={search_term_string}') },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function itemListLd(list: Product[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: list.length,
    itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(href.product(p.id)), name: p.name })),
  };
}

export function collectionLd(cat: Category): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cat.name,
    description: cat.metaDescription,
    url: abs(href.category(cat.id)),
    isPartOf: { '@id': abs('/#website') },
  };
}

export function productLd(p: Product): JsonLd {
  const cat = categories.find((c) => c.id === p.category);
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': abs(href.product(p.id) + '#product'),
    sku: p.id,
    name: p.name,
    description: p.description,
    image: [p.metaImage, p.image],
    category: cat?.name,
    brand: { '@type': 'Brand', name: SITE_NAME },
    color: p.colors.map((c) => c.name).join(', '),
    aggregateRating: { '@type': 'AggregateRating', ratingValue: p.rating, reviewCount: p.reviews, bestRating: 5 },
    offers: {
      '@type': 'Offer',
      url: abs(href.product(p.id)),
      priceCurrency: 'USD',
      price: p.price.toFixed(2),
      priceValidUntil: nextYear.toISOString().slice(0, 10),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': abs('/#organization') },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'CO' },
        shippingRate: { '@type': 'MonetaryAmount', value: p.price >= 29 ? 0 : 5, currency: 'USD' },
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
}
