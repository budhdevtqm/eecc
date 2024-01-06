import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";

export const POST = (req: NextRequest) => {
  try {
    const productId = req.nextUrl.pathname.split("/").at(-1);
    console.log({ productId });
    return NextResponse.json({ message: "Added to cart" }, { status: 200 });
  } catch (er) {
    console.log("er", er);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
};
