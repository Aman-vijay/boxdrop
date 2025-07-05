import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import {
  CloudUpload,
  Image as ImageIcon,
  ArrowRight,
  Zap,
  Shield,
  Upload,
  Sparkles,

  Gauge,

} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-500" />
          </div>

          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 rounded-full px-4 py-2 text-indigo-300 font-medium text-sm backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  Simple. Secure. Fast.
                </div>

                {/* Main Heading */}
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    Store & manage your{" "}
                    <span className="bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                      images
                    </span>{" "}
                    effortlessly
                  </h1>
                  <p className="text-xl lg:text-2xl text-gray-400 max-w-2xl leading-relaxed">
                    Your personal cloud storage solution that makes organizing and accessing your images a breeze.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0"
                        endContent={<ArrowRight className="h-5 w-5" />}
                      >
                        Get Started Free
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button
                        size="lg"
                        variant="bordered"
                        className="border-2 border-gray-600 hover:border-indigo-400 hover:bg-indigo-400/10 text-gray-300 hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0"
                        endContent={<ArrowRight className="h-5 w-5" />}
                      >
                        Open Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>
              </div>

              {/* Visual Element */}
              <div className="flex justify-center order-first lg:order-last">
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  {/* Floating Cards */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl shadow-2xl rotate-12 animate-bounce opacity-90" />
                    <div className="absolute top-10 right-0 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-2xl -rotate-12 animate-bounce delay-300 opacity-80" />
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl shadow-2xl rotate-6 animate-bounce delay-700 opacity-75" />
                    <div className="absolute bottom-0 right-10 w-18 h-18 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-2xl -rotate-6 animate-bounce delay-1000 opacity-85" />
                  </div>
                  
                  {/* Central Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full blur-2xl opacity-40 animate-pulse" />
                      <div className="relative bg-gradient-to-r from-indigo-500 to-pink-500 p-8 rounded-full shadow-2xl backdrop-blur-sm">
                        <ImageIcon className="h-20 w-20 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-24 px-4 md:px-6 bg-gray-900/50 border-t border-gray-800/50 backdrop-blur-sm">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 border border-indigo-500/20 rounded-full px-4 py-2 text-indigo-300 font-medium text-sm mb-6 backdrop-blur-sm">
                <Zap className="h-4 w-4" />
                <span>Core Features</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Everything you need in one place
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Built with simplicity and security in mind, perfect for managing your personal image collection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 backdrop-blur-sm">
                <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Easy Upload</h3>
                <p className="text-gray-400 leading-relaxed">
                  Drag and drop your images or click to browse. Upload multiple files at once with progress tracking.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/10 backdrop-blur-sm">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Secure Storage</h3>
                <p className="text-gray-400 leading-relaxed">
                  Your images are encrypted and stored securely with multiple backup layers for peace of mind.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="group p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 backdrop-blur-sm">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Gauge className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Lightning Fast</h3>
                <p className="text-gray-400 leading-relaxed">
                  Optimized performance ensures your images load quickly and your uploads complete in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 border-t border-gray-800/50 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto max-w-4xl text-center">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Ready to organize your{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                  images?
                </span>
              </h2>
              <p className="text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto">
                Join thousands who trust BoxDrop with their precious memories.
              </p>

              <div className="pt-8">
                <SignedOut>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/sign-up">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-10 py-6 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0"
                        endContent={<ArrowRight className="h-5 w-5" />}
                      >
                        Start Free Today
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button
                        size="lg"
                        variant="bordered"
                        className="border-2 border-gray-600 hover:border-indigo-400 hover:bg-indigo-400/10 text-gray-300 hover:text-white px-10 py-6 text-xl font-semibold transition-all duration-300 backdrop-blur-sm"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </SignedOut>

                <SignedIn>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-10 py-6 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0"
                      endContent={<ArrowRight className="h-5 w-5" />}
                    >
                      Open Dashboard
                    </Button>
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950/80 text-gray-400 py-12 border-t border-gray-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-2 rounded-xl">
              <CloudUpload className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">BoxDrop</h2>
          </div>

          <div className="border-t border-gray-800/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} BoxDrop. Built with ❤️ for your memories.
            </p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <span className="text-sm text-gray-500">Made for personal use</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}