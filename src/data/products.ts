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
}

// Fotos del CDN de Logitech (solo para uso académico, no comercial).
const u = (path: string, w = 900) =>
  `https://resource.logitech.com/w_${w},c_fill,q_auto,f_auto/content/dam/${path}`;

export const categories: Category[] = [
  { id: 'ratones', name: 'Ratones', tagline: 'Precisión en cada clic', icon: 'mouse', image: u('logitech/en/plp/mice/standard-cards/category-card-mice.jpg') },
  { id: 'teclados', name: 'Teclados', tagline: 'Escribe más cómodo', icon: 'keyboard', image: u('logitech/en/plp/keyboards/standard-cards/category-card-keyboards.jpg') },
  { id: 'audio', name: 'Audífonos', tagline: 'Sonido que se siente', icon: 'headset', image: u('logitech/en/homepage/banners/cards/girl-listening-zone300-rose-headset.jpg') },
  { id: 'webcams', name: 'Webcams', tagline: 'Luce bien en cada llamada', icon: 'webcam', image: u('logitech/en/plp/webcams/standard-cards/category-card-webcams.jpg') },
  { id: 'gaming', name: 'Gaming', tagline: 'Hecho para ganar', icon: 'gamepad', image: u('gaming/en/homepage/2025/gaming-keyboard.jpg') },
  { id: 'parlantes', name: 'Parlantes', tagline: 'Llena la habitación', icon: 'speaker', image: u('logitech/en/homepage/banners/cards/person-holding-miniroll-in-hand-hp-card.jpg') },
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
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
