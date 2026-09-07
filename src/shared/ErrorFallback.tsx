import { Button } from "@/components/ui/button"

export function ErrorFallback({
    error,
    resetErrorBoundary,
}: {
    error: Error
    resetErrorBoundary: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center p-6 border border-destructive/20 bg-destructive/5 rounded-lg space-y-3">
            <h3 className="font-semibold text-destructive">Something went wrong</h3>
            <p className="text-sm text-muted-foreground">{error.message}</p>
            <Button variant="outline" size="sm" onClick={resetErrorBoundary}>
                Try again
            </Button>
        </div>
    )
}