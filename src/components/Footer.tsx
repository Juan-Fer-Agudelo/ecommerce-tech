import { useState, type FormEvent } from 'react';
import { categories } from '../data/products';
import { href } from '../router';
import { Icon } from './Icon';

const cols = [
  { title: 'Soporte', links: ['Centro de ayuda', 'Estado del pedido', 'Envíos', 'Devoluciones', 'Garantía', 'Descargas'] },
  { title: 'Empresa', links: ['Sobre nosotros', 'Sostenibilidad', 'Empleo', 'Prensa', 'Inversionistas'] },
  { title: 'Para empresas', links: ['Soluciones de oficina', 'Educación', 'Compras por volumen', 'Socios'] },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) setDone(true);
  };

  return (
    <footer className="site-footer" id="soporte">
      <div className="container">
        <div className="newsletter">
          <div>
            <h3>Recibe novedades y ofertas</h3>
            <p>Suscríbete y obtén 10% de descuento en tu primera compra.</p>
          </div>
          {done ? (
            <p className="ok">¡Listo! Revisa tu correo para tu código de descuento.</p>
          ) : (
            <form onSubmit={submit}>
              <input type="email" required placeholder="Tu correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Correo electrónico" />
              <button className="btn btn-primary">Suscribirme</button>
            </form>
          )}
        </div>

        <div className="footer-cols">
          <div>
            <h4>Productos</h4>
            <ul>
              {categories.map((c) => (
                <li key={c.id}><a href={href.category(c.id)}>{c.name}</a></li>
              ))}
            </ul>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l}><a href="#soporte">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <a href={href.home()} className="logo logo-light">
            <span className="logo-mark">T</span>tech studio
          </a>
          <div className="legal">
            <span>© {new Date().getFullYear()} Tech Studio. Todos los derechos reservados.</span>
            <a href="#soporte">Privacidad</a>
            <a href="#soporte">Términos</a>
            <a href="#soporte">Cookies</a>
          </div>
          <span className="region"><Icon name="globe" size={18} /> Colombia (Español)</span>
        </div>
      </div>
    </footer>
  );
}
