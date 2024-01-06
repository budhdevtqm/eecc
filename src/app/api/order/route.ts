import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";
import { RowDataPacket } from "mysql2";

export const GET = async (req: NextRequest) => {
  try {
    const userEmail = req.headers.get("userEmail");
    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [
      userEmail,
    ]);

    const userId = (users as RowDataPacket[])[0].id;

    const [myOrders] = await pool.query(
      "SELECT * FROM orders WHERE user_id=?",
      [userId]
    );
    return NextResponse.json({ data: myOrders }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
