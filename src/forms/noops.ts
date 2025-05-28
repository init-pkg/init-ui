import { ControllerFieldRenderer } from "./types";

export const blankControllerField: ControllerFieldRenderer = {
  name: "",
  ref: () => {},
  onChange: () => {},
  onBlur: () => {},
  value: undefined,
};
