import { NextRequest, NextResponse } from "next/server";
import pool from "@/dbConfig/db";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";

export const GET = async (req: NextRequest) => {
  try {
    const pathname = req.nextUrl.pathname;
    const userId = pathname.split("/").at(-1);
    const [rows] = await pool.query("SELECT * FROM users WHERE id=?", [userId]);
    const rowData: RowDataPacket[] = rows as RowDataPacket[];
    const emptyPassword = rowData.map((user) => ({ ...user, password: "" }));

    return NextResponse.json(
      { status: 200, data: emptyPassword },
      { status: 200 }
    );
  } catch (er) {
    return NextResponse.json(
      { stauts: 400, message: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const pathname = req.nextUrl.pathname;
    const userId = pathname.split("/").at(-1);
    const { name, password, role } = await req.json();
    const hash = await bcrypt.hash(password, 10);

    await pool.query(
      `UPDATE users SET name =?, role =?, password =?, status =? WHERE id = ?`,
      [name, role, hash, 1, userId]
    );
    return NextResponse.json(
      { status: 200, message: "User Updated" },
      { status: 200 }
    );
  } catch (er) {
    return NextResponse.json(
      { stauts: 400, message: "Something went wrong" },
      { status: 400 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const pathname = req.nextUrl.pathname;
    const userId = pathname.split("/").at(-1);
    await pool.query("DELETE FROM users WHERE id=?", [userId]);
    return NextResponse.json(
      { status: 200, message: "User Deleted" },
      { status: 200 }
    );
  } catch (er) {
    return NextResponse.json(
      { stauts: 400, message: "Something went wrong" },
      { status: 400 }
    );
  }
};
