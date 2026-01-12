import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  Search,
  Paintbrush,
  BarChart2,
  Layout,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

interface BenefitsProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: Globe,
    title: "Build Credibility with a Custom Subdomain",
    description:
      "Stand out with a personalized URL (e.g., username.portfoliopilot.in) that builds trust and makes your portfolio memorable.",
  },
  {
    icon: Search,
    title: "Get Discovered with SEO Optimization",
    description:
      "Optimize your portfolio to rank higher in search results and attract more opportunities.",
  },
  {
    icon: Paintbrush,
    title: "Streamline Updates with Unlimited Customization",
    description:
      "Update and personalize your portfolio anytime, including unlimited subdomain changes.",
  },
  {
    icon: BarChart2,
    title: "Gain Insights with Portfolio Analytics",
    description:
      "Understand your audience with detailed analytics to track visits and engagement.",
  },
  // {
  //   icon: Layout,
  //   title: "Showcase Your Skills with Flexible Design",
  //   description:
  //     "Customize sections like Hero, Skills, Projects, Work Experience, Education, and Connect to reflect your unique story.",
  // },
  // {
  //   icon: RefreshCw,
  //   title: "Stay Ahead with Regular Updates",
  //   description:
  //     "Enjoy new features and improvements that keep your portfolio cutting-edge.",
  // },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-16 sm:py-24 md:py-32">
      <div className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <div className="text-center lg:text-left">
          <h2 className="mb-4 text-lg font-semibold tracking-wide text-primary">
            Benefits
          </h2>
          <h3 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Your Shortcut to a Professional Portfolio
          </h3>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl lg:mx-0">
            Easily create a stunning portfolio with features designed to help
            you succeed and stand out in your professional journey.
          </p>
        </div>

        <div className="grid w-full gap-6 sm:grid-cols-2">
          {benefitList.map(({ icon: Icon, title, description }, index) => (
            <Card
              key={title}
              className="group bg-muted/50 transition-all duration-300 ease-in-out hover:bg-background dark:bg-card"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="mb-4 rounded-lg bg-blue-100/50 dark:bg-blue-900/20 p-3">
                    <Icon size={24} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-4xl font-bold text-primary/10 transition-colors duration-300 group-hover:text-primary/20">
                    0{index + 1}
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
      </div>
    </section>
  );
};
