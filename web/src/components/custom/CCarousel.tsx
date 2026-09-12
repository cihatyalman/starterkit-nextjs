"use client";

import { useEffect, useState } from "react";
import { useTimer } from "@/core/hook/useTimer";
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
  arrowButton?: boolean;
  loop?: boolean;
  basis?: string;
  orientation?: "horizontal" | "vertical";
  autoPlay?: boolean;
  className?: string;
  classNameContent?: string;
  children: (args: { item: T | number; index: number }) => React.ReactNode;
}

export const CCarousel = <T,>({
  arrowButton = false,
  loop = false,
  autoPlay = false,
  orientation = "horizontal",
  ...props
}: CCarouselProps<T>) => {
  const itemList =
    typeof props.items === "number"
      ? Array.from({ length: props.items }, (_, i) => i)
      : props.items;

  const [api, setApi] = useState<CarouselApi>();
  const timer = useTimer(3000, () => {
    if (api) {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }
  });

  useEffect(() => {
    if (autoPlay) timer.start();
    else timer.reset();
    return () => timer.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay]);

  if (itemList.length === 0) return null;
  return (
    <Carousel
      orientation={orientation}
      setApi={setApi}
      opts={{ align: "start", loop: loop }}
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
      {arrowButton && <CarouselPrevious className="cursor-pointer" />}
      {arrowButton && <CarouselNext className="cursor-pointer" />}
    </Carousel>
  );
};
