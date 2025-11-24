import { NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db/db-config";
import { getcartProductsIs } from "@/lib/db/queries";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const ids = payload as number[];
    const result = await pool.query(getcartProductsIs, [ids]);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
