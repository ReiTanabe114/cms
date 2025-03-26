import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import {
  Upload,
  Image,
  Trash2,
  MoveHorizontal,
  MoveVertical,
} from "lucide-react";
import { cn } from "../../lib/utils";

interface ImageSectionProps {
  id?: string;
  imageUrl?: string;
  caption?: string;
  altText?: string;
  alignment?: "left" | "center" | "right";
  size?: number;
  onDelete?: () => void;
  onUpdate?: (data: {
    imageUrl: string;
    caption: string;
    altText: string;
    alignment: "left" | "center" | "right";
    size: number;
  }) => void;
}

const ImageSection = ({
  id = "image-section-1",
  imageUrl = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
  caption = "School campus main building",
  altText = "Image of school campus",
  alignment = "center",
  size = 80,
  onDelete = () => {},
  onUpdate = () => {},
}: ImageSectionProps) => {
  const [image, setImage] = useState<string>(imageUrl);
  const [imageCaption, setImageCaption] = useState<string>(caption);
  const [imageAltText, setImageAltText] = useState<string>(altText);
  const [imageAlignment, setImageAlignment] = useState<
    "left" | "center" | "right"
  >(alignment);
  const [imageSize, setImageSize] = useState<number>(size);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, this would upload to a server
      // For now, we'll create a local URL
      const localUrl = URL.createObjectURL(file);
      setImage(localUrl);
    }
  };

  const handleSave = () => {
    onUpdate({
      imageUrl: image,
      caption: imageCaption,
      altText: imageAltText,
      alignment: imageAlignment,
      size: imageSize,
    });
    setIsEditing(false);
  };

  const getAlignmentClass = () => {
    switch (imageAlignment) {
      case "left":
        return "justify-start";
      case "right":
        return "justify-end";
      default:
        return "justify-center";
    }
  };

  return (
    <Card className="w-full bg-white border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Image Section</CardTitle>
        <div className="flex space-x-2">
          {isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-upload`}>Upload Image</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById(`${id}-upload`)?.click()
                  }
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Select Image
                </Button>
                <Input
                  id={`${id}-upload`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <span className="text-sm text-gray-500">
                  {image !== imageUrl
                    ? "New image selected"
                    : "No new image selected"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${id}-alt-text`}>Alt Text</Label>
              <Input
                id={`${id}-alt-text`}
                value={imageAltText}
                onChange={(e) => setImageAltText(e.target.value)}
                placeholder="Describe the image for accessibility"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${id}-caption`}>Caption</Label>
              <Textarea
                id={`${id}-caption`}
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                placeholder="Add a caption for this image"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Alignment</Label>
              <div className="flex space-x-2">
                <Button
                  variant={imageAlignment === "left" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImageAlignment("left")}
                >
                  <MoveHorizontal className="h-4 w-4 mr-2" />
                  Left
                </Button>
                <Button
                  variant={imageAlignment === "center" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImageAlignment("center")}
                >
                  <MoveHorizontal className="h-4 w-4 mr-2" />
                  Center
                </Button>
                <Button
                  variant={imageAlignment === "right" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setImageAlignment("right")}
                >
                  <MoveHorizontal className="h-4 w-4 mr-2" />
                  Right
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor={`${id}-size`}>Size</Label>
                <span>{imageSize}%</span>
              </div>
              <Slider
                id={`${id}-size`}
                min={20}
                max={100}
                step={5}
                value={[imageSize]}
                onValueChange={(value) => setImageSize(value[0])}
              />
            </div>

            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={cn("flex", getAlignmentClass())}>
              <div style={{ width: `${imageSize}%` }} className="relative">
                <img
                  src={image}
                  alt={imageAltText}
                  className="rounded-md object-cover w-full"
                />
                {imageCaption && (
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {imageCaption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center text-sm text-gray-500">
          <Image className="h-4 w-4 mr-1" />
          <span>Image Section</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MoveVertical className="h-4 w-4 mr-1" />
          <span>Drag to reposition</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ImageSection;
