# rollup-plugin-auto-export-lib-version

This is a Rollup plugin that automatically generates a `VERSION` field for your library.

## **Introduction**

This plugin helps you automatically add a 'VERSION' field to the packaged library entry file.
This field allows you to easily expose version information for version management and use.

## **Installation**

```bash
npm install --save-dev rollup-plugin-auto-export-lib-version
```

## **Usage**

Add the plugin to your Rollup configuration:

```javascript
import autoExportVersion from "rollup-plugin-auto-export-lib-version";

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.js",
    format: "es",
  },
  plugins: [
    autoExportVersion({
      // Key for the version property
      exportPropertyKey: "VERSION",
      // Version value
      exportVersion: "1.0.0",
      // Source code style: 'cjs', 'es', or 'auto'
      sourceCodeStyle: "auto",
    }),
  ],
};
```

## **Options**

| Option Name         | Type     | Default                  | Description                                                                                               |
| ------------------- | -------- | ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `exportPropertyKey` | `string` | `'VERSION'`              | The property key used to expose the version number, e.g., `'VERSION'`.                                    |
| `exportVersion`     | `string` | Read from `package.json` | The version value to expose. If not provided, it will be read from the `version` field in `package.json`. |
| `sourceCodeStyle`   | `string` | `'es'` \| `'auto'` \| `'cjs'`                  | The style of your source code. Can be `'cjs'` (CommonJS), `'es'` (ESModule), or `'auto'` to auto-detect.  |

## **Examples**

### Automatically Read Version from `package.json`

```javascript
autoExportVersion();
```

### Manually Specify Version

```javascript
autoExportVersion({
  exportVersion: "2.3.1",
});
```

### Customize Exported Property Key

```javascript
autoExportVersion({
  exportPropertyKey: "LIB_VERSION",
});
```

### Auto-Detect Source Code Style

```javascript
autoExportVersion({
  sourceCodeStyle: "auto",
});
```

## **Contributing**

Feel free to contribute or suggest improvements!

1. Fork the repository.
2. Make your changes.
3. Submit a pull request.

## **License**

This plugin is licensed under the MIT License.
You are free to use, modify, and distribute it. Feedback is always appreciated!
