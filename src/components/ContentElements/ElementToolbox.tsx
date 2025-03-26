import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ScrollArea } from "../ui/scroll-area";
import { ImageIcon, Type, SlidersHorizontal, LayoutIcon } from "lucide-react";

interface ElementProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const DraggableElement = ({ id, name, icon, description }: ElementProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="cursor-grab active:cursor-grabbing"
          >
            <Card className="p-4 mb-3 hover:bg-slate-100 transition-colors border-2 border-dashed hover:border-primary">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-md text-primary">
                  {icon}
                </div>
                <div>
                  <h3 className="font-medium text-sm">{name}</h3>
                </div>
              </div>
            </Card>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface ElementToolboxProps {
  onElementAdd?: (elementType: string) => void;
}

const ElementToolbox = ({ onElementAdd = () => {} }: ElementToolboxProps) => {
  const elements = [
    {
      id: "slideshow",
      name: "Slideshow",
      icon: <SlidersHorizontal size={18} />,
      description: "Add a slideshow with multiple images and captions",
    },
    {
      id: "text-section",
      name: "Text Section",
      icon: <Type size={18} />,
      description: "Add a formatted text section with headings and paragraphs",
    },
    {
      id: "image-section",
      name: "Image Section",
      icon: <ImageIcon size={18} />,
      description: "Add an image with optional caption and alignment options",
    },
    {
      id: "two-column",
      name: "Two Column Layout",
      icon: <LayoutIcon size={18} />,
      description: "Create a two-column layout for content",
    },
  ];

  // For non-drag-and-drop usage
  const handleAddElement = (elementId: string) => {
    onElementAdd(elementId);
  };

  return (
    <div className="w-full h-full bg-white rounded-md border p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Content Elements</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Drag elements to add them to your page or click the add button.
      </p>
      <ScrollArea className="h-[320px] pr-4">
        <div className="space-y-2">
          {elements.map((element) => (
            <div key={element.id} className="relative group">
              <DraggableElement
                id={element.id}
                name={element.name}
                icon={element.icon}
                description={element.description}
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleAddElement(element.id)}
              >
                Add
              </Button>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ElementToolbox;
