import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, isValid, parseISO } from "date-fns";
import { RefreshCw } from "lucide-react";
import { getUserAccounts, USERS_PAGE_SIZE } from "@/services/apiUsers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Spinner from "@/shared/Spinner";
import useUser from "./useUser";

function createdDate(value: string) {
  const date = parseISO(value);
  return isValid(date) ? format(date, "MMM d, yyyy") : "Unavailable";
}

export default function UserAccountsList() {
  const [page, setPage] = useState(1);
  const { user } = useUser();
  const { data, error, isPending, isFetching, refetch } = useQuery({
    queryKey: ["user-accounts", user?.id, page],
    queryFn: () => getUserAccounts(page),
    enabled: Boolean(user),
    retry: false,
  });
  const currentPage = data?.page ?? page;
  const pageCount = Math.max(1, Math.ceil((data?.count ?? 0) / USERS_PAGE_SIZE));

  return (
    <Card className="mx-auto mt-8 w-full min-w-0 max-w-180" aria-busy={isFetching}>
      <CardHeader className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <CardTitle><h2>User accounts{data && !error ? ` (${data.count})` : ""}</h2></CardTitle>
          <CardDescription>Registered accounts, newest first.</CardDescription>
        </div>
        <Button variant="outline" onClick={() => void refetch()} disabled={isFetching}>
          <RefreshCw aria-hidden="true" className={isFetching ? "animate-spin" : undefined} />Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {isPending ? <Spinner /> : error ? (
          <p role="alert" className="rounded-md border border-destructive/30 p-4 text-sm text-destructive">{error.message}</p>
        ) : !data?.users.length ? (
          <p role="status" className="py-8 text-center text-sm text-muted-foreground">No user accounts found.</p>
        ) : (
          <>
            <Table aria-label="Registered user accounts">
              <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Email status</TableHead><TableHead>Created</TableHead></TableRow></TableHeader>
              <TableBody>{data.users.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.fullName || "Name not set"}{account.id === user?.id && <span className="ml-2 text-xs text-muted-foreground">(you)</span>}</TableCell>
                  <TableCell>{account.email || "No email"}</TableCell>
                  <TableCell><span className={`rounded-full px-2 py-1 text-xs font-medium ${account.emailConfirmed ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"}`}>{account.emailConfirmed ? "Confirmed" : "Pending confirmation"}</span></TableCell>
                  <TableCell>{createdDate(account.createdAt)}</TableCell>
                </TableRow>
              ))}</TableBody>
            </Table>
            {pageCount > 1 && <nav aria-label="User account pages" className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <Button variant="outline" disabled={isFetching || currentPage <= 1} onClick={() => setPage(currentPage - 1)}>Previous</Button>
              <span className="text-sm text-muted-foreground" aria-live="polite">Page {currentPage} of {pageCount}</span>
              <Button variant="outline" disabled={isFetching || currentPage >= pageCount} onClick={() => setPage(currentPage + 1)}>Next</Button>
            </nav>}
          </>
        )}
      </CardContent>
    </Card>
  );
}
