"use client";

import { useEffect } from "react";
import { useScrollStore } from "./scroll.store";

export function ScrollListener() {
  const setScroll = useScrollStore((s) => s.setData);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
          setScroll(scrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });

    return () => {
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [setScroll]);

  return null;
}
