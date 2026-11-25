import { useEffect, useState, type FormEvent } from 'react';
import { categories, products } from '../data/products';
import { useCart } from '../context/CartContext';
import { href } from '../router';
import { Icon } from './Icon';

const announcements = [
  'Envío gratis en pedidos desde $29',
  'Devoluciones gratis durante 30 días',
  'Hasta 25% de descuento en audio esta semana',
];

const navItems = [
  { label: 'Productos', mega: true },
  { label: 'Gaming', to: href.category('gaming') },
  { label: 'Ofertas', to: href.search('oferta') },
  { label: 'Soporte', to: '#soporte' },
];

export function Header() {
  const { count, open } = useCart();
  const [msg, setMsg] = useState(0);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => {
    const t = setInterval(() => setMsg((m) => (m + 1) % announcements.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const close = () => {
      setMega(false);
      setMobile(false);
      setSearchOpen(false);
    };
    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (q.trim()) window.location.hash = href.search(q.trim());
  };

  return (
    <header className="site-header">
      <div className="announce">
        <button aria-label="Anterior" onClick={() => setMsg((m) => (m + announcements.length - 1) % announcements.length)}>
          <Icon name="chevronLeft" size={16} />
        </button>
        <p key={msg}>{announcements[msg]}</p>
        <button aria-label="Siguiente" onClick={() => setMsg((m) => (m + 1) % announcements.length)}>
          <Icon name="chevronRight" size={16} />
        </button>
      </div>

      <div className="nav-bar" onMouseLeave={() => setMega(false)}>
        <div className="container nav-inner">
          <button className="icon-btn only-mobile" aria-label="Menú" onClick={() => setMobile(true)}>
            <Icon name="menu" />
          </button>

          <a href={href.home()} className="logo" aria-label="Tech Studio, inicio">
            <span className="logo-mark">T</span>
            <span>tech studio</span>
          </a>

          <nav className="main-nav only-desktop" aria-label="Principal">
            {navItems.map((item) =>
              item.mega ? (
                <button
                  key={item.label}
                  className={`nav-link ${mega ? 'active' : ''}`}
                  onMouseEnter={() => setMega(true)}
                  onClick={() => setMega((m) => !m)}
                  aria-expanded={mega}
                >
                  {item.label} <Icon name="chevronDown" size={16} />
                </button>
              ) : (
                <a key={item.label} href={item.to} className="nav-link" onMouseEnter={() => setMega(false)}>
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <div className="nav-actions">
            <form className={`search ${searchOpen ? 'open' : ''}`} onSubmit={submit} role="search">
              <button type="button" className="icon-btn" aria-label="Buscar" onClick={() => setSearchOpen((s) => !s)}>
                <Icon name="search" />
              </button>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar productos"
                aria-label="Buscar productos"
              />
            </form>
            <a className="icon-btn only-desktop" aria-label="Mi cuenta" href="#cuenta">
              <Icon name="user" />
            </a>
            <button className="icon-btn cart-btn" aria-label={`Carrito, ${count} productos`} onClick={open}>
              <Icon name="cart" />
              {count > 0 && <span className="cart-count">{count}</span>}
            </button>
          </div>
        </div>

        {mega && (
          <div className="mega" onMouseEnter={() => setMega(true)}>
            <div className="container mega-inner">
              <div className="mega-cols">
                {categories.map((c) => (
                  <div key={c.id} className="mega-col">
                    <a href={href.category(c.id)} className="mega-title">
                      <Icon name={c.icon} size={20} /> {c.name}
                    </a>
                    <ul>
                      {products
                        .filter((p) => p.category === c.id)
                        .map((p) => (
                          <li key={p.id}>
                            <a href={href.product(p.id)}>{p.name}</a>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
              </div>
              <a href={href.category('gaming')} className="mega-promo">
                <img src={categories[4].image} alt="" />
                <div>
                  <span className="eyebrow">Nuevo</span>
                  <strong>Línea Strike para gaming</strong>
                  <span className="link-arrow">Ver colección</span>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>

      {mobile && (
        <div className="drawer-overlay" onClick={() => setMobile(false)}>
          <aside className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <span className="logo">
                <span className="logo-mark">T</span>tech studio
              </span>
              <button className="icon-btn" aria-label="Cerrar" onClick={() => setMobile(false)}>
                <Icon name="close" />
              </button>
            </div>
            <p className="mobile-label">Productos</p>
            {categories.map((c) => (
              <a key={c.id} href={href.category(c.id)} className="mobile-link">
                <Icon name={c.icon} size={20} /> {c.name}
                <Icon name="chevronRight" size={18} className="push" />
              </a>
            ))}
            <p className="mobile-label">Más</p>
            <a href={href.search('oferta')} className="mobile-link">Ofertas</a>
            <a href="#soporte" className="mobile-link">Soporte</a>
            <a href="#cuenta" className="mobile-link">Mi cuenta</a>
          </aside>
        </div>
      )}
    </header>
  );
}
