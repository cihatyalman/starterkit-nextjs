import { cn } from "@/lib/utils";
import { Brand } from "./Brand";
import { GithubButton } from "./GithubButton";

export const Header = () => {
  return (
    <header
      className={cn("fixed z-40 pt-2 pb-px px-2", "flex justify-center w-full")}
    >
      {/* Header Line */}
      <div
        className="flex justify-between items-center my-container border
      w-full rounded-full pl-4 pr-1.5 h-12
      bg-background shadow-foreground/10 shadow-md
      short:shadow-black/10 short:dark:shadow-white/10"
      >
        <Brand />
        <GithubButton />
      </div>
    </header>
  );
};

