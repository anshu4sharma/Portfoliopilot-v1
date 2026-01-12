"use client";

import { TrendingUp } from "lucide-react";
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

const CACHE_KEY = "referrersCache";
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

//

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  google: {
    label: "Google",
    color: "hsl(var(--chart-4))",
  },
  bing: {
    label: "Bing",
    color: "hsl(var(--chart-2))",
  },
  yahoo: {
    label: "Yahoo",
    color: "hsl(var(--chart-3))",
  },
  duckduckgo: {
    label: "DuckDuckGo",
    color: "hsl(var(--chart-4))",
  },
  facebook: {
    label: "Facebook",
    color: "hsl(var(--chart-5))",
  },
  twitter: {
    label: "Twitter",
    color: "hsl(var(--chart-6))",
  },
  linkedin: {
    label: "LinkedIn",
    color: "hsl(var(--chart-7))",
  },
  instagram: {
    label: "Instagram",
    color: "hsl(var(--chart-8))",
  },
  pinterest: {
    label: "Pinterest",
    color: "hsl(var(--chart-9))",
  },
  reddit: {
    label: "Reddit",
    color: "hsl(var(--chart-10))",
  },
  youtube: {
    label: "YouTube",
    color: "hsl(var(--chart-1))",
  },
  tiktok: {
    label: "TikTok",
    color: "hsl(var(--chart-2))",
  },
  github: {
    label: "GitHub",
    color: "hsl(var(--chart-3))",
  },
  gitlab: {
    label: "GitLab",
    color: "hsl(var(--chart-4))",
  },
  stackoverflow: {
    label: "StackOverflow",
    color: "hsl(var(--chart-5))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-6))",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-7))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-8))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-9))",
  },
  direct: {
    label: "Direct",
    color: "hsl(var(--chart-10))",
  },
  email: {
    label: "Email",
    color: "hsl(var(--chart-1))",
  },
  vercel: {
    label: "Vercel",
    color: "hsl(var(--chart-2))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function ChartByReferrers({ routeName }: { routeName: string }) {
  const [selectedRange, setSelectedRange] = useState("28days");
  const [referrersData, setReferrersData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReferrers = useCallback(async () => {
    const cacheKey = `${CACHE_KEY}_${routeName}_${selectedRange}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setReferrersData(cachedData.data);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/analytics/referrers/${routeName}?range=${selectedRange}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch referrers data");
      }
      const data = await response.json();
      setReferrersData(data.data);
      setCachedData(cacheKey, data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load referrers");
    } finally {
      setIsLoading(false);
    }
  }, [routeName, selectedRange]);

  useEffect(() => {
    fetchReferrers();
  }, [fetchReferrers]);

  const getRangeLabel = () => {
    const option = dateRangeOptions.find((opt) => opt.value === selectedRange);
    return option ? option.label.toLowerCase() : "last 28 days";
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0">
        <div className="flex flex-wrap gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl">Traffic Sources</CardTitle>
            <CardDescription>
              <span className="capitalize">{getRangeLabel()}</span>
              <span> Traffic Sources </span>
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
              data={referrersData}
              layout="vertical"
              margin={{
                left: 10,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="referrer"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <XAxis dataKey="visitors" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="visitors"
                layout="vertical"
                radius={5}
                label={{ position: "right", fill: "hsl(var(--foreground))" }}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total Visitors:{" "}
          {referrersData.reduce((sum, item) => sum + item.visitors, 0)}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors by referrer
        </div>
      </CardFooter>
    </Card>
  );
}
