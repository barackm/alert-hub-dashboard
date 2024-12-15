"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

const AppHeader = () => {
  const pathname = usePathname();
  const segments = pathname
    ?.split("/")
    .filter(Boolean)
    .map((s) => ({
      title: s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " "),
      href: `/${s}`,
    }));

  return (
    <header className="flex bg-background z-10 w-full fixed top-0 h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center">
                  <HomeIcon className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {segments?.map((segment, index) => (
              <React.Fragment key={segment.href}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {index === segments.length - 1 ? (
                    <BreadcrumbPage>{segment.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={segment.href}>{segment.title}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default AppHeader;
