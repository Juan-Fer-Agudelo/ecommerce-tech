import { useEffect, useState } from 'react';
import { heroImages } from '../data/products';
import { href } from '../router';
import { Icon } from './Icon';
import { SmartImage } from './SmartImage';

const slides = [
  {
    eyebrow: 'Más vendido · $75.99',
    title: 'MX Master 3S',
    text: 'El ratón insignia de Logitech. Sensor de 8K DPI que funciona incluso sobre vidrio y clics silenciosos.',
    cta: 'Comprar ahora',
    to: href.product('logitech-mx-master-3s'),
    image: heroImages.mouse,
    icon: 'mouse',
    tone: 'dark',
  },
  {
    eyebrow: 'Ahorra $20',
    title: 'Silencio cuando lo necesitas',
    text: 'Logitech Zone Wireless 2 con cancelación de ruido híbrida y micrófonos con IA para tus llamadas.',
    cta: 'Ver oferta',
    to: href.product('logitech-zone-wireless-2'),
    image: heroImages.audio,
    icon: 'headset',
    tone: 'light',
  },
  {
    eyebrow: 'Gaming',
    title: 'Juega más ligero',
    text: 'Ratones gaming de Razer, Logitech G y SteelSeries, hechos para competir.',
    cta: 'Ver ratones',
    to: href.category('ratones'),
    image: heroImages.gaming,
    icon: 'gamepad',
    tone: 'dark',
  },
];

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (n: number) => setI((n + slides.length) % slides.length);

  return (
    <section className="hero" aria-roledescription="carrusel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((s, n) => (
        <div key={s.title} className={`hero-slide tone-${s.tone} ${n === i ? 'active' : ''}`} aria-hidden={n !== i}>
          <SmartImage src={s.image} alt="" fallbackIcon={s.icon} className="hero-img" />
          <div className="hero-shade" />
          <div className="container hero-content">
            <span className="eyebrow">{s.eyebrow}</span>
            <h1>{s.title}</h1>
            <p>{s.text}</p>
            <a href={s.to} className="btn btn-primary" tabIndex={n === i ? 0 : -1}>
              {s.cta}
            </a>
          </div>
        </div>
      ))}

      <div className="hero-controls container">
        <div className="dots">
          {slides.map((s, n) => (
            <button key={s.title} className={n === i ? 'on' : ''} aria-label={`Diapositiva ${n + 1}`} onClick={() => go(n)} />
          ))}
        </div>
        <div className="arrows">
          <button aria-label="Anterior" onClick={() => go(i - 1)}>
            <Icon name="chevronLeft" />
          </button>
          <button aria-label="Siguiente" onClick={() => go(i + 1)}>
            <Icon name="chevronRight" />
          </button>
        </div>
      </div>
    </section>
  );
}
