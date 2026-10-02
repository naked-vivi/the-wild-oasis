import { useId } from "react";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

const chartConfig = {
  totalSales: { label: "Total sales", theme: { light: "#9333ea", dark: "#c084fc" } },
  extrasSales: { label: "Extras sales", theme: { light: "#16a34a", dark: "#4ade80" } },
} satisfies ChartConfig;

type SalesChartProps = {
  bookings: {
    created_at: string;
    totalPrice: number | null;
    extrasPrice: number | null;
  }[];
  numDays: number;
};

function SalesChart({ bookings, numDays }: SalesChartProps) {
  const id = useId().replace(/:/g, "");
  const today = new Date();
  // Match the query's cutoff through today, including its partial first day.
  const days = eachDayOfInterval({ start: subDays(today, numDays), end: today });
  const chartData = days.map((date) => {
    const dailyBookings = bookings.filter((booking) =>
      isSameDay(date, new Date(booking.created_at))
    );

    return {
      date: format(date, "yyyy-MM-dd"),
      label: format(date, "MMM d"),
      totalSales: dailyBookings.reduce((total, booking) => total + (booking.totalPrice ?? 0), 0),
      extrasSales: dailyBookings.reduce((total, booking) => total + (booking.extrasPrice ?? 0), 0),
    };
  });

  return (
    <Card className="col-span-full min-w-0">
      <CardHeader>
        <CardTitle>Sales Overview</CardTitle>
        <CardDescription>
          {format(days[0], "MMM d, yyyy")} – {format(today, "MMM d, yyyy")}. Extras are included in total sales.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bookings.length === 0 && (
          <p className="mb-4 text-sm text-muted-foreground">No bookings in this period.</p>
        )}
        <ChartContainer config={chartConfig} className="h-64 w-full min-w-0 aspect-auto @min-[36rem]:h-80">
          <AreaChart accessibilityLayer data={chartData} margin={{ left: 0, right: 12, top: 12 }}>
            <defs>
              <linearGradient id={`${id}-total`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-totalSales)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-totalSales)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id={`${id}-extras`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-extrasSales)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-extrasSales)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} />
            <YAxis tickLine={false} axisLine={false} width={52} tickFormatter={(value) => `$${new Intl.NumberFormat("en-US", { notation: "compact" }).format(value)}`} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" formatter={(value, name) => (
              <div className="flex w-full items-center justify-between gap-4">
                <span className="text-muted-foreground">{chartConfig[name as keyof typeof chartConfig]?.label ?? name}</span>
                <span className="font-mono font-medium tabular-nums">{formatCurrency(Number(value))}</span>
              </div>
            )} />} />
            <Area dataKey="totalSales" type="monotone" fill={`url(#${id}-total)`} fillOpacity={1} stroke="var(--color-totalSales)" strokeWidth={2} />
            <Area dataKey="extrasSales" type="monotone" fill={`url(#${id}-extras)`} fillOpacity={1} stroke="var(--color-extrasSales)" strokeWidth={2} />
            <ChartLegend content={<ChartLegendContent className="flex-wrap gap-x-4 gap-y-2" />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default SalesChart;
