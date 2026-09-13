"use client"

import { useState, useEffect } from "react"
import { UserButton, useUser, useClerk } from "@clerk/nextjs"
import {
  LogOut,
  Plus,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { listConversations, createConversation, Conversation } from "@/lib/api"

interface AppSidebarProps {
  activeThreadId: string | null;
  onSelectConversation: (threadId: string) => void;
}

export default function AppSidebar({ activeThreadId, onSelectConversation }: AppSidebarProps) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const loadConversations = async () => {
    if (!user) return;
    const data = await listConversations(user.id);
    setConversations(data);
  };

  useEffect(() => {
    loadConversations();
  }, [user]);

  const handleNewChat = async () => {
    if (!user) return;
    const conversation = await createConversation(user.id);
    setConversations((prev) => [conversation, ...prev]);
    onSelectConversation(conversation.thread_id);
  };

  return (
    <Sidebar className="border-gray-200 bg-white" collapsible='offcanvas'>

      {/* Header */}
      <SidebarHeader className="border-b border-gray-200">
        <div className="flex items-center gap-3 px-3 py-4">

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

          <span className="text-sm font-semibold text-[#212529]">
            TripPilot
          </span>

        </div>
      </SidebarHeader>


      {/* Middle */}
      <SidebarContent className="px-2 py-4 bg-white">

        <SidebarMenu>
          <SidebarMenuItem>

            <SidebarMenuButton
              className="
                h-10
                border border-gray-200
                bg-white
                text-[#212529]

                hover:bg-[#e7f1ff]
                hover:text-[#007BFF]

                transition-colors
              "
              onClick={handleNewChat}
            >
              <Plus className="h-4 w-4" />
              <span>New Chat</span>
            </SidebarMenuButton>

          </SidebarMenuItem>
        </SidebarMenu>

        {/* Conversation history */}
        <SidebarMenu className="mt-4">
          {conversations.map((c) => (
            <SidebarMenuItem key={c.thread_id}>
              <SidebarMenuButton
                onClick={() => onSelectConversation(c.thread_id)}
                className={`
                  h-9 truncate text-sm
                  ${c.thread_id === activeThreadId
                    ? "bg-[#e7f1ff] text-[#007BFF]"
                    : "text-[#6C757D] hover:bg-[#f8f9fa] hover:text-[#212529]"
                  }
                `}
              >
                <span className="truncate">{c.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

      </SidebarContent>


      {/* Footer */}
      <SidebarFooter className="border-t border-gray-200 bg-white p-2">

        <SidebarMenu>

          {/* User */}
          <SidebarMenuItem>
            <div className="flex h-10 items-center gap-3 px-2">
              <UserButton
                appearance={{
                  elements: {
                    userButtonBox: "flex-row-reverse",
                    userButtonOuterIdentifier: "text-[#212529] text-sm font-medium",
                  },
                }}
                showName
                signInUrl="/sign-in"
              />
            </div>
          </SidebarMenuItem>

          {/* Logout */}
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => signOut({ redirectUrl: "/" })}
              className="h-10 text-[#6C757D] hover:bg-[#f8f9fa] hover:text-[#212529]"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarFooter>

    </Sidebar>
  )
}