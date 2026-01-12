import React from "react";
import { Hero } from "./_components/hero";
import { ProjectsSection } from "./_components/projects-section";
import { getProjects } from "@/actions/project_actions";
import { getCurrentUser } from "@/lib/session";
import { WorkExperienceSection } from "./_components/work-experience-section";
import { getWorkExperiences } from "@/actions/workExperience-actions";
import AddHeroSection from "./_components/add-hero-section";
import { getUserRouteByRouteName } from "@/actions/route_actions";
import { getHeroSectionData } from "@/actions/hero_actions";
import { getLayoutStyle } from "@/actions/layout-actions";
import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import { env } from "@/env";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";
import Portfolio from "../dashboard/portfolio/_components/portfolio";

type Props = {
  params: { "route-name": string };
};

// fuction isSbusdomaoin

export default async function UserPage({ params }: Props) {
  const user = await getCurrentUser();
  const routeName = params["route-name"].split("/")[0].toLowerCase();
  const route = await getUserRouteByRouteName(routeName);

  const visitor = await db.query.users.findFirst({
    where: eq(users.id, route?.userId || 0),
  });
  if (!route) {
    notFound();
  }

  // Redirect to the correct subdomain if necessary
  const shouldRedirect =
    visitor?.userType == "pro" && user?.id !== route.userId;
  if (shouldRedirect) {
    const headersList = headers();
    const hostname = headersList.get("host") || "";
    const isLocalhost =
      hostname.includes("localhost") ||
      env.NEXT_PUBLIC_ROOT_DOMAIN.includes("localhost");

    // Determine if the current hostname is already the correct subdomain
    const isOnSubdomain = hostname.startsWith(`${routeName}.`);

    // If not on the correct subdomain, redirect to the correct one
    if (!isOnSubdomain) {
      const redirectDomain = isLocalhost
        ? `${routeName}.localhost:3000`
        : `${routeName}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;
      const redirectUrl = `${isLocalhost ? "http" : "https"}://${redirectDomain}${headersList.get("x-pathname") || ""}`;
      // Example: If the current URL is http://localhost:3000 and the routeName is 'example', the redirectUrl would be http://example.localhost:3000
      redirect(redirectUrl);
    }
  }

  // const userRoute = await getUserRouteByUserId(user?.id || null);
  const heroSection = await getHeroSectionData(routeName);
  const projects = await getProjects(routeName);
  const workExperiences = await getWorkExperiences(routeName);
  const layoutStyle = await getLayoutStyle(routeName);

  const portfolioUrl =
    visitor?.userType === "pro"
      ? `${routeName}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`
      : `${env.NEXT_PUBLIC_ROOT_DOMAIN}/${routeName}`;

  return (
    <div className="relative">
      {user && user.id === route.userId && (
        <section className="container flex items-center justify-end gap-2 px-4 lg:px-8 pt-3">
          <>
            {user.userType === "pro" ? (
              <Link
                className="truncate rounded-md bg-muted/50 px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted/80"
                target="_blank"
                href={`/dashboard`}
              >
                Dashboard ↗️
              </Link>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className="truncate rounded-md bg-muted/50 px-2 py-1 text-sm font-medium text-blue-400 text-muted-foreground transition-colors hover:bg-muted dark:bg-muted dark:hover:bg-muted/80"
                >
                  Subscribe to Pro ↗️
                </Link>
              </>
            )}
            <Link
              className="truncate rounded-md bg-muted/50 px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted/80"
              target="_blank"
              href={`https://${portfolioUrl}`}
            >
              {portfolioUrl} ↗️
            </Link>
          </>
        </section>
      )}
        <Portfolio routeName={routeName} />
      
    </div>
  );
}
