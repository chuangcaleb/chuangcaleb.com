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

export const ThemeDropdown = () => {
  const root = document.documentElement;
  const [theme, setTheme] = React.useState<Theme>(
    (root.getAttribute("data-theme") as Theme) ?? "system",
  );

  React.useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
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
