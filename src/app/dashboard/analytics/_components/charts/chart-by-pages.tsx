"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from "recharts";
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

const CACHE_KEY = "pagesCache";
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes
// const CACHE_EXPIRATION = 0 * 60 * 1000; // 5 minutes

const chartConfig = {
  views: {
    label: "Views",
  },
  home: {
    label: "Home",
    color: "hsl(var(--chart-1))",
  },
  analytics: {
    label: "Analytics",
    color: "hsl(var(--chart-2))",
  },
  resume: {
    label: "Resume",
    color: "hsl(var(--chart-3))",
  },
  about: {
    label: "About",
    color: "hsl(var(--chart-4))",
  },
  projects: {
    label: "Projects",
    color: "hsl(var(--chart-5))",
  },
  blog: {
    label: "Blog",
    color: "hsl(var(--chart-6))",
  },
  contact: {
    label: "Contact",
    color: "hsl(var(--chart-7))",
  },
  services: {
    label: "Services",
    color: "hsl(var(--chart-8))",
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

export function ChartByPages({ routeName }: { routeName: string }) {
  const [selectedRange, setSelectedRange] = useState("28days");
  const [pagesData, setPagesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPages = useCallback(async () => {
    const cacheKey = `${CACHE_KEY}_${routeName}_${selectedRange}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setPagesData(cachedData.data);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/analytics/pages/${routeName}?range=${selectedRange}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch pages data");
      }
      const data = await response.json();
      console.log("pages data ", data);
      setPagesData(data.data);
      setCachedData(cacheKey, data.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load pages data",
      );
    } finally {
      setIsLoading(false);
    }
  }, [routeName, selectedRange]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const getRangeLabel = () => {
    const option = dateRangeOptions.find((opt) => opt.value === selectedRange);
    return option ? option.label.toLowerCase() : "last 28 days";
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0">
        <div className="flex flex-wrap gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl">Most Viewed Pages</CardTitle>
            <CardDescription>
              <span className="capitalize">{getRangeLabel()}</span>
              <span> page views</span>
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
      </CardHeader>
      <CardContent>
        {/* {true ? ( */}
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
              accessibilityLayer
              data={pagesData}
              layout="vertical"
              margin={{
                left: 20,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                className="lowercase"
                dataKey="page"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => `/${value}`}
              />
              <XAxis dataKey="views" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="views"
                layout="vertical"
                radius={5}
                label={{
                  position: "right",
                  formatter: (value: number) => value.toLocaleString(),
                }}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total Views: {pagesData.reduce((sum, item) => sum + item.views, 0)}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing most viewed pages
        </div>
      </CardFooter>
    </Card>
  );
}
