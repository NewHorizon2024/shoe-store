"use client";

import { GET_ALL_PRODUCT_IDS } from "@/app/api/routes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";

import useCartData from "@/lib/hooks/useCartData";

import ProductItem from "./_components/ProductItem";
import Summary from "./_components/Summary";

export default function CartPage() {
  const userId = Number(getCookie("userId"));
  const { data } = useCartData(userId);

  const productIds = data?.cart.map(({ product_id }) => product_id);

  const { data: productsId } = useQuery({
    queryKey: ["ALL_CART_PRODUCTS", productIds],
    queryFn: async () => {
      const response = await axios.post(`${GET_ALL_PRODUCT_IDS}`, productIds);
      return response.data;
    },
    enabled: !!productIds?.length,
  });

  const total = data?.cart.reduce((sum, cartItem) => {
    const product = productsId?.find(
      (p: { id: number }) => p.id === cartItem.product_id,
    );
    if (!product) return sum;

    const price = parseFloat(product.price);

    return sum + price * cartItem.quantity;
  }, 0) as number;

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row lg:divide-x lg:space-x-0 lg:min-w-[60%]">
        <div className="flex-1 flex flex-col gap-4 rounded p-4 lg:pr-8">
          <h3>Shopping basket</h3>
          {!data?.cart.length && (
            <p className="text-zinc-700 nunito-bold font-bold">
              There are no products in the cart.
            </p>
          )}
          <ul className="divide-y divide-gray-200">
            {data?.cart?.map(({ id, product_id, quantity }) => (
              <li key={id} className="py-3">
                <ProductItem
                  productId={product_id}
                  quantity={quantity}
                  isDisabled={false}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex flex-col space-y-4 p-4 lg:pl-8">
          <Summary total={total} />
        </div>
      </div>
    </div>
  );
}
