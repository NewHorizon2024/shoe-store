import { CartPayLoad } from "@/models/models";
import { type NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db/db-config";
import {
  createUserCart,
  getProductFromCartItems,
  getUserCart,
  updateProductQuantity,
  updateUSerCartItems,
} from "@/lib/db/queries";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const { userId, productId, quantity } = payload as CartPayLoad;
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

      console.log(updatedCart )
    } else {
      updatedCart = await pool.query(updateProductQuantity, [
        cartId,
        productId,
      ]);
    }

    return NextResponse.json(updatedCart, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
