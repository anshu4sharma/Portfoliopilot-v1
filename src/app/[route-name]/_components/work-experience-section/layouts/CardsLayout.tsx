import { GetRouteType } from "@/actions/route_actions";
import { ExperienceCard } from "./ExperienceCard";
import { WorkExperience } from "@/db/schema";

export const CardsLayout = ({
  experiences,
  route,
  canEdit,
}: {
  experiences: WorkExperience[];
  route: GetRouteType;
  canEdit: boolean;
}) => (
  <div className="grid gap-4 md:grid-cols-2">
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
