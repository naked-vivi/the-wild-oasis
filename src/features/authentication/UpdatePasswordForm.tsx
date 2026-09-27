import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import { useUpdateUser } from "./useUpdateUser";

type PasswordFormValues = {
  password: string;
  passwordConfirm: string;
};

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm<PasswordFormValues>({
    defaultValues: { password: "", passwordConfirm: "" },
  });
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }: PasswordFormValues) {
    if (isUpdating) return;
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      aria-busy={isUpdating}
      className="space-y-6 rounded-xl border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8"
    >
      <div className="grid gap-2 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:items-start sm:gap-6">
        <Label htmlFor="password" className="sm:pt-3">Password (min 8 characters)</Label>
        <div className="space-y-2">
        <Input
          type="password"
          id="password"
          autoComplete="new-password"
          className="h-10"
          required
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : undefined}
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
          {errors.password && <FieldError id="password-error" errors={[errors.password]} />}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:items-start sm:gap-6">
        <Label htmlFor="passwordConfirm" className="sm:pt-3">Confirm password</Label>
        <div className="space-y-2">
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          className="h-10"
          required
          aria-invalid={Boolean(errors.passwordConfirm)}
          aria-describedby={errors.passwordConfirm ? "passwordConfirm-error" : undefined}
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              getValues().password === value || "Passwords need to match",
          })}
        />
          {errors.passwordConfirm && <FieldError id="passwordConfirm-error" errors={[errors.passwordConfirm]} />}
        </div>
      </div>
      <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-6">
        <Button type="reset" variant="outline" size="lg" disabled={isUpdating}>
          Cancel
        </Button>
        <Button type="submit" size="lg" disabled={isUpdating}>
          {isUpdating ? "Updating password..." : "Update password"}
        </Button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
