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
  router.ts               rutas con hash (#/c/..., #/p/..., #/buscar?q=...)
  components/             Header, Hero, ProductCard, CartDrawer, Footer...
  pages/                  Home, Listing, ProductPage
```

Las fotos se cargan desde el CDN de Logitech y pertenecen a Logitech. Este proyecto es un trabajo académico sin fines comerciales; para publicarlo o venderlo habría que reemplazarlas por fotos propias. Si alguna no carga, se muestra un ícono en su lugar.
