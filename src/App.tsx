import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, Moon, ShoppingBag, Sun } from 'lucide-react';
import {
  CRAFT_IMAGE,
  HERO_FEATURED_PRODUCT,
  PRODUCTS,
  type Product,
  type ProductCategory,
} from './data/products';
import { DEFAULT_THEME, type ThemeMode } from './theme';
import { ResilientImage } from './components/ResilientImage';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, type CartItem } from './components/CartDrawer';

type FilterOption = 'Todos' | ProductCategory;
type SortOption = 'featured' | 'price-asc' | 'price-desc';

const FILTER_CATEGORIES: FilterOption[] = [
  'Todos',
  'Altavoces',
  'Auriculares',
  'Electrónica',
];

interface EngineeringTab {
  id: string;
  title: string;
  summary: string;
  metrics: { label: string; value: string }[];
}

const ENGINEERING_TABS: EngineeringTab[] = [
  {
    id: '01',
    title: '01. Chasis fresado CNC',
    summary:
      'Mecanizamos cada recinto a partir de bloques macizos de aluminio aeronáutico 6061. La ausencia de uniones pegadas suprime por completo las coloraciones del gabinete.',
    metrics: [
      { label: 'Tolerancia mecánica', value: '±0.02 mm' },
      { label: 'Espesor frontal', value: '18 mm macizo' },
      { label: 'Acabado superficial', value: 'Anodizado duro Tipo III' },
    ],
  },
  {
    id: '02',
    title: '02. Calibración anecoica',
    summary:
      'Cada transductor y filtro divisor se ajusta individualmente en cámara anecoica para garantizar una coherencia de fase absoluta en todo el espectro audible.',
    metrics: [
      { label: 'Emparejamiento por par', value: '±0.5 dB' },
      { label: 'Distorsión armónica', value: '0.008% THD' },
      { label: 'Respuesta mínima', value: '22 Hz (-3 dB)' },
    ],
  },
  {
    id: '03',
    title: '03. Arquitectura modular',
    summary:
      'Diseñados para durar décadas. Todas las etapas DAC, módulos de amplificación y drivers se ensamblan con tornillería Torx estándar para un mantenimiento directo.',
    metrics: [
      { label: 'Garantía directa', value: '5 años' },
      { label: 'Fijación estructural', value: 'Acero inoxidable Torx' },
      { label: 'Actualización DAC', value: 'Placa intercambiable' },
    ],
  },
];

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(DEFAULT_THEME);
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>('Todos');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [activeEngTab, setActiveEngTab] = useState<string>('01');

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const filteredProducts = useMemo(() => {
    const base =
      selectedCategory === 'Todos'
        ? PRODUCTS
        : PRODUCTS.filter((item) => item.category === selectedCategory);

    const copy = [...base];
    if (sortBy === 'price-asc') {
      copy.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      copy.sort((a, b) => b.price - a.price);
    } else {
      copy.sort((a, b) => a.featuredOrder - b.featuredOrder);
    }
    return copy;
  }, [selectedCategory, sortBy]);

  const currentEngTab =
    ENGINEERING_TABS.find((t) => t.id === activeEngTab) ?? ENGINEERING_TABS[0];

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  const handleAddToCart = (product: Product, finish?: string) => {
    const chosenFinish = finish || product.finishes[0];
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (entry) =>
          entry.product.id === product.id && entry.finish === chosenFinish
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, finish: chosenFinish, quantity: 1 }];
    });

    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId((current) => (current === product.id ? null : current));
    }, 1200);
  };

  const handleUpdateQuantity = (
    productId: string,
    finish: string,
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId && item.finish === finish
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (productId: string, finish: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.finish === finish)
      )
    );
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] flex flex-col relative overflow-x-hidden transition-colors duration-200">
      {/* Subtle architectural ambient spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_60%_50%_at_70%_0%,rgba(182,123,52,0.08),transparent)] dark:bg-[radial-gradient(ellipse_60%_50%_at_70%_0%,rgba(217,160,91,0.09),transparent)]"
      />

      {/* Top Bar: Strict 3-zone contract */}
      <header className="sticky top-0 z-40 bg-[var(--bg-canvas)]/85 backdrop-blur-xl border-b border-[var(--border-hairline)] transition-colors duration-200">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#"
            className="font-display text-lg font-semibold tracking-tight text-[var(--text-primary)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded"
          >
            Krono Studio
          </a>

          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-secondary)]"
          >
            <a
              href="#coleccion"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Colección
            </a>
            <a
              href="#ingenieria"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Ingeniería
            </a>
            <a
              href="#especificaciones"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Especificaciones
            </a>
            <a
              href="#contacto"
              className="hover:text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contacto
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-alt)] border border-[var(--border-hairline)] text-xs font-medium text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="font-mono-tabular">Bolsa ({totalBagCount})</span>
          </button>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Section 1: Modern Storefront Hero */}
        <section className="max-w-[1320px] mx-auto px-5 sm:px-8 pt-10 pb-14 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                  <span>Serie 2026</span>
                  <span aria-hidden="true">·</span>
                  <span>Aluminio 6061</span>
                  <span aria-hidden="true">·</span>
                  <span>Madrid</span>
                </div>

                <h1 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--text-primary)] [text-wrap:balance]">
                  Sonido esculpido en metal sólido.
                </h1>

                <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)] max-w-md">
                  Monitores de referencia, auriculares planares y electrónica discreta concebidos para ofrecer transparencia acústica absoluta.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#coleccion"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--cta-bg)] hover:bg-[var(--cta-bg-hover)] text-[var(--cta-text)] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    <span>Explorar colección</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveProduct(HERO_FEATURED_PRODUCT)}
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-alt)] border border-[var(--border-hairline)] text-sm font-medium text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  >
                    Reference One
                  </button>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-[var(--border-hairline)] grid grid-cols-3 gap-4">
                <div>
                  <p className="font-mono-tabular text-lg font-medium text-[var(--text-primary)]">
                    28 Hz
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                    Respuesta grave
                  </p>
                </div>
                <div>
                  <p className="font-mono-tabular text-lg font-medium text-[var(--text-primary)]">
                    0.02 mm
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                    Fresado CNC
                  </p>
                </div>
                <div>
                  <p className="font-mono-tabular text-lg font-medium text-[var(--text-primary)]">
                    5 años
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                    Garantía directa
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex items-stretch">
              <button
                type="button"
                onClick={() => setActiveProduct(HERO_FEATURED_PRODUCT)}
                className="group relative w-full aspect-[16/9] lg:aspect-auto lg:min-h-[500px] rounded-2xl overflow-hidden bg-[#101013] border border-[var(--border-hairline)] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                aria-label="Inspeccionar Krono Reference One"
              >
                <ResilientImage
                  src={HERO_FEATURED_PRODUCT.image}
                  alt="Columna acústica Krono Reference One en sala arquitectónica oscura"
                  fallbackTitle={HERO_FEATURED_PRODUCT.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                />
                <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 p-4 sm:p-5 rounded-xl bg-[var(--bg-surface)]/90 dark:bg-[#070709]/80 backdrop-blur-md border border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {HERO_FEATURED_PRODUCT.category} ·{' '}
                      {HERO_FEATURED_PRODUCT.availability}
                    </p>
                    <p className="mt-0.5 font-display text-lg sm:text-xl font-semibold text-[var(--text-primary)]">
                      {HERO_FEATURED_PRODUCT.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono-tabular text-base font-medium text-[var(--text-primary)]">
                      {formatPrice(HERO_FEATURED_PRODUCT.price)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] group-hover:translate-x-0.5 transition-transform">
                      <span>Inspeccionar</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Modern Bento Product Grid */}
        <section
          id="coleccion"
          className="border-t border-[var(--border-hairline)] max-w-[1320px] mx-auto px-5 sm:px-8 py-16 lg:py-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                Colección destacada
              </h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                Sistemas calibrados individualmente con entrega asegurada sin coste.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Animated Segmented Category Filter */}
              <div
                role="tablist"
                aria-label="Filtrar por categoría"
                className="inline-flex items-center gap-1 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)]"
              >
                {FILTER_CATEGORIES.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(category)}
                      className={`relative px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
                        isActive
                          ? 'text-[var(--cta-text)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-category-bg"
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 32,
                          }}
                          className="absolute inset-0 rounded-lg bg-[var(--cta-bg)]"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{category}</span>
                    </button>
                  );
                })}
              </div>

              <label className="sr-only" htmlFor="sort-select">
                Ordenar productos
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-xs font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
              >
                <option value="featured">Orden: Destacados</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const isAdded = recentlyAddedId === product.id;
              return (
                <article
                  key={product.id}
                  className="group bg-[var(--bg-surface)] border border-[var(--border-hairline)] hover:border-[var(--border-hairline-strong)] rounded-2xl p-3 flex flex-col transition-all duration-200 hover:-translate-y-0.5"
                >
                  <button
                    type="button"
                    onClick={() => setActiveProduct(product)}
                    className="relative block w-full aspect-[4/3] rounded-xl bg-[#0E0E11] overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                    aria-label={`Ver detalles de ${product.name}`}
                  >
                    <ResilientImage
                      src={product.image}
                      alt={product.name}
                      fallbackTitle={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                    <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-3 py-1.5 rounded-lg bg-[#070709]/85 backdrop-blur-md border border-white/[0.14] text-xs font-medium text-[#F4F4F6]">
                      Vista rápida
                    </span>
                  </button>

                  <div className="px-3 pt-4 pb-2 flex-1 flex flex-col justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.availability}</span>
                      </div>

                      <h3 className="mt-1.5 font-display text-lg font-semibold text-[var(--text-primary)] tracking-tight">
                        <button
                          type="button"
                          onClick={() => setActiveProduct(product)}
                          className="text-left hover:text-[var(--accent)] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </button>
                      </h3>

                      <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2">
                        {product.subtitle}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-[var(--border-hairline)] flex items-center justify-between gap-4">
                      <span className="font-mono-tabular text-base font-medium text-[var(--text-primary)]">
                        {formatPrice(product.price)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
                          isAdded
                            ? 'bg-[var(--accent)] text-white dark:text-[#070709]'
                            : 'bg-[var(--bg-surface-alt)] hover:bg-[var(--cta-bg)] text-[var(--text-primary)] hover:text-[var(--cta-text)] border border-[var(--border-hairline)]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Añadido</span>
                          </>
                        ) : (
                          <span>Añadir</span>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 3: Interactive Engineering & Craftsmanship */}
        <section
          id="ingenieria"
          className="border-t border-[var(--border-hairline)] max-w-[1320px] mx-auto px-5 sm:px-8 py-16 lg:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex items-stretch">
              <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-full rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-hairline)] p-3">
                <div className="w-full h-full rounded-xl overflow-hidden bg-[#0E0E11]">
                  <ResilientImage
                    src={CRAFT_IMAGE}
                    alt="Mecanizado CNC en aluminio anodizado negro y diales de latón"
                    fallbackTitle="Taller acústico Krono Studio"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between gap-8 py-2">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] [text-wrap:balance]">
                  Ingeniería pensada para durar décadas.
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                  Explora los principios constructivos detrás de cada chasis y etapa de amplificación Krono Studio.
                </p>

                {/* Interactive Engineering Selector */}
                <div className="mt-7 flex flex-wrap gap-2">
                  {ENGINEERING_TABS.map((tab) => {
                    const active = tab.id === activeEngTab;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveEngTab(tab.id)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
                          active
                            ? 'bg-[var(--cta-bg)] border-[var(--cta-bg)] text-[var(--cta-text)]'
                            : 'bg-[var(--bg-surface)] border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hairline-strong)]'
                        }`}
                      >
                        {tab.title}
                      </button>
                    );
                  })}
                </div>

                <div
                  id="especificaciones"
                  className="mt-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] p-6"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentEngTab.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                        {currentEngTab.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {currentEngTab.summary}
                      </p>

                      <dl className="mt-6 pt-4 border-t border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {currentEngTab.metrics.map((metric) => (
                          <div key={metric.label}>
                            <dt className="text-xs text-[var(--text-secondary)]">
                              {metric.label}
                            </dt>
                            <dd className="mt-1 font-mono-tabular text-sm font-medium text-[var(--text-primary)]">
                              {metric.value}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Section 4: Quiet Modern Footer */}
      <footer
        id="contacto"
        className="border-t border-[var(--border-hairline)] bg-[var(--bg-footer)] transition-colors duration-200"
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-lg font-semibold text-[var(--text-primary)]">
              Krono Studio
            </p>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm">
              Objetos acústicos de precisión diseñados en Madrid. Audiciones privadas con cita previa de lunes a sábado.
            </p>
            <p className="text-xs text-[var(--text-muted)] pt-1">
              Calle de Almagro 24, Madrid · hola@kronostudio.es
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="text-xs font-medium text-[var(--text-primary)]">
              Navegación
            </p>
            <ul className="space-y-2 text-[var(--text-secondary)]">
              <li>
                <a
                  href="#coleccion"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  Colección
                </a>
              </li>
              <li>
                <a
                  href="#ingenieria"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  Ingeniería
                </a>
              </li>
              <li>
                <a
                  href="#especificaciones"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  Especificaciones
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-medium text-[var(--text-primary)]">
              Boletín de lanzamientos
            </p>
            <p className="text-xs text-[var(--text-secondary)]">
              Recibe avisos de nuevas series limitadas y disponibilidad de stock.
            </p>
            {newsletterSubscribed ? (
              <p className="text-xs font-medium text-[var(--accent)] py-2">
                Suscripción confirmada. Te avisaremos en el próximo lanzamiento.
              </p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Correo electrónico
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-xs text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[var(--cta-bg)] hover:bg-[var(--cta-bg-hover)] text-[var(--cta-text)] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Suscribirse
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-[var(--border-hairline)]">
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
            <p>© 2026 Krono Studio. Todos los derechos reservados.</p>

            <div className="flex items-center gap-4">
              <span>Envíos asegurados internacionales</span>
              <button
                type="button"
                onClick={() =>
                  setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
                }
                aria-label={
                  theme === 'dark'
                    ? 'Cambiar a modo claro'
                    : 'Cambiar a modo oscuro'
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-hairline)] text-[var(--text-primary)] hover:border-[var(--border-hairline-strong)] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Modo claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>Modo oscuro</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Quick-View Product Modal */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={(product, finish) => handleAddToCart(product, finish)}
      />

      {/* Slide-over Shopping Bag & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
