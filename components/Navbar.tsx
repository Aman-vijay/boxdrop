"use client";

import { useClerk, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { CloudUpload, ChevronDown, User, Menu, X, LogOut, Settings, Home } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { useState, useEffect, useRef } from "react";
import { useGlobalUser } from "../app/context/UserContext";



export default function Navbar() {
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { user } = useGlobalUser();


  // Check if we're on the dashboard page
  const isOnDashboard =
    pathname === "/dashboard" || pathname?.startsWith("/dashboard/");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle clicks outside the mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        // Check if the click is not on the menu button (which has its own handler)
        const target = event.target as HTMLElement;
        if (!target.closest('[data-menu-button="true"]')) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = () => {
    signOut(() => {
      router.push("/");
    });
  };

  // Process user data with defaults if not provided
  const userDetails = {
    fullName: user
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : "",
    initials: user
      ? `${user.firstName || ""} ${user.lastName || ""}`
          .trim()
          .split(" ")
          .map((name) => name?.[0] || "")
          .join("")
          .toUpperCase() || "U"
      : "U",
    displayName: user
      ? user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.firstName || user.username || user.emailAddress || "User"
      : "User",
    email: user?.emailAddress || "",
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 backdrop-blur-lg border-b border-gray-800/50 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg shadow-gray-900/20" : ""
      }`}
    >
      <div className="container mx-auto py-4 px-4 md:px-6 max-w-7xl">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-10 group">
            <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <CloudUpload className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">BoxDrop</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3 items-center">
            {/* Show these buttons when user is signed out */}
            <SignedOut>
              <Link href="/sign-in">
                <Button 
                  variant="bordered" 
                  className="border-2 border-gray-600 hover:border-indigo-400 hover:bg-indigo-400/10 text-gray-300 hover:text-white transition-all duration-300 font-medium"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button 
                  className="bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0"
                >
                  Sign Up
                </Button>
              </Link>
            </SignedOut>

            {/* Show these when user is signed in */}
            <SignedIn>
              <div className="flex items-center gap-4">
                {!isOnDashboard && (
                  <Link href="/dashboard">
                    <Button 
                      variant="bordered" 
                      className="border-2 border-gray-600 hover:border-indigo-400 hover:bg-indigo-400/10 text-gray-300 hover:text-white transition-all duration-300 font-medium"
                      startContent={<Home className="h-4 w-4" />}
                    >
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Dropdown
                  classNames={{
                    content: "bg-gray-900/95 backdrop-blur-lg border border-gray-700/50 shadow-xl",
                  }}
                >
                  <DropdownTrigger>
                    <Button
                      variant="flat"
                      className="p-0 bg-gray-800/50 hover:bg-gray-700/50 min-w-0 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300"
                      endContent={<ChevronDown className="h-4 w-4 ml-2 text-gray-400" />}
                    >
                      <div className="flex items-center gap-3 px-3 py-2">
                        <Avatar
                          name={userDetails.initials}
                          size="sm"
                          src={user?.imageUrl || undefined}
                          className="h-8 w-8 flex-shrink-0 ring-2 ring-gray-600/50"
                          fallback={
                            <div className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full w-full flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          }
                        />
                        <span className="text-gray-300 font-medium hidden sm:inline">
                          {userDetails.displayName}
                        </span>
                      </div>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu 
                    aria-label="User actions"
                    classNames={{
                      list: "p-2",
                    }}
                  >
                    <DropdownItem
                      key="profile"
                      description={userDetails.email || "View your profile"}
                      onClick={() => router.push("/dashboard?tab=profile")}
                      startContent={<Settings className="h-4 w-4" />}
                      className="text-gray-300 hover:bg-gray-800/50 rounded-lg data-[hover=true]:bg-gray-800/50"
                    >
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      key="files"
                      description="Manage your files"
                      onClick={() => router.push("/dashboard")}
                      startContent={<Home className="h-4 w-4" />}
                      className="text-gray-300 hover:bg-gray-800/50 rounded-lg data-[hover=true]:bg-gray-800/50"
                    >
                      My Files
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      description="Sign out of your account"
                      className="text-red-400 hover:bg-red-500/10 rounded-lg data-[hover=true]:bg-red-500/10"
                      startContent={<LogOut className="h-4 w-4" />}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <SignedIn>
              <Avatar
                name={userDetails.initials}
                size="sm"
                src={user?.imageUrl || undefined}
                className="h-8 w-8 flex-shrink-0 ring-2 ring-gray-600/50"
                fallback={
                  <div className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full w-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                }
              />
            </SignedIn>
            <button
              className="z-50 p-2 hover:bg-gray-800/50 rounded-lg transition-colors duration-300"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              data-menu-button="true"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
          )}

          {/* Mobile Menu */}
          <div
            ref={mobileMenuRef}
            className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-gray-900/95 backdrop-blur-xl border-l border-gray-800/50 z-40 flex flex-col pt-20 px-6 shadow-2xl transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden`}
          >
            <SignedOut>
              <div className="flex flex-col gap-4 items-center">
                <Link
                  href="/sign-in"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button 
                    variant="bordered" 
                    className="w-full border-2 border-gray-600 hover:border-indigo-400 hover:bg-indigo-400/10 text-gray-300 hover:text-white transition-all duration-300 font-medium"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link
                  href="/sign-up"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex flex-col gap-6">
                {/* User info */}
                <div className="flex items-center gap-4 py-6 border-b border-gray-800/50">
                  <Avatar
                    name={userDetails.initials}
                    size="md"
                    src={user?.imageUrl || undefined}
                    className="h-12 w-12 flex-shrink-0 ring-2 ring-gray-600/50"
                    fallback={
                      <div className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full w-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                    }
                  />
                  <div>
                    <p className="font-semibold text-white">{userDetails.displayName}</p>
                    <p className="text-sm text-gray-400">
                      {userDetails.email}
                    </p>
                  </div>
                </div>

                {/* Navigation links */}
                <div className="flex flex-col gap-2">
                  {!isOnDashboard && (
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 py-3 px-4 hover:bg-gray-800/50 rounded-lg transition-colors duration-300 text-gray-300 hover:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Home className="h-5 w-5" />
                      Dashboard
                    </Link>
                  )}
                  <Link
                    href="/dashboard?tab=profile"
                    className="flex items-center gap-3 py-3 px-4 hover:bg-gray-800/50 rounded-lg transition-colors duration-300 text-gray-300 hover:text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    Profile
                  </Link>
                  <button
                    className="flex items-center gap-3 py-3 px-4 text-left text-red-400 hover:bg-red-500/10 rounded-lg transition-colors duration-300 mt-4"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOut();
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </div>
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}