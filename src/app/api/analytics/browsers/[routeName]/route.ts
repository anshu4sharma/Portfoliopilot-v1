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

    console.log("Analytics Request:", {
      propertyId: env.GA_PROPERTY_ID,
      dateRange: { startDate, endDate },
      portfolioPaths,
    });

    const response = await analyticsDataClient.properties.runReport({
      property: `properties/${env.GA_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "browser" }],
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
      },
    });

    console.log("Analytics Response:", {
      rowCount: response.data.rows?.length || 0,
      dimensionHeaders: response.data.dimensionHeaders,
      metricHeaders: response.data.metricHeaders,
    });

    // Process the response data
    const browserMap = new Map<string, number>();

    response.data.rows?.forEach((row) => {
      const browser = normalizeBrowserName(row.dimensionValues![0].value!);
      const views = parseInt(row.metricValues![0].value!);
      browserMap.set(browser, (browserMap.get(browser) || 0) + views);
    });

    const browserData = Array.from(browserMap.entries())
      .map(([browser, visitors]) => ({
        browser,
        visitors,
        fill: `var(--color-${browser.toLowerCase()})`,
        img: getBrowserIconUrl(browser),
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 5);

    return NextResponse.json({
      route: params.routeName,
      range,
      data: browserData,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    });
  } catch (error) {
    console.error("Error fetching browser analytics:", error);
    return NextResponse.json(
      { error: "Error fetching analytics data" },
      { status: 500 },
    );
  }
}

function normalizeBrowserName(browser: string): string {
  browser = browser.toLowerCase();
  if (browser.includes("chrome")) return "chrome";
  if (browser.includes("safari")) return "safari";
  if (browser.includes("firefox")) return "firefox";
  if (browser.includes("edge")) return "edge";
  if (browser.includes("opera")) return "opera";
  return "other";
}

function getBrowserIconUrl(browser: string): string {
  const iconUrls: Record<string, string> = {
    chrome:
      "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/chrome/chrome.png",
    firefox:
      "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/firefox/firefox.png",
    safari:
      "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/safari/safari.png",
    edge: "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/edge/edge.png",
    opera:
      "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/opera/opera.png",
    other:
      "https://cdnjs.cloudflare.com/ajax/libs/browser-logos/74.0.0/default-browser/default-browser.png",
  };

  return iconUrls[browser.toLowerCase()] || iconUrls.other;
}
