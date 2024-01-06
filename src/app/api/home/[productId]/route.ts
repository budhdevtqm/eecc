import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";

import { Product } from "@/app/redux/homeSlice";

export const GET = async (req: NextRequest) => {
  try {
    const productId = req.nextUrl.pathname.split("/").at(-1);
    const [products] = await pool.query("SELECT * FROM products WHERE id=?", [
      productId,
    ]);
    const product = (products as Product[] | [])[0];
    return NextResponse.json({ data: product }, { status: 200 });
  } catch (er) {
    NextResponse.json({ message: "Something went wrong" }, { status: 400 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const productId = req.nextUrl.pathname.split("/").at(-1);
    console.log({productId});
    
  } catch (er) {
    console.log("er", er);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
