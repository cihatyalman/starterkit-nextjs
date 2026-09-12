"use client";

import { useEffect, useRef, useState } from "react";

type Format = Array<"hours" | "minutes" | "seconds">;

interface CCountdownProps {
  duration: number; // saniye cinsinden
  format?: Format;
  onChange?: (remaining: number) => void;
  onFinish?: () => void;
  className?: string;
}

export const CCountdown = ({
  duration,
  format = ["minutes", "seconds"],
  onChange,
  onFinish,
  className,
}: CCountdownProps) => {
  const [remaining, setRemaining] = useState(duration);

  const onChangeRef = useRef(onChange);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onChangeRef.current = onChange;
    onFinishRef.current = onFinish;
  }, [onChange, onFinish]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          onFinishRef.current?.();
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    onChangeRef.current?.(remaining);
  }, [remaining]);

  return <span className={className}>{formatTime(remaining, format)}</span>;
};

function formatTime(totalSeconds: number, format: Format): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts: string[] = [];

  if (format.includes("hours")) parts.push(String(hours).padStart(2, "0"));
  if (format.includes("minutes")) parts.push(String(minutes).padStart(2, "0"));
  if (format.includes("seconds")) parts.push(String(seconds).padStart(2, "0"));

  return parts.join(":");
}
