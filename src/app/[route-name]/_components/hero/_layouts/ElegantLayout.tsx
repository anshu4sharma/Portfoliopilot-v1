import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutProps } from "./types";

export function ElegantLayout({ avatarSection, socialLinks, heroSection }: LayoutProps) {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 lg:p-12">
              <div className="mb-8 flex justify-center md:justify-start">
                <div className="h-48 w-48 overflow-hidden rounded-full shadow-lg ring-4 ring-primary/20">
                  {avatarSection}
                </div>
              </div>
              <div className="space-y-4 text-center md:text-left">
                <h1 className="text-3xl font-bold lg:text-5xl">
                  {heroSection.fullName}
                </h1>
                <p className="text-xl text-primary lg:text-2xl">
                  {heroSection.title}
                </p>
              </div>
            </div>
            <div className="p-8 lg:p-12">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground">
                  {heroSection.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {heroSection.skills?.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-4">{socialLinks}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}