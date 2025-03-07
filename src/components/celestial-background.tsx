"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface CelestialBackgroundProps {
  scrollPosition: number;
}

const CelestialBackground = ({ scrollPosition }: CelestialBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;

    class Star {
      x = 0;
      y = 0;
      radius = 0;
      opacity = 0;
      blinkRate = 0;

      constructor() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 1.5;
        this.opacity = Math.random();
        this.blinkRate = Math.random() * 0.02 - 0.01;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }

      update() {
        this.opacity += this.blinkRate;
        if (this.opacity > 1 || this.opacity < 0) {
          this.blinkRate = -this.blinkRate;
        }
      }
    }

    class Cloud {
      x = 0;
      y = 0;
      width = 0;
      height = 0;
      speed = 0;

      constructor() {
        if (!canvas) return;
        this.width = Math.random() * 300 + 200;
        this.height = this.width * 0.6;
        this.x = Math.random() * (canvas.width + this.width) - this.width;
        this.y = Math.random() * canvas.height * 0.7;
        this.speed = Math.random() * 0.2 + 0.1;
      }

      draw() {
        ctx!.save();
        const gradient = ctx!.createRadialGradient(
          this.x + this.width * 0.5,
          this.y + this.height * 0.5,
          0,
          this.x + this.width * 0.5,
          this.y + this.height * 0.5,
          this.width * 0.5,
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx!.fillStyle = gradient;
        ctx!.beginPath();
        ctx!.arc(
          this.x + this.width * 0.3,
          this.y + this.height * 0.5,
          this.height * 0.5,
          Math.PI * 0.5,
          Math.PI * 1.5,
        );
        ctx!.arc(
          this.x + this.width * 0.7,
          this.y + this.height * 0.5,
          this.height * 0.5,
          Math.PI * 1.5,
          Math.PI * 0.5,
        );
        ctx!.closePath();
        ctx!.fill();
        ctx!.restore();
      }

      update() {
        if (!canvas) return;

        this.x += this.speed;
        if (this.x > canvas.width + this.width) {
          this.x = -this.width;
        }
      }
    }

    const stars: Star[] = [];
    const clouds: Cloud[] = [];

    const createStars = () => {
      if (!canvas) return;
      for (let i = 0; i < 200; i++) {
        stars.push(new Star());
      }
    };

    const createClouds = () => {
      if (!canvas) return;
      for (let i = 0; i < 5; i++) {
        clouds.push(new Cloud());
      }
    };

    const drawMoon = (x: number, y: number) => {
      const moonRadius = 50;

      // Moon glow
      if (!ctx) return;

      const gradient = ctx.createRadialGradient(
        x,
        y,
        moonRadius,
        x,
        y,
        moonRadius * 2,
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, moonRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Moon
      ctx.beginPath();
      ctx.arc(x, y, moonRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();

      // Craters
      const craters = [
        { x: -15, y: -15, r: 8 },
        { x: 20, y: 10, r: 6 },
        { x: -10, y: 25, r: 10 },
      ];

      craters.forEach((crater) => {
        ctx.beginPath();
        ctx.arc(x + crater.x, y + crater.y, crater.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220, 220, 220, 0.8)";
        ctx.fill();
      });
    };

    const drawSun = (x: number, y: number) => {
      if (!ctx) return;

      const sunRadius = 40;
      const rayLength = 20;
      const rayCount = 12;

      // Sun glow
      const gradient = ctx.createRadialGradient(
        x,
        y,
        sunRadius,
        x,
        y,
        sunRadius * 2,
      );
      gradient.addColorStop(0, "rgba(255, 255, 160, 0.4)");
      gradient.addColorStop(1, "rgba(255, 255, 160, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, sunRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Sun
      ctx.beginPath();
      ctx.arc(x, y, sunRadius, 0, Math.PI * 2);
      const sunGradient = ctx.createRadialGradient(x, y, 0, x, y, sunRadius);
      sunGradient.addColorStop(0, "#FFF5B8");
      sunGradient.addColorStop(1, "#FFD275");
      ctx.fillStyle = sunGradient;
      ctx.fill();

      // Sun rays
      ctx.strokeStyle = "rgba(255, 210, 117, 0.6)";
      ctx.lineWidth = 3;

      for (let i = 0; i < rayCount; i++) {
        const angle = (i * Math.PI * 2) / rayCount;
        const startX = x + (sunRadius + 5) * Math.cos(angle);
        const startY = y + (sunRadius + 5) * Math.sin(angle);
        const endX = x + (sunRadius + rayLength) * Math.cos(angle);
        const endY = y + (sunRadius + rayLength) * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate celestial body position based on scroll
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / maxScroll;
      const celestialX = canvas.width * (0.2 + scrollPercentage * 0.6);
      const celestialY =
        canvas.height * (0.2 + Math.sin(scrollPercentage * Math.PI) * 0.3);

      if (theme === "dark") {
        // Night sky gradient with reduced opacity
        const nightGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        nightGradient.addColorStop(0, "rgba(10, 11, 30, 0.85)");
        nightGradient.addColorStop(1, "rgba(26, 27, 62, 0.85)");
        ctx.fillStyle = nightGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach((star) => {
          star.update();
          star.draw();
        });
        drawMoon(celestialX, celestialY);
      } else {
        // Day sky gradient with reduced opacity
        const dayGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        dayGradient.addColorStop(0, "rgba(135, 206, 235, 0.85)");
        dayGradient.addColorStop(1, "rgba(224, 246, 255, 0.85)");
        ctx.fillStyle = dayGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        clouds.forEach((cloud) => {
          cloud.update();
          cloud.draw();
        });
        drawSun(celestialX, celestialY);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    createStars();
    createClouds();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, scrollPosition]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 opacity-80"
    />
  );
};

export default CelestialBackground;
