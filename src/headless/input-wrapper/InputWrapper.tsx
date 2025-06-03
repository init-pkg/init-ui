import React, { forwardRef } from "react";
import { HeadlessInputWrapperProps } from "./wrapper.types";
import {
  descriptionStyles,
  errorStyles,
  labelStyles,
  wrapperStyles,
} from "./wrapper.css";
import clsx from "clsx";

/**
 * ### Label wrapper that contains all features for input description
 *
 * You can provide and customize:
 * - label
 * - description
 * - error
 * - wrapper className
 * - label className
 * - description className
 * - error className
 *
 * @example
 * ```tsx
 * <InputWrapper label="Name" description="Enter your name">
 *  <Input />
 * </InputWrapper>
 * ```
 */
const InputWrapper = forwardRef<HTMLLabelElement, HeadlessInputWrapperProps>(
  (props, ref) => {
    const {
      children,
      error,
      label,
      description,
      wrapperClassName,
      labelClassName,
      descriptionClassName,
      errorClassName,
    } = props;

    return (
      <label
        ref={ref}
        className={clsx("input-wrapper", wrapperStyles, wrapperClassName)}
      >
        {label && (
          <span className={clsx("input-label", labelStyles, labelClassName)}>
            {label}
          </span>
        )}

        {children}

        {description && !error && (
          <span
            className={clsx(
              "input-description",
              descriptionStyles,
              descriptionClassName
            )}
          >
            {description}
          </span>
        )}

        {error && (
          <span className={clsx("input-error", errorStyles, errorClassName)}>
            {error}
          </span>
        )}
      </label>
    );
  }
);

InputWrapper.displayName = "InputWrapper";

export { InputWrapper };
