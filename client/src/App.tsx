import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import BookAppointment from "@/pages/BookAppointment";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Horoscope from "@/pages/Horoscope";
import HoroscopeDetail from "@/pages/HoroscopeDetail";
import PolicyPage from "@/pages/PolicyPage";
import NotFound from "@/pages/not-found";

function Router() {
  const [cartItemCount] = useState(0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation cartItemCount={cartItemCount} />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/products/:category" component={Products} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/book-appointment" component={BookAppointment} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/horoscope" component={Horoscope} />
          <Route path="/horoscope/:sign" component={HoroscopeDetail} />
          <Route path="/privacy-policy" component={() => <PolicyPage />} />
          <Route path="/terms" component={() => <PolicyPage />} />
          <Route path="/refund-policy" component={() => <PolicyPage />} />
          <Route path="/shipping-policy" component={() => <PolicyPage />} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
