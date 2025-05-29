import { defineConfig } from "tsup";
import { sassPlugin } from "esbuild-sass-plugin";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/swiper/index.ts",
    "src/phone/index.ts",
    "src/utils/index.ts",
  ],
  format: ["esm", "cjs"],
  esbuildPlugins: [sassPlugin()],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
});
