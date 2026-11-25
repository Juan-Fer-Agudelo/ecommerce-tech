import { useState } from 'react';
import { categories, heroImages, products } from '../data/products';
import { href } from '../router';
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
  { icon: 'truck', title: 'Envío gratis', text: 'En pedidos desde $29' },
  { icon: 'return', title: 'Devoluciones en 30 días', text: 'Sin preguntas' },
  { icon: 'shield', title: 'Garantía de 2 años', text: 'En todos los productos' },
  { icon: 'leaf', title: 'Plástico reciclado', text: 'En el 70% del catálogo' },
];

export function Home() {
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
              <span className="link-arrow">Comprar teclados</span>
            </div>
          </a>
          <a href={href.category('webcams')} className="split-card">
            <SmartImage src={categories[3].image} alt="Webcams" fallbackIcon="webcam" />
            <div className="split-text">
              <span className="eyebrow">Webcams</span>
              <h3>Luce como un profesional en cada llamada</h3>
              <span className="link-arrow">Comprar webcams</span>
            </div>
          </a>
        </div>
      </section>

      <section className="feature-band">
        <div className="container feature-inner">
          <div className="feature-text">
            <span className="eyebrow">Strike Gaming</span>
            <h2>Diseñado con jugadores profesionales</h2>
            <p>Sensores de alta precisión, conexión inalámbrica sin retraso y materiales ultraligeros. Cada producto Strike se prueba en torneos antes de llegar a tus manos.</p>
            <a href={href.category('gaming')} className="btn btn-primary">Explorar gaming</a>
          </div>
          <div className="feature-media">
            <SmartImage src={heroImages.feature} alt="Equipo gaming Strike" fallbackIcon="gamepad" />
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
