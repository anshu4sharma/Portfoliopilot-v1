"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Globe, Menu as MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/session";
import { Profile } from "@/db/schema";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { GetUserRouteType } from "@/actions/route_actions";
import { Poppins } from "next/font/google";
import clsx from "clsx";
export const PoppinsFont = Poppins({
  weight: ["100", "200", "300", "500", "600", "700", "900", "800", "400"],
  subsets: [ "latin-ext"],
});
type Props = {
  user: User | undefined;
  profile: Profile | undefined;
  profileRoute: GetUserRouteType | undefined;
};

const navLinks = [
  {
    name: "Features",
    href: "#features",
  },
  // {
  //   name: "How to Use",
  //   href: "#how-to-use",
  // },
  {
    name: "FAQ",
    href: "#faq",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Support Us",
    href: "/support-us",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
];

export default function HomePageNavbar({ user, profile, profileRoute }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // const route

  function singOut() {
    startTransition(() => {
      router.push("/api/sign-out");
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex items-center justify-between">
        <Link
          href="/"
          className={clsx("text-3xl font-semibold", PoppinsFont.className)}
        >
          Portfolio
          <span className=" bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            pilot
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {profileRoute && profileRoute.routeName && (
            <Button variant="outline" asChild>
              <Link href={profileRoute.routeName}>
                <Globe className="mr-2 h-4 w-4" /> See Your Portfolio ↗️
              </Link>
            </Button>
          )}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={profile?.image || "/default-avatar.png"}
                    alt="User Avatar"
                  />
                  <AvatarFallback className="uppercase">
                    {profile?.displayName?.substring(0, 2) || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <>
                    <Avatar className="mr-2 h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={profile?.image || "/default-avatar.png"}
                        alt="User Avatar"
                      />
                      <AvatarFallback className="uppercase">
                        {" "}
                        {profile?.displayName?.substring(0, 2) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold capitalize">
                        {profile?.displayName}{" "}
                      </span>
                      <span className="truncate text-xs">{user?.email}</span>
                    </div>
                  </>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <button className="w-full cursor-pointer" onClick={singOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {isPending ? "Signing out..." : "Logout"}
                  </button>
                </DropdownMenuItem>
                {user?.userType === "pro" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              className="group transition-colors duration-200"
              asChild
            >
              <Link
                href={`/sign-in?returnTo=${encodeURIComponent(
                  "/create-portfolio",
                )}`}
              >
                <LogIn className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Login
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Sheet Trigger */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 pt-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {profileRoute && profileRoute.routeName && (
                <Button variant="outline" asChild>
                  <Link href={profileRoute.routeName}>
                    See Your Portfolio ↗️
                  </Link>
                </Button>
              )}
              {user ? (
                <button onClick={singOut}>
                  {isPending ? "Signing out..." : "Logout"}
                </button>
              ) : (
                <Button
                  variant="outline"
                  className="group transition-colors duration-200"
                  asChild
                >
                  <Link
                    href={`/sign-in?returnTo=${encodeURIComponent(
                      "/create-portfolio",
                    )}`}
                  >
                    <LogIn className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Login
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
