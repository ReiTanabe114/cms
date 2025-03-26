import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { ScrollArea } from "../../ui/scroll-area";
import { Plus, Trash2, MoveVertical, Settings, Eye } from "lucide-react";
import ElementToolbox from "../../ContentElements/ElementToolbox";
import Slideshow from "../../ContentElements/Slideshow";
import TextSection from "../../ContentElements/TextSection";
import ImageSection from "../../ContentElements/ImageSection";

interface ContentElement {
  id: string;
  type: "slideshow" | "text" | "image";
  content: any;
}

interface SortableItemProps {
  element: ContentElement;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
}

const SortableItem = ({ element, onRemove, onEdit }: SortableItemProps) => {
  return (
    <div className="group relative mb-4">
      <Card className="p-4 border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MoveVertical className="h-5 w-5 text-gray-500 cursor-move" />
            <span className="font-medium capitalize">
              {element.type} Section
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(element.id)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemove(element.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>

        {element.type === "slideshow" && <Slideshow {...element.content} />}
        {element.type === "text" && <TextSection {...element.content} />}
        {element.type === "image" && <ImageSection {...element.content} />}
      </Card>
    </div>
  );
};

const LandingPageEditor = () => {
  const [activeTab, setActiveTab] = useState("content");
  const [elements, setElements] = useState<ContentElement[]>([
    {
      id: "slide-1",
      type: "slideshow",
      content: {
        images: [
          {
            src: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&q=80",
            alt: "School building",
            caption: "Welcome to Our School",
          },
          {
            src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
            alt: "Students studying",
            caption: "Fostering Excellence in Education",
          },
        ],
      },
    },
    {
      id: "text-1",
      type: "text",
      content: {
        title: "About Our School",
        text: "Founded in 1985, our school has been committed to providing quality education to students from all backgrounds. We believe in nurturing not just academic excellence but also character development.",
      },
    },
    {
      id: "image-1",
      type: "image",
      content: {
        src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
        alt: "Campus life",
        caption: "Vibrant campus life with various extracurricular activities",
      },
    },
  ]);
  const [editingElement, setEditingElement] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setElements((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addElement = (type: "slideshow" | "text" | "image") => {
    const newElement: ContentElement = {
      id: `${type}-${Date.now()}`,
      type,
      content:
        type === "slideshow"
          ? {
              images: [
                {
                  src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
                  alt: "New slide",
                  caption: "New Slideshow",
                },
              ],
            }
          : type === "text"
            ? { title: "New Text Section", text: "Enter your content here..." }
            : {
                src: "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?w=800&q=80",
                alt: "New image",
                caption: "New Image Section",
              },
    };

    setElements([...elements, newElement]);
    setEditingElement(newElement.id);
    setActiveTab("edit");
  };

  const removeElement = (id: string) => {
    setElements(elements.filter((element) => element.id !== id));
    if (editingElement === id) {
      setEditingElement(null);
      setActiveTab("content");
    }
  };

  const editElement = (id: string) => {
    setEditingElement(id);
    setActiveTab("edit");
  };

  const getEditingElementContent = () => {
    if (!editingElement) return null;
    const element = elements.find((el) => el.id === editingElement);
    if (!element) return null;

    switch (element.type) {
      case "slideshow":
        return <Slideshow {...element.content} isEditing={true} />;
      case "text":
        return <TextSection {...element.content} isEditing={true} />;
      case "image":
        return <ImageSection {...element.content} isEditing={true} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-2xl font-bold">Landing Page Editor</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button size="sm">Save Changes</Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="border-b px-4">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="edit" disabled={!editingElement}>
              Edit Element
            </TabsTrigger>
            <TabsTrigger value="settings">Page Settings</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <TabsContent value="content" className="flex-1 flex mt-0 p-0">
            <div className="w-3/4 p-4 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Page Elements</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addElement("slideshow")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Slideshow
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addElement("text")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Text
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addElement("image")}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={elements.map((e) => e.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {elements.map((element) => (
                      <SortableItem
                        key={element.id}
                        element={element}
                        onRemove={removeElement}
                        onEdit={editElement}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </ScrollArea>
            </div>

            <div className="w-1/4 border-l p-4">
              <h3 className="text-lg font-medium mb-4">Element Toolbox</h3>
              <ElementToolbox onAddElement={addElement} />
            </div>
          </TabsContent>

          <TabsContent value="edit" className="flex-1 p-4 mt-0">
            {editingElement ? (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Edit{" "}
                    {elements
                      .find((e) => e.id === editingElement)
                      ?.type.charAt(0)
                      .toUpperCase() +
                      elements
                        .find((e) => e.id === editingElement)
                        ?.type.slice(1)}{" "}
                    Element
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingElement(null);
                      setActiveTab("content");
                    }}
                  >
                    Done
                  </Button>
                </div>
                <div className="flex-1 overflow-auto">
                  {getEditingElementContent()}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select an element to edit</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="flex-1 p-4 mt-0">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-lg font-medium mb-4">
                Landing Page Settings
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Page Title</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Home Page"
                      defaultValue="Welcome to Our School"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Meta Description
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter meta description"
                      defaultValue="Official website of Our School - Providing quality education since 1985"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Background Color
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="color"
                      defaultValue="#ffffff"
                      className="h-10 w-10"
                    />
                    <input
                      type="text"
                      className="flex-1 p-2 border rounded-md"
                      placeholder="#ffffff"
                      defaultValue="#ffffff"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Header Style</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="standard">Standard</option>
                    <option value="centered">Centered</option>
                    <option value="minimal">Minimal</option>
                    <option value="full-width">Full Width</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Footer Display</label>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="show-footer" defaultChecked />
                    <label htmlFor="show-footer">
                      Show footer on landing page
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default LandingPageEditor;
