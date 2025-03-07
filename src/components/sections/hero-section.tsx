"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/animated-text";

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <div className="text-center">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mb-6"
      >
        <AnimatedText
          text="Camilo Arango"
          element="h1"
          className={`text-4xl font-bold ${
            isDark ? "text-gray-200" : "text-gray-900"
          } sm:text-5xl md:text-6xl`}
          animationType="glow"
          hoverTextColor="rgb(59, 130, 246)"
        />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mb-8"
      >
        <AnimatedText
          text="Senior Software Engineer"
          element="p"
          className={`text-xl ${
            isDark ? "text-gray-300" : "text-gray-700"
          } sm:text-2xl`}
          animationType="scatter"
          hoverTextColor="rgb(59, 130, 246)"
        />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Button
          size="lg"
          onClick={onExploreClick}
          className="transform bg-blue-800 shadow-lg shadow-blue-800/50 transition-all duration-300 hover:scale-105 hover:bg-blue-900 hover:shadow-blue-900/50"
          style={{ color: "white" }}
        >
          View My Projects
        </Button>
      </motion.div>
    </div>
  );
}
