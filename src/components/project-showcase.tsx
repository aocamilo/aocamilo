"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  image?: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
}

const ProjectShowcase = ({ projects }: ProjectShowcaseProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Make sure we're mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Force re-render when theme changes
  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  if (!mounted) return <div className="min-h-[200px]"></div>; // Placeholder while loading

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`overflow-hidden rounded-lg border border-blue-500/20 shadow-xl backdrop-blur-lg ${
            isDark ? "bg-[#1a1b3e]/50" : "bg-white/70"
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="relative aspect-video">
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 flex items-center justify-center ${
                isDark ? "bg-[#0a0b1e]/80" : "bg-gray-800/80"
              }`}
            >
              <div className="text-center">
                {project.liveUrl && (
                  <Button
                    asChild
                    className="mr-2 bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                <Button
                  variant="outline"
                  asChild
                  className={`${
                    isDark
                      ? "border-blue-400 text-blue-300 hover:bg-blue-900/30"
                      : "border-blue-600 text-blue-600 hover:bg-blue-100/30"
                  }`}
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
          <div className="p-6">
            <h3
              className={`mb-2 text-xl font-bold ${
                isDark ? "text-blue-100" : "text-gray-900"
              }`}
            >
              {project.title}
            </h3>
            <p
              className={`mb-4 line-clamp-2 ${
                isDark ? "text-blue-200" : "text-gray-700"
              }`}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`${
                    isDark
                      ? "bg-blue-900/50 text-blue-200"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectShowcase;
