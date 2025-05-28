import React, {
  FormEventHandler,
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BasePhoneInputGeneratorProps } from "../types/inputInterfaces";
import { refs } from "@/private/refs";
import { CountryCode } from "libphonenumber-js";
import { defineCountry, interMask, mask } from "..";
import { useMaskito } from "@maskito/react";
import phoneNumberKz, { emptyMask } from "../masks/phoneNumberKz";
import phoneNumberInternational from "../masks/phoneNumberInternational";
import { maskitoTransform } from "@maskito/core";

function BasePhoneInputGenerator(
  {
    children,
    defaultValue,
    onInput,
    value,
    placeholder,
    international = false,
    renderCountryMark,
    ...props
  }: BasePhoneInputGeneratorProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [currentCountry, setCurrentCountry] = useState<CountryCode>(
    defineCountry(defaultValue?.toString()) as CountryCode
  );

  const elementRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!defaultValue && elementRef.current) {
      elementRef.current.value = "";
      setCurrentCountry("" as CountryCode);
    }
  }, [defaultValue]);

  const handleInputChange: FormEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      const value = event.currentTarget.value;
      setCurrentCountry(defineCountry(value) as CountryCode);
      onInput?.(event);
    },
    [setCurrentCountry]
  );

  const maskitoRef = useMaskito({
    options: international ? phoneNumberInternational : phoneNumberKz,
  });

  const parsedDefaultValue = useMemo(() => {
    if (defaultValue === undefined) return undefined;

    return international
      ? interMask(String(defaultValue))
      : mask(String(defaultValue));
  }, [defaultValue, international]);

  const parsedValue = useMemo(() => {
    if (value === undefined) return;

    const result = maskitoTransform(value, emptyMask);

    return result;
  }, [value]);

  return (
    <>
      {children({
        ref: refs<HTMLInputElement>(ref, elementRef, maskitoRef),
        value: parsedValue,
        defaultValue: parsedDefaultValue,
        placeholder:
          !international && !placeholder ? "+7 (___) ___-__-__" : placeholder,
        onInput: handleInputChange,
        type: "tel",
        inputMode: "tel",
        ...props,
      })}

      {renderCountryMark?.(currentCountry)}
    </>
  );
}

BasePhoneInputGenerator.displayName = "BasePhoneInputGenerator";

export default forwardRef(BasePhoneInputGenerator);
