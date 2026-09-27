// NOT: Proje genelinde sadece bir kez tanımlayın.
//      Genelde layoutta bulunması daha iyidir.
//      Kullanmak için CImagePreview componentini ve usePreviewStore hookunu kullanın.

"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { motion, AnimatePresence } from "framer-motion"; // npm i motion
import { CImage } from "./CImage";
import { X } from "lucide-react";

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

export const ImagePreview = () => {
  const { data: storeUrl, reset } = usePreviewStore(
    useShallow((s) => ({ data: s.data, reset: s.reset })),
  );

  /* #region Zoom */
  const [zoomIndex, setZoomIndex] = useState(0);
  const zoomSegments = ["", "scale-150", "scale-200"];

  const toggleZoom = () => {
    setZoomIndex((prev) => (prev + 1) % zoomSegments.length);
  };

  const resetZoom = () => {
    setZoomIndex(0);
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
              className={`${zoomSegments[zoomIndex]} ${
                zoomIndex === zoomSegments.length - 1
                  ? "cursor-zoom-out"
                  : "cursor-zoom-in"
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
