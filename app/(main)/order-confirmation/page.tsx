"use client";

import { IconProgressCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function OrderConfirmationPage() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-neutral-900 px-4">
      <div className="max-w-lg w-full bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 text-center">
        <IconProgressCheck />
        <div className="flex justify-center mb-6"></div>

        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your shoes are on their way. We’ve sent you a confirmation email with
          your order details.
        </p>

        <div className="bg-gray-100 dark:bg-neutral-700 rounded-lg p-4 mb-6 text-left">
          <h2 className="font-semibold mb-2">Order Summary</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Nike Air Zoom Pegasus</span>
              <span>$120</span>
            </li>
            <li className="flex justify-between">
              <span>Adidas Ultraboost</span>
              <span>$180</span>
            </li>
            <li className="flex justify-between font-bold">
              <span>Total</span>
              <span>$300</span>
            </li>
          </ul>
          <div className="border-dashed">
            <Badge>
              Demo Mode — Order details are mocked for interview purposes
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button className="cursor-pointer" onClick={() => router.push("/")}>
            Continue Shopping
          </Button>
          <Button onClick={() => router.push("/orders")} disabled>
            View My Orders
          </Button>
        </div>
      </div>
    </div>
  );
}
