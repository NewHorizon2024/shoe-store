"use client";

import { getCookie } from "cookies-next";

import useCartData from "@/lib/hooks/useCartData";

import ProductItem from "./_components/ProductItem";

export default function CartPage() {
  const userId = Number(getCookie("userId"));
  const { data } = useCartData(userId);

  console.log(data);

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-5xl flex md:flex-row md:space-x-8">
        <div className="flex-1 flex flex-col gap-4 rounded p-4 min-w-[60%]">
          <h3>Shopping basket</h3>
          <ul>
            {data?.cart.map(({ id, product_id }) => (
              <li key={id}>
                <ProductItem productId={product_id} quantity={10} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex flex-col space-y-4 p-4"></div>
      </div>
    </div>
  );
}
