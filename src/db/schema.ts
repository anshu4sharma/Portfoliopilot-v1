import { AvatarOptions } from "@/app/[route-name]/_components/hero/_components/avatar-editor";
import { sql } from "drizzle-orm";
import { integer, text, sqliteTableCreator } from "drizzle-orm/sqlite-core";

export const accountTypeEnum = ["email", "google", "github"] as const;

// const sqliteTable = sqliteTableCreator((name) => `app_${name}`);
const sqliteTable = sqliteTableCreator((name) => `${name}`);

export const users = sqliteTable("user", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  email: text("email").unique(),
  emailVerified: integer("email_verified", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  userType: text("user_type").default("free"), // 'free' or 'pro'
  role: text("role").default("user"), // 'user' or 'admin' or 'moderator'
});

export const accounts = sqliteTable("accounts", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  accountType: text("account_type", { enum: accountTypeEnum }).notNull(),
  githubId: text("github_id").unique(),
  googleId: text("google_id").unique(),
  password: text("password"),
  salt: text("salt"),
});
// no need for this
export const magicLinks = sqliteTable("magic_links", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  token: text("token"),
  tokenExpiresAt: integer("token_expires_at", { mode: "timestamp" }).notNull(),
});
// no need for this
export const resetTokens = sqliteTable("reset_tokens", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  token: text("token"),
  tokenExpiresAt: integer("token_expires_at", { mode: "timestamp" }).notNull(),
});
// no need for this
export const verifyEmailTokens = sqliteTable("verify_email_tokens", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  token: text("token"),
  tokenExpiresAt: integer("token_expires_at", { mode: "timestamp" }).notNull(),
});

export const profiles = sqliteTable("profile", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .unique()
    .notNull(),
  displayName: text("display_name"),
  imageId: text("image_id"),
  image: text("image"),
  bio: text("bio").notNull().default(""),
});

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  expiresAt: integer("expires_at").notNull(),
});

//  my tables //
// *********************//

export const routes = sqliteTable("routes", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  routeName: text("route_name").notNull().unique(),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  // i need a defaul tofr for issubdomain is false

  isSubDomainActive: integer("is_subdomain_active", { mode: "boolean" })
    .notNull()
    .default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});
