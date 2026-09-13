export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-gray-200 bg-white"
    >
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-16 md:px-16 lg:grid-cols-4 lg:px-24 xl:px-32">
        
        {/* Brand */}
        <div className="lg:col-span-2">
          <a
            href="#home"
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#007BFF]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
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

            <span className="text-lg font-semibold text-[#212529]">
              TripPilot
            </span>
          </a>

          <p className="mt-4 max-w-md text-sm leading-6 text-[#6C757D]">
            An AI travel planning agent that researches stays,
            understands your budget and builds practical itineraries.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#212529]">
            Product
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              href="#features"
              className="text-[#6C757D] transition-colors hover:text-[#007BFF]"
            >
              Features
            </a>

            <a
              href="#how-it-works"
              className="text-[#6C757D] transition-colors hover:text-[#007BFF]"
            >
              How it works
            </a>

            <a
              href="#signup"
              className="text-[#6C757D] transition-colors hover:text-[#007BFF]"
            >
              Start planning
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#212529]">
            Contact
          </h3>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              href="mailto:your-email@example.com"
              className="text-[#6C757D] transition-colors hover:text-[#007BFF]"
            >
              your-email@example.com
            </a>

            <a
              href="tel:+910000000000"
              className="text-[#6C757D] transition-colors hover:text-[#007BFF]"
            >
              +91 00000 00000
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6C757D] transition-colors hover:text-[#007BFF]"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 bg-[#F8F8F8]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-6 py-5 text-xs text-[#6C757D] sm:flex-row sm:items-center sm:justify-between md:px-16 lg:px-24 xl:px-32">
          <p>
            © {new Date().getFullYear()} TripPilot. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a
              href="#"
              className="hover:text-[#212529]"
            >
              Privacy
            </a>

            <a
              href="#"
              className="hover:text-[#212529]"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}