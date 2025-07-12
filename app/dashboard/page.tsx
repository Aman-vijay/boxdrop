"use client";

import { useGlobalUser } from "../context/UserContext";
import DashboardContent from "@/components/DashboardContent";


export default function ClientDashboard() {
  const { user } = useGlobalUser();

  if (!user) return null; // Optional: You could show a spinner or redirect client-side

  return (
    <div className="min-h-screen flex flex-col bg-default-50">
     
      <main className="flex-1 container mx-auto py-8 px-6">
        <DashboardContent
          userId={user.id}
          userName={user.firstName || user.username || user.emailAddress || ""}
        />
      </main>
    
    </div>
  );
}
