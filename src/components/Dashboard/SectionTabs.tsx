import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, FileText, Users, Phone, Palette } from "lucide-react";

interface SectionTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SectionTabs: React.FC<SectionTabsProps> = ({
  activeTab = "landing-page",
  onTabChange = () => {},
}) => {
  const tabs = [
    {
      id: "landing-page",
      label: "Landing Page",
      icon: <LayoutGrid className="w-4 h-4 mr-2" />,
    },
    {
      id: "announcements",
      label: "Announcements",
      icon: <FileText className="w-4 h-4 mr-2" />,
    },
    {
      id: "faculty",
      label: "Faculty Info",
      icon: <Users className="w-4 h-4 mr-2" />,
    },
    {
      id: "contact",
      label: "Contact Details",
      icon: <Phone className="w-4 h-4 mr-2" />,
    },
    {
      id: "customization",
      label: "Global Customization",
      icon: <Palette className="w-4 h-4 mr-2" />,
    },
  ];

  const handleTabChange = (value: string) => {
    onTabChange(value);
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-2">
      <Tabs
        defaultValue={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full flex justify-start overflow-x-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center px-4 py-2 text-sm font-medium transition-colors"
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default SectionTabs;
