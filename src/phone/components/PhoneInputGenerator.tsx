import { refs } from "@/private/refs";
import React, {
  ForwardedRef,
  forwardRef,
  ReactElement,
  RefAttributes,
} from "react";
import { Controller, FieldValues } from "react-hook-form";
import { unmask } from "../helpers/maskTools";
import { PhoneInputGeneratorProps } from "../types/inputInterfaces";
import BasePhoneInputGenerator from "./BasePhoneInputGenerator";
import { ControllerFieldRenderer } from "@/forms/types";
import { blankControllerField } from "@/forms/noops";

function Renderer<T extends FieldValues>(
  {
    name,
    control,
    onNumberChange,
    validation,
    ...res
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

/**
 * PhoneInputGenerator - A component that converts your input into a phone input with all needed functionality
 *
 * @example
 * ```tsx
 * "use client" // if used in Next.js app router
 *
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
 * @param ref - Forwarded ref to the input element
 *
 * @remarks
 * - If you want react-hook-form to control the input, you need to pass both name and control props
 * - Do not use register function to register the input, it will not work
 * - manual control of the input can be achieved using the onNumberChange and value props
 *
 * @warning international controlled input still not supported
 */
export const PhoneInputGenerator = forwardRef(Renderer) as <
  T extends FieldValues,
>(
  props: PhoneInputGeneratorProps<T> & RefAttributes<HTMLInputElement>
) => ReactElement;
