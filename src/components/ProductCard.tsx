import { categories, formatPrice, type Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { href } from '../router';
import { Icon } from './Icon';
import { SmartImage } from './SmartImage';

export function Stars({ rating, reviews }: { rating: number; reviews?: number }) {
  return (
    <span className="stars" aria-label={`${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon key={n} name="star" size={14} className={n <= Math.round(rating) ? 'on' : ''} />
      ))}
      <span className="rating-num">{rating.toFixed(1)}</span>
      {reviews !== undefined && <span className="muted">({reviews.toLocaleString('es')})</span>}
    </span>
  );
}

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
        <div className="swatches">
          {product.colors.map((c) => (
            <span key={c.name} className="swatch" style={{ background: c.hex }} title={c.name} />
          ))}
        </div>
        <a href={href.product(product.id)} className="card-title">
          {product.name}
        </a>
        <p className="card-short">{product.short}</p>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="card-foot">
          <div className="price">
            {formatPrice(product.price)}
            {product.oldPrice && <s>{formatPrice(product.oldPrice)}</s>}
          </div>
          <button className="btn btn-dark btn-sm" onClick={() => add(product.id, product.colors[0].name)}>
            Añadir
          </button>
        </div>
      </div>
    </article>
  );
}
