import { GetRouteType } from "@/actions/route_actions";
import { ExperienceCard } from "./ExperienceCard";
import { WorkExperience } from "@/db/schema";

export const ListLayout = ({
  experiences,
  route,
  canEdit,
}: {
  experiences: WorkExperience[];
  route: GetRouteType;
  canEdit: boolean;
}) => (
  <div className="grid grid-cols-1 gap-4">
    {experiences.map((experience) => (
      <ExperienceCard
        key={experience.id}
        experience={experience}
        route={route}
        canEdit={canEdit}
      />
    ))}
  </div>
);
