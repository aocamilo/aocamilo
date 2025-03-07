"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useTheme } from "next-themes";

interface SocialLinkProps {
  platform: string;
  icon: ReactNode;
  url: string;
}

const SocialLink = ({ platform, icon, url }: SocialLinkProps) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center gap-2 rounded-xl border border-blue-700 p-4 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg ${
        isDark
          ? "bg-blue-900/50 hover:bg-blue-900/70"
          : "bg-white/40 hover:bg-white/50"
      }`}
      aria-label={`Visit my ${platform} profile`}
    >
      <div className={`${isDark ? "text-blue-300" : "text-blue-800"}`}>
        {icon}
      </div>
      <span
        className={`text-sm font-medium ${
          isDark ? "text-white" : "text-gray-800"
        }`}
      >
        {platform}
      </span>
    </Link>
  );
};

export default SocialLink;
