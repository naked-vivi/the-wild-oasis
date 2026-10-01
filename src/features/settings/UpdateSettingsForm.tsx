import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useSettings from "./useSettings";
import Spinner from "@/shared/Spinner";
import useUpdateSettings from "./useUpdateSettings";

const settingsSchema = z.object({
  minBookingLength: z.coerce.number({ invalid_type_error: "Enter a whole number greater than 0" }).int("Enter a whole number of nights").min(1, "Minimum stay must be at least 1 night"),
  maxBookingLength: z.coerce.number({ invalid_type_error: "Enter a whole number greater than 0" }).int("Enter a whole number of nights").min(1, "Maximum stay must be at least 1 night"),
  maxGuestsPerBooking: z.coerce.number({ invalid_type_error: "Enter a whole number greater than 0" }).int("Enter a whole number of guests").min(1, "Allow at least 1 guest"),
  breakfastPrice: z.coerce.number({ invalid_type_error: "Enter a breakfast price, such as 10 or 0 for free" }).finite().min(0, "Breakfast price cannot be negative"),
}).refine((values) => values.maxBookingLength >= values.minBookingLength, {
  message: "Maximum stay must be at least as long as the minimum stay",
  path: ["maxBookingLength"],
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const fields = [
  { name: "minBookingLength", label: "Minimum stay (nights)", hint: "The shortest stay guests can book.", min: 1, step: 1 },
  { name: "maxBookingLength", label: "Maximum stay (nights)", hint: "Must be at least as long as the minimum stay.", min: 1, step: 1 },
  { name: "maxGuestsPerBooking", label: "Maximum guests per booking", hint: "Enter a whole number of guests.", min: 1, step: 1 },
  { name: "breakfastPrice", label: "Breakfast price (USD)", hint: "Price per guest, per night. Enter 0 for free breakfast.", min: 0, step: 0.01 },
] as const;

function SettingsForm({ initialValues }: { initialValues: SettingsFormValues }) {
  const { isUpdating, updateSettings } = useUpdateSettings();
  const { register, handleSubmit, reset, setError, formState: { errors, isDirty } } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: SettingsFormValues) {
    if (isUpdating) return;
    updateSettings(values, {
      onSuccess: () => reset(values),
      onError: (error: Error) => setError("root", { message: error.message }),
    });
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-busy={isUpdating} className="space-y-6">
      {fields.map(({ name, label, hint, min, step }) => (
        <Field key={name} data-invalid={Boolean(errors[name])}>
          <FieldLabel htmlFor={name}>{label}</FieldLabel>
          <Input {...register(name, { valueAsNumber: true })} id={name} type="number" min={min} step={step} required disabled={isUpdating}
            aria-invalid={Boolean(errors[name])} aria-describedby={`${name}-hint${errors[name] ? ` ${name}-error` : ""}`} />
          <p id={`${name}-hint`} className="text-sm text-muted-foreground">{hint}</p>
          {errors[name] && <FieldError id={`${name}-error`} errors={[errors[name]]} />}
        </Field>
      ))}
      {errors.root && <p role="alert" className="text-sm text-destructive">{errors.root.message}</p>}
      <div className="flex flex-wrap justify-end gap-3 border-t pt-4">
        <Button type="button" variant="outline" onClick={() => reset()} disabled={isUpdating || !isDirty}>Reset changes</Button>
        <Button type="submit" disabled={isUpdating || !isDirty}>{isUpdating ? "Saving settings..." : "Save settings"}</Button>
      </div>
    </form>
  );
}

export default function UpdateSettingsForm() {
  const { isPending, settings, error } = useSettings();
  if (isPending) return <Spinner />;
  if (error || !settings) return <p role="alert">{error?.message || "Settings could not be loaded."}</p>;

  return (
    <Card className="max-w-xl">
      <CardHeader><CardTitle>Update Settings</CardTitle><CardDescription>Manage booking limits and pricing. Changes apply when you select Save settings.</CardDescription></CardHeader>
      <CardContent><SettingsForm initialValues={{ minBookingLength: settings.minBookingLength, maxBookingLength: settings.maxBookingLength, maxGuestsPerBooking: settings.maxGuestsPerBooking, breakfastPrice: settings.breakfastPrice }} /></CardContent>
    </Card>
  );
}
