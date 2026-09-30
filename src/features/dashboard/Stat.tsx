import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const iconColors = {
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  green: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  indigo: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
};

type StatProps = {
  icon: ReactNode;
  title: string;
  value: string | number;
  color: keyof typeof iconColors;
};

function Stat({ icon, title, value, color }: StatProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div
          aria-hidden="true"
          className={cn("flex size-10 shrink-0 items-center justify-center rounded-full [&>svg]:size-5", iconColors[color])}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className="break-words text-2xl font-bold tabular-nums">{value}</p>
      </CardContent>
    </Card>
  );
}

export default Stat;
