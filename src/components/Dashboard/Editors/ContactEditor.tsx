import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Trash2,
  Save,
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

interface ContactFormValues {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  mainPhone: string;
  alternatePhone: string;
  fax: string;
  email: string;
  website: string;
  socialMedia: {
    platform: string;
    url: string;
  }[];
}

const ContactEditor = ({
  initialData,
}: { initialData?: ContactFormValues } = {}) => {
  const defaultValues: ContactFormValues = initialData || {
    address: "123 School Street",
    city: "Anytown",
    state: "CA",
    zipCode: "90210",
    mainPhone: "(555) 123-4567",
    alternatePhone: "(555) 987-6543",
    fax: "(555) 765-4321",
    email: "info@schoolname.edu",
    website: "www.schoolname.edu",
    socialMedia: [
      { platform: "Facebook", url: "https://facebook.com/schoolname" },
      { platform: "Twitter", url: "https://twitter.com/schoolname" },
      { platform: "Instagram", url: "https://instagram.com/schoolname" },
    ],
  };

  const form = useForm<ContactFormValues>({
    defaultValues,
  });

  const [socialMedia, setSocialMedia] = useState(defaultValues.socialMedia);

  const handleAddSocialMedia = () => {
    setSocialMedia([...socialMedia, { platform: "", url: "" }]);
  };

  const handleRemoveSocialMedia = (index: number) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia.splice(index, 1);
    setSocialMedia(updatedSocialMedia);
  };

  const handleSocialMediaChange = (
    index: number,
    field: "platform" | "url",
    value: string,
  ) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia[index][field] = value;
    setSocialMedia(updatedSocialMedia);
  };

  const onSubmit = (data: ContactFormValues) => {
    // Include social media data
    const formData = {
      ...data,
      socialMedia,
    };
    console.log("Saving contact information:", formData);
    // Here you would typically save the data to your backend
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook":
        return <Facebook className="h-4 w-4" />;
      case "twitter":
        return <Twitter className="h-4 w-4" />;
      case "instagram":
        return <Instagram className="h-4 w-4" />;
      case "youtube":
        return <Youtube className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full h-full overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Contact Information</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Address Information
              </CardTitle>
              <CardDescription>
                Update the school's physical address information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 School Street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Anytown" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="90210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Phone Numbers
              </CardTitle>
              <CardDescription>
                Update the school's contact phone numbers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="mainPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="alternatePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alternate Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 987-6543" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fax</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 765-4321" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Online Presence
              </CardTitle>
              <CardDescription>
                Update the school's email and website information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="info@schoolname.edu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="www.schoolname.edu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Social Media
              </CardTitle>
              <CardDescription>
                Manage the school's social media profiles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialMedia.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getSocialIcon(item.platform)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                    <Input
                      placeholder="Platform (e.g., Facebook)"
                      value={item.platform}
                      onChange={(e) =>
                        handleSocialMediaChange(
                          index,
                          "platform",
                          e.target.value,
                        )
                      }
                    />
                    <Input
                      placeholder="URL (e.g., https://facebook.com/schoolname)"
                      value={item.url}
                      onChange={(e) =>
                        handleSocialMediaChange(index, "url", e.target.value)
                      }
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSocialMedia(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={handleAddSocialMedia}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Social Media
              </Button>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Contact Information
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactEditor;
