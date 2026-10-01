import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useTodayActivity from "./useTodayActivity";
import TodayItem from "./TodayItem";
import Spinner from "@/shared/Spinner";

function TodayActivity() {
  const { isPending, activities, error } = useTodayActivity();

  return (
    <Card className="flex min-h-0 min-w-0 flex-col lg:col-span-2">
      <CardHeader>
        <CardTitle>Today</CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col overflow-auto" aria-busy={isPending}>
        {isPending ? (
          <Spinner />
        ) : error ? (
          <p role="alert" className="text-sm text-destructive">{error.message}</p>
        ) : activities.length > 0 ? (
          <ul className="min-w-116">
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </ul>
        ) : (
          <p className="my-auto py-8 text-center text-sm text-muted-foreground">No activity today.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default TodayActivity;
