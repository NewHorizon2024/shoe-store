"use client";

import { getCookie } from "cookies-next";

import useCartData from "@/lib/hooks/useCartData";

import ProductItem from "./_components/ProductItem";

export default function CartPage() {
  const userId = Number(getCookie("userId"));
  const { data } = useCartData(userId);

  console.log("data", data);

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-5xl flex md:flex-row md:space-x-8">
        <div className="flex-1 flex flex-col gap-4 rounded p-4 min-w-[60%]">
          <h3>Shopping basket</h3>
          {!data?.cart.length && <p className="text-zinc-700 nunito-bold font-bold">There are no products in the cart.</p>}
          <ul className="divide-y divide-gray-200">
            {data?.cart?.map(({ id, product_id, quantity }) => (
              <li key={id} className="py-3">
                <ProductItem productId={product_id} quantity={quantity} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 flex flex-col space-y-4 p-4"></div>
      </div>
    </div>
  );
}
