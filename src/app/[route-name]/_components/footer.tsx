"use client";

import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { DarkModeToggle } from "@/components/dark-mode-toggle";

export function PortfolioFooter() {
  return (
    <footer className="bg-background px-4 py-6  border-t">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="text-xl font-bold text-primary">
          Portfoliopilot
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2024 portfoliopilot.in all rights reserved.
          </p>
        </div>

        <section className="flex flex-col items-center gap-2">
          <DarkModeToggle />
          <div className="flex space-x-4">
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </footer>
  );
}
