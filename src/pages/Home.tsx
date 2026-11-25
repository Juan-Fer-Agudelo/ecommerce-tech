import { useState } from 'react';
import { categories, heroImages, products } from '../data/products';
import { href } from '../router';
import { SITE_URL, useSeo } from '../seo';
import { homeMeta } from '../seoMeta';
import { Hero } from '../components/Hero';
import { Icon } from '../components/Icon';
import { ProductCard } from '../components/ProductCard';
import { SmartImage } from '../components/SmartImage';

const tabs = [
  { id: 'top', label: 'Más vendidos', filter: (b?: string) => b === 'Más vendido' },
  { id: 'new', label: 'Novedades', filter: (b?: string) => b === 'Nuevo' },
  { id: 'sale', label: 'Ofertas', filter: (b?: string) => b === 'Oferta' },
];

const perks = [
  { icon: 'shield', title: 'Productos originales', text: 'De marcas reconocidas' },
  { icon: 'cart', title: 'Compra en Amazon', text: 'Enlace directo a cada producto' },
  { icon: 'search', title: 'Precios con fuente', text: 'Indicamos de dónde sale cada precio' },
  { icon: 'globe', title: '5 categorías', text: 'Ratones, teclados, cámaras y audio' },
];

export function Home() {
  useSeo(homeMeta(SITE_URL));
  const [tab, setTab] = useState(tabs[0].id);
  const active = tabs.find((t) => t.id === tab)!;

  return (
    <>
      <Hero />

      <section className="section container">
        <div className="cat-strip">
          {categories.map((c) => (
            <a key={c.id} href={href.category(c.id)} className="cat-chip">
              <span className="cat-icon"><Icon name={c.icon} size={30} /></span>
              <span>{c.name}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Lo más destacado</h2>
          <div className="tabs" role="tablist">
            {tabs.map((t) => (
              <button key={t.id} role="tab" aria-selected={t.id === tab} className={t.id === tab ? 'on' : ''} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid">
          {products.filter((p) => active.filter(p.badge)).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="split">
          <a href={href.category('teclados')} className="split-card">
            <SmartImage src={categories[1].image} alt="Teclados" fallbackIcon="keyboard" />
            <div className="split-text">
              <span className="eyebrow">Teclados</span>
              <h3>Tu escritorio, a tu manera</h3>
              <span className="link-arrow">Ver teclados</span>
            </div>
          </a>
          <a href={href.category('webcams')} className="split-card">
            <SmartImage src={categories[2].image} alt="Cámaras web" fallbackIcon="webcam" />
            <div className="split-text">
              <span className="eyebrow">Cámaras</span>
              <h3>Luce como un profesional en cada llamada</h3>
              <span className="link-arrow">Ver cámaras</span>
            </div>
          </a>
        </div>
      </section>

      <section className="feature-band">
        <div className="container feature-inner">
          <div className="feature-text">
            <span className="eyebrow">Gaming</span>
            <h2>Diseñado con jugadores profesionales</h2>
            <p>Ratones y audífonos gaming de Logitech G, Razer, SteelSeries y HyperX: sensores de alta precisión, conexión inalámbrica y diseños ultraligeros.</p>
            <a href={href.category('ratones')} className="btn btn-primary">Ver ratones gaming</a>
          </div>
          <div className="feature-media">
            <SmartImage src={heroImages.feature} alt="Ratón gaming Logitech G" fallbackIcon="gamepad" />
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Compra por categoría</h2>
        </div>
        <div className="cat-grid">
          {categories.map((c) => (
            <a key={c.id} href={href.category(c.id)} className="cat-tile">
              <SmartImage src={c.image} alt={c.name} fallbackIcon={c.icon} />
              <div>
                <strong>{c.name}</strong>
                <span>{c.tagline}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="perks">
        <div className="container perks-inner">
          {perks.map((p) => (
            <div key={p.title} className="perk">
              <Icon name={p.icon} size={28} />
              <div>
                <strong>{p.title}</strong>
                <span>{p.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
