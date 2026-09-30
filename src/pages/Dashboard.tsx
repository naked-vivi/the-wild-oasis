import DashboardFilter from "@/features/dashboard/DashboardFilter";
import DashboardLayout from "@/features/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <>
      <h1 className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-3xl font-bold tracking-tight text-foreground my-6">Dashboard</div>
        <DashboardFilter />
      </h1>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
