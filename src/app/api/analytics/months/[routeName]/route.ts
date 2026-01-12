import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";
import { analyticsDataClient } from "@/lib/analytics";
import { getPortfolioPaths } from "@/lib/analytics-utils";

// Helper function to get month name
function getMonthName(monthIndex: number): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const normalizedIndex = ((monthIndex % 12) + 12) % 12;
  return months[normalizedIndex];
}

// Helper function to get last 6 months
function getLast6Months(): { name: string; index: number }[] {
  const months = [];
  const today = new Date();
  const currentMonth = today.getMonth();

  for (let i = 5; i >= 0; i--) {
    const monthIndex = (((currentMonth - i) % 12) + 12) % 12;
    months.push({
      name: getMonthName(monthIndex),
      index: monthIndex,
    });
  }

  return months;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { routeName: string } },
) {
  try {
    const host = req.headers.get("host");
    const portfolioPaths = getPortfolioPaths(host, params.routeName);

    // Calculate date range for last 6 months
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 5);
    startDate.setDate(1); // Start from first day of the month

    console.log("Monthly Analytics Request:", {
      propertyId: env.GA_PROPERTY_ID,
      dateRange: {
        start: startDate.toISOString().slice(0, 10),
        end: endDate.toISOString().slice(0, 10),
      },
      portfolioPaths,
    });

    const response = await analyticsDataClient.properties.runReport({
      property: `properties/${env.GA_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [
          {
            startDate: startDate.toISOString().slice(0, 10),
            endDate: endDate.toISOString().slice(0, 10),
          },
        ],
        dimensions: [{ name: "yearMonth" }],
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
      },
    });

    console.log("Monthly Analytics Response:", {
      rowCount: response.data.rows?.length || 0,
      dimensionHeaders: response.data.dimensionHeaders,
      metricHeaders: response.data.metricHeaders,
    });

    // Get the last 6 months structure
    const last6Months = getLast6Months();

    // Create a map for the analytics data using month index as key
    const viewsMap = new Map<number, number>();

    // Process analytics data
    if (response.data.rows) {
      response.data.rows.forEach((row) => {
        if (!row.dimensionValues?.[0]?.value || !row.metricValues?.[0]?.value) {
          console.warn("Invalid row data:", row);
          return;
        }

        const yearMonth = row.dimensionValues[0].value; // Format: YYYYMM
        const monthIndex = parseInt(yearMonth.slice(-2)) - 1;
        const views = parseInt(row.metricValues[0].value);

        if (isNaN(monthIndex) || isNaN(views)) {
          console.warn("Invalid month or views data:", { yearMonth, views });
          return;
        }

        viewsMap.set(monthIndex, (viewsMap.get(monthIndex) || 0) + views);
      });
    }

    // Create the final data array ensuring one entry per month
    const monthsData = last6Months.map((month) => ({
      month: month.name,
      views: viewsMap.get(month.index) || 0,
    }));

    // Calculate total views
    const totalViews = monthsData.reduce((sum, month) => sum + month.views, 0);

    return NextResponse.json({
      route: params.routeName,
      data: monthsData,
      total: totalViews,
      dateRange: {
        start: startDate.toISOString().slice(0, 10),
        end: endDate.toISOString().slice(0, 10),
      },
    });
  } catch (error) {
    console.error("Error fetching monthly analytics:", {
      error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: "Error fetching analytics data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
