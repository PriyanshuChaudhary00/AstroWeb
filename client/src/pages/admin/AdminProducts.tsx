import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit2 } from "lucide-react";
import type { Product } from "@shared/schema";

export default function AdminProducts() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", category: "", price: "", description: "" });

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      return response.json();
    }
  });

  const handleAddProduct = async () => {
    if (!formData.name || !formData.category || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600"],
          benefits: ["Benefit 1", "Benefit 2"],
          certified: true,
          inStock: true
        })
      });
      setFormData({ name: "", category: "", price: "", description: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <Button onClick={() => setShowForm(!showForm)} data-testid="button-add-product">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h3 className="font-bold mb-4">Add New Product</h3>
          <div className="grid gap-4">
            <Input
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              data-testid="input-product-name"
            />
            <select
              className="border rounded-md p-2"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              data-testid="select-product-category"
            >
              <option value="">Select Category</option>
              <option value="Gemstones">Gemstones</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Rudraksha">Rudraksha</option>
              <option value="Yantras">Yantras</option>
              <option value="Rings">Rings</option>
              <option value="Remedies">Remedies</option>
            </select>
            <Input
              placeholder="Price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              data-testid="input-product-price"
            />
            <textarea
              placeholder="Description"
              className="border rounded-md p-2 min-h-20"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              data-testid="textarea-product-description"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddProduct} data-testid="button-save-product">
                Save Product
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {isLoading ? (
        <div>Loading products...</div>
      ) : (
        <div className="grid gap-4">
          {products?.map((product) => (
            <Card key={product.id} className="p-4" data-testid={`card-product-${product.id}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.category} - ₹{product.price}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" data-testid={`button-edit-${product.id}`}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" data-testid={`button-delete-${product.id}`}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
