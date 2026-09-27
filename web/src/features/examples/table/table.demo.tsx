import { Suspense } from "react";
import { DataTable } from "./data-table/DataTable";
import { apiProduct } from "./product.api";
import { ProductModel } from "./product.model";
import { Skeleton } from "@/components/ui/skeleton";

export const DemoTable = () => {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <DataComp />
    </Suspense>
  );
};

export const DataComp = async () => {
  const dataList = await apiProduct.getList();

  return <DataTable<ProductModel> data={dataList} />;
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
