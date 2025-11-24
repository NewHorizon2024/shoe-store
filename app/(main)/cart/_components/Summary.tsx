"use client";

import { Button } from "@/components/ui/button";

type SummaryProps = Readonly<{
  total: number;
}>;
export default function Summary({ total }: SummaryProps) {

  return (
    <div className="flex flex-col">
      <h3 className="mb-10">Summary</h3>
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>-</p>
      </div>
      <div className="flex justify-between">
        <p>Amount</p>
        {total > 0 && <p>{"$"}{total}</p>}
        {total <= 0 && <p>-</p>}
      </div>
      <Button disabled={total <=0} className="cursor-pointer mt-10">Proceed to checkout</Button>
    </div>
  );
}