export const heroSection = sqliteTable("hero_section", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  tagline: text("tagline"),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  fullName: text("full_name").notNull(),
  description: text("description").notNull(),
  email: text("email").notNull(),
  // skills shoudle be arra
  skills: text("skills", { mode: "json" })
    .$type<string[]>()
    .default(sql`(json_array())`),
  // skills: text("skills"),
  phoneNumber: text("phone_number"),
  linkedIn: text("linkedin"),
  github: text("github"),
  youtube: text("youtube"),
  personalLinks: text("personal_links", { mode: "json" })
    .$type<{ name: string; url: string }[]>()
    .default(sql`(json_array())`),
  avatarOptions: text("avatar_options", { mode: "json" })
    .$type<AvatarOptions>()
    .default(sql`(json_object())`),

  routeId: integer("route_id", { mode: "number" })
    .references(() => routes.id, {
      onDelete: "cascade",
    })
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export const projects = sqliteTable("projects", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  routeId: integer("route_id", { mode: "number" })
    .references(() => routes.id, {
      onDelete: "cascade",
    })
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  cloudinaryPublicId: text("cloudinary_public_id"),
  tags: text("tags", { mode: "json" })
    .notNull()
    .$type<string[]>()
    .default(sql`(json_array())`),
  liveLink: text("live_link"),
  codeLink: text("code_link"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

// work experience
// routeId

export const workExperiences = sqliteTable("work_experiences", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  routeId: integer("route_id", { mode: "number" })
    .references(() => routes.id, {
      onDelete: "cascade",
    })
    .notNull(),
  jobTitle: text("job_title").notNull(),
  companyName: text("company_name").notNull(),
  location: text("location").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  isPresent: integer("is_present", { mode: "boolean" }).notNull(),
  jobDescription: text("job_description").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

// reserved routes
export const reservedRoutes = sqliteTable("reserved_routes", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  routeName: text("route_name").notNull().unique(),
});

// not using this this in our app
export const projectImages = sqliteTable("project_images", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  projectId: integer("project_id", { mode: "number" })
    .references(() => projects.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
  routeId: integer("route_id", { mode: "number" })
    .references(() => routes.id, {
      onDelete: "cascade",
    })
    .notNull(),
  url: text("url").notNull(),
  created_at: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updated_at: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

// Define your 'images' table
export const images = sqliteTable("images", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  routeId: integer("route_id", { mode: "number" })
    .references(() => routes.id, {
      onDelete: "cascade",
    })
    .notNull(),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, {
      onDelete: "cascade",
    })
    .notNull(),
});
export const donations = sqliteTable("donations", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),

  userName: text("user_name").notNull(),
  phoneNo: text("phone_no").notNull(),
  email: text("email").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  amount: integer("amount").notNull(),
  status: text("status").notNull(),
  paymentId: text("payment_id"),
  paymentMethod: text("payment_method").notNull(),
});

// layouts
export const layout = sqliteTable("layout", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  routeId: integer("route_id", { mode: "number" })
    .references(() => routes.id, { onDelete: "cascade" })
    .notNull(),
  heroSectionLayoutStyle: text("hero_section_layout_style", {
    enum: [
      "classic",
      "spotlight",
      "sidekick",
      "minimalist",
      "banner",
      "modern",
      "dynamic",
      "elegant",
    ],
  }).default("classic"),
  projectLayoutStyle: text("project_layout_style", {
    enum: [
      "grid",
      "masonry",
      "showcase",
      "alternating",
      "compact",
      "carousel",
      "interactiveGrid",
      "timeline",
    ],
  }).default("grid"),
  workExperienceLayoutStyle: text("work_experience_layout_style", {
    enum: ["cards", "list", "grid"],
  }).default("cards"),

  skillsLayoutStyle: text("skills_layout_style", {
    enum: ["grid", "list", "compact"],
  }).default("compact"),

  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

// payments table
export const payments = sqliteTable("payments", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull(),
  status: text("status").notNull(),
  paymentMethod: text("payment_method").notNull(),
  paymentId: text("payment_id"),
  userPhoneNo: text("user_phone_no"),
  userEmail: text("user_email"),
  userName: text("user_name"),
  timeZone: text("time_zone"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

// // skills
export const skills = sqliteTable("skills", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  skillName: text("skill_name").notNull(),
  iconName: text("icon_name"),
  yearOfExperience: integer("year_of_experience").notNull(),
  levelOfProficiency: text("level_of_proficiency", {
    enum: ["beginner", "intermediate", "advanced", "expert"],
  }).notNull(),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  routeId: integer("route_id", { mode: "number" })
    .references(() => routes.id, { onDelete: "cascade" })
    .notNull(),
  routeName: text("route_name"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

// education

// education
export const education = sqliteTable("education", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  level: text("level").notNull(),
  customTitle: text("custom_title"),
  institution: text("institution").notNull(),
  location: text("location").notNull(),
  degree: text("degree"),
  stream: text("stream"),
  customStream: text("custom_stream"),
  board: text("board"),
  status: text("status", {
    enum: ["Pursuing", "Completed"],
  }),
  startYear: integer("start_year"),
  endYear: integer("end_year"),
  yearOfCompletion: integer("year_of_completion"),
  scoreType: text("score_type", {
    enum: ["Percentage", "CGPA 10", "CGPA 7", "CGPA 5", "CGPA 4"],
  }),
  scoreValue: integer("score_value"),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  routeId: integer("route_id", { mode: "number" })
    .references(() => routes.id, { onDelete: "cascade" })
    .notNull(),
  routeName: text("route_name"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

// contact me
export const contactMe = sqliteTable("contact_me", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" })
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  routeId: integer("route_id", { mode: "number" })
    .references(() => routes.id, { onDelete: "cascade" })
    .notNull(),
  routeName: text("route_name"),
  introText: text("intro_text"),
  contactEmail: text("contact_email"),
  emailTemplate: text("email_template"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(
    sql`CURRENT_TIMESTAMP`,
  ),
});

export type Donation = typeof donations.$inferSelect;
export type NewDonation = typeof donations.$inferInsert;

export type Image = typeof images.$inferSelect;
export type NewImage = typeof images.$inferInsert;

export type ReservedRoute = typeof reservedRoutes.$inferSelect;
export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type HeroSection = typeof heroSection.$inferInsert;
export type Project = typeof projects.$inferInsert;

export type UserRoute = typeof routes.$inferSelect;
export type WorkExperience = typeof workExperiences.$inferInsert;
//

//
export type ProjectImage = typeof projectImages.$inferSelect;
export type NewProjectImage = typeof projectImages.$inferInsert;
export type Session = typeof sessions.$inferSelect;

export type Layout = typeof layout.$inferSelect;
export type NewLayout = typeof layout.$inferInsert;

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

// skills
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;

// education
export type Education = typeof education.$inferSelect;
export type NewEducation = typeof education.$inferInsert;

// contact me
export type ContactMe = typeof contactMe.$inferSelect;
export type NewContactMe = typeof contactMe.$inferInsert;
