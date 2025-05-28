import { maskitoChangeEventPlugin, MaskitoOptions } from "@maskito/core";
import {
  maskitoAddOnFocusPlugin,
  maskitoPrefixPostprocessorGenerator,
  maskitoRemoveOnBlurPlugin,
} from "@maskito/kit";
import { maskitoPhoneOptionsGenerator } from "@maskito/phone";
import { CountryCode, getCountryCallingCode } from "libphonenumber-js/core";
import metadata from "libphonenumber-js/metadata.full.json";
import { defineCountry } from "../helpers/countryDefinitor";

const countryIsoCode: CountryCode = "KZ";
const code = getCountryCallingCode(countryIsoCode, metadata);
const prefix = `+${code} `;

const internationalMask = maskitoPhoneOptionsGenerator({
  metadata,
  countryIsoCode,
  separator: " ",
  strict: false,
});

const kazakhMask = {
  mask: [
    "+",
    code,
    " ",
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
  ],
};

export default {
  ...internationalMask,
  mask: (state) => {
    const baseCountry = defineCountry(state.value) as CountryCode;

    if (baseCountry === "KZ" || baseCountry === "RU") {
      return kazakhMask.mask;
    }

    if (typeof internationalMask.mask === "function") {
      return internationalMask.mask(state);
    }

    return internationalMask.mask;
  },
  // preprocessors: [createCompletePhoneInsertionPreprocessor()],
  postprocessors: [maskitoPrefixPostprocessorGenerator("+")],
  plugins: [
    maskitoAddOnFocusPlugin(prefix),
    maskitoRemoveOnBlurPlugin(prefix),
    maskitoChangeEventPlugin(),
  ],
} satisfies MaskitoOptions;

// function createCompletePhoneInsertionPreprocessor(): MaskitoPreprocessor {
//   const trimPrefix = (value: string): string =>
//     value.replace(/^(\+?7?\s?8?)\s?/g, "");

//   const countDigits = (value: string): number =>
//     value.replace(/\D/g, "").length;

//   return ({ elementState, data }) => {
//     const { value, selection } = elementState;

//     const baseCountry = defineCountry(value) as CountryCode;

//     if (baseCountry !== "KZ" && baseCountry !== "RU") {
//       return {
//         elementState: {
//           value,
//           selection,
//         },
//         data,
//       };
//     }

//     return {
//       elementState: {
//         selection,
//         value: countDigits(value) > 11 ? trimPrefix(value) : value,
//       },
//       data: countDigits(data) >= 11 ? trimPrefix(data) : data,
//     };
//   };
// }
