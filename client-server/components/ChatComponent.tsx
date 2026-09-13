"use client"

import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "./ui/sidebar";


export default function ChatComponent() {

  return (
    <main className="font-mono-github flex h-screen flex-col bg-white text-[#212529]">

      {/* ================= HEADER ================= */}

      <header className="flex items-center gap-4 border-b border-gray-200 px-6 py-4">

        <SidebarTrigger
          className="
            text-[#6C757D]
            hover:bg-[#f1f3f5]
            hover:text-[#212529]
          "
        />

        <div>
          <h1 className="text-lg font-semibold tracking-tight text-[#212529]">
            TripPilot
          </h1>

          <p className="font-mono text-xs text-[#6C757D]">
            Start Your Journey without worrying about the Plan 
          </p>
        </div>

      </header>


      {/* ================= MESSAGES ================= */}

      <section className="flex-1 space-y-6 overflow-y-auto px-6 py-8">

        {/* User Message */}

        <div className="flex justify-end">

          <div
            className="
              max-w-xl
              rounded-lg
              border border-[#007BFF]
              bg-[#007BFF]
              px-4
              py-3
              text-sm
              leading-relaxed
              text-white
            "
          >
            {/* User question renders here */}
          </div>

        </div>


        {/* AI Message */}

        <div className="flex justify-start">

          <div
            className="
              max-w-xl
              rounded-lg
              border border-gray-200
              bg-[#f8f9fa]
              px-4
              py-3
              text-sm
              leading-relaxed
              text-[#212529]
            "
          >
            {/* Agent response renders here */}
          </div>

        </div>

      </section>


      {/* ================= INPUT ================= */}

      <footer className="border-t border-gray-200 bg-white p-4">

        <div className="mx-auto flex max-w-4xl gap-3">

          <Input
            placeholder="Ask Jarvis anything..."
            className="
            w-full
            h-11
              border-gray-200
              bg-white
              text-[#212529]
              placeholder:text-[#6C757D]

              focus-visible:border-[#007BFF]
              focus-visible:ring-[#007BFF]/20

              shadow-none
            "
          />

          <button
            className="
              h-11
              bg-[#007BFF]
              px-5
              text-white
              font-semibold

              hover:bg-[#0069d9]
              rounded-sm
              shadow-none
              transition-all
              duration-200
            "
          >
            Send
          </button>

        </div>

      </footer>

    </main>
  );
}