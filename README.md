# Tech Studio

Tienda online de periféricos (ratones, teclados, audífonos, webcams, gaming y parlantes) hecha con React, Vite y TypeScript.

## Cómo correrla

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # compila a dist/
```

## Qué incluye

- Barra de anuncios rotativa, menú con desplegable de productos, búsqueda y menú móvil.
- Inicio con carrusel principal, categorías, productos destacados por pestañas, promociones y beneficios.
- Páginas de categoría y búsqueda con filtros y orden.
- Página de producto con selector de color, cantidad y productos relacionados.
- Carrito lateral que se guarda en el navegador, con barra de envío gratis.

El pago es de demostración: el botón "Ir a pagar" no cobra nada.

## Estructura

```
src/
  data/products.ts        catálogo y categorías
  context/CartContext.tsx estado del carrito
  router.ts               rutas reales (/c/..., /p/..., /buscar?q=...)
  seo.ts                  metas, Open Graph, canonical y schemas JSON-LD
  components/             Header, Hero, ProductCard, CartDrawer, Footer...
  pages/                  Home, Listing, ProductPage
```

## SEO

- Cada producto y categoría tiene `metaTitle`, `metaDescription` y (productos) `metaImage` de 1200x630 en `src/data/products.ts`.
- Cada página actualiza `<title>`, meta descripción, canonical, Open Graph y Twitter Card.
- Schemas JSON-LD: `Organization`, `WebSite` con buscador, `Product` con precio, calificación, envío y devoluciones, `CollectionPage`, `ItemList` y `BreadcrumbList`.
- Las búsquedas llevan `noindex`.
- `npm run build` genera `sitemap.xml` (con imágenes) y `robots.txt`.

Al publicar, copia `.env.example` a `.env` y pon tu dominio en `VITE_SITE_URL`. El hosting debe redirigir todas las rutas a `index.html` (en Netlify: `/* /index.html 200`; en Vercel lo hace solo con Vite).

Las fotos se cargan desde el CDN de Logitech y pertenecen a Logitech. Este proyecto es un trabajo académico sin fines comerciales; para publicarlo o venderlo habría que reemplazarlas por fotos propias. Si alguna no carga, se muestra un ícono en su lugar.
