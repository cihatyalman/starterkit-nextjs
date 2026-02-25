"use client";

import { useCallback, useEffect, useState } from "react";
import { delay } from "@/core/helpers";
import { CInfiniteList } from "@/components/custom/CInfiniteList";

export const DemoList = () => {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const generateList = useCallback(async (lastIndex?: number) => {
    lastIndex ??= 0;
    setLoading(true);
    await delay(1000);
    const newItems = Array.from(
      { length: 10 },
      (_, i) => `Item ${lastIndex + i}`,
    );
    setItems((prev) => [...prev, ...newItems]);
    setLoading(false);
  }, []);

  useEffect(() => {
    generateList();
  }, [generateList]);

  return (
    <div className="h-52 overflow-hidden">
      <CInfiniteList<string>
        isLoading={loading}
        dataList={items}
        onContinue={() => generateList(items.length)}
      >
        {({ item, index }) => (
          <ItemComp key={`list-${index}`} item={item} index={index} />
        )}
      </CInfiniteList>
    </div>
  );
};

const ItemComp = (props: { item: string; index: number }) => {
  return (
    <li className="border border-gray-400 p-2">{`${props.index} => ${props.item}`}</li>
  );
};
