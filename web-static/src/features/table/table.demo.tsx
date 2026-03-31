"use client";

import { cn } from "@/lib/utils";
import { Suspense, use } from "react";
import { apiProduct } from "./product.api";
import { CDataTable, CTableHeader } from "@/components/custom/CDataTable";
import { Product } from "./product.model";
import { CImage } from "@/components/custom/CImage";
import { Skeleton } from "@/components/ui/skeleton";
import { getRange } from "@/core/helpers/number";

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
  const columnKeys = [
    "id",
    "images",
    "category",
    "price",
    "title",
    "description",
  ];
  const columnTitles = [
    "Id",
    "Resim",
    "Kategori",
    "Fiyat",
    "Başlık",
    "Açıklama",
  ];

  return (
    <CDataTable<Product>
      data={dataList}
      columnOptions={{
        columnKeys: columnKeys,
        editColums: (columns) => {
          for (const i of getRange(columns.length)) {
            columns[i].header = ({ column }) => (
              <CTableHeader column={column} isSorted={[0, 3, 4].includes(i)}>
                {columnTitles[i]}
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
            case "images":
              result = (
                <div className="h-10 max-w-20 flex justify-center">
                  <CImage
                    url={value[0]}
                    object="object-contain"
                    rounded="rounded-sm"
                    className="h-full"
                  />
                </div>
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
