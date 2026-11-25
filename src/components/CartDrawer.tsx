import { useEffect, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Minus, Plus, Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Product } from '../data/products';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: Product;
  finish: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, finish: string, delta: number) => void;
  onRemoveItem: (productId: string, finish: string) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (items.length === 0 && step === 'checkout') {
      setStep('bag');
    }
  }, [items.length, step]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost = subtotal >= 500 || subtotal === 0 ? 0 : 35;
  const total = subtotal + shippingCost;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || !customerAddress.trim()) {
      return;
    }
    const generated = `KS-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generated);
    setStep('confirmed');
    onClearCart();
  };

  const handleCloseDrawer = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setCustomerName('');
      setCustomerEmail('');
      setCustomerAddress('');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex justify-end bg-black/55 dark:bg-black/75 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Bolsa de compra"
          onClick={handleCloseDrawer}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md h-full bg-[var(--bg-surface)] border-l border-[var(--border-hairline)] flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[var(--border-hairline)] flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-[var(--text-primary)] tracking-tight">
                  {step === 'bag' && 'Tu bolsa'}
                  {step === 'checkout' && 'Finalizar pedido'}
                  {step === 'confirmed' && 'Pedido confirmado'}
                </h2>
                {step === 'bag' && (
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {items.reduce((acc, i) => acc + i.quantity, 0)} artículos seleccionados
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={handleCloseDrawer}
                aria-label="Cerrar bolsa"
                className="w-10 h-10 flex items-center justify-center rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-alt)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {step === 'confirmed' ? (
                <div className="py-10 space-y-5">
                  <div className="w-11 h-11 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/40 flex items-center justify-center text-[var(--accent)]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-mono-tabular text-xs text-[var(--accent)]">
                      Orden {orderNumber}
                    </p>
                    <h3 className="font-display text-2xl font-semibold text-[var(--text-primary)]">
                      Gracias por tu compra, {customerName}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Hemos registrado tu solicitud de envío a {customerAddress}. Recibirás los detalles de seguimiento en {customerEmail}.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCloseDrawer}
                    className="w-full py-3 px-5 rounded-xl bg-[var(--cta-bg)] text-[var(--cta-text)] font-semibold text-sm hover:bg-[var(--cta-bg-hover)] transition-colors cursor-pointer"
                  >
                    Seguir explorando
                  </button>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                  <p className="text-base font-medium text-[var(--text-primary)]">
                    Tu bolsa está vacía
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] max-w-xs">
                    Explora la colección de monitores, auriculares y electrónica de estudio para comenzar.
                  </p>
                  <button
                    type="button"
                    onClick={handleCloseDrawer}
                    className="mt-2 px-5 py-2.5 rounded-xl bg-[var(--cta-bg)] text-[var(--cta-text)] text-sm font-semibold hover:bg-[var(--cta-bg-hover)] transition-colors cursor-pointer"
                  >
                    Ver colección
                  </button>
                </div>
              ) : step === 'bag' ? (
                <div className="space-y-5">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.finish}`}
                      className="flex gap-4 pb-5 border-b border-[var(--border-hairline)] last:border-b-0"
                    >
                      <div className="w-24 aspect-[4/3] rounded-xl overflow-hidden bg-[#0E0E11] shrink-0 border border-[var(--border-hairline)]">
                        <ResilientImage
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                              {item.product.name}
                            </h3>
                            <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">
                              {item.finish}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id, item.finish)}
                            aria-label={`Eliminar ${item.product.name}`}
                            className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="inline-flex items-center border border-[var(--border-hairline)] rounded-lg bg-[var(--bg-surface-alt)]">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.finish, -1)
                              }
                              aria-label="Reducir cantidad"
                              className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-mono-tabular text-xs text-[var(--text-primary)]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.finish, 1)
                              }
                              aria-label="Aumentar cantidad"
                              className="w-8 h-8 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono-tabular text-sm font-medium text-[var(--text-primary)]">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="checkout-name"
                      className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                    >
                      Nombre completo
                    </label>
                    <input
                      id="checkout-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Sofía Mendoza"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-hairline)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-email"
                      className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                    >
                      Correo electrónico
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="sofia@estudio.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-hairline)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="checkout-address"
                      className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
                    >
                      Dirección de envío
                    </label>
                    <input
                      id="checkout-address"
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Calle Velázquez 48, 28001 Madrid"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface-alt)] border border-[var(--border-hairline)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div className="pt-2 border-t border-[var(--border-hairline)] space-y-2 text-xs text-[var(--text-secondary)]">
                    <div className="flex justify-between">
                      <span>Pago contra entrega o transferencia</span>
                      <span className="text-[var(--text-primary)]">Sin recargos</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entrega estimada</span>
                      <span className="text-[var(--text-primary)]">48 – 72 h</span>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && step !== 'confirmed' && (
              <div className="p-6 border-t border-[var(--border-hairline)] bg-[var(--bg-canvas)] space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Subtotal</span>
                    <span className="font-mono-tabular text-[var(--text-primary)]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[var(--text-secondary)]">
                    <span>Envío asegurado</span>
                    <span className="font-mono-tabular text-[var(--text-primary)]">
                      {shippingCost === 0 ? 'Gratuito' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[var(--border-hairline)] font-semibold text-[var(--text-primary)]">
                    <span>Total</span>
                    <span className="font-mono-tabular text-base">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {step === 'bag' ? (
                  <button
                    type="button"
                    onClick={() => setStep('checkout')}
                    className="w-full py-3.5 px-6 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white dark:text-[#070709] font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continuar al pedido</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('bag')}
                      className="px-4 py-3.5 rounded-xl border border-[var(--border-hairline)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Volver
                    </button>
                    <button
                      type="submit"
                      form="checkout-form"
                      className="flex-1 py-3.5 px-5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white dark:text-[#070709] font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Confirmar · {formatPrice(total)}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
