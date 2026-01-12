"use client";

import { useState, useCallback, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";
import { format, addMinutes } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const CACHE_KEY = "analyticsCache";
// const CACHE_EXPIRATION = 1 * 60 * 1000; // 1 minute
const CACHE_EXPIRATION = 0.02 * 60 * 1000; // 300sncondsds

const timeOptions = {
  "30min": "30 minutes",
  "1hr": "1 hour",
  "2hr": "2 hours",
  "4hr": "4 hours",
  "6hr": "6 hours",
  "12hr": "12 hours",
  "24hr": "24 hours",
  "48hr": "48 hours",
} as const;

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface CacheData {
  data: any;
  timestamp: number;
}

interface ChartData {
  time: string;
  views: number;
}

interface ApiResponse {
  data: ChartData[];
  stats: {
    totalViews: number;
    trend: number;
    interval: string;
  };
  timeRange: string;
}

// Updated formatTimeToAMPM function to be more robust
const formatTimeToAMPM = (timeStr: string) => {
  try {
    if (!timeStr || timeStr === "undefined") return "";

    // Split hours and minutes
    const [hours, minutes] = timeStr.trim().split(":").map(Number);

    // Validate the parsed values
    if (isNaN(hours) || isNaN(minutes)) {
      return timeStr; // Return original if parsing fails
    }

    const period = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 || 12; // Convert 0 to 12 for 12 AM
    const paddedMinutes = minutes.toString().padStart(2, "0");

    return `${hour12}:${paddedMinutes} ${period}`;
  } catch (error) {
    console.error("Error formatting time:", error, timeStr);
    return timeStr; // Return original string if parsing fails
  }
};

const getMonthAbbrev = (month: number) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[month - 1];
};

// Custom tooltip component
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}) => {
  if (!active || !payload?.length) {
    return null;
  }

  try {
    const timeRange = payload[0].payload.time;
    let displayTime = timeRange;

    // Check if the time range includes a date (contains "/")
    if (timeRange.includes("/")) {
      // Handle date-time format (e.g., "11/01 13:18 - 11/01 15:18")
      const [startPart, endPart] = timeRange
        .split(" - ")
        .map((part: string) => part.trim());
      const [startDate, startTime] = startPart
        .split(" ")
        .map((part: string) => part.trim());
      const [startMonth, startDay] = startDate.split("/").map(Number);
      const [, endTime] = endPart.split(" ").map((part: string) => part.trim());

      const monthAbbrev = getMonthAbbrev(startMonth);
      const formattedStartTime = formatTimeToAMPM(startTime);
      const formattedEndTime = formatTimeToAMPM(endTime);

      displayTime = `${monthAbbrev}-${startDay} ${formattedStartTime} - ${formattedEndTime}`;
    } else {
      // Handle simple time format (e.g., "13:18 - 15:18")
      const [startTime, endTime] = timeRange
        .split(" - ")
        .map((time: string) => time.trim());
      const formattedStartTime = formatTimeToAMPM(startTime);
      const formattedEndTime = formatTimeToAMPM(endTime);

      displayTime = `${formattedStartTime} - ${formattedEndTime}`;
    }

    return (
      <div className="rounded-lg border bg-card p-3 shadow-sm">
        <p className="font-medium">{`${payload[0].value} views`}</p>
        <p className="text-sm text-muted-foreground">{displayTime}</p>
      </div>
    );
  } catch (error) {
    console.error("Error parsing time:", error, payload[0].payload.time);
    return (
      <div className="rounded-lg border bg-card p-3 shadow-sm">
        <p className="font-medium">{`${payload[0].value} views`}</p>
        <p className="text-sm text-muted-foreground">
          {payload[0].payload.time || "Time not available"}
        </p>
      </div>
    );
  }
};

const getCachedData = (key: string): CacheData | null => {
  if (typeof window === "undefined") return null;

  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      return { data, timestamp };
    }
  }
  return null;
};

const setCachedData = (key: string, data: any) => {
  if (typeof window === "undefined") return;

  const cacheData: CacheData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

export const ChartLast30minActive = ({ routeName }: { routeName: string }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [stats, setStats] = useState<ApiResponse["stats"] | null>(null);
  const [timeRange, setTimeRange] = useState<keyof typeof timeOptions>("24hr");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const cacheKey = `${CACHE_KEY}_${routeName}_${timeRange}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setChartData(cachedData.data.data);
      setStats(cachedData.data.stats);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/analytics/active/${routeName}?range=${timeRange}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }
      const data: ApiResponse = await response.json();

      setChartData(data.data);
      setStats(data.stats);
      setCachedData(cacheKey, data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load analytics data",
      );
    } finally {
      setIsLoading(false);
    }
  }, [routeName, timeRange]);

  useEffect(() => {
    fetchData();
    // Refresh data periodically based on time range
    const interval = setInterval(fetchData, 60000); // Every minute
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Page Views</CardTitle>
            <CardDescription>
              Analytics for the last {timeOptions[timeRange]}
            </CardDescription>
          </div>
          <Select
            value={timeRange}
            onValueChange={(value) =>
              setTimeRange(value as keyof typeof timeOptions)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(timeOptions).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="">
        {isLoading ? (
            <div className="flex h-[250px] items-center justify-center md:h-[350px]">
            <Skeleton className="h-[250px] w-full md:h-[350px]" />
          </div>
        ) : error ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-center text-muted-foreground">{error}</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                interval="preserveStartEnd"
                tick={false} // This will hide the time labels
              />
              <ChartTooltip
                // cursor={false}
                content={<CustomTooltip />}
                cursor={{ fill: "transparent", opacity: 0.3 }}
              />
              <Bar
                dataKey="views"
                fill="url(#colorViews)"
                radius={[4, 4, 0, 0]}
                barSize={12}
              />
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig.views.color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig.views.color}
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {stats && (
          <>
            {/* <div className="flex items-center gap-2 font-medium leading-none">
              {stats.trend !== 0 && (
                <>
                  {Math.abs(stats.trend)}%{" "}
                  <TrendingUp
                    className={`h-4 w-4 ${stats.trend < 0 ? "rotate-180" : ""}`}
                  />
                </>
              )}
                
            </div> */}

            <div className="flex items-center gap-2 font-medium leading-none">
              Total views
              <span className="font-medium">
                : {stats.totalViews.toLocaleString()}
              </span>
            </div>
            <div className="leading-none text-muted-foreground">
              Updated every {stats.interval}
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
};
