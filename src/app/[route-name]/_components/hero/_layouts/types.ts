import { HeroSection } from "@/db/schema";

export type LayoutProps = {
  userInfo: React.ReactNode;
  avatarSection: React.ReactNode;
  socialLinks: React.ReactNode;
  heroSection: HeroSection;
};