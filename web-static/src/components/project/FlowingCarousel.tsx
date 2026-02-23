"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export interface FlowingCarouselProps<T = number> {
  items: T[] | number;
  speed?: number;
  space?: string;
  loopCopies?: 2 | 4 | 6 | 8;
  children: (args: { item: T | number }) => React.ReactNode;
}

export const FlowingCarousel = <T,>({
  speed = 10,
  space = "pl-10",
  loopCopies = 2,
  children,
  ...props
}: FlowingCarouselProps<T>) => {
  const itemList =
    typeof props.items === "number"
      ? Array.from({ length: props.items }, (_, i) => i)
      : props.items;

  if (itemList.length === 0) return null;

  const [paused, setPaused] = useState(false);

  const edgeStyle =
    "absolute pointer-events-none inset-y-0 w-24 from-white dark:from-[oklch(0.13_0.028_261.692)]";

  return (
    <div
      className="relative group overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div
        className={
          "flex w-max group-hover:play-state-[paused_!important] animate-flowing-carousel"
        }
        style={
          {
            "--flowing-carousel-duration": `${speed}s`,
            animationPlayState: paused ? "paused" : "running",
          } as React.CSSProperties
        }
      >
        {[...Array.from({ length: loopCopies }, () => itemList).flat()].map(
          (item, i) => (
            <div key={i} className={space}>
              {children({ item })}
            </div>
          ),
        )}
      </div>
      <div className={cn(edgeStyle, "left-0 bg-linear-to-r")} />
      <div className={cn(edgeStyle, "right-0 bg-linear-to-l")} />
    </div>
  );
};

// global.css
/*

@keyframes flowing-carousel-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-flowing-carousel {
  animation: flowing-carousel-scroll var(--flowing-carousel-duration, 20s)
    linear infinite;
  animation-play-state: running;
}

*/
