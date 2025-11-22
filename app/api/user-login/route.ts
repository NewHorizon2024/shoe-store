import type { LoginForm } from "@/models/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db/db-config";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const { email, password } = payload as LoginForm;

  const result = await pool.query(
    "SELECT id, password FROM users WHERE email = $1",
    [email],
  );

  try {
    if (result.rowCount === 0) {
      return NextResponse.json({
        error: true,
        reason: "User Not Found",
        success: false,
      });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({
        error: true,
        reason: "Invalid credentials",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user.id, email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      },
    );

    return NextResponse.json({ success: true, token });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong", success: false },
      { status: 500 },
    );
  }
}
