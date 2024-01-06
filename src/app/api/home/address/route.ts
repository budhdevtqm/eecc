import pool from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";

interface User {
  id: number;
  password: string;
  name: string;
  email: string;
  createAt: string;
  updatedAt: string;
  status: string;
  role: string;
}



export const POST = async (req: NextRequest) => {
  try {
    const {
      country,
      name,
      mobile,
      apartment,
      area,
      pin,
      landmark,
      city,
      state,
    } = await req.json();

    const userEmail = req.headers.get("userEmail");
    const [userInfo] = await pool.query("SELECT * from users WHERE email=?", [
      userEmail,
    ]);

    const userId = (userInfo as User[])[0].id;

    await pool.query(
      "INSERT INTO address (country, name,mobile,apartment,area,pin,landmark,city,state, user_id) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        country,
        name,
        mobile,
        apartment,
        area,
        pin,
        landmark,
        city,
        state,
        userId,
      ]
    );
    return NextResponse.json({ message: "Address added" }, { status: 201 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const userEmail = req.headers.get("userEmail");
    const [userInfo] = await pool.query("SELECT * from users WHERE email=?", [
      userEmail,
    ]);
    const userId = (userInfo as User[])[0].id;
    const [myAddress] = await pool.query(
      "SELECT * FROM address WHERE user_id=?",
      [userId]
    );

    const reversed = (myAddress as any[]).reverse();

    return NextResponse.json({ data: reversed }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
