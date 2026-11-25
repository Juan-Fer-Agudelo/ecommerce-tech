export type CategoryId = 'ratones' | 'teclados' | 'webcams' | 'diademas' | 'inears';

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  icon: string; // key in components/Icon.tsx
  image: string;
  metaTitle: string;
  metaDescription: string;
}

export type Badge = 'Nuevo' | 'Oferta' | 'Más vendido';

export interface Product {
  id: string;
  /** Código del producto en Amazon. */
  asin: string;
  name: string;
  brand: string;
  category: CategoryId;
  /** Precio en USD. Si no hay un precio confiable, queda vacío y se muestra "Ver precio en Amazon". */
  price?: number;
  /** Precio normal, si hay descuento. */
  oldPrice?: number;
  /** De dónde y cuándo se tomó el precio. */
  priceNote?: string;
  amazonUrl: string;
  badge?: Badge;
  short: string;
  image: string;
  /** SEO: <title>, og:title y twitter:title (máx. ~60 caracteres). */
  metaTitle: string;
  /** SEO: meta description y og:description (máx. ~160 caracteres). */
  metaDescription: string;
  /** SEO: og:image y twitter:image. */
  metaImage: string;
}

/* ---------- Imágenes ---------- */

// Fotos de portada y categorías: CDN de Logitech. Fotos de producto: imagen principal del
// listado en Amazon, a partir del ASIN. Uso académico, no comercial.
const LOGI = 'https://resource.logitech.com';
const u = (path: string, w = 900) => `${LOGI}/w_${w},c_fill,q_auto,f_auto/content/dam/${path}`;
const og = (path: string) => `${LOGI}/w_1200,h_630,c_fill,q_auto,f_jpg/content/dam/${path}`;
const amazonImage = (asin: string) => `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_SX500_.jpg`;

export const defaultMetaImage = og('logitech/en/homepage/banners/cards/hand-using-mx-master-4.jpg');

export const heroImages = {
  mouse: u('logitech/en/homepage/banners/cards/hand-using-mx-master-4.jpg', 1920),
  audio: u('logitech/en/homepage/banners/cards/zone-vibe-pro-free-headset-stand-2.jpg', 1920),
  gaming: u('gaming/en/homepage/2025/logitechg-pro-x-superlight-2-compact-hero-banner-desktop.jpg', 1920),
  feature: u('gaming/en/homepage/2026/interactive-hero-banner/g502-plus-hero-banner-desktop-2.jpg', 1400),
};

export const categories: Category[] = [
  { id: 'ratones', name: 'Ratones', tagline: 'Para trabajar y para jugar', icon: 'mouse', image: u('logitech/en/plp/mice/standard-cards/category-card-mice.jpg'), metaTitle: 'Ratones inalámbricos y gaming | Tech Studio', metaDescription: 'Ratones Logitech, Razer, SteelSeries y Apple: inalámbricos, ergonómicos y gaming. Compara modelos y míralos en Amazon.' },
  { id: 'teclados', name: 'Teclados', tagline: 'Escribe más cómodo', icon: 'keyboard', image: u('logitech/en/plp/keyboards/standard-cards/category-card-keyboards.jpg'), metaTitle: 'Teclados inalámbricos y mecánicos | Tech Studio', metaDescription: 'Teclados Logitech, Apple y AULA: inalámbricos, mecánicos y ergonómicos para Windows y Mac. Compara modelos y míralos en Amazon.' },
  { id: 'webcams', name: 'Cámaras', tagline: 'Luce bien en cada llamada', icon: 'webcam', image: u('logitech/en/plp/webcams/standard-cards/category-card-webcams.jpg'), metaTitle: 'Cámaras web 4K y Full HD | Tech Studio', metaDescription: 'Cámaras web Logitech, Razer, Elgato y Microsoft para videollamadas y streaming, en 4K y Full HD. Míralas en Amazon.' },
  { id: 'diademas', name: 'Diademas', tagline: 'Sonido que te envuelve', icon: 'headset', image: u('logitech/en/homepage/banners/cards/girl-listening-zone300-rose-headset.jpg'), metaTitle: 'Audífonos de diadema y gaming | Tech Studio', metaDescription: 'Audífonos de diadema Sony, Bose, Logitech, HyperX, SteelSeries y Razer: con cancelación de ruido y para gaming. Míralos en Amazon.' },
  { id: 'inears', name: 'In-ears', tagline: 'Tu música en el bolsillo', icon: 'earbuds', image: u('logitech/en/homepage/banners/cards/ue-pro-in-ear-tile.jpg'), metaTitle: 'Audífonos in-ear inalámbricos | Tech Studio', metaDescription: 'Audífonos in-ear inalámbricos Apple AirPods, Sony, Samsung Galaxy Buds, Bose y Beats. Compara modelos y míralos en Amazon.' },
];

