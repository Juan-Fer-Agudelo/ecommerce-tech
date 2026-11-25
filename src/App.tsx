import { useMemo, useState, type FormEvent } from 'react';
import { ArrowRight, Check, ShoppingBag } from 'lucide-react';
import {
  CRAFT_IMAGE,
  HERO_FEATURED_PRODUCT,
  PRODUCTS,
  type Product,
  type ProductCategory,
} from './data/products';
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

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<FilterOption>('Todos');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

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
    <div className="min-h-screen bg-[#0B0B0D] text-[#F4F4F6] flex flex-col">
      {/* Top Bar: Strict 3-zone contract */}
      <header className="sticky top-0 z-40 bg-[#0B0B0D]/90 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#"
            className="font-display text-lg font-semibold tracking-tight text-[#F4F4F6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D9A05B] rounded"
          >
            Krono Studio
          </a>

          <nav
            aria-label="Navegación principal"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A1A1AA]"
          >
            <a
              href="#coleccion"
              className="hover:text-[#F4F4F6] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Colección
            </a>
            <a
              href="#ingenieria"
              className="hover:text-[#F4F4F6] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Ingeniería
            </a>
            <a
              href="#especificaciones"
              className="hover:text-[#F4F4F6] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Especificaciones
            </a>
            <a
              href="#contacto"
              className="hover:text-[#F4F4F6] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contacto
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#141417] hover:bg-[#1C1C21] border border-white/[0.1] text-xs font-medium text-[#F4F4F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D9A05B]"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#D9A05B]" />
            <span className="font-mono-tabular">
              Bolsa ({totalBagCount})
            </span>
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Section 1: Storefront Hero */}
        <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                <span>Serie 2026</span>
                <span aria-hidden="true">·</span>
                <span>Aluminio 6061</span>
                <span aria-hidden="true">·</span>
                <span>Garantía 5 años</span>
              </div>

              <h1 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-[#F4F4F6] [text-wrap:balance]">
                Arquitectura sonora en aluminio macizo.
              </h1>

              <p className="mt-5 text-base leading-relaxed text-[#A1A1AA] max-w-md">
                Monitores de referencia, auriculares planares y electrónica discreta diseñados para revelar cada matiz sin coloración.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#coleccion"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#D9A05B] hover:bg-[#E2AE6D] text-[#0B0B0D] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05B]"
                >
                  <span>Explorar colección</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveProduct(HERO_FEATURED_PRODUCT)}
                  className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-[#F4F4F6] hover:text-[#D9A05B] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D9A05B] rounded-lg"
                >
                  Ver Reference One
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 flex items-stretch">
              <button
                type="button"
                onClick={() => setActiveProduct(HERO_FEATURED_PRODUCT)}
                className="group relative w-full aspect-[16/9] lg:aspect-auto lg:min-h-[460px] rounded-xl overflow-hidden bg-[#141417] border border-white/[0.08] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D9A05B]"
                aria-label="Inspeccionar Krono Reference One"
              >
                <ResilientImage
                  src={HERO_FEATURED_PRODUCT.image}
                  alt="Columna acústica Krono Reference One en sala arquitectónica oscura"
                  fallbackTitle={HERO_FEATURED_PRODUCT.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                />
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-[#A1A1AA]">
                      {HERO_FEATURED_PRODUCT.category} ·{' '}
                      {HERO_FEATURED_PRODUCT.availability}
                    </p>
                    <p className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[#F4F4F6]">
                      {HERO_FEATURED_PRODUCT.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono-tabular text-base font-medium text-[#F4F4F6]">
                      {formatPrice(HERO_FEATURED_PRODUCT.price)}
                    </span>
                    <span className="text-xs font-medium text-[#D9A05B] group-hover:underline underline-offset-4">
                      Inspeccionar
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Featured Collection */}
        <section
          id="coleccion"
          className="border-t border-white/[0.08] max-w-[1280px] mx-auto px-5 sm:px-8 py-16 lg:py-24"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#F4F4F6]">
                Colección destacada
              </h2>
              <p className="mt-2 text-sm text-[#A1A1AA]">
                Piezas calibradas individualmente para escucha doméstica y estudio.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Interactive Category Filter Segmented Control */}
              <div
                role="tablist"
                aria-label="Filtrar por categoría"
                className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#141417] border border-white/[0.08]"
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
                      className={`px-3.5 py-2 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D9A05B] ${
                        isActive
                          ? 'bg-[#D9A05B] text-[#0B0B0D]'
                          : 'text-[#A1A1AA] hover:text-[#F4F4F6]'
                      }`}
                    >
                      {category}
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
                className="px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/[0.08] text-xs font-medium text-[#F4F4F6] focus:outline-none focus:border-[#D9A05B] cursor-pointer"
              >
                <option value="featured">Orden: Destacados</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredProducts.map((product) => {
              const isAdded = recentlyAddedId === product.id;
              return (
                <article
                  key={product.id}
                  className="group bg-[#141417] border border-white/[0.08] rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <button
                    type="button"
                    onClick={() => setActiveProduct(product)}
                    className="block w-full aspect-[4/3] bg-[#0E0E11] overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D9A05B]"
                    aria-label={`Ver detalles de ${product.name}`}
                  >
                    <ResilientImage
                      src={product.image}
                      alt={product.name}
                      fallbackTitle={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  </button>

                  <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                        <span>{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.availability}</span>
                      </div>

                      <h3 className="mt-2 font-display text-lg font-semibold text-[#F4F4F6]">
                        <button
                          type="button"
                          onClick={() => setActiveProduct(product)}
                          className="text-left hover:text-[#D9A05B] transition-colors cursor-pointer"
                        >
                          {product.name}
                        </button>
                      </h3>

                      <p className="mt-1 text-sm text-[#A1A1AA] line-clamp-2">
                        {product.subtitle}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                      <span className="font-mono-tabular text-base font-medium text-[#F4F4F6]">
                        {formatPrice(product.price)}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(product)}
                        className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#D9A05B] ${
                          isAdded
                            ? 'bg-[#D9A05B] text-[#0B0B0D]'
                            : 'bg-[#1C1C22] hover:bg-[#D9A05B] text-[#F4F4F6] hover:text-[#0B0B0D] border border-white/[0.08] hover:border-[#D9A05B]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Añadido</span>
                          </>
                        ) : (
                          <span>Añadir a la bolsa</span>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Section 3: Craftsmanship & Specifications */}
        <section
          id="ingenieria"
          className="border-t border-white/[0.08] max-w-[1280px] mx-auto px-5 sm:px-8 py-16 lg:py-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-6 flex items-stretch">
              <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-full rounded-xl overflow-hidden bg-[#141417] border border-white/[0.08]">
                <ResilientImage
                  src={CRAFT_IMAGE}
                  alt="Mecanizado CNC en aluminio anodizado negro y diales de latón"
                  fallbackTitle="Taller acústico Krono Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between gap-8">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#F4F4F6] [text-wrap:balance]">
                  Ingeniería pensada para durar décadas.
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
                  Cada recinto parte de bloques sólidos de aleación 6061 anodizados en negro mate. Evitamos plásticos estructurales y adhesivos permanentes para que cada componente pueda calibrarse o actualizarse con el tiempo.
                </p>

                <div className="mt-8 divide-y divide-white/[0.08] border-y border-white/[0.08]">
                  <div className="py-4">
                    <h3 className="font-display text-base font-semibold text-[#F4F4F6]">
                      01. Chasis fresado CNC
                    </h3>
                    <p className="mt-1 text-sm text-[#A1A1AA]">
                      Tolerancias mecánicas de 0.02 mm que eliminan vibraciones del gabinete.
                    </p>
                  </div>
                  <div className="py-4">
                    <h3 className="font-display text-base font-semibold text-[#F4F4F6]">
                      02. Calibración en cámara anecoica
                    </h3>
                    <p className="mt-1 text-sm text-[#A1A1AA]">
                      Cada par de monitores se mide y empareja dentro de ±0.5 dB antes del envío.
                    </p>
                  </div>
                  <div className="py-4">
                    <h3 className="font-display text-base font-semibold text-[#F4F4F6]">
                      03. Arquitectura modular
                    </h3>
                    <p className="mt-1 text-sm text-[#A1A1AA]">
                      Tarjetas DAC y transductores accesibles mediante tornillería estándar Torx.
                    </p>
                  </div>
                </div>
              </div>

              <div
                id="especificaciones"
                className="grid grid-cols-3 gap-4 pt-2"
              >
                <div>
                  <p className="font-mono-tabular text-xl sm:text-2xl font-medium text-[#F4F4F6]">
                    0.008%
                  </p>
                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    Distorsión armónica
                  </p>
                </div>
                <div>
                  <p className="font-mono-tabular text-xl sm:text-2xl font-medium text-[#F4F4F6]">
                    22 Hz
                  </p>
                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    Extensión grave mínima
                  </p>
                </div>
                <div>
                  <p className="font-mono-tabular text-xl sm:text-2xl font-medium text-[#F4F4F6]">
                    5 años
                  </p>
                  <p className="mt-1 text-xs text-[#A1A1AA]">
                    Garantía directa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Section 4: Quiet Editorial Footer */}
      <footer
        id="contacto"
        className="border-t border-white/[0.08] bg-[#09090B]"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-lg font-semibold text-[#F4F4F6]">
              Krono Studio
            </p>
            <p className="text-sm text-[#A1A1AA] max-w-sm">
              Objetos acústicos de precisión diseñados en Madrid. Audiciones privadas con cita previa de lunes a sábado.
            </p>
            <p className="text-xs text-[#71717A] pt-1">
              Calle de Almagro 24, Madrid · hola@kronostudio.es
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <p className="text-xs font-medium text-[#F4F4F6]">Navegación</p>
            <ul className="space-y-2 text-[#A1A1AA]">
              <li>
                <a href="#coleccion" className="hover:text-[#F4F4F6] transition-colors">
                  Colección
                </a>
              </li>
              <li>
                <a href="#ingenieria" className="hover:text-[#F4F4F6] transition-colors">
                  Ingeniería
                </a>
              </li>
              <li>
                <a href="#especificaciones" className="hover:text-[#F4F4F6] transition-colors">
                  Especificaciones
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-medium text-[#F4F4F6]">
              Boletín de lanzamientos
            </p>
            <p className="text-xs text-[#A1A1AA]">
              Recibe avisos de nuevas series limitadas y disponibilidad de stock.
            </p>
            {newsletterSubscribed ? (
              <p className="text-xs font-medium text-[#D9A05B] py-2">
                Suscripción confirmada. Te avisaremos en el próximo lanzamiento.
              </p>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex gap-2"
              >
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
                  className="flex-1 min-w-0 px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/[0.1] text-xs text-[#F4F4F6] placeholder:text-[#71717A] focus:outline-none focus:border-[#D9A05B]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-[#F4F4F6] hover:bg-white text-[#0B0B0D] text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Suscribirse
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/[0.06]">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#71717A]">
            <p>© 2026 Krono Studio. Todos los derechos reservados.</p>
            <p>Envíos asegurados internacionales · Garantía de 5 años</p>
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
