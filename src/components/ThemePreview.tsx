import React from "react";
import type { ThemePalette } from "../core/colorUtils";

interface ThemePreviewProps {
  palette: ThemePalette;
  mode: "light" | "dark";
}

export default function ThemePreview({ palette, mode }: ThemePreviewProps) {
  const theme = palette[mode];
  return (
    <div
      className="p-6 rounded-2xl shadow-md text-center"
      style={{
        backgroundColor: theme.background,
        color: theme.onBackground,
      }}
    >
      <h2 className="text-xl font-bold mb-3">主题预览 ({mode})</h2>
      <div className="flex justify-center gap-4">
        <div
          className="w-16 h-16 rounded-xl"
          style={{ backgroundColor: theme.primary }}
          title="Primary"
        />
        <div
          className="w-16 h-16 rounded-xl"
          style={{ backgroundColor: theme.secondary }}
          title="Secondary"
        />
      </div>
      <p className="mt-3 text-sm text-gray-300">背景: {theme.background}</p>
    </div>
  );
}
