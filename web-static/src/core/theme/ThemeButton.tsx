"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeButton = (props: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  function handleToggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  return (
    <Button
      onClick={handleToggleTheme}
      name="ThemeButton"
      aria-label="ThemeButton"
      size="icon"
      className={cn(
        "cursor-pointer border",
        "bg-background hover:bg-accent text-foreground",
        "short:shadow-black/10 short:dark:shadow-white/10",
        props.className,
      )}
    >
      {mounted && (
        <>
          <Sun className={theme !== "dark" ? "inline" : "hidden"} />
          <Moon className={theme === "dark" ? "inline" : "hidden"} />
        </>
      )}
    </Button>
  );
};
