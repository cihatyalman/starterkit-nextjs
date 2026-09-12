import { useMemo } from "react";

interface CLoadingProps {
  size?: number; // px olarak
  color?: string;
  overlayColor?: string; // fullscreen
  isFullScreen?: boolean;
  isCentered?: boolean;
  className?: string;
}

export const CLoading = ({
  size = 40,
  color = "border-primary",
  overlayColor = "bg-black/10",
  isFullScreen = false,
  isCentered = false,
  className = "",
}: CLoadingProps) => {
  const spinner = useMemo(
    () => (
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${className}`}
        style={{ width: size, height: size }}
      />
    ),
    [color, className, size],
  );

  if (isFullScreen) {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center ${overlayColor} z-50`}
      >
        {spinner}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center w-full py-4 
        ${isCentered ? "h-full" : ""}
        `}
    >
      {spinner}
    </div>
  );
};
