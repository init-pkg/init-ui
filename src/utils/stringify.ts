import { renderToString } from "react-dom/server";

/**
 * Stringify a value to a JSON string.
 * Also stringifies functions and jsx.
 * @param value - The value to stringify.
 * @returns The stringified value.
 */
export function safeJSONStringify(value: object) {
  const result = JSON.stringify(value, (key, value) => {
    if (typeof value === "function") {
      return `${key}() { ... }`;
    }

    if (
      typeof value === "object" &&
      value?.$$typeof?.toString().startsWith("Symbol(react.")
    ) {
      return renderToString(value);
    }

    return value;
  });

  return result;
}
