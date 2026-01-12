import { Badge } from "@/components/ui/badge";
import { LayoutProps } from "./types";

export function ModernLayout({ avatarSection, socialLinks, heroSection }: LayoutProps) {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight">
            {heroSection.fullName}
          </h1>
          <p className="text-2xl font-medium text-primary">{heroSection.title}</p>
          <p className="text-lg text-muted-foreground">
            {heroSection.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {heroSection.skills?.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex gap-4">{socialLinks}</div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative h-64 w-64 overflow-hidden rounded-full shadow-2xl ring-4 ring-primary/20">
            {avatarSection}
          </div>
        </div>
      </div>
    </div>
  );
}