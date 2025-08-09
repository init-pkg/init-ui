import { Ref } from "react";

export function assignToRef<T>(
  value: T,
  ...refs: Array<Ref<T> | undefined>
): void {
  refs.forEach((ref) => {
    if (!ref) return;
    switch (typeof ref) {
      case "object":
        ref.current = value;
        break;
      case "function":
        ref(value);
        break;
    }
  });
}

export function refs<T extends object | null>(
  ...refs: Ref<T>[]
): (node: T) => void {
  return (node) => {
    assignToRef(node, ...refs);
  };
}
