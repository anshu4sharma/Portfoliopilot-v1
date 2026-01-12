"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Smartphone,
  Award,
  Target,
  Image,
  MousePointerClick,
  Newspaper,
  BarChart2,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

interface FeaturesProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: Award,
    title: "Custom Subdomains for Personal Branding",
    description:
      "Strengthen your identity with personalized URLs like username.portfoliopilot.in.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Friendly Design",
    description:
      "Your portfolio looks great on any device, ensuring a seamless experience for all visitors.",
  },
  {
    icon: Target,
    title: "Built-in SEO Optimization",
    description:
      "Improve discoverability with SEO-friendly features to reach the right audience effortlessly.",
  },
  {
    icon: Image,
    title: "Engaging Visuals",
    description:
      "Impress visitors with professional and visually appealing layouts designed for maximum impact.",
  },
  {
    icon: MousePointerClick,
    title: "Clear Call-to-Actions (CTAs)",
    description:
      "Guide your visitors with intuitive CTAs, making it easy for them to connect with you.",
  },
  {
    icon: Newspaper,
    title: "Flexible and Targeted Content",
    description:
      "Tailor your portfolio with customizable sections to effectively showcase your unique skills and experience.",
  },
  {
    icon: BarChart2,
    title: "Portfolio Analytics",
    description:
      "Gain valuable insights into who's visiting your portfolio and how they engage with your content.",
  },
  {
    icon: RefreshCw,
    title: "Regular Updates with New Features",
    description:
      "Stay ahead of the competition with ongoing updates and improvements to enhance your portfolio.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        {/* <h2 className="mb-3 text-base font-semibold text-primary">Features</h2> */}
        <h3 className="mb-4 text-3xl font-bold sm:text-4xl">
          What Makes Us Different
        </h3>
        <p className="text-xl text-muted-foreground">
          portfoliopilot.in empowers you to create a standout portfolio with features
          designed for modern professionals.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featureList.map(({ icon: Icon, title, description }, index) => (
          <Card
            key={title}
            className="group cursor-pointer relative overflow-hidden bg-muted/50 transition-all duration-300 ease-in-out hover:bg-background dark:bg-card"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="mb-4 rounded-lg bg-blue-100/50 p-3 dark:bg-blue-900/20">
                  <Icon
                    size={24}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
                <span className="text-4xl font-bold text-primary/10 transition-colors duration-300 group-hover:text-primary/20">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              </div>
              <CardTitle className="mb-2 text-xl transition-colors duration-300 group-hover:text-primary">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
