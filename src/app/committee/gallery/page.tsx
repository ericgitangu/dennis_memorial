"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";

export default function CommitteeGalleryPage() {
  const [uploading, setUploading] = useState(false);

  function handleUpload() {
    setUploading(true);
    // TODO: Implement Supabase Storage upload
    setTimeout(() => setUploading(false), 1000);
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl sm:text-3xl font-heading font-light text-center text-foreground dark:text-foreground">
        Planning Gallery
      </h1>

      {/* Upload Area */}
      <Card className="bg-card/50 dark:bg-card/30 backdrop-blur border-gold/10 dark:border-gold/20 border-dashed">
        <CardContent className="pt-6 pb-6 sm:pt-8 sm:pb-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <Upload className="h-10 w-10 sm:h-12 sm:w-12 mx-auto text-gold/40 dark:text-gold-light/40" />
            <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground">
              Drag and drop photos here, or click to browse
            </p>
            <Button
              onClick={handleUpload}
              disabled={uploading}
              className="bg-gold hover:bg-gold-light text-primary-foreground font-label uppercase tracking-wider text-xs"
            >
              {uploading ? "Uploading..." : "Select Photos"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid Placeholder */}
      <Card className="bg-card/50 dark:bg-card/30 backdrop-blur border-gold/10 dark:border-gold/20">
        <CardHeader>
          <CardTitle className="font-heading text-lg sm:text-xl font-light flex items-center gap-2 text-foreground dark:text-foreground">
            <ImageIcon className="h-5 w-5 text-gold dark:text-gold-light" />
            Uploaded Photos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs sm:text-sm text-muted-foreground dark:text-muted-foreground text-center py-8">
            No photos uploaded yet. Upload planning and preparation photos for the committee.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
