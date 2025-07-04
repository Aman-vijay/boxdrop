import { Button } from "@heroui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Card, CardBody } from "@heroui/card";
import {
  CloudUpload,
  Shield,
  Folder,
  Image as ImageIcon,
  ArrowRight,
  Zap,
  Users,
  Globe,
  CheckCircle,
  Star,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-default-50 via-default-100 to-primary-50">
      {/* Use the unified Navbar component */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-success/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          </div>
          
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-8 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-primary font-medium text-sm">
                  <Sparkles className="h-4 w-4" />
                  <span>Trusted by 10,000+ users</span>
                </div>

                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-default-900 leading-tight">
                    Store your{" "}
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      images
                    </span>{" "}
                    with ease
                  </h1>
                  <p className="text-xl md:text-2xl text-default-600 mb-8 max-w-2xl">
                    The modern cloud storage solution that's{" "}
                    <span className="font-semibold text-primary">simple</span>,{" "}
                    <span className="font-semibold text-success">secure</span>, and{" "}
                    <span className="font-semibold text-warning">lightning fast</span>.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                  <SignedOut>
                    <Link href="/sign-up">
                      <Button 
                        size="lg" 
                        variant="solid" 
                        color="primary"
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
                        className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
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
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        endContent={<ArrowRight className="h-5 w-5" />}
                      >
                        Go to Dashboard
                      </Button>
                    </Link>
                  </SignedIn>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-4 pt-8 justify-center lg:justify-start">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <span className="text-default-600 font-medium">4.9/5 from 2,000+ reviews</span>
                </div>
              </div>

              <div className="flex justify-center order-first lg:order-last">
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                  {/* Floating cards */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg rotate-12 animate-bounce"></div>
                    <div className="absolute top-10 right-0 w-16 h-16 bg-gradient-to-br from-success to-warning rounded-2xl shadow-lg -rotate-12 animate-bounce delay-300"></div>
                    <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-2xl shadow-lg rotate-6 animate-bounce delay-700"></div>
                    <div className="absolute bottom-0 right-10 w-18 h-18 bg-gradient-to-br from-warning to-success rounded-2xl shadow-lg -rotate-6 animate-bounce delay-1000"></div>
                  </div>
                  
                  {/* Central icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30 animate-pulse"></div>
                      <div className="relative bg-gradient-to-r from-primary to-secondary p-8 rounded-full shadow-2xl">
                        <ImageIcon className="h-16 md:h-20 w-16 md:w-20 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 md:py-20 px-4 md:px-6 bg-default-50/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-primary font-medium text-sm mb-4">
                <Zap className="h-4 w-4" />
                <span>Powerful Features</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-default-900">
                Everything you need to manage your images
              </h2>
              <p className="text-xl text-default-600 max-w-2xl mx-auto">
                Built for teams and individuals who demand the best in cloud storage
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border border-default-200/50 bg-default-50/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                <CardBody className="p-8 text-center">
                  <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <CloudUpload className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-default-900">
                    Lightning Fast Uploads
                  </h3>
                  <p className="text-default-600 mb-4">
                    Drag, drop, and upload multiple files in seconds with our optimized transfer technology.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-success font-medium">
                    <CheckCircle className="h-4 w-4" />
                    <span>Up to 10GB per file</span>
                  </div>
                </CardBody>
              </Card>

              <Card className="border border-default-200/50 bg-default-50/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                <CardBody className="p-8 text-center">
                  <div className="bg-gradient-to-r from-success to-warning p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <Folder className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-default-900">
                    Smart Organization
                  </h3>
                  <p className="text-default-600 mb-4">
                    AI-powered tagging and smart folders that automatically organize your content.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-success font-medium">
                    <CheckCircle className="h-4 w-4" />
                    <span>Auto-categorization</span>
                  </div>
                </CardBody>
              </Card>

              <Card className="border border-default-200/50 bg-default-50/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group md:col-span-2 lg:col-span-1">
                <CardBody className="p-8 text-center">
                  <div className="bg-gradient-to-r from-warning to-danger p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:rotate-6 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-default-900">
                    Bank-Grade Security
                  </h3>
                  <p className="text-default-600 mb-4">
                    End-to-end encryption ensures your images are private and secure, always.
                  </p>
                  <div className="flex items-center justify-center gap-2 text-success font-medium">
                    <CheckCircle className="h-4 w-4" />
                    <span>256-bit encryption</span>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="py-16 md:py-20 px-4 md:px-6 bg-gradient-to-r from-primary to-secondary">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-bold">10,000+</h3>
                <p className="text-primary-100">Happy Users</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-bold">50M+</h3>
                <p className="text-primary-100">Images Stored</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Zap className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-bold">99.9%</h3>
                <p className="text-primary-100">Uptime</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-default-50 to-primary-50 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-default-900">
                Ready to transform your image storage?
              </h2>
              <p className="text-xl text-default-600 mb-12 max-w-2xl mx-auto">
                Join thousands of users who have already made the switch to BoxDrop. 
                Start your free trial today - no credit card required.
              </p>
              
              <SignedOut>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                  <Link href="/sign-up">
                    <Button
                      size="lg"
                      variant="solid"
                      color="primary"
                      className="bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white px-10 py-6 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
                      className="border-2 border-primary/30 hover:border-primary hover:bg-primary/10 px-10 py-6 text-xl font-semibold backdrop-blur-sm transition-all duration-300"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-default-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </SignedOut>
              
              <SignedIn>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="solid"
                    color="primary"
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary-600 hover:to-secondary-600 text-white px-10 py-6 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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

      {/* Enhanced footer */}
      <footer className="bg-default-900 text-default-100 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl">
                  <CloudUpload className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold">BoxDrop</h2>
              </div>
              <p className="text-default-400 max-w-md">
                The modern cloud storage solution that's simple, secure, and lightning fast. 
                Trusted by thousands of users worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-default-400">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-default-400">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-default-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-default-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} BoxDrop. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-default-400 text-sm">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}