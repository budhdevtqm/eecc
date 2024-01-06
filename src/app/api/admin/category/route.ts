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

export interface CategoryInterface {
  id: number;
  name: string;
  createdBy: number;
  status: number;
  created_at: string;
  updated_at: null | string;
}

export const GET = async (req: NextRequest) => {
  try {
    const [allCategory] = await pool.query("SELECT * FROM categories");
    return NextResponse.json({ data: allCategory }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went worng" },
      { status: 400 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { userEmail, name } = await req.json();
    const [row] = await pool.query("SELECT * FROM users WHERE email=?", [
      userEmail,
    ]);

    const [allCategory] = await pool.query(
      "SELECT * FROM categories WHERE name=?",
      [name]
    );

    if ((allCategory as CategoryInterface[] | []).length > 0) {
      return NextResponse.json(
        { message: "Category name already exists" },
        { status: 409 }
      );
    }

    const userId = (row as UserInterface[])[0].id;
    await pool.query(
      "INSERT INTO categories (name, created_by, status) VALUES (?,?,?)",
      [name, userId, 1]
    );

    return NextResponse.json({ message: "Added successfuly" }, { status: 201 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went worng" },
      { status: 400 }
    );
  }
};
