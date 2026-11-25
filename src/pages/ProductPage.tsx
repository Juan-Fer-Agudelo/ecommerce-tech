import { useState } from 'react';
import { categories, formatPrice, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { href } from '../router';
import { SITE_URL, useSeo } from '../seo';
import { defaults, productMeta, utilityMeta } from '../seoMeta';
import { Icon } from '../components/Icon';
import { ProductCard, Stars } from '../components/ProductCard';
import { SmartImage } from '../components/SmartImage';

export function ProductPage({ id }: { id: string }) {
  const product = products.find((p) => p.id === id);
  const { add } = useCart();
  const [color, setColor] = useState(product?.colors[0].name ?? '');
  const [qty, setQty] = useState(1);
  const productCat = categories.find((c) => c.id === product?.category);

  useSeo(
    product && productCat
      ? productMeta(SITE_URL, product)
      : utilityMeta('Producto no encontrado | Tech Studio', defaults.description, href.product(id)),
  );

  if (!product) {
    return (
      <div className="container empty">
        <h1>Producto no encontrado</h1>
        <a href={href.home()} className="btn btn-dark">Volver al inicio</a>
      </div>
    );
  }

  const cat = productCat!;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id)
    .concat(products.filter((p) => p.category !== product.category && p.badge === 'Más vendido'))
    .slice(0, 4);

  return (
    <div className="container pdp">
      <nav className="crumbs" aria-label="Ruta">
        <a href={href.home()}>Inicio</a> / <a href={href.category(cat.id)}>{cat.name}</a> / <span>{product.name}</span>
      </nav>

      <div className="pdp-grid">
        <div className="pdp-media">
          {product.badge && <span className={`badge badge-${product.badge === 'Oferta' ? 'sale' : 'new'}`}>{product.badge}</span>}
          <SmartImage src={product.image} alt={product.name} fallbackIcon={cat.icon} />
        </div>

        <div className="pdp-info">
          <span className="eyebrow">{cat.name}</span>
          <h1>{product.name}</h1>
          <p className="pdp-short">{product.short}</p>
          <Stars rating={product.rating} reviews={product.reviews} />

          <div className="price price-lg">
            {formatPrice(product.price)}
            {product.oldPrice && (
              <>
                <s>{formatPrice(product.oldPrice)}</s>
                <span className="save">Ahorras {formatPrice(product.oldPrice - product.price)}</span>
              </>
            )}
          </div>

          <div className="option">
            <p>Color: <strong>{color}</strong></p>
            <div className="swatches swatches-lg">
              {product.colors.map((c) => (
                <button key={c.name} className={`swatch ${c.name === color ? 'on' : ''}`} style={{ background: c.hex }} aria-label={c.name} aria-pressed={c.name === color} onClick={() => setColor(c.name)} />
              ))}
            </div>
          </div>

          <div className="buy-row">
            <div className="qty qty-lg">
              <button aria-label="Quitar uno" onClick={() => setQty((q) => Math.max(1, q - 1))}><Icon name="minus" size={18} /></button>
              <span>{qty}</span>
              <button aria-label="Añadir uno" onClick={() => setQty((q) => q + 1)}><Icon name="plus" size={18} /></button>
            </div>
            <button className="btn btn-primary btn-grow" onClick={() => add(product.id, color, qty)}>
              Añadir al carrito
            </button>
          </div>

          <ul className="pdp-perks">
            <li><Icon name="truck" size={20} /> Envío gratis y entrega en 2 a 4 días hábiles</li>
            <li><Icon name="return" size={20} /> Devoluciones gratis durante 30 días</li>
            <li><Icon name="shield" size={20} /> Garantía limitada de 2 años</li>
          </ul>

          <details open>
            <summary>Descripción</summary>
            <p>{product.description}</p>
          </details>
          <details>
            <summary>Características</summary>
            <ul className="features">
              {product.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </details>
          <details>
            <summary>En la caja</summary>
            <p>{product.name}, cable o receptor según el modelo, guía rápida y tarjeta de garantía.</p>
          </details>
        </div>
      </div>

      <section className="section">
        <div className="section-head"><h2>También te puede gustar</h2></div>
        <div className="grid">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
