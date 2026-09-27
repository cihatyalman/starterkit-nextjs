import { cache, Suspense } from "react";
import { Metadata } from "next";
import { getMetadata } from "@/shared/utils/metadata";
import { DEFAULT_LOCALE, LocaleType } from "@/lib/language/i18n/types";
import NotFound from "@/app/not-found";
import { CLoading } from "@/components/custom/tools/CLoading";
import {
  getProduct,
  parseProduct,
  ProductDetails,
  ProductImage,
} from "@/features/product";

const getCachedProduct = cache(async (productId: string) => {
  const res = await getProduct({ productId });
  const data = res?.data ? parseProduct(res.data) : null;
  return data;
});

interface Props {
  params: Promise<{ locale: LocaleType; productId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, productId } = await params;
  let baseLink = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  if (locale !== DEFAULT_LOCALE) baseLink = baseLink + "/" + locale;

  const data = await getCachedProduct(productId);
  if (!data) {
    return getMetadata.sub({
      title: "Ürün Bulunamadı",
      ogtitle: "Ürün Bulunamadı",
      description: "Aradığınız sayfayı bulamadık.",
      link: `${baseLink}/products/${productId}`,
    });
  }

  return getMetadata.sub({
    title: data.title,
    ogtitle: data.title,
    description: data.description,
    link: `${baseLink}/products/${productId}`,
  });
}

export default async function ProductDetailsPage({ params }: Props) {
  const { productId } = await params;

  return (
    <div className="my-container mx-auto">
      <Suspense fallback={<CLoading className="flex-1 items-center" />}>
        <ProductDetailsComp productId={productId} />
      </Suspense>
    </div>
  );
}

const ProductDetailsComp = async ({ productId }: { productId: string }) => {
  // const res = await getProduct({ productId });
  // const data = res?.data ? parseProduct(res.data) : null;
  const data = await getCachedProduct(productId);

  if (!data) return <NotFound />;
  return (
    <div className="relative flex flex-col sm:flex-row">
      <ProductImage product={data} />
      <ProductDetails product={data} />
    </div>
  );
};
