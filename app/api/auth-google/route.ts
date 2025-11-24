import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import pool from "@/lib/db/db-config";
import { getUserByEmail, insertUserQuery } from "@/lib/db/queries";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const payload = await request.json();
    const { name, email, token } = payload as {
      name: string;
      email: string;
      token: string;
    };
    const [firstName, lastName] = name.split(" ");
    const str = token;
    const password = str.substring(0, 7);

    const user = await pool.query(getUserByEmail, [email]);
    if (user.rowCount === 1) {
      cookieStore.set("token", token);
      cookieStore.set("userId", user.rows[0].id);
      return NextResponse.redirect(new URL("/", request.url));
    }

    const result = await pool.query(insertUserQuery, [
      firstName,
      lastName,
      email,
      password,
    ]);
    cookieStore.set("token", token);
    cookieStore.set("userId", result.rows[0].id);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(null, { status: 500 });
  }
}
