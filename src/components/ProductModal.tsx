import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Check, ShieldCheck, Truck } from 'lucide-react';
import type { Product } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, finish: string) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [selectedFinish, setSelectedFinish] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedFinish(product.finishes[0] ?? '');
      setJustAdded(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  const formattedPrice = product
    ? new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(product.price)
    : '';

  const handleAdd = () => {
    if (!product) return;
    onAddToCart(product, selectedFinish || product.finishes[0]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-[#101013] border border-white/[0.1] rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 p-3 gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar detalle del producto"
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-xl bg-[#070709]/85 text-[#A1A1AA] hover:text-[#F4F4F6] border border-white/[0.1] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D9A05B]"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left: Framed Studio Image (r_inner = r_outer - padding) */}
            <div className="lg:col-span-6 bg-[#070709] rounded-xl overflow-hidden flex items-stretch border border-white/[0.06]">
              <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
                <ResilientImage
                  src={product.image}
                  alt={product.name}
                  fallbackTitle={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right: Contiguous Purchase Module */}
            <div className="lg:col-span-6 p-4 sm:p-6 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                  <span>{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.availability}</span>
                </div>

                <h2
                  id="modal-product-title"
                  className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#F4F4F6] tracking-[-0.02em]"
                >
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-[#A1A1AA]">{product.subtitle}</p>

                <div className="mt-4 font-mono-tabular text-2xl font-medium text-[#F4F4F6]">
                  {formattedPrice}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA]">
                  {product.description}
                </p>

                {/* Finish selector */}
                <div className="mt-6">
                  <span className="block text-xs font-medium text-[#A1A1AA] mb-2.5">
                    Acabado disponible
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.finishes.map((finish) => {
                      const active = selectedFinish === finish;
                      return (
                        <button
                          key={finish}
                          type="button"
                          onClick={() => setSelectedFinish(finish)}
                          className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D9A05B] ${
                            active
                              ? 'bg-[#F4F4F6] border-[#F4F4F6] text-[#070709]'
                              : 'bg-[#070709] border-white/[0.1] text-[#A1A1AA] hover:text-[#F4F4F6] hover:border-white/25'
                          }`}
                        >
                          {finish}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Technical specs */}
                <dl className="mt-6 border-t border-white/[0.08] pt-4 space-y-2.5">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-4 text-xs"
                    >
                      <dt className="text-[#A1A1AA]">{spec.label}</dt>
                      <dd className="font-mono-tabular text-[#F4F4F6] text-right">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#D9A05B] hover:bg-[#E4AF6E] text-[#070709] font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D9A05B]"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Añadido a la bolsa</span>
                    </>
                  ) : (
                    <span>Añadir a la bolsa · {formattedPrice}</span>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs text-[#A1A1AA] pt-1">
                  <span className="inline-flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#D9A05B]" />
                    Envío asegurado sin coste
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D9A05B]" />
                    Garantía de 5 años
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
