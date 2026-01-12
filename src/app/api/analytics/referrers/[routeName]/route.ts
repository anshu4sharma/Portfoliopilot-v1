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

    console.log("Referrers Analytics Request:", {
      propertyId: env.GA_PROPERTY_ID,
      dateRange: { startDate, endDate },
      portfolioPaths,
    });

    const response = await analyticsDataClient.properties.runReport({
      property: `properties/${env.GA_PROPERTY_ID}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "sessionSource" }],
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

    console.log("Referrers Analytics Response:", {
      rowCount: response.data.rows?.length || 0,
      dimensionHeaders: response.data.dimensionHeaders,
      metricHeaders: response.data.metricHeaders,
    });

    const referrerMap = new Map<string, number>();

    response.data.rows?.forEach((row) => {
      const source = row.dimensionValues![0].value || "direct";
      const visitors = parseInt(row.metricValues![0].value || "0");
      const normalizedName = normalizeSourceName(source);

      referrerMap.set(
        normalizedName,
        (referrerMap.get(normalizedName) || 0) + visitors,
      );
    });

    const referrersData = Array.from(referrerMap.entries())
      .map(([referrer, visitors]) => ({
        referrer,
        visitors,
        fill: getSourceColor(referrer),
      }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 10); // Limit to top 10 referrers

    const total = referrersData.reduce((sum, item) => sum + item.visitors, 0);

    return NextResponse.json({
      data: referrersData,
      total,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    });
  } catch (error) {
    console.error("Error fetching referrers analytics:", {
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

function normalizeSourceName(source: string): string {
  source = source.toLowerCase();

  // Direct traffic
  if (source === "(direct)" || !source) return "Direct";

  // Search Engines
  if (source.includes("google") || source.includes("accounts.google.com"))
    return "Google";
  if (source.includes("bing")) return "Bing";
  if (source.includes("yahoo")) return "Yahoo";
  if (source.includes("duckduckgo")) return "DuckDuckGo";
  if (source.includes("baidu")) return "Baidu";
  if (source.includes("yandex")) return "Yandex";

  // Social Media
  if (source.includes("facebook") || source.includes("fb")) return "Facebook";
  if (source.includes("twitter") || source.includes("t.co")) return "Twitter";
  if (source.includes("linkedin")) return "LinkedIn";
  if (source.includes("instagram")) return "Instagram";
  if (source.includes("pinterest")) return "Pinterest";
  if (source.includes("reddit")) return "Reddit";
  if (source.includes("youtube")) return "YouTube";
  if (source.includes("tiktok")) return "TikTok";
  if (source.includes("snapchat")) return "Snapchat";

  // Messaging Platforms
  if (source.includes("whatsapp")) return "WhatsApp";
  if (source.includes("telegram")) return "Telegram";
  if (source.includes("messenger")) return "Messenger";
  if (source.includes("wechat")) return "WeChat";
  if (source.includes("line")) return "Line";

  // Development Platforms
  if (source.includes("github")) return "GitHub";
  if (source.includes("gitlab")) return "GitLab";
  if (source.includes("bitbucket")) return "Bitbucket";
  if (source.includes("stackoverflow")) return "Stack Overflow";
  if (source.includes("dev.to")) return "Dev.to";
  if (source.includes("medium")) return "Medium";
  if (source.includes("hashnode")) return "Hashnode";

  // Browsers
  if (source.includes("firefox")) return "Firefox";
  if (source.includes("chrome")) return "Chrome";
  if (source.includes("safari")) return "Safari";
  if (source.includes("opera")) return "Opera";
  if (source.includes("edge")) return "Edge";

  // Email & Communication
  if (source.includes("email") || source.includes("mail")) return "Email";
  if (source.includes("newsletter")) return "Newsletter";
  if (source.includes("outlook")) return "Outlook";
  if (source.includes("gmail")) return "Gmail";

  // Deployment Platforms
  if (source.includes("vercel")) return "Vercel";
  if (source.includes("vercel.live")) return "Vercel Live";
  if (source.includes("netlify")) return "Netlify";
  if (source.includes("heroku")) return "Heroku";

  return "Other";
}

function getSourceColor(source: string): string {
  const sourceColors = {
    // Search Engines
    Google: "var(--color-google)",
    Bing: "var(--color-bing)",
    Yahoo: "var(--color-yahoo)",
    DuckDuckGo: "var(--color-duckduckgo)",

    // Social Media
    Facebook: "var(--color-facebook)",
    Twitter: "var(--color-twitter)",
    LinkedIn: "var(--color-linkedin)",
    Instagram: "var(--color-instagram)",
    Pinterest: "var(--color-pinterest)",
    Reddit: "var(--color-reddit)",
    YouTube: "var(--color-youtube)",
    TikTok: "var(--color-tiktok)",

    // Development
    GitHub: "var(--color-github)",
    GitLab: "var(--color-gitlab)",
    StackOverflow: "var(--color-stackoverflow)",

    // Browsers
    Firefox: "var(--color-firefox)",
    Chrome: "var(--color-chrome)",
    Safari: "var(--color-safari)",
    Edge: "var(--color-edge)",

    // Other Categories
    Direct: "var(--color-direct)",
    Email: "var(--color-email)",
    Vercel: "var(--color-vercel)",
    Other: "var(--color-other)",
  };

  const normalizedSource = normalizeSourceName(source);
  return (
    sourceColors[normalizedSource as keyof typeof sourceColors] ||
    sourceColors.Other
  );
}
