"use client";

import {
  CSortableList,
  SortableListItemType,
} from "@/components/custom/CSortableList";

export const DemoSortableList = () => {
  const mockData = Array.from({ length: 5 }, (_, i) => ({
    id: i.toString(),
    data: `Item ${i}`,
  }));

  function handleChange(newOrder: SortableListItemType<string>[]) {
    console.log("[C_newOrder]: ", newOrder);
  }

  return (
    <div className="flex h-fit overflow-hidden">
      <CSortableList
        items={mockData}
        onChange={handleChange}
        classNameItem="overflow-hidden"
      >
        {({ item }) => (
          <div className="h-12 flex items-center w-full pl-2">{item.data}</div>
        )}
      </CSortableList>
    </div>
  );
};
