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
        dimensions: [{ name: "country" }, { name: "countryId" }],
        metrics: [{ name: "screenPageViews" }],
        dimensionFilter: {
          orGroup: {
            expressions: portfolioPaths.map((path) => ({
              filter: {
                fieldName: "pagePath",
                stringFilter: {
                  value: path,
                  matchType: "EXACT",
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
        limit: "10",
      },
    });

    const countriesData =
      response.data.rows?.map((row) => {
        const country = row.dimensionValues![0].value!.toLowerCase();
        const countryCode = row.dimensionValues![1].value!;

        return {
          country: country === "(not set)" ? "Unknown" : country,
          countryCode: countryCode === "(not set)" ? "UN" : countryCode,
          flagUrl:
            countryCode === "(not set)"
              ? "/images/unknown-flag.png" // You'll need to provide this default image
              : `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`,
          visitors: parseInt(row.metricValues![0].value!),
        };
      }) || [];

    return NextResponse.json({
      route: params.routeName,
      range,
      data: countriesData,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    });
  } catch (error) {
    console.error("Error fetching countries analytics:", error);
    return NextResponse.json(
      { error: "Error fetching analytics data" },
      { status: 500 },
    );
  }
}
