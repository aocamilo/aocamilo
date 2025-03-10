"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const AnimatedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [trail, setTrail] = useState<
    { x: number; y: number; scale: number; opacity: number }[]
  >([]);
  const [isMoving, setIsMoving] = useState(false);
  const [lastMoveTime, setLastMoveTime] = useState(0);
  const [lineTrail, setLineTrail] = useState<
    Array<{
      x: number;
      y: number;
      timestamp: number;
    }>
  >([]);
  const animationFrameRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return false;
      return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ) || window.innerWidth <= 768
      );
    };

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    // Initial check
    setIsMobile(checkMobile());

    // Add resize listener to update when window size changes
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
      setIsMoving(true);
      setLastMoveTime(Date.now());

      // Add to line trail only when actually moving (not on every frame)
      // and with some distance between points to avoid too many points
      const lastPoint = lineTrail[0];
      if (
        !lastPoint ||
        Math.hypot(e.clientX - lastPoint.x, e.clientY - lastPoint.y) > 5
      ) {
        setLineTrail((prevTrail) => [
          { x: e.clientX, y: e.clientY, timestamp: Date.now() },
          ...prevTrail,
        ]);
      }
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [lineTrail, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const checkMovement = () => {
      if (Date.now() - lastMoveTime > 100) {
        setIsMoving(false);
      }
    };

    const movementInterval = setInterval(checkMovement, 100);
    return () => clearInterval(movementInterval);
  }, [lastMoveTime, isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const updateTrail = () => {
      setTrail((prevTrail) => {
        // Generate a random scale for supernova particles
        const randomScale = Math.random() * 0.5 + 0.5;

        // Create new trail points with random scaling for supernova effect
        const newTrail = [
          {
            x: mousePosition.x,
            y: mousePosition.y,
            scale: randomScale,
            opacity: 1,
          },
          ...prevTrail.slice(0, 15).map((point) => ({
            ...point,
            opacity: point.opacity * 0.92, // Fade out
          })),
        ];

        // Filter out points that are almost invisible
        return newTrail.filter((point) => point.opacity > 0.05);
      });
    };

    const trailInterval = setInterval(updateTrail, 20);

    return () => clearInterval(trailInterval);
  }, [mousePosition, isMobile]);

  // Animation loop for line trail expiration
  useEffect(() => {
    if (isMobile) return;

    const animateLineTrail = () => {
      const now = Date.now();
      // Keep only points that are less than 3 seconds old
      setLineTrail((prevTrail) =>
        prevTrail.filter((point) => now - point.timestamp < 1000),
      );

      animationFrameRef.current = requestAnimationFrame(animateLineTrail);
    };

    animationFrameRef.current = requestAnimationFrame(animateLineTrail);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const addHoverClass = () => setCursorVariant("hover");
    const removeHoverClass = () => setCursorVariant("default");

    const elements = document.querySelectorAll("a, button");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", addHoverClass);
      el.addEventListener("mouseleave", removeHoverClass);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", addHoverClass);
        el.removeEventListener("mouseleave", removeHoverClass);
      });
    };
  }, [isMobile]);

  const variants = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      scale: isMoving ? 1.2 : 1,
      opacity: 1,
    },
    hover: {
      height: 40,
      width: 40,
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      backgroundColor: "rgba(59, 130, 246, 0.7)",
      mixBlendMode: "screen" as const,
      scale: 1.5,
    },
  };

  const getRandomColor = (index: number) => {
    // Create a supernova palette - bright center, cooler outer edges
    const colors = [
      "rgba(255, 255, 255, 0.9)", // White center
      "rgba(255, 235, 155, 0.85)", // Bright yellow
      "rgba(255, 160, 50, 0.8)", // Orange
      "rgba(255, 100, 100, 0.75)", // Red
      "rgba(150, 100, 255, 0.7)", // Purple
      "rgba(90, 120, 255, 0.65)", // Blue
    ];

    // Use index to select color, with modulo to cycle through colors
    const colorIndex = index % colors.length;
    return colors[colorIndex];
  };

  // Helper function to calculate opacity based on age of the point
  const getLineOpacity = (timestamp: number) => {
    const age = Date.now() - timestamp;
    // 3000ms = 3 seconds, full trail duration
    return Math.max(0, 1 - age / 3000);
  };

  // Don't render cursor effects on mobile
  if (isMobile) {
    return null;
  }

  // For non-mobile devices, render the cursor animation
  return (
    <>
      {/* Cosmic trail line (comet tail) */}
      <svg
        className="pointer-events-none fixed left-0 top-0 z-40 h-full w-full"
        style={{ overflow: "visible" }}
      >
        {lineTrail.length > 1 && (
          <motion.path
            d={`M ${lineTrail
              .map((point) => `${point.x},${point.y}`)
              .join(" L ")}`}
            fill="none"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="url(#cosmicGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            style={{
              filter: "blur(1px)",
              opacity: 0.7,
            }}
          />
        )}
        <defs>
          <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
            <stop offset="20%" stopColor="rgba(255, 235, 155, 0.85)" />
            <stop offset="40%" stopColor="rgba(255, 160, 50, 0.8)" />
            <stop offset="60%" stopColor="rgba(255, 100, 100, 0.75)" />
            <stop offset="80%" stopColor="rgba(150, 100, 255, 0.7)" />
            <stop offset="100%" stopColor="rgba(90, 120, 255, 0)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Additional glowing dots along the trail path for more cosmic effect */}
      {lineTrail.slice(0, lineTrail.length / 2).map((point, index) => {
        const opacity = getLineOpacity(point.timestamp);
        if (index % 2 === 0 && opacity > 0.2) {
          // Only render every other point
          return (
            <motion.div
              key={`glow-${index}-${point.timestamp}`}
              className="z-45 pointer-events-none fixed left-0 top-0"
              style={{
                position: "fixed",
                left: point.x,
                top: point.y,
                width: 6 - index * 0.1,
                height: 6 - index * 0.1,
                backgroundColor: getRandomColor(index),
                borderRadius: "50%",
                filter: `blur(2px)`,
                opacity: opacity * 0.8,
                transform: `translate(-50%, -50%)`,
                boxShadow: `0 0 ${5 + index}px ${getRandomColor(index % 3)}`,
              }}
            />
          );
        }
        return null;
      })}

      {/* Trail particles for the supernova effect */}
      {trail.map((position, index) => (
        <motion.div
          key={`particle-${index}`}
          className="pointer-events-none fixed left-0 top-0 z-50"
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            translateX: position.x,
            translateY: position.y,
            width: Math.max(3, 20 * position.scale * (1 - index * 0.05)),
            height: Math.max(3, 20 * position.scale * (1 - index * 0.05)),
            backgroundColor: getRandomColor(index),
            borderRadius: "50%",
            filter: `blur(${2 + index * 0.2}px)`,
            opacity: position.opacity,
            transform: `translate(-50%, -50%) scale(${1 - index * 0.03})`,
            boxShadow:
              index < 3
                ? `0 0 ${10 + index * 5}px ${getRandomColor(index)}`
                : "none",
          }}
        />
      ))}

      {/* Main cursor - supernova core */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50"
        style={{
          borderRadius: "50%",
          mixBlendMode: "screen",
          boxShadow: "0 0 15px 2px rgba(255, 255, 255, 0.8)",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,215,115,0.8) 50%, rgba(255,100,50,0.5) 100%)",
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
    </>
  );
};

export default AnimatedCursor;
