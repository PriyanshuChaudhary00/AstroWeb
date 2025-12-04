import Head from "next/head";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Users, Star, Heart, Sparkles } from "lucide-react";

export default function About() {
  const achievements = [
    { icon: Users, value: "50,000+", label: "Happy Customers" },
    { icon: Star, value: "25+", label: "Years Experience" },
    { icon: Award, value: "500+", label: "Certifications" },
    { icon: Heart, value: "98%", label: "Satisfaction Rate" }
  ];

  const values = [
    {
      title: "Authenticity",
      description: "Every product is certified and verified by expert gemologists and astrologers"
    },
    {
      title: "Expertise",
      description: "Over 25 years of experience in Vedic astrology and spiritual guidance"
    },
    {
      title: "Quality",
      description: "Premium products sourced from trusted suppliers worldwide"
    },
    {
      title: "Care",
      description: "Personalized attention and support for every customer's spiritual journey"
    }
  ];

  return (
    <>
      <Head>
        <title>About Us - Divine Astrology</title>
      </Head>
      <div className="min-h-screen bg-background">
        <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-primary">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=1920&h=1080&fit=crop')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/85 to-primary/95"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
            <Sparkles className="h-12 w-12 text-accent mx-auto mb-6" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Our Story of Spiritual Excellence
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              For over 25 years, we've been guiding souls towards harmony, prosperity, and enlightenment through authentic astrology and spiritual products.
            </p>
          </div>
        </div>

        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-8">
                    <achievement.icon className="h-10 w-10 text-accent mx-auto mb-4" />
                    <p className="text-3xl font-bold text-accent mb-2">
                      {achievement.value}
                    </p>
                    <p className="text-muted-foreground text-sm">{achievement.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4">Our Mission</Badge>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                  Illuminating Paths Through Ancient Wisdom
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded by renowned astrologer Pandit Rajesh Sharma in 1998, Divine Astrology was born from a vision to make authentic Vedic wisdom accessible to everyone seeking spiritual growth and life transformation.
                  </p>
                  <p>
                    We believe that every individual deserves access to genuine spiritual guidance and certified astrological products. Our mission is to bridge the gap between ancient wisdom and modern life, helping you navigate life's challenges with clarity and confidence.
                  </p>
                  <p>
                    Each product in our collection is personally verified and blessed, ensuring that you receive not just a purchase, but a powerful tool for positive change in your life.
                  </p>
                </div>
              </div>

              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?w=600&h=400&fit=crop"
                  alt="Astrologer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Our Core Values
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-8">
                    <h3 className="font-serif text-2xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Begin Your Spiritual Transformation Today
            </h2>
            <p className="text-primary-foreground/90 text-lg max-w-2xl mx-auto mb-8">
              Join thousands of satisfied customers who have transformed their lives with our guidance
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
