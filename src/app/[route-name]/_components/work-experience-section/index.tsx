"use client";

import { useState } from "react";
import { WorkExperience } from "@/db/schema";
import { GetRouteType } from "@/actions/route_actions";
import { useCanEditPortfolio } from "@/hooks/useCanEditPortfolio";
import { User as UserType } from "@/lib/session";
import { updateLayoutStyle } from "@/actions/layout-actions";
import { AddWorkExperienceDialogComponent } from "./_components/add-work-experience-dialog";
import { GridLayout } from "./layouts/GridLayout";
import { LayoutSelector, LayoutStyle } from "./_components/LayoutSelector";
import { CardsLayout } from "./layouts/CardsLayout";
import { ListLayout } from "./layouts/ListLayout";

export type ExperienceCardProps = {
  experience: WorkExperience;
  route: GetRouteType;
  canEdit: boolean;
};

export function WorkExperienceSection({
  route,
  workExperiences,
  user,
  layoutStyle: workExperienceLayoutStyle,
}: {
  route: GetRouteType;
  workExperiences: WorkExperience[];
  user: UserType | undefined;
  layoutStyle: LayoutStyle | undefined | null;
}) {
  const canEdit = useCanEditPortfolio(user?.id, route?.userId);
  const [layoutStyle, setLayoutStyle] = useState<LayoutStyle>(
    workExperienceLayoutStyle || "cards",
  );

  async function handleLayoutStyleChange(newLayoutStyle: LayoutStyle) {
    setLayoutStyle(newLayoutStyle);
    await updateLayoutStyle(
      route?.routeId || 0,
      {
        workExperienceLayoutStyle: newLayoutStyle,
      },
      route?.routeName || "",
    );
  }

  const renderLayout = () => {
    switch (layoutStyle) {
      case "grid":
        return (
          <GridLayout
            experiences={workExperiences}
            route={route}
            canEdit={canEdit}
          />
        );
      case "list":
        return (
          <ListLayout
            experiences={workExperiences}
            route={route}
            canEdit={canEdit}
          />
        );
      default:
        return (
          <CardsLayout
            experiences={workExperiences}
            route={route}
            canEdit={canEdit}
          />
        );
    }
  };

  return (
    <>
      {(canEdit || workExperiences.length > 0) && (
        <div className="py-8">
          <section
            id="work-experience"
            className="container mx-auto px-4 lg:px-8"
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
                Work Experience
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <LayoutSelector
                  layoutStyle={layoutStyle}
                  onLayoutChange={handleLayoutStyleChange}
                />
                {canEdit && route && (
                  <AddWorkExperienceDialogComponent route={route} />
                )}
              </div>
            </div>
            {workExperiences.length === 0 && canEdit ? (
              <p className="text-center text-muted-foreground">
                No work experiences added yet.
              </p>
            ) : (
              workExperiences.length > 0 && renderLayout()
            )}
          </section>
        </div>
      )}
    </>
  );
}
