import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  // Server Mode (Runtime)
  // const res = await fetch("https://api.example.com/products", {
  //   next: {
  //     revalidate: 60 * 60, // 1 saat
  //   },
  // });

  // Export Mode (Buildtime)
  // const res = await fetch("https://api.example.com/products", {
  //   cache: "force-cache",
  // });

  // const products: {
  //   slug: string;
  //   updatedAt: string;
  // }[] = await res.json();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    // {
    //   url: `${baseUrl}/products`,
    //   lastModified: new Date(),
    // },
    // ...products.map((product) => ({
    //   url: `${baseUrl}/products/${product.slug}/`,
    //   lastModified: new Date(product.updatedAt),
    // })),
    // {
    //   url: `${baseUrl}/categories`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `${baseUrl}/blog`,
    //   lastModified: new Date(),
    // },
  ];
}
