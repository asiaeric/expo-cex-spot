import { icons } from "lucide-react-native";
import React from "react";

interface IconProps {
  name: keyof typeof icons;
  color?: string;
  size?: number;
}

const AppIcon: React.FC<IconProps> = ({ name, color, size }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default AppIcon;
