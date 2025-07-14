"use client";

import { useGlobalUser } from "../context/UserContext";
import DashboardContent from "@/components/DashboardContent";


export default function ClientDashboard() {
  const { user } = useGlobalUser();

  if (!user) return null; // Optional: You could show a spinner or redirect client-side

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <main className="flex-1 container mx-auto px-4 md:px-6 py-10">
        <DashboardContent
          userId={user.id}
          userName={user.firstName || user.username || user.emailAddress || ""}
        />
      </main>
    </div>
  );
}
