"use client";

import { Button } from "@/components/ui/button";

export default function Summary() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p>Subtotal</p>
        <p>55</p>
      </div>
      <div className="flex justify-between">
        <p>Amount</p>
        <p>55</p>
      </div>
      <Button>Proceed to checkout</Button>
    </div>
  );
}
