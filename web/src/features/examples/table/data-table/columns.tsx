import { createColumnHelper } from "@tanstack/react-table";
import { DataTableFeatures } from "./data-table-features";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ProductModel } from "../product.model";
import { CImage } from "@/components/custom/image/CImage";
import { truncateText } from "@/core/helpers/text";

export interface TableColumnMeta {
  label?: string;
}

const columnHelper = createColumnHelper<DataTableFeatures, ProductModel>();

export const customColumns = columnHelper.columns([
  columnHelper.accessor("images", {
    meta: { label: "Resimler" },
    header: "Resimler",
    cell: (props) => {
      const value = props.getValue();
      return (
        <div className="h-10 max-w-20 flex justify-center">
          <CImage
            url={value?.[0]}
            object="object-contain"
            rounded="rounded-sm"
            className="h-full"
          />
        </div>
      );
    },
  }),
  columnHelper.accessor("price", {
    meta: { label: "Fiyat" },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fiyat
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  }),
  columnHelper.accessor("category", {
    meta: { label: "Kategori" },
    header: "Kategori",
  }),
  columnHelper.accessor("title", {
    meta: { label: "Başlık" },
    header: "Başlık",
  }),
  columnHelper.accessor("description", {
    meta: { label: "Açıklama" },
    header: "Açıklama",
    cell: (props) => {
      return truncateText(props.getValue());
    },
  }),
  columnHelper.display({
    meta: { label: "Menü" },
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" className="h-8 w-8 p-0" />}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard?.writeText(data.id.toString())}
            >
              Id Kopyala
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Seçenek 1</DropdownMenuItem>
            <DropdownMenuItem>Seçenek 2</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
]);
