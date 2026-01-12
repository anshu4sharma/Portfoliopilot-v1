import { NextRequest, NextResponse } from "next/server";
import { parseISO } from "date-fns";
import { getDateRange } from "../../utils/data-utils";
import { env } from "@/env";
import { analyticsDataClient } from "@/lib/analytics";
import { getPortfolioPaths } from "@/lib/analytics-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: { portfolioroute: string } },
) {
  const host = req.headers.get("host");
  const portfolioPaths = getPortfolioPaths(host, params.portfolioroute);

  const searchParams = req.nextUrl.searchParams;
  const range = searchParams.get("range") || "28days";
  const { startDate, endDate } = getDateRange(range);

  const response = await analyticsDataClient.properties.runReport({
    property: `properties/${env.GA_PROPERTY_ID}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: "date" },
        { name: "deviceCategory" },
        { name: "pagePath" },
      ],
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
          dimension: { dimensionName: "date" },
          desc: false,
        },
      ],
    },
  });

  console.log("response", response);
  // Process and sort the data
  const dailyData = new Map();

  response.data.rows?.forEach((row) => {
    const date = row.dimensionValues![0].value!;
    const device = row.dimensionValues![1].value!.toLowerCase();
    const pageViews = parseInt(row.metricValues![0].value!);

    if (!dailyData.has(date)) {
      dailyData.set(date, {
        date: formatDate(date),
        desktop: 0,
        mobile: 0,
        views: 0,
      });
    }

    const dayData = dailyData.get(date);
    if (device === "desktop") {
      dayData.desktop = pageViews;
    } else if (device === "mobile" || device === "tablet") {
      dayData.mobile = pageViews;
    }
    dayData.views = dayData.desktop + dayData.mobile;
  });

  console.log("dailyData", dailyData);

  // Convert to array and ensure chronological order
  const formattedData = Array.from(dailyData.values()).sort(
    (a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime(),
  );

  const totals = formattedData.reduce(
    (acc, day) => {
      acc.desktop += day.desktop;
      acc.mobile += day.mobile;
      acc.views += day.views;
      return acc;
    },
    { desktop: 0, mobile: 0, views: 0 },
  );
  try {
    return NextResponse.json({
      route: params.portfolioroute,
      range,
      dateRange: {
        start: startDate,
        end: endDate,
      },
      totals,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Error fetching analytics data" },
      { status: 500 },
    );
  }
}

function formatDate(dateString: string): string {
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);
  return `${year}-${month}-${day}`;
}

// GET http://localhost:3000/api/analytics/john-doe?range=today
// GET http://localhost:3000/api/analytics/john-doe?range=yesterday
// GET http://localhost:3000/api/analytics/john-doe?range=thisWeek
// GET http://localhost:3000/api/analytics/john-doe?range=lastWeek
// GET http://localhost:3000/api/analytics/john-doe?range=7days
// GET http://localhost:3000/api/analytics/john-doe?range=14days
// GET http://localhost:3000/api/analytics/john-doe?range=28days
// GET http://localhost:3000/api/analytics/john-doe?range=30days
// GET http://localhost:3000/api/analytics/john-doe?range=60days
// GET http://localhost:3000/api/analytics/john-doe?range=90days
