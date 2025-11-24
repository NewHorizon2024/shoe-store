import { type NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db/db-config";
import { deleteProduct } from "@/lib/db/queries";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const { productId } = payload as { productId: number };

    const result = await pool.query(deleteProduct, [productId]);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
