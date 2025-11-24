import { CartPayLoad } from "@/models/models";
import { type NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db/db-config";
import {
  createUserCart,
  getProductFromCartItems,
  getUserCart,
  updateProductQuantity_ADD,
  updateProductQuantity_SUB,
  updateUSerCartItems,
} from "@/lib/db/queries";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const {
      payload: { userId, productId, quantity },
      action,
    } = payload as {
      action: "add" | "sub";
      payload: CartPayLoad;
    };
    let userCart = await pool.query(getUserCart, [userId]);

    if (userCart.rowCount === 0) {
      userCart = await pool.query(createUserCart, [userId]);
    }

    const cartId = userCart.rows[0].id;

    const productInCart = await pool.query(getProductFromCartItems, [
      cartId,
      productId,
    ]);
    let updatedCart;
    if (productInCart.rowCount === 0) {
      updatedCart = await pool.query(updateUSerCartItems, [
        cartId,
        productId,
        quantity,
      ]);
    } else {
      updatedCart =
        action === "add"
          ? await pool.query(updateProductQuantity_ADD, [cartId, productId])
          : pool.query(updateProductQuantity_SUB, [cartId, productId]);
    }

    return NextResponse.json(updatedCart, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
