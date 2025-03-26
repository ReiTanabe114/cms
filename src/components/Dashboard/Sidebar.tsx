import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Home,
  Layout,
  FileText,
  Users,
  Phone,
  Palette,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  activePage?: string;
  onNavigate?: (page: string) => void;
}

const Sidebar = ({
  activePage = "landing",
  onNavigate = () => {},
}: SidebarProps) => {
  const navigationItems = [
    { id: "landing", label: "Landing Page", icon: <Home size={20} /> },
    {
      id: "announcements",
      label: "Announcements",
      icon: <FileText size={20} />,
    },
    { id: "faculty", label: "Faculty Info", icon: <Users size={20} /> },
    { id: "contact", label: "Contact Details", icon: <Phone size={20} /> },
  ];

  const customizationItems = [
    {
      id: "global",
      label: "Global Customization",
      icon: <Palette size={20} />,
    },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const NavItem = ({
    item,
  }: {
    item: { id: string; label: string; icon: React.ReactNode };
  }) => {
    const isActive = activePage === item.id;
    return (
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-3 mb-1 text-left",
          isActive ? "bg-secondary" : "hover:bg-secondary/50",
        )}
        onClick={() => onNavigate(item.id)}
      >
        {item.icon}
        <span>{item.label}</span>
      </Button>
    );
  };

  return (
    <div className="w-[280px] h-full bg-background border-r p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Layout className="h-6 w-6" />
        <h2 className="text-xl font-semibold">School CMS</h2>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground mb-2 px-2">
          Website Sections
        </p>
        {navigationItems.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground mb-2 px-2">
          Customization
        </p>
        {customizationItems.map((item) => (
          <NavItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-auto space-y-1">
        <Button variant="ghost" className="w-full justify-start gap-3">
          <HelpCircle size={20} />
          <span>Help & Support</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-100/20"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
