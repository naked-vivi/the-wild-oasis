import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import useCreateCabin from "./useCreateCabin"

const cabinSchema = z
  .object({
    name: z.string().trim().min(1, "Cabin name is required"),
    maxCapacity: z.coerce.number().int("Capacity must be a whole number").min(1, "Capacity must be at least 1 guest"),
    regularPrice: z.coerce.number().min(1, "Regular price must be at least 1"),
    discount: z.coerce.number().min(0, "Discount cannot be negative"),
    description: z.string().trim().min(1, "Description is required"),
    image: z.any().refine(
      (value) => (typeof value === "string" && value.length > 0) || (value instanceof File && value.type.startsWith("image/")),
      "Choose an image for this cabin",
    ),
  })
  .refine((data) => data.discount <= data.regularPrice, {
    message: "Discount should be less than or equal to regular price",
    path: ["discount"],
  })

type CabinFormValues = z.infer<typeof cabinSchema>

type CreateCabinFormProps = {
  cabinToEdit?: CabinFormValues & { id?: number },
  onClose?: () => void
}

export default function CreateCabinForm({ cabinToEdit = {}, onClose }: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit;

  const { createCabinMutate, isCreating, isEditSession } = useCreateCabin({
    editId,
    onSuccessCallback: () => {
      form.reset();
      onClose?.();
    },
  });

  const sanitizedValues = isEditSession
    ? {
      name: editValues.name ?? "",
      maxCapacity: editValues.maxCapacity ?? 1,
      regularPrice: editValues.regularPrice ?? 0,
      discount: editValues.discount ?? 0,
      description: editValues.description ?? "",
      image: editValues.image ?? "",
    }
    : {
      name: "",
      maxCapacity: 1,
      regularPrice: 0,
      discount: 0,
      description: "",
      image: "",
    };

  const form = useForm<CabinFormValues>({
    resolver: zodResolver(cabinSchema),
    values: sanitizedValues,
  });


  function onSubmit(data: CabinFormValues) {
    if (isCreating) return;
    createCabinMutate(data);
  }

  return (
        <form id="cabin-form" noValidate aria-busy={isCreating} onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset disabled={isCreating} className="min-w-0">
          <FieldGroup className="space-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="cabin-name">Cabin name</FieldLabel>
                  <Input
                    {...field}
                    id="cabin-name"
                    placeholder="e.g. 001"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={`cabin-name-hint${fieldState.invalid ? " cabin-name-error" : ""}`}
                  />
                  <p id="cabin-name-hint" className="text-sm text-muted-foreground">A short name or number, such as 001.</p>
                  {fieldState.invalid && (
                    <FieldError id="cabin-name-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="maxCapacity"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="maxCapacity">Maximum capacity</FieldLabel>
                  <Input
                    {...field}
                    type="number" min={1} step={1}
                    id="maxCapacity"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={`maxCapacity-hint${fieldState.invalid ? " maxCapacity-error" : ""}`}
                  />
                  <p id="maxCapacity-hint" className="text-sm text-muted-foreground">Maximum number of guests, such as 4.</p>
                  {fieldState.invalid && (
                    <FieldError id="maxCapacity-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="regularPrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="regularPrice">Regular price (USD / night)</FieldLabel>
                  <Input
                    {...field}
                    type="number" min={1} step="0.01"
                    id="regularPrice"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={`regularPrice-hint${fieldState.invalid ? " regularPrice-error" : ""}`}
                  />
                  <p id="regularPrice-hint" className="text-sm text-muted-foreground">Nightly rate before any discount.</p>
                  {fieldState.invalid && (
                    <FieldError id="regularPrice-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="discount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="discount">Discount (USD / night)</FieldLabel>
                  <Input
                    {...field}
                    type="number" min={0} step="0.01"
                    id="discount"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={`discount-hint${fieldState.invalid ? " discount-error" : ""}`}
                  />
                  <p id="discount-hint" className="text-sm text-muted-foreground">Enter 0 for no discount. Cannot exceed the nightly rate.</p>
                  {fieldState.invalid && (
                    <FieldError id="discount-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">
                    Description for website
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    rows={4}
                    placeholder="Describe the cabin..."
                    aria-invalid={fieldState.invalid}
                    aria-describedby={`description-hint${fieldState.invalid ? " description-error" : ""}`}
                  />
                  <p id="description-hint" className="text-sm text-muted-foreground">Describe amenities, beds, and what makes this cabin special.</p>
                  {fieldState.invalid && (
                    <FieldError id="description-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field: imageField, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image">Cabin photo</FieldLabel>
                  <Input
                    name={imageField.name}
                    ref={imageField.ref}
                    onBlur={imageField.onBlur}
                    type="file"
                    id="image"
                    accept="image/*"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={`image-hint${fieldState.invalid ? " image-error" : ""}`}
                    onChange={(e) => imageField.onChange(e.target.files?.[0] ?? editValues.image ?? "")}
                  />
                  <p id="image-hint" className="text-sm text-muted-foreground">Choose an image. When editing, leave blank to keep the current photo.</p>
                  {fieldState.invalid && (
                    <FieldError id="image-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex flex-wrap justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onClose?.()}
              >
                Cancel
              </Button>
              
              <Button type="submit" disabled={isCreating}>{isCreating ? "Saving cabin..." : isEditSession ? "Update cabin" : "Add cabin"}</Button>
            </div>
          </FieldGroup>
          </fieldset>
        </form>
  )
}
