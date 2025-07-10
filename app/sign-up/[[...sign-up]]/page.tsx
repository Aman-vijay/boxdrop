import SignUpForm from "@/components/SignUpForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <Navbar />

      <main className="flex-1 flex justify-center items-center p-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <SignUpForm />
      </main>

      {/* Footer */}
       
      <Footer/>
    </div>
  );
}