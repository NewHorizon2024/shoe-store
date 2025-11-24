"use client";

import { UPDATE_CART } from "@/app/api/routes";
import { CartPayLoad } from "@/models/models";
import { IconLoader2 } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import useCartData from "@/lib/hooks/useCartData";

type AddToCartProps = Readonly<{
  productId: number;
}>;
export default function AddToCart({ productId }: AddToCartProps) {
  const userId = getCookie("userId") as unknown as number;

  const { refetch } = useCartData(userId);
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["ADD_TO_CART"],
    mutationFn: async (payload: {
      action: "add" | "sub";
      payload: CartPayLoad;
    }) => {
      const response = axios.post(UPDATE_CART, payload);
      return (await response).data;
    },
  });

  async function handleAddtoCart() {
    try {
      await mutateAsync({
        action: "add",
        payload: { userId, productId, quantity: 1 },
      });
      toast.success("Your cart has been updated successfully!");
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Oops! We couldn’t update your cart. Please try again.");
    }
  }

  return (
    <Button
      disabled={isPending}
      type="submit"
      className="mt-4 cursor-pointer"
      onClick={handleAddtoCart}
    >
      Add to cart
      {isPending && <IconLoader2 className="mt-1 rotate-icon" />}
    </Button>
  );
}
