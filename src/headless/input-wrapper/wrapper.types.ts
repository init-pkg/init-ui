import { ReactNode } from "react";

export interface HeadlessInputWrapperProps {
  children: ReactNode;
  error?: string;
  label?: string;
  description?: string;
  wrapperClassName?: string;
  errorClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
}
