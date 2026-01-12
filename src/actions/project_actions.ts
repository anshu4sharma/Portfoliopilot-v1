"use server";
import { db } from "@/db";
import { images, Project, projects, routes } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

const PROJECTS_CACHE_KEY = "projects";

// GET
export const getProjects = async (routeName: string) => {
  const cacheKey = `${PROJECTS_CACHE_KEY}:${routeName}`;
  const userProjects = await db
    .select({
      title: projects.title,
      userId: projects.userId,
      description: projects.description,
      id: projects.id,
      imageUrl: projects.imageUrl,
      tags: projects.tags,
      liveLink: projects.liveLink,
      routeId: projects.routeId,
      codeLink: projects.codeLink,
    })
    .from(projects)
    .innerJoin(routes, eq(projects.routeId, routes.id))
    .where(eq(routes.routeName, routeName));
  return userProjects;
};

// POST
export const addProject = async (
  projectData: Omit<Project, "id" | "cloudinaryPublicId">,
  routeName: string,
) => {
  const cacheKey = `${PROJECTS_CACHE_KEY}:${routeName}`;

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  if (user.userType !== "pro" && (await getProjects(routeName)).length >= 3) {
    throw new Error("Max projects reached. Upgrade to Pro for more.");
  }

  // Insert project into database
  const newProject = await db
    .insert(projects)
    .values({
      ...projectData,
    })
    .returning()
    .get();

  revalidatePath("/");
  return newProject;
};

// PUT
export const updateProject = async (
  projectId: number,
  projectData: Partial<Project>,
  routeName: string,
) => {
  const cacheKey = `${PROJECTS_CACHE_KEY}:${routeName}`;

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  if (user.userType !== "pro") {
    throw new Error("Only Pro Users Have edit Permission");
  }

  const existingProject = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId))
    .get();

  if (!existingProject || existingProject.userId !== user.id) {
    throw new Error("You do not have permission to update this project");
  }
  if (existingProject.imageUrl) {
    await db.delete(images).where(eq(images.url, existingProject.imageUrl));
  }

  // Update project in database
  const updatedProject = await db
    .update(projects)
    .set(projectData)
    .where(eq(projects.id, projectId))
    .returning()
    .get();

  // Invalidate the cache
  revalidatePath("/");
  return updatedProject;
};

// DELETE
export const deleteProject = async (projectId: number, routeName: string) => {
  const cacheKey = `${PROJECTS_CACHE_KEY}:${routeName}`;

  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const existingProject = await db
    .select()
    .from(projects)
    .where(eq(projects.id, projectId))
    .get();
    
  if (!existingProject || existingProject.userId !== user.id) {
    throw new Error("You do not have permission to delete this project");
  }
  if (existingProject.imageUrl) {
    await db.delete(images).where(eq(images.url, existingProject.imageUrl));
  }
  await db.delete(projects).where(eq(projects.id, projectId));

  revalidatePath("/");
};
