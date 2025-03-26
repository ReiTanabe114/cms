import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Link,
  Image,
} from "lucide-react";

interface TextSectionProps {
  id?: string;
  title?: string;
  content?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  alignment?: "left" | "center" | "right";
  onUpdate?: (data: Partial<TextSectionProps>) => void;
  onDelete?: () => void;
}

const TextSection = ({
  id = "text-section-1",
  title = "Welcome to Our School",
  content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.",
  backgroundColor = "#ffffff",
  textColor = "#000000",
  fontSize = "medium",
  alignment = "left",
  onUpdate = () => {},
  onDelete = () => {},
}: TextSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localTitle, setLocalTitle] = useState(title);
  const [localContent, setLocalContent] = useState(content);
  const [localBackgroundColor, setLocalBackgroundColor] =
    useState(backgroundColor);
  const [localTextColor, setLocalTextColor] = useState(textColor);
  const [localFontSize, setLocalFontSize] = useState(fontSize);
  const [localAlignment, setLocalAlignment] = useState(alignment);

  const handleSave = () => {
    onUpdate({
      title: localTitle,
      content: localContent,
      backgroundColor: localBackgroundColor,
      textColor: localTextColor,
      fontSize: localFontSize,
      alignment: localAlignment,
    });
    setIsEditing(false);
  };

  const getFontSizeClass = () => {
    switch (localFontSize) {
      case "small":
        return "text-sm";
      case "medium":
        return "text-base";
      case "large":
        return "text-lg";
      case "xlarge":
        return "text-xl";
      default:
        return "text-base";
    }
  };

  const getAlignmentClass = () => {
    switch (localAlignment) {
      case "left":
        return "text-left";
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  return (
    <Card
      className="w-full mb-6 border-2 border-dashed hover:border-gray-400 transition-colors"
      style={{ backgroundColor: localBackgroundColor }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        {isEditing ? (
          <Input
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
            className="font-semibold text-xl"
            style={{ color: localTextColor }}
          />
        ) : (
          <CardTitle style={{ color: localTextColor }}>{localTitle}</CardTitle>
        )}

        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={onDelete}>
                Delete
              </Button>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="style">Style</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="bg-muted p-2 rounded-md flex flex-wrap gap-2">
                  <Button variant="ghost" size="icon" title="Bold">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Italic">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Underline">
                    <Underline className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Align Left">
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Align Center">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Align Right">
                    <AlignRight className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Heading 1">
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Heading 2">
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Bullet List">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Numbered List">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Insert Link">
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" title="Insert Image">
                    <Image className="h-4 w-4" />
                  </Button>
                </div>

                <Textarea
                  value={localContent}
                  onChange={(e) => setLocalContent(e.target.value)}
                  className="min-h-[200px]"
                  style={{ color: localTextColor }}
                />
              </TabsContent>

              <TabsContent value="style" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={localBackgroundColor}
                        onChange={(e) =>
                          setLocalBackgroundColor(e.target.value)
                        }
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={localBackgroundColor}
                        onChange={(e) =>
                          setLocalBackgroundColor(e.target.value)
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="textColor"
                        type="color"
                        value={localTextColor}
                        onChange={(e) => setLocalTextColor(e.target.value)}
                        className="w-12 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={localTextColor}
                        onChange={(e) => setLocalTextColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Select
                      value={localFontSize}
                      onValueChange={setLocalFontSize}
                    >
                      <SelectTrigger id="fontSize">
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="xlarge">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alignment">Text Alignment</Label>
                    <Select
                      value={localAlignment}
                      onValueChange={(value: "left" | "center" | "right") =>
                        setLocalAlignment(value)
                      }
                    >
                      <SelectTrigger id="alignment">
                        <SelectValue placeholder="Select alignment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div
            className={`${getFontSizeClass()} ${getAlignmentClass()} whitespace-pre-line`}
            style={{ color: localTextColor }}
          >
            {localContent}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TextSection;
