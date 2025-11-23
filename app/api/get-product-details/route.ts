import { type NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db/db-config";
import { getProductDetailsFromItems } from "@/lib/db/queries";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const productId = searchParams.get("productId");

    const result = await pool.query(getProductDetailsFromItems, [productId]);
    const product = result.rows[0];

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
