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
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-2">🌈 HCIC 动态色彩系统</h1>
      <ImageUploader onImageLoad={handleImageLoad} />

      {palette && (
        <>
          <div className="flex gap-4">
            <button
              onClick={() => setMode("light")}
              className={`px-4 py-2 rounded-xl ${
                mode === "light" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setMode("dark")}
              className={`px-4 py-2 rounded-xl ${
                mode === "dark" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              Dark
            </button>
          </div>

          <ThemePreview palette={palette} mode={mode} />
        </>
      )}
    </div>
  );
}
