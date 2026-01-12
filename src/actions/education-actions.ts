"use server";

import { db } from "@/db";
import { NewEducation, routes, education } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Education cache key
const EDUCATION_CACHE_KEY = "education";

// Add education
export const addEducation = async (edu: NewEducation) => {
  const cacheKey = `${EDUCATION_CACHE_KEY}:${edu.routeName}`;
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const newEducation = await db
    .insert(education)
    .values({
      ...edu,
    })
    .returning()
    .get();

  revalidatePath("/");
  return newEducation;
};

// Get education
export const getEducation = async (routeName: string) => {
  const userEducation = await 
    db
      .select({
        id: education.id,
        userId: education.userId,
        routeId: education.routeId,
        level: education.level,
        institution: education.institution,
        location: education.location,
        degree: education.degree,
        stream: education.stream,
        customStream: education.customStream,
        board: education.board,
        status: education.status,
        startYear: education.startYear,
        endYear: education.endYear,
        yearOfCompletion: education.yearOfCompletion,
        scoreType: education.scoreType,
        scoreValue: education.scoreValue,
        routeName: education.routeName,
      })
      .from(education)
      .innerJoin(routes, eq(education.routeId, routes.id))
      .where(eq(routes.routeName, routeName))
  return userEducation;
};

// Update education
export const updateEducation = async (edu: NewEducation) => {
  const cacheKey = `${EDUCATION_CACHE_KEY}:${edu.routeName}`;

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  if (!edu.id) {
    throw new Error("Education ID is required for update");
  }

  const updatedEducation = await db
    .update(education)
    .set(edu)
    .where(eq(education.id, edu.id))
    .returning()
    .get();

  revalidatePath("/");
  return updatedEducation;
};

// Delete education
export const deleteEducation = async (id: number, routeName: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  await db.delete(education).where(eq(education.id, Number(id)));
  revalidatePath("/");
};

// GetEducationType
export type GetEducationType = Awaited<ReturnType<typeof getEducation>>;
