"use client";

import { useEffect } from "react";

import { GET_PRODUCT_DETAILS } from "@/app/api/routes";
import { Product } from "@/models/models";
import holder from "@/public/assets/images/holder.png";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import ProductPrice from "../../_components/ProductPrice";

export default function Slug() {
  const params = useParams();

  const slug = decodeURIComponent(params.slug as string);

  const { data, isFetching } = useQuery({
    queryKey: ["PRODUCT_DETAILS", slug],
    queryFn: async () => {
      const response = await axios.get(`${GET_PRODUCT_DETAILS}?title=${slug}`);
      return response.data as Product | null;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => console.log(data), [data]);

  if (!data?.id) return null;
  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row md:space-x-8">
        <div className="flex-1 flex justify-center items-center bg-gray-100 rounded p-4">
          <Image
            width={200}
            height={200}
            src={isFetching || !data?.image_url ? holder : data?.image_url}
            alt="Product"
            className="w-full max-w-sm object-contain"
          />
        </div>

        <div className="flex-1 flex flex-col space-y-4 p-4">
          <h1 className="text-2xl font-bold">{data?.title}</h1>
          <p className="text-gray-600">{data?.description}</p>
          <ProductPrice price={data?.price} />

          <Button className="mt-4 cursor-pointer">Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
