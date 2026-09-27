"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { ProductModel } from "../models/product.model";
import { useProductListStore } from "../store/product-list.store";
import { MoreButton } from "./MoreButton";
import { CImagePreview } from "@/components/custom/image/CImagePreview";
import { CLink } from "@/components/custom/button/CLink";
import { useShallow } from "zustand/react/shallow";

export const ProductList = (props: {
  productList: ProductModel[];
  className?: string;
}) => {
  const { dataList, setProducts } = useProductListStore(
    useShallow((s) => ({ dataList: s.dataList, setProducts: s.set })),
  );

  useEffect(() => {
    setProducts(props.productList);
  }, [props.productList, setProducts]);

  return (
    <div className="flex flex-col p-3">
      <ul className="space-y-3 list-none! pl-0! w-full">
        {dataList.map((product) => (
          <CLink
            key={product.id}
            href={`/products/${product.id}`}
            className="w-full"
          >
            <ProductItem product={product} />
          </CLink>
        ))}
        <div className="text-center">
          <MoreButton />
        </div>
      </ul>
    </div>
  );
};

export const ProductItem = (props: {
  product: ProductModel;
  className?: string;
}) => {
  return (
    <li
      className={cn(
        "flex gap-4 border p-4 rounded-xl",
        "hover:scale-101 hover:border-primary transition-all",
      )}
    >
      <CImagePreview
        key={props.product.imageUrl}
        url={props.product.imageUrl}
        width={100}
        height={100}
        rounded="rounded-xl"
        className="h-36 w-auto aspect-square border"
      />
      <div className="flex flex-col flex-1">
        <p className="font-semibold text-base sm:text-lg">
          {props.product.title}
        </p>
        <p className="text-muted-foreground text-sm sm:text-base flex-1 line-clamp-3 min-w-0">
          {props.product.description}
        </p>
        <p className="font-semibold text-primary text-end text-base sm:text-lg">
          {`${props.product.price.toString()}₺`}
        </p>
      </div>
    </li>
  );
};
