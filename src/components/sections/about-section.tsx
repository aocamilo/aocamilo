"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import AnimatedText from "@/components/animated-text";

interface AboutSectionProps {
  onConnectClick: () => void;
}

export default function AboutSection({ onConnectClick }: AboutSectionProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <div className="max-w-3xl text-center">
      <div className="mb-6">
        <AnimatedText
          text="About Me"
          element="h2"
          className={`py-2 text-3xl font-bold ${
            isDark ? "text-gray-200" : "text-gray-800"
          } backdrop-blur-sm sm:text-4xl`}
          animationType="highlight"
          hoverTextColor="rgb(59, 130, 246)"
        />
      </div>
      <div
        className={`mb-6 rounded-lg p-4 shadow-sm backdrop-blur-sm ${
          isDark ? "bg-black/10" : "bg-white/60"
        }`}
      >
        <AnimatedText
          text="Full Stack Software Engineer with over six years of development experience and more than a decade in the IT industry. I'm passionate about improving developer experience (DX) and velocity, solving complex problems, and delivering high-impact solutions."
          element="p"
          className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}
          animationType="wave"
          staggerChildren={0.01}
          hoverTextColor="rgb(59, 130, 246)"
        />
      </div>
      <div
        className={`mb-6 rounded-lg p-4 shadow-sm backdrop-blur-sm ${
          isDark ? "bg-black/10" : "bg-white/60"
        }`}
      >
        <AnimatedText
          text="Currently working as a Senior Software Engineer at Novacomp, where I design and implement robust architectures using NextJS, NestJS, React, and AWS. I excel in creating scalable frontend solutions and modernizing legacy applications to improve performance."
          element="p"
          className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}
          animationType="wave"
          staggerChildren={0.01}
          hoverTextColor="rgb(59, 130, 246)"
        />
      </div>
      <div
        className={`mb-6 rounded-lg p-4 shadow-sm backdrop-blur-sm ${
          isDark ? "bg-black/10" : "bg-white/60"
        }`}
      >
        <AnimatedText
          text="My technical stack includes JavaScript, TypeScript, React, NextJS, Angular, NodeJS, NestJS, Express, MongoDB, PostgreSQL, and various testing frameworks. I'm fluent in Spanish (native) and English (professional working proficiency)."
          element="p"
          className={`text-lg ${isDark ? "text-gray-300" : "text-gray-700"}`}
          animationType="wave"
          staggerChildren={0.01}
          hoverTextColor="rgb(59, 130, 246)"
        />
      </div>
      <Button
        size="lg"
        onClick={onConnectClick}
        className="transform bg-blue-800 shadow-lg shadow-blue-800/50 transition-all duration-300 hover:scale-105 hover:bg-blue-900 hover:shadow-blue-900/50"
        style={{ color: "white" }}
      >
        Contact Me
      </Button>
    </div>
  );
}
