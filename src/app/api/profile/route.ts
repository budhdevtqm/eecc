import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt";

export const GET = async (req: NextRequest) => {
  try {
    const userEmail = req.headers.get("userEmail");
    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [
      userEmail,
    ]);

    const user = (users as RowDataPacket[])[0];
    const { name, email } = user;
    return NextResponse.json(
      { data: { name, email, password: "" } },
      { status: 200 }
    );
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const { name, password } = await req.json();
    const userEmail = req.headers.get("userEmail");

    const hash = await bcrypt.hash(password, 10);
    await pool.query("UPDATE users SET name=?, password=? WHERE email=?", [
      name,
      hash,
      userEmail,
    ]);

    return NextResponse.json({ message: "Profile updated" }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
