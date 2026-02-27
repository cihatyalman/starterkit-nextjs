"use client";

import { CImage } from "@/components/custom/CImage";
import {
  CImageListPreview,
  CImageListPreviewRef,
} from "@/components/custom/CImageListPreview";
import { useRef } from "react";

export const DemoImage = () => {
  const previewRef = useRef<CImageListPreviewRef>(null);

  const images = [
    "https://images.pexels.com/photos/418831/pexels-photo-418831.jpeg",
    "https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg",
    "https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg",
    "https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg",
    "https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg",
    "https://images.pexels.com/photos/131723/pexels-photo-131723.jpeg",
    "https://images.pexels.com/photos/757292/pexels-photo-757292.jpeg",
    "https://images.pexels.com/photos/247600/pexels-photo-247600.jpeg",
  ];

  return (
    <div className="flex flex-wrap gap-2 *:text-center">
      <div>
        <div onClick={() => previewRef.current?.show()}>
          <CImage
            url={images[0]}
            rounded="rounded-2xl"
            className="border-2 border-black w-52 h-52 cursor-pointer"
          />
        </div>
        <CImageListPreview ref={previewRef} images={images} isAnimated />
        <p>Image List Preview (Click)</p>
      </div>
    </div>
  );
};
