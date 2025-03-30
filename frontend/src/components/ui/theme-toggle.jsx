import { Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeProvider";
import { Button } from "./button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden group"
    >
      {/* MagicUI-inspired animated toggle */}
      <div className="relative w-6 h-6 flex justify-center items-center">
        <Sun
          className={`absolute transition-all duration-300 ${
            theme === "light"
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 -rotate-90 opacity-0"
          }`}
        />
        <Moon
          className={`absolute transition-all duration-300 ${
            theme === "dark"
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 rotate-90 opacity-0"
          }`}
        />
      </div>
      <span className="sr-only">Toggle theme</span>

      {/* MagicUI-inspired glow effect */}
    </Button>
  );
}
