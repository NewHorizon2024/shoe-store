import { type NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db/db-config";
import { getUserCart, getUserCartItems } from "@/lib/db/queries";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const userId = searchParams.get("userId");

    const userCart = await pool.query(getUserCart, [userId]);

    if (userCart.rowCount === 0) {
      return NextResponse.json({ cart: [] });
    }

    const cartId = userCart.rows[0].id;

    const cartItems = await pool.query(getUserCartItems, [cartId]);
    if (cartItems.rowCount === 0) {
      return NextResponse.json({ cart: [] });
    }

    return NextResponse.json({ cart: cartItems.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
