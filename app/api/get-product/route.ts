import { type NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db/db-config";
import { getProductDetails } from "@/lib/db/queries";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const title = searchParams.get("title");

    const result = await pool.query(getProductDetails, [title]);
    const product = result.rows[0];

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
