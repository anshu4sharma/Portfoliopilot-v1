import {
  GetRouteType,
  getUserRouteByRouteName,
  getUserRouteByUserId,
} from "@/actions/route_actions";

import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";
import React from "react";
import { getHeroSectionData } from "@/actions/hero_actions";
import { getWorkExperiences } from "@/actions/workExperience-actions";
import { getLayoutStyle } from "@/actions/layout-actions";
import { getProjects } from "@/actions/project_actions";
import { Hero } from "@/app/[route-name]/_components/hero";
import AddHeroSection from "@/app/[route-name]/_components/add-hero-section";
import { ProjectsSection } from "@/app/[route-name]/_components/projects-section";
import { WorkExperienceSection } from "@/app/[route-name]/_components/work-experience-section";
import { SkillsSection } from "@/app/[route-name]/_components/skills";
import { getSkills } from "@/actions/skill_actions";
import { ContactMe, Education, Skill } from "@/db/schema";
import { EducationSection } from "@/app/[route-name]/_components/education";
import { getEducation } from "@/actions/education-actions";
import { ContactSection } from "@/app/[route-name]/_components/contact-us";
import { getContactMe } from "@/actions/contact-me-actions";

type Props = {
  routeName?: string;
};

export default async function Portfolio({ routeName }: Props) {
  const user = await getCurrentUser();

  const route = routeName
    ? await getUserRouteByRouteName(routeName)
    : await getUserRouteByUserId(user?.id ?? 0);

  if (!route) notFound();

  const heroSection = await getHeroSectionData(route.routeName);
  const projects = await getProjects(route.routeName);
  const workExperiences = await getWorkExperiences(route.routeName);
  const layoutStyle = await getLayoutStyle(route.routeName);
  const skills = await getSkills(route.routeName);
  const education = await getEducation(route.routeName);
  // const isUserIsPro = route?.userType === "pro";
  const contactMe = await getContactMe(route.routeName);

  return (
    <>
      {/* Hero Section */}
      {heroSection ? (
        <Hero
          user={user}
          layoutStyle={layoutStyle?.layout?.heroSectionLayoutStyle}
          isProjectsEmpty={projects?.length === 0}
          heroSection={heroSection.hero_section}
          route={route as GetRouteType}
        />
      ) : (
        <AddHeroSection userId={user?.id} routeUserId={route.userId} />
      )}

      {/* Skills Section */}
      {/* {isUserIsPro && ( */}
      <SkillsSection
        layoutStyle={layoutStyle?.layout?.skillsLayoutStyle}
        route={route}
        user={user}
        skills={skills as Skill[]}
      />
      {/* // )} */}

      {/* Projects Section */}
      <ProjectsSection
        layoutStyle={layoutStyle?.layout?.projectLayoutStyle}
        projects={projects}
        user={user}
        route={route}
      />

      {/* Work Experience Section */}

      <WorkExperienceSection
        layoutStyle={layoutStyle?.layout?.workExperienceLayoutStyle}
        user={user}
        route={route}
        workExperiences={workExperiences}
      />

      {/* Education Section */}
      {/* {isUserIsPro && ( */}
      <EducationSection
        user={user}
        route={route}
        education={education as Education[]}
      />
      {/* )} */}

      {/* Contact Section */}
      {/* {isUserIsPro && ( */}
      <ContactSection
        route={route}
        user={user}
        contactMe={contactMe as ContactMe}
        heroSectionEmail={heroSection?.hero_section?.email || ""}
      />
      {/* )} */}
    </>
  );
}
