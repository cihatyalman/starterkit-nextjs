import { Metadata } from "next";
import { getMetadata } from "@/shared/utils/metadata";
import { DEFAULT_LOCALE, LocaleType } from "@/lib/language/i18n/types";
import { Suspense } from "react";
import { CLoading } from "@/components/custom/tools/CLoading";
import { getProducts, parseProductList, ProductList } from "@/features/product";

interface Props {
  params: Promise<{ locale: LocaleType }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  let baseLink = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  if (locale !== DEFAULT_LOCALE) baseLink = baseLink + "/" + locale;

  return getMetadata.sub({
    title: "Ürünler",
    ogtitle: "Ürünler | Nextjs StarterKit",
    description: "Ürünler | Nextjs StarterKit",
    link: `${baseLink}/products`,
  });
}

export default async function ProductsPage() {
  return (
    <div className="my-container mx-auto">
      <Suspense fallback={<CLoading className="flex-1 items-center" />}>
        <ProductsComp />
      </Suspense>
    </div>
  );
}

const ProductsComp = async () => {
  const res = await getProducts();
  const dataList = res?.data ? parseProductList(res.data) : [];

  return <ProductList productList={dataList} />;
};
