"use server";

import type { Product } from "@/models/models";

import pool from "@/lib/db/db-config";

import Banner from "./_components/Banner";
import ProductCard from "./_components/ProductCard";

async function getProducts(): Promise<{ products: Product[] }> {
  const query = `SELECT * FROM public.products ORDER BY id ASC`;
  const products = await pool.query(query);
  return { products: products.rows };
}

export default async function Home() {
  const { products } = await getProducts();

  console.log(products);
  return (
    <div>
      <Banner />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {products.map(({ id, image_url, description, price }) => (
          <ProductCard key={id} image={image_url} title={description} price={price} />
        ))}
      </div>
    </div>
  );
}
