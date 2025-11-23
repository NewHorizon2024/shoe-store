"use client";

import { useEffect, useState } from "react";

import ColorThief from "colorthief";
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
  const [bgColor, setBgColor] = useState("#fff");

  useEffect(() => {
    const img = document.createElement("img");
    img.crossOrigin = "Anonymous";
    img.src = image;

    img.onload = () => {
      const colorThief = new ColorThief();
      const [r, g, b] = colorThief.getColor(img);
      setBgColor(`rgb(${r}, ${g}, ${b})`);
    };
  }, [image]);
  return (
    <Card
      className="w-full pt-0 h-[400px] sm:h-[500px] md:h-[600px]"
      style={{ backgroundColor: bgColor }}
    >
      <Link href={`products/${title}`}>
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[500px]">
          <Image
            alt="Product image"
            src={image}
            fill
            className="object-contain 2xl:object-cover object-center rounded"
            objectPosition="center"
            preload
          />
        </div>
        <CardFooter className="flex flex-col items-start p-4 space-y-2 py-0">
          <span className="text-lg font-semibold">{title}</span>
          <span className="text-sm text-gray-600">Men Collection</span>
          <ProductPrice price={price} />
        </CardFooter>
      </Link>
    </Card>
  );
}
