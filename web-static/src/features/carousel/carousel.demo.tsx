"use client";

import { CCarousel } from "@/components/custom/CCarousel";

export const DemoCarousel = (props: { className?: string }) => {
  const tempList = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="flex pl-12 pr-12 justify-center">
      <CCarousel
        // items={5}
        items={tempList}
        basis="md:basis-1/2 lg:basis-1/3"
        arrowButtonActive
        isLoop
        autoPlay
      >
        {({ item }) => <ItemComp item={item} />}
      </CCarousel>
    </div>
  );
};

const ItemComp = ({ item }: { item: number }) => {
  return (
    <div className="p-1 border-2 rounded-2xl text-center">
      {item + 1} <br /> Lorem ipsum dolor sit amet consectetur, adipisicing
      elit. Vero laboriosam corporis ipsum ipsa esse a nobis laborum vitae!
      Asperiores iste error sapiente voluptatum amet ullam dignissimos ea nemo
      ipsum! Ipsa. lorem
    </div>
  );
};
