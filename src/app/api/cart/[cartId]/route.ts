import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";

interface Item {
  id: number;
  user_id: number;
  product_id: number;
  name: string;
  image: string;
  price: number;
  created_at: string;
  updated_at: string;
  status: number;
  qty: number;
}

export const DELETE = async (req: NextRequest) => {
  try {
    const cartId = req.nextUrl.pathname.split("/").at(-1);
    await pool.query("DELETE FROM cart WHERE id=?", cartId);
    return NextResponse.json({ message: "Removed from cart" }, { status: 200 });
  } catch (er) {
    return NextResponse.json({ message: "Unable to delete" }, { status: 400 });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const cartId = req.nextUrl.pathname.split("/").at(-1);
    const { operationType } = await req.json();
    const [cartItem] = await pool.query("SELECT * FROM cart WHERE id=?", [
      cartId,
    ]);

    let value;
    const { qty } = (cartItem as Item[])[0];

    if (operationType === "increment") {
      value = qty + 1;
    }

    if (operationType === "decrement") {
      value = qty - 1;
    }

    await pool.query(`UPDATE cart SET qty=${value} WHERE id=${cartId}`);

    return NextResponse.json({ message: "Quantity Updated" }, { status: 200 });
  } catch (er) {
    return NextResponse.json({ message: "Unable to delete" }, { status: 400 });
  }
};
