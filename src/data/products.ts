export type ProductCategory = 'Altavoces' | 'Auriculares' | 'Electrónica';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  availability: string;
  price: number;
  image: string;
  finishes: string[];
  description: string;
  specs: ProductSpec[];
  featuredOrder: number;
}

export const HERO_FEATURED_PRODUCT: Product = {
  id: 'krono-reference-one',
  name: 'Krono Reference One',
  subtitle: 'Columna acústica monolítica de dos vías y media',
  category: 'Altavoces',
  availability: 'Serie numerada',
  price: 3400,
  image: '/src/assets/images/hero_acoustic_speaker_1795626488345.jpg',
  finishes: ['Obsidiana Mate / Latón', 'Grafito Anodizado'],
  description:
    'Chasis monocasco fresado en aluminio aeronáutico 6061 con guía de ondas en latón cepillado. Diseñada para ofrecer una escena sonora tridimensional sin resonancias parásitas.',
  specs: [
    { label: 'Respuesta de frecuencia', value: '28 Hz – 26 kHz (±2 dB)' },
    { label: 'Sensibilidad', value: '89 dB / 2.83 V / 1 m' },
    { label: 'Impedancia nominal', value: '4 Ohmios' },
    { label: 'Peso unitario', value: '34.5 kg' },
  ],
  featuredOrder: 0,
};

export const PRODUCTS: Product[] = [
  {
    id: 'krono-monitor-s2',
    name: 'Monitor Compacto S2',
    subtitle: 'Monitor de campo cercano en aluminio anodizado',
    category: 'Altavoces',
    availability: 'En stock',
    price: 1290,
    image: '/src/assets/images/product_monitor_compact_1795626489177.jpg',
    finishes: ['Carbón Mate / Bronce', 'Negro Profundo'],
    description:
      'Tweeter de cúpula de berilio con anillo difusor en bronce cepillado y woofer de fibra tejida. Precisión de estudio para salas de escucha domésticas o estudios privados.',
    specs: [
      { label: 'Respuesta de frecuencia', value: '42 Hz – 28 kHz' },
      { label: 'Amplificación recomendada', value: '40 – 150 W' },
      { label: 'Dimensiones', value: '310 × 195 × 240 mm' },
      { label: 'Peso por unidad', value: '8.4 kg' },
    ],
    featuredOrder: 1,
  },
  {
    id: 'krono-planar-p1',
    name: 'Auriculares Planar P1',
    subtitle: 'Transductor magnético planar abierto de referencia',
    category: 'Auriculares',
    availability: 'En stock',
    price: 1450,
    image: '/src/assets/images/product_planar_headphones_1795626490184.jpg',
    finishes: ['Negro Mate / Cuero', 'Titanio Oscuro'],
    description:
      'Diafragma ultrafino de 1.8 micras suspendido entre matrices de imanes de neodimio simétricos. Diadema articulada en acero de resorte y almohadillas en piel perforada.',
    specs: [
      { label: 'Transductor', value: 'Planar magnético 100 mm' },
      { label: 'Impedancia', value: '38 Ohmios' },
      { label: 'Sensibilidad', value: '96 dB / 1 mW' },
      { label: 'Cable incluido', value: 'Trenzado 2.0 m (6.3 mm)' },
    ],
    featuredOrder: 2,
  },
  {
    id: 'krono-dac-a1',
    name: 'Amplificador DAC A1',
    subtitle: 'Convertidor balanceado Clase A con dial sólido',
    category: 'Electrónica',
    availability: 'En stock',
    price: 980,
    image: '/src/assets/images/product_dac_amplifier_1795626490657.jpg',
    finishes: ['Grafito / Dial Latón', 'Negro Monolito'],
    description:
      'Etapa de salida discreta en Clase A pura con potenciómetro escalonado mecanizado en latón macizo. Entradas USB-C, óptica y coaxial aisladas galvánicamente.',
    specs: [
      { label: 'Potencia de salida', value: '3.2 W a 32 Ohmios' },
      { label: 'Conversión PCM / DSD', value: '32-bit / 768 kHz · DSD512' },
      { label: 'Relación señal/ruido', value: '124 dB (ponderado A)' },
      { label: 'Dimensiones', value: '215 × 180 × 68 mm' },
    ],
    featuredOrder: 3,
  },
  {
    id: 'krono-turntable-t1',
    name: 'Giradiscos Arquitectónico T1',
    subtitle: 'Tracción por correa con plinto macizo y brazo en titanio',
    category: 'Electrónica',
    availability: 'Bajo pedido',
    price: 2150,
    image: '/src/assets/images/product_turntable_minimal_1795626491514.jpg',
    finishes: ['Obsidiana / Titanio', 'Pizarra Mate'],
    description:
      'Plinto antirresonante de alta densidad, plato en acrílico ahumado de 32 mm y brazo unipivote mecanizado en titanio grado 5 con cápsula MC precalibrada.',
    specs: [
      { label: 'Velocidades', value: '33.3 / 45 RPM electrónicas' },
      { label: 'Fluctuación (Wow & Flutter)', value: '< 0.04%' },
      { label: 'Brazo efectivo', value: '239 mm Titanio Grado 5' },
      { label: 'Peso total', value: '14.2 kg' },
    ],
    featuredOrder: 4,
  },
  {
    id: 'krono-sub-cube',
    name: 'Subwoofer Sellado C8',
    subtitle: 'Extensión de subgraves de 8 pulgadas en cubo biselado',
    category: 'Altavoces',
    availability: 'En stock',
    price: 1120,
    image: '/src/assets/images/product_wireless_subwoofer_1795626491329.jpg',
    finishes: ['Negro Mate / Aluminio', 'Grafito Satinado'],
    description:
      'Recinto acústico hermético con biselado de aluminio cepillado y amplificación DSP de 450 W RMS. Integración sin retardo con monitores de campo cercano.',
    specs: [
      { label: 'Extensión inferior', value: '22 Hz (-3 dB)' },
      { label: 'Amplificación interna', value: '450 W RMS Clase D' },
      { label: 'Filtro paso bajo', value: '40 Hz – 140 Hz continuo' },
      { label: 'Dimensiones', value: '295 × 295 × 310 mm' },
    ],
    featuredOrder: 5,
  },
  {
    id: 'krono-iem-m1',
    name: 'Monitores In-Ear M1',
    subtitle: 'Cápsulas mecanizadas en titanio con cable trenzado',
    category: 'Auriculares',
    availability: 'Edición limitada',
    price: 680,
    image: '/src/assets/images/product_iem_earphones_1795626491711.jpg',
    finishes: ['Titanio Cepillado', 'Obsidiana Mate'],
    description:
      'Arquitectura híbrida de driver dinámico de 10 mm y doble armadura balanceada alojada en titanio microgranallado. Aislamiento pasivo de 26 dB.',
    specs: [
      { label: 'Impedancia', value: '18 Ohmios' },
      { label: 'Sensibilidad', value: '108 dB / mW' },
      { label: 'Conectores', value: 'MMCX chapado en oro' },
      { label: 'Cable', value: 'Cobre OCC trenzado 4.4 mm' },
    ],
    featuredOrder: 6,
  },
];

export const CRAFT_IMAGE = '/src/assets/images/craft_cnc_acoustics_1795626492757.jpg';
