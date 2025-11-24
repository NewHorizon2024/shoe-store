"use client";

import { GET_PRODUCT_DETAILS_BY_ID } from "@/app/api/routes";
import placeholder from "@/public/assets/images/holder.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import ProductPrice from "../../_components/ProductPrice";
import Quantity from "./Quantity";

type ProductItemProps = Readonly<{
  productId: number;
  quantity: number;
}>;

export default function ProductItem({ productId, quantity }: ProductItemProps) {
  const { data, isFetching } = useQuery({
    queryKey: ["PRODUCT_DETAILS", productId],
    queryFn: async () => {
      const response = await axios.get(
        `${GET_PRODUCT_DETAILS_BY_ID}?productId=${productId}`,
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex justify-between mt-10">
      <div className="flex gap-2">
        <div>
          <Image
            alt="image"
            width={150}
            height={150}
            src={isFetching ? placeholder : data?.image_url}
          />
          <Quantity quantity={data?.quantity} cartQuantity= {quantity} productId={productId} />
        </div>
        <div className="flex flex-col">
          <Link
            href={`/products/${data?.title}`}
            className="nunito-bold font-bold hover:text-zinc-500"
          >
            {data?.title}
          </Link>
          <p className="text-zinc-700">Men&apos;s shoes</p>
        </div>
      </div>

      <div>
        <ProductPrice price={data?.price} />
        <p className="text-zinc-500 font-bold">Lowest price</p>
      </div>
    </div>
  );
}
