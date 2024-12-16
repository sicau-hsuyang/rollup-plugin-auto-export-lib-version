import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { InputOptions, Plugin } from "rollup";

function isObj(o: unknown) {
  return Object.prototype.toString.call(o) === "[object Object]";
}

interface AutoExportLibVersionOptions {
  exportVersion?: string;
  exportPropertyKey?: string;
  sourceCodeStyle?: "cjs" | "es" | "auto";
}

export async function autoExportVersion(options: AutoExportLibVersionOptions = {}) {
  const { exportPropertyKey = "VERSION", sourceCodeStyle = "auto", exportVersion = "" } = options;

  let VERSION: string = exportVersion;
  let entryFiles!: string[];
  return {
    name: "vite-plugin-auto-export-lib-version",
    async buildStart(options: InputOptions) {
      if (VERSION !== "") {
        return;
      }
      const pkgJsonPath = resolve(process.cwd(), "./package.json");
      const pkgJsonContent = await readFile(pkgJsonPath, "utf-8");
      const pkgJson = JSON.parse(pkgJsonContent);
      const { version } = pkgJson;
      VERSION = version;
      // get entry files path
      entryFiles = isObj(options.input)
        ? Object.values(options.input!)
        : Array.isArray(options.input)
        ? options.input
        : ([options.input] as string[]);
    },
    transform(code: string, id: string) {
      if (entryFiles.indexOf(id) >= 0) {
        let isCjs: boolean;
        if (sourceCodeStyle === "cjs") {
          isCjs = true;
        } else if (sourceCodeStyle === "es") {
          isCjs = false;
        } else {
          isCjs = code.includes("module.exports") || code.includes("exports") || code.includes("require");
        }
        const injectCode = isCjs
          ? `module.exports.${exportPropertyKey} = ${JSON.stringify(VERSION)};\n`
          : `export const ${exportPropertyKey} = ${JSON.stringify(VERSION)};\n`;
        return injectCode + code;
      }
      return null;
    },
  } as Plugin;
}
