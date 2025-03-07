"use client";

import AnimatedText from "@/components/animated-text";
import SocialLink from "@/components/social-link";
import { Github, Mail, Youtube, Twitter } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ContactSection() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <div className="w-full max-w-md">
      <div className="mb-6">
        <AnimatedText
          text="Contact Information"
          element="h2"
          className={`py-2 text-center text-3xl font-bold ${
            isDark ? "text-gray-200" : "text-gray-800"
          } backdrop-blur-sm sm:text-4xl`}
          animationType="glow"
          hoverTextColor="rgb(59, 130, 246)"
        />
      </div>
      <div className="mb-8 text-center">
        <AnimatedText
          text="Feel free to reach out for opportunities or collaborations:"
          element="p"
          className={isDark ? "text-gray-300" : "text-gray-700"}
          animationType="scatter"
          staggerChildren={0.02}
          hoverTextColor="rgb(59, 130, 246)"
        />
      </div>
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-2">
        <SocialLink
          platform="GitHub"
          icon={<Github size={24} />}
          url="https://github.com/aocamilo"
        />
        {/* <SocialLink
          platform="LinkedIn"
          icon={<Linkedin size={24} />}
          url="https://linkedin.com/in/yourusername"
        /> */}
        <SocialLink
          platform="Email"
          icon={<Mail size={24} />}
          url="mailto:camilo_ar95@outlook.com"
        />
        <SocialLink
          platform="YouTube"
          icon={<Youtube size={24} />}
          url="https://www.youtube.com/@aocamilo"
        />
        <SocialLink
          platform="X"
          icon={<Twitter size={24} />}
          url="https://x.com/AoCamilo"
        />
      </div>
      <div className="text-center">
        <div className="mb-2">
          <AnimatedText
            text="Located in:"
            element="p"
            className={isDark ? "text-gray-300" : "text-gray-700"}
            animationType="highlight"
            hoverTextColor="rgb(59, 130, 246)"
          />
        </div>
        <div
          className={`rounded-lg px-4 py-2 text-lg font-semibold shadow-sm backdrop-blur-sm ${
            isDark ? "bg-black/10 text-blue-300" : "bg-white/60 text-blue-700"
          }`}
        >
          Remote
        </div>
      </div>
    </div>
  );
}
