import { CountryCode, parsePhoneNumberWithError } from "libphonenumber-js";
import { interMask } from "./maskTools";

/**
 * @description define country by phone number
 * @param value - phone number
 * @returns country code or undefined if country is not defined
 */
export function defineCountry(value?: string): CountryCode | undefined {
  if (!value) return undefined;

  const parsedValue = interMask(value);

  try {
    const phoneNumber = parsePhoneNumberWithError(parsedValue);

    if (phoneNumber.country) {
      return phoneNumber.country;
    } else {
      return undefined;
    }
  } catch {
    return undefined;
  }
}
