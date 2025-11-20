"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { operators } from "@/data/operators"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  target: {
    label: "Target",
    color: "var(--chart-2)",
  },
  output: {
    label: "Output",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function CardChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={operators}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} className="text-white" />
        <Bar dataKey="target" fill="var(--color-target)" radius={4} />
        <Bar dataKey="output" fill="var(--color-output)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
