export type CategoryId =
  | 'ratones'
  | 'teclados'
  | 'audio'
  | 'webcams'
  | 'gaming'
  | 'parlantes';

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  icon: string; // key in components/Icon.tsx
  image: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: 'Nuevo' | 'Oferta' | 'Más vendido';
  short: string;
  description: string;
  features: string[];
  colors: { name: string; hex: string }[];
  image: string;
  /** SEO: <title>, og:title y twitter:title (máx. ~60 caracteres). */
  metaTitle: string;
  /** SEO: meta description y og:description (máx. ~160 caracteres). */
  metaDescription: string;
  /** SEO: og:image y twitter:image, 1200x630. */
  metaImage: string;
}

// Fotos del CDN de Logitech (solo para uso académico, no comercial).
const CDN = 'https://resource.logitech.com';
const u = (path: string, w = 900) => `${CDN}/w_${w},c_fill,q_auto,f_auto/content/dam/${path}`;
/** Imagen para redes sociales en el tamaño recomendado (1200x630). */
const og = (path: string) => `${CDN}/w_1200,h_630,c_fill,q_auto,f_jpg/content/dam/${path}`;

export const defaultMetaImage = og('logitech/en/homepage/banners/cards/hand-using-mx-master-4.jpg');

export const categories: Category[] = [
  { id: 'ratones', name: 'Ratones', tagline: 'Precisión en cada clic', icon: 'mouse', image: u('logitech/en/plp/mice/standard-cards/category-card-mice.jpg'), metaTitle: 'Ratones inalámbricos y ergonómicos | Tech Studio', metaDescription: 'Ratones inalámbricos, ergonómicos y compactos para trabajar y crear. Sensores precisos, clics silenciosos y batería de larga duración.' },
  { id: 'teclados', name: 'Teclados', tagline: 'Escribe más cómodo', icon: 'keyboard', image: u('logitech/en/plp/keyboards/standard-cards/category-card-keyboards.jpg'), metaTitle: 'Teclados inalámbricos y mecánicos | Tech Studio', metaDescription: 'Teclados inalámbricos, retroiluminados y mecánicos para Windows y macOS. Escribe más cómodo con envío gratis y 2 años de garantía.' },
  { id: 'audio', name: 'Audífonos', tagline: 'Sonido que se siente', icon: 'headset', image: u('logitech/en/homepage/banners/cards/girl-listening-zone300-rose-headset.jpg'), metaTitle: 'Audífonos inalámbricos y con ANC | Tech Studio', metaDescription: 'Audífonos con cancelación de ruido e intrauditivos para música, trabajo y llamadas. Sonido claro y batería para todo el día.' },
  { id: 'webcams', name: 'Webcams', tagline: 'Luce bien en cada llamada', icon: 'webcam', image: u('logitech/en/plp/webcams/standard-cards/category-card-webcams.jpg'), metaTitle: 'Webcams 4K y Full HD para videollamadas | Tech Studio', metaDescription: 'Webcams 4K y Full HD con corrección de luz y micrófonos integrados. Luce profesional en cada videollamada o transmisión.' },
  { id: 'gaming', name: 'Gaming', tagline: 'Hecho para ganar', icon: 'gamepad', image: u('gaming/en/homepage/2025/gaming-keyboard.jpg'), metaTitle: 'Ratones y audífonos gaming | Tech Studio', metaDescription: 'Equipo gaming Strike: ratones ultraligeros, audífonos con sonido 7.1 y conexión inalámbrica de 1 ms. Hecho para ganar.' },
  { id: 'parlantes', name: 'Parlantes', tagline: 'Llena la habitación', icon: 'speaker', image: u('logitech/en/homepage/banners/cards/person-holding-miniroll-in-hand-hp-card.jpg'), metaTitle: 'Parlantes Bluetooth y de escritorio | Tech Studio', metaDescription: 'Parlantes Bluetooth portátiles y de escritorio. Sonido de 360 grados, resistencia al agua y diseño compacto para cualquier espacio.' },
];

export const heroImages = {
  mouse: u('logitech/en/homepage/banners/cards/hand-using-mx-master-4.jpg', 1920),
  audio: u('logitech/en/homepage/banners/cards/zone-vibe-pro-free-headset-stand-2.jpg', 1920),
  gaming: u('gaming/en/homepage/2025/logitechg-pro-x-superlight-2-compact-hero-banner-desktop.jpg', 1920),
  feature: u('gaming/en/homepage/2026/interactive-hero-banner/g502-plus-hero-banner-desktop-2.jpg', 1400),
};

