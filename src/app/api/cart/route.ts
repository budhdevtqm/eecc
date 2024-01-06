import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";

interface User {
  id: number;
  password: string;
  name: string;
  email: string;
  createAt: string;
  updatedAt: string;
  status: number;
  role: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const userEmail = req.headers.get("userEmail");
    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [
      userEmail,
    ]);

    const userId = (users as User[])[0].id;
    const [myCartItmes] = await pool.query(
      "SELECT * FROM cart WHERE user_id=?",
      [userId]
    );
    return NextResponse.json({ data: myCartItmes }, { status: 200 });
  } catch (er) {
    return NextResponse.json({ data: [] }, { status: 200 });
  }
};
