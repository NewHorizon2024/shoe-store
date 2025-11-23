"use client";

type ProductPriceProps = Readonly<{
  price: number;
}>;
export default function ProductPrice({ price }: ProductPriceProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-xl font-bold text-green-600">{`$ ${price}`}</span>

      <span className="text-sm text-gray-400 line-through">
        {`$ ${(price * 1.4).toFixed(2)}`}
      </span>

      <span className="text-sm font-medium text-red-500">40% discount</span>
    </div>
  );
}
