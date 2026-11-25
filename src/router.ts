import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'category'; id: string }
  | { name: 'product'; id: string }
  | { name: 'search'; q: string };

function parse(hash: string): Route {
  const path = hash.replace(/^#\/?/, '');
  const [first, second] = path.split('/');
  if (first === 'c' && second) return { name: 'category', id: second };
  if (first === 'p' && second) return { name: 'product', id: second };
  if (first.startsWith('buscar')) {
    const q = new URLSearchParams(first.split('?')[1] ?? '').get('q') ?? '';
    return { name: 'search', q };
  }
  return { name: 'home' };
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parse(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parse(window.location.hash));
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export const href = {
  home: () => '#/',
  category: (id: string) => `#/c/${id}`,
  product: (id: string) => `#/p/${id}`,
  search: (q: string) => `#/buscar?q=${encodeURIComponent(q)}`,
};
