import { Controller } from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { IFieldControllerInputProps } from "@/lib/interfaces";

export function FieldControllerInput({
  name,
  control,
  label,
  placeholder,
  description,
  hasCustomErrors,
  customErrors,
  type,
}: IFieldControllerInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`register-form_${name}`}>{label}</FieldLabel>
          <Input
            {...field}
            id={`register-form_${name}`}
            aria-invalid={fieldState.invalid}
            autoComplete="off"
            placeholder={placeholder}
            type={type}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          {hasCustomErrors && <FieldError errors={customErrors} />}
        </Field>
      )}
    />
  );
}
