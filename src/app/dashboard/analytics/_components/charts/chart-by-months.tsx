"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

const CACHE_KEY = "monthsCache";
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const getCachedData = (key: string) => {
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
  localStorage.setItem(
    key,
    JSON.stringify({
      data,
      timestamp: Date.now(),
    }),
  );
};

export function ChartByMonths({ routeName }: { routeName: string }) {
  const [monthsData, setMonthsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trend, setTrend] = useState<number>(0);

  const fetchMonths = useCallback(async () => {
    const cacheKey = `${CACHE_KEY}_${routeName}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setMonthsData(cachedData.data);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/analytics/months/${routeName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch monthly data");
      }
      const data = await response.json();
      const transformedData = data.data.map((item: any) => ({
        ...item,
        month: item.month.substring(0, 3).toUpperCase(),
      }));
      setMonthsData(transformedData);

      // Calculate trend
      if (transformedData.length >= 2) {
        const lastMonth = transformedData[transformedData.length - 1].views;
        const previousMonth = transformedData[transformedData.length - 2].views;
        const trendPercent =
          previousMonth !== 0
            ? ((lastMonth - previousMonth) / previousMonth) * 100
            : 0;
        setTrend(Math.round(trendPercent * 10) / 10);
      }

      setCachedData(cacheKey, transformedData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load monthly data",
      );
    } finally {
      setIsLoading(false);
    }
  }, [routeName]);

  useEffect(() => {
    fetchMonths();
  }, [fetchMonths]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Monthly Views</CardTitle>
        <CardDescription>Last 6 months of traffic</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[250px] items-center justify-center">
            <Skeleton className="h-[200px] w-full" />
          </div>
        ) : error ? (
          <div className="flex h-[250px] items-center justify-center">
            <p className="text-center text-muted-foreground">{error}</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart
              data={monthsData}
              margin={{ top: 0, right: 30, left: 5, bottom: 0 }}
              layout="vertical"
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="month"
                type="category"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <XAxis type="number" hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="views"
                fill={chartConfig.views.color}
                radius={[4, 4, 4, 4]}
                label={{
                  position: "right",
                  fill: "hsl(var(--foreground))",
                  fontSize: 12,
                  formatter: (value: number) => value.toString(),
                }}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trend !== 0 && (
            <>
              {trend > 0 ? "Trending up" : "Trending down"} by {Math.abs(trend)}
              % from last month{" "}
              <TrendingUp
                className={`h-4 w-4 ${trend < 0 ? "rotate-180" : ""}`}
              />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Total Views: {monthsData.reduce((sum, item) => sum + item.views, 0)}
        </div>
      </CardFooter>
    </Card>
  );
}
