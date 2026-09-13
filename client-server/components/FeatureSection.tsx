export default function FeaturesSection() {
  return (
    <section id="features" className="bg-[#F8F8F8]">
      
      {/* Section Header */}
      <div className="mx-auto max-w-[1280px] px-6 pb-8 pt-24 md:px-16 lg:px-24 xl:px-32">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-wider text-[#007BFF]">
            What the agent does
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#212529] md:text-4xl">
            From your budget to a complete trip.
          </h2>

          <p className="mt-4 leading-7 text-[#6C757D]">
            The agent handles the research and planning so you can focus
            on deciding where you actually want to go.
          </p>
        </div>
      </div>

      {/* Feature 1 */}
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-16 lg:px-24 xl:px-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          <div>
            <span className="font-mono text-sm text-[#007BFF]">
              01
            </span>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#212529] md:text-3xl">
              Find hotels that fit your trip.
            </h3>

            <p className="mt-5 max-w-xl leading-7 text-[#6C757D]">
              Give the agent your destination, travel dates, preferred
              location and budget. It searches available accommodation
              options and compares their prices against your requirements.
            </p>

            <div className="mt-6 space-y-3 text-sm text-[#212529]">
              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center bg-[#28A745] text-xs text-white">
                  ✓
                </span>
                Price comparison
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center bg-[#28A745] text-xs text-white">
                  ✓
                </span>
                Location-aware recommendations
              </div>

              <div className="flex items-center gap-3">
                <span className="flex h-5 w-5 items-center justify-center bg-[#28A745] text-xs text-white">
                  ✓
                </span>
                Options based on your preferences
              </div>
            </div>
          </div>

          <div className="border border-gray-200 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <p className="text-xs text-[#6C757D]">Recommended stay</p>
                <p className="mt-1 font-semibold text-[#212529]">
                  Downtown Dubai Hotel
                </p>
              </div>

              <span className="font-mono text-sm text-[#28A745]">
                ₹18,500
              </span>
            </div>

            <div className="space-y-4 pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-[#6C757D]">Rating</span>
                <span className="font-medium text-[#212529]">4.6 / 5</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#6C757D]">Distance</span>
                <span className="font-medium text-[#212529]">
                  1.2 km from center
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#6C757D]">Budget status</span>
                <span className="font-medium text-[#28A745]">
                  Good fit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 2 */}
      <div
        id="how-it-works"
        className="border-y border-gray-200 bg-white"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-16 lg:px-24 xl:px-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            
            <div className="order-2 lg:order-1 border border-gray-200 bg-[#F8F8F8] p-6">
              <div className="font-mono text-xs text-[#6C757D]">
                BUDGET ALLOCATION
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Accommodation</span>
                    <span className="font-mono">₹18,500</span>
                  </div>

                  <div className="h-2 bg-white">
                    <div className="h-full w-[32%] bg-[#007BFF]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Activities</span>
                    <span className="font-mono">₹14,000</span>
                  </div>

                  <div className="h-2 bg-white">
                    <div className="h-full w-[24%] bg-[#28A745]" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Food & transport</span>
                    <span className="font-mono">₹25,350</span>
                  </div>

                  <div className="h-2 bg-white">
                    <div className="h-full w-[44%] bg-[#FFC107]" />
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-5">
                <div className="flex justify-between">
                  <span className="font-medium">Total estimated</span>
                  <span className="font-mono font-semibold text-[#007BFF]">
                    ₹57,850
                  </span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="font-mono text-sm text-[#007BFF]">
                02
              </span>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#212529] md:text-3xl">
                Your budget becomes the constraint.
              </h3>

              <p className="mt-5 max-w-xl leading-7 text-[#6C757D]">
                Instead of recommending expensive options first, the agent
                treats your budget as a core planning constraint. It
                distributes spending across accommodation, activities,
                transport and food.
              </p>

              <p className="mt-4 max-w-xl leading-7 text-[#6C757D]">
                That means the itinerary isn't just interesting — it is
                financially realistic.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature 3 */}
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-16 lg:px-24 xl:px-32">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          <div>
            <span className="font-mono text-sm text-[#007BFF]">
              03
            </span>

            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-[#212529] md:text-3xl">
              Get a trip you can actually follow.
            </h3>

            <p className="mt-5 max-w-xl leading-7 text-[#6C757D]">
              Once the major costs are understood, the agent builds a
              day-by-day itinerary around your interests, available time
              and remaining budget.
            </p>

            <a
              href="#signup"
              className="mt-7 inline-flex rounded-sm bg-[#007BFF] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0069d9]"
            >
              Start planning
            </a>
          </div>

          <div className="border border-gray-200 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <p className="font-mono text-xs text-[#6C757D]">
                  DAY 03
                </p>
                <p className="mt-1 font-semibold text-[#212529]">
                  Explore Downtown
                </p>
              </div>

              <span className="font-mono text-xs text-[#6C757D]">
                ₹2,800
              </span>
            </div>

            <div className="space-y-5 pt-5">
              <div className="border-l-2 border-[#007BFF] pl-4">
                <p className="text-sm font-medium text-[#212529]">
                  09:00 — Breakfast
                </p>
                <p className="mt-1 text-xs text-[#6C757D]">
                  Local breakfast near your hotel
                </p>
              </div>

              <div className="border-l-2 border-[#007BFF] pl-4">
                <p className="text-sm font-medium text-[#212529]">
                  11:00 — Burj Khalifa
                </p>
                <p className="mt-1 text-xs text-[#6C757D]">
                  Pre-booked activity within your daily budget
                </p>
              </div>

              <div className="border-l-2 border-[#28A745] pl-4">
                <p className="text-sm font-medium text-[#212529]">
                  18:00 — Dubai Mall
                </p>
                <p className="mt-1 text-xs text-[#6C757D]">
                  Dinner and evening exploration
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signup CTA */}
      <div
        id="signup"
        className="border-t border-gray-200 bg-[#212529]"
      >
        <div className="mx-auto max-w-[1280px] px-6 py-20 text-center md:px-16 lg:px-24 xl:px-32">
          <p className="font-mono text-xs uppercase tracking-wider text-[#FFC107]">
            Start planning
          </p>

          <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white md:text-4xl">
            Your next trip starts with a budget.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-gray-400">
            Give the agent your destination, dates and budget. Let it
            handle the research.
          </p>

          <button className="mt-8 rounded-sm bg-[#007BFF] px-8 py-3 font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0069d9]">
            Create my trip
          </button>
        </div>
      </div>
    </section>
  );
}