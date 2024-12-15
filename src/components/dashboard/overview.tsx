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

const chartData = [
  { month: "January", death: 186, pandemic: 80, disease: 20 },
  { month: "February", death: 305, pandemic: 200, disease: 10 },
  { month: "March", death: 237, pandemic: 120, disease: 30 },
  { month: "April", death: 73, pandemic: 190, disease: 40 },
  { month: "May", death: 209, pandemic: 130, disease: 50 },
  { month: "June", death: 214, pandemic: 140, disease: 60 },
];

const chartConfig = {
  death: {
    label: "Death",
    color: "hsl(var(--chart-1))",
  },
  pandemic: {
    label: "Pandemic",
    color: "hsl(var(--chart-2))",
  },
  disease: {
    label: "Human Disease",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function Overview() {
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle>Total Alerts</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
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
              dataKey="death"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="pandemic"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="disease"
              type="monotone"
              stroke="var(--color-tablet)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              +0.10% from last month
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <span>3,234</span>
              <span>total alerts</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
