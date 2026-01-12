"use client";

import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { useCanEditPortfolio } from "@/hooks/useCanEditPortfolio";
import { cn } from "@/lib/utils";
import { User } from "@/lib/session";
import Link from "next/link";
import Notification from "@/components/notification";

type Props = {
  userId?: number;
  routeUserId?: number;
};

export default function AddHeroSection({ userId, routeUserId }: Props) {
  const canEdit = useCanEditPortfolio(userId, routeUserId);
  if (!canEdit) return null;

  return (
    <>
      <Notification message="Project section issue fixed and updated." />
      <div className="mb-4 mt-1 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Hero Section</h2>
        <Link
          className={cn(buttonVariants({ variant: "outline" }))}
          href="/create-portfolio"
        >
          Add Hero Section
        </Link>
      </div>
    </>
  );
}