/* ---------- Catálogo ---------- */

const SEEN = 'Precio visto en Amazon';
const OFFICIAL = 'Precio de la tienda oficial de Logitech (25 de noviembre de 2026)';

interface Row {
  asin: string;
  id: string;
  name: string;
  brand: string;
  short: string;
  price?: number;
  oldPrice?: number;
  priceNote?: string;
  badge?: Badge;
}

const clip = (s: string, max: number) => (s.length <= max ? s : s.slice(0, max - 1).trimEnd() + '…');
const usd = (n: number) => `$${n.toFixed(2)}`;

function build(category: CategoryId, rows: Row[]): Product[] {
  return rows.map((r) => {
    const badge = r.badge ?? (r.oldPrice ? 'Oferta' : undefined);
    const priceText = r.price ? ` Desde ${usd(r.price)}.` : '';
    return {
      ...r,
      category,
      badge,
      amazonUrl: `https://www.amazon.com/dp/${r.asin}`,
      image: amazonImage(r.asin),
      metaImage: amazonImage(r.asin),
      metaTitle: clip(r.name, 60 - ' | Tech Studio'.length) + ' | Tech Studio',
      metaDescription: clip(`${r.name}: ${r.short.charAt(0).toLowerCase()}${r.short.slice(1)}.${priceText} Míralo en Tech Studio y cómpralo en Amazon.`, 160),
    };
  });
}

