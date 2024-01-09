import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  status: number;
  images: string[] | [];
  quantity: number;
}

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

export const POST = async (req: NextRequest) => {
  try {
    const { id, quantity } = await req.json();
    const userEmail = req.headers.get("userEmail");

    const [products] = await pool.query(
      "SELECT * FROM products WHERE id=? LIMIT 1",
      [id]
    );

    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [
      userEmail,
    ]);

    const userId = (users as User[])[0].id;
    const { name, images, price } = (products as Product[])[0];

    const [isAlreadyCartItem] = await pool.query(
      "SELECT * FROM cart WHERE product_id =? AND user_id=?",
      [id, userId]
    );

    if ((isAlreadyCartItem as any).length === 0) {
      await pool.query(
        "INSERT INTO cart (user_id, product_id, name, image, price, status, qty) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [userId, id, name, images[0], price, 1, quantity]
      );
    }

    if ((isAlreadyCartItem as any).length > 0) {
      const { id: cartId, qty } = (isAlreadyCartItem as any)[0];
      const updated = qty + quantity;
      await pool.query(`UPDATE cart SET qty=${updated} WHERE id=${cartId}`);
    }

    return NextResponse.json({ message: "Added to cart" }, { status: 201 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};