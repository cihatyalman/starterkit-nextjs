"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { CLoading } from "./CLoading";
import { CLottie } from "../DynamicLoader";

interface CInfiniteGridProps<T> {
  dataList: T[];
  isLoading?: boolean;
  emptyComp?: React.ReactNode | null;
  colClass?: string;
  className?: string;
  children?: (args: { item: T; index: number }) => React.ReactNode | null;
  onContinue?: () => void;
}

/**
 * @param children li ve key kullanın.
 */
export const CInfiniteGrid = <T,>({
  colClass = "grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3",
  isLoading,
  onContinue,
  ...props
}: CInfiniteGridProps<T>) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Listenin sonu görünmez bir tetikleyici koyacağız.
  const observerRef = useRef<HTMLLIElement | null>(null);
  // onContinue birden fazla tetiklenmesini engellemek için
  const isFetching = useRef(false);

  // Tetikleyici çalıştığında çalışır.
  // entry.isIntersecting -> Tetileyici obje ekranda göründüğünde true olur
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isFetching.current && !isLoading) {
        isFetching.current = true;
        const result = onContinue?.();
        Promise.resolve(result).finally(() => {
          isFetching.current = false;
        });
      }
    },
    [onContinue, isLoading],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: containerRef.current,
      rootMargin: "100px", // Kullanıcı sona tamamen gelmeden 100px önce tetikler
      threshold: 0, // Bir piksel bile görünse yeterli
    });

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [handleObserver]);

  if (props.dataList.length === 0) {
    if (isLoading) return <CLoading center />;
    if (props.emptyComp) return <>{props.emptyComp}</>;
    <div className="flex justify-center items-center w-full h-full">
      <CLottie animKey="emptyAnim" />
    </div>;
  }

  return (
    <div ref={containerRef} className="flex flex-col w-full overflow-y-auto">
      <ul
        className={cn(
          "list-none! pl-0!",
          "grid gap-2",
          colClass,
          props.className,
        )}
      >
        {props.dataList.map((item, index) => props.children?.({ item, index }))}
      </ul>
      <li
        ref={observerRef}
        aria-hidden="true"
        className="h-14 w-full flex justify-center items-center shrink-0"
      >
        {isLoading ? <CLoading /> : ""}
      </li>
    </div>
  );
};
