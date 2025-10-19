"use client";
import React, { ReactNode } from "react";
import {  Home, BookOpenIcon,  PackageOpenIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarDashboardProps {
  children?: ReactNode;
}

const items = [
  { title: "Home", url: "/project", icon: Home },
  { title: "Project", url: "/dashboard/project", icon: PackageOpenIcon },
  { title: "Create project", url: "/dashboard/project/create", icon:PackageOpenIcon },
  { title: "blog", url: "/dashboard/blog", icon: BookOpenIcon },
   { title: "Create blog", url: "/dashboard/blog/create", icon: BookOpenIcon },


];

export default function AppSidebarDashboard({ children }: AppSidebarDashboardProps) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50 ">
      {/* Sidebar */}
      <Sidebar className="h-screen py-30">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Main Content */}
      <main className="flex-1 min-h-screen overflow-y-auto p-6 py-24">{children}</main>
    </div>
  );
}
