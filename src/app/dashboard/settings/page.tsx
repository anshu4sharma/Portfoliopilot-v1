import { Globe, PaintBucket, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GeneralSettings from "./_components/general";
import DomainsSettings from "./_components/domains";
import AppearanceSettings from "./_components/appearance.tsx";
import { env } from "@/env";
import { getCurrentUser } from "@/lib/session";
import { getUserRouteByUserId } from "@/actions/route_actions";
import Link from "next/link";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  const route = await getUserRouteByUserId(user && user?.id);
  const portfolioName = route?.routeName;
  const portfolioUrl = `${env.NODE_ENV === "development" ? "http" : "https"}://${portfolioName}.${env.NEXT_PUBLIC_ROOT_DOMAIN}`;

  return (
    <div className="container space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Settings for
            <span className="capitalize"> {route && route.routeName}</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your site settings and preferences
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={portfolioUrl} target="_blank">
                <Button variant="outline" className="ml-auto">
                  <Globe className="mr-2 h-4 w-4" />
                  {/* {portfolioUrl} */}
                  {portfolioUrl.replace(/^https?:\/\//, "")}
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>Open site in new tab</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Tabs defaultValue="domains" className="space-y-6">
        <TabsList>
          <TabsTrigger value="domains">
            <Globe className="mr-2 h-4 w-4" />
            Domains
          </TabsTrigger>
          <TabsTrigger value="general">
            <Settings className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <PaintBucket className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <div className="space-y-8">
          <TabsContent value="domains" className="space-y-8">
            <DomainsSettings route={route} />
          </TabsContent>
          <TabsContent value="general" className="space-y-8">
            <GeneralSettings route={route} />
          </TabsContent>

          <TabsContent value="appearance" className="space-y-8">
            <AppearanceSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
