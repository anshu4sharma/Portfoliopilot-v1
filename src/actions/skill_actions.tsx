// skills actions
"use server";

import { db } from "@/db";
import { NewSkill, routes, skills } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// add skill
const SKILLS_CACHE_KEY = "skills";

export const addSkill = async (skill: NewSkill) => {
  const cacheKey = `${SKILLS_CACHE_KEY}:${skill.routeName}`;
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  // check for pro 
  if (user.userType !== "pro") {
    throw new Error("User is not a pro");
  }

  const newSkill = await db
    .insert(skills)
    .values({
      ...skill,
    })
    .returning()
    .get();

  revalidatePath("/");
  return newSkill;
};

// export const skills = sqliteTable("skills", {
//   id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
//   skillName: text("skill_name").notNull(),
//   iconName: text("icon_name"),
//   yearOfExperience: integer("year_of_experience").notNull(),
//   levelOfProficiency: text("level_of_proficiency", {
//     enum: ["beginner", "intermediate", "advanced", "expert"],
//   }).notNull(),
//   userId: integer("user_id", { mode: "number" })
//     .references(() => users.id, { onDelete: "cascade" })
//     .notNull(),
//   routeId: integer("route_id", { mode: "number" })
//     .references(() => routes.id, { onDelete: "cascade" })
//     .notNull(),
//   routeName: text("route_name"),
//   createdAt: integer("created_at", { mode: "timestamp" }).default(
//     sql`CURRENT_TIMESTAMP`,
//   ),
//   updatedAt: integer("updated_at", { mode: "timestamp" }).default(
//     sql`CURRENT_TIMESTAMP`,
//   ),
// });

// get skills
// GET
export const getSkills = async (routeName: string) => {
  const cacheKey = `${SKILLS_CACHE_KEY}:${routeName}`;
  const userSkills = await
    db
      .select({
        id: skills.id,
        userId: skills.userId,
        routeId: skills.routeId,
        skillName: skills.skillName,
        iconName: skills.iconName,
        yearOfExperience: skills.yearOfExperience,
        levelOfProficiency: skills.levelOfProficiency,
        routeName: skills.routeName,
      })
      .from(skills)
      .innerJoin(routes, eq(skills.routeId, routes.id))
      .where(eq(routes.routeName, routeName));

  return userSkills;
};

// update

export const updateSkill = async (skill: NewSkill) => {
  const cacheKey = `${SKILLS_CACHE_KEY}:${skill.routeName}`;

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  if (!skill.id) {
    throw new Error("Skill ID is required for update");
  }

  const updatedSkill = await db
    .update(skills)
    .set(skill)
    .where(eq(skills.id, skill.id))
    .returning()
    .get();
  revalidatePath("/");
  return updatedSkill;
};

// delete

export const deleteSkill = async (skillId: number, routeName: string) => {
  const cacheKey = `${SKILLS_CACHE_KEY}:${routeName}`;
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  await db.delete(skills).where(eq(skills.id, skillId));
  revalidatePath("/");
};
