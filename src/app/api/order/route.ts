import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";
import { RowDataPacket } from "mysql2";

export const GET = async (req: NextRequest) => {
  try {
    const userEmail = req.headers.get("userEmail");
    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [
      userEmail,
    ]);

    let data;

    const { id, role } = (users as RowDataPacket[])[0];
    if (role === "user") {
      const [myOrders] = await pool.query(
        "SELECT * FROM orders WHERE user_id=?",
        [id]
      );
      data = myOrders;
    }

    if (role === "admin") {
      const [allOrders] = await pool.query("SELECT * FROM orders");
      data = allOrders;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
