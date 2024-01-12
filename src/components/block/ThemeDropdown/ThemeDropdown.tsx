import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import IconLight from "~icons/lucide/sun";
import IconDark from "~icons/lucide/moon";
import IconSystem from "~icons/lucide/database";
import React from "react";

type Theme = {
  label: string;
  icon: React.ReactNode;
};

const THEMES: Theme[] = [
  { label: "light", icon: <IconLight /> },
  { label: "dark", icon: <IconDark /> },
  { label: "system", icon: <IconSystem /> },
] as const;

type ThemeLabel = (typeof THEMES)[number]["label"];

const ThemeOption = ({
  theme,
  onSelect,
}: {
  theme: Theme;
  onSelect: (value: ThemeLabel) => void;
}) => {
  return (
    <DropdownMenu.Item onSelect={() => onSelect(theme.label)}>
      {theme.icon}
      {theme.label}
    </DropdownMenu.Item>
  );
};

function initTheme() {
  const localTheme =
    (typeof localStorage !== "undefined" && localStorage.getItem("theme")) ||
    "system";
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

  const currentTheme = THEMES.find((t) => t.label === themeLabel);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="cc-btn">
        {currentTheme?.icon}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          {THEMES.map((theme, i) => (
            <ThemeOption key={i} theme={theme} onSelect={setThemeLabel} />
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
