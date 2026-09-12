"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion"; // npm i motion
import { CImage, CImageProps } from "./CImage";
import { X } from "lucide-react";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

/* #region Store */
type PreviewStore<T> = {
  data: T;
  setData: (value: T) => void;
  reset: () => void;
};

export const usePreviewStore = create<PreviewStore<string | null>>((set) => ({
  data: null,
  setData: (value) => set({ data: value }),
  reset: () => set({ data: null }),
}));
/* #endregion */

export const CImagePreview = (props: CImageProps) => {
  const setPreview = usePreviewStore((s) => s.setData);

  return (
    <>
      <CImage
        {...props}
        onClick={() => setPreview(props.url)}
        className={cn("cursor-pointer", props.className)}
      />
      <ImagePreview />
    </>
  );
};

const ImagePreview = () => {
  const { data: storeUrl, reset } = usePreviewStore(
    useShallow((s) => ({ data: s.data, reset: s.reset })),
  );
  const [isZoomed, setIsZoomed] = useState(false);

  /* #region Zoom */
  const toggleZoom = () => {
    setIsZoomed((prev) => !prev);
  };

  const resetZoom = () => {
    setIsZoomed(false);
  };
  /* #endregion */

  /* #region Close */
  const close = useCallback(() => {
    reset();
    resetZoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* #endregion */

  const maxW = "max-w-[90svw]";
  const maxH = "max-h-[70svh]";

  const buttonCss =
    "fixed p-3 cursor-pointer rounded-full bg-black/40 backdrop-blur text-white hover:bg-black/60 transition";

  return (
    <AnimatePresence mode="wait">
      {storeUrl && (
        // BG
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 py-8"
        >
          {/* Image */}
          <div
            className={cn("relative", maxW)}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={() => {
                toggleZoom();
              }}
              className={`${
                isZoomed
                  ? "scale-150 cursor-zoom-out"
                  : "scale-100 cursor-zoom-in"
              }`}
            >
              <CImage
                url={storeUrl}
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, 1200px"
                rounded="rounded-xl"
                object="object-contain"
                align="object-center"
                className={cn(maxH)}
              />
            </motion.div>
          </div>

          {/* Buttons */}
          <div onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button onClick={close} className={cn(buttonCss, "top-4 right-4")}>
              <X size={24} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
