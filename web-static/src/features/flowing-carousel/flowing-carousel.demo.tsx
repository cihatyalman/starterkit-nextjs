"use client";

import { FlowingCarousel } from "@/shared/ui/FlowingCarousel";

export const DemoFlowingCarousel = (props: { className?: string }) => {
  const tempList = Array.from({ length: 3 }, (_, i) => i);

  return (
    <div className="flex">
      <FlowingCarousel<number> items={tempList} space="pl-4" speed={20}>
        {({ item }) => <ItemComp item={item} />}
      </FlowingCarousel>
    </div>
  );
};

const ItemComp = ({ item }: { item: number }) => {
  return (
    <div className="p-1 border-2 rounded-2xl text-center w-100">
      {item + 1} <br /> Lorem ipsum dolor sit amet consectetur, adipisicing
      elit. Vero laboriosam corporis ipsum ipsa esse a nobis laborum vitae!
      Asperiores iste error sapiente voluptatum amet ullam dignissimos ea nemo
      ipsum! Ipsa. lorem
    </div>
  );
};
