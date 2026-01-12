"use server";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import React from "react";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { getUserRouteByUserId } from "@/actions/route_actions";
import { env } from "@/env";
import { getUserEmailAndName } from "@/data-access/profiles";


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");
  if (user.userType !== "pro") redirect("/pricing");
  const route = await getUserRouteByUserId(user.id);
  if (!route) notFound();

  const userNameAndEmail = await getUserEmailAndName(user?.id);

  const portfolioName = route.routeName
  const portfolioUrl = `${env.NODE_ENV === "development" ? "http" : "https"}://${portfolioName}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <div>
      <DashboardSidebar
        userNameAndEmail={userNameAndEmail}
        portfolioUrl={portfolioUrl}
      >
        {children}
      </DashboardSidebar>
    </div>
  );
}
