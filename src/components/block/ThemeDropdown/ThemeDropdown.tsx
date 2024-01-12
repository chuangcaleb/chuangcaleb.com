import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import IconLight from "~icons/lucide/sun";
import IconDark from "~icons/lucide/moon";
import IconSystem from "~icons/lucide/database";
import React from "react";
import styles from "./styles.module.css";

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
  disabled,
}: {
  theme: Theme;
  disabled: boolean;
}) => {
  return (
    <>
      <DropdownMenu.RadioItem
        className={styles.menuItem}
        disabled={disabled}
        value={theme.label}
      >
        {theme.icon}
        {theme.label}
      </DropdownMenu.RadioItem>
    </>
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
        <DropdownMenu.Content
          className={styles.menuContent}
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <DropdownMenu.RadioGroup
            value={themeLabel}
            onValueChange={setThemeLabel}
          >
            {THEMES.map((theme, i) => (
              <ThemeOption
                key={i}
                theme={theme}
                disabled={themeLabel === theme.label}
              />
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
