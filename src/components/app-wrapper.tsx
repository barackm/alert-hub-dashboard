"use client";
import React, { PropsWithChildren } from "react";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import AppHeader from "./app-header";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "./hooks/use-auth";

const AppWrapper = (props: PropsWithChildren) => {
  const pathname = usePathname();
  const unauthenticatedPaths = ["/login", "/register"];
  useAuth();

  const shouldShowSidebar = !unauthenticatedPaths.includes(pathname);

  return (
    <SidebarProvider>
      {shouldShowSidebar && <AppSidebar />}
      <SidebarInset>
        {shouldShowSidebar && <AppHeader />}
        <div
          className={cn(
            "flex flex-1 flex-col gap-4 p-4 pt-0",
            shouldShowSidebar ? "pt-10" : "pt-0"
          )}
        >
          {props.children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AppWrapper;
