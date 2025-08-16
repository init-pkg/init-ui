import { RulesType } from "@/forms/types";
import { CountryCode } from "libphonenumber-js";
import { InputHTMLAttributes, ReactNode, RefCallback } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export interface InputPropsWithRef
  extends InputHTMLAttributes<HTMLInputElement> {
  ref: RefCallback<HTMLInputElement>;
}

/**
 * @deprecated use PhoneInputGeneratorProps instead
 */
export interface BasePhoneInputGeneratorProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "children" | "value"
  > {
  /**
   * @description value of the phone input
   * @remarks when provided, masks applies automatically
   * @warning international controlled input still not supported
   */
  value?: string;
  /**
   * @description if true, the phone input will be international
   * @default false
   */
  international?: boolean;
  children: (field: InputPropsWithRef) => ReactNode;
  /**
   * @description function that will be called with the country code
   * @param country - country code
   * @returns react node
   */
  renderCountryMark?: (country: CountryCode | undefined) => ReactNode;
}

/**
 * @description props for phone input generator
 * @template T - type of form object
 * @remarks if you want base input props to extends for use, use BasePhoneInputProps instead
 */
export interface PhoneInputGeneratorProps<T extends FieldValues>
  extends BasePhoneInputGeneratorProps {
  name?: Path<T>;
  control?: Control<T>;

  /**
   * @description validation rules for the phone input in react-hook-form standard
   */
  validation?: RulesType<T>;
  /**
   * @description function that will be called with the number and the raw value
   * @param number - number
   * @param raw - raw value
   * - Use it instead of onChange
   */
  onNumberChange?: (number: string, raw: string) => void;
}

/**
 * @description base props for phone input
 * @template T - type of form object
 */
export type BasePhoneInputProps<T extends FieldValues = FieldValues> = Omit<
  PhoneInputGeneratorProps<T>,
  "children"
>;
