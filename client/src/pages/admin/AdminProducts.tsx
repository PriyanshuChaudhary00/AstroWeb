import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, X, Upload, AlertCircle } from "lucide-react";
import { getAuthToken } from "@/lib/supabase";
import type { Product } from "@shared/schema";

export default function AdminProducts() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", category: "", price: "", description: "", images: [] as string[] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      return response.json();
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, base64]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.category || !formData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        toast({
          title: "Error",
          description: "You must be logged in as admin to add products",
          variant: "destructive"
        });
        return;
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          images: formData.images.length > 0 ? formData.images : ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600"],
          benefits: ["Benefit 1", "Benefit 2"],
          certified: true,
          inStock: true
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to add product");
      }

      toast({
        title: "Success",
        description: "Product added successfully"
      });
      setFormData({ name: "", category: "", price: "", description: "", images: [] });
      setShowForm(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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
            <div className="border-2 border-dashed rounded-md p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                <span className="text-sm text-muted-foreground">Upload Product Images</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  data-testid="input-product-images"
                />
              </label>
            </div>
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={image} alt={`Product ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      data-testid={`button-remove-image-${index}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={handleAddProduct} data-testid="button-save-product">
                Save Product
              </Button>
              <Button variant="outline" onClick={() => { setShowForm(false); setFormData({ name: "", category: "", price: "", description: "", images: [] }); }}>
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
