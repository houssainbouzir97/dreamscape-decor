import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CartProvider } from "@/hooks/useCart";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import ReturnPolicy from "./pages/ReturnPolicy";
import AdminOrders from "./pages/AdminOrders";
import NotFound from "./pages/NotFound";
import WhatsAppButton from "./components/WhatsAppButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <WhatsAppButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produits" element={<Products />} />
            <Route path="/produit/:slug" element={<ProductDetail />} />
            <Route path="/panier" element={<Checkout />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/politique-retour" element={<ReturnPolicy />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
