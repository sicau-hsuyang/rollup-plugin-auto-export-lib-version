import test from "ava";
import autoExportVersion from "../dist/index.mjs";
import { rollup } from "rollup";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { readFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function readPackageJsonVersion() {
  const filePath = resolve(process.cwd(), "package.json");
  const packageJsonContent = await readFile(filePath, "utf-8");
  const json = JSON.parse(packageJsonContent);
  return json.version;
}

test("type", (t) => {
  t.is(typeof autoExportVersion, "function");
});

test("instance", (t) => {
  const result = autoExportVersion();
  t.is(typeof result, "object");
  t.is(typeof result.buildStart, "function");
  t.is(typeof result.transform, "function");
});

test("defaults", async (t) => {
  const version = await readPackageJsonVersion();
  const bundled = await rollup({
    input: resolve(__dirname, "./fixtures/test-default.mjs"),
    plugins: [autoExportVersion()],
  });
  const res = await bundled.generate({});
  const regExp = new RegExp("VERSION\\s*=\\s*['\"]" + version + "['\"]");
  t.true(regExp.test(res.output[0].code));
});

test("specific version", async (t) => {
  const version = "3.0.0";
  const bundled = await rollup({
    input: resolve(__dirname, "./fixtures/test-default.mjs"),
    plugins: [
      autoExportVersion({
        exportVersion: version,
      }),
    ],
  });
  const res = await bundled.generate({});
  const regExp = new RegExp("VERSION\\s*=\\s*['\"]" + version + "['\"]");
  t.true(regExp.test(res.output[0].code));
});

test("custom VERSION property", async (t) => {
  const version = "3.0.0";
  const bundled = await rollup({
    input: resolve(__dirname, "./fixtures/test-default.mjs"),
    plugins: [
      autoExportVersion({
        exportVersion: version,
        exportPropertyKey: "LIB_VERSION",
      }),
    ],
  });
  const res = await bundled.generate({});
  const regExp = new RegExp("LIB_VERSION\\s*=\\s*['\"]" + version + "['\"]");
  t.true(regExp.test(res.output[0].code));
});

test("use commonjs code", async (t) => {
  const version = await readPackageJsonVersion();
  const bundled = await rollup({
    input: resolve(__dirname, "./fixtures/test-commonjs.cjs"),
    plugins: [autoExportVersion({})],
  });
  const res = await bundled.generate({});
  const regExp = new RegExp("module.exports.VERSION\\s*=\\s*['\"]" + version + "['\"]");
  t.true(regExp.test(res.output[0].code));
});
