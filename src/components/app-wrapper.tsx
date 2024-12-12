"use client";
import React, { PropsWithChildren } from "react";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import AppHeader from "./app-header";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./auth/auth-provider";

const AppWrapper = (props: PropsWithChildren) => {
  const pathname = usePathname();
  const unauthenticatedPaths = ["/login", "/register"];

  const shouldShowSidebar = !unauthenticatedPaths.includes(pathname);

  return (
    <AuthProvider>
      <SidebarProvider>
        {shouldShowSidebar && <AppSidebar />}
        <SidebarInset>
          {shouldShowSidebar && <AppHeader />}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {props.children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default AppWrapper;
