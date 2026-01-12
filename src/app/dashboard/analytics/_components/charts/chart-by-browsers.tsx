"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
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

const CACHE_KEY = "browsersCache";
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-10))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-6))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-7))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-8))",
  },
  opera: {
    label: "Opera",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-9))",
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

// Custom Bar component with only browser icon
const CustomBar = (props: any) => {
  const { fill, x, y, width, height, payload } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={5}
        className="hover:fill-opacity-80 transition-colors duration-200"
      />
      {/* Browser icon container */}
      <g transform={`translate(${x - 30}, ${y + height / 2 - 10})`}>
        <image
          href={payload.img}
          width={20}
          height={20}
          className="rounded-sm"
        />
      </g>
    </g>
  );
};

export function ChartsByBrowsers({ routeName }: { routeName: string }) {
  const [selectedRange, setSelectedRange] = useState("28days");
  const [browsersData, setBrowsersData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrowsers = useCallback(async () => {
    const cacheKey = `${CACHE_KEY}_${routeName}_${selectedRange}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setBrowsersData(cachedData.data);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/analytics/browsers/${routeName}?range=${selectedRange}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch browsers data");
      }
      const data = await response.json();
      setBrowsersData(data.data);
      setCachedData(cacheKey, data.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load browsers data",
      );
    } finally {
      setIsLoading(false);
    }
  }, [routeName, selectedRange]);

  useEffect(() => {
    fetchBrowsers();
  }, [fetchBrowsers]);

  const getRangeLabel = () => {
    const option = dateRangeOptions.find((opt) => opt.value === selectedRange);
    return option ? option.label.toLowerCase() : "last 28 days";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Browsers</CardTitle>
        <CardDescription>Browser distribution</CardDescription>
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
              data={browsersData}
              layout="vertical"
              margin={{
                left: 35, // Reduced left margin since we don't have text labels
                right: 30,
                top: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="browser"
                type="category"
                hide // Hide the axis labels
              />
              <XAxis type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="visitors"
                shape={<CustomBar />}
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
          Total Visitors:{" "}
          {browsersData.reduce((sum, item) => sum + item.visitors, 0)}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing browser distribution
        </div>
      </CardFooter>
    </Card>
  );
}
