import {
  maskitoChangeEventPlugin,
  MaskitoOptions,
  MaskitoPreprocessor,
} from "@maskito/core";
import {
  maskitoAddOnFocusPlugin,
  maskitoPrefixPostprocessorGenerator,
  maskitoRemoveOnBlurPlugin,
} from "@maskito/kit";
import { CountryCode, getCountryCallingCode } from "libphonenumber-js/core";
import metadata from "libphonenumber-js/min/metadata";

const countryIsoCode: CountryCode = "KZ";
const code = getCountryCallingCode(countryIsoCode, metadata);
const prefix = `+${code} `;

const phoneMask: MaskitoOptions = {
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
  ...phoneMask,
  preprocessors: [createCompletePhoneInsertionPreprocessor()],
  postprocessors: [maskitoPrefixPostprocessorGenerator(prefix)],
  plugins: [
    maskitoAddOnFocusPlugin(prefix),
    maskitoRemoveOnBlurPlugin(prefix),
    maskitoChangeEventPlugin(),
  ],
} satisfies MaskitoOptions;

function createCompletePhoneInsertionPreprocessor(): MaskitoPreprocessor {
  const trimPrefix = (value: string): string =>
    value.replace(/^\+?7?\s?8?\s?/g, "");

  const countDigits = (value: string): number =>
    value.replace(/\D/g, "").length;

  return ({ elementState, data }) => {
    const { value, selection } = elementState;

    return {
      elementState: {
        selection,
        value: countDigits(value) > 11 ? trimPrefix(value) : value,
      },
      data: countDigits(data) >= 11 ? trimPrefix(data) : data,
    };
  };
}

export const emptyMask: MaskitoOptions = {
  mask: [
    "+",
    /\d/,
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
  // plugins: [maskitoAddOnFocusPlugin(prefix), maskitoRemoveOnBlurPlugin(prefix)],
};
