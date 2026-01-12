import { getUserRouteByUserId } from "@/actions/route_actions";
import { notFound, redirect } from "next/navigation";
import { DailyActiveUsers } from "./_components/charts/chart-daily-active-users";
import { ChartByMonths } from "./_components/charts/chart-by-months";
import { ChartsByBrowsers } from "./_components/charts/chart-by-browsers";
import { ChartsByCountries } from "./_components/charts/charts-by-countries";
import { ChartLast30minActive } from "./_components/charts/chart-last-30min-active";
import { ChartByReferrers } from "./_components/charts/chart-by-referrers";
import { ChartByPages } from "./_components/charts/chart-by-pages";
import { getCurrentUser } from "@/lib/session";

// type Props = { params: { "route-name": string } };

// export default async function AnalyticsPage({ params }: Props) {
export default async function AnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const route = await getUserRouteByUserId(user.id);
  if (!route) notFound();
  const routeName = route.routeName;

  return (
    <div className="container mx-auto px-2 py-3 md:px-4">
      <h1 className="mb-8 text-2xl font-bold">Portfolio Analytics</h1>
      <div className="mb-4 rounded  px-3 py-2 text-xs text-muted-foreground">
        <p>Analytics data is refreshed daily. Please allow up to 24 hours for changes to appear.</p>
      </div>
      {/*  charts and data that i need  */}
      <section className="flex flex-col gap-4">
        <DailyActiveUsers routeName={routeName} />
        {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartLast30minActive routeName={routeName} />
          <ChartByPages routeName={routeName} />
        </div> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartByReferrers routeName={routeName} />
          <ChartsByCountries routeName={routeName} />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ChartByMonths routeName={routeName} />
          <ChartsByBrowsers routeName={routeName} />
        </div>
      </section>
    </div>
  );
}
