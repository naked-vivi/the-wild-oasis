import { useMoveBack } from "../hooks/useMoveBack";
import { Button } from "@/components/ui/button";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 p-6 md:p-12">
      <div className="w-full max-w-4xl rounded-xl border bg-card p-8 text-center shadow-sm md:p-12">
        <h1 className="mb-8 text-2xl font-semibold tracking-tight text-card-foreground sm:text-3xl md:text-4xl">
          The page you are looking for could not be found 😢
        </h1>
        <Button onClick={moveBack} size="lg">
          &larr; Go back
        </Button>
      </div>
    </main>
  );
}

export default PageNotFound;
