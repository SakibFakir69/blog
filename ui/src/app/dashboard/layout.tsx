import React from "react";
import AppSidebarDashboard from "./page";
import { SidebarProvider } from "@/components/ui/sidebar";

// type

function DashboardLayouts({ children }) {
  return (
    <div>
      <SidebarProvider>

      <main className=" min-h-screen w-full">
          <AppSidebarDashboard>{children}</AppSidebarDashboard>
      </main>

      </SidebarProvider>
    </div>
  );
}

export default DashboardLayouts;
