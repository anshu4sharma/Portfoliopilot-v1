import { Badge } from "@/components/ui/badge";
import { LayoutProps } from "./types";

export function MinimalistLayout({ avatarSection, socialLinks, heroSection }: LayoutProps) {
  return (
    <div className="container mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 py-8 sm:px-8">
      <div className="h-32 w-32 overflow-hidden rounded-full ring-2 ring-primary/20">
        {avatarSection}
      </div>
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">{heroSection.fullName}</h1>
        <p className="text-xl text-primary">{heroSection.title}</p>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          {heroSection.description}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {heroSection.skills?.map((skill, index) => (
          <Badge key={index} variant="outline">
            {skill}
          </Badge>
        ))}
      </div>
      <div className="flex gap-4">{socialLinks}</div>
    </div>
  );
}