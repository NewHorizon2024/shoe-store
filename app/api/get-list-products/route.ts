import { NextResponse } from "next/server";

import pool from "@/lib/db/db-config";
import { getAllProducts } from "@/lib/db/queries";

export async function GET() {
  const products = await pool.query(getAllProducts);
  return NextResponse.json({ products: products.rows });
}
