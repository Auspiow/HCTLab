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
    <main className="min-h-screen flex flex-col items-center justify-center 
                     bg-gradient-to-br from-indigo-50 via-white to-blue-50 
                     dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                     transition-colors duration-700 px-6 py-10">
      <section className="max-w-4xl w-full flex flex-col items-center gap-8">
        {/* 标题 */}
        <header className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white drop-shadow-sm">
            🌈 HCIC 动态色彩系统
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            上传一张图片，自动生成属于你的
            <span className="font-semibold text-blue-600 dark:text-blue-400"> HCT 色彩主题</span>，
            让色彩更有温度。
          </p>
        </header>

        {/* 图片上传 */}
        <div className="w-full flex flex-col items-center">
          <ImageUploader onImageLoad={handleImageLoad} />
        </div>

        {/* 模式切换 + 预览 */}
        {palette && (
          <div className="w-full flex flex-col items-center animate-fadeIn">
            <div className="flex gap-4 mt-6">
              {["light", "dark"].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m as "light" | "dark")}
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-sm
                    ${
                      mode === m
                        ? "bg-blue-600 text-white scale-105 shadow-md"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                >
                  {m === "light" ? "☀️ Light" : "🌙 Dark"}
                </button>
              ))}
            </div>

            <div className="mt-8 w-full">
              <ThemePreview palette={palette} mode={mode} />
            </div>
          </div>
        )}
      </section>

      {/* 页脚 */}
      <footer className="mt-12 text-sm text-gray-500 dark:text-gray-400">
        Made with 💙 by <span className="font-semibold">HCIC</span>
      </footer>
    </main>
  );
}
