import { refs } from "@/private/refs";
import React, { ForwardedRef, forwardRef } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { unmask } from "../helpers/maskTools";
import { PhoneInputGeneratorProps } from "../types/inputInterfaces";
import BasePhoneInputGenerator from "./BasePhoneInputGenerator";
import { ControllerFieldRenderer } from "@/forms/types";
import { blankControllerField } from "@/forms/noops";

/**
 * PhoneInputGenerator - A component that converts your input into a phone input with all needed functionality
 *
 * @example
 * ```tsx
 * <PhoneInputGenerator
 *   {...props}
 *   ref={ref}
 *   renderCountryMark={(country) => (
 *     <div className="absolute right-0 top-0 h-full w-10 text-white bg-red-500">
 *       {country}
 *     </div>
 *   )}
 * >
 *   {(field) => <Input {...field} />}
 * </PhoneInputGenerator>
 * ```
 *
 * @param props - Props for phone input generator
 * @param forwardedRef - Forwarded ref to the input element
 *
 * @remarks
 * - If you want react-hook-form to control the input, you need to pass both name and control props
 * - Do not use register function to register the input, it will not work
 */
function PhoneInputGenerator<T extends FieldValues>(
  props: PhoneInputGeneratorProps<T>,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const { name, control, onNumberChange, validation, ...res } = props;

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
        {...res}
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
