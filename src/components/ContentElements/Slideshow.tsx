import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ChevronLeft, ChevronRight, Plus, Trash2, Upload } from "lucide-react";

interface SlideType {
  id: string;
  imageUrl: string;
  caption: string;
  altText: string;
}

interface SlideshowProps {
  slides?: SlideType[];
  onSlidesChange?: (slides: SlideType[]) => void;
  editable?: boolean;
}

const Slideshow = ({
  slides = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
      caption: "Welcome to our school",
      altText: "School building front view",
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      caption: "Providing quality education",
      altText: "Students in classroom",
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
      caption: "Building the future together",
      altText: "School campus",
    },
  ],
  onSlidesChange = () => {},
  editable = true,
}: SlideshowProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [editingSlide, setEditingSlide] = useState<SlideType | null>(null);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleAddSlide = () => {
    const newSlide: SlideType = {
      id: Date.now().toString(),
      imageUrl:
        "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
      caption: "New slide",
      altText: "New slide image",
    };
    onSlidesChange([...slides, newSlide]);
  };

  const handleDeleteSlide = (id: string) => {
    const updatedSlides = slides.filter((slide) => slide.id !== id);
    onSlidesChange(updatedSlides);
    if (currentSlide >= updatedSlides.length) {
      setCurrentSlide(Math.max(0, updatedSlides.length - 1));
    }
  };

  const handleEditSlide = (slide: SlideType) => {
    setEditingSlide({ ...slide });
  };

  const handleSaveEdit = () => {
    if (editingSlide) {
      const updatedSlides = slides.map((slide) =>
        slide.id === editingSlide.id ? editingSlide : slide,
      );
      onSlidesChange(updatedSlides);
      setEditingSlide(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingSlide(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && editingSlide) {
      // In a real implementation, you would upload the file to a server
      // For this UI scaffolding, we'll use a local URL
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingSlide({
          ...editingSlide,
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      {/* Slideshow Display */}
      <div className="relative h-[400px] w-full">
        {slides.length > 0 ? (
          <>
            <div className="absolute inset-0 bg-black/5">
              <img
                src={slides[currentSlide].imageUrl}
                alt={slides[currentSlide].altText}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                <p className="text-xl font-semibold">
                  {slides[currentSlide].caption}
                </p>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Slide Indicators */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 w-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <p className="text-gray-500">No slides available</p>
          </div>
        )}
      </div>

      {/* Edit Controls (only shown when editable) */}
      {editable && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Slideshow Editor</h3>
            <Button onClick={handleAddSlide} size="sm">
              <Plus className="h-4 w-4 mr-2" /> Add Slide
            </Button>
          </div>

          {/* Slide Thumbnails */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {slides.map((slide, index) => (
              <Card key={slide.id} className="overflow-hidden relative group">
                <img
                  src={slide.imageUrl}
                  alt={slide.altText}
                  className="w-full h-24 object-cover"
                />
                <div className="p-2 text-xs truncate">{slide.caption}</div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleEditSlide(slide)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteSlide(slide.id)}
                    disabled={slides.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {index === currentSlide && (
                  <div className="absolute top-0 left-0 bg-blue-500 text-white text-xs px-2 py-1">
                    Current
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Edit Form */}
          {editingSlide && (
            <Card className="p-4">
              <h4 className="font-medium mb-4">Edit Slide</h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="slide-image">Image</Label>
                  <div className="mt-1 flex items-center gap-4">
                    <div className="h-24 w-24 overflow-hidden rounded border">
                      <img
                        src={editingSlide.imageUrl}
                        alt={editingSlide.altText}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="image-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload New Image
                      </Label>
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="slide-caption">Caption</Label>
                  <Input
                    id="slide-caption"
                    value={editingSlide.caption}
                    onChange={(e) =>
                      setEditingSlide({
                        ...editingSlide,
                        caption: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="slide-alt-text">Alt Text</Label>
                  <Textarea
                    id="slide-alt-text"
                    value={editingSlide.altText}
                    onChange={(e) =>
                      setEditingSlide({
                        ...editingSlide,
                        altText: e.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit}>Save Changes</Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Slideshow;
