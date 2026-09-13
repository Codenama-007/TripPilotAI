"use client"
import { useState } from 'react'
import React from 'react'
import AppSidebar from '@/components/AppSidebar'
import {SidebarProvider , SidebarInset} from "@/components/ui/sidebar"
import ChatComponent from '@/components/ChatComponent'


const page = () => {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  return (
    <SidebarProvider>
      <AppSidebar
        activeThreadId={activeThreadId}
        onSelectConversation={setActiveThreadId}
      />
      <SidebarInset>
        <ChatComponent
        activeThreadId={activeThreadId}
        onConversationCreated={setActiveThreadId}
      />
      
      </SidebarInset>
      
    </SidebarProvider>
  )
}

export default page
