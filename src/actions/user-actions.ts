"use server";

import { db } from "@/db";
import { heroSection, routes, users, profiles } from "@/db/schema";
import { desc, eq, sql, and } from "drizzle-orm";

// GET
export const getAllUsers = async () => {
  const allUsers = await db
    .select({
      sno: sql<number>`ROW_NUMBER() OVER (ORDER BY ${routes.createdAt} ASC)`,
      fullName: heroSection.fullName,
      routeName: routes.routeName,
      avatarOptions: heroSection.avatarOptions,
      userType: users.userType,
    })
    .from(heroSection)
    .innerJoin(routes, eq(heroSection.routeId, routes.id))
    .innerJoin(users, eq(heroSection.userId, users.id))
    .orderBy(desc(routes.createdAt));

  return allUsers;
};

// POST
// UPDATE
// update user_Type to pro

export const updateUserTypeToPro = async (userId: number) => {
  const updatedUser = await db
    .update(users)
    .set({ userType: "pro" })
    .where(eq(users.id, userId))
    .returning();
  // invalidate cache
  return updatedUser;
};

// update user_Type to free
export const updateUserTypeToFree = async (userId: number) => {
  const updatedUser = await db
    .update(users)
    .set({ userType: "free" })
    .where(eq(users.id, userId))
    .returning();
  // invalidate cache
  return updatedUser;
};

type UserTypeFilter = "free" | "pro" | "all" | "only_loggedin";

export const getUserEmailsAndDisplayNames = async (
  userType: UserTypeFilter = "all",
) => {
  const baseQuery = db
    .select({
      email: users.email,
      displayName: profiles.displayName,
      userType: users.userType,
    })
    .from(users)
    .leftJoin(profiles, eq(users.id, profiles.userId));

  const results = await (userType === "only_loggedin"
    ? baseQuery.where(
        sql`NOT EXISTS (SELECT 1 FROM routes WHERE routes.user_id = ${users.id})`,
      )
    : userType === "free"
      ? baseQuery.where(
          and(
            eq(users.userType, "free"),
            sql`EXISTS (SELECT 1 FROM routes WHERE routes.user_id = ${users.id})`,
          ),
        )
      : userType !== "all"
        ? baseQuery.where(eq(users.userType, userType))
        : baseQuery);

  return results.map((user) => ({
    ...user,
    displayName: user.displayName
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
  }));
};

export type GetAllUsersType = Awaited<ReturnType<typeof getAllUsers>>;
