import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Edit2 } from "lucide-react";
import type { BlogPost } from "@shared/schema";

export default function AdminBlog() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", excerpt: "", content: "" });

  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    queryFn: async () => {
      const response = await fetch("/api/blog");
      return response.json();
    }
  });

  const handleAddPost = async () => {
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
          category: "Astrology",
          featuredImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
          author: "Admin",
          readTime: 5,
          metaDescription: formData.excerpt,
          publishedAt: new Date()
        })
      });
      setFormData({ title: "", excerpt: "", content: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
        <Button onClick={() => setShowForm(!showForm)} data-testid="button-add-blog">
          <Plus className="w-4 h-4 mr-2" />
          Add Post
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h3 className="font-bold mb-4">Add New Blog Post</h3>
          <div className="grid gap-4">
            <Input
              placeholder="Post Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              data-testid="input-blog-title"
            />
            <Input
              placeholder="Post Excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              data-testid="input-blog-excerpt"
            />
            <textarea
              placeholder="Post Content"
              className="border rounded-md p-2 min-h-32"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              data-testid="textarea-blog-content"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddPost} data-testid="button-save-blog">
                Save Post
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {isLoading ? (
        <div>Loading posts...</div>
      ) : (
        <div className="grid gap-4">
          {posts?.map((post) => (
            <Card key={post.id} className="p-4" data-testid={`card-blog-${post.id}`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-bold">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" data-testid={`button-edit-blog-${post.id}`}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" data-testid={`button-delete-blog-${post.id}`}>
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
