import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { signup } from "@/services/apiAuth";

const signupSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().min(1, "Email address is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
  passwordConfirm: z.string().min(1, "Please repeat your password"),
}).refine((values) => values.password === values.passwordConfirm, {
  message: "Passwords must match",
  path: ["passwordConfirm"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const fields = [
  { name: "fullName", label: "Full name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email address", type: "email", autoComplete: "email" },
  { name: "password", label: "Password (min 8 characters)", type: "password", autoComplete: "new-password" },
  { name: "passwordConfirm", label: "Repeat password", type: "password", autoComplete: "new-password" },
] as const;

function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", passwordConfirm: "" },
  });

  async function onSubmit({ fullName, email, password }: SignupFormValues) {
    clearErrors("root");
    try {
      const data = await signup({ fullName, email, password });
      reset();
      toast.add({
        type: "success",
        description: data.session
          ? "User successfully created."
          : "Signup request accepted. The user may need to confirm their email before signing in.",
      });
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Unable to create the user. Please try again.",
      });
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      aria-busy={isSubmitting}
      className="space-y-6 rounded-xl w-180 mx-auto border border-border bg-card p-6 text-card-foreground shadow-sm sm:p-8"
    >
      {fields.map(({ name, label, type, autoComplete }) => (
        <div key={name} className="grid gap-2 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] sm:items-start sm:gap-6">
          <Label htmlFor={name} className="sm:pt-3">{label}</Label>
          <div className="space-y-2">
            <Input
              {...register(name)}
              type={type}
              id={name}
              autoComplete={autoComplete}
              required
              disabled={isSubmitting}
              aria-invalid={Boolean(errors[name])}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
              className="h-10"
            />
            {errors[name] && <FieldError id={`${name}-error`} errors={[errors[name]]} />}
          </div>
        </div>
      ))}

      {errors.root && <FieldError errors={[errors.root]} />}

      <div className="flex flex-wrap justify-end gap-3 border-t border-border pt-6">
        <Button variant="outline" type="reset" size="lg" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Creating user..." : "Create new user"}
        </Button>
      </div>
    </form>
  );
}

export default SignupForm;
