import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import type { Video } from "@shared/schema";

export default function AdminVideos() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", youtubeUrl: "" });

  const { data: videos, isLoading, refetch } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
    queryFn: async () => {
      const response = await fetch("/api/videos");
      return response.json();
    }
  });

  const extractYoutubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleAddVideo = async () => {
    const youtubeId = extractYoutubeId(formData.youtubeUrl);
    if (!youtubeId || !formData.title.trim()) {
      alert("Please enter a valid YouTube URL and title");
      return;
    }

    try {
      await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          youtubeUrl: formData.youtubeUrl,
          thumbnailUrl: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
        })
      });
      setFormData({ title: "", youtubeUrl: "" });
      setShowForm(false);
      refetch();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Videos</h2>
        <Button onClick={() => setShowForm(!showForm)} data-testid="button-add-video-admin">
          <Plus className="w-4 h-4 mr-2" />
          Add Video
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h3 className="font-bold mb-4">Add New Video</h3>
          <div className="grid gap-4">
            <Input
              placeholder="Video Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              data-testid="input-video-title-admin"
            />
            <Input
              placeholder="YouTube URL"
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
              data-testid="input-youtube-url-admin"
            />
            <div className="flex gap-2">
              <Button onClick={handleAddVideo} data-testid="button-save-video-admin">
                Save Video
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {isLoading ? (
        <div>Loading videos...</div>
      ) : (
        <div className="grid gap-4">
          {videos?.map((video) => (
            <Card key={video.id} className="p-4 flex items-center justify-between" data-testid={`card-video-admin-${video.id}`}>
              <div className="flex-1">
                <h3 className="font-bold">{video.title}</h3>
                <p className="text-sm text-muted-foreground">{video.youtubeUrl}</p>
              </div>
              <Button size="icon" variant="destructive" data-testid={`button-delete-video-${video.id}`}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
