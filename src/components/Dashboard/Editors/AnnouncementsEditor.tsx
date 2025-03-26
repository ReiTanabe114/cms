import React, { useState } from "react";
import { Button } from "../../ui/button";
import { Card } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Textarea } from "../../ui/textarea";
import { ScrollArea } from "../../ui/scroll-area";
import { Plus, Edit, Trash2, Search, Calendar, Clock } from "lucide-react";
// Remove the WYSIWYGEditor import since it's not available

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isPinned: boolean;
}

interface AnnouncementsEditorProps {
  announcements?: Announcement[];
  onSave?: (announcements: Announcement[]) => void;
}

const AnnouncementsEditor: React.FC<AnnouncementsEditorProps> = ({
  announcements = [
    {
      id: "1",
      title: "School Registration Open",
      content:
        "<p>Registration for the new academic year is now open. Please visit the administration office to complete the necessary paperwork.</p>",
      date: "2023-07-15",
      isPinned: true,
    },
    {
      id: "2",
      title: "Annual Sports Day",
      content:
        "<p>Our annual sports day will be held on August 10th. All students are encouraged to participate in various events.</p>",
      date: "2023-07-20",
      isPinned: false,
    },
    {
      id: "3",
      title: "Parent-Teacher Meeting",
      content:
        "<p>The quarterly parent-teacher meeting is scheduled for July 25th. Please make arrangements to attend.</p>",
      date: "2023-07-12",
      isPinned: false,
    },
  ],
  onSave = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [editingAnnouncement, setEditingAnnouncement] =
    useState<Announcement | null>(null);
  const [isNewAnnouncementDialogOpen, setIsNewAnnouncementDialogOpen] =
    useState(false);
  const [localAnnouncements, setLocalAnnouncements] =
    useState<Announcement[]>(announcements);

  // Filter announcements based on search term and active tab
  const filteredAnnouncements = localAnnouncements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pinned") return matchesSearch && announcement.isPinned;

    return matchesSearch;
  });

  const handleSaveAnnouncement = (announcement: Announcement) => {
    if (editingAnnouncement) {
      // Update existing announcement
      const updatedAnnouncements = localAnnouncements.map((a) =>
        a.id === announcement.id ? announcement : a,
      );
      setLocalAnnouncements(updatedAnnouncements);
      onSave(updatedAnnouncements);
    } else {
      // Add new announcement
      const newAnnouncement = {
        ...announcement,
        id: Date.now().toString(), // Generate a simple ID
        date: new Date().toISOString().split("T")[0], // Today's date
      };
      const updatedAnnouncements = [...localAnnouncements, newAnnouncement];
      setLocalAnnouncements(updatedAnnouncements);
      onSave(updatedAnnouncements);
    }
    setEditingAnnouncement(null);
    setIsNewAnnouncementDialogOpen(false);
  };

  const handleDeleteAnnouncement = (id: string) => {
    const updatedAnnouncements = localAnnouncements.filter((a) => a.id !== id);
    setLocalAnnouncements(updatedAnnouncements);
    onSave(updatedAnnouncements);
  };

  const handleTogglePin = (id: string) => {
    const updatedAnnouncements = localAnnouncements.map((a) =>
      a.id === id ? { ...a, isPinned: !a.isPinned } : a,
    );
    setLocalAnnouncements(updatedAnnouncements);
    onSave(updatedAnnouncements);
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Announcements</h2>
        <Dialog
          open={isNewAnnouncementDialogOpen}
          onOpenChange={setIsNewAnnouncementDialogOpen}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setEditingAnnouncement(null)}>
              <Plus className="mr-2 h-4 w-4" /> Add Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                {editingAnnouncement ? "Edit Announcement" : "New Announcement"}
              </DialogTitle>
            </DialogHeader>
            <AnnouncementForm
              announcement={
                editingAnnouncement || {
                  id: "",
                  title: "",
                  content: "",
                  date: new Date().toISOString().split("T")[0],
                  isPinned: false,
                }
              }
              onSave={handleSaveAnnouncement}
              onCancel={() => {
                setEditingAnnouncement(null);
                setIsNewAnnouncementDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-[300px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pinned">Pinned</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <ScrollArea className="h-[650px] pr-4">
        {filteredAnnouncements.length > 0 ? (
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="p-4 relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center">
                      {announcement.isPinned && (
                        <span
                          className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"
                          title="Pinned announcement"
                        />
                      )}
                      {announcement.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{announcement.date}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePin(announcement.id)}
                      title={
                        announcement.isPinned
                          ? "Unpin announcement"
                          : "Pin announcement"
                      }
                    >
                      {announcement.isPinned ? "Unpin" : "Pin"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingAnnouncement(announcement);
                        setIsNewAnnouncementDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div
                  className="mt-3 text-gray-700"
                  dangerouslySetInnerHTML={{ __html: announcement.content }}
                />
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
            <Clock className="h-12 w-12 mb-4" />
            <p className="text-lg">No announcements found</p>
            <p className="text-sm">
              Create a new announcement or adjust your search
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

interface AnnouncementFormProps {
  announcement: Announcement;
  onSave: (announcement: Announcement) => void;
  onCancel: () => void;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  announcement,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Announcement>(announcement);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Announcement title"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Content
        </label>
        <div className="border rounded-md">
          {/* Rich text editor would be implemented here */}
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Announcement content"
            className="min-h-[200px]"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="date" className="block text-sm font-medium mb-1">
          Date
        </label>
        <Input
          id="date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="flex items-center">
        <input
          id="isPinned"
          name="isPinned"
          type="checkbox"
          checked={formData.isPinned}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, isPinned: e.target.checked }))
          }
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="isPinned" className="ml-2 block text-sm">
          Pin this announcement
        </label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Announcement</Button>
      </div>
    </form>
  );
};

export default AnnouncementsEditor;
