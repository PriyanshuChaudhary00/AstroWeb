import { useParams } from "wouter";

export default function PolicyPage() {
  const { type } = useParams<{ type: string }>();

  const policies: Record<string, { title: string; content: string[] }> = {
    "privacy-policy": {
      title: "Privacy Policy",
      content: [
        "At Divine Astrology, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your data.",
        "We collect personal information including your name, email address, phone number, date of birth, and payment information when you make purchases or book consultations. This information is used solely to provide our services and improve your experience.",
        "We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. Your payment information is processed through secure, encrypted channels.",
        "We do not sell, trade, or share your personal information with third parties except as necessary to provide our services (e.g., payment processors, shipping partners) or as required by law.",
        "You have the right to access, update, or delete your personal information at any time. Please contact us at privacy@divineastrology.com for any privacy-related concerns.",
        "We may use cookies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings."
      ]
    },
    "terms": {
      title: "Terms & Conditions",
      content: [
        "By accessing and using Divine Astrology's website and services, you agree to be bound by these Terms and Conditions. Please read them carefully before making any purchase or booking consultation.",
        "All products sold on our website are genuine and certified. Product descriptions, images, and specifications are provided for informational purposes and we strive for accuracy. However, slight variations may occur.",
        "Astrology consultations are provided by certified astrologers based on Vedic principles. While we strive for accuracy, consultations are for guidance purposes only and should not replace professional advice in legal, medical, or financial matters.",
        "Prices are subject to change without notice. Once an order is placed and payment is confirmed, the price at the time of purchase will apply. All prices are in Indian Rupees (INR).",
        "We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion, particularly in cases of suspected fraud or abuse.",
        "Intellectual property including website content, images, logos, and designs are protected by copyright and trademark laws. Unauthorized use is prohibited.",
        "These terms are governed by Indian law. Any disputes will be subject to the exclusive jurisdiction of courts in New Delhi, India."
      ]
    },
    "refund-policy": {
      title: "Refund Policy",
      content: [
        "We want you to be completely satisfied with your purchase. If you are not satisfied, we offer a 7-day return and refund policy for eligible products.",
        "Products must be returned in their original condition, unused, with all tags and certification documents intact. Custom-made or blessed items may not be eligible for return.",
        "To initiate a return, please contact our customer service within 7 days of receiving your order. You will receive instructions for returning the product.",
        "Refunds will be processed within 7-10 business days after we receive and inspect the returned product. The refund will be issued to the original payment method.",
        "Shipping costs are non-refundable. Return shipping costs are the responsibility of the customer unless the product was damaged or incorrect.",
        "For astrology consultations, refunds are available only if the consultation was not provided. Once a consultation session has been conducted, no refunds will be issued.",
        "In case of damaged or defective products, please contact us immediately with photos. We will arrange for replacement or full refund including shipping costs."
      ]
    },
    "shipping-policy": {
      title: "Shipping Policy",
      content: [
        "We ship authentic spiritual products across India and select international locations. Shipping times and costs vary based on your location and the items ordered.",
        "Orders are typically processed within 1-2 business days. You will receive a confirmation email with tracking information once your order has been shipped.",
        "Domestic shipping within India usually takes 3-7 business days, depending on the destination. Metropolitan areas typically receive orders faster than remote locations.",
        "International shipping is available to select countries and may take 10-15 business days. Additional customs fees and import duties may apply and are the responsibility of the customer.",
        "We offer free shipping on orders above ₹5,000 within India. For orders below this amount, standard shipping charges apply based on weight and destination.",
        "We package all products with care, especially delicate gemstones and spiritual items. Products are insured during transit against loss or damage.",
        "If you have not received your order within the estimated delivery time, please contact our customer service. We will track your shipment and resolve any delivery issues.",
        "For astrology consultations, virtual sessions are conducted via video call. No physical shipping is involved for consultation services."
      ]
    }
  };

  const currentPolicy = type ? policies[type] : null;

  if (!currentPolicy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Policy not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold" data-testid="text-policy-title">
            {currentPolicy.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="space-y-6">
            {currentPolicy.content.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground leading-relaxed" data-testid={`text-content-${index}`}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-12 p-6 bg-muted/30 rounded-lg">
            <p className="font-semibold mb-2">Questions or Concerns?</p>
            <p className="text-muted-foreground">
              If you have any questions about this policy, please contact us at{" "}
              <a href="mailto:support@divineastrology.com" className="text-accent hover:underline">
                support@divineastrology.com
              </a>{" "}
              or call us at <span className="text-accent">+91 98765 43210</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
