import { DropdownMenu } from "@kobalte/core";
import { createEffect, createSignal } from "solid-js";

export function ThemeToggle() {
  const root = document.documentElement;
  const [theme, setTheme] = createSignal<string>(
    root.getAttribute("data-theme") ?? "system",
  );

  createEffect(() => {
    localStorage.setItem("theme", theme());
    if (theme() === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme());
    }
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DropdownMenu.Icon />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Item onSelect={() => setTheme(() => "light")}>
            <DropdownMenu.ItemLabel>Light</DropdownMenu.ItemLabel>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => setTheme(() => "dark")}>
            <DropdownMenu.ItemLabel>Dark</DropdownMenu.ItemLabel>
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => setTheme(() => "system")}>
            <DropdownMenu.ItemLabel>System</DropdownMenu.ItemLabel>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default ThemeToggle;
