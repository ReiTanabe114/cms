import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { X, Check, ChevronLeft, ChevronRight } from "lucide-react";

interface PreviewModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onApprove?: () => void;
  onReturn?: () => void;
  websiteData?: {
    title?: string;
    sections?: Array<{
      type: string;
      content: any;
    }>;
  };
}

const PreviewModal = ({
  isOpen = true,
  onOpenChange,
  onApprove = () => {},
  onReturn = () => {},
  websiteData = {
    title: "School Website Preview",
    sections: [
      {
        type: "slideshow",
        content: {
          images: [
            "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
            "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
          ],
        },
      },
      {
        type: "text",
        content: {
          title: "Welcome to Our School",
          body: "We are committed to providing a supportive and enriching environment where students can achieve their full potential. Our dedicated faculty and staff work together to ensure that each student receives a quality education.",
        },
      },
      {
        type: "image",
        content: {
          src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
          caption: "Our campus facilities",
        },
      },
    ],
  },
}: PreviewModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  const handleNextSlide = () => {
    const slideshow = websiteData.sections?.find(
      (section) => section.type === "slideshow",
    );
    const images = slideshow?.content?.images || [];
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handlePrevSlide = () => {
    const slideshow = websiteData.sections?.find(
      (section) => section.type === "slideshow",
    );
    const images = slideshow?.content?.images || [];
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const renderSection = (section: any, index: number) => {
    switch (section.type) {
      case "slideshow":
        return (
          <div className="relative w-full h-64 bg-gray-100 overflow-hidden rounded-md">
            {section.content.images && section.content.images.length > 0 && (
              <>
                <img
                  src={section.content.images[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/70 hover:bg-white/90 rounded-full"
                    onClick={handlePrevSlide}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/70 hover:bg-white/90 rounded-full"
                    onClick={handleNextSlide}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                  {section.content.images.map((_: any, i: number) => (
                    <button
                      key={i}
                      className={`w-2 h-2 rounded-full ${i === currentSlide ? "bg-white" : "bg-white/50"}`}
                      onClick={() => setCurrentSlide(i)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        );
      case "text":
        return (
          <div className="p-4 bg-white rounded-md shadow-sm">
            {section.content.title && (
              <h2 className="text-xl font-bold mb-2">
                {section.content.title}
              </h2>
            )}
            {section.content.body && (
              <p className="text-gray-700">{section.content.body}</p>
            )}
          </div>
        );
      case "image":
        return (
          <div className="p-4 bg-white rounded-md shadow-sm">
            <img
              src={section.content.src}
              alt={section.content.caption || "Image"}
              className="w-full h-auto rounded-md"
            />
            {section.content.caption && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                {section.content.caption}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-gray-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {websiteData.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 my-4">
          {websiteData.sections?.map((section, index) => (
            <div key={index} className="relative">
              {renderSection(section, index)}
            </div>
          ))}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between border-t pt-4">
          <Button
            variant="outline"
            onClick={onReturn}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Return to Editor
          </Button>
          <Button onClick={onApprove} className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Approve & Publish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
