"use client";

import { CButton } from "@/components/custom/button/CButton";
import { useProductListStore } from "../store/product-list.store";
import { useShallow } from "zustand/react/shallow";

export const MoreButton = () => {
  const { moreFetch, isFinished } = useProductListStore(
    useShallow((s) => ({ moreFetch: s.moreFetch, isFinished: s.isFinished })),
  );

  if (isFinished) return null;

  return (
    <CButton onClick={() => moreFetch()} className="min-w-40">
      Daha Fazla
    </CButton>
  );
};
