"use client";

import { CButton } from "@/components/custom/CButton";
import { CLink } from "@/components/custom/CLink";
import { CTextButton } from "@/components/custom/CTextButton";
import { delay } from "@/core/helpers";
import { Info } from "lucide-react";

export const ButtonsDemo = () => {
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <CButton name="default" onClick={handleClickAsync} autoFocus>
          Default
        </CButton>
        <CButton variant="outline" name="outline" onClick={handleClickAsync}>
          Outline
        </CButton>
        <CButton variant="ghost" name="ghost" onClick={handleClickAsync}>
          Ghost
        </CButton>
        <CButton variant="link" name="link" onClick={handleClickAsync}>
          Link
        </CButton>
        <CButton name="disabled" onClick={handleClickAsync} disabled>
          Disabled
        </CButton>
        <CButton className="w-10" name="icon" onClick={handleClickAsync}>
          <Info className="size-5" />
        </CButton>
        <CButton
          className="text-white rounded-md flex justify-center items-center"
          onClick={handleClickAsync} // asChild aktif olduğunda pasif hale gelir.
          asChild
        >
          <CLink
            href="https://www.google.com"
            target="_blank"
            isUnderline={false}
            className="text-white hover:text-white text-sm h-9"
          >
            asChild
          </CLink>
        </CButton>
      </div>
      <div className="h-4" />
      <p className="text-sm">
        Bu bir{" "}
        <CTextButton name="Text Button" onClick={handleClick}>
          Text Button
        </CTextButton>{" "}
        örneğidir.
      </p>
    </div>
  );
};

async function handleClickAsync(e: MyOnClick) {
  const target = e.target as HTMLButtonElement;
  await delay(1000);
  console.log(`[C_name]: `, target.name);
}

function handleClick(e: MyOnClick) {
  const target = e.target as HTMLButtonElement;
  console.log(`[C_name]: `, target.name);
}
