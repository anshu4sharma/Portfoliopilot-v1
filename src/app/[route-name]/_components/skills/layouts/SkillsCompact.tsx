import { DeleteSkillDialog } from "../_components/DeleteSkillDialog";
import { GetRouteType } from "@/actions/route_actions";
import { Badge } from "@/components/ui/badge";
import { Skill } from "@/db/schema";
import { UpdateSkillDialog } from "../_components/UpdateSkillDialog";
import { levelColors } from "..";
import { Card, CardContent } from "@/components/ui/card";
import { IconRenderer } from "@/components/icon-renderer";

export function SkillsCompact({
  skills,
  route,
  canEdit,
}: {
  skills: Skill[];
  route: GetRouteType;
  canEdit: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {skills.map((skill) => (
        <Card
          key={skill.skillName}
          className="group relative transition-all duration-200 hover:shadow-md"
        >
          <CardContent className="flex flex-col items-center p-4 text-center">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <IconRenderer iconName={skill.iconName} />
            </div>
            <h3 className="font-semibold">{skill.skillName}</h3>
            <p className="mb-1 text-xs text-muted-foreground">
              {skill.yearOfExperience} years
            </p>
            <Badge
              className={`${levelColors[skill.levelOfProficiency]} text-xs capitalize`}
              variant="secondary"
            >
              {skill.levelOfProficiency}
            </Badge>

            {/* Edit and Delete buttons */}
            {canEdit && (
              <>
                <UpdateSkillDialog
                  className="absolute left-2 top-2"
                  skill={skill}
                />
                <DeleteSkillDialog
                  className="absolute right-2 top-2"
                  skillId={skill.id}
                  route={route}
                />
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
