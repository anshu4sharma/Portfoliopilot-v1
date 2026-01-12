// ChartsByCountries
"use client";

import { TrendingUp, Globe } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Cell,
} from "recharts";
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

const CACHE_KEY = "countriesCache";
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes

const countryColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
  "hsl(var(--chart-9))",
  "hsl(var(--chart-10))",
];

const chartConfig = {
  visitors: {
    label: "Visitors",
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

// Custom Bar component with flag and country code at bottom
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
        rx={4}
        className="hover:fill-opacity-80 transition-colors duration-200"
      />
      {/* Flag and country code container at bottom */}
      <g transform={`translate(${x + width / 2}, ${y + height + 15})`}>
        <image
          href={payload.flagUrl}
          x={-10}
          y={0}
          width={20}
          height={15}
          className="rounded-sm"
        />
        <text
          x={0}
          y={25}
          textAnchor="middle"
          fill="currentColor"
          fontSize={11}
        >
          {payload.countryCode}
        </text>
      </g>
    </g>
  );
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="flex items-center gap-2">
          <img
            src={data.flagUrl}
            alt={data.country}
            width={20}
            height={15}
            className="rounded"
          />
          <span className="capitalize">{data.country}</span>
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          Visitors: {data.visitors}
        </div>
      </div>
    );
  }
  return null;
};

export function ChartsByCountries({ routeName }: { routeName: string }) {
  const [selectedRange, setSelectedRange] = useState("28days");
  const [countriesData, setCountriesData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = useCallback(async () => {
    const cacheKey = `${CACHE_KEY}_${routeName}_${selectedRange}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
      setCountriesData(cachedData.data);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/analytics/countries/${routeName}?range=${selectedRange}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch countries data");
      }
      const data = await response.json();
      setCountriesData(data.data);
      setCachedData(cacheKey, data.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load countries data",
      );
    } finally {
      setIsLoading(false);
    }
  }, [routeName, selectedRange]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const getRangeLabel = () => {
    const option = dateRangeOptions.find((opt) => opt.value === selectedRange);
    return option ? option.label.toLowerCase() : "last 28 days";
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0">
        <div className="flex flex-wrap gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-xl">Countries</CardTitle>
            <CardDescription>
              <span className="capitalize">{getRangeLabel()}</span>
              <span> visitor distribution</span>
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
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-center text-muted-foreground">{error}</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={countriesData}
                // margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="country"
                  axisLine={false}
                  tickLine={false}
                  height={60}
                  interval={0}
                  tick={false} // Hide default ticks since we're using custom ones
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Bar dataKey="visitors" shape={<CustomBar />}>
                  <LabelList
                    dataKey="visitors"
                    position="top"
                    style={{ fontSize: "10px" }}
                  />
                  {countriesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={countryColors[index % countryColors.length]}
                    />
                  ))}
                </Bar>
                <ChartTooltip
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                  content={<CustomTooltip />}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <Globe className="h-4 w-4" />
          Total Visitors:{" "}
          {countriesData.reduce((sum, item) => sum + item.visitors, 0)}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing top 10 countries by visitors
        </div>
      </CardFooter>
    </Card>
  );
}
