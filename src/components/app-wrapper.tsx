"use client";
import React, { PropsWithChildren } from "react";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";
import AppHeader from "./app-header";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SWRProvider } from "./swr-provider";
import AuthProvider from "./auth/auth-provider";

const AppWrapper = (props: PropsWithChildren) => {
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();
  const unauthenticatedPaths = ["/login", "/register", "/account-pending"];
  const shouldShowSidebar = !unauthenticatedPaths.includes(pathname);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <AuthProvider>
      <SWRProvider>
        <SidebarProvider>
          {shouldShowSidebar && <AppSidebar className="bg-white" />}
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
      </SWRProvider>
    </AuthProvider>
  );
};

export default AppWrapper;
