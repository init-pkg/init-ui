import parsePhoneNumberFromString, {
  parsePhoneNumberWithError,
} from "libphonenumber-js";

/**
 * @description unmask phone number
 * @param numbers - phone number
 * @returns unmasked phone number
 * @example```ts
 * unmask("+7 (999) 999-99-99") // "79999999999"
 * ```
 */
export function unmask(numbers: string) {
  return numbers.replace(/\D/g, "");
}

/**
 * @description mask phone number in kz format
 * @param numbers - phone number
 * @returns masked phone number
 * @example```ts
 * mask("79999999999") // "+7 999 999-99-99"
 * ```
 */

export function mask(numbers: string) {
  let onlyNumbers = unmask(numbers);
  if (onlyNumbers.startsWith("8")) {
    onlyNumbers = "7".concat(onlyNumbers.slice(1));
  }

  let i = 0;
  const maskedPhoneNumber = "+_ ___ ___-__-__"
    .split("")
    .map((char) => {
      if (char === "_") {
        const number = onlyNumbers.charAt(i);
        if (i < onlyNumbers.length - 1) i += 1;
        return number;
      }
      return char;
    })
    .join("");

  return maskedPhoneNumber;
}

/**
 * @description intermediate mask for phone number
 * @param phone - phone number
 * @returns intermediate masked phone number
 * @example```ts
 * interMask("79999999999") // "+7 (999) 999-99-99"
 * interMask("81656889888") // "+81 6 5688 9888"
 * ```
 */
export function interMask(phone: string): string {
  try {
    const number = parsePhoneNumberWithError("+" + phone);

    if (!number.country) return phone;

    if (number.country === "RU" || number.country === "KZ") {
      return mask(phone);
    }

    const phoneNumber = parsePhoneNumberFromString(phone, number.country);

    if (!phoneNumber) return phone;

    return phoneNumber.formatInternational();
  } catch {
    return phone;
  }
}
