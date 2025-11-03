import {
  themeFromImage,
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
  Scheme,
} from "@material/material-color-utilities";

/** HCT 主题调色板结构 */
export interface ColorScheme {
  primary: string;
  secondary: string;
  background: string;
  onBackground: string;
}

export interface ThemePalette {
  light: ColorScheme;
  dark: ColorScheme;
}

/** 从图片生成动态主题 */
export async function generateThemeFromImage(img: HTMLImageElement): Promise<ThemePalette> {
  const theme = await themeFromImage(img);
  return themeToPalette(theme.schemes);
}

/** 从指定主色生成主题 */
export function generateThemeFromColor(hex: string): ThemePalette {
  const argb = argbFromHex(hex);
  const theme = themeFromSourceColor(argb);
  return themeToPalette(theme.schemes);
}

/** 提取主题色板（light/dark） */
function themeToPalette(schemes: { light: Scheme; dark: Scheme }): ThemePalette {
  return {
    light: {
      primary: hexFromArgb(schemes.light.primary),
      secondary: hexFromArgb(schemes.light.secondary),
      background: hexFromArgb(schemes.light.background),
      onBackground: hexFromArgb(schemes.light.onBackground),
    },
    dark: {
      primary: hexFromArgb(schemes.dark.primary),
      secondary: hexFromArgb(schemes.dark.secondary),
      background: hexFromArgb(schemes.dark.background),
      onBackground: hexFromArgb(schemes.dark.onBackground),
    },
  };
}
