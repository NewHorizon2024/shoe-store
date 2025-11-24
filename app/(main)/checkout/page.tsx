"use client";

import { useState } from "react";

import { DELETE_USER_CART, GET_ALL_PRODUCT_IDS } from "@/app/api/routes";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import useCartData from "@/lib/hooks/useCartData";

import ProductItem from "../cart/_components/ProductItem";

export default function CheckoutPage() {
  const userId = Number(getCookie("userId"));
  const { data, refetch } = useCartData(userId);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const { mutateAsync } = useMutation({
    mutationKey: ["DELETE_USER_CART", userId],
    mutationFn: async () => {
      const response = await axios.post(DELETE_USER_CART, { userId });
      return response.data;
    },
  });

  const handlePlaceOrder = async () => {
    setLoading(true);
    mutateAsync().then(async () => await refetch());
    setTimeout(() => {
      setLoading(false);
      router.push("/order-confirmation");
    }, 1500);
  };

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row lg:divide-x lg:space-x-0 lg:min-w-[60%]">
        <div className="flex-1 flex flex-col gap-4 rounded p-4 lg:pr-8">
          <h3 className="text-xl font-bold">Review your items</h3>
          {!data?.cart.length && (
            <p className="text-zinc-700 nunito-bold font-bold">
              Your cart is empty.
            </p>
          )}
          <ul className="divide-y divide-gray-200">
            {data?.cart?.map(({ id, product_id, quantity }) => (
              <li key={id} className="py-3">
                <ProductItem
                  productId={product_id}
                  quantity={quantity}
                  isDisabled={true}
                />
              </li>
            ))}
          </ul>
          <div className="flex rounded-2xl border-2 border-zinc-400 p-4 items-center gap-4">
            <p className="font-bold">Total to pay</p>
            <span className="text-xl font-bold text-green-600">
              ${total?.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-6 p-4 lg:pl-8">
          <div className="space-y-2">
            <h4 className="font-semibold">Shipping Information</h4>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded p-2"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full border rounded p-2"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border rounded p-2"
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="w-full border rounded p-2"
            />
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Payment Details</h4>
            <input
              type="text"
              placeholder="Card Number"
              className="w-full border rounded p-2"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="MM/YY"
                className="flex-1 border rounded p-2"
              />
              <input
                type="text"
                placeholder="CVC"
                className="flex-1 border rounded p-2"
              />
            </div>
          </div>

          <Button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}
