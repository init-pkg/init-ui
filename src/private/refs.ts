import { Ref } from "react";

export function refs<T extends Element | null>(
  ...refs: Ref<T>[]
): (node: T) => void {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return;
      switch (typeof ref) {
        case "object":
          ref.current = node;
          break;
        case "function":
          ref(node);
          break;
      }
    });
  };
}
