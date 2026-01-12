// [route-name]/_components/domain-toggle.tsx
"use client";

import { toggleSubdomain } from "@/actions/route_actions";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DomainToggleProps {
  routeId: number;
  isActive: boolean;
}

export function DomainToggle({
  routeId,
  isActive: initialState,
}: DomainToggleProps) {
  const [isActive, setIsActive] = useState(initialState);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async () => {
    try {
      setIsPending(true);
      const result = await toggleSubdomain(routeId, isActive);
      setIsActive(result.isSubDomainActive);
    } catch (error) {
      console.error("Failed to toggle subdomain:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="absolute right-4 top-4 z-50">
      <Button
        onClick={handleToggle}
        disabled={isPending}
      >
        {isPending ? (
          <span>Updating...</span>
        ) : (
          <span>{isActive ? "Disable Subdomain" : "Enable Subdomain"}</span>
        )}
      </Button>
      {isActive && (
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Your site is accessible at: <br />
          <code>{initialState}.portfoliopilot.in</code>
        </div>
      )}
    </div>
  );
}
