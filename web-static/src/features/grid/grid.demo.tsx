"use client";

import { useCallback, useEffect, useState } from "react";
import { delay } from "@/infrastructure/helpers";
import { CInfiniteGrid } from "@/components/custom/CInfiniteGrid";

export const DemoGrid = () => {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const generateList = useCallback(async (lastIndex?: number) => {
    lastIndex ??= 0;
    setLoading(true);
    await delay(1000);
    const newItems = Array.from(
      { length: 20 },
      (_, i) => `Item ${lastIndex + i}`,
    );
    setItems((prev) => [...prev, ...newItems]);
    setLoading(false);
  }, []);

  useEffect(() => {
    generateList();
  }, [generateList]);

  return (
    <div className="flex h-52 overflow-hidden">
      <CInfiniteGrid<string>
        isLoading={loading}
        dataList={items}
        onContinue={() => generateList(items.length)}
        colClass="grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4"
      >
        {({ item, index }) => (
          <ItemComp key={`grid-${index}`} item={item} index={index} />
        )}
      </CInfiniteGrid>
    </div>
  );
};

const ItemComp = (props: { item: string; index: number }) => {
  return (
    <li className="flex border border-gray-400 p-2">
      {`${props.index} => ${props.item}`}
    </li>
  );
};
