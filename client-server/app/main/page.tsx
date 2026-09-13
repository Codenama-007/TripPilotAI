import React from 'react'
import AppSidebar from '@/components/AppSidebar'
import {SidebarProvider , SidebarInset} from "@/components/ui/sidebar"
import ChatComponent from '@/components/ChatComponent'


const page = () => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <ChatComponent/>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default page
