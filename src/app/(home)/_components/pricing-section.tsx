"use client";

import { PricingCards } from "@/components/pricing-cards";
import { UserEmailAndName } from "@/data-access/profiles";
import { User } from "@/db/schema";

interface PricingSectionProps {
  user: User | null;
  userNameAndEmail: UserEmailAndName;
}

export function PricingSection({
  user,
  userNameAndEmail,
}: PricingSectionProps) {
  return (
    <section className="container py-16 sm:py-24">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-muted-foreground">
          Choose the plan that works best for you
        </p>
      </div>

      <PricingCards
        user={user}
        userNameAndEmail={userNameAndEmail}
        billingCycle="monthly"
      />
    </section>
  );
}
