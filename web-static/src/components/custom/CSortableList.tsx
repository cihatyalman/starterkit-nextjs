"use client";
// npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export type SortableListItemType<T> = { id: string; data: T };

export interface CSortableListProps<T> {
  items: SortableListItemType<T>[];
  onChange?: (newOrder: SortableListItemType<T>[]) => void;
  className?: string;
  classNameItem?: string;
  children: (args: { item: SortableListItemType<T> }) => React.ReactNode;
}

export const CSortableList = <T,>({
  items: initialItems,
  onChange,
  className = "space-y-2 w-full",
  classNameItem,
  children,
}: CSortableListProps<T>) => {
  const [items, setItems] = useState(initialItems);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: MyAny) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: MyAny) {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((i) => i.id === active.id);
    const newIndex = items.findIndex((i) => i.id === over.id);

    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
    onChange?.(newItems);
  }

  const activeItem = items.find((item) => item.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <div className={cn(className)}>
          {items.map((item) => (
            <CSortableItem key={item.id} id={item.id} className={classNameItem}>
              {children({ item })}
            </CSortableItem>
          ))}
        </div>
      </SortableContext>
      <DragOverlay>
        {activeItem ? (
          <CSortableItem id={activeItem.id} className={classNameItem}>
            {children({ item: activeItem })}
          </CSortableItem>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

/* #region Item Component */

export interface CSortableItemProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

const CSortableItem = ({ id, className, children }: CSortableItemProps) => {
  const { listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 pl-2 transition bg-card text-card-foreground",
        "shadow-sm border rounded-md",
        isDragging && "opacity-50",
        className
      )}
    >
      <button
        {...listeners}
        aria-label="Sortable Item Button"
        className="cursor-grab active:cursor-grabbing p-1 rounded-sm hover:bg-gray-200 touch-none"
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>
      {children}
    </div>
  );
};

/* #endregion */
