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

interface Address {
  id: number;
  user_id: number;
  country: string;
  name: string;
  mobile: number;
  apartment: string;
  area: string;
  pin: number;
  landmark: string;
  city: string;
  state: string;
  created_at: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const addressId = req.nextUrl.pathname.split("/").at(-1);
    const [allAddress] = await pool.query("SELECT * FROM address WHERE id=?", [
      addressId,
    ]);

    const address = (allAddress as Address[])[0];
    return NextResponse.json({ data: address }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
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

    const addressId = req.nextUrl.pathname.split("/").at(-1);

    await pool.query(
      "UPDATE address SET country=?, name=?, mobile=?, apartment=?, area=?, pin=?, landmark=?, city=?, state=? WHERE id=?",
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
        addressId,
      ]
    );

    return NextResponse.json({ message: "Address Updated" }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { messag: "something went wrong" },
      { status: 400 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const addressId = req.nextUrl.pathname.split("/").at(-1);

    await pool.query("DELETE FROM address WHERE id=?", [addressId]);

    return NextResponse.json({ message: "Address Deleted" }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { messag: "something went wrong" },
      { status: 400 }
    );
  }
};
