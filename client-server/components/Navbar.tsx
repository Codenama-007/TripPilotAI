"use client";

import { useState } from "react";
import { Show, SignUpButton} from "@clerk/nextjs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4 md:px-16 lg:px-24 xl:px-32">

        {/* Logo */}
        <a
          href="#home"
          onClick={closeMenu}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#007BFF]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3L4 7.5L12 12L20 7.5L12 3Z"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M4 12L12 16.5L20 12"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M4 16.5L12 21L20 16.5"
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="text-lg font-semibold tracking-tight text-[#212529]">
            TripPilot
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 text-sm font-medium text-[#6C757D] sm:flex">
          <a
            href="#home"
            className="transition-colors duration-200 hover:text-[#007BFF]"
          >
            Home
          </a>

          <a
            href="#features"
            className="transition-colors duration-200 hover:text-[#007BFF]"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="transition-colors duration-200 hover:text-[#007BFF]"
          >
            How it works
          </a>

          <a
            href="#contact"
            className="transition-colors duration-200 hover:text-[#007BFF]"
          >
            Contact
          </a>

          <Show when="signed-out">
            <SignUpButton mode="redirect" forceRedirectUrl="/main">
              <button className="rounded-sm bg-[#007BFF] px-6 py-2.5 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0069d9] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                Sign up
              </button>
            </SignUpButton>
          </Show>
          

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-gray-200 sm:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            {menuOpen ? (
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="#212529"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7H20M4 12H20M4 17H20"
                stroke="#212529"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-6 py-5 sm:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-1 text-sm">
            <a
              href="#home"
              onClick={closeMenu}
              className="border-b border-gray-100 py-3 text-[#212529]"
            >
              Home
            </a>

            <a
              href="#features"
              onClick={closeMenu}
              className="border-b border-gray-100 py-3 text-[#212529]"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              onClick={closeMenu}
              className="border-b border-gray-100 py-3 text-[#212529]"
            >
              How it works
            </a>

            <a
              href="#contact"
              onClick={closeMenu}
              className="border-b border-gray-100 py-3 text-[#212529]"
            >
              Contact
            </a>

            <SignUpButton mode="redirect" forceRedirectUrl="/main">
              <button>Sign Up</button>
            </SignUpButton>
          </div>
        </div>
      )}
    </nav>
  );
}