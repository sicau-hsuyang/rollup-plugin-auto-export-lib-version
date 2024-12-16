### **英文版 README**

```markdown
# Rollup Plugin: Auto-Generate VERSION Field

This is a Rollup plugin that automatically generates a `VERSION` field for your library.

---

## **Introduction**

This plugin helps you automatically add a `VERSION` field to your bundled library. The `VERSION` field can be exposed in your library for better version tracking and external use.

---

## **Installation**

```bash
npm install --save-dev rollup-plugin-auto-version
```

---

## **Usage**

Add the plugin to your Rollup configuration:

```javascript
import autoVersion from 'rollup-plugin-auto-version';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [
    autoVersion({
      exportPropertyKey: 'VERSION', // Key for the version property
      exportVersion: '1.0.0', // Version value
      sourceCodeStyle: 'auto', // Source code style: 'cjs', 'es', or 'auto'
    }),
  ],
};
```

---

## **Options**

| Option Name          | Type     | Default              | Description                                                                 |
|----------------------|----------|----------------------|-----------------------------------------------------------------------------|
| `exportPropertyKey`  | `string` | `'VERSION'`          | The property key used to expose the version number, e.g., `'VERSION'`.      |
| `exportVersion`      | `string` | Read from `package.json` | The version value to expose. If not provided, it will be read from the `version` field in `package.json`. |
| `sourceCodeStyle`    | `string` | `'es'`               | The style of your source code. Can be `'cjs'` (CommonJS), `'es'` (ESModule), or `'auto'` to auto-detect. |

---

## **Examples**

### Automatically Read Version from `package.json`

```javascript
autoVersion();
```

### Manually Specify Version

```javascript
autoVersion({
  exportVersion: '2.3.1',
});
```

### Customize Exported Property Key

```javascript
autoVersion({
  exportPropertyKey: 'LIB_VERSION',
});
```

### Auto-Detect Source Code Style

```javascript
autoVersion({
  sourceCodeStyle: 'auto',
});
```

---

## **Contributing**

Feel free to contribute or suggest improvements!

1. Fork the repository.
2. Make your changes.
3. Submit a pull request.

---

## **License**

This plugin is licensed under the MIT License.  
You are free to use, modify, and distribute it. Feedback is always appreciated!
```

---

### **中文版 README**

```markdown
# Rollup 插件：自动生成 VERSION 字段

这是一个 Rollup 插件，可以为您的库自动生成一个 `VERSION` 字段。

---

## **简介**

该插件可以帮助您为打包的库自动添加一个 `VERSION` 字段，方便对外暴露库的版本号，便于管理和使用。

---

## **安装**

```bash
npm install --save-dev rollup-plugin-auto-version
```

---

## **使用方法**

在 Rollup 配置文件中添加插件：

```javascript
import autoVersion from 'rollup-plugin-auto-version';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es',
  },
  plugins: [
    autoVersion({
      exportPropertyKey: 'VERSION', // 对外暴露的版本号字段名
      exportVersion: '1.0.0', // 版本号值
      sourceCodeStyle: 'auto', // 源代码风格，可选值：'cjs', 'es', 'auto'
    }),
  ],
};
```

---

## **参数说明**

| 参数名              | 类型       | 默认值                  | 描述                                                                                     |
|---------------------|------------|-------------------------|------------------------------------------------------------------------------------------|
| `exportPropertyKey` | `string`   | `'VERSION'`             | 用于对外暴露版本号的字段名，例如 `'VERSION'`。                                           |
| `exportVersion`     | `string`   | 从 `package.json` 中读取 | 要对外暴露的版本号值。如果未提供，则会自动从 `package.json` 文件的 `version` 字段中读取。 |
| `sourceCodeStyle`   | `string`   | `'es'`                  | 源代码风格，可选值为 `'cjs'`（CommonJS）、`'es'`（ESModule）或 `'auto'`（自动检测）。     |

---

## **使用示例**

### 从 `package.json` 自动读取版本号

```javascript
autoVersion();
```

### 手动指定版本号

```javascript
autoVersion({
  exportVersion: '2.3.1',
});
```

### 自定义导出字段名

```javascript
autoVersion({
  exportPropertyKey: 'LIB_VERSION',
});
```

### 自动检测源代码风格

```javascript
autoVersion({
  sourceCodeStyle: 'auto',
});
```

---

## **贡献指南**

欢迎贡献代码或提出建议！

1. Fork 本仓库。
2. 提交您的更改。
3. 提交 Pull Request。

---

## **许可证**

该插件基于 MIT 许可证开源。  
您可以自由使用、修改和分发，欢迎提供反馈！
```