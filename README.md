# 🎨 HCIC · 人机交互中的智能色彩系统

> **一款基于 Material 3 HCT 模型的动态主题生成器与色彩研究平台**
> 从图片、主色或交互场景中生成高一致性、高可访问性的配色系统，
> 服务于 HCI（人机交互）研究、UI 设计与认知可视化教学。

---

## 🌈 项目简介

**HCIC (Human–Computer Interaction Color)** 是一个融合了 **色彩科学理论** 与 **人机交互设计原则** 的可视化 Web 应用。
项目基于 Google Material 3 的 **HCT 色彩模型（Hue, Chroma, Tone）**，
可实现 **智能配色生成、亮暗主题切换、情感化调节与可访问性检测**。

无论是交互设计教学、产品原型配色，还是 HCI 认知实验，
HCIC 都能提供科学、系统、动态的色彩支持。

---

## 🧠 核心功能与创新


| 模块                   | 功能说明                                                                 |
| ---------------------- | ------------------------------------------------------------------------ |
| 🖼️**主色提取**       | 从上传图片中分析主色（支持平均色 / K-means 聚类提取）                    |
| 🎨**HCT 动态色板生成** | 基于 Material 3 算法生成 Primary / Secondary / Tertiary / Neutral 系列色 |
| 🌗**亮暗主题预览**     | 实时切换 Light / Dark 模式查看主题适应性                                 |
| 💡**情感化调节**       | 调整 Hue / Chroma，实现“活力-沉稳”“鲜艳-柔和”等感知风格转换          |
| ♿**对比度检测**       | 内置 WCAG 2.1 标准的文本与背景对比算法                                   |
| 📤**导出功能**         | 一键导出为 JSON、CSS 或 SCSS，用于设计系统与教学示例                     |

---

## 🧩 技术栈


| 模块         | 技术                                                                                                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 前端框架     | React + TypeScript + Vite                                                                                                                |
| UI 框架      | Tailwind CSS + Material UI                                                                                                               |
| 色彩算法     | [Material Color Utilities](https://github.com/material-foundation/material-color-utilities)+[Colorful](https://github.com/V7CN/Colorful) |
| 可访问性检测 | 自定义 WCAG Contrast 模块                                                                                                                |
| 部署方式     | Vercel / GitHub Pages                                                                                                                    |

---

## ⚙️ 项目结构

<pre class="overflow-visible!" data-start="1348" data-end="1499"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>src/
├─ components/      </span><span># UI 组件（颜色卡片、滑条、上传器等）</span><span>
├─ core/            </span><span># 核心算法模块（HCT、Contrast）</span><span>
├─ pages/           </span><span># 页面逻辑</span><span>
└─ main.tsx         </span><span># 应用入口</span><span>
</span></span></code></div></div></pre>

---

## 🚀 快速开始

<pre class="overflow-visible!" data-start="1520" data-end="1610"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>git </span><span>clone</span><span> https://github.com/yourname/hcic.git
</span><span>cd</span><span> hcic
npm install
npm run dev
</span></span></code></div></div></pre>

打开浏览器访问 👉 [http://localhost:5173](http://localhost:5173)

---

## 📚 教学与研究应用场景

* 🎓 **HCI课程演示**：实时展示 HCT 模型与感知色彩的可视化规律
* 🧩 **交互设计实验**：验证不同色调在 UI 感知中的心理影响
* 🧠 **可访问性研究**：结合 WCAG 标准测试设计方案的易读性
* 💻 **前端开发工具**：导出兼容设计系统的主题变量

---

## 🤝 引用与致谢

### 🎨 [Material Color Utilities](https://github.com/material-foundation/material-color-utilities)

Google Material Design 团队开发的 HCT 模型与动态色彩算法实现库。

> License: Apache License 2.0 © Google LLC

### 🌈 [Colorful](https://github.com/V7CN/Colorful)

现代色彩空间与色差计算库，支持多维色彩空间转换。

> License: MIT © V7CN

### 📘 参考资料

* [Material Design 3 – Dynamic Color](https://m3.material.io/styles/color/system/overview)
* [WCAG 2.1 Contrast Ratio Guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum)
* [UISDC：HCT 色彩空间介绍](https://www.uisdc.com/color-space)

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


| 功能                  | 描述                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------- |
| 🖼️**图片主色提取**  | 上传任意图片，智能提取主色（支持平均色或关键像素提取）                                 |
| 🎨**M3 动态色彩生成** | 基于 Google Material 3 的 HCT 模型生成 Primary / Secondary / Tertiary / Neutral 系列色 |
| 🌗**亮暗主题切换**    | 一键预览 Light / Dark 动态主题效果                                                     |
| 💡**情感化调节**      | 通过滑条实时调节 Hue / Chroma，实现“活力”或“沉稳”风格转换                          |
| ♿**可访问性检查**    | 自动检测文本与背景对比度，符合 WCAG 2.1 标准                                           |
| 📤**导出功能**        | 一键导出为 JSON、CSS 变量或 SCSS 文件，用于设计系统集成                                |

---

## 🧩 技术栈


| 模块         | 技术                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 前端框架     | React + TypeScript + Vite                                                                                                                  |
| UI 框架      | Tailwind CSS + 部分 MUI 组件                                                                                                               |
| 色彩引擎     | [Material Color Utilities](https://github.com/material-foundation/material-color-utilities) + [Colorful](https://github.com/V7CN/Colorful) |
| 可访问性检测 | 自定义 WCAG 对比度算法                                                                                                                     |
| 部署         | Vercel / GitHub Pages                                                                                                                      |

---

## ⚙️ 项目结构

src/
├─ components/      # 组件（颜色卡片、滑条、上传器）
├─ core/            # 核心算法模块（HCT、Contrast）
├─ pages/           # 页面逻辑
└─ main.tsx         # 入口

---

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/yourname/hueforge.git
cd hueforge

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开浏览器访问 👉 http://localhost:5173

## 🤝 引用与致谢 (Credits & Acknowledgements)

本项目在开发过程中参考并使用了以下优秀的开源项目和理论成果，特此致谢：

### 🎨 [material-color-utilities](https://github.com/material-foundation/material-color-utilities)

由 Google Material Design 团队开发，是 Material You (Material 3) 动态色彩系统的核心实现库。
本项目基于其提供的 **HCT (Hue-Chroma-Tone)** 模型与 **Dynamic Color** 算法，
实现了从主色生成整套主题色板（Light/Dark 模式）的功能。

> License: Apache License 2.0
> Copyright © Google LLC

---

### 🌈 [Colorful](https://github.com/V7CN/Colorful)

由 [V7CN](https://github.com/V7CN) 开发的现代化色彩处理库，
提供了多种色彩空间转换与 ΔE 色差计算功能。
本项目参考其设计思路，并在此基础上实现了 **WCAG 2.1 可访问性检测 (Contrast Ratio)** 模块，
用于自动检测前景与背景色之间的对比度，提升配色可用性。

> License: MIT License
> Copyright © V7CN

---

### 📘 参考资料 (References)

- [Material Design Color System – Dynamic Color](https://m3.material.io/styles/color/dynamic-color/overview)
- [WCAG 2.1 Contrast Ratio Guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum)

---

感谢以上项目与文档的开源贡献，使本项目得以实现更丰富的色彩科学探索。
