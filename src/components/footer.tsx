"use client";

import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { DarkModeToggle } from "./dark-mode-toggle";

const navLinks = [
  {
    name: "Pricing",
    href: "/pricing",
  },
  // new
  {
    name: "Pricing Policy",
    href: "/pricing-policy",
  },
  {
    name: "Refund Policy",
    href: "/refund-policy",
  },
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    name: "Cancellation Policy",
    href: "/cancellation-policy",
  },
  {
    name: "Terms & Conditions",
    href: "/terms-and-conditions",
  },
  {
    name: "Shipping & Delivery",
    href: "/shipping-and-delivery",
  },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
];

export function FooterComponent() {
  return (
    <footer className="bg-background px-4 py-6 md:py-8">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-4 md:flex-row md:space-x-10 md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="text-xl font-bold text-primary">
          Portfoliopilot
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2024 portfoliopilot.in all rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
          <nav className="flex max-w-3xl flex-wrap justify-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </nav>
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
        </div>
        <DarkModeToggle />
      </div>
    </footer>
  );
}
