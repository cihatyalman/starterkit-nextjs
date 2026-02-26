"use client";

import { cn } from "@/lib/utils";
import { Suspense, use } from "react";
import { apiProduct } from "./product.api";
import { CDataTable, CTableHeader } from "@/components/custom/CDataTable";
import { Product } from "./product.model";
import { CImage } from "@/components/custom/CImage";
import { Skeleton } from "@/components/ui/skeleton";

export const DemoTable = () => {
  return (
    <div>
      <Suspense fallback={<TableSkeleton />}>
        <DataComp />
      </Suspense>
    </div>
  );
};

const productsPromise = apiProduct.getList();
const DataComp = () => {
  const dataList = use(productsPromise);
  return (
    <CDataTable<Product>
      data={dataList}
      columnOptions={{
        columnKeys: [
          "id",
          "image",
          "category",
          "price",
          "title",
          "description",
        ],
        editColums: (c) => {
          for (const i of [0, 3, 4]) {
            c[i].header = ({ column }) => (
              <CTableHeader column={column} isSorted>
                {(c[i] as MyAny)["accessorKey"]}
              </CTableHeader>
            );
          }
        },
        editCell: ({ columnKey, value }) => {
          let className = "";
          let result = value;
          switch (columnKey) {
            case "title":
              result = truncateText(value, 50);
              break;
            case "description":
              result = truncateText(value, 100);
              break;
            case "image":
              result = (
                <CImage
                  url={value}
                  object="object-contain"
                  className="h-6 w-full max-w-10 p-0"
                />
              );
              break;
          }
          return (
            <span className={cn("text-xs sm:text-sm", className)}>
              {result}
            </span>
          );
        },
      }}
      filterOptions={{
        columnKey: "title",
        placeholder: "Ürün ara..",
      }}
      menuOptions={{
        buttonTitle: "Sütunlar",
      }}
      paginationOptions={{
        initialPageSize: 8,
        manuelPagination: false,
      }}
    />
  );
};

const truncateText = (text: string, limit = 30) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + "...";
};

const TableSkeleton = () => {
  return (
    <div className="border rounded-lg">
      <Skeleton className="w-full h-8 rounded-none rounded-t-lg bg-accent" />
      <hr />
      <Skeleton className="w-full h-8 rounded-none rounded-b-lg" />
    </div>
  );
};
