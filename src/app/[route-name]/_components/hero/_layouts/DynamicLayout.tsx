import { Badge } from "@/components/ui/badge";
import { LayoutProps } from "./types";

export function DynamicLayout({ avatarSection, socialLinks, heroSection }: LayoutProps) {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 p-8 lg:p-12">
        <div className="bg-grid-white/10 absolute inset-0 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))]" />
        <div className="relative z-10 flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          <div className="lg:w-1/3">
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105">
              {avatarSection}
            </div>
          </div>
          <div className="space-y-6 text-center lg:w-2/3 lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
              {heroSection.fullName}
            </h1>
            <p className="text-2xl font-medium text-primary">{heroSection.title}</p>
            <p className="text-lg text-muted-foreground">
              {heroSection.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {heroSection.skills?.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-primary/10 text-sm transition-colors duration-200 hover:bg-primary/20"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex justify-center gap-4 lg:justify-start">
              {socialLinks}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}