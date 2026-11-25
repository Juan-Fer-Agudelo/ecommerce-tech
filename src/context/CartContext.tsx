import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { products, type Product } from '../data/products';

export interface CartLine {
  productId: string;
  color: string;
  qty: number;
}

interface CartState {
  lines: (CartLine & { product: Product })[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (productId: string, color: string, qty?: number) => void;
  setQty: (productId: string, color: string, qty: number) => void;
  remove: (productId: string, color: string) => void;
}

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = 'tech-studio-cart';

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>(loadCart);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {
      /* storage unavailable */
    }
  }, [raw]);

  const value = useMemo<CartState>(() => {
    const lines = raw
      .map((l) => ({ ...l, product: products.find((p) => p.id === l.productId)! }))
      .filter((l) => l.product);
    const same = (l: CartLine, id: string, c: string) => l.productId === id && l.color === c;
    return {
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.qty * l.product.price, 0),
      isOpen,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add: (id, color, qty = 1) => {
        setRaw((prev) =>
          prev.some((l) => same(l, id, color))
            ? prev.map((l) => (same(l, id, color) ? { ...l, qty: l.qty + qty } : l))
            : [...prev, { productId: id, color, qty }],
        );
        setOpen(true);
      },
      setQty: (id, color, qty) =>
        setRaw((prev) =>
          qty <= 0
            ? prev.filter((l) => !same(l, id, color))
            : prev.map((l) => (same(l, id, color) ? { ...l, qty } : l)),
        ),
      remove: (id, color) => setRaw((prev) => prev.filter((l) => !same(l, id, color))),
    };
  }, [raw, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
