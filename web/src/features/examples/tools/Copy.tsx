"use client";

import { showToast } from "@/core/helperx/toast";

export const Copy = (props: {
  text: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const handleCopy = async () => {
    await navigator.clipboard?.writeText(props.text);
    showToast({ type: "info", message: "Metin kopyalandı" });
  };
  return (
    <span className="cursor-copy" onClick={handleCopy}>
      {props.children}
    </span>
  );
};
