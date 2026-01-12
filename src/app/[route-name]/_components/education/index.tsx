"use client";

import * as React from "react";
import { EducationLayout } from "./types";
import { AddEducationDialog } from "./_components/AddEducationDialog";
import { EducationTimeline } from "./layouts/EducationTimeline";
import { Education } from '@/db/schema';
import { User } from "@/lib/session";

import { GetRouteType } from "@/actions/route_actions";
import { useCanEditPortfolio } from "@/hooks/useCanEditPortfolio";
import { EducationLayoutSelector } from "./_components/EducationLayoutSelector";
import { Badge } from "@/components/ui/badge";
import { LockIcon } from "lucide-react";

interface EducationSectionProps {
  education: Education[];
  user: User;
  route: GetRouteType;
}

export function EducationSection({ education, user, route }: EducationSectionProps) {
  const [variant, setVariant] = React.useState<EducationLayout>("timeline");
  const canEdit = useCanEditPortfolio(user?.id || 0, route?.userId || 0)
  const isUserPro = user?.userType == 'pro'



  const renderEducation = () => {
    switch (variant) {

      case "timeline":
        return <EducationTimeline education={education} canEdit={canEdit} user={user} route={route} />;
    }
  };

  return (
    <>
      {(canEdit || education.length > 0) && (
        <div className="py-8">
          <section id="education" className="container mx-auto px-4 lg:px-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <section className='flex gap-2 items-center'>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
                  Education
                </h2>
                {canEdit && (
                <Badge> {!isUserPro && <LockIcon className="w-2.5 h-2.5 mr-1" />}
                    Pro
                  </Badge>
                )}
              </section>
              <div className="flex flex-wrap items-center gap-3">
                {/* <EducationLayoutSelector
                  variant={variant}
                  onVariantChange={setVariant}
                /> */}
                {canEdit && route && (
                  <AddEducationDialog route={route} user={user || null} />
                )}
              </div>
            </div>
            {education.length === 0 && canEdit ? (
              <p className="text-center text-muted-foreground">
                No education added yet.
              </p>
            ) : (
              education.length > 0 && renderEducation()
            )}
          </section>
        </div>
      )}
    </>
  );
}

