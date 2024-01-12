import pool from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as jose from "jose";
import {
  RowDataPacket,
  FieldPacket,
  ResultSetHeader,
  ProcedureCallPacket,
} from "mysql2";
import { cookies } from "next/headers";

type QueryResultType = [
  (
    | RowDataPacket[]
    | ResultSetHeader
    | RowDataPacket[][]
    | ProcedureCallPacket
    | RowDataPacket[]
  ),
  FieldPacket[]
];

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();

    const [results]: QueryResultType = await pool.query(
      "SELECT * FROM users WHERE email=?",
      [email]
    );

    if (Array.isArray(results) && results.length === 0) {
      return NextResponse.json(
        { error: { message: "user not found" } },
        { status: 400 }
      );
    }

    const storedPassword =
      Array.isArray(results) && results.length !== 0 && "password" in results[0]
        ? results[0].password
        : "";

    const isValidPassword = await bcrypt.compare(password, storedPassword);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: { message: "Invalid password" } },
        { status: 400 }
      );
    }

    const userRole =
      Array.isArray(results) && results.length !== 0 && "password" in results[0]
        ? results[0].role
        : "";

    const userEmail =
      Array.isArray(results) && results.length !== 0 && "password" in results[0]
        ? results[0].email
        : "";

    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);
    const jwt = await new jose.SignJWT({ userEmail, userRole })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(secret);

    cookies().set("token", jwt, {
      httpOnly: true,
    });

    return NextResponse.json(
      {
        data: {
          message: "login successfully",
          role: userRole,
          userEmail,
        },
      },
      { status: 200 }
    );
  } catch (er) {
    return NextResponse.json({ error: er }, { status: 500 });
  }
};
