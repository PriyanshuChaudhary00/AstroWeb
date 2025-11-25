import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Shield, Award, TrendingUp, Star, CheckCircle2, ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/ProductGrid";
import { TestimonialsSlider } from "@/components/TestimonialsSlider";
import { BlogSection } from "@/components/BlogSection";
import { FAQSection } from "@/components/FAQSection";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "100% Authentic",
      description: "All products certified and verified by expert astrologers"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Sourced from trusted suppliers with quality assurance"
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Thousands of satisfied customers with life transformations"
    }
  ];

  const categories = [
    {
      name: "Gemstones",
      href: "/products/gemstones",
      image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=400&h=300&fit=crop",
      description: "Natural certified gemstones"
    },
    {
      name: "Bracelets",
      href: "/products/bracelets",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop",
      description: "Healing crystal bracelets"
    },
    {
      name: "Rudraksha",
      href: "/products/rudraksha",
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop",
      description: "Sacred Rudraksha beads"
    },
    {
      name: "Yantras",
      href: "/products/yantras",
      image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop",
      description: "Powerful sacred yantras"
    },
    {
      name: "Rings",
      href: "/products/rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop",
      description: "Astrological gemstone rings"
    },
    {
      name: "Remedies",
      href: "/products/remedies",
      image: "https://images.unsplash.com/photo-1600428821994-6a7c29d2b20b?w=400&h=300&fit=crop",
      description: "Spiritual remedy products"
    }
  ];

  const benefits = [
    "Expert astrology consultations",
    "Certified authentic products",
    "Personalized recommendations",
    "Secure online payments",
    "Fast & safe delivery",
    "100% satisfaction guarantee"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-primary">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920&h=1080&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
          <Badge className="mb-6 bg-accent/20 text-accent border-accent/30" data-testid="badge-hero">
            <Sparkles className="h-3 w-3 mr-1" />
            Trusted by 50,000+ Customers
          </Badge>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 max-w-4xl mx-auto leading-tight" data-testid="text-hero-title">
            Awaken Your{" "}
            <span className="text-accent">Jyoti</span>
            {" "}Divine Light Guiding Your Cosmic Destiny
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-description">
            Discover authentic gemstones, spiritual remedies, and expert astrology consultations to guide your journey to wellness and prosperity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 min-w-[200px]" data-testid="button-hero-shop">
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/book-appointment">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-sm min-w-[200px]" data-testid="button-hero-consult">
                Book Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover-elevate active-elevate-2 transition-all duration-300" data-testid={`card-feature-${index}`}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" data-testid="text-categories-title">
              Explore Our Collections
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover authentic spiritual products carefully curated for your well-being
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category, index) => (
              <Link key={index} href={category.href}>
                <Card className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 cursor-pointer group" data-testid={`card-category-${category.name.toLowerCase()}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-serif text-2xl font-bold text-white mb-1">{category.name}</h3>
                      <p className="text-white/90 text-sm">{category.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" data-testid="text-featured-title">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Handpicked gemstones and spiritual remedies for your transformation
            </p>
          </div>

          <ProductGrid category="featured" limit={6} />

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline" data-testid="button-view-all">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Why Choose Divine Astrology?
            </h2>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto">
              We are committed to providing authentic products and genuine guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3" data-testid={`item-benefit-${index}`}>
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-primary-foreground/90">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" data-testid="text-testimonials-title">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real experiences from people who transformed their lives
            </p>
          </div>

          <TestimonialsSlider />
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" data-testid="text-blog-title">
              From Our Blog
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Insights on astrology, gemstones, and spiritual wellness
            </p>
          </div>

          <BlogSection limit={3} />

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button size="lg" variant="outline" data-testid="button-view-blog">
                Read More Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4" data-testid="text-faq-title">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about our products and services
            </p>
          </div>

          <FAQSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <Sparkles className="h-12 w-12 text-accent mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Begin Your Spiritual Journey Today
          </h2>
          <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-8">
            Connect with our expert astrologers and discover the perfect remedies for your life path
          </p>
          <Link href="/book-appointment">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid="button-cta-appointment">
              Book Your Consultation Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
