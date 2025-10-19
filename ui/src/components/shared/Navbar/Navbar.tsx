"use client";


import Link from "next/link";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isUser, setIsUser] = useState(false);

  // Fetch current user info on mount
  useEffect(() => {
    const UserData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // send cookies
        });

        const data = await res.json();
        setIsUser(data?.data || false);
      } catch (error) {
        setIsUser(false);
        console.error("Fetching user failed:", error);
      }
    };

    UserData();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/log-out`, {
        method: "POST",
        credentials: "include", // send cookies
      });

      if (res.ok) {
        setIsUser(false); // update UI state
      } else {
        console.error("Logout failed:", await res.text());
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-6 inset-x-4 h-16 max-w-screen-xl mx-auto rounded-full bg-background border dark:border-slate-700/70 z-30">
      <div className="flex h-full items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Logo />

        </Link>

        <NavMenu className="hidden md:block" isUser={isUser} />


        {/* Actions and Mobile Menu */}
        <div className="flex items-center gap-4 md:gap-6">
          {isUser ? (
            <button onClick={handleLogout} className="btn p-2 border rounded cursor-pointer ">
              Log out
            </button>
          ) : (
            <Link href="/account/login" className="block w-full text-center btn p-2 border rounded cursor-pointer ">
              Login
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet  isUser={isUser}/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
