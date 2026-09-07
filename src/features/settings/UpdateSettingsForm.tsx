import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useSettings from "./useSettings";
import Spinner from "@/shared/Spinner";
import useUpdateSettings from "./useUpdateSettings";

const settingsSchema = z.object({
  minBookingLength: z.coerce.number().min(1, "Minimum nights must be at least 1"),
  maxBookingLength: z.coerce.number().min(1, "Maximum nights must be at least 1"),
  maxGuestsPerBooking: z.coerce.number().min(1, "Maximum guests must be at least 1"),
  breakfastPrice: z.coerce.number().min(0, "Breakfast price cannot be negative"),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function UpdateSettingsForm() {
  const { isPending, settings } = useSettings();
  const { isUpdating, updateSettings } = useUpdateSettings();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      minBookingLength: settings?.minBookingLength ?? 0,
      maxBookingLength: settings?.maxBookingLength ?? 0,
      maxGuestsPerBooking: settings?.maxGuestsPerBooking ?? 0,
      breakfastPrice: settings?.breakfastPrice ?? 0,
    },
  });

  function onSubmit(values: SettingsFormValues) {
    console.log("Updated Settings:", values);
    // Call your update mutation here
  }

  function handleBlur(field: keyof SettingsFormValues, value: string, currentValue: number) {
    const numericValue = Number(value);
    // Skip API call if value didn't change, is invalid, or if empty
    if (!value || isNaN(numericValue) || numericValue === currentValue) return;

    // Trigger your API mutation
    updateSettings({ [field]: numericValue });
  }

  if (isPending) return <Spinner />;

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Update Settings</CardTitle>
        <CardDescription>
          Manage your booking constraints and default pricing.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Minimum Nights */}
        <Controller
          name="minBookingLength"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="minBookingLength">
                Minimum nights/booking
              </FieldLabel>
              <Input
                {...field}
                type="number"
                id="minBookingLength"
                aria-invalid={fieldState.invalid}
                disabled={isUpdating}
                onBlur={(e) => {
                  field.onBlur();
                  handleBlur("minBookingLength", e.target.value, minBookingLength);
                }}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Maximum Nights */}
        <Controller
          name="maxBookingLength"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="maxBookingLength">
                Maximum nights/booking
              </FieldLabel>
              <Input
                {...field}
                type="number"
                id="maxBookingLength"
                aria-invalid={fieldState.invalid}
                disabled={isUpdating}
                onBlur={(e) => {
                  field.onBlur();
                  handleBlur("maxBookingLength", e.target.value, maxBookingLength);
                }}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Maximum Guests */}
        <Controller
          name="maxGuestsPerBooking"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="maxGuestsPerBooking">
                Maximum guests/booking
              </FieldLabel>
              <Input
                {...field}
                type="number"
                id="maxGuestsPerBooking"
                aria-invalid={fieldState.invalid}
                disabled={isUpdating}
                onBlur={(e) => {
                  field.onBlur();
                  handleBlur("maxGuestsPerBooking", e.target.value, maxGuestsPerBooking);
                }}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {/* Breakfast Price */}
        <Controller
          name="breakfastPrice"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="breakfastPrice">
                Breakfast price ($)
              </FieldLabel>
              <Input
                {...field}
                type="number"
                step="0.01"
                id="breakfastPrice"
                aria-invalid={fieldState.invalid}
                disabled={isUpdating}
                onBlur={(e) => {
                  field.onBlur();
                  handleBlur("breakfastPrice", e.target.value, breakfastPrice);
                }}
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <div className="flex justify-end pt-2">
          <Button onClick={form.handleSubmit(onSubmit)}>Update settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}