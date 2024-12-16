# rollup-plugin-auto-export-lib-version

这是一个 Rollup 插件，可以为您的库自动生成一个 `VERSION` 字段。

## **简介**

此插件可以帮助您在打包的库中自动添加一个 `VERSION` 字段。
通过该字段，您可以更方便地对外暴露版本信息，便于版本管理和使用。

## **安装**

```bash
npm install --save-dev rollup-plugin-auto-export-lib-version
```

## **使用方法**

在 Rollup 配置中添加该插件：

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
      // 用于暴露版本号的字段名
      exportPropertyKey: "VERSION",
      // 暴露的版本号
      exportVersion: "1.0.0",
      // 源代码风格，可选值：'cjs'、'es' 或 'auto'
      sourceCodeStyle: "auto",
    }),
  ],
};
```

## **参数说明**

| 参数名              | 类型     | 默认值                   | 描述                                                                                |
| ------------------- | -------- | ------------------------ | ----------------------------------------------------------------------------------- |
| `exportPropertyKey` | `string` | `'VERSION'`              | 用于暴露版本号的字段名，例如 `'VERSION'`。                                          |
| `exportVersion`     | `string` | 从 `package.json` 中读取 | 要暴露的版本号。如果未提供，则会从 `package.json` 文件的 `version` 字段中自动读取。 |
| `sourceCodeStyle`   | `string` | `'es'`                   | 源代码风格。可以是 `'cjs'`（CommonJS）、`'es'`（ESModule）或 `'auto'`（自动检测）。 |

## **使用示例**

### 从 `package.json` 中自动读取版本号

```javascript
autoExportVersion();
```

### 手动指定版本号

```javascript
autoExportVersion({
  exportVersion: "2.3.1",
});
```

### 自定义导出的字段名

```javascript
autoExportVersion({
  exportPropertyKey: "LIB_VERSION",
});
```

### 自动检测源代码风格

```javascript
autoExportVersion({
  sourceCodeStyle: "auto",
});
```

## **贡献指南**

欢迎贡献代码或提出改进建议！

1. Fork 本仓库。
2. 提交您的更改。
3. 提交 Pull Request。

## **许可证**

该插件基于 MIT 许可证开源。
您可以自由使用、修改和分发。欢迎提出宝贵的反馈意见！

```

```

```

```
