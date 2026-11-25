import { useEffect } from 'react';
import { categories, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { href } from '../router';
import { Icon } from './Icon';
import { SmartImage } from './SmartImage';

const FREE_SHIPPING = 29;

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, setQty, remove, count } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  if (!isOpen) return null;
  const missing = Math.max(0, FREE_SHIPPING - subtotal);

  return (
    <div className="drawer-overlay" onClick={close}>
      <aside className="cart-drawer" role="dialog" aria-label="Carrito" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h2>Tu carrito ({count})</h2>
          <button className="icon-btn" aria-label="Cerrar carrito" onClick={close}>
            <Icon name="close" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="cart-empty">
            <Icon name="cart" size={48} />
            <p>Tu carrito está vacío.</p>
            <a href={href.home()} className="btn btn-dark" onClick={close}>
              Seguir comprando
            </a>
          </div>
        ) : (
          <>
            <div className="ship-meter">
              <p>{missing > 0 ? <>Te faltan <strong>{formatPrice(missing)}</strong> para el envío gratis</> : <strong>Tu pedido tiene envío gratis</strong>}</p>
              <div className="meter"><span style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING) * 100)}%` }} /></div>
            </div>
            <ul className="cart-lines">
              {lines.map((l) => (
                <li key={l.productId + l.color}>
                  <SmartImage src={l.product.image} alt={l.product.name} fallbackIcon={categories.find((c) => c.id === l.product.category)?.icon} />
                  <div className="line-info">
                    <a href={href.product(l.productId)} onClick={close} className="line-name">{l.product.name}</a>
                    <span className="muted">{l.product.brand}</span>
                    <div className="qty">
                      <button aria-label="Quitar uno" onClick={() => setQty(l.productId, l.color, l.qty - 1)}><Icon name="minus" size={16} /></button>
                      <span>{l.qty}</span>
                      <button aria-label="Añadir uno" onClick={() => setQty(l.productId, l.color, l.qty + 1)}><Icon name="plus" size={16} /></button>
                    </div>
                  </div>
                  <div className="line-right">
                    <strong>{formatPrice(l.qty * (l.product.price ?? 0))}</strong>
                    <button className="icon-btn" aria-label="Eliminar" onClick={() => remove(l.productId, l.color)}><Icon name="trash" size={18} /></button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart-foot">
              <div className="row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <p className="muted small">Impuestos y envío se calculan al pagar.</p>
              <button className="btn btn-primary btn-block" onClick={() => alert('Checkout de demostración: aquí se conectaría la pasarela de pago.')}>
                Ir a pagar
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
