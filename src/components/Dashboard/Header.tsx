import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Eye, Save, Upload, User, Settings, LogOut } from "lucide-react";

interface HeaderProps {
  websiteTitle?: string;
  onSave?: () => void;
  onPreview?: () => void;
  onPublish?: () => void;
  userName?: string;
}

const Header = ({
  websiteTitle = "School Website Builder",
  onSave = () => console.log("Save clicked"),
  onPreview = () => console.log("Preview clicked"),
  onPublish = () => console.log("Publish clicked"),
  userName = "Admin User",
}: HeaderProps) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">{websiteTitle}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={onSave}
        >
          <Save className="h-4 w-4" />
          <span>Save</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={onPreview}
        >
          <Eye className="h-4 w-4" />
          <span>Preview</span>
        </Button>

        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700"
          onClick={onPublish}
        >
          <Upload className="h-4 w-4" />
          <span>Publish</span>
        </Button>

        <div className="ml-4 border-l border-gray-200 pl-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-sm font-medium">{userName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
