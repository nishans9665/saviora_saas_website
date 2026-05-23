"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 50, x: 0 };
      case "down":
        return { y: -50, x: 0 };
      case "left":
        return { y: 0, x: 50 };
      case "right":
        return { y: 0, x: -50 };
      case "none":
        return { y: 0, x: 0 };
      default:
        return { y: 50, x: 0 };
    }
  };

  const initialOffset = getDirectionOffset();

  return (
    <motion.section
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, ...initialOffset }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, ...initialOffset }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.section>
  );
}
