"use client";
import React from "react";

import type { LucideIcon } from "lucide-react";

import { icons } from "lucide-react";

interface IconProps {
  name: string;
  color?: string;
  size?: number;
}

const Icon = ({ name, color, size }: IconProps) => {
  const IconComponent = icons[name] as LucideIcon;

  return <IconComponent color={color} size={size} />;
};

export default Icon;
