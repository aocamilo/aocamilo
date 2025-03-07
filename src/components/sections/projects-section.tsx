"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import AnimatedText from "@/components/animated-text";
import ProjectShowcase from "@/components/project-showcase";

// Define Project interface locally to avoid import issues
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <>
      <div className="mb-12 text-center">
        <AnimatedText
          text="Featured Projects"
          element="h2"
          className={`py-2 text-3xl font-bold backdrop-blur-sm ${
            isDark ? "text-gray-200" : "text-gray-800"
          } sm:text-4xl`}
          animationType="wave"
          hoverTextColor="rgb(59, 130, 246)"
        />
      </div>
      <ProjectShowcase projects={projects} />
    </>
  );
}
