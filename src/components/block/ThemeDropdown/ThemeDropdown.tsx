import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";

const THEMES = ["light", "dark", "system"] as const;
type Theme = (typeof THEMES)[number];

const ThemeOption = ({
  theme,
  onSelect,
}: {
  theme: Theme;
  onSelect: (value: Theme) => void;
}) => {
  return (
    <DropdownMenu.Item onSelect={() => onSelect(theme)}>
      {theme}
    </DropdownMenu.Item>
  );
};

function initTheme() {
  const localTheme =
    typeof localStorage !== "undefined" &&
    (localStorage.getItem("theme") as Theme);
  return localTheme || "system";
}

export const ThemeDropdown = () => {
  const root = document.documentElement;
  const [theme, setTheme] = React.useState<Theme>(initTheme());

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme !== "system") {
      root.setAttribute("data-theme", theme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      root.setAttribute("data-theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
    }
  }, [theme]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="cc-btn">{theme}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          {THEMES.map((t, i) => (
            <ThemeOption key={i} theme={t} onSelect={setTheme} />
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
