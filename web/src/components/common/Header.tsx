import { Brand } from "./Brand";
import { GithubButton } from "./GithubButton";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 shadow-sm bg-background/85 backdrop-blur dark:shadow-foreground/10">
      <div className="my-container flex items-center justify-between px-3 py-3 mx-auto">
        <Brand />
        <GithubButton />
      </div>
    </header>
  );
};
