"use server";

import { db } from "@/db";
import { workExperiences, routes, WorkExperience } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const WORK_EXPERIENCES_CACHE_KEY = "workExperiences";

// GET
export const getWorkExperiences = async (routeName: string) => {
  const cacheKey = `${WORK_EXPERIENCES_CACHE_KEY}:${routeName}`;
  const userWorkExperiences = await db
        .select({
          id: workExperiences.id,
          userId: workExperiences.userId,
          routeId: workExperiences.routeId,
          jobTitle: workExperiences.jobTitle,
          companyName: workExperiences.companyName,
          location: workExperiences.location,
          startDate: workExperiences.startDate,
          endDate: workExperiences.endDate,
          isPresent: workExperiences.isPresent,
          jobDescription: workExperiences.jobDescription,
        })
        .from(workExperiences)
        .innerJoin(routes, eq(workExperiences.routeId, routes.id))
        .where(eq(routes.routeName, routeName))
        .orderBy(desc(workExperiences.startDate));

  return userWorkExperiences;
};

export const addWorkExperience = async (
  workExperienceData: WorkExperience,
  routeName: string,
) => {
  const cacheKey = `${WORK_EXPERIENCES_CACHE_KEY}:${routeName}`;
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  if (
    user.userType !== "pro" &&
    (await getWorkExperiences(routeName)).length >= 3
  ) {
    throw new Error("Max work experiences reached. Upgrade to Pro for more.");
  }

  const newWorkExperience = await db
    .insert(workExperiences)
    .values({
      ...workExperienceData,
      userId: user.id,
    })
    .returning();

  // Invalidate the cache
  revalidatePath("/");

  return newWorkExperience[0];
};

export const updateWorkExperience = async (
  workExperienceData: WorkExperience,
  routeName: string,
) => {
  const cacheKey = `${WORK_EXPERIENCES_CACHE_KEY}:${routeName}`;

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  if (!workExperienceData.id) {
    throw new Error("Work Experience ID is required for updating");
  }

  if (user.userType !== "pro") {
    throw new Error("Only Pro Users Have edit Permission");
  }

  const existingWorkExperience = await db
    .select()
    .from(workExperiences)
    .where(eq(workExperiences.id, workExperienceData.id!))
    .get();

  if (!existingWorkExperience || existingWorkExperience.userId !== user.id) {
    throw new Error(
      "You do not have permission to update this work experience",
    );
  }

  const updatedWorkExperience = await db
    .update(workExperiences)
    .set({
      jobTitle: workExperienceData.jobTitle,
      companyName: workExperienceData.companyName,
      location: workExperienceData.location,
      startDate: workExperienceData.startDate,
      endDate: workExperienceData.endDate,
      isPresent: workExperienceData.isPresent,
      jobDescription: workExperienceData.jobDescription,
    })
    .where(eq(workExperiences.id, workExperienceData.id!))
    .returning();

  revalidatePath("/");
  return updatedWorkExperience[0];
};

export const deleteWorkExperience = async (
  workExperienceId: number,
  routeName: string,
) => {
  const cacheKey = `${WORK_EXPERIENCES_CACHE_KEY}:${routeName}`;
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const existingWorkExperience = await db
    .select()
    .from(workExperiences)
    .where(eq(workExperiences.id, workExperienceId))
    .get();

  if (!existingWorkExperience || existingWorkExperience.userId !== user.id) {
    throw new Error(
      "You do not have permission to delete this work experience",
    );
  }

  await db
    .delete(workExperiences)
    .where(eq(workExperiences.id, workExperienceId));

  revalidatePath("/");
};
