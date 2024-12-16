"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
import { getDefaultDateRange, parseDateFromUrl } from "@/utils/date";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useMemo } from "react";
import { getAlertsStats } from "./actions";
import { IncidentType } from "@/types/alerts";

const chartConfig = {
  [IncidentType.HumanDisease]: {
    color: "hsl(var(--chart-1))",
    label: "Human Disease",
  },
  [IncidentType.Death]: {
    color: "hsl(var(--chart-2))",
    label: "Human Death",
  },
  [IncidentType.Pandemic]: {
    color: "hsl(var(--chart-3))",
    label: "Pandemic",
  },
  [IncidentType.AnimalDiseaseDeath]: {
    color: "hsl(var(--chart-4))",
    label: "Animal Disease/Death",
  },
  [IncidentType.EbolaLikeSymptoms]: {
    color: "hsl(var(--chart-5))",
    label: "Ebola-like Symptoms",
  },
  [IncidentType.DogBites]: {
    color: "hsl(var(--chart-6))",
    label: "Dog Bites",
  },
} satisfies ChartConfig;

export function Overview() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const dateRange = useMemo(
    () =>
      from && to
        ? {
            from: parseDateFromUrl(from),
            to: parseDateFromUrl(to),
          }
        : getDefaultDateRange(),
    [from, to]
  );

  const url = useMemo(
    () =>
      !dateRange?.from || !dateRange?.to
        ? null
        : `/api/dashboard/alerts?from=${dateRange.from.toISOString()}&to=${dateRange.to.toISOString()}`,
    [dateRange]
  );

  const { data } = useSWR(url, () =>
    getAlertsStats(dateRange.from!, dateRange.to!)
  );

  const { current = [], previous = [], trends = [] } = data || {};

  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Total Alerts</CardTitle>
        <CardDescription>
          {dateRange?.from?.toLocaleDateString() || "From"} -{" "}
          {dateRange?.to?.toLocaleDateString() || "To"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={trends}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey={IncidentType.HumanDisease.toLowerCase()}
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={false}
              label="Human Disease"
            />
            <Line
              dataKey={IncidentType.Death.toLowerCase()}
              type="monotone"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={false}
              label="Human Death"
            />
            <Line
              dataKey={IncidentType.Pandemic.toLowerCase()}
              type="monotone"
              stroke="hsl(var(--chart-3))"
              strokeWidth={2}
              dot={false}
              label="Pandemic"
            />
            <Line
              dataKey={IncidentType.AnimalDiseaseDeath.toLowerCase()}
              type="monotone"
              stroke="hsl(var(--chart-4))"
              strokeWidth={2}
              dot={false}
              label="Animal Disease/Death"
            />
            <Line
              dataKey={IncidentType.EbolaLikeSymptoms.toLowerCase()}
              type="monotone"
              stroke="hsl(var(--chart-5))"
              strokeWidth={2}
              dot={false}
              label="Ebola-like Symptoms"
            />
            <Line
              dataKey={IncidentType.DogBites.toLowerCase()}
              type="monotone"
              stroke="hsl(var(--chart-6))"
              strokeWidth={2}
              dot={false}
              label="Dog Bites"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {calculatePercentageChange(current.length, previous.length)}
              % from last month
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <span>{current.length}</span>
              <span>total alerts</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function calculatePercentageChange(current: number, previous: number): string {
  if (previous === 0) return "+100.00";
  const change = ((current - previous) / previous) * 100;
  return change > 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
}
