import type { ThemePalette } from "../core/colorUtils";

interface ThemePreviewProps {
  palette: ThemePalette;
  mode: "light" | "dark";
}

export default function ThemePreview({ palette, mode }: ThemePreviewProps) {
  const theme = palette[mode];

  const colorItems = [
    { name: "Primary", color: theme.primary },
    { name: "Secondary", color: theme.secondary },
    { name: "Background", color: theme.background },
    { name: "On Background", color: theme.onBackground },
  ];

  return (
    <div
      className="rounded-2xl shadow-lg p-8 transition-colors duration-500 
                 border border-gray-200 dark:border-gray-700 w-full max-w-3xl mx-auto text-center"
      style={{
        backgroundColor: theme.background,
        color: theme.onBackground,
      }}
    >
      <h2 className="text-2xl font-extrabold mb-6 tracking-tight">
        🎨 主题预览{" "}
        <span className="text-sm font-medium opacity-70">({mode})</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
        {colorItems.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center group"
            title={`${item.name}: ${item.color}`}
          >
            <div
              className="w-16 h-16 rounded-xl shadow-sm border border-gray-300 dark:border-gray-600 
                         transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: item.color }}
            />
            <span className="mt-2 text-sm opacity-80 group-hover:opacity-100 transition-opacity">
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm opacity-70 space-y-1">
        <p>
          背景色：<span className="font-mono">{theme.background}</span>
        </p>
        <p>
          文字色：<span className="font-mono">{theme.onBackground}</span>
        </p>
      </div>
    </div>
  );
}
