import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link,
  Image,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Code,
  Quote,
  Table,
  PaintBucket,
  Type,
} from "lucide-react";

interface WYSIWYGEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  height?: string;
  toolbarOptions?: {
    basic?: boolean;
    formatting?: boolean;
    alignment?: boolean;
    lists?: boolean;
    media?: boolean;
    advanced?: boolean;
  };
}

const WYSIWYGEditor = ({
  initialContent = "<p>Start typing your content here...</p>",
  onChange = () => {},
  placeholder = "Start typing...",
  height = "400px",
  toolbarOptions = {
    basic: true,
    formatting: true,
    alignment: true,
    lists: true,
    media: true,
    advanced: true,
  },
}: WYSIWYGEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState("edit");
  const [selectedText, setSelectedText] = useState("");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [textColor, setTextColor] = useState("#000000");

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      onChange(newContent);
    }
  };

  const execCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    handleContentChange();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setSelectedText(selection.toString());
    }
  };

  const handleLinkInsert = () => {
    if (linkUrl) {
      execCommand("createLink", linkUrl);
      setShowLinkDialog(false);
      setLinkUrl("");
    }
  };

  const handleColorChange = (color: string) => {
    setTextColor(color);
    execCommand("foreColor", color);
    setShowColorPicker(false);
  };

  const commonColors = [
    "#000000",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#FF00FF",
    "#00FFFF",
    "#FFFFFF",
    "#C0C0C0",
    "#808080",
    "#800000",
    "#808000",
    "#008000",
    "#800080",
    "#008080",
    "#000080",
  ];

  return (
    <div className="w-full bg-white rounded-md border border-gray-200 shadow-sm">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between p-2 border-b border-gray-200">
          <TabsList className="grid w-40 grid-cols-2">
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => execCommand("undo")}
                  >
                    <Undo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => execCommand("redo")}
                  >
                    <Redo className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <TabsContent value="edit" className="p-0">
          {/* Toolbar */}
          <div className="p-2 border-b border-gray-200 flex flex-wrap gap-1">
            {toolbarOptions.basic && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("bold")}
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Bold</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("italic")}
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Italic</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("underline")}
                      >
                        <Underline className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Underline</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}

            {toolbarOptions.formatting && (
              <>
                <Separator orientation="vertical" className="h-8 mx-1" />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("formatBlock", "<h1>")}
                      >
                        <Heading1 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Heading 1</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("formatBlock", "<h2>")}
                      >
                        <Heading2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Heading 2</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("formatBlock", "<h3>")}
                      >
                        <Heading3 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Heading 3</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("formatBlock", "<p>")}
                      >
                        <Type className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Paragraph</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}

            {toolbarOptions.alignment && (
              <>
                <Separator orientation="vertical" className="h-8 mx-1" />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("justifyLeft")}
                      >
                        <AlignLeft className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Align Left</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("justifyCenter")}
                      >
                        <AlignCenter className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Align Center</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("justifyRight")}
                      >
                        <AlignRight className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Align Right</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("justifyFull")}
                      >
                        <AlignJustify className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Justify</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}

            {toolbarOptions.lists && (
              <>
                <Separator orientation="vertical" className="h-8 mx-1" />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("insertUnorderedList")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Bullet List</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("insertOrderedList")}
                      >
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Numbered List</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}

            {toolbarOptions.media && (
              <>
                <Separator orientation="vertical" className="h-8 mx-1" />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowLinkDialog(true)}
                      >
                        <Link className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Insert Link</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const url = prompt("Enter image URL:");
                          if (url) execCommand("insertImage", url);
                        }}
                      >
                        <Image className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Insert Image</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}

            {toolbarOptions.advanced && (
              <>
                <Separator orientation="vertical" className="h-8 mx-1" />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          execCommand("formatBlock", "<blockquote>")
                        }
                      >
                        <Quote className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Quote</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => execCommand("formatBlock", "<pre>")}
                      >
                        <Code className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Code Block</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const rows = prompt("Number of rows:", "2");
                          const cols = prompt("Number of columns:", "2");
                          if (rows && cols) {
                            const table = document.createElement("table");
                            table.border = "1";
                            table.style.width = "100%";
                            table.style.borderCollapse = "collapse";

                            for (let i = 0; i < parseInt(rows); i++) {
                              const row = table.insertRow();
                              for (let j = 0; j < parseInt(cols); j++) {
                                const cell = row.insertCell();
                                cell.style.border = "1px solid #ddd";
                                cell.style.padding = "8px";
                                cell.innerHTML = `Cell ${i + 1},${j + 1}`;
                              }
                            }

                            const html = table.outerHTML;
                            execCommand("insertHTML", html);
                          }
                        }}
                      >
                        <Table className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Insert Table</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                      >
                        <PaintBucket
                          className="h-4 w-4"
                          style={{ color: textColor }}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Text Color</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
          </div>

          {/* Color Picker Dialog */}
          {showColorPicker && (
            <div className="absolute z-10 p-2 bg-white border border-gray-200 rounded-md shadow-md">
              <div className="grid grid-cols-8 gap-1">
                {commonColors.map((color) => (
                  <button
                    key={color}
                    className="w-6 h-6 rounded-md border border-gray-300"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Link Dialog */}
          {showLinkDialog && (
            <div className="absolute z-10 p-4 bg-white border border-gray-200 rounded-md shadow-md w-80">
              <h3 className="text-sm font-medium mb-2">Insert Link</h3>
              <input
                type="text"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLinkDialog(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={handleLinkInsert}>
                  Insert
                </Button>
              </div>
            </div>
          )}

          {/* Editor Content */}
          <div
            ref={editorRef}
            contentEditable
            className="p-4 min-h-[200px]"
            style={{ height, overflowY: "auto" }}
            onInput={handleContentChange}
            onSelect={handleTextSelection}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </TabsContent>

        <TabsContent value="preview" className="p-4 border-t border-gray-200">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WYSIWYGEditor;
