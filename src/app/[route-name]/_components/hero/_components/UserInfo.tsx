import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { HeroSection } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Briefcase, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";

type UserInfoProps = {
  heroSection: HeroSection;
  isProjectsEmpty?: boolean;
};

export function UserInfo({ heroSection, isProjectsEmpty }: UserInfoProps) {
  return (
    <div className="flex-1 space-y-6">
      <div>
        <h1 className="text-4xl font-bold leading-tight md:text-5xl">
          {heroSection.fullName}
        </h1>
        <p className="text-xl text-primary sm:text-3xl md:text-2xl">
          {heroSection.title && `{ ${heroSection.title} }`}
        </p>
      </div>
      <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-4xl">
        {heroSection.tagline}
      </h2>
      <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
        {heroSection.description}
      </p>
      <div className="space-y-3">
        {heroSection.email && (
          <Link
            href={`mailto:${heroSection.email}`}
            target="_blank"
            className="flex items-center space-x-2 text-blue-400 hover:underline"
          >
            <Mail className="h-4 w-4" />
            <span className="text-sm">{heroSection.email}</span>
          </Link>
        )}
        {heroSection.skills && (
          <div className="flex items-center space-x-2">
            <div className="size-4">
              <Briefcase className="h-4 w-4" />
            </div>
            <div className="flex flex-wrap gap-2">
              {heroSection.skills.map((skill: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {heroSection.phoneNumber && (
          <Link
            href={`tel:${heroSection.phoneNumber}`}
            className="flex items-center space-x-2 text-blue-400 hover:underline"
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm">{heroSection.phoneNumber}</span>
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-4 sm:flex-row lg:justify-start">
        {!isProjectsEmpty && (
          <Link
            href="#projects"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full sm:max-w-[265px]"
            )}
          >
            View Projects
          </Link>
        )}
      </div>
    </div>
  );
} 