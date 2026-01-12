"use client";

import { PricingCards } from "@/components/pricing-cards";
import Link from "next/link";
import { User } from "@/db/schema";
import { UserEmailAndName } from "@/data-access/profiles";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SAVINGS_PERCENTAGE } from "@/config/pricing";
import { motion } from "framer-motion";
import { 
  Globe, 
  Search, 
  Paintbrush, 
  BarChart2, 
  Layout, 
  RefreshCw,
  Check 
} from "lucide-react";
import clsx from "clsx";
import { PoppinsFont } from "@/app/(home)/_components/home-page-navbar";

const proFeatures = [
  {
    icon: Globe,
    title: "Custom Subdomain",
    description: "Get your personalized username.portfoliopilot.in domain"
  },
  {
    icon: Search,
    title: "SEO Optimization",
    description: "Rank higher in search results with built-in SEO tools"
  },
  {
    icon: Paintbrush,
    title: "Advanced Customization",
    description: "Unlimited design options and section layouts"
  },
  {
    icon: BarChart2,
    title: "Analytics Dashboard",
    description: "Track visitor engagement and portfolio performance"
  },
  {
    icon: Layout,
    title: "All Portfolio Sections",
    description: "Access to Hero, Projects, Skills, Experience, and more"
  },
  {
    icon: RefreshCw,
    title: "Regular Updates",
    description: "Get the latest features and improvements first"
  }
];

export default function PricingContent({
  user,
  userNameAndEmail,
}: {
  user: User | null;
  userNameAndEmail: UserEmailAndName;
}) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex items-center justify-between px-4">
        <Link
          href="/"
          className={clsx("text-2xl font-semibold", PoppinsFont.className)}
        >
          Portfolio<span className=" bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            pilot
          </span>
        </Link>
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Back to home
          </Link>
        </nav>
      </header>

      <main className="container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-2 lg:py-16">
        {/* Left Column - Features and Benefits */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Level Up Your Portfolio
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Stand out with professional features designed for developers.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {proFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <feature.icon className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-lg bg-muted/50 p-6">
            <h3 className="mb-4 text-xl font-semibold">Why Go Pro?</h3>
            <ul className="space-y-3">
              {[
                "Build credibility with a professional domain",
                "Get discovered through optimized SEO",
                "Track and improve with analytics",
                "Stand out with unlimited customization",
                "Access premium layouts and sections",
                "Priority support and regular updates"
              ].map((benefit) => (
                <li key={benefit} className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Right Column - Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-24 space-y-8"
        >
          {/* <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-lg bg-muted p-1">
              <Button
                size="sm"
                variant={billingCycle === "monthly" ? "default" : "ghost"}
                onClick={() => setBillingCycle("monthly")}
                className="relative"
              >
                Monthly
                {billingCycle === "monthly" && (
                  <motion.div
                    layoutId="billingHighlight"
                    className="absolute inset-0 -z-10 rounded-md bg-primary"
                  />
                )}
              </Button>
              <Button
                size="sm"
                variant={billingCycle === "yearly" ? "default" : "ghost"}
                onClick={() => setBillingCycle("yearly")}
                className="relative"
              >
                Yearly
                <span className="ml-2 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">
                  Save {SAVINGS_PERCENTAGE[billingCycle.toUpperCase() as 'MONTHLY' | 'YEARLY']}%
                </span>
              </Button>
            </div>
          </div> */}

          <PricingCards
            user={user}
            userNameAndEmail={userNameAndEmail}
            billingCycle={billingCycle}
          />
        </motion.div>
      </main>
    </div>
  );
}
