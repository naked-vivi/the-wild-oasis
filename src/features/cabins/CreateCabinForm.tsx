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
    name: z.string().min(1, "Cabin name is required"),
    maxCapacity: z.coerce.number().min(1, "Capacity must be at least 1 guest"),
    regularPrice: z.coerce.number().min(1, "Regular price must be at least 1"),
    discount: z.coerce.number().min(0, "Discount cannot be negative"),
    description: z.string().min(1, "Description is required"),
    image: z.any().optional(),
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
  console.log(cabinToEdit)
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
    // mutate({ ...data, image: data.image[0] })
    createCabinMutate(data);
  }

  return (
        <form id="cabin-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
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
                    type="number"
                    id="maxCapacity"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="regularPrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="regularPrice">Regular price</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="regularPrice"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="discount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="discount">Discount</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id="discount"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
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
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field: { value, onChange, ...fieldProps }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="image">Cabin photo</FieldLabel>
                  <Input
                    {...fieldProps}
                    type="file"
                    id="image"
                    accept="image/*"
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => onChange(e.target.files?.[0])}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onClose?.()}
              >
                Cancel
              </Button>
              
              <Button type="submit" disabled={isCreating}>{isEditSession ? "Update cabin" : "Add cabin"}</Button>
            </div>
          </FieldGroup>
        </form>
  )
}