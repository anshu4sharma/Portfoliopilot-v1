import { NextRequest, NextResponse } from "next/server";
import { getDateRange } from "@/app/api/utils/data-utils";
import { env } from "@/env";
import { analyticsDataClient } from "@/lib/analytics";
import { getPortfolioPaths } from "@/lib/analytics-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { routeName: string } },
) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const range = searchParams.get("range") || "28days";
    const { startDate, endDate } = getDateRange(range);

    const host = req.headers.get("host");
    const portfolioPaths = getPortfolioPaths(host, params.routeName);

    const response = await analyticsDataClient.properties.runReport({
      property: `properties/${env.GA_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        dimensionFilter: {
          orGroup: {
            expressions: portfolioPaths.map((path) => ({
              filter: {
                fieldName: "pagePath",
                stringFilter: {
                  value: path,
                  matchType: "BEGINS_WITH",
                },
              },
            })),
          },
        },
        orderBys: [
          {
            metric: { metricName: "screenPageViews" },
            desc: true,
          },
        ],
        limit: "10", // Get top 10 pages
      },
    });

    // Process the response data
    const pagesData =
      response.data.rows?.map((row) => {
        const path = row.dimensionValues![0].value!;
        const views = parseInt(row.metricValues![0].value!);

        // Extract page name from path
        const pageName = normalizePath(path.replace(portfolioPaths[0], ""));

        return {
          page: pageName,
          views,
          fill: `var(--color-${pageName})`,
        };
      }) || [];

    return NextResponse.json({
      route: params.routeName,
      range,
      data: pagesData,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    });
  } catch (error) {
    console.error("Error fetching pages analytics:", error);
    return NextResponse.json(
      { error: "Error fetching analytics data" },
      { status: 500 },
    );
  }
}

function normalizePath(path: string): string {
  // Remove leading slash and query parameters
  path = path.replace(/^\//, "").split("?")[0];

  // If empty, it's the home page
  if (!path) return "home";

  // Handle common paths
  const commonPaths: { [key: string]: string } = {
    about: "about",
    contact: "contact",
    projects: "projects",
    blog: "blog",
    services: "services",
    portfolio: "portfolio",
    skills: "skills",
    experience: "experience",
    resume: "resume",
  };

  // Check if path matches any common paths
  for (const [key, value] of Object.entries(commonPaths)) {
    if (path.startsWith(key)) return value;
  }

  // For other paths, use the first segment
  return path.split("/")[0] || "other";
}
