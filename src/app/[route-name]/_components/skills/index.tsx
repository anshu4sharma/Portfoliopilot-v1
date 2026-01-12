// skills section
// index.tsx

"use client";

import { useState } from "react";
import { AddSkillDialog } from "./_components/AddSkillDialog";
import { Skill } from "@/db/schema";
import { User } from "@/lib/session";
import { GetRouteType } from "@/actions/route_actions";
import { SkillsCompact } from "./layouts/SkillsCompact";
import { SkillsList } from "./layouts/SkillsList";
import { SkillsGrid } from "./layouts/SkillsGrid";
import { SkillsLayoutsSelector } from "./_components/SkillsLayoutsSelector";
import { useCanEditPortfolio } from "@/hooks/useCanEditPortfolio";
import { updateLayoutStyle } from "@/actions/layout-actions";
import { LockIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const levelColors = {
  beginner:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  advanced:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  expert: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

export type VariantType = "grid" | "list" | "compact";

export function SkillsSection({
  route,
  user,
  skills,
  layoutStyle: skillsLayoutStyle,
}: {
  route: GetRouteType;
  user: User;
  skills: Skill[];
  layoutStyle: VariantType | undefined | null;
}) {
  const [variant, setVariant] = useState<VariantType>(
    skillsLayoutStyle || "compact",
  );

  const canEdit = useCanEditPortfolio(user?.id, route?.userId);
  const isUserPro = user?.userType === "pro";
  // console.log("skills", skills);

  async function handleVariantChange(variant: VariantType) {
    setVariant(variant);
    await updateLayoutStyle(
      route?.routeId || 0,
      {
        skillsLayoutStyle: variant,
      },
      route?.routeName || "",
    );
  }

  const renderSkills = () => {
    switch (variant) {
      case "grid":
        return <SkillsGrid canEdit={canEdit} skills={skills} route={route} />;
      case "list":
        return <SkillsList canEdit={canEdit} skills={skills} route={route} />;
      case "compact":
        return (
          <SkillsCompact canEdit={canEdit} skills={skills} route={route} />
        );
    }
  };

  return (
    <>
      {(canEdit || skills.length > 0) && (
        <div className="py-8">
          <section id="skills" className="container mx-auto px-4 lg:px-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <section className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
                  Skills
                </h2>
                {canEdit && (
                  <Badge>
                    {!isUserPro && <LockIcon className="mr-1 h-2.5 w-2.5" />}
                    Pro
                  </Badge>
                )}
              </section>
              <div className="flex flex-wrap items-center gap-3">
                <SkillsLayoutsSelector
                  variant={variant}
                  onVariantChange={handleVariantChange}
                />
                {canEdit && route && (
                  <AddSkillDialog route={route} user={user} />
                )}
              </div>
            </div>
            {skills.length === 0 && canEdit ? (
              <p className="text-center text-muted-foreground">
                No skills added yet.
              </p>
            ) : (
              skills.length > 0 && renderSkills()
            )}
          </section>
        </div>
      )}
    </>
  );
}
