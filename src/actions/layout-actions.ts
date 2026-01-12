"use server";

import { db } from "@/db";
import { layout, Layout, routes } from "@/db/schema";
import { getCurrentUser } from "@/lib/session";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type LayoutStyleUpdate = {
  heroSectionLayoutStyle?: Layout["heroSectionLayoutStyle"];
  projectLayoutStyle?: Layout["projectLayoutStyle"];
  workExperienceLayoutStyle?: Layout["workExperienceLayoutStyle"];
  skillsLayoutStyle?: Layout["skillsLayoutStyle"];
};

const LAYOUT_CACHE_KEY = "layout";

// GET
export const getLayoutStyle = async (routeName: string) => {
  const layoutStyle = await db
    .select()
    .from(layout)
    .innerJoin(routes, eq(layout.routeId, routes.id))
    .where(eq(routes.routeName, routeName))
    .get();
  return layoutStyle;
};

// PUT
export const updateLayoutStyle = async (
  routeId: number,
  styleUpdate: LayoutStyleUpdate,
  routeName: string,
) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  // Check if a layout entry exists for this route
  let existingLayout = await db
    .select()
    .from(layout)
    .where(eq(layout.routeId, routeId))
    .get();

  if (!existingLayout) {
    // If no layout exists, create a new one with the provided style(s)
    existingLayout = await db
      .insert(layout)
      .values({
        routeId,
        userId: user.id,
        ...styleUpdate,
      })
      .returning()
      .get();
  } else {
    // If layout exists, update only the provided style(s)
    await db.update(layout).set(styleUpdate).where(eq(layout.routeId, routeId));
  }

  revalidatePath("/");
  return existingLayout;
};
