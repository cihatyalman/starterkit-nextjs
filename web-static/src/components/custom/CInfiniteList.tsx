"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { CLoading } from "./CLoading";
import { CLottie } from "@/components/DynamicLoader";

interface CInfiniteListProps<T> {
  dataList: T[];
  isLoading?: boolean;
  emptyComp?: React.ReactNode | null;
  reverse?: boolean;
  className?: string;
  onContinue?: () => void;
  children?: (args: { item: T; index: number }) => React.ReactNode | null;
}

/**
 * @param children li ve key kullanın.
 */
export const CInfiniteList = <T,>({
  onContinue,
  ...props
}: CInfiniteListProps<T>) => {
  const listRef = useRef<HTMLUListElement | null>(null);
  // Listenin sonu görünmez bir tetikleyici koyacağız.
  const observerRef = useRef<HTMLLIElement | null>(null);
  // onContinue birden fazla tetiklenmesini engellemek için
  const isFetching = useRef(false);

  // Tetikleyici çalıştığında çalışır.
  // entry.isIntersecting -> Tetileyici obje ekranda göründüğünde true olur
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && !isFetching.current && !props.isLoading) {
        isFetching.current = true;
        const result = onContinue?.();
        Promise.resolve(result).finally(() => {
          isFetching.current = false;
        });
      }
    },
    [onContinue, props.isLoading]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: listRef.current,
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
    if (props.isLoading) return <CLoading center />;
    if (props.emptyComp) return <>{props.emptyComp}</>;
    return (
      <div className="flex justify-center items-center">
        <CLottie animKey="emptyAnim" />
      </div>
    );
  }

  return (
    <ul
      ref={listRef}
      className={cn(
        "list-none! pl-0!",
        "w-full h-full flex overflow-y-auto gap-2",
        props.reverse ? "flex-col-reverse" : "flex-col",
        props.className
      )}
    >
      {props.dataList.map((item, index) => props.children?.({ item, index }))}
      <li
        ref={observerRef}
        aria-hidden="true"
        className="h-14 w-full flex justify-center items-center shrink-0"
      >
        {props.isLoading ? <CLoading /> : ""}
      </li>
    </ul>
  );
};
