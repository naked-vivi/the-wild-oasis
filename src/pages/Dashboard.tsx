import DashboardFilter from "@/features/dashboard/DashboardFilter";
import DashboardLayout from "@/features/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <div className="@container min-w-0">
      <div className="my-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <DashboardFilter />
      </div>

      <DashboardLayout />
    </div>
  );
}

export default Dashboard;
