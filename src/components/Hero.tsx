import { useEffect, useState } from 'react';
import { heroImages } from '../data/products';
import { href } from '../router';
import { Icon } from './Icon';
import { SmartImage } from './SmartImage';

const slides = [
  {
    eyebrow: 'Nuevo',
    title: 'Glide Pro X',
    text: 'El ratón más preciso que hemos hecho. Funciona sobre cualquier superficie, incluso vidrio.',
    cta: 'Comprar ahora',
    to: href.product('ts-glide-pro'),
    image: heroImages.mouse,
    icon: 'mouse',
    tone: 'dark',
  },
  {
    eyebrow: 'Hasta 15% de descuento',
    title: 'Silencio cuando lo necesitas',
    text: 'Audífonos Wave ANC con cancelación activa de ruido y 50 horas de batería.',
    cta: 'Ver oferta',
    to: href.product('ts-wave-anc'),
    image: heroImages.audio,
    icon: 'headset',
    tone: 'light',
  },
  {
    eyebrow: 'Gaming',
    title: 'Juega más ligero',
    text: 'Strike G Lightspeed: 60 gramos, sensor de 25K y conexión inalámbrica de 1 ms.',
    cta: 'Descubrir Strike',
    to: href.category('gaming'),
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
