"use client";
import { useState } from "react";

import { DELETE_PRODUCT, UPDATE_CART } from "@/app/api/routes";
import { CartPayLoad } from "@/models/models";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { IconLoader2 } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import clsx from "clsx";
import { getCookie } from "cookies-next";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";

import useCartData from "@/lib/hooks/useCartData";

type QuantityProps = Readonly<{
  quantity: number;
  cartQuantity: number;
  productId: number;
}>;
export default function Quantity({
  quantity,
  cartQuantity,
  productId,
}: QuantityProps) {
  const [currentQuantity, setCurrentQuantity] = useState<number>(cartQuantity);
  const userId = Number(getCookie("userId"));
  const { refetch } = useCartData(userId);
  const { mutate } = useMutation({
    mutationKey: ["UPDATE_CART"],
    mutationFn: async (payload: {
      action: "add" | "sub";
      payload: CartPayLoad;
    }) => {
      const response = await axios.post(`${UPDATE_CART}`, payload);
      return response.data;
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update cart, try again later!");
    },
    onSuccess: () => refetch(),
  });

  const { mutate: mutateDelete, isPending } = useMutation({
    mutationKey: ["DELETE_PRODUCT", productId],
    mutationFn: async (productId: number) => {
      const response = await axios.post(DELETE_PRODUCT, { productId });
      return response.data;
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update cart, try again later!");
    },
    onSuccess: () => refetch(),
  });

  function handleClick(action: "add" | "sub") {
    if (action === "add") {
      setCurrentQuantity((prev) => prev + 1);
      mutate({
        action: "add",
        payload: { userId, productId, quantity: currentQuantity + 1 },
      });
    } else {
      setCurrentQuantity((prev) => prev - 1);
      mutate({
        action: "sub",
        payload: { userId, productId, quantity: currentQuantity - 1 },
      });
    }
  }

  return (
    <div className="flex gap-2 rounded-lg justify-evenly items-center mt-10 border-1 border-zinc-500">
      {currentQuantity === 1 && (
        <Button
          onClick={() => mutateDelete(productId)}
          variant="ghost"
          className={clsx("cursor-pointer")}
        >
          {isPending ? <IconLoader2 className={clsx(isPending && "rotate-icon")} /> : <IconTrash />}
        </Button>
      )}
      {currentQuantity > 1 && (
        <Button
          disabled={currentQuantity === 0}
          variant="ghost"
          className="cursor-pointer "
          onClick={() => handleClick("sub")}
        >
          <IconMinus />
        </Button>
      )}

      <span>{currentQuantity}</span>
      <Button
        disabled={currentQuantity === quantity}
        className="cursor-pointer"
        variant="ghost"
        onClick={() => handleClick("add")}
      >
        <IconPlus />
      </Button>
    </div>
  );
}
