"use client";

import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import clsx from "clsx";
import { PoppinsFont } from "@/app/(home)/_components/home-page-navbar";

export default function SignInPage() {
  const [returnTo, setReturnTo] = React.useState("/");

  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setReturnTo(searchParams.get("returnTo") || "/create-portfolio");
  }, []);

  return (
    <div className="flex flex-grow flex-col items-center justify-center p-4">
      <Link
        href="/"
        className={clsx("text-3xl font-semibold", PoppinsFont.className)}
      >
        Portfolio
        <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
          pilot
        </span>
      </Link>{" "}
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2 text-center">
          <h1 className="text-gradient bg-clip-text text-3xl font-bold text-transparent">
            Sign In
          </h1>
          <p className="text-muted-foreground">
            Sign in to your account with Google below.
          </p>
        </div>
        <div className="space-y-4">
          <Link
            href={`/api/login/google?returnTo=${encodeURIComponent(returnTo)}`}
            className={cn(
              buttonVariants({ variant: "default" }),
              "flex w-full transform items-center justify-center rounded-lg bg-blue-500 py-3 text-white transition-transform hover:scale-105 hover:shadow-lg hover:dark:bg-red-700",
            )}
          >
            <FcGoogle size={24} className="mr-2" />
            <p className="text-lg font-semibold">Sign in with Google</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
