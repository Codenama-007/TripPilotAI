export default function HeroSection() {
  return (
    <section id="home" className="bg-white">
      <div className="mx-auto grid min-h-[calc(100dvh-73px)] max-w-[1280px] items-center gap-16 px-6 py-20 md:px-16 lg:grid-cols-2 lg:px-24 xl:px-32">
        
        {/* Left */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 border border-gray-200 bg-[#F8F8F8] px-3 py-1.5 text-xs font-medium text-[#6C757D]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#28A745]" />
            AI-powered travel planning
          </div>

          <h1 className="max-w-3xl text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-[#212529]">
            Plan your trip around
            <span className="text-[#007BFF]"> your budget.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#6C757D] md:text-lg">
            Tell our AI where you want to go, how much you want to spend,
            and what you want to experience. It finds suitable stays,
            builds your itinerary, and keeps the entire trip within budget.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#signup"
              className="rounded-sm bg-[#007BFF] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0069d9] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
            >
              Plan my trip
            </a>

            <a
              href="#how-it-works"
              className="rounded-sm border border-gray-300 bg-white px-7 py-3 text-sm font-semibold text-[#212529] transition-all duration-200 hover:bg-[#F8F8F8]"
            >
              See how it works
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 text-xs text-[#6C757D]">
            <span>Budget-aware</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span>Hotel search</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span>AI itinerary</span>
          </div>
        </div>

        {/* Right — Product Preview */}
        <div className="relative">
          <div className="border border-gray-200 bg-[#F8F8F8] p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            {/* Browser header */}
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-gray-300" />
                <span className="h-2 w-2 rounded-full bg-gray-300" />
                <span className="h-2 w-2 rounded-full bg-gray-300" />
              </div>

              <span className="font-mono text-[10px] text-[#6C757D]">
                trip-planner.ai
              </span>
            </div>

            {/* AI Planner */}
            <div className="bg-white p-6">
              <div className="mb-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#6C757D]">
                  Trip request
                </p>

                <h3 className="mt-2 text-xl font-semibold text-[#212529]">
                  Mumbai → Dubai
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-gray-200 p-4">
                  <p className="text-xs text-[#6C757D]">Budget</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-[#212529]">
                    ₹60,000
                  </p>
                </div>

                <div className="border border-gray-200 p-4">
                  <p className="text-xs text-[#6C757D]">Duration</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-[#212529]">
                    5 days
                  </p>
                </div>
              </div>

              <div className="mt-3 border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#212529]">
                    Hotel
                  </span>

                  <span className="font-mono text-xs text-[#28A745]">
                    Within budget
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-[#6C757D]">
                  4-star hotel near Downtown Dubai
                </p>
              </div>

              <div className="mt-3 border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#212529]">
                    Estimated trip cost
                  </span>

                  <span className="font-mono text-sm font-semibold text-[#007BFF]">
                    ₹57,850
                  </span>
                </div>

                <div className="mt-3 h-1.5 w-full bg-[#F8F8F8]">
                  <div className="h-full w-[80%] bg-[#007BFF]" />
                </div>
              </div>

              <button className="mt-4 w-full rounded-sm bg-[#212529] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#343a40]">
                Generate itinerary
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}