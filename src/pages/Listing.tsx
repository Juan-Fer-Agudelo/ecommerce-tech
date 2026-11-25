import { useMemo, useState } from 'react';
import { categories, products, type Product } from '../data/products';
import { href } from '../router';
import { ProductCard } from '../components/ProductCard';

type Sort = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const sorters: Record<Sort, (a: Product, b: Product) => number> = {
  featured: () => 0,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
};

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function Listing({ categoryId, query }: { categoryId?: string; query?: string }) {
  const [sort, setSort] = useState<Sort>('featured');
  const [onlySale, setOnlySale] = useState(false);
  const category = categories.find((c) => c.id === categoryId);

  const list = useMemo(() => {
    let items = products;
    if (category) items = items.filter((p) => p.category === category.id);
    if (query) {
      const q = normalize(query);
      items = items.filter((p) =>
        normalize([p.name, p.short, p.category, p.badge ?? '', categories.find((c) => c.id === p.category)?.name ?? ''].join(' ')).includes(q),
      );
    }
    if (onlySale) items = items.filter((p) => p.oldPrice);
    return [...items].sort(sorters[sort]);
  }, [category, query, onlySale, sort]);

  const title = category ? category.name : query ? `Resultados para "${query}"` : 'Todos los productos';

  return (
    <div className="container listing">
      <nav className="crumbs" aria-label="Ruta">
        <a href={href.home()}>Inicio</a> / <span>{category ? category.name : 'Búsqueda'}</span>
      </nav>
      <header className="listing-head">
        <h1>{title}</h1>
        {category && <p className="muted">{category.tagline}</p>}
      </header>

      <div className="listing-tools">
        <div className="chips">
          <a href={href.search('')} className={!category ? 'chip on' : 'chip'}>Todos</a>
          {categories.map((c) => (
            <a key={c.id} href={href.category(c.id)} className={c.id === category?.id ? 'chip on' : 'chip'}>{c.name}</a>
          ))}
        </div>
        <div className="tool-right">
          <label className="check">
            <input type="checkbox" checked={onlySale} onChange={(e) => setOnlySale(e.target.checked)} /> Solo ofertas
          </label>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Ordenar">
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="rating">Mejor calificados</option>
          </select>
        </div>
      </div>

      <p className="muted small">{list.length} productos</p>
      {list.length ? (
        <div className="grid">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="empty">
          <p>No encontramos productos con esos filtros.</p>
          <a href={href.search('')} className="btn btn-dark">Ver todos los productos</a>
        </div>
      )}
    </div>
  );
}
