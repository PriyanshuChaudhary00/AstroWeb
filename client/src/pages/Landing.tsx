import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Gem, Calendar, BookOpen } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            Divine Astrology
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover the cosmic wisdom of authentic gemstones, spiritual remedies, and personalized astrology consultations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = "/api/login"}
              data-testid="button-login"
            >
              Login to Explore
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.location.href = "/api/login"}
              data-testid="button-signup"
            >
              Sign Up Now
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Divine Astrology</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover-elevate">
              <Gem className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Authentic Gemstones</h3>
              <p className="text-sm text-muted-foreground">Certified and energized gemstones</p>
            </Card>

            <Card className="p-6 text-center hover-elevate">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Spiritual Products</h3>
              <p className="text-sm text-muted-foreground">Rudraksha, Yantras & Remedies</p>
            </Card>

            <Card className="p-6 text-center hover-elevate">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Consultations</h3>
              <p className="text-sm text-muted-foreground">Expert astrology sessions</p>
            </Card>

            <Card className="p-6 text-center hover-elevate">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Spiritual Guidance</h3>
              <p className="text-sm text-muted-foreground">Vedic wisdom and insights</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
