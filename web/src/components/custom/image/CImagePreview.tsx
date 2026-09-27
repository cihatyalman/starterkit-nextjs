"use client";

import { cn } from "@/lib/utils";
import { CImage, CImageProps } from "./CImage";
import { usePreviewStore } from "./ImagePreview";

export const CImagePreview = (props: CImageProps) => {
  const setPreview = usePreviewStore((s) => s.setData);

  return (
    <>
      <CImage
        {...props}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setPreview(props.url);
        }}
        className={cn("cursor-pointer", props.className)}
      />
    </>
  );
};
