import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Order } from "@shared/schema";

export default function AdminOrders() {
  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    queryFn: async () => {
      const response = await fetch("/api/orders");
      return response.json();
    }
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Manage Orders</h2>

      {isLoading ? (
        <div>Loading orders...</div>
      ) : orders && orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Card key={order.id} className="p-4" data-testid={`card-order-${order.id}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold">{order.customerName}</h3>
                  <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                  <p className="text-sm">₹{order.totalAmount}</p>
                </div>
                <Badge variant={order.paymentStatus === "completed" ? "default" : "outline"}>
                  {order.paymentStatus}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-6 text-center text-muted-foreground">
          No orders yet
        </Card>
      )}
    </div>
  );
}
