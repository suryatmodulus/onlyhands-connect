import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UploadDialog = ({ open, onOpenChange }: UploadDialogProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      toast({
        title: "Error",
        description: "Please select an image to upload",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement actual image upload
    console.log("Uploading image:", image);
    console.log("Caption:", caption);

    toast({
      title: "Success",
      description: "Image uploaded successfully!",
    });

    // Reset form and close dialog
    setImage(null);
    setCaption("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
            />
          </div>
          <Button type="submit" className="w-full">
            Upload
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UploadDialog;