
import { allIcons, IconKey } from "./icon-selector";
import { cn } from "@/lib/utils";
import React from "react";
import { GiHammerNails } from "react-icons/gi";

export function IconRenderer({
  iconName,
  className,
  props,
}: {
  iconName?: IconKey | string | null;
  className?: string;
  props?: React.ComponentProps<(typeof allIcons)[IconKey]>;
}) {
  return (
    <>
      {allIcons[iconName as IconKey]
        ? React.createElement(allIcons[iconName as IconKey], {
          className: cn("h-5 w-5", className),
          ...props,
        })
        : React.createElement(GiHammerNails, {
          className: cn("h-5 w-5", className),
          ...props,
        })}
    </>
  );
}
