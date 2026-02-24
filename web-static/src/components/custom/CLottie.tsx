// npm i lottie-react

import Lottie from "lottie-react";
import emptyAnim from "@/assets/animations/empty-anim.json";
import errorAnim from "@/assets/animations/error-anim.json";

type AnimKey = "emptyAnim" | "errorAnim";

interface CLottieProps {
  animKey: AnimKey;
  className?: string;
}

export const CLottie = ({ animKey, className }: CLottieProps) => {
  const animList = {
    emptyAnim: emptyAnim,
    errorAnim: errorAnim,
  };

  return (
    <div className="w-fit">
      <Lottie
        animationData={animList[animKey]}
        loop={true}
        className={`max-w-80 ${className}`}
      />
    </div>
  );
};
