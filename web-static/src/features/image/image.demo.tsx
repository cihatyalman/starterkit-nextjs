"use client";

import { useRef } from "react";
import { CButton } from "@/components/custom/CButton";
import { CImage } from "@/components/custom/CImage";
import {
  CImageListPreview,
  CImageListPreviewRef,
} from "@/components/custom/CImageListPreview";
import { CImagePreview } from "@/components/custom/CImagePreview";
import { CStateComponent } from "@/components/custom/CStateComponent";
import { CCropImage } from "@/components/DynamicLoader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ServerLinkPopover } from "@/components/common/ServerLinkPopover";
import { MdEdit } from "react-icons/md";

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
    <div className="flex flex-wrap gap-2 *:text-center text-sm">
      <div>
        <CImage
          url={images[0]}
          rounded="rounded-2xl"
          align="object-left"
          className="border-2 border-black w-52 h-52"
        />
        <p>Cover - Left</p>
      </div>
      <div>
        <CImage
          url={images[0]}
          rounded="rounded-2xl"
          align="object-right"
          className="border-2 border-black w-52 h-52"
        />
        <p>Cover - Right</p>
      </div>
      <div>
        <CImage
          url={images[0]}
          rounded="rounded-2xl"
          object="object-contain"
          align="object-top"
          className="border-2 border-black w-52 h-52"
        />
        <p>Contain - Top</p>
      </div>
      <div>
        <CImage
          url={images[0]}
          rounded="rounded-2xl"
          object="object-contain"
          align="object-bottom"
          className="border-2 border-black w-52 h-52"
        />
        <p>Contain - Bottom</p>
      </div>
      <div>
        <div className="overflow-hidden border-2 border-black w-52 h-52 rounded-2xl">
          <CImage
            url={images[0]}
            rounded="rounded-2xl"
            align="object-right"
            quality={100}
            className="w-52 h-52 scale-400"
          />
        </div>
        <p>Zoom</p>
      </div>
      <div>
        <CImage
          url="error-image"
          rounded="rounded-2xl"
          object="object-contain"
          align="object-bottom"
          className="border-2 border-black w-52 h-52"
        />
        <p>Error Image</p>
      </div>
      <div>
        <CropImage />
        <p>Crop Image</p>
      </div>
      <div className="w-52 h-52">
        <ResizableImage images={images} />
        <p>Two Image</p>
      </div>
      <div>
        <CImagePreview
          url={images[0]}
          rounded="rounded-2xl"
          className="border-2 border-black w-52 h-52"
        />
        <p>Image Preview (Click)</p>
      </div>
      <div>
        <div onClick={() => previewRef.current?.show()}>
          <CImage
            url={images[0]}
            rounded="rounded-2xl"
            className="border-2 border-black w-52 h-52 cursor-pointer "
          />
        </div>
        <CImageListPreview ref={previewRef} images={images} />
        <div className="flex gap-1 justify-center items-center">
          <p>Image List Preview (Click)</p>
          <ServerLinkPopover path="#image" />
        </div>
      </div>
    </div>
  );
};

const CropImage = () => {
  return (
    <CStateComponent<string | null> initialValue={null}>
      {({ state }) => {
        return (
          <div className="mx-auto relative">
            <CImage
              alt="Profil Resmi"
              url={state.value}
              rounded="rounded-full"
              className="border-2 border-black w-52 h-52"
            />
            <CCropImage
              callback={(preview, file) => {
                state.set(preview);
                console.log("[C_filename]: ", file?.name);
              }}
            >
              <CButton
                className="absolute bottom-0 right-0 rounded-full h-12 w-12 flex justify-center items-center"
                asChild
              >
                <label>
                  <MdEdit className="size-5 text-white" />
                  <input type="file" accept="image/*" hidden />
                </label>
              </CButton>
            </CCropImage>
          </div>
        );
      }}
    </CStateComponent>
  );
};

const ResizableImage = ({ images }: { images: string[] }) => {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="relative border-2 border-black rounded-2xl"
    >
      <ResizablePanel defaultSize={40}>
        <CImage url={images[0]} align="object-left" className="w-full h-full" />
      </ResizablePanel>
      <ResizableHandle
        withHandle
        className="*:bg-gray-200 dark:*:text-black dark:after:bg-gray-200 after:w-px"
      />
      <ResizablePanel defaultSize={60}>
        <CImage
          url={images[1]}
          align="object-right"
          className="w-full h-full"
          // align="object-left"
          // className="w-full h-full absolute right-0 -z-1"
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};
