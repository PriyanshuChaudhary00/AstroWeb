import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Package, User, Mail, MapPin, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/authContext";
import { getAuthToken } from "@/lib/supabase";
import type { Order } from "@shared/schema";

export default function Cart() {
  const { isAdmin, loading: authLoading } = useAuth();
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Blue Sapphire (Neelam) - 5 Carat",
      price: 25000,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1611955167811-4711904bb9f8?w=200&h=200&fit=crop"
    },
    {
      id: "2",
      name: "Rudraksha Mala - 108 Beads",
      price: 3500,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=200&h=200&fit=crop"
    }
  ]);

  // Fetch orders for admin
  const { data: orders = [], isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    queryFn: async () => {
      const token = await getAuthToken();
      if (!token) return [];
      const response = await fetch("/api/orders", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) return [];
      return response.json();
    },
    enabled: isAdmin && !authLoading
  });

  // Admin view - show all orders
  if (isAdmin && !authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8" data-testid="text-orders-title">
            All Customer Orders
          </h1>

          {ordersLoading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Loading orders...</p>
              </CardContent>
            </Card>
          ) : orders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders yet</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {orders.map((order) => {
                let itemsList = [];
                try {
                  itemsList = JSON.parse(order.items);
                } catch {
                  itemsList = [];
                }

                return (
                  <Card key={order.id} className="hover-elevate">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Customer Info */}
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground flex items-center gap-2"><User className="w-4 h-4" />Customer Name</p>
                            <p className="font-semibold">{order.customerName}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground flex items-center gap-2"><Mail className="w-4 h-4" />Email</p>
                            <p className="font-semibold text-sm">{order.customerEmail}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Phone</p>
                            <p className="font-semibold">{order.customerPhone}</p>
                          </div>
                        </div>

                        {/* Order Details */}
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground flex items-center gap-2"><Package className="w-4 h-4" />Order ID</p>
                            <p className="font-semibold text-xs">{order.id}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Items Count</p>
                            <p className="font-semibold">{itemsList.length} item(s)</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Order Date</p>
                            <p className="font-semibold text-sm">
                              {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                            </p>
                          </div>
                        </div>

                        {/* Payment & Amount */}
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4" />Total Amount</p>
                            <p className="font-bold text-lg text-accent">₹{parseFloat(order.totalAmount).toLocaleString("en-IN")}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Payment Status</p>
                            <Badge variant={order.paymentStatus === "completed" ? "default" : "outline"}>
                              {order.paymentStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2"><MapPin className="w-4 h-4" />Shipping Address</p>
                        <p className="text-sm">{order.shippingAddress}</p>
                      </div>

                      {/* Items List */}
                      {itemsList.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-semibold mb-2">Items Ordered:</p>
                          <div className="text-sm space-y-1">
                            {itemsList.map((item: any, idx: number) => (
                              <div key={idx} className="flex justify-between text-muted-foreground">
                                <span>{item.name || item.productId}</span>
                                <span>x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Regular customer view - shopping cart
  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-2" data-testid="text-empty-cart">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started</p>
          <Link href="/products/gemstones">
            <Button data-testid="button-shop-now">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8" data-testid="text-cart-title">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} data-testid={`card-cart-item-${item.id}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        data-testid={`img-cart-item-${item.id}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1" data-testid={`text-item-name-${item.id}`}>
                        {item.name}
                      </h3>
                      <p className="text-xl font-bold text-accent mb-4" data-testid={`text-item-price-${item.id}`}>
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, -1)}
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold" data-testid={`text-quantity-${item.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, 1)}
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => removeItem(item.id)}
                          data-testid={`button-remove-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h2 className="font-serif text-2xl font-bold" data-testid="text-order-summary">Order Summary</h2>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold" data-testid="text-subtotal">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold" data-testid="text-shipping">
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>

                  {shipping === 0 && (
                    <p className="text-xs text-accent">
                      Free shipping on orders over ₹5,000
                    </p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-accent" data-testid="text-total">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>

                <Button size="lg" className="w-full" data-testid="button-checkout">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Link href="/products/gemstones">
                  <Button variant="outline" size="lg" className="w-full" data-testid="button-continue-shopping">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
