import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";

interface UserInterface {
  id: number;
  password: string;
  name: string;
  email: string;
  createAt: string;
  updatedAt: string;
  status: string;
  role: string;
}

interface Category {
  createdAt: string;
  createdBy: number;
  id: number;
  name: string;
  status: number;
  updatedAt: null | string;
}

export const GET = async (req: NextRequest) => {
  try {
    const pathname = req.nextUrl.pathname;
    const categoryId = pathname.split("/").at(-1);

    const [row] = await pool.query("SELECT * FROM categories WHERE id=?", [
      categoryId,
    ]);

    const category = (row as Category[] | [])[0];
    return NextResponse.json({ data: category }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const pathname = req.nextUrl.pathname;
    const categoryId = pathname.split("/").at(-1);
    await pool.query("DELETE FROM categories WHERE id=?", [categoryId]);

    return NextResponse.json({ message: "Category Deleted" }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const pathname = req.nextUrl.pathname;
    const categoryId = pathname.split("/").at(-1);
    const { name, userEmail } = await req.json();

    const [users] = await pool.query("SELECT * FROM users WHERE email=?", [
      userEmail,
    ]);

    const [categories] = await pool.query(
      "SELECT * FROM categories WHERE name=?",
      [name]
    );

    const userId = (users as UserInterface[])[0].id;

    if ((categories as Category[] | []).length > 0) {
      return NextResponse.json(
        { message: "Category already exist" },
        { status: 409 }
      );
    }

    await pool.query(
      `UPDATE categories SET name=?, created_by=? WHERE id=${categoryId}`,
      [name, userId]
    );

    return NextResponse.json({ message: "Category updated" }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};