"use server";

import type { Product } from "@/models/models";

import ProductCard from "../_components/ProductCard";

async function getProducts(): Promise<{ products: Product[] }> {
  const data = await fetch("/get-list-products");
  const response = await data.json();
  return { products: response };
}

export default async function Home() {
  const { products } = await getProducts();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="pl-40 pt-10">Current trends</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {products.map(({ id, image_url, title, price }) => (
          <ProductCard key={id} image={image_url} title={title} price={price} />
        ))}
      </div>
    </div>
  );
}
