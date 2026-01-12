import { env } from "@/env";
import { analyticsDataClient } from "@/lib/analytics";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const response = await analyticsDataClient.properties.runReport({
      property: `properties/${env.GA_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
        metrics: [
          { name: "activeUsers" },
          { name: "newUsers" },
          { name: "sessions" },
          { name: "bounceRate" },
        ],
        dimensions: [
          { name: "date" },
          { name: "country" },
          { name: "pagePath" },
        ],
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Error fetching analytics data" },
      { status: 500 },
    );
  }
}
