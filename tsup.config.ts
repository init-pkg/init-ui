import { defineConfig } from "tsup";
// import cssModulesPlugin from "esbuild-css-modules-plugin";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/swiper/index.ts",
    "src/phone/index.ts",
    "src/utils/index.ts",
    "src/headless/index.ts",
  ],
  format: ["esm", "cjs"],
  bundle: true,
  esbuildPlugins: [],
  plugins: [],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
});
