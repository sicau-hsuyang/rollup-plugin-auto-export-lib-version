import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import nodeResolvePlugin from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs",
      exports: "named",
    },
    {
      file: "dist/index.mjs",
      format: "es",
      exports: "named",
    },
    {
      file: "dist/index.umd.js",
      format: "amd",
      exports: "named",
    },
  ],
  plugins: [typescript(), nodeResolvePlugin()],
  external: ["fs/promises", "path"],
  onwarn(warning, warn) {
    if (warning.code === "MISSING_NODE_BUILTINS") {
      // 忽略 Node.js 内置模块的警告
      return;
    }
    warn(warning);
  },
});
