import { useRef, useState } from "react";
import type { SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const { user, isPending } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentFullName = user?.user_metadata?.fullName ?? "";
  
  const [fullName, setFullName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending || isUpdating || !user) return;

    const nextFullName = (fullName ?? currentFullName).trim();
    if (!nextFullName) return;

    updateUser(
      { fullName: nextFullName, avatar },
      { onSuccess: handleReset },
    );
  }

  function handleReset() {
    setFullName(null);
    setAvatar(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      aria-busy={isPending || isUpdating}
      className="space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8"
    >
      <div className="grid gap-2 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:items-center sm:gap-6">
        <Label htmlFor="accountEmail">Email address</Label>
        <Input
          type="email"
          id="accountEmail"
          autoComplete="email"
          value={user?.email ?? ""}
          disabled
          className="h-10"
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:items-center sm:gap-6">
        <Label htmlFor="accountFullName">Full name</Label>
        <Input
          type="text"
          id="accountFullName"
          required
          pattern=".*\S.*"
          title="Enter your full name"
          autoComplete="name"
          value={fullName ?? currentFullName}
          onChange={(event) => setFullName(event.target.value)}
          disabled={isPending || isUpdating || !user}
          className="h-10"
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:items-start sm:gap-6">
        <Label htmlFor="avatar" className="sm:pt-3">Avatar image</Label>
        <div className="min-w-0 space-y-2">
          <Input
            ref={fileInputRef}
            type="file"
            id="avatar"
            accept="image/*"
            onChange={(event) => setAvatar(event.target.files?.[0] ?? null)}
            disabled={isPending || isUpdating || !user}
            aria-describedby="avatar-description"
            className="h-10 cursor-pointer file:mr-3 file:cursor-pointer"
          />
          <p id="avatar-description" className="text-sm text-muted-foreground">
            {avatar ? `Selected: ${avatar.name}` : "Choose an image for your profile."}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-6">
        <Button type="reset" variant="outline" size="lg" disabled={isPending || isUpdating || !user}>
          Cancel
        </Button>
        <Button type="submit" size="lg" disabled={isPending || isUpdating || !user}>
          {isUpdating ? "Updating account..." : "Update account"}
        </Button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
