"use server";

import { db } from "@/db";
import { contactMe } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// TODO: Add a function to get the contact me section for a user

export async function getContactMe(routeName: string) {
  const contactMeSection = await db.query.contactMe.findFirst({
    where: eq(contactMe.routeName, routeName),
  });
  return contactMeSection;
}

export async function updateContactMe(
  userId: number,
  routeName: string,
  data: {
    introText?: string;
    contactEmail?: string;
    emailTemplate?: string;
  },
) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("You are not authenticated");
  }

  try {
    const result = await db
      .update(contactMe)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(
        and(eq(contactMe.userId, userId), eq(contactMe.routeName, routeName)),
      )
      .returning();

    if (!result || result.length === 0) {
      throw new Error("Failed to update contact section");
    }

    revalidatePath("/");
    return result[0];
  } catch (error) {
    console.error("Failed to update contact section:", error);
    throw error;
  }
}
