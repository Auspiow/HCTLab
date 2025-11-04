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
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="max-w-4xl w-full flex flex-col items-center gap-8 p-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white tracking-tight drop-shadow-sm">
          🌈 HCIC 动态色彩系统
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center max-w-xl leading-relaxed">
          上传一张图片，自动生成属于你的
          <span className="font-semibold text-blue-600 dark:text-blue-400"> HCT 色彩主题 </span>
          —— 让色彩更有温度。
        </p>

        <div className="w-full flex flex-col items-center">
          <ImageUploader onImageLoad={handleImageLoad} />
        </div>

        {palette && (
          <>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setMode("light")}
                className={`px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all duration-300 ${
                  mode === "light"
                    ? "bg-blue-600 text-white scale-105 shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                ☀️ Light
              </button>
              <button
                onClick={() => setMode("dark")}
                className={`px-5 py-2.5 rounded-xl font-medium shadow-sm transition-all duration-300 ${
                  mode === "dark"
                    ? "bg-blue-600 text-white scale-105 shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                🌙 Dark
              </button>
            </div>

            <div className="mt-8 w-full">
              <ThemePreview palette={palette} mode={mode} />
            </div>
          </>
        )}
      </div>

      <footer className="mt-10 text-sm text-gray-500 dark:text-gray-400">
        Made with 💙 by HCIC
      </footer>
    </div>
  );
}
