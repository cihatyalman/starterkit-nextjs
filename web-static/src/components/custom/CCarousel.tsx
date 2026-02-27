"use client";

import { useEffect, useState } from "react";
import { useTimer } from "@/infrastructure/hook/useTimer";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export interface CCarouselProps<T = number> {
  items: T[] | number;
  arrowButtonActive?: boolean;
  isLoop?: boolean;
  basis?: string;
  orientation?: "horizontal" | "vertical";
  autoPlay?: boolean;
  className?: string;
  classNameContent?: string;
  children: (args: { item: T | number; index: number }) => React.ReactNode;
}

export const CCarousel = <T,>({
  arrowButtonActive = false,
  isLoop = false,
  autoPlay = false,
  orientation = "horizontal",
  ...props
}: CCarouselProps<T>) => {
  const itemList =
    typeof props.items === "number"
      ? Array.from({ length: props.items }, (_, i) => i)
      : props.items;

  if (itemList.length === 0) return null;

  const [api, setApi] = useState<CarouselApi>();
  const timer = useTimer(3000);

  useEffect(() => {
    if (autoPlay) timer.start();
    else timer.reset();
    return () => timer.reset();
  }, [autoPlay]);

  useEffect(() => {
    if (api) {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }
  }, [api, timer.count]);

  return (
    <Carousel
      orientation={orientation}
      setApi={setApi}
      opts={{ align: "start", loop: isLoop }}
      className={`min-w-0 ${props.className}`}
      onMouseEnter={() => timer.stop()}
      onMouseLeave={() => {
        if (autoPlay) timer.start();
      }}
    >
      <CarouselContent className={props.classNameContent}>
        {itemList.map((item, index) => (
          <CarouselItem key={index} className={props.basis}>
            {props.children({ item, index })}
          </CarouselItem>
        ))}
      </CarouselContent>
      {arrowButtonActive && <CarouselPrevious />}
      {arrowButtonActive && <CarouselNext />}
    </Carousel>
  );
};
