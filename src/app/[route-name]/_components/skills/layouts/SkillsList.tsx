import { DeleteSkillDialog } from "../_components/DeleteSkillDialog";
import { GetRouteType } from "@/actions/route_actions";
import { Badge } from "@/components/ui/badge";
import { Skill } from "@/db/schema";
import { UpdateSkillDialog } from "../_components/UpdateSkillDialog";
import { levelColors } from "..";
import { IconRenderer } from "@/components/icon-renderer";

export function SkillsList({
  skills,
  route,
  canEdit,
}: {
  skills: Skill[];
  route: GetRouteType;
  canEdit: boolean;
}) {
  return (
    <div className="space-y-2">
      {skills.map((skill) => (
        <div
          key={skill.skillName}
          className="flex items-center rounded-lg p-3 transition-colors duration-200 hover:bg-accent"
        >
          <div className="mr-4 rounded-full bg-primary/10 p-2 text-primary">
            <IconRenderer iconName={skill.iconName} />
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold">{skill.skillName}</h3>
            <p className="text-sm text-muted-foreground">
              {skill.yearOfExperience} years
            </p>
          </div>
          <section className='flex items-center gap-2'>

          <Badge
            className={`${levelColors[skill.levelOfProficiency]} capitalize`}
            variant="secondary"
            >
            {skill.levelOfProficiency}
          </Badge>
          {/* edit and delete */}
          {canEdit && (
            <>
              <UpdateSkillDialog skill={skill} />
              <DeleteSkillDialog skillId={skill.id} route={route} />
            </>
          )}
          </section>
        </div>
      ))}
    </div>
  );
}
