"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { useAtom } from "jotai";
import { sidebarAtom } from "./atom";
import { DarkModeToggle } from '@/components/dark-mode-toggle';

export interface BreadcrumbItem {
  title: string;
  href: string;
  isCurrentPage?: boolean;
}

interface DashboardHeaderProps {
  items: BreadcrumbItem[];
  portfolioUrl: string;
}

export function DashboardHeader({ items, portfolioUrl }: DashboardHeaderProps) {
  const [isOpen, setIsOpen] = useAtom(sidebarAtom);
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 bg-background z-30 flex justify-between gap-1 items-center pr-2">
      <div className="flex items-center gap-2 px-4">
        <div className="flex items-center gap-2 md:hidden">
          <SidebarTrigger
            onClick={() => setIsOpen(!isOpen)}
            className="-ml-1"
          />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>

        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <React.Fragment key={item.href}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {item.isCurrentPage ? (
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>
                      {item.title}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <Link
          className="truncate rounded-md bg-muted/50 px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted/80 flex items-center gap-1"
          target="_blank"
          href={portfolioUrl}
        >
          <span className='hidden sm:block'>
            {portfolioUrl.replace(/^https?:\/\//, "")}
          </span>
          ↗️
        </Link>
      </div>
      <DarkModeToggle />
    </header>
  );
}
