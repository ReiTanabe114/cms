import React, { useState } from "react";
import Header from "./Dashboard/Header";
import Sidebar from "./Dashboard/Sidebar";
import MainContent from "./Dashboard/MainContent";
import PreviewModal from "./Dashboard/PreviewModal";

interface HomeProps {
  initialTab?: string;
  websiteTitle?: string;
  userName?: string;
}

const Home: React.FC<HomeProps> = ({
  initialTab = "landing",
  websiteTitle = "School Website Builder",
  userName = "Admin User",
}) => {
  const [activePage, setActivePage] = useState(initialTab);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Map sidebar navigation to main content tabs
  const sidebarToTabMap: Record<string, string> = {
    landing: "landing-page",
    announcements: "announcements",
    faculty: "faculty",
    contact: "contact",
    global: "customization",
  };

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  const handleSave = () => {
    console.log("Saving website changes...");
    // Implementation would save current state to database
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handlePublish = () => {
    console.log("Publishing website...");
    // Implementation would publish the website
  };

  const handleApprovePreview = () => {
    console.log("Approving and publishing website...");
    setIsPreviewOpen(false);
    // Implementation would publish the website
  };

  const handleReturnFromPreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header
        websiteTitle={websiteTitle}
        userName={userName}
        onSave={handleSave}
        onPreview={handlePreview}
        onPublish={handlePublish}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePage={activePage} onNavigate={handleNavigate} />

        <MainContent
          initialTab={sidebarToTabMap[activePage] || "landing-page"}
        />
      </div>

      <PreviewModal
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
        onApprove={handleApprovePreview}
        onReturn={handleReturnFromPreview}
        websiteData={{
          title: websiteTitle,
          sections: [
            {
              type: "slideshow",
              content: {
                images: [
                  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
                  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
                  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
                ],
              },
            },
            {
              type: "text",
              content: {
                title: "Welcome to Our School",
                body: "We are committed to providing a supportive and enriching environment where students can achieve their full potential. Our dedicated faculty and staff work together to ensure that each student receives a quality education.",
              },
            },
            {
              type: "image",
              content: {
                src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=80",
                caption: "Our campus facilities",
              },
            },
          ],
        }}
      />
    </div>
  );
};

export default Home;
