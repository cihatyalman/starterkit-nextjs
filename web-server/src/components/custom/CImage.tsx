import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

import errorimage from "@/assets/images/error-image.png";
import placeholder from "@/assets/images/placeholder.png";

export interface CImageProps extends Omit<ImageProps, "src" | "alt"> {
  url: string | MyAny;
  alt?: string;
  object?: "object-cover" | "object-contain" | "object-fill";
  align?:
    | "object-center"
    | "object-left"
    | "object-right"
    | "object-top"
    | "object-bottom";
  rounded?:
    | "rounded-none"
    | "rounded-xs"
    | "rounded-sm"
    | "rounded-md"
    | "rounded-lg"
    | "rounded-xl"
    | "rounded-2xl"
    | "rounded-3xl"
    | "rounded-4xl"
    | "rounded-full";
  priority?: boolean;
}

export const CImage = ({
  alt = "",
  width = 1000,
  height = 1000,
  object = "object-cover",
  align = "object-center",
  rounded = "rounded-none",
  ...props
}: CImageProps) => {
  function checkUrl(url: string) {
    if (!url) return placeholder;
    if (url.startsWith("/")) return process.env.NEXT_PUBLIC_BASE_PATH + url;
    try {
      new URL(url);
      return url;
    } catch {
      return errorimage;
    }
  }
  function getBlurDataURL(url: string) {
    if (!url) return undefined;
    try {
      new URL(url);
      return placeholderBase64;
    } catch {
      return undefined;
    }
  }

  return (
    <Image
      {...props}
      src={checkUrl(props.url)}
      alt={alt}
      width={width}
      height={height}
      className={cn("w-auto h-auto", rounded, object, align, props.className)}
      priority={props.priority}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      placeholder={props.url?.startsWith("/") ? undefined : "blur"}
      blurDataURL={getBlurDataURL(props.url)}
    />
  );
};

const placeholderBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUAgMAAADw5/WeAAAADFBMVEXd3d3k5OTw8PD8/PxlbR54AAAAFklEQVQI12NgIBmEgsl9YHIVkghJAAB87AITxoNApQAAAABJRU5ErkJggg==";
