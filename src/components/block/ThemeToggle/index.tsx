import IconLight from "~icons/lucide/sun";
import IconDark from "~icons/lucide/moon";
import IconSystem from "~icons/lucide/database";
import React from "react";
import styles from "./styles.module.css";

const THEMES = {
  light: <IconLight />,
  dark: <IconDark />,
  system: <IconSystem />,
} as const satisfies { [k: string]: React.ReactNode };

type ThemeLabel = keyof typeof THEMES;
const THEME_LABELS = Object.keys(THEMES) as Array<ThemeLabel>;

function initTheme() {
  function isTheme(value: string): value is ThemeLabel {
    return Object.keys(THEMES).includes(value);
  }

  const localTheme =
    typeof localStorage !== "undefined" && localStorage.getItem("theme");
  if (!localTheme || !isTheme(localTheme)) return "system";

  return localTheme;
}

export const ThemeDropdown = () => {
  const root = document.documentElement;
  const [themeLabel, setThemeLabel] = React.useState<ThemeLabel>(initTheme());

  React.useEffect(() => {
    localStorage.setItem("theme", themeLabel);
    if (themeLabel !== "system") {
      root.setAttribute("data-theme", themeLabel);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      root.setAttribute("data-theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
    }
  }, [themeLabel]);

  function handleClick() {
    const index = THEME_LABELS.indexOf(themeLabel);
    if (index === THEME_LABELS.length - 1) {
      setThemeLabel(THEME_LABELS[0]);
    } else {
      setThemeLabel(THEME_LABELS[index + 1]);
    }
  }

  return (
    <button onClick={handleClick}>
      {THEMES[themeLabel]}
      {themeLabel}
    </button>
  );
};
