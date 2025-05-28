import {
  ControllerProps,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";

/**
 * @param T - type of form object
 * @description type for react-hook-form validation rules
 */
export type RulesType<T extends FieldValues> = Omit<
  RegisterOptions<T, Path<T>>,
  "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
>;

/**
 * @param T - type of form object
 * @description type for react-hook-form controller renderer
 */
export type ControllerRenderer<T extends FieldValues> = Parameters<
  ControllerProps<T>["render"]
>[0];

/**
 * @param T - type of form object
 * @description type for react-hook-form controller field renderer
 */
export type ControllerFieldRenderer<T extends FieldValues = FieldValues> =
  ControllerRenderer<T>["field"];
