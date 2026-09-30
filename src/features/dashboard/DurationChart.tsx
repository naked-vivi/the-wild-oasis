import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

const durationGroups = [
  { key: "one", label: "1 night", max: 1, color: "#ef4444" },
  { key: "two", label: "2 nights", max: 2, color: "#f97316" },
  { key: "three", label: "3 nights", max: 3, color: "#eab308" },
  { key: "fourFive", label: "4–5 nights", max: 5, color: "#84cc16" },
  { key: "sixSeven", label: "6–7 nights", max: 7, color: "#22c55e" },
  { key: "eightFourteen", label: "8–14 nights", max: 14, color: "#14b8a6" },
  { key: "fifteenTwentyOne", label: "15–21 nights", max: 21, color: "#3b82f6" },
  { key: "twentyTwoPlus", label: "22+ nights", max: Infinity, color: "#a855f7" },
];

const chartConfig = Object.fromEntries(
  durationGroups.map(({ key, label, color }) => [key, { label, color }])
) satisfies ChartConfig;

type DurationChartProps = {
  confirmedStays: readonly { numNights: number | null }[];
};

function DurationChart({ confirmedStays }: DurationChartProps) {
  const groups = durationGroups.map(({ key }) => ({
    duration: key,
    stays: 0,
    fill: `var(--color-${key})`,
  }));

  for (const { numNights } of confirmedStays) {
    if (numNights == null || !Number.isInteger(numNights) || numNights < 1) continue;
    const index = durationGroups.findIndex(({ max }) => numNights <= max);
    groups[index].stays += 1;
  }

  const chartData = groups.filter(({ stays }) => stays > 0);
  const totalStays = chartData.reduce((total, group) => total + group.stays, 0);

  return (
    <Card className="min-w-0 lg:col-span-2">
      <CardHeader>
        <CardTitle>Stay Duration Summary</CardTitle>
        <CardDescription>Checked-in and checked-out stays in the selected period.</CardDescription>
      </CardHeader>
      <CardContent>
        {totalStays === 0 ? (
          <div className="flex h-80 items-center justify-center text-center text-sm text-muted-foreground">
            No confirmed stays with a recorded duration in this period.
          </div>
        ) : (
          <>
            <ChartContainer config={chartConfig} className="mx-auto h-80 w-full aspect-auto">
              <PieChart accessibilityLayer>
                <ChartTooltip content={<ChartTooltipContent nameKey="duration" hideLabel />} />
                <Pie data={chartData} dataKey="stays" nameKey="duration" innerRadius={70} outerRadius="75%" stroke="var(--background)" strokeWidth={2} />
                <ChartLegend content={<ChartLegendContent nameKey="duration" className="flex-wrap gap-x-4 gap-y-2 text-xs" />} />
              </PieChart>
            </ChartContainer>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {totalStays} {totalStays === 1 ? "stay" : "stays"} in total
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default DurationChart;
