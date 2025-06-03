import React, { forwardRef } from "react";
import { HeadlessInputWrapperProps } from "./wrapper.types";
import { wrapperStyles } from "./wrapper.css";
import clsx from "clsx";

const InputWrapper = forwardRef<HTMLLabelElement, HeadlessInputWrapperProps>(
  ({ children, error, label, description, wrapperClassName }) => {
    return (
      <label className={clsx("input-wrapper", wrapperStyles, wrapperClassName)}>
        {label && <span className="input-label">{label}</span>}
        {children}
        {description && (
          <span className="input-description">{description}</span>
        )}
        {error && <span className="input-error">{error}</span>}
      </label>
    );
  }
);

InputWrapper.displayName = "InputWrapper";

export { InputWrapper };
