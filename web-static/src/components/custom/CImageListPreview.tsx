"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion"; // npm i motion
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { CImage } from "./CImage";

interface CImageListPreviewProps {
  images: string[];
  isAnimated?: boolean;
}
export interface CImageListPreviewRef {
  show: (index?: number) => void;
}

export const CImageListPreview = forwardRef<
  CImageListPreviewRef,
  CImageListPreviewProps
>(({ images, isAnimated = false }, ref) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  /* #region Zoom */
  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  const resetZoom = () => {
    setIsZoomed(false);
  };
  /* #endregion */

  /* #region Next/Prev */
  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % images.length);
    resetZoom();
  }, [images.length]);
  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
    resetZoom();
  }, [images.length]);
  /* #endregion */

  /* #region Show/Close */
  const close = useCallback(() => setActiveIndex(-1), []);
  const show = useCallback((index: number) => {
    setDirection(0);
    setActiveIndex(index);
    resetZoom();
  }, []);
  /* #endregion */

  useImperativeHandle(ref, () => ({
    show: (index?: number) => show(index ?? 0),
  }));

  /* #region Keyboard Controller */
  useEffect(() => {
    if (activeIndex === -1) return;

    const handleKey = (e: MyAny) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, next, prev, close]);
  /* #endregion */

  const maxW = "max-w-[90svw]";
  const maxH = "max-h-[70svh]";

  const buttonCss =
    "fixed p-3 cursor-pointer rounded-full bg-black/40 backdrop-blur text-white hover:bg-black/60 transition";

  return (
    <AnimatePresence custom={direction} mode="wait">
      {activeIndex !== -1 && (
        // BG + Buttons
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          {/* Image + Thumbnails */}
          <div
            className={cn("relative", maxW)}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Start */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const offset = info.offset.x;
                const velocity = info.velocity.x;

                if (offset > 50 || velocity > 500) prev();
                if (offset < -50 || velocity < -500) next();
              }}
              onClick={() => {
                toggleZoom();
              }}
              className={`${
                isZoomed
                  ? "scale-150 cursor-zoom-out"
                  : "scale-100 cursor-zoom-in"
              }`}
            >
              {isAnimated ? (
                <AnimatedImage
                  activeIndex={activeIndex}
                  direction={direction}
                  images={images}
                  maxH={maxH}
                />
              ) : (
                <NotAnimatedImage
                  activeIndex={activeIndex}
                  images={images}
                  maxH={maxH}
                />
              )}
            </motion.div>

            {/* Thumbnails Row */}
            <div className="fixed left-0 bottom-4 w-full overflow-x-auto px-6">
              <div className="w-full flex justify-center items-end gap-2 mt-4 min-w-max pb-3">
                {images.map((src, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setDirection(0);
                      setActiveIndex(i);
                      resetZoom();
                    }}
                  >
                    <CImage
                      alt={i.toString()}
                      url={src}
                      width={200}
                      height={150}
                      rounded="rounded-md"
                      className={cn(
                        "h-20 w-auto cursor-pointer transition-all border-2",
                        activeIndex === i
                          ? "border-white shadow-lg h-24 w-auto"
                          : "border-transparent opacity-50 hover:opacity-100",
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button onClick={close} className={cn(buttonCss, "top-4 right-4")}>
              <X size={24} />
            </button>

            {/* Left Arrow */}
            <button
              onClick={prev}
              className={cn(buttonCss, "left-4 top-1/2 -translate-y-1/2")}
            >
              <ChevronLeft size={26} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={next}
              className={cn(buttonCss, "right-4 top-1/2 -translate-y-1/2")}
            >
              <ChevronRight size={26} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
CImageListPreview.displayName = "CImageListPreview";

const AnimatedImage = (props: {
  activeIndex: number;
  direction: number;
  images: string[];
  maxH: string;
}) => {
  const variants = {
    enter: (direction: number) => ({
      x: direction == 0 ? 0 : direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      key={props.activeIndex}
      custom={props.direction}
      variants={variants}
      initial="enter"
      animate="center"
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
    >
      <CImage
        url={props.images[props.activeIndex]}
        width={800}
        height={600}
        sizes="(max-width: 768px) 100vw, 1200px"
        className={cn(
          "w-auto object-contain object-center rounded-xl shadow-2xl",
          props.maxH,
        )}
      />
    </motion.div>
  );
};

const NotAnimatedImage = (props: {
  activeIndex: number;
  images: string[];
  maxH: string;
}) => {
  return (
    <CImage
      url={props.images[props.activeIndex]}
      width={800}
      height={600}
      sizes="(max-width: 768px) 100vw, 1200px"
      className={cn(
        "w-auto object-contain object-center rounded-xl shadow-2xl",
        props.maxH,
      )}
    />
  );
};
