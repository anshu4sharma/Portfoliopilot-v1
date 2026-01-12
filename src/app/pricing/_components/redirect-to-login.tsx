"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

type Props = {
  children?: React.ReactNode;
};

export default function RedirectToLoginBtn({ children }: Props) {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  function handleClick() {
    startTransition(() => {
      router.push(
        `/sign-in?returnTo=${encodeURIComponent("/pricing")}`,
      );
    });
  }

  return (
    <Button
      onClick={handleClick}
      size="lg"
      variant="default"
      className="w-full"
      disabled={isPending}
    >
      {isPending ? "Processing..." : children ? children : "Start now"}
    </Button>
  );
}
