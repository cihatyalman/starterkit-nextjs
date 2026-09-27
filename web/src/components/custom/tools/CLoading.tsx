import { useMemo } from "react";

interface CLoadingProps {
  size?: number; // px olarak
  color?: string;
  overlayColor?: string; // fullscreen
  isFullScreen?: boolean;
  className?: string;
}

export const CLoading = ({
  size = 40,
  color = "border-primary",
  overlayColor = "bg-black/10",
  isFullScreen = false,
  className = "",
}: CLoadingProps) => {
  const spinner = useMemo(
    () => (
      <div
        className={`animate-spin rounded-full border-4 border-t-transparent ${color}`}
        style={{ width: size, height: size }}
      />
    ),
    [color, size],
  );

  if (isFullScreen) {
    return (
      <div
        className={`fixed inset-0 flex justify-center items-center ${overlayColor} z-50`}
      >
        {spinner}
      </div>
    );
  }

  return (
    <div className={`flex justify-center w-full py-4 ${className}`}>
      {spinner}
    </div>
  );
};
