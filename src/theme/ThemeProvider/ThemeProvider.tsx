import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { MMKV } from "react-native-mmkv";

import generateConfig from "@/theme/ThemeProvider/generateConfig";
import { generateBackgrounds } from "@/theme/backgrounds";
import {
  generateBorderColors,
  generateBorderRadius,
  generateBorderWidths,
} from "@/theme/borders";
import componentsGenerator from "@/theme/components";
import {
  generateFontSizes,
  generateFontColors,
  staticFontStyles,
} from "@/theme/fonts";
import { generateGutters } from "@/theme/gutters";
import layout from "@/theme/layout";
import type {
  FulfilledThemeConfiguration,
  Variant,
} from "@/types/theme/config";
import type { ComponentTheme, Theme } from "@/types/theme/theme";

// Types

type Context = Theme & {
  changeTheme: (variant: Variant) => void;
};

export const ThemeContext = createContext<Context | undefined>(undefined);

type Props = PropsWithChildren<{
  storage: MMKV;
}>;

function ThemeProvider({ children, storage }: Props) {
  // Current theme variant

  const [variant, setVariant] = useState(
    (storage.getString("theme") as Variant) || "dark",
  );
  // Initialize theme at default if not defined = dark
  useEffect(() => {
    const appHasThemeDefined = storage.contains("theme");
    if (!appHasThemeDefined) {
      storage.set("theme", "dark");
      setVariant("dark");
    }
  }, [storage]);

  const changeTheme = (nextVariant: Variant) => {
    setVariant(nextVariant);
    storage.set("theme", nextVariant);
  };

  // Flatten config with current variant
  const fullConfig = useMemo(() => {
    return generateConfig(variant) satisfies FulfilledThemeConfiguration;
  }, [variant]);

  const fonts = useMemo(() => {
    return {
      ...generateFontSizes(),
      ...generateFontColors(fullConfig),
      ...staticFontStyles,
    };
  }, [fullConfig]);

  const backgrounds = useMemo(() => {
    return generateBackgrounds(fullConfig);
  }, [fullConfig]);

  const borders = useMemo(() => {
    return {
      ...generateBorderColors(fullConfig),
      ...generateBorderRadius(),
      ...generateBorderWidths(),
    };
  }, [fullConfig]);

  const navigationTheme = useMemo(() => {
    return {
      dark: variant === "dark",
      colors: fullConfig.navigationColors,
    };
  }, [variant, fullConfig.navigationColors]);

  const theme = useMemo(() => {
    return {
      colors: fullConfig.colors,
      variant,
      gutters: generateGutters(),
      layout,
      fonts,
      backgrounds,
      borders,
    } satisfies ComponentTheme;
  }, [variant, fonts, backgrounds, borders, fullConfig.colors]);

  const components = useMemo(() => {
    return componentsGenerator(theme);
  }, [theme]);

  const value = useMemo(() => {
    return { ...theme, components, navigationTheme, changeTheme };
  }, [theme, components, navigationTheme, changeTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
