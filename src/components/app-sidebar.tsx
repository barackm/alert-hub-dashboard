"use client";

import * as React from "react";
import { Gauge, HospitalIcon, ShieldAlertIcon, Users } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navItems = React.useMemo(
    () => ({
      navMain: [
        {
          title: "Dashboard",
          url: "/",
          icon: Gauge,
          isActive: pathname === "/",
        },
        {
          title: "Alerts",
          url: "/alerts",
          icon: ShieldAlertIcon,
          isActive: pathname.startsWith("/alerts"),
        },
        {
          title: "Users",
          url: "/users",
          icon: Users,
          isActive: pathname.startsWith("/users"),
        },
        {
          title: "Community Agents",
          url: "/community-agents",
          icon: Users,
          isActive: pathname.startsWith("/community-agents"),
        },
        {
          title: "Health Facilities",
          url: "/health-facilities",
          icon: HospitalIcon,
          isActive: pathname.startsWith("/health-facilities"),
        },
      ],
    }),
    [pathname]
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
