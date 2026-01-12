 import { Badge } from "@/components/ui/badge";
import { LayoutProps } from "./types";

export function BannerLayout({ avatarSection, socialLinks, heroSection }: LayoutProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground">
      <div className="bg-grid-white/10 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
      <div className="container relative z-10 flex flex-col items-center gap-8 p-8 px-4 sm:px-8 lg:flex-row lg:p-16">
        <div className="h-48 w-48 overflow-hidden rounded-full shadow-2xl ring-4 ring-primary/20">
          {avatarSection}
        </div>
        <div className="flex-1 text-center lg:text-left">
          <h1 className="mb-2 text-4xl font-bold lg:text-6xl">
            {heroSection.fullName}
          </h1>
          <p className="mb-4 text-xl text-primary lg:text-2xl">
            {heroSection.title}
          </p>
          <p className="mb-6 max-w-2xl text-lg">{heroSection.description}</p>
          <div className="mb-4 flex flex-wrap justify-center gap-2 lg:justify-start">
            {heroSection.skills?.map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 lg:justify-start">
            {socialLinks}
          </div>
        </div>
      </div>
    </div>
  );
}