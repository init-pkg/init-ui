import { SerializedStyles } from "@emotion/react";

declare module "*.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

interface Element {
  css: SerializedStyles;
}
