import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import useUser from "./useUser";

function UserAvatar() {
  const { user, isPending } = useUser();

  if (isPending) {
    return (
      <div className="flex items-center gap-3" role="status" aria-label="Loading user">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="hidden h-4 w-24 sm:block" />
      </div>
    );
  }

  if (!user) return null;

  const metadataName = user.user_metadata?.fullName;
  const fullName = typeof metadataName === "string" ? metadataName.trim() : "";
  const displayName = fullName || user.email || "User";
  const avatar = user.user_metadata?.avatar;
  const initials = fullName
    ? fullName.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()
    : displayName[0].toUpperCase();

  return (
    <div className="flex min-w-0 items-center gap-3 text-sm font-medium text-foreground">
      <Avatar className="size-9 ring-2 ring-border">
        <AvatarImage src={typeof avatar === "string" ? avatar : "default-user.jpg"} alt={displayName} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <span className="hidden max-w-48 truncate sm:block" title={displayName}>
        {displayName}
      </span>
    </div>
  );
}

export default UserAvatar;
