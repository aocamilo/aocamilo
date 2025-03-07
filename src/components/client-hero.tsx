"use client";

import React from "react";
import HeroSection from "@/components/sections/hero-section";

interface ClientHeroProps {
  onExploreClick: () => void;
}

export default function ClientHero({ onExploreClick }: ClientHeroProps) {
  return <HeroSection onExploreClick={onExploreClick} />;
}
