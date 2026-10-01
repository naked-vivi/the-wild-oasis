import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function DashboardBox({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-6 rounded-md border bg-card p-8 text-card-foreground", className)}
      {...props}
    />
  );
}

export default DashboardBox;
