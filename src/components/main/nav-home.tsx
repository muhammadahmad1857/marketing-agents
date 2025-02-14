"use client"

import {
  
  type LucideIcon,
} from "lucide-react"


import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavHome({
  home,
}: {
  home: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  
  const pathname = usePathname()
  
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Home page</SidebarGroupLabel>
      <SidebarMenu>
{
  home.map((item)=>{
    return(
      <SidebarMenuItem key={item.name} >
        <Link           href={item.url}
        >
            <SidebarMenuButton className={pathname === item.url ? "bg-black rounded-md border border-white hover:bg-gray-800 transition-all duration-500 text-white hover:text-white" : ""}>
                <item.icon />
                <span>{item.name}</span>
            </SidebarMenuButton></Link>
            </SidebarMenuItem>
    )
  })
}          
                  </SidebarMenu>
    </SidebarGroup>
  )
}

