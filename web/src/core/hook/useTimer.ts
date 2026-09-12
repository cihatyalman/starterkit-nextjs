"use client";

import { useRef, useState } from "react";

export function useTimerCount(
  interval: number = 1000,
  onTick?: (count: number) => void,
) {
  const [count, setCount] = useState(0);

  const timer = useTimer(interval, (tick) => {
    setCount(tick);
    onTick?.(tick);
  });

  const start = () => timer.start();
  const stop = () => timer.stop();
  const reset = () => timer.reset();

  return { count, start, stop, reset };
}

export function useTimer(
  interval: number = 1000,
  onTick?: (count: number) => void,
) {
  const timerId = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTime = useRef<number | null>(null);
  const elapsed = useRef<number>(0);

  const start = () => {
    if (timerId.current) return;

    startTime.current = Date.now() - elapsed.current;

    timerId.current = setInterval(() => {
      const now = Date.now();
      elapsed.current = now - (startTime.current ?? now);
      const tick = Math.floor(elapsed.current / interval);
      onTick?.(tick);
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
    onTick?.(0);
  };

  return { start, stop, reset };
}
