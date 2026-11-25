import { useState } from 'react';
import { categories, formatPrice, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { href } from '../router';
import { SITE_URL, useSeo } from '../seo';
import { defaults, productMeta, utilityMeta } from '../seoMeta';
import { Icon } from '../components/Icon';
import { amazonLinkProps, ProductCard } from '../components/ProductCard';
import { SmartImage } from '../components/SmartImage';

export function ProductPage({ id }: { id: string }) {
  const product = products.find((p) => p.id === id);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const cat = categories.find((c) => c.id === product?.category);

  useSeo(
    product && cat
      ? productMeta(SITE_URL, product)
      : utilityMeta('Producto no encontrado | Tech Studio', defaults.description, href.product(id)),
  );

  if (!product || !cat) {
    return (
      <div className="container empty">
        <h1>Producto no encontrado</h1>
        <a href={href.home()} className="btn btn-dark">Volver al inicio</a>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .sort((a, b) => Number(b.brand === product.brand) - Number(a.brand === product.brand))
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
          <span className="eyebrow">{product.brand} · {cat.name}</span>
          <h1>{product.name}</h1>
          <p className="pdp-short">{product.short}</p>

          {product.price ? (
            <>
              <div className="price price-lg">
                {formatPrice(product.price)}
                {product.oldPrice && (
                  <>
                    <s>{formatPrice(product.oldPrice)}</s>
                    <span className="save">Ahorras {formatPrice(product.oldPrice - product.price)}</span>
                  </>
                )}
              </div>
              <div className="buy-row">
                <div className="qty qty-lg">
                  <button aria-label="Quitar uno" onClick={() => setQty((q) => Math.max(1, q - 1))}><Icon name="minus" size={18} /></button>
                  <span>{qty}</span>
                  <button aria-label="Añadir uno" onClick={() => setQty((q) => q + 1)}><Icon name="plus" size={18} /></button>
                </div>
                <button className="btn btn-primary btn-grow" onClick={() => add(product.id, '', qty)}>
                  Añadir al carrito
                </button>
              </div>
              <a className="btn btn-amazon btn-block" href={product.amazonUrl} {...amazonLinkProps}>
                Ver en Amazon
              </a>
              <p className="price-note">{product.priceNote}. Puede haber cambiado; confirma el precio en Amazon.</p>
            </>
          ) : (
            <>
              <a className="btn btn-amazon btn-block btn-amazon-lg" href={product.amazonUrl} {...amazonLinkProps}>
                Ver precio en Amazon
              </a>
              <p className="price-note">No tenemos un precio confirmado de este producto. Consulta el precio actual en Amazon.</p>
            </>
          )}

          <ul className="pdp-perks">
            <li><Icon name="shield" size={20} /> Producto original de {product.brand}</li>
            <li><Icon name="truck" size={20} /> Vendido y enviado a través de Amazon</li>
            <li><Icon name="return" size={20} /> Devoluciones según la política de Amazon</li>
          </ul>

          <details open>
            <summary>Descripción</summary>
            <p>{product.short}. Marca: {product.brand}.</p>
          </details>
          <details>
            <summary>Datos del producto</summary>
            <ul className="features">
              <li>Marca: {product.brand}</li>
              <li>Categoría: {cat.name}</li>
              <li>Código de Amazon (ASIN): {product.asin}</li>
            </ul>
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
