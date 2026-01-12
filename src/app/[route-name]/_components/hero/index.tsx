"use client";

import { useState } from "react";
import { HeroSection } from "@/db/schema";
import { User } from "@/lib/session";
import { useCanEditPortfolio } from "@/hooks/useCanEditPortfolio";
import { AvatarOptions } from "./_components/avatar-editor";
import { createAvatar, Options } from "@dicebear/core";
import { notionists } from "@dicebear/collection";
import EditHeroSectionDialog from "./_components/edit-hero-section-dialog";
import { GetRouteType } from "@/actions/route_actions";
import { AvatarSection, SocialLinks, UserInfo } from "./_components";
import { ClassicLayout, SidekickLayout, SpotlightLayout, MinimalistLayout, BannerLayout, ModernLayout, DynamicLayout, ElegantLayout } from "./_layouts";
import SelectLayouts from "./_components/select-layouts";

type HeroProps = {
  route: GetRouteType;
  heroSection: HeroSection;
  user: User | undefined;
  isProjectsEmpty?: boolean;
  layoutStyle: HeroLayoutStyle | undefined | null;
};

export type HeroLayoutStyle =
  | "classic"
  | "spotlight"
  | "sidekick"
  | "minimalist"
  | "banner"
  | "modern"
  | "dynamic"
  | "elegant";

export function Hero({
  route,
  heroSection,
  user,
  isProjectsEmpty,
  layoutStyle: heroLayoutStyle,
}: HeroProps) {
  const canEdit = useCanEditPortfolio(user?.id, route?.userId);
  const [avatarOptions, setAvatarOptions] = useState<AvatarOptions>(
    heroSection.avatarOptions as AvatarOptions,
  );

  const [layoutStyle, setLayoutStyle] = useState<HeroLayoutStyle>(
    heroLayoutStyle || "classic",
  );

  const avatar = createAvatar(
    notionists,
    avatarOptions as Partial<Options & Options>,
  );
  const svg = avatar.toString();


  const renderContent = () => {
    const layoutProps = {
      userInfo: <UserInfo heroSection={heroSection} isProjectsEmpty={isProjectsEmpty} />,
      avatarSection: <AvatarSection imageSrc="/images/placeholder.svg" svg={svg} />,
      socialLinks: <SocialLinks heroSection={heroSection} />,
      heroSection
    };

    switch (layoutStyle) {
      case "classic":
        return <ClassicLayout {...layoutProps} />;
      case "spotlight":
        return <SpotlightLayout {...layoutProps} />;
      case "sidekick":
        return <SidekickLayout {...layoutProps} />;
      case "minimalist":
        return <MinimalistLayout {...layoutProps} />;
      case "banner":
        return <BannerLayout {...layoutProps} />;
      case "modern":
        return <ModernLayout {...layoutProps} />;
      case "dynamic":
        return <DynamicLayout {...layoutProps} />;
      case "elegant":
        return <ElegantLayout {...layoutProps} />;
    }
  };

  return (
    <div id="about-me" className="relative w-full">
      <div className="absolute left-0 top-0 z-20 w-full py-3">
        <section className="container mx-auto flex justify-between gap-4 px-4 lg:justify-end lg:px-8">
          <SelectLayouts
            route={route}
            layoutStyle={layoutStyle}
            setLayoutStyle={setLayoutStyle}
          />
          {user && canEdit && (
            <EditHeroSectionDialog
              {...{ avatarOptions, setAvatarOptions }}
              routeId={heroSection.routeId}
              heroSection={heroSection}
              user={user}
              routeName={route?.routeName || ""}
            />
          )}
        </section>
      </div>
      <div className="">{renderContent()}</div>
    </div>
  );
}
