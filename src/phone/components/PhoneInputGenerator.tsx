import { refs } from "@/private/refs";
import React, { ForwardedRef, forwardRef } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { unmask } from "../helpers/maskTools";
import { PhoneInputGeneratorProps } from "../types/inputInterfaces";
import BasePhoneInputGenerator from "./BasePhoneInputGenerator";
import { ControllerFieldRenderer } from "@/forms/types";
import { blankControllerField } from "@/forms/noops";

function PhoneInputGenerator<T extends FieldValues>(
  {
    name,
    control,
    onNumberChange,
    validation,
    ...props
  }: PhoneInputGeneratorProps<T>,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  function renderInput({
    ref,
    onChange,
    onBlur,
    value,
  }: ControllerFieldRenderer) {
    return (
      <BasePhoneInputGenerator
        name={name}
        ref={refs(forwardedRef, ref)}
        onBlur={onBlur}
        defaultValue={value}
        onInput={(e) => {
          const val = unmask(e.currentTarget.value);
          onNumberChange?.(val, e.currentTarget.value);
          onChange?.(val);
        }}
        {...props}
      />
    );
  }

  if (!control || !name) return renderInput(blankControllerField);

  return (
    <Controller
      control={control}
      name={name}
      rules={validation}
      render={({ field }) => renderInput(field)}
    />
  );
}

PhoneInputGenerator.displayName = "PhoneInputGenerator";

export default forwardRef(PhoneInputGenerator) as <T extends FieldValues>(
  props: PhoneInputGeneratorProps<T> & { ref: ForwardedRef<HTMLInputElement> }
) => ReturnType<typeof PhoneInputGenerator<T>>;
