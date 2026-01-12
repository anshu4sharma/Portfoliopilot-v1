"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  total: {
    label: "Total Visitors",
    color: "hsl(var(--chart-1))",
  },
  desktop: {
    label: "Desktop Visitors",
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Mobile Visitors",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const dateRangeOptions = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "thisWeek", label: "This Week" },
  { value: "lastWeek", label: "Last Week" },
  { value: "7days", label: "Last 7 Days" },
  { value: "14days", label: "Last 14 Days" },
  { value: "28days", label: "Last 28 Days" },
  { value: "30days", label: "Last 30 Days" },
  { value: "60days", label: "Last 60 Days" },
  { value: "90days", label: "Last 90 Days" },
];

const CACHE_KEY = "dailyActiveUsersCache";
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

interface CacheData {
  data: any;
  timestamp: number;
}

const getCachedData = (key: string): CacheData | null => {
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
  const cacheData: CacheData = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cacheData));
};

export function DailyActiveUsers({ routeName }: { routeName: string }) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("total");
  const [selectedRange, setSelectedRange] = React.useState("28days");
  const [analyticsData, setAnalyticsData] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [total, setTotal] = React.useState({
    total: 0,
    desktop: 0,
    mobile: 0,
  });

  const fetchAnalytics = React.useCallback(async () => {
    const cacheKey = `${CACHE_KEY}_${routeName}_${selectedRange}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setAnalyticsData(cachedData.data.processedData);
      setTotal(cachedData.data.total);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/analytics/${routeName}?range=${selectedRange}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch analytics data");
      }
      const data = await response.json();

      const processedData = data.data.map((item: any) => ({
        ...item,
        total: item.desktop + item.mobile,
      }));

      const totalData = {
        total: data.totals.desktop + data.totals.mobile,
        desktop: data.totals.desktop,
        mobile: data.totals.mobile,
      };

      setAnalyticsData(processedData);
      setTotal(totalData);

      setCachedData(cacheKey, { processedData, total: totalData });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load analytics");
    } finally {
      setIsLoading(false);
    }
  }, [routeName, selectedRange]);

  React.useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const getRangeLabel = React.useMemo(() => {
    const option = dateRangeOptions.find((opt) => opt.value === selectedRange);
    return option ? option.label : "Last 14 Days";
  }, [selectedRange]);

  return (
    <Card className="min-h-[500px]">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0">
        <div className="flex flex-col px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl">Daily Active Users</CardTitle>
            <CardDescription>
              Showing total visitors for {getRangeLabel.toLowerCase()}
            </CardDescription>
          </div>
          <div className="mt-4 sm:mt-0">
            <Select value={selectedRange} onValueChange={setSelectedRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                {dateRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex">
          {["total", "desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                {isLoading ? (
                  <Skeleton className="h-6 w-20" />
                ) : (
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[chart].toLocaleString()}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        {isLoading ? (
          <div className="flex h-[250px] items-center justify-center">
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : error ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-center text-muted-foreground">{error}</p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={analyticsData}
                margin={{
                  left: 0,
                  right: 0,
                  top: 16,
                  bottom: 0,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip
                  // cursor={false}
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey={activeChart}
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                    />
                  }
                />
                <Area
                  type="linear"
                  dataKey={activeChart}
                  stroke={chartConfig[activeChart].color}
                  fill={chartConfig[activeChart].color}
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
