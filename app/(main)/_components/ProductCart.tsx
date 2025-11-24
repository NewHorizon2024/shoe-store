"use client";

import { IconShoppingBag } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import useCartData from "@/lib/hooks/useCartData";

export default function ProductCart() {
  const userId = Number(getCookie("userId"));
  const { data } = useCartData(userId);

  const quantity =
    data?.cart?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <Link href="/cart" className="relative inline-block">
      <IconShoppingBag className="text-zinc-800" />
      {quantity > 0 && (
        <Badge className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] leading-none rounded-full px-0.5 tabular-nums">
          {quantity}
        </Badge>
      )}
    </Link>
  );
}
