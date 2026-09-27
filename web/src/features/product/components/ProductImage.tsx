import { CImagePreview } from "@/components/custom/image/CImagePreview";
import { ProductModel } from "../models/product.model";

export const ProductImage = (props: { product: ProductModel }) => {
  return (
    <div className="sm:sticky top-16 p-4 h-fit flex flex-col gap-4 bg-white">
      <CImagePreview
        url={props.product.imageUrl}
        width={200}
        height={300}
        rounded="rounded-2xl"
        className="w-full aspect-square sm:w-80 h-auto sm:min-h-100 border"
      />
      <p className="font-semibold text-center text-2xl sm:text-4xl border rounded-xl p-3">
        Fiyat:{" "}
        <span className="text-primary">{`${props.product.price.toString()}₺`}</span>
      </p>
    </div>
  );
};
