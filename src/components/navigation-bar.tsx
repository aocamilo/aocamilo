"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu when a section is clicked
  const handleSectionClick = (section: string) => {
    onSectionClick(section);
    setMobileMenuOpen(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-white/80 p-4 backdrop-blur-md dark:bg-[#0a0b1e]/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo/Brand */}
        <div className="text-xl font-bold text-blue-800 dark:text-blue-400">
          CA
        </div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden items-center gap-4 md:flex"
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

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="text-gray-700 transition-colors duration-300 hover:bg-gray-200/80 hover:text-gray-900 dark:text-blue-300 dark:hover:bg-blue-800/30 dark:hover:text-white"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-2 p-4">
              {sections.map((section) => (
                <Button
                  key={section}
                  variant={activeSection === section ? "default" : "ghost"}
                  onClick={() => handleSectionClick(section)}
                  className={`w-full justify-start transition-colors duration-300 ${
                    activeSection === section
                      ? "bg-blue-100 text-blue-900 dark:bg-blue-700 dark:text-white"
                      : "text-gray-700 hover:bg-gray-200/80 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-blue-800/30 dark:hover:text-white"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
