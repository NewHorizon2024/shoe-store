"use client";

import Image from "next/image";
import Link from "next/link";

import { Card, CardFooter } from "@/components/ui/card";

import ProductPrice from "./ProductPrice";

type ProductCardProps = Readonly<{
  image: string;
  title: string;
  price: number;
}>;
export default function ProductCard({ image, title, price }: ProductCardProps) {
  return (
    <Card className="w-full pt-0 h-auto">
      <Link href={`products/${title}`}>
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
          <Image
            alt="Product image"
            src={image}
            fill
            className="object-contain 2xl:object-cover object-center rounded"
            objectPosition="center"
            preload
          />
        </div>
        <CardFooter className="flex flex-col items-start p-4 space-y-2 py-0 min-h-fit pt-2">
          <span className="text-lg font-semibold pl-5 text-zinc-800">
            {title}
          </span>
          <span className="text-sm text-gray-600 pl-5">Men Collection</span>
          <ProductPrice price={price} />
        </CardFooter>
      </Link>
    </Card>
  );
}
