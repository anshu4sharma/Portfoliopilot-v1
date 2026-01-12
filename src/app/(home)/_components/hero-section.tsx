import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { UserTableWrapper } from "./user-table-wrapper";
import { UserTableSkeletonComponent } from "./user-table-skeleton";
import { env } from "@/env";
import { AvatarComponent } from "@/components/avatar-component";
import { getHeroSectionData } from "@/actions/hero_actions";
import { Cover } from "./cover";
import { PoppinsFont } from "./home-page-navbar";
import clsx from "clsx";
// import { BackgroundLines } from "@/components/ui/background-lines";

type Props = {};

export default async function HeroSection({}: Props) {

  const portfolioName = "hackerboy";
  const heroSection = await getHeroSectionData(portfolioName);
  const samplePortfolio = `${env.NODE_ENV === "development" ? "http" : "https"}://${portfolioName}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 animate-gradient-fade bg-gradient-to-br from-background via-background to-primary/10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"></div>
      {/* <BackgroundLines> */}
      <div className="relative">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-8">
              {/* <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"> */}
              <h1 className="text-4xl font-bold tracking-normal sm:text-5xl md:text-6xl lg:text-[70px]">
                Build Your Portfolio
                <Cover>
                  <span className="block bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                    Effortlessly
                  </span>
                </Cover>
              </h1>
              <p className="max-w-2xl text-xl text-muted-foreground">
                Create stunning portfolios in minutes with{" "}
                <Link href="/" className="text-primary hover:underline">
                  portfoliopilot.in
                </Link>
                . Stand out from the crowd and land your dream opportunities.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  variant="outline"
                  asChild
                  size="lg"
                  className={clsx("text-lg", PoppinsFont.className)}
                >
                  <Link href="/create-portfolio">
                    Create Your Portfolio
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="link"
                  asChild
                  size="lg"
                  className="group text-lg transition-colors hover:border-primary/50"
                >
                  <Link
                    href={samplePortfolio}
                    target="_blank"
                    className="flex items-center gap-2 hover:left-3 hover:translate-x-1 hover:transition-transform"
                  >
                    <span>View Demo Portfolio →</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Suspense fallback={<UserTableSkeletonComponent />}>
                <UserTableWrapper />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      {/* </BackgroundLines> */}
    </section>
  );
}
