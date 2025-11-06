// src/pages/Home.tsx
import React, { useState } from "react";
import ImageUploader from "../components/ImageUploader";
import ThemePreview from "../components/ThemePreview";
import { generateThemeFromImage, type ThemePalette } from "../core/colorUtils";

export default function Home() {
  const [palette, setPalette] = useState<ThemePalette | null>(null);
  const [mode, setMode] = useState<"light" | "dark">("light");

  const handleImageLoad = async (img: HTMLImageElement) => {
    const theme = await generateThemeFromImage(img);
    setPalette(theme);
  };

  return (
    // 强制占满视口宽度并水平居中内容（覆盖父级左右布局）
    <main
      style={{ width: "100vw", minHeight: "100vh" }}
      className="relative flex items-center justify-center
                 bg-gradient-to-br from-indigo-900/80 via-slate-900/80 to-slate-800/80
                 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900
                 transition-colors duration-700 px-6 py-12"
    >
      {/* 中心容器：限制最大宽度并居中 */}
      <div className="w-full max-w-5xl mx-auto relative z-10">
        <section className="w-full bg-transparent flex flex-col items-center gap-10 text-center">
          {/* 标题 */}
          <header>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              <span role="img" aria-label="rainbow">🌈</span> HCIC 动态色彩系统
            </h1>
            <p className="mt-4 text-slate-200/80 text-lg leading-relaxed max-w-3xl mx-auto">
              上传一张图片，自动生成属于你的
              <span className="font-semibold text-sky-300"> HCT 色彩主题</span>，
              让色彩更有温度。
            </p>
          </header>

          {/* 上传区域：居中 */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-xl">
              <ImageUploader onImageLoad={handleImageLoad} />
            </div>
          </div>

          {/* 模式切换 + 预览 */}
          {palette && (
            <div className="w-full flex flex-col items-center animate-fadeIn">
              <div className="flex gap-4 mt-6">
                {(["light", "dark"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-sm
                      ${
                        mode === m
                          ? "bg-sky-500 text-white scale-105 shadow-md"
                          : "bg-slate-700/30 text-slate-100 hover:bg-slate-700/40"
                      }`}
                  >
                    {m === "light" ? "☀️ Light" : "🌙 Dark"}
                  </button>
                ))}
              </div>

              <div className="mt-8 w-full flex justify-center">
                <ThemePreview palette={palette} mode={mode} />
              </div>
            </div>
          )}
        </section>

        {/* footer */}
        <footer className="mt-12 text-sm text-slate-300/80 text-center">
          Made with <span style={{ color: "#60a5fa" }}>💙</span> by <strong>HCIC</strong>
        </footer>
      </div>
    </main>
  );
}
