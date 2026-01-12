"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  AreaChart,
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  LucideIcon,
  Settings2,
  Sparkles,
  Wallpaper,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { env } from "@/env";
import { BreadcrumbItem, DashboardHeader } from "./dashboard-header";
import { UserEmailAndName } from "@/data-access/profiles";
import { useTransition } from "react";
import { useAtom } from "jotai";
import { sidebarAtom } from "./atom";
import clsx from "clsx";
import { PoppinsFont } from "@/app/(home)/_components/home-page-navbar";

// {
//   title: "Portfolio",
//   url: "/dashboard/portfolio",
//   icon: Wallpaper,
//   items: [
//     {
//       title: "Portfolio",
//       url: "/dashboard/portfolio",
//     },

//     {
//       title: "Hero Section",
//       url: "/dashboard/portfolio/hero-section",
//     },
//     {
//       title: "Projects Section",
//       url: "/dashboard/portfolio/projects",
//     },
//     {
//       title: "Work Experience Section",
//       url: "/dashboard/portfolio/work-experience",
//     },
//   ],
// },

type SidebarMenuItem = {
  title: string;
  url: string;
  icon?: LucideIcon | (() => React.JSX.Element);
  items?: SidebarMenuItem[];
};

const navigationItems: SidebarMenuItem[] = [
  {
    title: "Portfolio",
    url: "/dashboard/portfolio",
    icon: AreaChart,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: AreaChart,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings2,
  },
  {
    title: "Billing",
    url: "/dashboard/billing",
    icon: CreditCard,
  },
  // {
  //   title: "Discord Community",
  //   url: "https://discord.gg/ntJYdGaAXK",
  //   icon: () => (
  //     <svg
  //       className="mr-2 h-4 w-4"
  //       aria-hidden="true"
  //       focusable="false"
  //       viewBox="0 0 24 24"
  //     >
  //       <path
  //         fill="currentColor"
  //         d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"
  //       />
  //     </svg>
  //   ),
  // },
];

interface DashboardSidebarProps {
  children?: React.ReactNode;
  portfolioUrl: string;
  userNameAndEmail: UserEmailAndName;
}

export function DashboardSidebar({
  children,
  portfolioUrl,
  userNameAndEmail,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useAtom(sidebarAtom);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function singOut() {
    startTransition(() => {
      router.push("/api/sign-out");
    });
  }

  // Helper function to get breadcrumb items based on current path
  const getBreadcrumbItems = () => {
    const currentItem = navigationItems.find((item) =>
      pathname.startsWith(item.url),
    );

    if (!currentItem) return [];

    const items: BreadcrumbItem[] = [
      {
        title: currentItem.title,
        href: currentItem.url,
      },
    ];

    if (currentItem.items) {
      const subItem = currentItem.items.find((item) => item.url === pathname);
      if (subItem) {
        items.push({
          title: subItem.title,
          href: subItem.url,
          isCurrentPage: true,
        });
      }
    }

    return items;
  };

  return (
    <SidebarProvider open={isOpen} onOpenChange={setIsOpen}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className="flex justify-between">
                {/* mobile */}
                <div className="block md:hidden">
                  <Link
                    target="_blank"
                    href={"portfoliopilot.in"}
                    className={clsx(
                      "text-3xl font-semibold",
                      PoppinsFont.className,
                    )}
                  >
                    Portfolio
                    <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                      pilot
                    </span>
                  </Link>
                </div>
                {/* desktop */}
                <div className="hidden md:block">
                  {isOpen ? (
                    <Link
                    target="_blank"
                    href={"portfoliopilot.in"}
                    className={clsx(
                      "text-3xl font-semibold",
                      PoppinsFont.className,
                    )}
                  >
                    Portfolio
                    <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                      pilot
                    </span>
                  </Link>
                  ) : (
                    <Link
                      className="flex aspect-square size-8 items-center justify-center rounded-sm bg-primary text-2xl font-semibold text-secondary"
                      target="_blank"
                      href={"portfoliopilot.in"}
                    >
                      P
                    </Link>
                  )}
                </div>
                <div className="hidden md:block">
                  {isOpen && (
                    <SidebarTrigger
                      onClick={() => setIsOpen(false)}
                      className="-ml-1"
                    />
                  )}
                </div>
              </div>
              {/* </SidebarMenuButton>   */}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname.startsWith(item.url);
                const hasSubItems = item.items && item.items.length > 0;

                return (
                  <SidebarMenuItem key={item.title}>
                    {hasSubItems ? (
                      <Collapsible
                        defaultOpen={isActive}
                        className="group/collapsible"
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className={cn(
                              "mb-1",
                              isActive &&
                                "bg-sidebar-accent text-sidebar-accent-foreground",
                            )}
                          >
                            {item.icon && <item.icon className="mr-2" />}
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => {
                              const isSubItemActive = pathname === subItem.url;
                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    className={cn(
                                      "my-1",
                                      isSubItemActive &&
                                        "bg-sidebar-accent text-sidebar-accent-foreground",
                                    )}
                                  >
                                    <Link href={subItem.url}>
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        className={cn(
                          "mb-1",
                          isActive &&
                            "bg-sidebar-accent text-sidebar-accent-foreground",
                        )}
                      >
                        {item.url.startsWith("http") ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.icon && <item.icon className="mr-2" />}
                            <span>{item.title}</span>
                          </a>
                        ) : (
                          <Link href={item.url}>
                            {item.icon && <item.icon className="mr-2" />}
                            <span>{item.title}</span>
                          </Link>
                        )}
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <div className="hidden md:block">
              {!isOpen && (
                <SidebarMenuItem>
                  <SidebarTrigger onClick={() => setIsOpen(true)} />
                </SidebarMenuItem>
              )}
            </div>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="/avatars/01.png" alt="@username" />
                      {/* <AvatarFallback>CN</AvatarFallback> */}
                      <AvatarFallback className="uppercase">
                        {" "}
                        {userNameAndEmail?.displayName?.substring(0, 2) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold capitalize">
                        {userNameAndEmail?.displayName}{" "}
                      </span>
                      <span className="truncate text-xs">
                        {userNameAndEmail?.email}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {/* <DropdownMenuItem>
                    <BadgeCheck className="mr-2 h-4 w-4" />
                    Account
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuItem>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuSeparator /> */}
                  <DropdownMenuItem asChild>
                    <button className="w-full cursor-pointer" onClick={singOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      {isPending ? "Signing out..." : "Logout"}
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <DashboardHeader
          items={getBreadcrumbItems()}
          portfolioUrl={portfolioUrl}
        />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
