import pool from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";

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
    const [categories] = await pool.query("SELECT * FROM categories");
    const onlyAndNameId = (categories as Category[] | []).map((c) => ({
      id: c.id,
      name: c.name,
    }));

    return NextResponse.json({ data: onlyAndNameId }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};