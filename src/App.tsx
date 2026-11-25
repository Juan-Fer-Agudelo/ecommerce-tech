import { CartProvider } from './context/CartContext';
import { useRoute } from './router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Home } from './pages/Home';
import { Listing } from './pages/Listing';
import { ProductPage } from './pages/ProductPage';

export default function App() {
  const route = useRoute();

  let page;
  switch (route.name) {
    case 'category':
      page = <Listing key={route.id} categoryId={route.id} />;
      break;
    case 'search':
      page = <Listing key={route.q} query={route.q} />;
      break;
    case 'product':
      page = <ProductPage key={route.id} id={route.id} />;
      break;
    default:
      page = <Home />;
  }

  return (
    <CartProvider>
      <Header />
      <main>{page}</main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
