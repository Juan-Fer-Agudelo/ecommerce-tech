import { categories, formatPrice, type Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { href } from '../router';
import { SmartImage } from './SmartImage';

export const amazonLinkProps = { target: '_blank', rel: 'noopener noreferrer nofollow' } as const;

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const icon = categories.find((c) => c.id === product.category)?.icon;

  return (
    <article className="card">
      <a href={href.product(product.id)} className="card-media">
        {product.badge && <span className={`badge badge-${product.badge === 'Oferta' ? 'sale' : 'new'}`}>{product.badge}</span>}
        <SmartImage src={product.image} alt={product.name} fallbackIcon={icon} />
      </a>
      <div className="card-body">
        <span className="card-brand">{product.brand}</span>
        <a href={href.product(product.id)} className="card-title">
          {product.name}
        </a>
        <p className="card-short">{product.short}</p>
        <div className="card-foot">
          {product.price ? (
            <>
              <div className="price">
                {formatPrice(product.price)}
                {product.oldPrice && <s>{formatPrice(product.oldPrice)}</s>}
              </div>
              <button className="btn btn-dark btn-sm" onClick={() => add(product.id, '', 1)}>
                Añadir
              </button>
            </>
          ) : (
            <a className="btn btn-amazon btn-sm btn-block" href={product.amazonUrl} {...amazonLinkProps}>
              Ver precio en Amazon
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
