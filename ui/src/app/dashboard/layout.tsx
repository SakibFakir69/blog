"use client";
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebarDashboard from "./page";

interface ChildrenNode {
  children: React.ReactNode;
}

function DashboardLayouts({ children }: ChildrenNode) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
       
        <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-white p-4 shadow-md md:hidden">
          <SidebarTrigger />
         
        </header>


        <AppSidebarDashboard>{children}</AppSidebarDashboard>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayouts;
