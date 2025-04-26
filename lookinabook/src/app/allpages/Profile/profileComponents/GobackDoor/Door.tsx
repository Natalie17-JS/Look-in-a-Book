"use client";

import doorday from "@/app/images/go-back-door-day.svg";
import doornight from "@/app/images/go-back-door-night.svg";
import { useTheme } from "@/app/context/themeContext";
import Image from "next/image";


interface DoorProps {
  className?: string;
  imageClassName?: string;
  alt?: string;
}

export default function Door({
  className = "",
  imageClassName = "",
  alt = "door-image",
}: DoorProps) {
  const { theme } = useTheme();

  const doorImage =
    theme === "dark" ? doornight :
    theme === "gray" ? doorday :
    doorday;

  return (
    <div className={className}>
      <Image
        src={doorImage}
        alt={alt}
        className={imageClassName}
      />
    </div>
  );
}
