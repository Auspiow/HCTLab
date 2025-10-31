# 🎨 HCTLab · 动态色彩主题生成器

> **一款基于 Material 3 色彩科学 (HCT 模型) 的动态主题生成器**  
> 从图片或主色中智能生成高可访问性、高一致性的配色系统。  
> 适用于 UI 设计师、前端开发者与色彩研究者。

---

## 🌈 项目简介

**HCTLab** 是一个结合了 _Material Color Utilities_ 与 _色彩科学理论_ 的现代化 Web 工具。  
它能从任意图片或颜色中自动提取主色，并基于 **HCT 模型（Hue, Chroma, Tone）** 生成完整的动态调色板。  
无论是浅色/深色模式切换，还是情感倾向调节（鲜艳/柔和），都可实时预览与导出。

---

## 🧠 核心亮点

| 功能                  | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| 🖼️ **图片主色提取**    | 上传任意图片，智能提取主色（支持平均色或关键像素提取）       |
| 🎨 **M3 动态色彩生成** | 基于 Google Material 3 的 HCT 模型生成 Primary / Secondary / Tertiary / Neutral 系列色 |
| 🌗 **亮暗主题切换**    | 一键预览 Light / Dark 动态主题效果                           |
| 💡 **情感化调节**      | 通过滑条实时调节 Hue / Chroma，实现“活力”或“沉稳”风格转换    |
| ♿ **可访问性检查**    | 自动检测文本与背景对比度，符合 WCAG 2.1 标准                 |
| 📤 **导出功能**        | 一键导出为 JSON、CSS 变量或 SCSS 文件，用于设计系统集成      |

---

## 🧩 技术栈

| 模块         | 技术                                                         |
| ------------ | ------------------------------------------------------------ |
| 前端框架     | React + TypeScript + Vite                                    |
| UI 框架      | Tailwind CSS + 部分 MUI 组件                                 |
| 色彩引擎     | [Material Color Utilities](https://github.com/material-foundation/material-color-utilities) + [Colorful](https://github.com/V7CN/Colorful) |
| 可访问性检测 | 自定义 WCAG 对比度算法                                       |
| 部署         | Vercel / GitHub Pages                                        |

---

## ⚙️ 项目结构

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
