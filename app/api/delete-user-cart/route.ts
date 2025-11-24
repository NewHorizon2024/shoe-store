import { type NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db/db-config";
import { deleteUserCart } from "@/lib/db/queries";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const { userId } = payload as { userId: number };
    const result = await pool.query(deleteUserCart, [userId]);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
