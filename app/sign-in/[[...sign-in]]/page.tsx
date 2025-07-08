import SignInForm from "@/components/SignInForm";
import Navbar from "@/components/Navbar";
import { CloudUpload } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      {/* Use the unified Navbar component */}
      <Navbar />

      <main className="flex-1 flex justify-center items-center p-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        <SignInForm />
      </main>

      {/* Dark mode footer */}
      
      <footer className=" border-t border-default-200 py-6 bg-gray-900 text-white ">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CloudUpload className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">BoxDrop</h2>
            </div>
            <p className="text-default-500 text-sm">
              &copy; {new Date().getFullYear()} BoxDrop
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}