export const products: Product[] = [
  ...build('ratones', [
    { asin: 'B07CMS5Q6P', id: 'logitech-g305', name: 'Logitech G305 LIGHTSPEED', brand: 'Logitech G', short: 'Ratón gaming inalámbrico con sensor de 12.000 DPI', price: 49.99, oldPrice: 59.99, priceNote: OFFICIAL, badge: 'Más vendido' },
    { asin: 'B07GBZ4Q68', id: 'logitech-g502-hero', name: 'Logitech G502 HERO', brand: 'Logitech G', short: 'Ratón gaming con cable de alto rendimiento', price: 37.99, oldPrice: 69.99, priceNote: `${SEEN} (junio de 2026)` },
    { asin: 'B0DL72PK1P', id: 'apple-magic-mouse', name: 'Apple Magic Mouse (USB-C)', brand: 'Apple', short: 'Ratón inalámbrico con superficie multitáctil', price: 63.99, oldPrice: 79, priceNote: `${SEEN} (mayo de 2026)` },
    { asin: 'B09HMKFDXC', id: 'logitech-mx-master-3s', name: 'Logitech MX Master 3S', brand: 'Logitech', short: 'Ratón inalámbrico de alto rendimiento con sensor 8K DPI y clics silenciosos', price: 75.99, oldPrice: 99.99, priceNote: OFFICIAL, badge: 'Más vendido' },
    { asin: 'B09HMV6K1W', id: 'logitech-mx-master-3s-mac', name: 'Logitech MX Master 3S para Mac', brand: 'Logitech', short: 'Ratón Bluetooth para Mac y iPad con sensor 8K DPI y clics silenciosos' },
    { asin: 'B07W6JP97F', id: 'logitech-mx-anywhere-3s', name: 'Logitech MX Anywhere 3S', brand: 'Logitech', short: 'Ratón compacto inalámbrico con sensor 8K DPI para cualquier superficie', price: 66.99, oldPrice: 69.99, priceNote: OFFICIAL },
    { asin: 'B0GMLBSSTD', id: 'razer-viper-v4-pro', name: 'Razer Viper V4 Pro', brand: 'Razer', short: 'Ratón gaming inalámbrico para esports de 49 g con batería de 180 horas', badge: 'Nuevo' },
    { asin: 'B0CW25XR5R', id: 'razer-viper-v3-pro', name: 'Razer Viper V3 Pro', brand: 'Razer', short: 'Ratón gaming inalámbrico para esports de 54 g con sensor de 35K DPI' },
    { asin: 'B0CF4DJM7F', id: 'razer-viper-v3-hyperspeed', name: 'Razer Viper V3 HyperSpeed', brand: 'Razer', short: 'Ratón gaming inalámbrico de 82 g con sensor de 30K DPI' },
    { asin: 'B08565C5BB', id: 'razer-viper-ultimate', name: 'Razer Viper Ultimate', brand: 'Razer', short: 'Ratón gaming inalámbrico ligero con sensor de 20K DPI y 70 horas de batería' },
    { asin: 'B094PS5RZQ', id: 'razer-deathadder-essential', name: 'Razer DeathAdder Essential', brand: 'Razer', short: 'Ratón gaming ergonómico con cable, sensor de 6400 DPI y 5 botones' },
    { asin: 'B093LSMKL3', id: 'steelseries-rival-5', name: 'SteelSeries Rival 5', brand: 'SteelSeries', short: 'Ratón gaming con cable y botones programables' },
    { asin: 'B0851H51FC', id: 'steelseries-prime', name: 'SteelSeries Prime', brand: 'SteelSeries', short: 'Ratón gaming con cable diseñado para esports' },
  ]),
  ...build('teclados', [
    { asin: 'B0CQ53BKWT', id: 'aula-f75', name: 'AULA F75', brand: 'AULA', short: 'Teclado mecánico 75% con switches intercambiables y retroiluminación', badge: 'Más vendido' },
    { asin: 'B0BTNYGHN7', id: 'logitech-wave-keys', name: 'Logitech Wave Keys', brand: 'Logitech', short: 'Teclado ergonómico inalámbrico con reposamanos acolchado' },
    { asin: 'B0BKW3LB2B', id: 'logitech-mx-keys-s', name: 'Logitech MX Keys S', brand: 'Logitech', short: 'Teclado inalámbrico de perfil bajo con retroiluminación inteligente', price: 104.99, oldPrice: 109.99, priceNote: OFFICIAL },
    { asin: 'B0BXX2DHY2', id: 'logitech-mx-keys-s-mac', name: 'Logitech MX Keys S para Mac', brand: 'Logitech', short: 'Teclado inalámbrico retroiluminado con distribución para Mac' },
    { asin: 'B0FH88CY7L', id: 'logitech-signature-slim-solar-k980', name: 'Logitech Signature Slim Solar+ K980', brand: 'Logitech', short: 'Teclado inalámbrico que se carga con luz solar o artificial', price: 72.99, oldPrice: 99.99, priceNote: OFFICIAL },
    { asin: 'B0DL6LV7Q6', id: 'apple-magic-keyboard', name: 'Apple Magic Keyboard (USB-C)', brand: 'Apple', short: 'Teclado Bluetooth compacto y recargable para Mac' },
    { asin: 'B07BR9ZBZ5', id: 'apple-magic-keyboard-numerico', name: 'Apple Magic Keyboard con teclado numérico', brand: 'Apple', short: 'Teclado inalámbrico recargable con teclado numérico, gris espacial' },
  ]),
  ...build('webcams', [
    { asin: 'B07K986YLL', id: 'logitech-c920s', name: 'Logitech C920S HD Pro', brand: 'Logitech', short: 'Cámara web Full HD 1080p con tapa de privacidad', price: 54.99, oldPrice: 69.99, priceNote: OFFICIAL, badge: 'Más vendido' },
    { asin: 'B006JH8T3S', id: 'logitech-c920', name: 'Logitech HD Pro C920', brand: 'Logitech', short: 'Cámara web Full HD 1080p para videollamadas y grabación', price: 67.49, priceNote: SEEN },
    { asin: 'B0CX8S8JLX', id: 'logitech-mx-brio', name: 'Logitech MX Brio', brand: 'Logitech', short: 'Cámara web 4K Ultra HD con imagen mejorada por IA y tapa de privacidad', price: 161.99, oldPrice: 169.99, priceNote: OFFICIAL },
    { asin: 'B075N1BYWB', id: 'razer-kiyo', name: 'Razer Kiyo', brand: 'Razer', short: 'Cámara web 1080p para streaming con aro de luz ajustable', price: 95.89, oldPrice: 109, priceNote: SEEN },
    { asin: 'B0DVZG36J8', id: 'elgato-facecam-4k', name: 'Elgato Facecam 4K', brand: 'Elgato', short: 'Cámara web de estudio 4K a 60 fps con sensor Sony STARVIS 2', badge: 'Nuevo' },
    { asin: 'B009CPC6QA', id: 'microsoft-lifecam-cinema', name: 'Microsoft LifeCam Cinema', brand: 'Microsoft', short: 'Cámara web HD 720p con micrófono con reducción de ruido' },
  ]),
  ...build('diademas', [
    { asin: 'B0F3PT1VBL', id: 'sony-wh-1000xm6', name: 'Sony WH-1000XM6', brand: 'Sony', short: 'Audífonos inalámbricos con cancelación de ruido y hasta 30 horas de batería', badge: 'Nuevo' },
    { asin: 'B0BS1QCFHX', id: 'sony-wh-ch720n', name: 'Sony WH-CH720N', brand: 'Sony', short: 'Audífonos inalámbricos con cancelación de ruido y hasta 35 horas de batería' },
    { asin: 'B07RM8WQ8G', id: 'sony-wh-xb900n', name: 'Sony WH-XB900N', brand: 'Sony', short: 'Audífonos Bluetooth con cancelación de ruido y bajos potentes' },
    { asin: 'B0CCZ26B5V', id: 'bose-quietcomfort', name: 'Bose QuietComfort', brand: 'Bose', short: 'Audífonos Bluetooth con cancelación de ruido y hasta 24 horas de batería', price: 349, priceNote: SEEN, badge: 'Más vendido' },
    { asin: 'B0CCZ1L489', id: 'bose-quietcomfort-ultra', name: 'Bose QuietComfort Ultra', brand: 'Bose', short: 'Audífonos con cancelación de ruido y audio espacial' },
    { asin: 'B07Q9MJKBV', id: 'bose-headphones-700', name: 'Bose Headphones 700', brand: 'Bose', short: 'Audífonos Bluetooth con cancelación de ruido y micrófono para llamadas' },
    { asin: 'B09NBVS84T', id: 'logitech-zone-vibe-100', name: 'Logitech Zone Vibe 100', brand: 'Logitech', short: 'Audífonos inalámbricos livianos con micrófono con reducción de ruido', price: 99.99, priceNote: SEEN },
    { asin: 'B0CSQL6Y21', id: 'logitech-zone-wireless-2', name: 'Logitech Zone Wireless 2', brand: 'Logitech', short: 'Audífonos premium para trabajar con cancelación de ruido híbrida', price: 229.99, oldPrice: 249.99, priceNote: OFFICIAL },
    { asin: 'B0FLKC5JN4', id: 'cmf-headphone-pro', name: 'CMF by Nothing Headphone Pro', brand: 'CMF by Nothing', short: 'Audífonos con cancelación de ruido, Bluetooth 5.4 y 50 horas de batería' },
    { asin: 'B0F6NZWPTC', id: 'hyperx-cloud-iii-s-wireless', name: 'HyperX Cloud III S Wireless', brand: 'HyperX', short: 'Audífonos gaming inalámbricos con hasta 120 horas de batería', badge: 'Nuevo' },
    { asin: 'B0CBQXGZ85', id: 'hyperx-cloud-iii-wireless', name: 'HyperX Cloud III Wireless', brand: 'HyperX', short: 'Audífonos gaming inalámbricos con micrófono' },
    { asin: 'B0FRNR8Y11', id: 'steelseries-arctis-nova-7-gen-2', name: 'SteelSeries Arctis Nova 7 Wireless Gen 2', brand: 'SteelSeries', short: 'Audífonos gaming inalámbricos multiplataforma', badge: 'Nuevo' },
    { asin: 'B09KMHMYPF', id: 'steelseries-arctis-7-plus', name: 'SteelSeries Arctis 7+', brand: 'SteelSeries', short: 'Audífonos gaming inalámbricos' },
    { asin: 'B07SJHG1MJ', id: 'steelseries-arctis-1', name: 'SteelSeries Arctis 1', brand: 'SteelSeries', short: 'Audífonos gaming con cable y diadema reforzada con acero' },
    { asin: 'B0FC1NMTN5', id: 'razer-blackshark-v3-pro', name: 'Razer BlackShark V3 Pro', brand: 'Razer', short: 'Audífonos gaming inalámbricos con cancelación de ruido para PlayStation' },
  ]),
  ...build('inears', [
    { asin: 'B0D1XD1ZV3', id: 'apple-airpods-pro-2', name: 'Apple AirPods Pro 2', brand: 'Apple', short: 'Audífonos in-ear inalámbricos con cancelación activa de ruido', badge: 'Más vendido' },
    { asin: 'B0DGHMNQ5Z', id: 'apple-airpods-4', name: 'Apple AirPods 4', brand: 'Apple', short: 'Audífonos inalámbricos con estuche de carga USB-C' },
    { asin: 'B09JQL3NWT', id: 'apple-airpods-3', name: 'Apple AirPods (3.ª generación)', brand: 'Apple', short: 'Audífonos inalámbricos con audio espacial' },
    { asin: 'B096SV8SJG', id: 'beats-studio-buds', name: 'Beats Studio Buds', brand: 'Beats', short: 'Audífonos in-ear inalámbricos con cancelación de ruido' },
    { asin: 'B0B4PSQHD5', id: 'bose-quietcomfort-earbuds-ii', name: 'Bose QuietComfort Earbuds II', brand: 'Bose', short: 'Audífonos in-ear inalámbricos con cancelación de ruido' },
    { asin: 'B0C33XXS56', id: 'sony-wf-1000xm5', name: 'Sony WF-1000XM5', brand: 'Sony', short: 'Audífonos in-ear con cancelación de ruido, conexión multipunto y resistencia IPX4' },
    { asin: 'B0BYPFNW6T', id: 'sony-wf-c700n', name: 'Sony WF-C700N', brand: 'Sony', short: 'Audífonos in-ear inalámbricos con cancelación de ruido' },
    { asin: 'B0D9YZJ3V7', id: 'samsung-galaxy-buds-3-pro', name: 'Samsung Galaxy Buds 3 Pro', brand: 'Samsung', short: 'Audífonos in-ear con cancelación de ruido adaptativa y resistencia IP57' },
    { asin: 'B0B2SH4CN6', id: 'samsung-galaxy-buds2-pro', name: 'Samsung Galaxy Buds2 Pro', brand: 'Samsung', short: 'Audífonos in-ear inalámbricos con cancelación de ruido' },
    { asin: 'B0FNRXZV67', id: 'samsung-galaxy-buds-core', name: 'Samsung Galaxy Buds Core', brand: 'Samsung', short: 'Audífonos in-ear inalámbricos, modelo 2025', badge: 'Nuevo' },
  ]),
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
