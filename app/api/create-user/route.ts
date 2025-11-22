import type { LoginForm } from "@/models/models";
import bcrypt from "bcrypt";
import { type NextRequest, NextResponse } from "next/server";
import { DatabaseError } from "pg";

import pool from "@/lib/db/db-config";
import { insertUserQuery } from "@/lib/db/queries";

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Promise<LoginForm>;
  const values = Object.values(payload);
  const password = values[3];
  const hashedPassword = await bcrypt.hash(password, 10);
  values[3] = hashedPassword;

  try {
    const result = await pool.query(insertUserQuery, values);
    return NextResponse.json({ response: result.rows }, { status: 201 });
  } catch (error) {
    if (error instanceof DatabaseError) {
      if (error.detail?.indexOf("already exists")) {
        return NextResponse.json({
          error: true,
          reason: "User already exits",
          response: null,
        });
      }
      console.error("Database error:", error.message, error.detail);
      return NextResponse.json(
        {
          error: true,
          reason: error.detail,
          response: null,
        },
        { status: 500 },
      );
    } else if (error instanceof Error) {
      console.error("error", error.message);
      return NextResponse.json(
        {
          error: true,
          reason: error.message,
          response: null,
        },
        { status: 500 },
      );
    } else {
      console.error("Unknown error", error);
      return NextResponse.json(
        { error: true, response: null },
        { status: 500 },
      );
    }
  }
}