export const products: Product[] = [
  {
    id: 'ts-glide-pro',
    name: 'Glide Pro X',
    category: 'ratones',
    price: 99.99,
    rating: 4.8,
    reviews: 2140,
    badge: 'Más vendido',
    short: 'Ratón inalámbrico ergonómico de alto rendimiento',
    description:
      'Diseñado para jornadas largas. Sensor de 8000 DPI que funciona sobre vidrio, rueda magnética que recorre mil líneas por segundo y batería de hasta 70 días con una sola carga.',
    features: ['Sensor 8K DPI sobre cualquier superficie', 'Rueda electromagnética silenciosa', 'Conexión con 3 equipos', 'Carga USB-C: 1 minuto = 3 horas'],
    colors: [
      { name: 'Grafito', hex: '#2b2b2b' },
      { name: 'Gris pálido', hex: '#d9d9d6' },
    ],
    image: u('logitech/en/homepage/delorean-hp/cards/hand-holding-mx-master-3s-pale-grey-on-a-desk-with-glass-surface.jpg'),
    metaTitle: 'Glide Pro X: ratón inalámbrico ergonómico | Tech Studio',
    metaDescription: 'Compra el Glide Pro X: sensor de 8000 DPI que funciona sobre vidrio, rueda magnética silenciosa y hasta 70 días de batería. Envío gratis y 2 años de garantía.',
    metaImage: og('logitech/en/homepage/delorean-hp/cards/hand-holding-mx-master-3s-pale-grey-on-a-desk-with-glass-surface.jpg'),
  },
  {
    id: 'ts-glide-mini',
    name: 'Glide Mini',
    category: 'ratones',
    price: 49.99,
    oldPrice: 59.99,
    rating: 4.6,
    reviews: 980,
    badge: 'Oferta',
    short: 'Ratón compacto y silencioso para llevar',
    description: 'Pequeño, liviano y con clics 90% más silenciosos. Ideal para el portátil y para trabajar desde cualquier lugar.',
    features: ['Clics silenciosos', 'Bluetooth y receptor USB', 'Hasta 24 meses de pila', 'Plástico reciclado'],
    colors: [
      { name: 'Rosa', hex: '#f2c6c2' },
      { name: 'Grafito', hex: '#2b2b2b' },
      { name: 'Blanco', hex: '#f4f4f2' },
    ],
    image: u('logitech/en/homepage/delorean-hp/cards/mx-anywhere-3s.jpg'),
    metaTitle: 'Glide Mini: ratón compacto y silencioso | Tech Studio',
    metaDescription: 'Glide Mini, el ratón pequeño para tu portátil: clics 90% más silenciosos, Bluetooth o receptor USB y hasta 24 meses de pila. Ahora en oferta.',
    metaImage: og('logitech/en/homepage/delorean-hp/cards/mx-anywhere-3s.jpg'),
  },
  {
    id: 'ts-keys-studio',
    name: 'Keys Studio',
    category: 'teclados',
    price: 119.99,
    rating: 4.7,
    reviews: 1530,
    badge: 'Más vendido',
    short: 'Teclado inalámbrico retroiluminado de perfil bajo',
    description:
      'Teclas esféricas que se adaptan a la forma de los dedos, retroiluminación inteligente que se activa al acercar las manos y conexión con hasta tres dispositivos.',
    features: ['Retroiluminación inteligente', 'Teclas de perfil bajo', 'Cambio entre 3 equipos', 'Compatible con Windows y macOS'],
    colors: [
      { name: 'Grafito', hex: '#2b2b2b' },
      { name: 'Gris pálido', hex: '#d9d9d6' },
    ],
    image: u('logitech/en/homepage/banners/cards/signature-slim-solar-k980-keyboard.jpg'),
    metaTitle: 'Keys Studio: teclado inalámbrico con luz | Tech Studio',
    metaDescription: 'Teclado Keys Studio de perfil bajo con retroiluminación inteligente y conexión con 3 equipos. Compatible con Windows y macOS. Envío gratis.',
    metaImage: og('logitech/en/homepage/banners/cards/signature-slim-solar-k980-keyboard.jpg'),
  },
  {
    id: 'ts-keys-mech',
    name: 'Keys Mech TKL',
    category: 'teclados',
    price: 149.99,
    rating: 4.6,
    reviews: 640,
    badge: 'Nuevo',
    short: 'Teclado mecánico sin pad numérico',
    description: 'Interruptores táctiles silenciosos, cuerpo de aluminio y formato compacto que deja más espacio para el ratón.',
    features: ['Interruptores táctiles', 'Cuerpo de aluminio', 'Retroiluminación RGB', 'USB-C desmontable'],
    colors: [{ name: 'Negro', hex: '#151515' }],
    image: u('logitech/en/homepage/banners/cards/alto-keys-k98m-desktop-card.jpg'),
    metaTitle: 'Keys Mech TKL: teclado mecánico compacto | Tech Studio',
    metaDescription: 'Keys Mech TKL: teclado mecánico sin pad numérico, interruptores táctiles silenciosos, cuerpo de aluminio y RGB. Más espacio en tu escritorio.',
    metaImage: og('logitech/en/homepage/banners/cards/alto-keys-k98m-desktop-card.jpg'),
  },
  {
    id: 'ts-wave-anc',
    name: 'Wave ANC',
    category: 'audio',
    price: 199.99,
    oldPrice: 229.99,
    rating: 4.7,
    reviews: 870,
    badge: 'Oferta',
    short: 'Audífonos inalámbricos con cancelación de ruido',
    description: 'Cancelación activa de ruido, micrófono con reducción de ruido para llamadas y hasta 50 horas de batería.',
    features: ['Cancelación activa de ruido', '50 horas de batería', 'Micrófono con IA para llamadas', 'Bluetooth multipunto'],
    colors: [
      { name: 'Grafito', hex: '#2b2b2b' },
      { name: 'Arena', hex: '#d8cbb8' },
    ],
    image: u('logitech/en/homepage/banners/cards/zone-wireless-2-es-zone-wired-2.jpg'),
    metaTitle: 'Wave ANC: audífonos con cancelación de ruido | Tech Studio',
    metaDescription: 'Audífonos inalámbricos Wave ANC con cancelación activa de ruido, micrófono con IA para llamadas y 50 horas de batería. Hasta 15% de descuento.',
    metaImage: og('logitech/en/homepage/banners/cards/zone-wireless-2-es-zone-wired-2.jpg'),
  },
  {
    id: 'ts-wave-buds',
    name: 'Wave Buds',
    category: 'audio',
    price: 129.99,
    rating: 4.4,
    reviews: 410,
    short: 'Audífonos intrauditivos para trabajar y escuchar música',
    description: 'Ajuste cómodo para todo el día, modo de transparencia y estuche de carga inalámbrica.',
    features: ['Modo transparencia', 'Carga inalámbrica', 'Resistentes al agua IPX4', '6 + 18 horas de batería'],
    colors: [
      { name: 'Blanco', hex: '#f4f4f2' },
      { name: 'Negro', hex: '#151515' },
    ],
    image: u('logitech/en/homepage/banners/cards/ue-pro-in-ear-tile.jpg'),
    metaTitle: 'Wave Buds: audífonos intrauditivos | Tech Studio',
    metaDescription: 'Wave Buds: audífonos intrauditivos con modo transparencia, carga inalámbrica y resistencia al agua IPX4. Hasta 24 horas de música con el estuche.',
    metaImage: og('logitech/en/homepage/banners/cards/ue-pro-in-ear-tile.jpg'),
  },
  {
    id: 'ts-view-4k',
    name: 'View 4K',
    category: 'webcams',
    price: 179.99,
    rating: 4.5,
    reviews: 520,
    badge: 'Nuevo',
    short: 'Webcam 4K con corrección de luz automática',
    description: 'Imagen 4K Ultra HD, encuadre automático y corrección de luz para que te veas bien con cualquier iluminación.',
    features: ['4K a 30 fps / 1080p a 60 fps', 'Encuadre automático', 'Tapa de privacidad', 'Dos micrófonos'],
    colors: [{ name: 'Grafito', hex: '#2b2b2b' }],
    image: u('logitech/en/homepage/cards/mx-brio-webcam-mounted-on-top-of-computer-monitor.jpg'),
    metaTitle: 'View 4K: webcam 4K con encuadre automático | Tech Studio',
    metaDescription: 'Webcam View 4K Ultra HD con corrección de luz, encuadre automático, dos micrófonos y tapa de privacidad. Luce bien en cada videollamada.',
    metaImage: og('logitech/en/homepage/cards/mx-brio-webcam-mounted-on-top-of-computer-monitor.jpg'),
  },
  {
    id: 'ts-view-hd',
    name: 'View HD',
    category: 'webcams',
    price: 69.99,
    rating: 4.3,
    reviews: 1290,
    short: 'Webcam Full HD 1080p para videollamadas',
    description: 'Video Full HD nítido y micrófono estéreo. Se conecta y funciona, sin instalar nada.',
    features: ['1080p a 30 fps', 'Micrófono estéreo', 'Clip universal', 'Plug and play'],
    colors: [{ name: 'Negro', hex: '#151515' }],
    image: u('logitech/en/homepage/cards/litra-glow-mx-brio-mounted-on-monitor.jpg'),
    metaTitle: 'View HD: webcam Full HD 1080p | Tech Studio',
    metaDescription: 'Webcam View HD 1080p con micrófono estéreo y clip universal. Se conecta por USB y funciona al instante, sin instalar nada. Envío gratis.',
    metaImage: og('logitech/en/homepage/cards/litra-glow-mx-brio-mounted-on-monitor.jpg'),
  },
  {
    id: 'ts-strike-g',
    name: 'Strike G Lightspeed',
    category: 'gaming',
    price: 129.99,
    rating: 4.8,
    reviews: 3020,
    badge: 'Más vendido',
    short: 'Ratón gaming inalámbrico ultraligero de 60 g',
    description: 'Sensor de 25K DPI, conexión inalámbrica de 1 ms y solo 60 gramos de peso. Hecho con jugadores profesionales.',
    features: ['60 g de peso', 'Sensor 25K DPI', 'Inalámbrico de 1 ms', '70 horas de batería'],
    colors: [
      { name: 'Negro', hex: '#151515' },
      { name: 'Blanco', hex: '#f4f4f2' },
    ],
    image: u('gaming/en/homepage/2025/limited-edition-pro-x-superlight-2-cyan-desktop.jpg'),
    metaTitle: 'Strike G Lightspeed: ratón gaming de 60 g | Tech Studio',
    metaDescription: 'Ratón gaming inalámbrico Strike G Lightspeed: 60 gramos, sensor de 25K DPI, conexión de 1 ms y 70 horas de batería. Hecho con jugadores pro.',
    metaImage: og('gaming/en/homepage/2025/limited-edition-pro-x-superlight-2-cyan-desktop.jpg'),
  },
  {
    id: 'ts-strike-headset',
    name: 'Strike Pro Headset',
    category: 'gaming',
    price: 159.99,
    oldPrice: 179.99,
    rating: 4.6,
    reviews: 1180,
    badge: 'Oferta',
    short: 'Auriculares gaming con sonido envolvente 7.1',
    description: 'Drivers de 50 mm, sonido envolvente y micrófono desmontable con filtros de voz en tiempo real.',
    features: ['Sonido envolvente 7.1', 'Drivers de 50 mm', 'Micrófono desmontable', 'Almohadillas de memory foam'],
    colors: [{ name: 'Negro', hex: '#151515' }],
    image: u('gaming/en/homepage/2025/gaming-headsets-audio.jpg'),
    metaTitle: 'Strike Pro Headset: audífonos gaming 7.1 | Tech Studio',
    metaDescription: 'Audífonos gaming Strike Pro con sonido envolvente 7.1, drivers de 50 mm y micrófono desmontable con filtros de voz. Ahora con descuento.',
    metaImage: og('gaming/en/homepage/2025/gaming-headsets-audio.jpg'),
  },
  {
    id: 'ts-pulse-360',
    name: 'Pulse 360',
    category: 'parlantes',
    price: 89.99,
    rating: 4.5,
    reviews: 760,
    short: 'Parlante Bluetooth portátil resistente al agua',
    description: 'Sonido de 360 grados, resistente al agua y al polvo IP67 y 15 horas de música.',
    features: ['Sonido 360°', 'IP67', '15 horas de batería', 'Emparejamiento doble'],
    colors: [
      { name: 'Azul', hex: '#2f5d8a' },
      { name: 'Negro', hex: '#151515' },
      { name: 'Coral', hex: '#e8735a' },
    ],
    image: u('logitech/en/homepage/banners/cards/person-holding-miniroll-in-hand-hp-card.jpg'),
    metaTitle: 'Pulse 360: parlante Bluetooth a prueba de agua | Tech Studio',
    metaDescription: 'Parlante portátil Pulse 360 con sonido de 360 grados, resistencia IP67 al agua y al polvo y 15 horas de batería. Elige entre tres colores.',
    metaImage: og('logitech/en/homepage/banners/cards/person-holding-miniroll-in-hand-hp-card.jpg'),
  },
  {
    id: 'ts-desk-duo',
    name: 'Desk Duo',
    category: 'parlantes',
    price: 79.99,
    rating: 4.4,
    reviews: 330,
    badge: 'Nuevo',
    short: 'Parlantes de escritorio con Bluetooth',
    description: 'Dos parlantes compactos con sonido equilibrado, entrada de 3.5 mm y control de volumen al frente.',
    features: ['Bluetooth y 3.5 mm', 'Control frontal', 'Alimentación USB', 'Diseño compacto'],
    colors: [{ name: 'Blanco', hex: '#f4f4f2' }],
    image: u('logitech/en/homepage/banners/cards/macbook-neo-desk-setup.jpg'),
    metaTitle: 'Desk Duo: parlantes de escritorio Bluetooth | Tech Studio',
    metaDescription: 'Parlantes de escritorio Desk Duo con Bluetooth y entrada de 3.5 mm, control de volumen frontal y alimentación USB. Sonido limpio y compacto.',
    metaImage: og('logitech/en/homepage/banners/cards/macbook-neo-desk-setup.jpg'),
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
