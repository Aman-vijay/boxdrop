"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Tabs, Tab } from "@heroui/tabs";
import { FileUp, FileText, User } from "lucide-react";
import FileUploadForm from "./FileUploadForm";
import FileList from "./FileList";
import UserProfile from "./UserProfile";
import { useSearchParams } from "next/navigation";

interface DashboardContentProps {
  userId: string;
  userName: string;
}

export default function DashboardContent({
  userId,
  userName,
}: DashboardContentProps) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<string>("files");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  // Set the active tab based on URL parameter
  useEffect(() => {
    if (tabParam === "profile") {
      setActiveTab("profile");
    } else {
      setActiveTab("files");
    }
  }, [tabParam]);

  const handleFileUploadSuccess = useCallback(() => {
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  const handleFolderChange = useCallback((folderId: string | null) => {
    setCurrentFolder(folderId);
  }, []);

  return (
    <>
<div className="mb-10">
        <h2 className="text-4xl font-bold text-white leading-tight">
          Welcome,
          <span className="ml-2 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            {userName.length > 10 ? `${userName.slice(0, 10)}...` : userName.split(" ")[0]}
          </span>
          !
        </h2>
        <p className="text-gray-400 mt-2 text-lg">
          Your personal cloud dashboard is ready.
        </p>
      </div>
      <Tabs
        aria-label="Dashboard Tabs"
        color="primary"
        variant="underlined"
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        classNames={{
          tabList: "gap-6 border-b border-gray-700/50",
          tab: "py-3 text-white hover:text-indigo-400 transition-colors",
          cursor: "bg-indigo-500",
        }}
      >
        <Tab
          key="files"
          title={
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>My Files</span>
            </div>
          }
        >
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
             <Card className="border border-gray-700 bg-gray-900/50 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex gap-3">
                <FileUp className="h-5 w-5 text-indigo-400" />
                <h3 className="text-xl font-semibold text-white">Upload Files</h3>
              </CardHeader>
              <CardBody>
                <FileUploadForm
                  userId={userId}
                  onUploadSuccess={handleFileUploadSuccess}
                  currentFolder={currentFolder}
                />
              </CardBody>
            </Card>
       

          
               <Card className="lg:col-span-2 border border-gray-700 bg-gray-900/50 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex gap-3">
                <FileText className="h-5 w-5 text-indigo-400" />
                <h3 className="text-xl font-semibold text-white">Your Files</h3>
              </CardHeader>
              <CardBody>
                <FileList
                  userId={userId}
                  refreshTrigger={refreshTrigger}
                  onFolderChange={handleFolderChange}
                />
              </CardBody>
            </Card>
            </div>
       
        </Tab>

        <Tab
          key="profile"
          title={
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </div>
          }
        >
          <div className="mt-8">
            <UserProfile />
          </div>
        </Tab>
      </Tabs>
    </>
  );
}