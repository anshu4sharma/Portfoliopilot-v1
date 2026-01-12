"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Eye, Users, Monitor, Globe } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { ChartByMonths } from "./charts/chart-by-months";
import { ChartsByBrowsers } from "./charts/chart-by-browsers";
import { DailyActiveUsers } from "./charts/chart-daily-active-users";

export function AnalyticsDashboard({ portfolioId }: { portfolioId: number }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`/api/analytics/${portfolioId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch analytics data");
      }
      const data = await res.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      // Optionally set an error state to display to the user
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  console.log("analyticsData -", analyticsData);

  if (!analyticsData) return null;

  return (
    <div className="space-y-8">
      <div className="grid !hidden gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalViews}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Visitors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.uniqueVisitors}
            </div>
          </CardContent>
        </Card>

        {/* More stat cards... */}
      </div>

      <Card className="hidden">
        <CardHeader>
          <CardTitle>Views Trend</CardTitle>
          <div className="flex items-center space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.viewsTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => format(new Date(value), "MMM d")}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) =>
                    format(new Date(value), "MMM d, yyyy")
                  }
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid hidden gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topCountries.map((country: any) => (
                <div key={country.country} className="flex items-center">
                  <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{country.country}</div>
                    <div className="text-xs text-muted-foreground">
                      {country.count} visits
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.deviceBreakdown.map((device: any) => (
                <div key={device.device} className="flex items-center">
                  <Monitor className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{device.device}</div>
                    <div className="text-xs text-muted-foreground">
                      {device.count} visits
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/*  */}
     
    </div>
  );
}
