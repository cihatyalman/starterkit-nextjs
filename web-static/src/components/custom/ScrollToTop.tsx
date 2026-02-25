"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CircleArrowUp } from "lucide-react";
import { scrollStore } from "@/core/helperx/scroll-listener/scroll.store";

export const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);
  const scroll = scrollStore((s) => s.data);

  useEffect(() => {
    setVisible(scroll > 500);
  }, [scroll]);

  const scrollToTop = () => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={cn(
        "fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-40",
        "rounded-full text-gray-500 cursor-pointer shadow-xl border border-gray-500",
        "transition-all duration-300",
        "hover:text-(--color-primary)",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      <CircleArrowUp size={48} className="bg-background rounded-full" />
    </button>
  );
};
