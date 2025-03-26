import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Palette, Type, Layout, Check, Undo } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlobalCustomizationEditorProps {
  onSave?: (settings: GlobalSettings) => void;
  initialSettings?: GlobalSettings;
}

interface GlobalSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    headingSize: number;
    bodySize: number;
  };
  layout: {
    containerWidth: number;
    spacing: number;
    roundedCorners: boolean;
    useShadows: boolean;
  };
}

const defaultSettings: GlobalSettings = {
  colors: {
    primary: "#3b82f6",
    secondary: "#10b981",
    accent: "#f59e0b",
    background: "#ffffff",
    text: "#1f2937",
  },
  typography: {
    headingFont: "Inter",
    bodyFont: "Inter",
    headingSize: 24,
    bodySize: 16,
  },
  layout: {
    containerWidth: 1200,
    spacing: 16,
    roundedCorners: true,
    useShadows: true,
  },
};

const fontOptions = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Poppins",
  "Raleway",
  "Source Sans Pro",
  "Oswald",
  "Playfair Display",
];

const GlobalCustomizationEditor = ({
  onSave = () => {},
  initialSettings = defaultSettings,
}: GlobalCustomizationEditorProps) => {
  const [settings, setSettings] = useState<GlobalSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState("colors");

  const handleColorChange = (
    colorKey: keyof GlobalSettings["colors"],
    value: string,
  ) => {
    setSettings({
      ...settings,
      colors: {
        ...settings.colors,
        [colorKey]: value,
      },
    });
  };

  const handleTypographyChange = (
    key: keyof GlobalSettings["typography"],
    value: string | number,
  ) => {
    setSettings({
      ...settings,
      typography: {
        ...settings.typography,
        [key]: value,
      },
    });
  };

  const handleLayoutChange = (
    key: keyof GlobalSettings["layout"],
    value: number | boolean,
  ) => {
    setSettings({
      ...settings,
      layout: {
        ...settings.layout,
        [key]: value,
      },
    });
  };

  const handleSave = () => {
    onSave(settings);
  };

  const handleReset = () => {
    setSettings(initialSettings);
  };

  return (
    <div className="w-full h-full bg-white p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Global Customization</h2>
          <p className="text-muted-foreground">
            Customize the appearance of your school website
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <Undo className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleSave}>
            <Check className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="colors" className="flex items-center">
            <Palette className="mr-2 h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="typography" className="flex items-center">
            <Type className="mr-2 h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="layout" className="flex items-center">
            <Layout className="mr-2 h-4 w-4" />
            Layout
          </TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Scheme</CardTitle>
              <CardDescription>
                Customize the colors used throughout your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(settings.colors).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={`color-${key}`} className="capitalize">
                      {key}
                    </Label>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: value }}
                      />
                      <Input
                        id={`color-${key}`}
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleColorChange(
                            key as keyof GlobalSettings["colors"],
                            e.target.value,
                          )
                        }
                      />
                      <Input
                        type="color"
                        value={value}
                        className="w-12 h-10 p-1"
                        onChange={(e) =>
                          handleColorChange(
                            key as keyof GlobalSettings["colors"],
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Preview</h3>
                <div
                  className="p-6 rounded-lg"
                  style={{ backgroundColor: settings.colors.background }}
                >
                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ color: settings.colors.primary }}
                  >
                    Sample Heading
                  </h4>
                  <p className="mb-4" style={{ color: settings.colors.text }}>
                    This is how your text will appear on your website. The
                    primary color is used for headings and links.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      style={{
                        backgroundColor: settings.colors.primary,
                        color: "white",
                      }}
                    >
                      Primary Button
                    </Button>
                    <Button
                      style={{
                        backgroundColor: settings.colors.secondary,
                        color: "white",
                      }}
                    >
                      Secondary Button
                    </Button>
                    <Button
                      style={{
                        backgroundColor: settings.colors.accent,
                        color: "white",
                      }}
                    >
                      Accent Button
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Typography Settings</CardTitle>
              <CardDescription>
                Customize the fonts and text sizes used on your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="heading-font">Heading Font</Label>
                  <Select
                    value={settings.typography.headingFont}
                    onValueChange={(value) =>
                      handleTypographyChange("headingFont", value)
                    }
                  >
                    <SelectTrigger id="heading-font">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body-font">Body Font</Label>
                  <Select
                    value={settings.typography.bodyFont}
                    onValueChange={(value) =>
                      handleTypographyChange("bodyFont", value)
                    }
                  >
                    <SelectTrigger id="body-font">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="heading-size">
                    Heading Size: {settings.typography.headingSize}px
                  </Label>
                  <Slider
                    id="heading-size"
                    min={16}
                    max={48}
                    step={1}
                    value={[settings.typography.headingSize]}
                    onValueChange={(value) =>
                      handleTypographyChange("headingSize", value[0])
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body-size">
                    Body Text Size: {settings.typography.bodySize}px
                  </Label>
                  <Slider
                    id="body-size"
                    min={12}
                    max={24}
                    step={1}
                    value={[settings.typography.bodySize]}
                    onValueChange={(value) =>
                      handleTypographyChange("bodySize", value[0])
                    }
                  />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Preview</h3>
                <div className="p-6 rounded-lg border">
                  <h4
                    className="font-bold mb-2"
                    style={{
                      fontFamily: settings.typography.headingFont,
                      fontSize: `${settings.typography.headingSize}px`,
                      color: settings.colors.primary,
                    }}
                  >
                    Sample Heading
                  </h4>
                  <p
                    className="mb-4"
                    style={{
                      fontFamily: settings.typography.bodyFont,
                      fontSize: `${settings.typography.bodySize}px`,
                      color: settings.colors.text,
                    }}
                  >
                    This is how your text will appear on your website. You can
                    adjust the font family and size to match your school's
                    branding. The text should be easy to read on all devices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Layout Settings</CardTitle>
              <CardDescription>
                Customize the layout and spacing of your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="container-width">
                    Container Width: {settings.layout.containerWidth}px
                  </Label>
                  <Slider
                    id="container-width"
                    min={800}
                    max={1600}
                    step={50}
                    value={[settings.layout.containerWidth]}
                    onValueChange={(value) =>
                      handleLayoutChange("containerWidth", value[0])
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spacing">
                    Element Spacing: {settings.layout.spacing}px
                  </Label>
                  <Slider
                    id="spacing"
                    min={8}
                    max={32}
                    step={2}
                    value={[settings.layout.spacing]}
                    onValueChange={(value) =>
                      handleLayoutChange("spacing", value[0])
                    }
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="rounded-corners"
                    checked={settings.layout.roundedCorners}
                    onCheckedChange={(checked) =>
                      handleLayoutChange("roundedCorners", checked)
                    }
                  />
                  <Label htmlFor="rounded-corners">Use Rounded Corners</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="use-shadows"
                    checked={settings.layout.useShadows}
                    onCheckedChange={(checked) =>
                      handleLayoutChange("useShadows", checked)
                    }
                  />
                  <Label htmlFor="use-shadows">Use Shadows</Label>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Preview</h3>
                <div
                  className={cn(
                    "p-6 border",
                    settings.layout.roundedCorners ? "rounded-lg" : "",
                    settings.layout.useShadows ? "shadow-md" : "",
                  )}
                  style={{
                    maxWidth: `${settings.layout.containerWidth}px`,
                    margin: "0 auto",
                    backgroundColor: settings.colors.background,
                  }}
                >
                  <div
                    className="grid grid-cols-2 gap-4"
                    style={{ gap: `${settings.layout.spacing}px` }}
                  >
                    <div
                      className={cn(
                        "p-4 border",
                        settings.layout.roundedCorners ? "rounded-md" : "",
                        settings.layout.useShadows ? "shadow-sm" : "",
                      )}
                    >
                      <h4 style={{ color: settings.colors.primary }}>
                        Card Title
                      </h4>
                      <p style={{ color: settings.colors.text }}>
                        Card content with sample text
                      </p>
                    </div>
                    <div
                      className={cn(
                        "p-4 border",
                        settings.layout.roundedCorners ? "rounded-md" : "",
                        settings.layout.useShadows ? "shadow-sm" : "",
                      )}
                    >
                      <h4 style={{ color: settings.colors.primary }}>
                        Card Title
                      </h4>
                      <p style={{ color: settings.colors.text }}>
                        Card content with sample text
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GlobalCustomizationEditor;
