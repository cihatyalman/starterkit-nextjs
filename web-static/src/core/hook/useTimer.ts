"use client";

import { useRef, useState } from "react";

export function useTimer(interval: number = 1000) {
  const [count, setCount] = useState(0);

  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTime = useRef<number | null>(null);
  const elapsed = useRef<number>(0);

  const start = () => {
    if (timerId.current) return;

    startTime.current = Date.now() - elapsed.current;

    timerId.current = setInterval(() => {
      const now = Date.now();
      elapsed.current = now - (startTime.current ?? now);
      setCount(Math.floor(elapsed.current / interval));
    }, interval);
  };

  const stop = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  };

  const reset = () => {
    stop();
    elapsed.current = 0;
    startTime.current = null;
    setCount(0);
  };

  return { count, start, stop, reset };
}
