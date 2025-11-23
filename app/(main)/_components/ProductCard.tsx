import Image from "next/image";
import Link from "next/link";

import { Card, CardFooter } from "@/components/ui/card";

type ProductCardProps = Readonly<{
  image: string;
  title: string;
  price: number;
}>;
export default function ProductCard({ image, title, price }: ProductCardProps) {
  return (
    <Card className="w-full pt-0 h-[400px] sm:h-[500px] md:h-[600px]">
      <Link
        href={{
          pathname: "/products",
          query: { title },
        }}
      >
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[500px]">
          <Image
            alt="Product image"
            src={image}
            fill
            className="object-contain sm:object-cover object-center rounded"
            objectPosition="center"
            preload
          />
        </div>
        <CardFooter className="flex flex-col items-start p-4 space-y-2 py-0">
          <span className="text-lg font-semibold">{title}</span>
          <span className="text-sm text-gray-600">Men Collection</span>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">{`$ ${price}`}</span>

            <span className="text-sm text-gray-400 line-through">
              {`$ ${(price * 1.4).toFixed(2)}`}
            </span>

            <span className="text-sm font-medium text-red-500">
              40% discount
            </span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
