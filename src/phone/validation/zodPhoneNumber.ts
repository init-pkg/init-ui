import { z } from "zod";
import { unmask } from "../helpers/maskTools";
import { getCountryCallingCode } from "libphonenumber-js";
import { defineCountry } from "../helpers/countryDefinitor";

export interface ZPhoneNumberOptions {
  /**
   * @param message - message for zod schema
   */
  message?: string;
  /**
   * @param shouldRefine - should refine the schema
   * @default true
   */
  shouldRefine?: boolean;
  /**
   * @param exceptions - array of regex or strings for exceptions in schema refinement
   */
  exceptions?: Array<RegExp | string>;
}

type PhoneNumberString =
  | z.ZodString
  | z.ZodEffects<z.ZodString, string, string>;

interface ZPhoneNumber {
  /**
   * @description zod schema for phone number validation
   * @returns zod schema
   */
  (): PhoneNumberString;

  /**
   * @description zod schema for phone number validation
   * @param message - accepts string for error message
   * @returns zod schema
   */
  (message: string): PhoneNumberString;

  /**
   * @description zod schema for phone number validation
   * @param options - accepts ZPhoneNumberOptions object
   * @returns zod schema
   */
  (options: ZPhoneNumberOptions): PhoneNumberString;
}

export const zPhoneNumber: ZPhoneNumber = (
  options?: ZPhoneNumberOptions | string
) => {
  const {
    message = "Invalid phone number",
    shouldRefine = true,
    exceptions = [],
  } = typeof options === "string" ? { message: options } : options || {};

  const baseSchema = z.string({ message });

  const schema = baseSchema.refine((value) => {
    let isExcept = false;

    exceptions.forEach((exp) => {
      const regex = new RegExp(exp);
      const result = regex.test(value);
      if (!isExcept) isExcept = result;
    });

    if (isExcept) return true;

    if (!/^\+?\d{11,15}$/.test(value)) return false;

    const country = defineCountry(unmask(value));
    if (!country) return false;

    const callingCode = getCountryCallingCode(country);
    return !/^(\d)\1+$/.test(value.replace(callingCode, "").replace(/^\+/, ""));
  }, message);

  return shouldRefine ? schema : baseSchema;
};
