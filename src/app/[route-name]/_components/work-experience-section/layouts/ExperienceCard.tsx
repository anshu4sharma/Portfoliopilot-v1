import { Building2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar } from "lucide-react";
import { UpdateWorkExperienceDialogComponent } from "../_components/update-work-experience-dialog";
import { DeleteWorkExperienceDialog } from "../_components/delete-work-experience-dialog";
import { ExperienceCardProps } from "..";
import { formatDate } from "@/utils/format-date";

export const ExperienceCard = ({
  experience,
  route,
  canEdit,
}: ExperienceCardProps) => (
  <Card className="overflow-hidden bg-card transition-all hover:shadow-md">
    <CardContent className="p-4 md:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold leading-tight text-card-foreground md:text-xl">
              {experience.jobTitle}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="h-4 w-4" />
              <span className="text-sm">{experience.companyName}</span>
            </div>
          </div>
          {experience.isPresent && <Badge variant="secondary">Present</Badge>}
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{experience.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              {formatDate(experience.startDate)} -{" "}
              {experience.isPresent
                ? "Present"
                : formatDate(experience.endDate || "")}
            </span>
          </div>
        </div>

        <Separator className="bg-border" />

        <p className="text-sm text-card-foreground">
          {experience.jobDescription}
        </p>

        {route && canEdit && (
          <div className="flex gap-2">
            <UpdateWorkExperienceDialogComponent
              route={route}
              workExperience={experience}
            />
            <DeleteWorkExperienceDialog
              workExperience={experience}
              route={route}
            />
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);
