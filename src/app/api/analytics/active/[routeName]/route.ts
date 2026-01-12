import { NextRequest, NextResponse } from "next/server";
import {
  addMinutes,
  subHours,
  format,
  parseISO,
  differenceInMinutes,
} from "date-fns";

import { analyticsDataClient } from "@/lib/analytics";
import { env } from "@/env";
import { getPortfolioPaths } from "@/lib/analytics-utils";

const timeRangeOptions = {
  "30min": 0.5,
  "1hr": 1,
  "2hr": 2,
  "4hr": 4,
  "6hr": 6,
  "12hr": 12,
  "24hr": 24,
  "48hr": 48,
} as const;

type TimeRange = keyof typeof timeRangeOptions;

const getTimeInterval = (
  timeRange: TimeRange,
): { interval: number; format: string } => {
  // Define intervals based on time range
  switch (timeRange) {
    case "30min":
      return { interval: 1, format: "HH:mm" }; // 1 minute intervals
    case "1hr":
      return { interval: 2, format: "HH:mm" }; // 2 minute intervals
    case "2hr":
      return { interval: 5, format: "HH:mm" }; // 5 minute intervals
    case "4hr":
      return { interval: 10, format: "HH:mm" }; // 10 minute intervals
    case "6hr":
      return { interval: 15, format: "HH:mm" }; // 15 minute intervals
    case "12hr":
      return { interval: 30, format: "HH:mm" }; // 30 minute intervals
    case "24hr":
      return { interval: 60, format: "HH:mm" }; // 1 hour intervals
    case "48hr":
      return { interval: 120, format: "MM/dd HH:mm" }; // 2 hour intervals
    default:
      return { interval: 120, format: "MM/dd HH:mm" };
  }
};

// Function to generate sample data
const generateSampleData = (
  startDate: Date,
  endDate: Date,
  interval: number,
  timeFormat: string,
) => {
  const totalMinutes = differenceInMinutes(endDate, startDate);
  const slots = Math.ceil(totalMinutes / interval);

  return Array.from({ length: slots }, (_, i) => {
    const slotStartTime = addMinutes(startDate, i * interval);
    const slotEndTime = addMinutes(slotStartTime, interval);
    // Generate random views between 0 and 10, with some variation
    const baseViews = Math.floor(Math.random() * 11);
    const hour = slotStartTime.getHours();
    const multiplier = hour >= 9 && hour <= 17 ? 2 : 1;

    return {
      time: `${format(slotStartTime, timeFormat)} - ${format(slotEndTime, timeFormat)}`,
      views: baseViews * multiplier,
    };
  });
};

