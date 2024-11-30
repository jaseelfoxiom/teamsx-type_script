import React from "react"; 
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

// Define the type for the theme options
type Theme = "system" | "light" | "dark";

// Accept `className` as a prop
interface ModeToggleProps {
  className?: string; // className is optional
}

export function ModeToggle({ className }: ModeToggleProps) {
  // Destructure `setTheme` from the `useTheme` hook
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={className}>
          {/* Sun and Moon icons with transitions */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* Menu items to switch between themes */}
        <DropdownMenuItem onClick={() => setTheme("light" as Theme)}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark" as Theme)}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system" as Theme)}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
