import React, { useState } from "react";
import SectionTabs from "./SectionTabs";
import LandingPageEditor from "./Editors/LandingPageEditor";
import AnnouncementsEditor from "./Editors/AnnouncementsEditor";
import FacultyEditor from "./Editors/FacultyEditor";
import ContactEditor from "./Editors/ContactEditor";
import GlobalCustomizationEditor from "./Editors/GlobalCustomizationEditor";

interface MainContentProps {
  initialTab?: string;
}

const MainContent: React.FC<MainContentProps> = ({
  initialTab = "landing-page",
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-hidden">
      <SectionTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex-1 overflow-auto">
        {activeTab === "landing-page" && <LandingPageEditor />}
        {activeTab === "announcements" && <AnnouncementsEditor />}
        {activeTab === "faculty" && <FacultyEditor />}
        {activeTab === "contact" && <ContactEditor />}
        {activeTab === "customization" && <GlobalCustomizationEditor />}
      </div>
    </div>
  );
};

export default MainContent;
