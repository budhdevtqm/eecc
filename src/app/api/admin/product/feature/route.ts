import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";

export const PATCH = async (req: NextRequest) => {
  try {
    const { id: productId } = await req.json();
    await pool.query(
      `UPDATE products SET is_featured = 1 WHERE id=${productId}`
    );
    return NextResponse.json(
      { message: "Featured Successfully" },
      { status: 200 }
    );
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
