"use client";

import {
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  type RefObject,
} from "react";
import { useTheme } from "next-themes";
import AnimatedCursor from "@/components/animated-cursor";
import CelestialBackground from "@/components/celestial-background";
import NavigationBar from "@/components/navigation-bar";

interface SectionRefs {
  home: RefObject<HTMLElement>;
  projects: RefObject<HTMLElement>;
  about: RefObject<HTMLElement>;
  contact: RefObject<HTMLElement>;
  [key: string]: RefObject<HTMLElement>;
}

interface ClientWrapperProps {
  children: ReactNode;
  sectionRefs: SectionRefs;
}

export default function ClientWrapper({
  children,
  sectionRefs,
}: ClientWrapperProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [scrollPosition, setScrollPosition] = useState(0);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScroll = useCallback(() => {
    const position = window.pageYOffset;
    setScrollPosition(position);

    const scrollPosition = window.scrollY + 100; // Offset for better accuracy

    Object.entries(sectionRefs).forEach(([key, ref]) => {
      if (ref.current && scrollPosition >= ref.current.offsetTop) {
        setActiveSection(key);
      }
    });
  }, [sectionRefs]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (section: string) => {
    const sectionRef = sectionRefs[section];
    sectionRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Force a repaint on theme change
  useEffect(() => {
    if (mounted) {
      const htmlElement = document.documentElement;

      // Add a short timeout to ensure theme classes are applied before we trigger a repaint
      const timer = setTimeout(() => {
        // Force a reflow/repaint by accessing a property that triggers layout
        const triggerReflow = htmlElement.scrollTop;
        // Apply a class to force text to update
        htmlElement.classList.add("theme-transition");
        setTimeout(() => {
          htmlElement.classList.remove("theme-transition");
        }, 100);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [theme, resolvedTheme, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AnimatedCursor />
      <CelestialBackground scrollPosition={scrollPosition} />
      <NavigationBar
        sections={Object.keys(sectionRefs)}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
      {children}
    </>
  );
}
