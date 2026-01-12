"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import PaymentModal from "@/app/pricing/_components/payment-modal";
import RedirectToLoginBtn from "@/app/pricing/_components/redirect-to-login";
import { User } from "@/db/schema";
import { UserEmailAndName } from "@/data-access/profiles";
import {
  PRICING,
  SAVINGS_PERCENTAGE,
  getMonthlyEquivalent,
} from "@/config/pricing";

interface PricingCardsProps {
  user: User | null;
  userNameAndEmail: UserEmailAndName;
  billingCycle: "monthly" | "yearly";
}

export function PricingCards({
  user,
  userNameAndEmail,
  billingCycle,
}: PricingCardsProps) {
  const billingCycleKey = billingCycle.toUpperCase() as "MONTHLY" | "YEARLY";
  const pricing = PRICING[billingCycleKey];
  return (
    <div className="mx-auto max-w-5xl">
      {/* Pro Plan Highlight Box */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div>
            <h3 className="text-2xl font-bold">Pro Plan Benefits</h3>
            <p className="text-muted-foreground">
              Unlock all features and take your portfolio to the next level
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">
                {pricing.SYMBOL}{pricing.OFFER_PRICE}
              </p>
            </div>
            {user ? (
              <PaymentModal
                userNameAndEmail={userNameAndEmail}
                userId={user.id}
                billingCycle={billingCycle}
              >
                <Button size="lg" className="whitespace-nowrap">
                  Upgrade to Pro
                </Button>
              </PaymentModal>
            ) : (
              <RedirectToLoginBtn>Upgrade to Pro</RedirectToLoginBtn>
            )}
          </div>
        </div>
      </div>

      {/* Plan Comparison */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="border-muted/50">
          <CardHeader>
            <CardTitle>Free Plan</CardTitle>
            <CardDescription>
              For individuals starting their portfolio journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h4 className="mb-4 font-semibold">Included features:</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Custom Page Name (portfoliopilot.in/portfolioName)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>3 Portfolio Sections (Hero, Projects, Skills)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>4 Hero Section Layouts</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>4 Project Layouts per Section</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link
              className="w-full"
              href={`/sign-in?returnTo=${encodeURIComponent("/create-portfolio")}`}
            >
              <Button variant="outline" size="lg" className="w-full">
                Get started for free
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pro Plan</CardTitle>
              <span className="rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground">
                Popular
              </span>
            </div>
            <CardDescription>
              For professionals seeking advanced features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h4 className="mb-4 font-semibold">Everything in Free, plus:</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Custom Subdomain (username.portfoliopilot.in)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>All Portfolio Sections</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unlimited Custom Subdomain Changes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>5+ Layouts for Each Section</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>SEO Optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Portfolio Analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Customizable Design for Each Section</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Regular Updates with New Features</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
