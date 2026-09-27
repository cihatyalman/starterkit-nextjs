import { getRandomImageUrl } from "@/core/helpers";

const productsDb = Array.from({ length: 28 }).map((_, idx) => {
  const id = (idx + 1).toString();
  return {
    id: id,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: `Ürün ${id}`,
    description: `Ürün açıklaması ${id}`,
    imageUrl: getRandomImageUrl(),
    price: (idx + 1) * 10,
  };
});

export const getProductsFromApi = async (props: {
  limit: number;
  after?: string;
}) => {
  const lastIndex = props.after ? parseInt(props.after) : 0;
  const data = productsDb.slice(lastIndex, lastIndex + props.limit);

  const response = { data: data };
  return response;
};

export const getProductFromApi = async (props: { productId: string }) => {
  const data = productsDb.find((product) => product.id === props.productId);

  if (!data) return { data: null };

  const response = { data: data };
  return response;
};
