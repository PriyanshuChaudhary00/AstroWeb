import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Landing from "@/pages/Landing";
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
import Videos from "@/pages/Videos";
import Profile from "@/pages/Profile";
import AdminDashboard from "@/pages/AdminDashboard";
import PolicyPage from "@/pages/PolicyPage";
import NotFound from "@/pages/not-found";

function ProtectedRoute({ component: Component }: { component: any }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!isAuthenticated) {
    window.location.href = "/api/login";
    return null;
  }
  return <Component />;
}

function ProtectedAdminRoute({ component: Component }: { component: any }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!isAuthenticated) {
    window.location.href = "/api/login";
    return null;
  }
  
  // Check if user is admin based on email
  const isAdmin = user?.email?.endsWith("@admin.divine") || user?.email === "admin@example.com";
  if (!isAdmin) return <NotFound />;
  return <Component />;
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  const [cartItemCount] = useState(0);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated && <Navigation cartItemCount={cartItemCount} />}
      <main className="flex-1">
        <Switch>
          <Route path="/" component={isAuthenticated ? Home : Landing} />
          <Route path="/products" component={() => isAuthenticated ? <Products /> : <Landing />} />
          <Route path="/products/:category" component={() => isAuthenticated ? <Products /> : <Landing />} />
          <Route path="/product/:id" component={() => isAuthenticated ? <ProductDetail /> : <Landing />} />
          <Route path="/cart" component={() => <ProtectedRoute component={Cart} />} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/videos" component={() => <ProtectedRoute component={Videos} />} />
          <Route path="/book-appointment" component={() => <ProtectedRoute component={BookAppointment} />} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/horoscope" component={Horoscope} />
          <Route path="/horoscope/:sign" component={HoroscopeDetail} />
          <Route path="/profile" component={() => <ProtectedRoute component={Profile} />} />
          <Route path="/admin" component={() => <ProtectedAdminRoute component={AdminDashboard} />} />
          <Route path="/privacy-policy" component={() => <PolicyPage />} />
          <Route path="/terms" component={() => <PolicyPage />} />
          <Route path="/refund-policy" component={() => <PolicyPage />} />
          <Route path="/shipping-policy" component={() => <PolicyPage />} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {isAuthenticated && <Footer />}
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
