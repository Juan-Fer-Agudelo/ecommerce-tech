import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'category'; id: string }
  | { name: 'product'; id: string }
  | { name: 'search'; q: string };

/** Fired on every in-app navigation so components (menus, drawers) can react. */
export const ROUTE_EVENT = 'routechange';

function parse(): Route {
  const [first, second] = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/');
  if (first === 'c' && second) return { name: 'category', id: decodeURIComponent(second) };
  if (first === 'p' && second) return { name: 'product', id: decodeURIComponent(second) };
  if (first === 'buscar') return { name: 'search', q: new URLSearchParams(window.location.search).get('q') ?? '' };
  return { name: 'home' };
}

export function navigate(to: string) {
  if (to === window.location.pathname + window.location.search) return;
  window.history.pushState(null, '', to);
  window.dispatchEvent(new Event(ROUTE_EVENT));
  window.scrollTo({ top: 0 });
}

export function useRoute(): Route {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    const update = () => setRoute(parse());

    // Intercept clicks on internal links so navigation stays client-side.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest('a');
      const raw = a?.getAttribute('href');
      if (!a || !raw || !raw.startsWith('/') || raw.startsWith('//') || a.target) return;
      e.preventDefault();
      navigate(raw);
    };

    const onPop = () => {
      update();
      window.dispatchEvent(new Event(ROUTE_EVENT));
    };

    window.addEventListener(ROUTE_EVENT, update);
    window.addEventListener('popstate', onPop);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener(ROUTE_EVENT, update);
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return route;
}

export const href = {
  home: () => '/',
  category: (id: string) => `/c/${id}`,
  product: (id: string) => `/p/${id}`,
  search: (q: string) => `/buscar?q=${encodeURIComponent(q)}`,
};
