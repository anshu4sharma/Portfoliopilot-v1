import { db } from "@/db";
import { routes } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function resolveLinkPath(
  identifier: string,
  type: "subdomain" | "path",
) {
  const link = await db.query.routes.findFirst({
    where: (routes) => and(
      type === "subdomain"
        ? eq(routes.routeName, identifier)
        : eq(routes.id, parseInt(identifier, 10)),
      eq(routes.isSubDomainActive, true)
    ),
  });

  return link;
}
