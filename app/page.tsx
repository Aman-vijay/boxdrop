import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import {
  CloudUpload,
  Image as ImageIcon,
  ArrowRight,
  Zap,
  Star,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-green-600/10 rounded-full blur-3xl animate-pulse delay-500" />
          </div>

          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-600/20 rounded-full px-4 py-2 text-indigo-300 font-medium text-sm">
                  <Sparkles className="h-4 w-4" />
                  Drop your files
                </div>

                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                    Store your{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                      images
                    </span>{" "}
                    with ease
                  </h1>
                  <p className="text-xl text-gray-400 mb-8 max-w-2xl">
                    The modern cloud storage solution that’s{" "}
                    <span className="font-semibold text-indigo-400">simple</span>,{" "}
                    <span className="font-semibold text-green-400">secure</span>, and{" "}
                    <span className="font-semibold text-yellow-400">lightning fast</span>.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button
                        size="lg"
                        variant="solid"
                        color="primary"
                        className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-8 py-6 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                        endContent={<ArrowRight className="h-5 w-5" />}
                      >
                        Start Free Trial
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button
                        size="lg"
                        variant="bordered"
                        color="primary"
                        className="border border-indigo-600/40 hover:border-indigo-500 hover:bg-indigo-600/10 px-8 py-6 text-lg font-semibold transition-all duration-300"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        variant="solid"
                        color="primary"
                        className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-8 py-6 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                        endContent={<ArrowRight className="h-5 w-5" />}
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>

                <div className="flex items-center gap-4 pt-8 justify-center lg:justify-start">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Graphic */}
              <div className="flex justify-center order-first lg:order-last">
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-2xl shadow-md rotate-12 animate-bounce" />
                    <div className="absolute top-10 right-0 w-16 h-16 bg-gradient-to-br from-green-600 to-yellow-600 rounded-2xl shadow-md -rotate-12 animate-bounce delay-300" />
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-600 to-indigo-600 rounded-2xl shadow-md rotate-6 animate-bounce delay-700" />
                    <div className="absolute bottom-0 right-10 w-18 h-18 bg-gradient-to-br from-yellow-600 to-green-600 rounded-2xl shadow-md -rotate-6 animate-bounce delay-1000" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-full blur-xl opacity-30 animate-pulse" />
                      <div className="relative bg-gradient-to-r from-indigo-600 to-pink-600 p-8 rounded-full shadow-2xl">
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
        <section className="py-16 md:py-20 px-4 md:px-6 bg-gray-900/80 border-t border-gray-800">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-600/20 rounded-full px-4 py-2 text-indigo-300 font-medium text-sm mb-4">
                <Zap className="h-4 w-4" />
                <span>Powerful Features</span>
              </div>
              <h2 className="text-4xl font-bold mb-4">Everything you need to manage your images</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Built for teams and individuals who demand the best in cloud storage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              

            
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-950 border-t border-gray-800">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to transform your image storage?
              </h2>

              <SignedOut>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                  <Link href="/sign-in">
                    <Button
                      size="lg"
                      variant="bordered"
                      color="primary"
                      className="border border-indigo-600/40 hover:border-indigo-500 hover:bg-indigo-600/10 px-10 py-6 text-xl font-semibold transition-all duration-300"
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
                    variant="solid"
                    color="primary"
                    className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-10 py-6 text-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                    endContent={<ArrowRight className="h-5 w-5" />}
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-pink-600 p-2 rounded-xl">
              <CloudUpload className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold">BoxDrop</h2>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} BoxDrop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