export async function GET(
  req: NextRequest,
  { params }: { params: { routeName: string } },
) {
  try {
    const searchParams = new URL(req.url).searchParams;
    const timeRange = (searchParams.get("range") || "48hr") as TimeRange;
    const hours = timeRangeOptions[timeRange] || 48;
    const useSampleData =
      process.env.NODE_ENV === "development" ||
      searchParams.get("sample") === "true";

    const host = req.headers.get("host");
    const portfolioPaths = getPortfolioPaths(host, params.routeName);

    const endDate = new Date();
    const startDate = subHours(endDate, hours);

    // Get appropriate interval and format based on time range
    const { interval, format: timeFormat } = getTimeInterval(timeRange);

    // Use sample data in development or when requested
    if (useSampleData) {
      const sampleData = generateSampleData(
        startDate,
        endDate,
        interval,
        timeFormat,
      );
      const totalViews = sampleData.reduce((sum, slot) => sum + slot.views, 0);
      const halfwayPoint = Math.floor(sampleData.length / 2);
      const firstHalfViews = sampleData
        .slice(0, halfwayPoint)
        .reduce((sum, slot) => sum + slot.views, 0);
      const secondHalfViews = sampleData
        .slice(halfwayPoint)
        .reduce((sum, slot) => sum + slot.views, 0);

      const trend =
        firstHalfViews === 0
          ? 100
          : ((secondHalfViews - firstHalfViews) / firstHalfViews) * 100;

      return NextResponse.json({
        route: params.routeName,
        timeRange,
        data: sampleData,
        stats: {
          totalViews,
          trend: Math.round(trend * 10) / 10,
          interval: `${interval} minute${interval > 1 ? "s" : ""}`,
        },
        isSampleData: true,
      });
    }

    const response = await analyticsDataClient.properties.runReport({
      property: `properties/${env.GA_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [
          {
            startDate: format(startDate, "yyyy-MM-dd"),
            endDate: format(endDate, "yyyy-MM-dd"),
          },
        ],
        dimensions: [{ name: "minute" }],
        metrics: [{ name: "activeUsers" }],
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
            dimension: {
              dimensionName: "minute",
            },
          },
        ],
      },
    });

    // Create a map to store analytics data
    const analyticsMap = new Map<string, number>();

    // Process analytics data into the map
    if (response.data.rows) {
      response.data.rows.forEach((row) => {
        const minute = row.dimensionValues?.[0]?.value;
        if (!minute) return;

        try {
          const timestamp = parseISO(minute);
          const views = parseInt(row.metricValues?.[0]?.value || "0");
          const timeKey = format(timestamp, timeFormat);

          analyticsMap.set(timeKey, (analyticsMap.get(timeKey) || 0) + views);
        } catch (parseError) {
          console.error("Error parsing data row:", {
            minute,
            error: parseError,
          });
        }
      });
    }

    // Generate all time slots
    const totalMinutes = hours * 60;
    const slots = Math.ceil(totalMinutes / interval);

    const timeSlots = Array.from({ length: slots }, (_, i) => {
      const slotStartTime = addMinutes(startDate, i * interval);
      const slotEndTime = addMinutes(slotStartTime, interval);
      const startTimeKey = format(slotStartTime, timeFormat);
      const endTimeKey = format(slotEndTime, timeFormat);

      return {
        time: `${startTimeKey} - ${endTimeKey}`,
        views: analyticsMap.get(startTimeKey) || 0,
      };
    });

    // Calculate total views and trend
    const totalViews = timeSlots.reduce((sum, slot) => sum + slot.views, 0);
    const halfwayPoint = Math.floor(timeSlots.length / 2);
    const firstHalfViews = timeSlots
      .slice(0, halfwayPoint)
      .reduce((sum, slot) => sum + slot.views, 0);
    const secondHalfViews = timeSlots
      .slice(halfwayPoint)
      .reduce((sum, slot) => sum + slot.views, 0);

    const trend =
      firstHalfViews === 0
        ? 100
        : ((secondHalfViews - firstHalfViews) / firstHalfViews) * 100;

    return NextResponse.json({
      route: params.routeName,
      timeRange,
      data: timeSlots,
      stats: {
        totalViews,
        trend: Math.round(trend * 10) / 10,
        interval: `${interval} minute${interval > 1 ? "s" : ""}`,
      },
    });
  } catch (error) {
    console.error("Error fetching active users data:", {
      error,
      message: error instanceof Error ? error.message : String(error),
    });

    if (process.env.NODE_ENV === "development") {
      const timeRange = (new URL(req.url).searchParams.get("range") ||
        "48hr") as TimeRange;
      const hours = timeRangeOptions[timeRange] || 48;
      const endDate = new Date();
      const startDate = subHours(endDate, hours);
      const { interval, format: timeFormat } = getTimeInterval(timeRange);

      const sampleData = generateSampleData(
        startDate,
        endDate,
        interval,
        timeFormat,
      );

      return NextResponse.json({
        route: params.routeName,
        timeRange,
        data: sampleData,
        stats: {
          totalViews: sampleData.reduce((sum, slot) => sum + slot.views, 0),
          trend: 5.2,
          interval: `${interval} minute${interval > 1 ? "s" : ""}`,
        },
        isSampleData: true,
        error: {
          message: error instanceof Error ? error.message : String(error),
          details: "Using sample data due to error",
        },
      });
    }

    return NextResponse.json(
      {
        error: "Error fetching active users data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
