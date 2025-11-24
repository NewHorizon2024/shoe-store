"use client";

import type { Product } from "@/models/models";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Banner from "./_components/Banner";
import ProductCard from "./_components/ProductCard";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["LIST_PRODUCTS"],
    queryFn: async () => {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/get-list-products`,
      );
      const response = result.data as { products: Product[] };
      return response;
    },
  });

  return (
    <div>
      <Banner />
      <h1 className="pl-40 pt-10">Browse our iconic models</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {data?.products.map(({ id, image_url, title, price }) => (
          <ProductCard key={id} image={image_url} title={title} price={price} />
        ))}
      </div>
    </div>
  );
}
