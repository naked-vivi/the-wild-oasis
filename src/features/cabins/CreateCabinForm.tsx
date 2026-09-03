import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCabin } from "@/services/apiCabins"
import { data } from "react-router-dom"
import { toast } from "@/components/ui/toast"

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

export default function CreateCabinForm() {

  const queryClient = useQueryClient();

  const { mutate, isPending: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.add({
        type: "success",
        description: "New cabin successfully created!",
      });
      console.log(data)

      queryClient.invalidateQueries({ queryKey: ['cabins'] });

      form.reset();
    },
  });

  const form = useForm<CabinFormValues>({
    resolver: zodResolver(cabinSchema),
    defaultValues: {
      name: "",
      maxCapacity: 1,
      regularPrice: 0,
      discount: 0,
      description: "",
    },
  })

  function onSubmit(data: CabinFormValues) {
    // mutate({ ...data, image: data.image[0] })
    mutate(data);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Cabin</CardTitle>
      </CardHeader>
      <CardContent>
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
              render={({ field: { onChange, ...fieldProps }, fieldState }) => (
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
                type="reset"
                variant="outline"
              // onClick={() => form.reset()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreating}>Add cabin</Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}