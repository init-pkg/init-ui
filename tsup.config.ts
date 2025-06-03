import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/swiper/index.ts",
    "src/phone/index.ts",
    "src/utils/index.ts",
    "src/headless/index.ts",
  ],
  format: ["esm", "cjs"],
  esbuildPlugins: [],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
});
