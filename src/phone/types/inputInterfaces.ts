import { RulesType } from "@/forms/types";
import { CountryCode } from "libphonenumber-js";
import { InputHTMLAttributes, ReactNode, RefCallback } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export interface InputPropsWithRef
  extends InputHTMLAttributes<HTMLInputElement> {
  ref: RefCallback<HTMLInputElement>;
}

export interface BasePhoneInputGeneratorProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "children" | "value"
  > {
  value?: string;
  international?: boolean;
  children: (field: InputPropsWithRef) => ReactNode;
  renderCountryMark?: (country: CountryCode | undefined) => ReactNode;
}

export interface PhoneInputGeneratorProps<T extends FieldValues>
  extends BasePhoneInputGeneratorProps {
  name?: Path<T>;
  control?: Control<T>;
  validation?: RulesType<T>;
  onNumberChange?: (number: string, raw: string) => void;
}
