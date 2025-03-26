import React, { useState } from "react";
import { PlusCircle, Trash2, Edit, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FacultyMember {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  bio: string;
  imageUrl: string;
}

interface FacultyEditorProps {
  facultyMembers?: FacultyMember[];
  onSave?: (facultyMembers: FacultyMember[]) => void;
}

const FacultyEditor = ({
  facultyMembers: initialFacultyMembers = [],
  onSave,
}: FacultyEditorProps) => {
  const [facultyMembers, setFacultyMembers] = useState<FacultyMember[]>(
    initialFacultyMembers.length > 0
      ? initialFacultyMembers
      : [
          {
            id: "1",
            name: "Dr. Jane Smith",
            position: "Principal",
            department: "Administration",
            email: "jane.smith@school.edu",
            phone: "(555) 123-4567",
            bio: "Dr. Smith has over 20 years of experience in education leadership and curriculum development.",
            imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
          },
          {
            id: "2",
            name: "Prof. John Doe",
            position: "Department Head",
            department: "Science",
            email: "john.doe@school.edu",
            phone: "(555) 987-6543",
            bio: "Professor Doe specializes in physics and has published numerous research papers in the field.",
            imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
          },
          {
            id: "3",
            name: "Ms. Emily Johnson",
            position: "Teacher",
            department: "Mathematics",
            email: "emily.johnson@school.edu",
            phone: "(555) 456-7890",
            bio: "Ms. Johnson is passionate about making mathematics accessible and engaging for all students.",
            imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
          },
        ],
  );

  const [currentFaculty, setCurrentFaculty] = useState<FacultyMember | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Form state for new/edit faculty member
  const [formData, setFormData] = useState<Omit<FacultyMember, "id">>({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    bio: "",
    imageUrl: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = () => {
    // In a real implementation, this would handle file uploads
    // For now, we'll just generate a random avatar
    const seed = Math.random().toString(36).substring(2, 8);
    setFormData((prev) => ({
      ...prev,
      imageUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
    }));
  };

  const handleAddFaculty = () => {
    const newFaculty = {
      id: Date.now().toString(),
      ...formData,
    };

    setFacultyMembers((prev) => [...prev, newFaculty]);
    setIsAddDialogOpen(false);
    resetForm();

    if (onSave) {
      onSave([...facultyMembers, newFaculty]);
    }
  };

  const handleEditFaculty = () => {
    if (!currentFaculty) return;

    const updatedFacultyMembers = facultyMembers.map((faculty) =>
      faculty.id === currentFaculty.id ? { ...faculty, ...formData } : faculty,
    );

    setFacultyMembers(updatedFacultyMembers);
    setIsEditDialogOpen(false);
    resetForm();

    if (onSave) {
      onSave(updatedFacultyMembers);
    }
  };

  const handleDeleteFaculty = () => {
    if (!currentFaculty) return;

    const updatedFacultyMembers = facultyMembers.filter(
      (faculty) => faculty.id !== currentFaculty.id,
    );

    setFacultyMembers(updatedFacultyMembers);
    setIsDeleteDialogOpen(false);
    setCurrentFaculty(null);

    if (onSave) {
      onSave(updatedFacultyMembers);
    }
  };

  const openEditDialog = (faculty: FacultyMember) => {
    setCurrentFaculty(faculty);
    setFormData({
      name: faculty.name,
      position: faculty.position,
      department: faculty.department,
      email: faculty.email,
      phone: faculty.phone,
      bio: faculty.bio,
      imageUrl: faculty.imageUrl,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (faculty: FacultyMember) => {
    setCurrentFaculty(faculty);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      bio: "",
      imageUrl: "",
    });
    setCurrentFaculty(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const filteredFaculty = facultyMembers.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.position.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Faculty Management</h1>
        <Button onClick={openAddDialog} className="flex items-center gap-2">
          <PlusCircle size={16} />
          Add Faculty Member
        </Button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search faculty by name, department, or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.length > 0 ? (
          filteredFaculty.map((faculty) => (
            <Card key={faculty.id} className="overflow-hidden">
              <div className="aspect-square w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={faculty.imageUrl}
                  alt={faculty.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{faculty.name}</CardTitle>
                <CardDescription>
                  {faculty.position} • {faculty.department}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Email:</span> {faculty.email}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {faculty.phone}
                  </p>
                  <p className="line-clamp-3">{faculty.bio}</p>
                </div>
              </CardContent>
              <CardFooter className="justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditDialog(faculty)}
                >
                  <Edit size={16} className="mr-2" />
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => openDeleteDialog(faculty)}
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No faculty members found.{" "}
            {searchTerm
              ? "Try a different search term."
              : "Add your first faculty member."}
          </div>
        )}
      </div>

      {/* Add Faculty Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Faculty Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Dr. Jane Smith"
                />
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium mb-1"
                >
                  Position
                </label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="Principal"
                />
              </div>
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium mb-1"
                >
                  Department
                </label>
                <Input
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="Administration"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jane.smith@school.edu"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone
                </label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="bio" className="block text-sm font-medium mb-1">
                  Biography
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Enter faculty member's biography..."
                  rows={4}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                    {formData.imageUrl ? (
                      <img
                        src={formData.imageUrl}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImageUpload}
                  >
                    <Upload size={16} className="mr-2" />
                    Generate Avatar
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleAddFaculty}>Add Faculty</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Faculty Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Faculty Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label
                  htmlFor="edit-name"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="edit-position"
                  className="block text-sm font-medium mb-1"
                >
                  Position
                </label>
                <Input
                  id="edit-position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="edit-department"
                  className="block text-sm font-medium mb-1"
                >
                  Department
                </label>
                <Input
                  id="edit-department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="edit-email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="edit-phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone
                </label>
                <Input
                  id="edit-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="edit-bio"
                  className="block text-sm font-medium mb-1"
                >
                  Biography
                </label>
                <Textarea
                  id="edit-bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                    {formData.imageUrl ? (
                      <img
                        src={formData.imageUrl}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">No image</span>
                    )}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImageUpload}
                  >
                    <Upload size={16} className="mr-2" />
                    Change Avatar
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditFaculty}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete {currentFaculty?.name}? This
              action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteFaculty}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FacultyEditor;
