import { DeleteSkillDialog } from "../_components/DeleteSkillDialog";
import { GetRouteType } from "@/actions/route_actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skill } from "@/db/schema";
import { UpdateSkillDialog } from "../_components/UpdateSkillDialog";
import { levelColors } from "..";
import { IconRenderer } from "@/components/icon-renderer";

export function SkillsGrid({
  skills,
  route,
  canEdit,
}: {
  skills: Skill[];
  route: GetRouteType;
  canEdit: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
        <Card
          key={skill.skillName}
          className="capitalize transition-all duration-200 hover:shadow-md"
        >
          <CardContent className="flex items-center p-4">
            <div className="mr-4 rounded-full bg-primary/10 p-2 text-primary">
              <IconRenderer iconName={skill.iconName} />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold">{skill.skillName}</h3>
              <p className="text-sm text-muted-foreground">
                {skill.yearOfExperience} years
              </p>
            </div>
            <Badge
              className={`${levelColors[skill.levelOfProficiency]} mr-2 capitalize`}
              variant="secondary"
            >
              {skill.levelOfProficiency}
            </Badge>
            {canEdit && (
              <div className="flex gap-2">
                <UpdateSkillDialog skill={skill} />
                <DeleteSkillDialog skillId={skill.id} route={route} />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
