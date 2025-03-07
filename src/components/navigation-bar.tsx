"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

interface NavigationBarProps {
  sections: string[];
  activeSection: string;
  onSectionClick: (section: string) => void;
}

export default function NavigationBar({
  sections,
  activeSection,
  onSectionClick,
}: NavigationBarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white/80 p-4 backdrop-blur-md dark:bg-[#0a0b1e]/70">
      <div className="mx-auto flex max-w-7xl items-center justify-end">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          {sections.map((section) => (
            <Button
              key={section}
              variant={activeSection === section ? "default" : "ghost"}
              onClick={() => onSectionClick(section)}
              className={`transition-colors duration-300 ${
                activeSection === section
                  ? "bg-blue-100 text-blue-900 dark:bg-blue-700 dark:text-white"
                  : "text-gray-700 hover:bg-gray-200/80 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-blue-800/30 dark:hover:text-white"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="text-gray-700 transition-colors duration-300 hover:bg-gray-200/80 hover:text-gray-900 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-white"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </motion.div>
      </div>
    </nav>
  );
}
