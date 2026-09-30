import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "./theme-provider"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    function toggleTheme() {
        const isDark = theme === "dark" || (
            theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches
        )
        setTheme(isDark ? "light" : "dark")
    }

    return (
        <Button
            type="button"
            variant="outline"
            size="icon"
            className="relative"
            onClick={toggleTheme}
            aria-label="Toggle light and dark mode"
            title="Toggle light and dark mode"
        >
            <Sun aria-hidden="true" className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon aria-hidden="true" className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    )
}
