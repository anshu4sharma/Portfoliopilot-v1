// src/scripts/add-contact-me-entries.ts
import { db } from "@/db";
import { contactMe, routes, users } from "@/db/schema";
import { eq } from "drizzle-orm";

const DEFAULT_INTRO_TEXT =
  "I'm always eager to discuss new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out if you'd like to collaborate or simply have a chat about the latest in web development and design.";

const DEFAULT_EMAIL_TEMPLATE = `Dear Portfolio Owner,

You have received a new message from your portfolio contact form:

Name: {name}
Email: {email}

Message:
{message}

Best regards,
Your Portfolio Contact Form`.trim();

export async function addContactMeForAllRoutes() {
  try {
    // Fetch all routes with their associated users
    const allRoutes = await db.query.routes.findMany();

    // Create an array to hold contact me entries
    const contactMeEntries = [];

    // Iterate through routes and create contact me entries
    for (const route of allRoutes) {
      // Check if contact me entry already exists for this route
      const existingContactMe = await db.query.contactMe.findFirst({
        where: eq(contactMe.routeId, route.id),
      });
      const user = await db.query.users.findFirst({
        where: eq(users.id, route.userId),
      });

      // If no existing entry, prepare a new one
      if (!existingContactMe) {
        contactMeEntries.push({
          userId: route.userId,
          routeId: route.id,
          routeName: route.routeName,
          introText: DEFAULT_INTRO_TEXT,
          contactEmail: user?.email || "",
          emailTemplate: DEFAULT_EMAIL_TEMPLATE,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    // Bulk insert contact me entries
    if (contactMeEntries.length > 0) {
      await db.insert(contactMe).values(contactMeEntries);
      console.log(
        `Successfully added ${contactMeEntries.length} contact me entries`,
      );
    } else {
      console.log("No new contact me entries to add");
    }
  } catch (error) {
    console.error("Error adding contact me entries:", error);
    throw error;
  }
}

// Uncomment to run the migration
// addContactMeForAllRoutes();
