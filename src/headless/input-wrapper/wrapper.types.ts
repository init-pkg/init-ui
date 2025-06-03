import { ReactNode } from "react";

/**
 * @description props for input wrapper
 */
export interface InputWrapperProps {
  /**
   * @description error message
   * @info appears in bottom of the input
   */
  error?: string;

  /**
   * @description label for the input
   * @info appears in top of the input
   */
  label?: string;

  /**
   * @description description for the input
   * @info appears in bottom of the input
   * @remarks only appears if there is no error
   */
  description?: string;

  /**
   * @description className for the wrapper element
   */
  wrapperClassName?: string;

  /**
   * @description className for the description text
   */
  descriptionClassName?: string;

  /**
   * @description className for the label text
   */
  labelClassName?: string;

  /**
   * @description className for the error text
   */
  errorClassName?: string;
}

/**
 * @deprecated use InputWrapperProps instead
 */
export interface HeadlessInputWrapperProps extends InputWrapperProps {
  children: ReactNode;
}
