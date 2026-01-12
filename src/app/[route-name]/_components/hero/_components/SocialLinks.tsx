import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HeroSection } from "@/db/schema";
import { Github, Linkedin, Mail, Phone, Youtube } from "lucide-react";
import Link from "next/link";

type SocialLinksProps = {
  heroSection: HeroSection;
};

export function SocialLinks({ heroSection }: SocialLinksProps) {
  return (
    <>
      {heroSection.github && (
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={heroSection.github}
              target="_blank"
              className="text-muted-foreground hover:text-primary"
            >
              <Github className="h-6 w-6" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{heroSection.github}</p>
          </TooltipContent>
        </Tooltip>
      )}
      {heroSection.linkedIn && (
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={heroSection.linkedIn}
              target="_blank"
              className="text-muted-foreground hover:text-primary"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{heroSection.linkedIn}</p>
          </TooltipContent>
        </Tooltip>
      )}
      {heroSection.youtube && (
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={heroSection.youtube}
              target="_blank"
              className="text-muted-foreground hover:text-primary"
            >
              <Youtube className="h-6 w-6" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{heroSection.youtube}</p>
          </TooltipContent>
        </Tooltip>
      )}
      {heroSection.email && (
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={`mailto:${heroSection.email}`}
              target="_blank"
              className="text-muted-foreground hover:text-primary"
            >
              <Mail className="h-6 w-6" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{heroSection.email}</p>
          </TooltipContent>
        </Tooltip>
      )}
      {heroSection.phoneNumber && (
        <Tooltip>
          <TooltipTrigger>
            <Link
              href={`tel:${heroSection.phoneNumber}`}
              className="text-muted-foreground hover:text-primary"
            >
              <Phone className="h-6 w-6" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>{heroSection.phoneNumber}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
} 