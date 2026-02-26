"use client";

import { cn } from "@/lib/utils";
import { CButton } from "../custom/CButton";
import { FaGithub } from "react-icons/fa";

export const GithubButton = (props: { className?: string }) => {
  return (
    <CButton
      color="bg-[#24292e]"
      className={cn("rounded-full text-white", props.className)}
      onClick={() => {
        window.open(
          process.env.NEXT_PUBLIC_GITHUB_URL,
          "_blank",
          "noopener,noreferrer",
        );
      }}
    >
      <FaGithub />
      Github
    </CButton>
  );
};
