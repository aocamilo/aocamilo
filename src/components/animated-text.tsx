"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  staggerChildren?: number;
  animationType?: "wave" | "scatter" | "highlight" | "glow";
  textColor?: string;
  hoverTextColor?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  element = "p",
  staggerChildren = 0.015,
  animationType = "wave",
  textColor = "",
  hoverTextColor = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Split text into words and then into characters
  const words = text.split(" ");

  // Animation variants for different effects
  const waveContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
      },
    },
    hover: {
      transition: {
        staggerChildren,
      },
    },
    exitHover: {
      transition: {
        staggerChildren: staggerChildren / 2,
        staggerDirection: -1,
      },
    },
  };

  const waveLetter: Variants = {
    hidden: { y: 0, opacity: 1 },
    visible: { y: 0, opacity: 1 },
    hover: {
      y: [0, -10, 0],
      color: hoverTextColor || undefined,
      textShadow:
        "0 0 8px rgba(120, 170, 255, 0.8), 0 0 15px rgba(50, 100, 255, 0.4)",
      transition: {
        y: {
          type: "keyframes",
          duration: 0.5,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.1,
        },
        textShadow: { duration: 0.3 },
      },
    },
    exitHover: {
      y: 0,
      color: textColor || undefined,
      textShadow: "none",
      transition: { duration: 0.2 },
    },
  };

  const scatterContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
      },
    },
    hover: {
      transition: {
        staggerChildren,
      },
    },
    exitHover: {
      transition: {
        staggerChildren: staggerChildren / 2,
        staggerDirection: -1,
      },
    },
  };

  const generateRandomNumber = () => (Math.random() - 0.5) * 20;
  const generateRandomScale = () => 1 + Math.random() * 0.4;

  const scatterLetter: Variants = {
    hidden: { opacity: 1, x: 0, y: 0, rotate: 0 },
    visible: { opacity: 1, x: 0, y: 0, rotate: 0 },
    hover: {
      x: generateRandomNumber(),
      y: generateRandomNumber(),
      rotate: generateRandomNumber(),
      color: hoverTextColor || undefined,
      textShadow:
        "0 0 8px rgba(120, 170, 255, 0.8), 0 0 15px rgba(50, 100, 255, 0.4)",
      scale: generateRandomScale(),
      transition: { duration: 0.3, type: "spring" },
    },
    exitHover: {
      x: 0,
      y: 0,
      rotate: 0,
      color: textColor || undefined,
      scale: 1,
      textShadow: "none",
      transition: { duration: 0.3 },
    },
  };

  const highlightContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
      },
    },
    hover: {
      transition: {
        staggerChildren: staggerChildren / 3,
      },
    },
    exitHover: {
      transition: {
        staggerChildren: staggerChildren / 3,
        staggerDirection: -1,
      },
    },
  };

  const highlightLetter: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    hover: {
      color: hoverTextColor || undefined,
      textShadow:
        "0 0 8px rgba(120, 170, 255, 0.8), 0 0 15px rgba(50, 100, 255, 0.4)",
      y: [0, -3, 0],
      scale: 1.1,
      transition: {
        y: {
          type: "keyframes",
          duration: 0.3,
          ease: "easeOut",
          times: [0, 0.5, 1],
        },
        scale: { duration: 0.3 },
      },
    },
    exitHover: {
      color: textColor || undefined,
      textShadow: "none",
      y: 0,
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  const glowContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
      },
    },
    hover: {
      transition: {
        staggerChildren,
      },
    },
    exitHover: {
      transition: {
        staggerChildren,
        staggerDirection: -1,
      },
    },
  };

  const glowLetter: Variants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1 },
    hover: {
      color: hoverTextColor || undefined,
      textShadow:
        "0 0 10px rgba(255, 220, 150, 0.8), 0 0 20px rgba(255, 180, 50, 0.6), 0 0 30px rgba(255, 120, 20, 0.4)",
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    exitHover: {
      color: textColor || undefined,
      textShadow: "none",
      scale: 1,
      transition: { duration: 0.2 },
    },
  };

  // Get the correct animation variants
  let containerVariant: Variants;
  let letterVariant: Variants;

  switch (animationType) {
    case "wave":
      containerVariant = waveContainer;
      letterVariant = waveLetter;
      break;
    case "scatter":
      containerVariant = scatterContainer;
      letterVariant = scatterLetter;
      break;
    case "highlight":
      containerVariant = highlightContainer;
      letterVariant = highlightLetter;
      break;
    case "glow":
      containerVariant = glowContainer;
      letterVariant = glowLetter;
      break;
    default:
      containerVariant = waveContainer;
      letterVariant = waveLetter;
  }

  // Create the component with the specified element type
  const Component = element;

  return (
    <Component
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        initial="hidden"
        animate="visible"
        variants={containerVariant}
        className="inline-block whitespace-pre-wrap"
        style={{ display: "inline-block" }}
      >
        {words.map((word, wordIndex) => (
          <React.Fragment key={`word-${wordIndex}`}>
            {wordIndex > 0 && " "}
            <motion.span
              className="inline-block"
              variants={containerVariant}
              animate={isHovered ? "hover" : "exitHover"}
            >
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`char-${charIndex}`}
                  className="relative inline-block"
                  variants={letterVariant}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </React.Fragment>
        ))}
      </motion.span>
    </Component>
  );
};

export default AnimatedText;
