import Link from "next/link";
import React from "react";
import type { Metadata } from "next";
import clsx from "clsx";
import { PoppinsFont } from "../(home)/_components/home-page-navbar";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Portfoliopilot - Portfolio Builder Website",
  icons: [
    { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon.ico" },
  ],
  keywords: [
    "portfoliopilot",
    "#portfoliopilot",
    "Portfoliopilot",
    "potly",
    "portaly",
    "portfoliopilot portfolio builder",
    "portfoliopilot portfolio creator",
    "portfoliopilot portfolio maker",
    "portfoliopilot portfolio website builder",
    "portfoliopilot portfolio website creator",
    "portfoliopilot portfolio website maker",
    "Portfolio",
    "Portfolio Builder",
    "Portfolio Website",
    "Portfolio Website Builder",
    "Portfolio Website Creator",
    "Portfolio Website Maker",
    "Portfolio Website Creator",
    "Portfolio Website Maker",
    "Portfolio Website Creator",
    "Portfolio Website Maker",
    "Portfolio Website Creator",
    "Portfolio Website Maker",
    "Online Portfolio Builder",
    "Online Portfolio Creator",
    "Online Portfolio Maker",
    "Online Portfolio Website Builder",
    "Online Portfolio Website Creator",
    "Online Portfolio Website Maker",
    "Free Portfolio Builder",
    "Free Portfolio Creator",
    "Free Portfolio Maker",
    "Free Portfolio Website Builder",
    "Free Portfolio Website Creator",
    "Free Portfolio Website Maker",
    "Simple Portfolio Builder",
    "Simple Portfolio Creator",
    "Simple Portfolio Maker",
    "Simple Portfolio Website Builder",
    "Simple Portfolio Website Creator",
    "Simple Portfolio Website Maker",
    "portfoliopilot",
    "portfoliopilot portfolio builder",
    "portfoliopilot.in",
    "free portfoliopilot",
    "portfoliopilot portfolio builder",
    "portfoliopilot portfolio creator",
    "portfoliopilot portfolio maker",
    "portfoliopilot portfolio website builder",
    "portfoliopilot portfolio website creator",
    "portfoliopilot portfolio website maker",
    "dev portfolio builder portfoliopilot",
    "dev portfolio creator portfoliopilot",
    "dev portfolio maker portfoliopilot",
    "dev portfolio website builder portfoliopilot",
    "dev portfolio website creator portfoliopilot",
    "dev portfolio website maker portfoliopilot",
    "designer portfolio builder portfoliopilot",
    "designer portfolio creator portfoliopilot",
    "designer portfolio maker portfoliopilot",
    "designer portfolio website builder portfoliopilot",
    "designer portfolio website creator portfoliopilot",
    "designer portfolio website maker portfoliopilot",
    "developer portfolio builder portfoliopilot",
    "developer portfolio creator portfoliopilot",
    "developer portfolio maker portfoliopilot",
    "developer portfolio website builder portfoliopilot",
    "developer portfolio website creator portfoliopilot",
    "developer portfolio website maker portfoliopilot",
    "graphic designer portfolio builder portfoliopilot",
    "graphic designer portfolio creator portfoliopilot",
    "graphic designer portfolio maker portfoliopilot",
    "graphic designer portfolio website builder portfoliopilot",
    "graphic designer portfolio website creator portfoliopilot",
    "graphic designer portfolio website maker portfoliopilot",
    "freelancer portfolio builder portfoliopilot",
    "freelancer portfolio creator portfoliopilot",
    "freelancer portfolio maker portfoliopilot",
    "freelancer portfolio website builder portfoliopilot",
    "freelancer portfolio website creator portfoliopilot",
    "freelancer portfolio website maker portfoliopilot",
  ],
  description:
    "Portfoliopilot is Portfolio Builder: A simple, customizable tool to create and showcase professional developer portfolios with ease.",
};

export default function PolicyLayout({ children }: Props) {
  return (
    <div>
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold">
            <span className={clsx(PoppinsFont.className)}>
              Portfolio
              <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                pilot
              </span>
            </span>
          </Link>

          <Link
            href={`/`}
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Back to home
          </Link>
        </nav>
      </header>
      <div>{children}</div>
    </div>
  );
}
