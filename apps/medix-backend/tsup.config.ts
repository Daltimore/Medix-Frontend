import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  target: "node18",
  splitting: false,
  sourcemap: true,
  clean: true,
  noExternal: ["@medix/types"],
});
