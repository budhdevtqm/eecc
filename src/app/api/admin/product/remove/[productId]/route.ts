import pool from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  try {
    const productId = req.nextUrl.pathname.split("/").at(-1);
    const { images } = await req.json();

    await pool.query("UPDATE products SET images = ? WHERE id = ?", [
      JSON.stringify(images),
      productId,
    ]);

    return NextResponse.json({ message: "Image Deleted" }, { status: 200 });
  } catch (er) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};